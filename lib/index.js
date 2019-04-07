
class Paintbrush {
  constructor(canvasDiv, { 
    type = 'line', 
    width = 500, 
    height = 500, 
    lineWidth = 3, 
    strokeStyle = 'red', 
    canEdit = false 
  } = {}) {
    this.canvasDiv = typeof canvasDiv === 'string' ? document.querySelector(canvasDiv) : canvasDiv;
    if (!this.canvasDiv) throw new Error('can\'t find canvas element');
    this.canvasDiv.setAttribute('style', 'position:absolute;width:100%;height:100%;left:0;top:0;');

    this.width = width;
    this.height = height;

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
    // 自己本地画的历史数据
    this.way = null;
    this.initWay();
    // 来自socket的历史数据
    this.historyData = {};
    this.drawID = '';
    this.type = type;
    this.origin = {
      x: this.canvasDiv.parentNode.offsetLeft,
      y: this.canvasDiv.parentNode.offsetTop
    };
    this.lastDrawData = null;
    this.autoId = '';
    this.resizeFn = [];
    this.inDelete = false;
    this.deleteLineWidth = 8;
    this.deleteJudgeDis = 20;
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
    if (this.inDelete) return this.deleteEdit(x, y);
    const type = this.type;
    if (type === 'line' || type === 'freeline') this.ctx.beginPath();
    if (type === 'line' || type === 'freeline' || type === 'straightLine') {
      this.ctx.moveTo(x, y);
    }
    this.isDown = true;
    this.drawID = `${this.type}_${Date.now()}`;
    this.record({ x, y, type: this.type, id: this.drawID });
  }

  done() {
    if (!this.isDown) return;
    const type = this.type;
    if (!(type === 'line' || type === 'freeline')) {
      this.record({ x: this.endCoor.x, y: this.endCoor.y, type, id: this.drawID });
    } else {
      // 类型为线条时，删除只有一个点的数据
      const line = this.way.line;
      Object.keys(line).forEach(key => {
        if (line[key].points.length === 1) delete line[key];
      });
    }
    this.clearCanvas(this.temCanvas, this.temCtx);
    this.drawUseData(this.way[type][this.drawID], type);
    this.isDown = false;
  }

