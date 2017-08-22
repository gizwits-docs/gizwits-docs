var redirectMap = {
  // 在这里添加重定向，注意逗号

//  '/zh-cn/old.html': '/zh-cn/new.html',
//  '/zh-cn/旧.html': '/zh-cn/新.html'

'/zh-cn/quickstart/独立mcu接入方案.html':'/zh-cn/quickstart/UseMCU.html',
'/zh-cn/quickstart/设备快速接入.html':'/zh-cn/quickstart/UseMCU.html',
'/zh-cn/UserManual/使用设备分组API教程.html':'/zh-cn/UserManual/devgroup_API.html'

}

var pathname = decodeURI(window.location.pathname)

if (redirectMap[pathname]) {
  window.location.href = encodeURI(redirectMap[pathname])
}
