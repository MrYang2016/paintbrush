class Paintbrush {
  constructor(canvasDiv, { type = 'line', width, height } = {}) {
    this.width = width || 500;
    this.height = height || 500;
    this.canvasDiv = typeof canvasDiv === 'string' ? document.querySelector(canvasDiv) : canvasDiv;
    this.canvasDiv.setAttribute('style', 'position:relative;');

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
    this.listen();
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
    if (this.type === 'line' || this.type === 'straightLine') this.ctx.moveTo(x, y);
    this.isDown = true;
    this.drawID = `${this.type}_${(new Date()).getTime()}`;
    this.record(x, y, this.type);
  }

  done() {
    if (this.isDown && this.type !== 'line') {
      this.record(this.endCoor.x, this.endCoor.y, this.type);
      this.clearCanvas(this.temCanvas, this.temCtx);
      this.drawUseData(this.way[this.type][this.drawID], this.type);
      console.log(this.way);
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

  drawUseData(data, type) {
    switch (type) {
    case 'straightLine':
      this.drawStraightLineUseData(data);
      break;
    case 'rect':
      this.drawRectUseData(data);
      break;
    case 'circle':
      this.drawCircleUseData(data);
      break;
    case 'ellipse':
      this.drawEllipseUseData(data);
      break;
    }
  }

  drawLine(x, y) {
    const ctx = this.type === 'line' ? this.ctx : this.temCtx;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.lineTo(x, y);
    ctx.stroke();
    if (this.type === 'line') this.record(x, y, 'line');
  }

  drawStraightLine(x, y) {
    this.clearCanvas(this.temCanvas, this.temCtx);
    this.temCtx.moveTo(this.startCoor.x, this.startCoor.y);

    this.drawLine(x, y);
  }

  drawStraightLineUseData(data) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.moveTo(...data[0]);
    this.ctx.lineTo(...data[1]);
    this.ctx.stroke();
  }

  drawRect(x, y) {
    this.clearCanvas(this.temCanvas, this.temCtx);
    const sx = this.startCoor.x;
    const sy = this.startCoor.y;
    this.temCtx.strokeRect(sx, sy, x - sx, y - sy);
  }

  drawRectUseData(data) {
    const [start, end] = data;
    this.notLineCtx.strokeRect(start[0], start[1], end[0] - start[0], end[1] - start[1]);
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
      sx: s[0],
      sy: s[1],
      ex: e[0],
      ey: e[1],
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
      sx: s[0],
      sy: s[1],
      ex: e[0],
      ey: e[1],
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
    ctx.moveTo(a, 0);
    for (let h = 0; h < 2 * Math.PI; h += r) {
      const tanH = Math.tan(h);
      let x = Math.sqrt(((a ** 2) * (b ** 2)) / ((b ** 2) + ((a * tanH) ** 2)));
      if (h > (Math.PI / 2) && h < (Math.PI * 3 / 2)) x = -x;
      const y = tanH * x;
      this.removeRect(ctx);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    this.removeRect(ctx);
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
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
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

  record(x, y, type) {
    const key = this.way[type];
    if (key[this.drawID] === undefined) key[this.drawID] = [];
    key[this.drawID].push([x, y]);
  }

  removeRect(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.clearRect(0, 0, -this.width, this.height);
    ctx.clearRect(0, 0, this.width, -this.height);
    ctx.clearRect(0, 0, -this.width, -this.height);
  }

  clearCanvas(canvas, ctx) {
    canvas.width = this.width;
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
  }
}

window.onload = () => {
  const canvasCtr = new Paintbrush('#canvasDiv');

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
};


