## canvas实现的画板
> 最近一直负责公司云课堂的ppt部分，里面包括画板。这部分的功能我觉得值得分享出来。

#### 引入
直接引用lib目录下的index.js，引入Paintbrush类。
```javascript
import Paintbrush from '../lib/index';
```
#### 初始化
```javascript
const canvasCtr = new Paintbrush('#canvasDiv', {
    canEdit: true,
    width: 600,
    height: 600
});
```
直接new一下，第一个参数是画板元素，可以是选择器，也可以是dom元素，是必填的。第二个参数是相关设置，参数说明如下：

| 字段 | 说明 | 类型 | 是否必填 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 画板绘制时的类型，line表示画笔，arrowLine表示箭头，straightLine表示直线，rect表示方形，circle表示圆形，ellipse表示椭圆 | String | 否 | line |
| width | 画板宽度，单位默认为px | Number | 否 | 500 |
| height | 画板高度，单位默认为px | Number | 否 | 500 |
| lineWidth | 线条宽度 | Number | 否 | 3 |
| strokeStyle | 画笔颜色 | String | 否 | red |
| canEdit | 是否支持绘制，true表示支持绘制 | Boolean | 否 | false |

#### 绘制
在绘制过程中，主要是控制绘制图形的类型，就是你要绘制圆还是直线，以及线条的粗细、颜色等。比如改变颜色：
```javascript
canvasCtr.setStyle({ strokeStyle: '#abcdef' });
```
具体方法说明如下：

| 方法名 | 功能 | 参数 |
| --- | --- | --- |
| setStyle | 设置颜色和线条粗细 | 为一个对象，strokeStyle表示颜色，lineWidth表示线条的粗细 |
| setType | 设置绘制的类型 | 为一个字符串，line表示画笔，arrowLine表示箭头，straightLine表示直线，rect表示方形，circle表示圆形，ellipse表示椭圆 |
| clear | 清空画板 | 是否清空历史数据，默认为false |
| switchToDlete | 开启删除模式，这时不能画，点击指定已画线条进行删除 | 无 |

#### 获取已绘制数据
可以直接读取地段way来获取数据，如
```javascript
console.log(canvasCtr.way);
// { line: {}, straightLine: {}, rect: {}, circle: {}, ellipse: {}, arrowLine: {} }
```
输出的数据格式为一个对象，字段分别为图形的类型。
