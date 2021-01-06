const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 节流函数 
function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
      gapTime = 1500
  }
  let _lastTime = null
  // 返回新的函数
  return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
          fn.apply(this, arguments)   //将this和参数传给原函数
          _lastTime = _nowTime
      }
  }
}

//防抖函数
// function throttle(fn, interval) {
//   var timer;
//   var gapTime = interval || 1000;//间隔时间，如果interval不传，则默认1000ms
//   return function () {
//       clearTimeout(timer);
//       var context = this;
//       var args = arguments;//保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
//       timer = setTimeout(function () {
//           fn.call(context, args);
//       }, gapTime);
//   };
// }


/** 
* 时间戳转化为年 月 日 时 分 秒 
* number: 传入时间戳 
* format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

module.exports = {
  formatTime: formatTime,
  throttle:throttle,
  formatTimeTwo: formatTimeTwo  //时间戳转日期
}

