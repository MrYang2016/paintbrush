class Paintbrush {
  constructor(canvasDiv, { type = 'line', width, height, lineWidth = 3, strokeStyle = 'red', canEdit = false } = {}) {
    this.width = width || 500;
    this.height = height || 500;
    this.canvasDiv = typeof canvasDiv === 'string' ? document.querySelector(canvasDiv) : canvasDiv;
    this.canvasDiv.setAttribute('style', 'position:relative;');

    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;

    const canvasObj = this.getNewCanvas();
    this.canvas = canvasObj.newCanvas;
    this.ctx = canvasObj.ctx;

    const temCanvasObj = this.getNewCanvas();
    this.temCanvas = temCanvasObj.newCanvas;
    this.temCtx = temCanvasObj.ctx;

    const notLineCanvasObj = this.getNewCanvas();
    this.notLineCanvas = notLineCanvasObj.newCanvas;
    this.notLineCtx = notLineCanvasObj.ctx;

    this.isDown = false;
    this.endCoor = {};
    this.startCoor = {};
    this.way = { line: {}, straightLine: {}, rect: {}, circle: {}, ellipse: {} };
    this.drawID = '';
    this.type = type;
    this.origin = {
      x: this.canvasDiv.offsetLeft,
      y: this.canvasDiv.offsetTop
    };
    if (canEdit) this.listen();
  }

  listen() {
    this.canvasDiv.addEventListener('mousedown', this.eventCallback('mousedown'));
    this.canvasDiv.addEventListener('mouseup', this.eventCallback('mouseup'));
    this.canvasDiv.addEventListener('mousemove', this.eventCallback('mousemove'));
    this.canvasDiv.addEventListener('mouseout', this.eventCallback('mouseout'));
  }

  eventCallback(type) {
    return event => {
      const e = event || window.event;
      const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
      const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
      const x = e.clientX + scrollX - this.origin.x;
      const y = e.clientY + scrollY - this.origin.y;
      switch (type) {
      case 'mousedown':
        this.startCoor.x = x;
        this.startCoor.y = y;
        this.start(x, y);
        break;
      case 'mousemove':
        this.draw(x, y);
        this.endCoor.x = x;
        this.endCoor.y = y;
        break;
      case 'mouseup':
      case 'mouseout':
        this.done();
        break;
      }
    };
  }

  start(x, y) {
    if (this.type === 'line') this.ctx.beginPath();
    if (this.type === 'line' || this.type === 'straightLine') {
      this.ctx.moveTo(x, y);
    }
    this.isDown = true;
    this.drawID = `${this.type}_${(new Date()).getTime()}`;
    this.record(x, y, this.type);
  }

  done() {
    if (this.isDown && this.type !== 'line') {
      this.record(this.endCoor.x, this.endCoor.y, this.type);
      this.clearCanvas(this.temCanvas, this.temCtx);
      this.drawUseData(this.way[this.type][this.drawID], this.type);
    }
    this.isDown = false;
  }

  draw(x, y) {
    if (!this.isDown) return;
    switch (this.type) {
    case 'line':
      this.drawLine(x, y);
      break;
    case 'straightLine':
      this.drawStraightLine(x, y);
      break;
    case 'rect':
      this.drawRect(x, y);
      break;
    case 'circle':
      this.drawCircle(x, y);
      break;
    case 'ellipse':
      this.drawEllipse(x, y);
      break;
    }
  }

  drawFromSocket(data) {
    if (!data) return;
    let lineData = data instanceof Array ? data : [data];
    lineData.forEach(obj => {
      const {type, points, color, size} = obj;
      this.setStyle({lineWidth: size, strokeStyle: color});
      this.drawUseData(points, type);
    });
  }

  drawUseData(data, type) {
    switch (type) {
    case 'line':
    case 'straightLine':
      this.drawStraightLineUseData(data);
      break;
    case 'rect':
      this.drawRectUseData(data);
      break;
    case 'circle':
      this.drawCircleUseData(data);
      break;
    case 'circ':  
    case 'ellipse':
      this.drawEllipseUseData(data);
      break;
    }
  }

  drawLine(x, y) {
    const ctx = this.type === 'line' ? this.ctx : this.temCtx;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    if (this.type === 'line') this.record(x, y, 'line');
  }

  drawStraightLine(x, y) {
    this.clearCanvas(this.temCanvas, this.temCtx);
    this.temCtx.moveTo(this.startCoor.x, this.startCoor.y);

    this.drawLine(x, y);
  }

  drawStraightLineUseData(data) {
    const [start, end] = data;
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
  }

  drawRect(x, y) {
    this.clearCanvas(this.temCanvas, this.temCtx);
    const sx = this.startCoor.x;
    const sy = this.startCoor.y;
    this.temCtx.strokeRect(sx, sy, x - sx, y - sy);
  }

  drawRectUseData(data) {
    const [s, e] = data;
    this.notLineCtx.strokeRect(
      s.x, 
      s.y, 
      e.x - s.x, 
      e.y - s.y
    );
  }

  drawCircle(ex, ey) {
    this.clearCanvas(this.temCanvas, this.temCtx);
    this.circle({
      sx: this.startCoor.x,
      sy: this.startCoor.y,
      ex, ey,
      ctx: this.temCtx
    });
  }

  drawCircleUseData(data) {
    const [s, e] = data;
    this.circle({
      sx: s.x,
      sy: s.y,
      ex: e.x,
      ey: e.y,
      ctx: this.notLineCtx
    });
  }

  circle({ sx, sy, ex, ey, ctx }) {
    const cx = (ex + sx) / 2;
    const cy = (ey + sy) / 2;
    const r = Math.sqrt((ex - sx) ** 2 + (ey - sy) ** 2) / 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.stroke();
  }

  drawEllipse(ex, ey) {
    this.clearCanvas(this.temCanvas, this.temCtx);
    this.ellipse({
      sx: this.startCoor.x,
      sy: this.startCoor.y,
      ex, ey,
      ctx: this.temCtx
    });
  }

  drawEllipseUseData(data) {
    const [s, e] = data;
    this.ellipse({
      sx: s.x,
      sy: s.y,
      ex: e.x,
      ey: e.y,
      ctx: this.ctx
    });
  }

  ellipse({ sx, sy, ex, ey, ctx }) {
    const cx = (ex + sx) / 2;
    const cy = (ey + sy) / 2;
    const a = Math.abs((ex - sx) / 2);
    const b = Math.abs((ey - sy) / 2);
    ctx.save();
    ctx.translate(cx, cy);
    const r = 1 / 20;
    ctx.beginPath();
    ctx.moveTo(a, 0);
    for (let h = 0; h < 2 * Math.PI; h += r) {
      const tanH = Math.tan(h);
      let x = Math.sqrt(((a ** 2) * (b ** 2)) / ((b ** 2) + ((a * tanH) ** 2)));
      if (h > (Math.PI / 2) && h < (Math.PI * 3 / 2)) x = -x;
      const y = tanH * x;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
    ctx.lineTo(a, 0);
    ctx.stroke();
    ctx.restore();
  }

  getNewCanvas() {
    const newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('width', this.width);
    newCanvas.setAttribute('height', this.height);
    newCanvas.setAttribute('style', 'border:solid 1px #000;position:absolute;top:0;left:0;');
    this.canvasDiv.appendChild(newCanvas);
    const ctx = newCanvas.getContext('2d');
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    return {newCanvas, ctx};
  }

  setType(type) {
    this.type = type;
  }

  setMeasurement({ w, h }) {
    if (!w && !h) return;
    if (!isNaN(parseInt(w))) {
      this.width = w;
    }
    if (!isNaN(parseInt(h))) {
      this.height = h;
    }
    this.canvas.setAttribute('width', this.width);
    this.canvas.setAttribute('height', this.height);
    this.temCanvas.setAttribute('width', this.width);
    this.temCanvas.setAttribute('height', this.height);
    this.notLineCanvas.setAttribute('width', this.width);
    this.notLineCanvas.setAttribute('height', this.height);
  }

  setStyle({lineWidth, strokeStyle}) {
    if (lineWidth) {
      this.lineWidth = lineWidth;
      this.ctx.lineWidth = lineWidth;
      this.temCtx.lineWidth = lineWidth;
      this.notLineCtx.lineWidth = lineWidth;
    }
    if (strokeStyle) {
      this.strokeStyle = strokeStyle;
      this.ctx.strokeStyle = strokeStyle;
      this.temCtx.strokeStyle = strokeStyle;
      this.notLineCtx.strokeStyle = strokeStyle;
    }
    
  }

  record(x, y, type) {
    const key = this.way[type];
    if (key[this.drawID] === undefined) key[this.drawID] = [];
    key[this.drawID].push({x, y});
  }

  clearCanvas(canvas, ctx) {
    canvas.width = this.width;
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
  }
}

window.onload = () => {
  const testData = {
    ID: 0,//画笔层级
    autoId: 2557,
    clientHeight: 540,//客户端画板高
    clientWidth: 720,//客户端画板宽
    color: 'yellow',//颜色
    content: '1',
    font: '#dfdfxd',
    'pageId': 0,//页数
    'points': [
      {
        x: 160,
        y: 425
      },
      {
        x: 278,
        y: 230
      }
    ],
    'pointscount': 1,
    'size': 5,//大小/粗细
    'timeStamp': 136333,//时间戳，回看用，从onSliceStart推流时开始算
    'type': 'circ'//画笔类型line（直线/画笔）/circ（圆）/rect（矩形）/text（文本）
  };
  const testData2 = {
    ID: 0,//画笔层级
    autoId: 2557,
    clientHeight: 540,//客户端画板高
    clientWidth: 720,//客户端画板宽
    color: 'blue',//颜色
    content: '1',
    font: '#dfdfxd',
    'pageId': 0,//页数
    'points': [
      {
        x: 200,
        y: 625
      },
      {
        x: 178,
        y: 130
      }
    ],
    'pointscount': 1,
    'size': 2,//大小/粗细
    'timeStamp': 136333,//时间戳，回看用，从onSliceStart推流时开始算
    'type': 'rect'//画笔类型line（直线/画笔）/circ（圆）/rect（矩形）/text（文本）
  };
  const canvasCtr = new Paintbrush('#canvasDiv',{
    canEdit: true
  });
  canvasCtr.drawFromSocket([testData, testData2]);

  document.querySelector('#line').addEventListener('click', () => {
    canvasCtr.setType('line');
  });
  document.querySelector('#straightLine').addEventListener('click', () => {
    canvasCtr.setType('straightLine');
  });
  document.querySelector('#rect').addEventListener('click', () => {
    canvasCtr.setType('rect');
  });
  document.querySelector('#circle').addEventListener('click', () => {
    canvasCtr.setType('circle');
  });
  document.querySelector('#ellipse').addEventListener('click', () => {
    canvasCtr.setType('ellipse');
  });
  document.querySelector('#red').addEventListener('click', () => {
    canvasCtr.setStyle({strokeStyle:'red'});
  });
  document.querySelector('#green').addEventListener('click', () => {
    canvasCtr.setStyle({strokeStyle:'green'});
  });
  document.querySelector('#other').addEventListener('click', () => {
    canvasCtr.setStyle({strokeStyle:'#abcdef'});
  });
  document.querySelector('#lineWidth').addEventListener('click', () => {
    canvasCtr.setStyle({lineWidth:'5'});
  });
};