  draw(x, y) {
    if (!this.isDown) return;
    switch (this.type) {
    case 'freeline':
    case 'line':
      this.drawLine(x, y);
      break;
    case 'arrowLine':
      this.drawArrow({
        sx: this.startCoor.x,
        sy: this.startCoor.y,
        ex: x,
        ey: y,
        ctx: this.temCtx,
        canvas: this.temCanvas
      });
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

  drawFromSocket(data, pageType = 'page', isRedraw = true) {
    if (!data) return;
    let lineData = data instanceof Array ? data : [data];
    lineData.forEach(obj => {
      const { type, points, color, size, ID, pageId, clientWidth, clientHeight, autoId } = obj;
      this.resizeFn.forEach(v => v(clientWidth / clientHeight, autoId));
      const pushObj = JSON.parse(JSON.stringify(obj));
      const prop = this.width / clientWidth;
      pushObj.size = size * prop;
      pushObj.points = points.map(v => ({
        x: v.x * prop,
        y: v.y * prop
      }));
      pushObj.lineWidth = pushObj.size;
      pushObj.strokeStyle = color;
      this.drawUseData(pushObj, type);
      if (isRedraw) {
        const key = `${pageType}${pageType === 'whiteBoard' ? '' : this.autoId}${pageId}`;
        if (this.historyData[key] === undefined) this.historyData[key] = [];
        this.historyData[key][parseInt(ID)] = obj;
      }
    });
    this.lastDrawData = lineData[lineData.length - 1];
  }

  drawUseData(data, type) {
    if (!data) return;
    const {
      lineWidth = this.lineWidth,
      strokeStyle = this.strokeStyle,
      points
    } = data;
    const setStyleOption = { strokeStyle };
    if (!this.inDelete) setStyleOption.lineWidth = lineWidth;
    this.setStyle(setStyleOption);

    switch (type) {
    case 'freeline':
    case 'line':
      this.drawLineUseData(points);
      break;
    case 'straightLine':
      this.drawStraightLineUseData(points);
      break;
    case 'arrowLine':
      this.drawArrowUseData(points);
      break;
    case 'rect':
      this.drawRectUseData(points);
      break;
    case 'circle':
      this.drawCircleUseData(points);
      break;
    case 'circ':
    case 'ellipse':
      this.drawEllipseUseData(points);
      break;
    case 'text':
      this.drawTextUseData(data);
      break;
    }
  }

  drawLine(x, y) {
    const type = this.type;
    const ctx = this.temCtx;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    if (type === 'line' || type === 'freeline') this.record({ x, y, type, id: this.drawID });
  }

  drawLineUseData(data) {
    if (!data) return;
    this.ctx.beginPath();
    this.ctx.moveTo(data[0].x, data[0].y);
    for (let i = 1, len = data.length; i < len; i++) {
      const { x, y } = data[i];
      this.ctx.lineTo(x, y);
    }
    this.ctx.stroke();
  }

  drawArrow({ sx, sy, ex, ey, ctx, canvas, arrowAngle = 45, arrowLen = 30 }) {
    if (canvas) this.clearCanvas(canvas, ctx);
    const aa = arrowAngle * Math.PI / 180;
    const arrowX = Math.cos(aa / 2) * arrowLen;
    const arrowY = Math.sin(aa / 2) * arrowLen;
    ctx.beginPath();
    ctx.fillStyle = this.strokeStyle;
    ctx.moveTo(sx, sy);
    ctx.save();
    ctx.translate(ex, ey);
    const tanAngle = Math.atan((ey - sy) / (ex - sx));
    let angle = tanAngle;
    if (tanAngle > 0) {
      if (ey - sy < 0) angle = tanAngle - Math.PI;
    } else {
      if (ey - sy > 0) angle = tanAngle + Math.PI;
    }
    ctx.rotate(angle);
    ctx.lineTo(-arrowX, -arrowY / 2);
    ctx.lineTo(-arrowX, -arrowY);
    ctx.lineTo(0, 0);
    ctx.lineTo(-arrowX, arrowY);
    ctx.lineTo(-arrowX, arrowY / 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  drawArrowUseData(data) {
    const [s, e] = data;
    this.drawArrow({
      sx: s.x,
      sy: s.y,
      ex: e.x,
      ey: e.y,
      ctx: this.notLineCtx,
    });
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
      // ctx.stroke();
      // ctx.beginPath();
      // ctx.moveTo(x, y);
    }
    ctx.lineTo(a, 0);
    ctx.stroke();
    ctx.restore();
  }

  drawTextUseData(data) {
    const { content, size, points, color } = data;
    this.ctx.fillStyle = color;
    this.ctx.font = `${size}px arial`;
    this.ctx.fillText(content, points[0].x, points[0].y);
  }

  // 本地执行删除编辑
  deleteEdit(x, y) {
    let isFind = false;
    try {
      Object.keys(this.way).forEach(type => {
        const v = this.way[type];
        Object.keys(v).forEach(id => {
          const isNear = this.getClickIsNear({ type, points: v[id].points, dot: { x, y } });
          if (isNear) {
            isFind = { id, type };
            throw 'find';
          }
        });
      });
    } catch (e) {
      if (isFind) {
        const { type, id } = isFind;
        delete this.way[type][id];
        this.reDrawAll(this.deleteLineWidth);
      }
    }
  }

  switchToDlete() {
    this.inDelete = !this.inDelete;
    this.reDrawAll(this.deleteLineWidth);
  }

  reDrawAll(lineWidth) {
    this.clear();
    if (lineWidth) this.ctx.lineWidth = lineWidth;
    Object.keys(this.way).forEach(type => {
      const v = this.way[type];
      Object.keys(v).forEach(id => {
        this.drawUseData(v[id], type);
      });
    });
  }

  getClickIsNear({ type, points, dot }) {
    switch (type) {
    case 'freeline':
    case 'line':
      return this.getClickIsNearForLine(points, dot);
    case 'arrowLine':
    case 'straightLine':
      return this.getClickIsNearForStraightLine(points, dot);
    case 'rect':
      return this.getClickIsNearForRect(points, dot);
    case 'circ':
    case 'ellipse':
      return this.getClickIsNearForEllipse(points, dot);
    }
  }

  getClickIsNearForLine(points, dot) {
    for (let i = 0, len = points.length; i < len; i++) {
      const distance = this._getDotDistance(dot, points[i]);
      if (distance < this.deleteJudgeDis) {
        return true;
      }
    }
    return false;
  }

  getClickIsNearForStraightLine([s, e], dot) {
    const distanceS = this._getDotDistance(s, dot);
    const distanceE = this._getDotDistance(e, dot);
    const len = this._getDotDistance(s, e);
    return distanceE + distanceS - len < this.deleteJudgeDis;
  }

  getClickIsNearForRect([s, e], dot) {
    const a = [s, { x: s.x, y: e.y }];
    const b = [s, { x: e.x, y: s.y }];
    const c = [e, { x: s.x, y: e.y }];
    const d = [e, { x: e.x, y: s.y }];
    return (
      this.getClickIsNearForStraightLine(a, dot) ||
      this.getClickIsNearForStraightLine(b, dot) ||
      this.getClickIsNearForStraightLine(c, dot) ||
      this.getClickIsNearForStraightLine(d, dot)
    );
  }

  getClickIsNearForEllipse([s, e], dot) {
    const mid = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
    const disX = Math.abs(s.x - e.x);
    const disY = Math.abs(s.y - e.y);
    const midL = Math.abs(disX - disY);
    const midDis = (disX > disY ? disY : disX) / 2 + midL / 2;
    const distance = this._getDotDistance(mid,dot);
    return Math.abs(distance - midDis) < this.deleteJudgeDis;
  }

  _getDotDistance(s, e) {
    return Math.sqrt(Math.pow(s.x - e.x, 2) + Math.pow(s.y - e.y, 2));
  }

  getNewCanvas() {
    const newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('width', this.width);
    newCanvas.setAttribute('height', this.height);
    newCanvas.setAttribute('style', 'position:absolute;top:0;left:0;transform: none;');
    this.canvasDiv.appendChild(newCanvas);
    const ctx = newCanvas.getContext('2d');
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    newCanvas.oncontextmenu = function (e) {
      e.preventDefault();
    };
    return { newCanvas, ctx };
  }

  setType(type) {
    if (this.inDelete) {
      this.inDelete = false;
      this.setStyle({
        lineWidth: this.lineWidth,
        strokeStyle: this.strokeStyle
      });
    }
    this.type = type;
  }

  setMeasurement({ w, h, pageId, pageType, isRedraw = true }) {
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
    let canvasDivStyle = `position:absolute;width:${this.width}px;height:${this.height}px;top:50%;left:50%;margin-top:-${this.height / 2}px;margin-left:-${this.width / 2}px;`;
    if (pageType === 'whiteBoard') canvasDivStyle += 'background:#fff;';
    this.canvasDiv.setAttribute('style', canvasDivStyle);

    if (isRedraw) this.redraw(pageId || 0, pageType);
  }

  setStyle({ lineWidth, strokeStyle }) {
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
    return this;
  }

  record({ x, y, type, id }) {
    const key = this.way[type];
    key[id] = key[id] || {
      lineWidth: this.lineWidth,
      strokeStyle: this.strokeStyle,
      points: []
    };
    key[id].points.push({ x, y });
  }

  clearCanvas(canvas, ctx) {
    canvas.width = this.width;
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
  }

  clear(toInitWay = false) {
    this.clearCanvas(this.canvas, this.ctx);
    this.clearCanvas(this.temCanvas, this.temCtx);
    this.clearCanvas(this.notLineCanvas, this.notLineCtx);
    if (toInitWay) this.initWay();
  }

  // 根据id删除对应的画笔
  delete({ pageId, ID, pageType = 'page' }) {
    const key = `${pageType}${pageType === 'whiteBoard' ? '' : this.autoId}${pageId}`;
    if (!this.historyData[key]) return;
    const newArr = this.historyData[key].reduce((a, v, i) => {
      if (parseInt(i) !== parseInt(ID)) {
        a.push(v);
      }
      return a;
    }, []);
    this.clear();
    newArr.forEach(v => {
      this.drawFromSocket(v, pageType);
    });
    this.historyData[key] = newArr;
  }

  redraw(pageId, pageType = 'page', time) {
    this.clear();
    const key = `${pageType}${pageType === 'whiteBoard' ? '' : this.autoId}${pageId}`;
    const hisArr = this.historyData[key];
    if (!hisArr) return;
    hisArr.forEach(v => {
      if (time === undefined || (time !== undefined && v.timeStamp !== undefined && time >= v.timeStamp)) {
        this.drawFromSocket(v, pageType, false);
      }
    });
    return true;
  }

  initWay() {
    this.way = { line: {}, straightLine: {}, rect: {}, circle: {}, ellipse: {}, arrowLine: {} };
  }

  clearHistory(autoId, pageId, ID) {
    // log(`clearHistory,autoId:${autoId},pageId:${pageId},ID:${ID}`);
    if (autoId !== undefined) {
      if (pageId !== undefined) {
        const key = this._getKey(autoId, pageId);
        let hisArr = this.historyData[key];
        if (!hisArr) return this;
        ID !== undefined
          ? hisArr.splice(parseInt(ID), 1)
          : (this.historyData[key] = []);
      } else {
        for (let key in this.historyData) {
          if (key.indexOf('page') !== -1) {
            this.historyData[key] = [];
          }
        }
      }
    } else {
      this.historyData = {};
      this.clear();
    }
    return this;
  }

  saveHistory(obj) {
    const { ID, pageId, autoId } = obj;
    const key = this._getKey(autoId, pageId);
    if (this.historyData[key] === undefined) this.historyData[key] = [];
    this.historyData[key][parseInt(ID)] = obj;
  }

  _getKey(autoId, pageId) {
    const isWhite = parseInt(autoId) === 0;
    return `${isWhite ? 'whiteBoard' : 'page'}${isWhite ? '' : autoId}${pageId}`;
  }

  subResize(fn) {
    if (fn instanceof Function) {
      this.resizeFn.push(fn);
    }
  }
}

export default Paintbrush;
