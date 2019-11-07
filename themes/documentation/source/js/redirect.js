var redirectMap = {
  // 在这里添加重定向，注意逗号

//  '/zh-cn/old.html': '/zh-cn/new.html',
//  '/zh-cn/旧.html': '/zh-cn/新.html'

'/hc':'/en-us/overview/overview.html',
'/zh-cn/quickstart/独立mcu接入方案.html':'/zh-cn/quickstart/UseMCU.html',
'/zh-cn/quickstart/设备快速接入.html':'/zh-cn/quickstart/UseMCU.html',
'/zh-cn/UserManual/使用设备分组API教程.html':'/zh-cn/UserManual/devgroup_API.html',
'/zh-cn/UserManual/OTA使用教程.html':'/zh-cn/UserManual/OTA.html',
'/zh-cn/quickstart/iOSAPP快速入门.html':'/zh-cn/quickstart/iOSAPPFrame.html',
'/zh-cn/quickstart/5分钟了解机智云.html':'/zh-cn/quickstart/README.html',
'/zh-cn/quickstart/定义数据点.html':'/zh-cn/quickstart/datapoint_tutorial.html',
'/zh-cn/deviceDev/ArduinoUNO/sdk.html':"/zh-cn/deviceDev/ArduinoUNO/ArduinoUnoWiFi_SDK_API.html",
'/zh-cn/deviceDev/ArduinoUNO/intro.html':"/zh-cn/deviceDev/ArduinoUNO/ArduinoUnoWiFi_intro.html",
'/zh-cn/deviceDev/GoKit3 DEV SDK Common版移植说明.html':"/zh-cn/deviceDev/GoKit3_DEV_SDK_Common_transplant.html"
//'/zh-cn/deviceDev/WiFiSOC/GoKit3S程序详解.html':"/zh-cn/deviceDev/WiFiSOC/GoKit-SoC-explanation.html",
//'/zh-cn/deviceDev/Gokit3Voice/GoKit3V程序详解.html':'/zh-cn/deviceDev/Gokit3Voice/GoKit-MCU-explanation.html'


}

var pathname = decodeURI(window.location.pathname)
// var hash = window.location.hash

// if (redirectMap[pathname + hash]) {
if (redirectMap[pathname]) {
  window.location.href = encodeURI(redirectMap[pathname])
}
