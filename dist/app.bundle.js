!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=5)}([function(t,e,i){var s=i(1);"string"==typeof s&&(s=[[t.i,s,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};i(3)(s,n);s.locals&&(t.exports=s.locals)},function(t,e,i){(t.exports=i(2)(!1)).push([t.i,"body {\n  margin: 20px;\n  padding: 0; }\n\n.out {\n  position: relative;\n  width: 900px;\n  height: 900px; }\n\n#canvasDiv {\n  width: 800px;\n  height: 600px; }\n\n#canvasDiv canvas {\n  border: solid 1px #aaa; }\n\n.btns {\n  position: absolute;\n  top: 650px;\n  width: 50%; }\n  .btns button {\n    width: 100px;\n    height: 50px;\n    line-height: 50px;\n    text-align: center;\n    border-radius: 5px;\n    margin: 10px;\n    cursor: pointer; }\n    .btns button.active {\n      background-color: blue;\n      color: #fff; }\n",""])},function(t,e,i){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var i=function(t,e){var i=t[1]||"",s=t[3];if(!s)return i;if(e&&"function"==typeof btoa){var n=(a=s,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),r=s.sources.map(function(t){return"/*# sourceURL="+s.sourceRoot+t+" */"});return[i].concat(r).concat([n]).join("\n")}var a;return[i].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+i+"}":i}).join("")},e.i=function(t,i){"string"==typeof t&&(t=[[null,t,""]]);for(var s={},n=0;n<this.length;n++){var r=this[n][0];null!=r&&(s[r]=!0)}for(n=0;n<t.length;n++){var a=t[n];null!=a[0]&&s[a[0]]||(i&&!a[2]?a[2]=i:i&&(a[2]="("+a[2]+") and ("+i+")"),e.push(a))}},e}},function(t,e,i){var s,n,r={},a=(s=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===n&&(n=s.apply(this,arguments)),n}),o=function(t){var e={};return function(t,i){if("function"==typeof t)return t();if(void 0===e[t]){var s=function(t,e){return e?e.querySelector(t):document.querySelector(t)}.call(this,t,i);if(window.HTMLIFrameElement&&s instanceof window.HTMLIFrameElement)try{s=s.contentDocument.head}catch(t){s=null}e[t]=s}return e[t]}}(),h=null,c=0,l=[],d=i(4);function u(t,e){for(var i=0;i<t.length;i++){var s=t[i],n=r[s.id];if(n){n.refs++;for(var a=0;a<n.parts.length;a++)n.parts[a](s.parts[a]);for(;a<s.parts.length;a++)n.parts.push(w(s.parts[a],e))}else{var o=[];for(a=0;a<s.parts.length;a++)o.push(w(s.parts[a],e));r[s.id]={id:s.id,refs:1,parts:o}}}}function f(t,e){for(var i=[],s={},n=0;n<t.length;n++){var r=t[n],a=e.base?r[0]+e.base:r[0],o={css:r[1],media:r[2],sourceMap:r[3]};s[a]?s[a].parts.push(o):i.push(s[a]={id:a,parts:[o]})}return i}function p(t,e){var i=o(t.insertInto);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var s=l[l.length-1];if("top"===t.insertAt)s?s.nextSibling?i.insertBefore(e,s.nextSibling):i.appendChild(e):i.insertBefore(e,i.firstChild),l.push(e);else if("bottom"===t.insertAt)i.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var n=o(t.insertAt.before,i);i.insertBefore(e,n)}}function y(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=l.indexOf(t);e>=0&&l.splice(e,1)}function v(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var s=function(){0;return i.nc}();s&&(t.attrs.nonce=s)}return x(e,t.attrs),p(t,e),e}function x(t,e){Object.keys(e).forEach(function(i){t.setAttribute(i,e[i])})}function w(t,e){var i,s,n,r;if(e.transform&&t.css){if(!(r="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=r}if(e.singleton){var a=c++;i=h||(h=v(e)),s=m.bind(null,i,a,!1),n=m.bind(null,i,a,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(i=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",x(e,t.attrs),p(t,e),e}(e),s=function(t,e,i){var s=i.css,n=i.sourceMap,r=void 0===e.convertToAbsoluteUrls&&n;(e.convertToAbsoluteUrls||r)&&(s=d(s));n&&(s+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */");var a=new Blob([s],{type:"text/css"}),o=t.href;t.href=URL.createObjectURL(a),o&&URL.revokeObjectURL(o)}.bind(null,i,e),n=function(){y(i),i.href&&URL.revokeObjectURL(i.href)}):(i=v(e),s=function(t,e){var i=e.css,s=e.media;s&&t.setAttribute("media",s);if(t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}.bind(null,i),n=function(){y(i)});return s(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;s(t=e)}else n()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var i=f(t,e);return u(i,e),function(t){for(var s=[],n=0;n<i.length;n++){var a=i[n];(o=r[a.id]).refs--,s.push(o)}t&&u(f(t,e),e);for(n=0;n<s.length;n++){var o;if(0===(o=s[n]).refs){for(var h=0;h<o.parts.length;h++)o.parts[h]();delete r[o.id]}}}};var g,b=(g=[],function(t,e){return g[t]=e,g.filter(Boolean).join("\n")});function m(t,e,i,s){var n=i?"":s.css;if(t.styleSheet)t.styleSheet.cssText=b(e,n);else{var r=document.createTextNode(n),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(r,a[e]):t.appendChild(r)}}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var i=e.protocol+"//"+e.host,s=i+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var n,r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r)?t:(n=0===r.indexOf("//")?r:0===r.indexOf("/")?i+r:s+r.replace(/^\.\//,""),"url("+JSON.stringify(n)+")")})}},function(t,e,i){"use strict";i.r(e);var s=class{constructor(t,{type:e="line",width:i=500,height:s=500,lineWidth:n=3,strokeStyle:r="red",canEdit:a=!1}={}){if(this.canvasDiv="string"==typeof t?document.querySelector(t):t,!this.canvasDiv)throw new Error("can't find canvas element");this.canvasDiv.setAttribute("style","position:absolute;width:100%;height:100%;left:0;top:0;"),this.width=i,this.height=s,this.lineWidth=n,this.strokeStyle=r;const o=this.getNewCanvas();this.canvas=o.newCanvas,this.ctx=o.ctx;const h=this.getNewCanvas();this.temCanvas=h.newCanvas,this.temCtx=h.ctx;const c=this.getNewCanvas();this.notLineCanvas=c.newCanvas,this.notLineCtx=c.ctx,this.isDown=!1,this.endCoor={},this.startCoor={},this.way=null,this.initWay(),this.historyData={},this.drawID="",this.type=e;const l=this.canvasDiv.getBoundingClientRect();this.origin={x:l.left,y:l.top},this.lastDrawData=null,this.autoId="",this.resizeFn=[],this.inDelete=!1,this.deleteLineWidth=8,this.deleteJudgeDis=20,a&&this.listen()}listen(){this.canvasDiv.addEventListener("mousedown",this.eventCallback("mousedown")),this.canvasDiv.addEventListener("mouseup",this.eventCallback("mouseup")),this.canvasDiv.addEventListener("mousemove",this.eventCallback("mousemove")),this.canvasDiv.addEventListener("mouseout",this.eventCallback("mouseout"))}eventCallback(t){return e=>{const i=e||window.event,s=document.documentElement.scrollLeft||document.body.scrollLeft,n=document.documentElement.scrollTop||document.body.scrollTop,r=i.clientX+s-this.origin.x,a=i.clientY+n-this.origin.y;switch(t){case"mousedown":this.startCoor.x=r,this.startCoor.y=a,this.start(r,a);break;case"mousemove":this.draw(r,a),this.endCoor.x=r,this.endCoor.y=a;break;case"mouseup":case"mouseout":this.done()}}}start(t,e){if(this.inDelete)return this.deleteEdit(t,e);const i=this.type;"line"!==i&&"freeline"!==i||this.ctx.beginPath(),"line"!==i&&"freeline"!==i&&"straightLine"!==i||this.ctx.moveTo(t,e),this.isDown=!0,this.drawID=`${this.type}_${Date.now()}`,this.record({x:t,y:e,type:this.type,id:this.drawID})}done(){if(!this.isDown)return;const t=this.type;if("line"!==t&&"freeline"!==t)this.record({x:this.endCoor.x,y:this.endCoor.y,type:t,id:this.drawID});else{const t=this.way.line;Object.keys(t).forEach(e=>{1===t[e].points.length&&delete t[e]})}this.clearCanvas(this.temCanvas,this.temCtx),this.drawUseData(this.way[t][this.drawID],t),this.isDown=!1}draw(t,e){if(this.isDown)switch(this.type){case"freeline":case"line":this.drawLine(t,e);break;case"arrowLine":this.drawArrow({sx:this.startCoor.x,sy:this.startCoor.y,ex:t,ey:e,ctx:this.temCtx,canvas:this.temCanvas});break;case"straightLine":this.drawStraightLine(t,e);break;case"rect":this.drawRect(t,e);break;case"circle":this.drawCircle(t,e);break;case"ellipse":this.drawEllipse(t,e)}}drawFromSocket(t,e="page",i=!0){if(!t)return;let s=t instanceof Array?t:[t];s.forEach(t=>{const{type:s,points:n,color:r,size:a,ID:o,pageId:h,clientWidth:c,clientHeight:l,autoId:d}=t;this.resizeFn.forEach(t=>t(c/l,d));const u=JSON.parse(JSON.stringify(t)),f=this.width/c;if(u.size=a*f,u.points=n.map(t=>({x:t.x*f,y:t.y*f})),u.lineWidth=u.size,u.strokeStyle=r,this.drawUseData(u,s),i){const i=`${e}${"whiteBoard"===e?"":this.autoId}${h}`;void 0===this.historyData[i]&&(this.historyData[i]=[]),this.historyData[i][parseInt(o)]=t}}),this.lastDrawData=s[s.length-1]}drawUseData(t,e){if(!t)return;const{lineWidth:i=this.lineWidth,strokeStyle:s=this.strokeStyle,points:n}=t,r={strokeStyle:s};switch(this.inDelete||(r.lineWidth=i),this.setStyle(r),e){case"freeline":case"line":this.drawLineUseData(n);break;case"straightLine":this.drawStraightLineUseData(n);break;case"arrowLine":this.drawArrowUseData(n);break;case"rect":this.drawRectUseData(n);break;case"circle":this.drawCircleUseData(n);break;case"circ":case"ellipse":this.drawEllipseUseData(n);break;case"text":this.drawTextUseData(t)}}drawLine(t,e){const i=this.type,s=this.temCtx;s.lineTo(t,e),s.stroke(),s.beginPath(),s.moveTo(t,e),"line"!==i&&"freeline"!==i||this.record({x:t,y:e,type:i,id:this.drawID})}drawLineUseData(t){if(t){this.ctx.beginPath(),this.ctx.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++){const{x:i,y:s}=t[e];this.ctx.lineTo(i,s)}this.ctx.stroke()}}drawArrow({sx:t,sy:e,ex:i,ey:s,ctx:n,canvas:r,arrowAngle:a=45,arrowLen:o=30}){r&&this.clearCanvas(r,n);const h=a*Math.PI/180,c=Math.cos(h/2)*o,l=Math.sin(h/2)*o;n.beginPath(),n.fillStyle=this.strokeStyle,n.moveTo(t,e),n.save(),n.translate(i,s);const d=Math.atan((s-e)/(i-t));let u=d;d>0?s-e<0&&(u=d-Math.PI):s-e>0&&(u=d+Math.PI),n.rotate(u),n.lineTo(-c,-l/2),n.lineTo(-c,-l),n.lineTo(0,0),n.lineTo(-c,l),n.lineTo(-c,l/2),n.fill(),n.closePath(),n.restore()}drawArrowUseData(t){const[e,i]=t;this.drawArrow({sx:e.x,sy:e.y,ex:i.x,ey:i.y,ctx:this.notLineCtx})}drawStraightLine(t,e){this.clearCanvas(this.temCanvas,this.temCtx),this.temCtx.moveTo(this.startCoor.x,this.startCoor.y),this.drawLine(t,e)}drawStraightLineUseData(t){const[e,i]=t;this.ctx.beginPath(),this.ctx.moveTo(e.x,e.y),this.ctx.lineTo(i.x,i.y),this.ctx.stroke()}drawRect(t,e){this.clearCanvas(this.temCanvas,this.temCtx);const i=this.startCoor.x,s=this.startCoor.y;this.temCtx.strokeRect(i,s,t-i,e-s)}drawRectUseData(t){const[e,i]=t;this.notLineCtx.strokeRect(e.x,e.y,i.x-e.x,i.y-e.y)}drawCircle(t,e){this.clearCanvas(this.temCanvas,this.temCtx),this.circle({sx:this.startCoor.x,sy:this.startCoor.y,ex:t,ey:e,ctx:this.temCtx})}drawCircleUseData(t){const[e,i]=t;this.circle({sx:e.x,sy:e.y,ex:i.x,ey:i.y,ctx:this.notLineCtx})}circle({sx:t,sy:e,ex:i,ey:s,ctx:n}){const r=(i+t)/2,a=(s+e)/2,o=Math.sqrt((i-t)**2+(s-e)**2)/2;n.beginPath(),n.arc(r,a,o,0,2*Math.PI),n.stroke()}drawEllipse(t,e){this.clearCanvas(this.temCanvas,this.temCtx),this.ellipse({sx:this.startCoor.x,sy:this.startCoor.y,ex:t,ey:e,ctx:this.temCtx})}drawEllipseUseData(t){const[e,i]=t;this.ellipse({sx:e.x,sy:e.y,ex:i.x,ey:i.y,ctx:this.ctx})}ellipse({sx:t,sy:e,ex:i,ey:s,ctx:n}){const r=(i+t)/2,a=(s+e)/2,o=Math.abs((i-t)/2),h=Math.abs((s-e)/2);n.save(),n.translate(r,a),n.beginPath(),n.moveTo(o,0);for(let t=0;t<2*Math.PI;t+=.05){const e=Math.tan(t);let i=Math.sqrt(o**2*h**2/(h**2+(o*e)**2));t>Math.PI/2&&t<3*Math.PI/2&&(i=-i);const s=e*i;n.lineTo(i,s)}n.lineTo(o,0),n.stroke(),n.restore()}drawTextUseData(t){const{content:e,size:i,points:s,color:n}=t;this.ctx.fillStyle=n,this.ctx.font=`${i}px arial`,this.ctx.fillText(e,s[0].x,s[0].y)}deleteEdit(t,e){let i=!1;try{Object.keys(this.way).forEach(s=>{const n=this.way[s];Object.keys(n).forEach(r=>{if(this.getClickIsNear({type:s,points:n[r].points,dot:{x:t,y:e}}))throw i={id:r,type:s},"find"})})}catch(t){if(i){const{type:t,id:e}=i;delete this.way[t][e],this.reDrawAll(this.deleteLineWidth)}}}switchToDlete(){this.inDelete=!this.inDelete,this.reDrawAll(this.deleteLineWidth)}reDrawAll(t){this.clear(),t&&(this.ctx.lineWidth=t),Object.keys(this.way).forEach(t=>{const e=this.way[t];Object.keys(e).forEach(i=>{this.drawUseData(e[i],t)})})}getClickIsNear({type:t,points:e,dot:i}){switch(t){case"freeline":case"line":return this.getClickIsNearForLine(e,i);case"arrowLine":case"straightLine":return this.getClickIsNearForStraightLine(e,i);case"rect":return this.getClickIsNearForRect(e,i);case"circ":case"ellipse":return this.getClickIsNearForEllipse(e,i)}}getClickIsNearForLine(t,e){for(let i=0,s=t.length;i<s;i++)if(this._getDotDistance(e,t[i])<this.deleteJudgeDis)return!0;return!1}getClickIsNearForStraightLine([t,e],i){const s=this._getDotDistance(t,i);return this._getDotDistance(e,i)+s-this._getDotDistance(t,e)<this.deleteJudgeDis}getClickIsNearForRect([t,e],i){const s=[t,{x:t.x,y:e.y}],n=[t,{x:e.x,y:t.y}],r=[e,{x:t.x,y:e.y}],a=[e,{x:e.x,y:t.y}];return this.getClickIsNearForStraightLine(s,i)||this.getClickIsNearForStraightLine(n,i)||this.getClickIsNearForStraightLine(r,i)||this.getClickIsNearForStraightLine(a,i)}getClickIsNearForEllipse([t,e],i){const s={x:(t.x+e.x)/2,y:(t.y+e.y)/2},n=Math.abs(t.x-e.x),r=Math.abs(t.y-e.y),a=(n>r?r:n)/2+Math.abs(n-r)/2,o=this._getDotDistance(s,i);return Math.abs(o-a)<this.deleteJudgeDis}_getDotDistance(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}getNewCanvas(){const t=document.createElement("canvas");t.setAttribute("width",this.width),t.setAttribute("height",this.height),t.setAttribute("style","position:absolute;top:0;left:0;transform: none;"),this.canvasDiv.appendChild(t);const e=t.getContext("2d");return e.lineWidth=this.lineWidth,e.strokeStyle=this.strokeStyle,t.oncontextmenu=function(t){t.preventDefault()},{newCanvas:t,ctx:e}}setType(t){this.inDelete&&(this.inDelete=!1,this.setStyle({lineWidth:this.lineWidth,strokeStyle:this.strokeStyle})),this.type=t}setMeasurement({w:t,h:e,pageId:i,pageType:s,isRedraw:n=!0}){if(!t&&!e)return;isNaN(parseInt(t))||(this.width=t),isNaN(parseInt(e))||(this.height=e),this.canvas.setAttribute("width",this.width),this.canvas.setAttribute("height",this.height),this.temCanvas.setAttribute("width",this.width),this.temCanvas.setAttribute("height",this.height),this.notLineCanvas.setAttribute("width",this.width),this.notLineCanvas.setAttribute("height",this.height);let r=`position:absolute;width:${this.width}px;height:${this.height}px;top:50%;left:50%;margin-top:-${this.height/2}px;margin-left:-${this.width/2}px;`;"whiteBoard"===s&&(r+="background:#fff;"),this.canvasDiv.setAttribute("style",r),n&&this.redraw(i||0,s)}setStyle({lineWidth:t,strokeStyle:e}){return t&&(this.lineWidth=t,this.ctx.lineWidth=t,this.temCtx.lineWidth=t,this.notLineCtx.lineWidth=t),e&&(this.strokeStyle=e,this.ctx.strokeStyle=e,this.temCtx.strokeStyle=e,this.notLineCtx.strokeStyle=e),this}record({x:t,y:e,type:i,id:s}){const n=this.way[i];n[s]=n[s]||{lineWidth:this.lineWidth,strokeStyle:this.strokeStyle,points:[]},n[s].points.push({x:t,y:e})}clearCanvas(t,e){t.width=this.width,e.lineWidth=this.lineWidth,e.strokeStyle=this.strokeStyle}clear(t=!1){this.clearCanvas(this.canvas,this.ctx),this.clearCanvas(this.temCanvas,this.temCtx),this.clearCanvas(this.notLineCanvas,this.notLineCtx),t&&this.initWay()}delete({pageId:t,ID:e,pageType:i="page"}){const s=`${i}${"whiteBoard"===i?"":this.autoId}${t}`;if(!this.historyData[s])return;const n=this.historyData[s].reduce((t,i,s)=>(parseInt(s)!==parseInt(e)&&t.push(i),t),[]);this.clear(),n.forEach(t=>{this.drawFromSocket(t,i)}),this.historyData[s]=n}redraw(t,e="page",i){this.clear();const s=`${e}${"whiteBoard"===e?"":this.autoId}${t}`,n=this.historyData[s];if(n)return n.forEach(t=>{(void 0===i||void 0!==i&&void 0!==t.timeStamp&&i>=t.timeStamp)&&this.drawFromSocket(t,e,!1)}),!0}initWay(){this.way={line:{},straightLine:{},rect:{},circle:{},ellipse:{},arrowLine:{}}}clearHistory(t,e,i){if(void 0!==t)if(void 0!==e){const s=this._getKey(t,e);let n=this.historyData[s];if(!n)return this;void 0!==i?n.splice(parseInt(i),1):this.historyData[s]=[]}else for(let t in this.historyData)-1!==t.indexOf("page")&&(this.historyData[t]=[]);else this.historyData={},this.clear();return this}saveHistory(t){const{ID:e,pageId:i,autoId:s}=t,n=this._getKey(s,i);void 0===this.historyData[n]&&(this.historyData[n]=[]),this.historyData[n][parseInt(e)]=t}_getKey(t,e){const i=0===parseInt(t);return`${i?"whiteBoard":"page"}${i?"":t}${e}`}subResize(t){t instanceof Function&&this.resizeFn.push(t)}};i(0);window.onload=(()=>{const t=new s("#canvasDiv",{canEdit:!0,width:600,height:600});document.addEventListener("click",e=>{const i=e.target,s=i.getAttribute("id");switch("BUTTON"===i.tagName&&(document.querySelector(".active").removeAttribute("class"),i.setAttribute("class","active")),s){case"line":case"straightLine":case"arrowLine":case"rect":case"circle":case"ellipse":t.setType(s);break;case"red":case"green":t.setStyle({strokeStyle:s});break;case"other":t.setStyle({strokeStyle:"#abcdef"});break;case"lineWidth":t.setStyle({lineWidth:"5"});break;case"clear":t.clear(!0);break;case"delete":t.switchToDlete()}})})}]);