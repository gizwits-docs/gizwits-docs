title:   Websocket 网页控制设备
---
# 概述
JavaScript网页远程控制设备，是调用了机智云开放的Open API和WebSocket API来实现的。其中，Open API用到的接口有匿名登录用户、绑定设备和获取绑定设备列表。而WebSocket API上的用户登陆、设备上线下线通知、浏览器与云端的数据交互（数据透传）、心跳和非法消息通知。

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片1.png)

当设备已经是成功连接上云端，就可使用以下流程来控制设备了：

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片2.png)

# 准备工作
调用OPEN API匿名登录用户和绑定设备

## 1.获取phone_id
phone_id 可以是手机的唯一识别码。或者您已经有了自己的用户系统，不希望用户再次注册一次机智云帐号，您也可以使用该接口，为您的每一个用户创建一个对应的机智云匿名帐号。这时，phone_id 可以是用户在您的系统中的唯一识别码。如在与微信应用做对接时，phone_id 可以设置成微信用户的 openid。

## 2.创建用户
http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_users

### 2.1.填写appid
![Alt text](/assets/zh-cn/UserManual/WebSocket/图片3.png)

### 2.2.填写body
![Alt text](/assets/zh-cn/UserManual/WebSocket/图片4.png)

### 2.3.登录匿名用户，获取token
![Alt text](/assets/zh-cn/UserManual/WebSocket/图片5.png)

## 3.绑定设备

POST请求链接：
http://swagger.gizwits.com/doc/index/openapi_apps#/绑定管理/post_app_bind_mac

### 3.1.填写appid

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片6.png)

### 3.2.填写刚才匿名登录回调的token

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片7.png)

### 3.3.填写Timestamp、Signature和body

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片8.png)

备注：时间戳计算链接，http://tool.chinaz.com/Tools/unixtime.aspx
MD5计算链接，http://tool.oschina.net/encrypt?type=2，如下图:

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片9.png)


# Websocket网页控制界面
## 1.websocket API封装起来的sdk
链接如下：
https://github.com/gizwits/gizwits-wechat-js-sdk

## 2.运行index.html

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片10.png)

## 3.Websocket网页控制界面
https://gizwits.github.io/gizwits-wechat-js-sdk/v0.2.0.html
如下：

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片11.png)

# 控制设备分两种方式
## 1.V4版本的标准数据点协议
### 1.1.初始化Gizwits WS对象
上面使用的参数有：
| 参数      | 	说明       |            	数值         | 
| ------------- |:-------------:|    -------------    |  
|apiHost	|机智云OpenApi域名	|api.gizwits.com|
|commType	|标准数据点协议格式	|attrs_v4|
|wechatOpenId	|微信用户OpenID（就是手机的iPhone_id）|	String|
|gizwitsAppId	|机智云平台应用标识	|String|

初始化，如下：

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片12.png)

### 1.2.获取绑定列表
如果该用户要获取绑定设备列表，先要确认该用户（就是该openid）是否有对要控制设备的已进行绑定了。

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片13.png)

### 1.3.创建Websocket连接
选择一个要进行控制的设备did，创建websocket连接

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片14.png)

### 1.4.读取设备当前状态
选择已连接的设备，读取设备的当前状态

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片15.png)

### 1.5.控制设备
选择已连接的设备，下发控制指令
如下发控制指令{"Swicth":true}，如下图：

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片16.png)

控制模拟设备效果：

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片17.png)

## 2.V4版本的自定义格式协议
V4版本的自定义格式协议（就是无法数据点透传）

### 2.1.初始化Gizwits WS对象
上面用的的参数有：

| 参数      | 	说明       |            	数值         | 
| ------------- |:-------------:|    -------------    |  
|  apiHost |  	机智云OpenApi域名	 |  api.gizwits.com |  
|  commType	 |  标准数据点协议格式 |  	attrs_v4 |  
|  wechatOpenId	 |  微信用户OpenID（就是手机的iPhone_id） |  	String |  
|  gizwitsAppId	 |  机智云平台应用标识 |  	String |  
 
![Alt text](/assets/zh-cn/UserManual/WebSocket/图片18.png)

### 2.2.获取绑定列表

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片19.png)

### 2.3创建websocket连接
选择一个要进行控制的设备did，创建websocket连接：

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片20.png)

### 2.4.读取设备的当前状态
选择已连接的设备，读取设备的当前状态：

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片21.png)

### 2.5.下发控制指令
选择已连接的设备，下发的控制指令：[0,0,0,3,9,0,0,144,1,0,1,2,3,4] （注意：下发数据的格式为十进制的，每个位端的表示为0,0,0,3为header、9为len、0为flag、0,144为cmd、1为action、0,1,2,3,4为业务指令），如下：

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片22.png)

模拟mcu收到命令，如下：
FF FF 00 0B 03 1E 00 00 01 00 01 02 03 04 37

![Alt text](/assets/zh-cn/UserManual/WebSocket/图片23.png)
