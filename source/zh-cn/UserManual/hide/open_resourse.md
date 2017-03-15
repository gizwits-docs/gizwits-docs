title:  开发文档
---
[专题热点](http://topic.gizwits.com/) 、 [下载中心](http://dev.gizwits.com/zh-cn/developer/resource/hardware?type=GAgent)

# 快速入门
## 1 机智云机智云平台概述
机智云平台是机智云物联网公司经过多年行业内的耕耘及对物联网行业的深刻理解，而推出的面向个人、企业开发者的一站式智能硬件开发及云服务平台。平台提供了从定义产品、设备端开发调试、应用开发、产测、云端开发、运营管理、数据服务等覆盖智能硬件接入到运营管理全生命周期服务的能力。

机智云平台为开发者提供了自助式智能硬件开发工具与开放的云端服务。通过傻瓜化的自助工具、完善的SDK与API服务能力最大限度降低了物联网硬件开发的技术门槛，降低开发者的研发成本，提升开发者的产品投产速度，帮助开发者进行硬件智能化升级，更好的连接、服务最终消费者。
![机智云平台图片](http://club.gizwits.com/EDMimages/marstest/gizwitspingtai.png)

## 2 机智云平台架构

![@机智云PaaS平台架构](/assets/zh-cn/OverVeiw/架构.png)


## 3 设备如何快速接入机智云
硬件厂商对硬件智能化的第一步是让设备能够联网，GAgent是机智云提供的一款兼容国内主流Wi-Fi模块、移动网络模块的模组系统，可以提供上层应用（手机APP等控制端、云端）到产品设备的双向数据通讯，此外，还提供对设备的配置入网、发现绑定、程序升级等功能。
产品开发者使用GAgent后，只需要关心产品的业务逻辑开发，不用关心数据的通讯功能开发，大大降低了开发的难度。目前机智云提供由机智云移植的WiFi模组对应固件有：[汉枫LPB100](http://docs.gizwits.com/zh-cn/deviceDev/HF-LPB100%E4%B8%B2%E5%8F%A3%E7%83%A7%E5%86%99%E8%AF%B4%E6%98%8E.html)、[乐鑫8266](http://docs.gizwits.com/zh-cn/deviceDev/ESP8266%E4%B8%B2%E5%8F%A3%E7%83%A7%E5%86%99%E8%AF%B4%E6%98%8E.html)、[汉枫LPT120](http://docs.gizwits.com/zh-cn/deviceDev/debug/HF-LPT120.html)、高通4004 、RealTek 8711AM 、[庆科3162](http://docs.gizwits.com/zh-cn/deviceDev/MXCHIP%E4%B8%B2%E5%8F%A3%E7%83%A7%E5%86%99%E8%AF%B4%E6%98%8E.html)、[广和通G510](http://docs.gizwits.com/zh-cn/deviceDev/debug/G510.html)等。

相关链接：
- [了解GAgent](../deviceDev/gagent_info.html)
- [设备如何快速接入](/zh-cn/quickstart/设备快速接入.html)
 

# 手机应用开发（APP）
机智云提供了APP SDK、开源框架、微信SDK，便于开发者快速构建手机应用端系统，只需根据工具指引实现业务功能，无需实现底层功能。

## 1 SDk接入
- [安卓SDK接入](/zh-cn/AppDev/AndroidSDKA2.html)
- [IOS SDK接入](/zh-cn/AppDev/iOSSDKA2.html)
- [APICloud SDK使用指南](http://docs.gizwits.com/zh-cn/AppDev/APICloudWifiSDK.html)
- [SDK数据透传方法解析](http://docs.gizwits.com/zh-cn/AppDev/SDK%E6%95%B0%E6%8D%AE%E9%80%8F%E4%BC%A0%E6%96%B9%E6%B3%95%E8%A7%A3%E6%9E%90.html)

## 2 微信开发
- [了解微信应用开发](http://docs.gizwits.com/zh-cn/WechatDev/%E4%BA%86%E8%A7%A3%E5%BE%AE%E4%BF%A1%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91.html)
- [微信开发教程](http://docs.gizwits.com/zh-cn/WechatDev/WeChatDev.html)

## 3 APP开源框架
 - [iOS开源框架使用指南（含源码)](http://docs.gizwits.com/zh-cn/AppDev/iosframe.html)
 - [iOS App消息推送集成](http://docs.gizwits.com/zh-cn/AppDev/iOS%E6%B6%88%E6%81%AF%E6%8E%A8%E9%80%81.html)
 - [iOS App集成第三方登录与换肤](http://docs.gizwits.com/zh-cn/AppDev/iOS%E7%AC%AC%E4%B8%89%E6%96%B9%E7%99%BB%E9%99%86%E4%B8%8E%E6%8D%A2%E8%82%A4.html)
 - [Android开源框架使用指南（含源码）](http://docs.gizwits.com/zh-cn/AppDev/Android%E5%BC%80%E6%BA%90%E6%A1%86%E6%9E%B6%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.html)
 - [Android App消息推送](http://docs.gizwits.com/zh-cn/AppDev/Android%E6%B6%88%E6%81%AF%E6%8E%A8%E9%80%81.html)
 - [Android App集成第三方登录与换肤](http://docs.gizwits.com/zh-cn/AppDev/Android%E7%AC%AC%E4%B8%89%E6%96%B9%E7%99%BB%E5%BD%95%E4%B8%8E%E6%8D%A2%E8%82%A4.html)
 - [开源框架视频教程](http://docs.gizwits.com/zh-cn/AppDev/%E5%BC%80%E6%BA%90%E6%A1%86%E6%9E%B6%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B.html)


# 设备开发（硬件接入）

## 1 固件烧写教程
 - [HF-LPB100串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/HF-LPB100%E4%B8%B2%E5%8F%A3%E7%83%A7%E5%86%99%E8%AF%B4%E6%98%8E.html)
 - [ESP8266串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/ESP8266%E4%B8%B2%E5%8F%A3%E7%83%A7%E5%86%99%E8%AF%B4%E6%98%8E.html)
 - [HF-LPT120串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/debug/HF-LPT120.html)
 - [庆科3162串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/MXCHIP%E4%B8%B2%E5%8F%A3%E7%83%A7%E5%86%99%E8%AF%B4%E6%98%8E.html)
 - [广和通G510串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/debug/G510.html)
 
## 2 Gokit 资料
 
 - [Gokit 3 系列开发套件简介](http://docs.gizwits.com/zh-cn/deviceDev/Gokit3/Gokit3%E5%BC%80%E5%8F%91%E5%A5%97%E4%BB%B6%E7%AE%80%E4%BB%8B.html)
 - [GoKit 3 硬件手册](http://docs.gizwits.com/zh-cn/deviceDev/Gokit3/GoKit3%E7%A1%AC%E4%BB%B6%E6%89%8B%E5%86%8C.html)
 - [GoKit3(S) 开发套件介绍](http://docs.gizwits.com/zh-cn/deviceDev/WiFiSOC/GoKit3S%E5%BC%80%E5%8F%91%E5%A5%97%E4%BB%B6%E4%BB%8B%E7%BB%8D.html)
 - [GoKit3(S) 二次开发--开发环境搭](http://docs.gizwits.com/zh-cn/deviceDev/WiFiSOC/GoKit3S%E4%BA%8C%E6%AC%A1%E5%BC%80%E5%8F%91.html)
 - [GoKit3(S) 二次开发-程序详解](http://docs.gizwits.com/zh-cn/deviceDev/WiFiSOC/GoKit3S%E7%A8%8B%E5%BA%8F%E8%AF%A6%E8%A7%A3.html)

## 3 MCU代码自动生成
  - [MCU代码自动生成工具介绍](http://docs.gizwits.com/zh-cn/deviceDev/DevSDK/%E4%BB%A3%E7%A0%81%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%E5%B7%A5%E5%85%B7.html)
  - [DEV SDK Common版移植说明（通用平台）](http://docs.gizwits.com/zh-cn/deviceDev/GoKit3%20DEV%20SDK%20Common%E7%89%88%E7%A7%BB%E6%A4%8D%E8%AF%B4%E6%98%8E.html)

## 4 ECE雾计算
- [ECE雾计算入门教程](http://docs.gizwits.com/zh-cn/UserManual/ecevideos.html)
- 相关视频：
 - [企业账号注册](https://v.qq.com/x/page/n0362u2fgws.html)
 - [固件烧录](http://v.qq.com/x/page/r03612h7pr0.html)
 - [pk烧录](http://v.qq.com/x/page/p0361baxn9z.html)
 - [MCU协议介绍](http://v.qq.com/x/page/a03619wrrqr.html)
 - [lua脚本讲解](http://v.qq.com/x/page/d03617dbq8p.html)
 - [gokit跑lua演示](http://v.qq.com/x/page/y0361kmy887.html)

## 5 Arduino UNO
 - [Arduino UNO WiFi 接入机智云介绍](http://docs.gizwits.com/zh-cn/deviceDev/ArduinoUNO/intro.html)
 - [Arduino Uno WiFi 之ESP8266固件烧写教程](http://docs.gizwits.com/zh-cn/deviceDev/ArduinoUNO/Tutorial.html)
 - [Arduino Uno WiFi SDK之API介绍](http://docs.gizwits.com/zh-cn/deviceDev/ArduinoUNO/sdk.html)
 - [Arduino Uno WiFi 智能小夜灯](http://docs.gizwits.com/zh-cn/deviceDev/ArduinoUNO/example.html)

# 云平台
开发者如果已完成设备接入、APP开发，还需要从机智云PaaS平台获取数据构建一套业务管理系统，或者访问机智云提供的服务，则需了解以下文档:
- [了解企业应用开发](http://docs.gizwits.com/zh-cn/Cloud/ent_dev.html)
- [了解消息消息代理服务接口（Noti服务）](http://docs.gizwits.com/zh-cn/Cloud/noti1.0.html)
- [了解企业API](http://docs.gizwits.com/zh-cn/Cloud/enterprise_api.html)
- [SNoti API (V2.1.3)](http://docs.gizwits.com/zh-cn/Cloud/NotificationAPI.html)
- [Gizwits Open API（新）](http://docs.gizwits.com/zh-cn/Cloud/openapi_apps.html)
- [Websocket API 指南](http://docs.gizwits.com/zh-cn/Cloud/WebsocketAPI.html)

# 用户手册
 - [个人项目产品转企业项目产品](http://docs.gizwits.com/zh-cn/UserManual/change.html)
 - [OTA使用教程](http://docs.gizwits.com/zh-cn/UserManual/OTA%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.html)
 - [产测工具使用文档](http://docs.gizwits.com/zh-cn/deviceDev/%E4%BA%A7%E6%B5%8B%E5%B7%A5%E5%85%B7%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3.html)
 - [D3 Engine使用教程](http://docs.gizwits.com/zh-cn/UserManual/D3.html)
 - [ECE雾计算使用教程](http://docs.gizwits.com/zh-cn/UserManual/ece.html)
 - [接入亚马逊Echo音箱教程](http://docs.gizwits.com/zh-cn/UserManual/echo.html)
 - [实时大数据使用说明](http://docs.gizwits.com/zh-cn/UserManual/rtbd.html)
 - API使用教程
   - [利用openapi（postman）控制虚拟设备](http://docs.gizwits.com/zh-cn/UserManual/UseOpenAPI.html)
   - [Websocket 网页控制设备](http://docs.gizwits.com/zh-cn/UserManual/UseWebsocket.html)
   - [聚合API使用教程](http://docs.gizwits.com/zh-cn/UserManual/DataAPI.html)
   - [设备联动API使用教程](http://docs.gizwits.com/zh-cn/UserManual/LinkageAPI.html)


# 行业解决方案
机智云拥有多年的经验积累，可为客户提供各个垂直领域的行业解决方案。下面选择几个比较有代表性的行业解决方案： 
- [充电桩行业解决方案](http://topic.gizwits.com/chongdianzhuang/)
- [空净行业解决方案](http://topic.gizwits.com/zhinengkongqijinghuaqi/)
- [净水行业解决方案](http://topic.gizwits.com/zhinengjingshuiqi/)
 
# 机智云优势
### 1、高可用平台
 - SLA 99.99%
 - EB级海量数据支持
 - 弹性可伸缩架构
  
### 2、快速接入
 - 0.5天快速接入
 - 提供每个开发环节的SDK
 - 提供自动生成代码工具
 - 提供ECE能力，通过云端配置脚本自动适配私有协议
 - 提供行业完整解决方案
 
### 3、专业服务
 - 专业傻瓜工具支持
 - 专业方案架构团队支持
 - 专业运维支持
 
### 4、行业积累深厚
 - 700+企业客户验证
 - 5W + 社区开发者
 
### 5、安全性
 - 遵循X.509 证书标准
 - 企业数据云端加密存储
 - 关键业务数据加密
 - 专业安全公司渗透测试
 - 遵循ISO20007安全管理规范


### 6、多层次云端数据服务
  - 消息代理服务: 按需订阅企业设备数据
  - 企业API：提供设备控制、设备管理、设备位置服务、设备数据等服务
  - D3 Engine：灵活、强大的数据编排引擎

### 7、开放性
  - 全球最开放的物联网自助开发平台
  - 开放互联AWS ECHO、微信、JD、Nest、苹果HomeKit、苏宁云等各大平台

### 8、国际化

- 全球覆盖: 在国内、欧洲、美洲、东南亚建立独立数据中心与云平台，能覆盖客户全球大部分国家与地区的设备、用户接入
- 智能连接: 提供设备自动适配就近云服务能力


# 机智云全球联网报告

1.广州、深圳、广西、湖南、福建等城市/地区的网络响应速度均小于20ms（即0.02秒）；国内其他城市/地区的网络响应时间总体小于40ms（即0.04秒）；新加坡、马来西亚、印度尼西亚等城市/地区均小于20ms（即0.02秒）；亚洲其他城市/地区小于70ms（即0.07秒）。

![@机智云全球联网报告01](/assets/zh-cn/OverVeiw/GlobalReport_01.png)

2.中东地区响应速度均小于70ms（即0.07秒）；大洋洲的平均在98ms左右；非洲的平均为150ms左右（即0.15秒）；总体较为良好。

![@机智云全球联网报告02](/assets/zh-cn/OverVeiw/GlobalReport_02.png)

3.欧洲等地区的网络响应时间总体小于40ms（即0.04秒）。

![@机智云全球联网报告03](/assets/zh-cn/OverVeiw/GlobalReport_03.png)

4.北美洲等地区的网络响应时间总体小于40ms（即0.04秒）；南美洲的城市/地区响应速度平均146ms（即0.146秒）;总体相对较为良好。

![@机智云全球联网报告04](/assets/zh-cn/OverVeiw/GlobalReport_04.png)

（PS：由于网络的不稳定性，即存在一定小范围的响应速度误差）
