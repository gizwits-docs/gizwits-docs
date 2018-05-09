title: APP代码自动生成服务介绍
----
# 概述

为了降低开发智能硬件APP开发门槛，降低开发资源的投入，机智云在《APP开源框架》基础上进一步推出了实现项目完整控制功能的APP开源代码。当开发者在产品项目上创建对应的数据点后，云端会根据产品定义的数据点生成对应产品的APP参考代码。

自动生成的APP代码模块化集成了一个智能硬件APP必备功能，主要包括：
+ 1.用户部分：用户注册，找回密码、第三方登录（微信登录、QQ登录）
+ 2.配置设备入网（Arilink+SoftAP）
+ 3.设备发现，列表展示
+ 4.设备控制
+ 5.消息推送：设备报警后给APP推送报警信息，主要合作推送平台是极光推送和百度推送。

开发者下载源码后，只需要优化UI和设计设备控制界面控制逻辑，源码的控制页面编写了机智云SDK控制设备的标准流程，APP源码二次开发过程中只需按照该流程进行相关代码的优化即可快速完成针对自身产品的智能控制APP。

目前APP生成的源码支持 Andriod、iOS、APICloud平台。

# 工具使用指南

## 1.创建应用

1.1.开发者在机智云开发者中心创建产品和产品数据点后点击应用配置。

![Alt text](/assets/zh-cn/UserManual/App/1490684715654.png)

**注意数据点的命名不能为程序的常用关键字，比如switch、static、enum、native等等，否则生成的代码会有错误！**

1.2.在应用配置界面中添加新应用

![Alt text](/assets/zh-cn/UserManual/App/1490684847946.png)

1.3.分别创建一个安卓和iOS应用。

![Alt text](/assets/zh-cn/UserManual/App/1490684969060.png)

![Alt text](/assets/zh-cn/UserManual/App/1490685005707.png)

![Alt text](/assets/zh-cn/UserManual/App/1490685371464.png)

## 2.生成代码

2.1.查看产品的Product Secret，并复制到剪切板。

![Alt text](/assets/zh-cn/UserManual/App/1490685455353.png)

2.2.点击应用开发，选择刚才创建的安卓应用，粘贴刚才复制的Product Secret，点击生成代码包

![Alt text](/assets/zh-cn/UserManual/App/1490685798872.png)

2.3.等待一段时间后，即可下载源码。

![Alt text](/assets/zh-cn/UserManual/App/1490686247685.png)

2.4.下载的源码是一个压缩包，解压后即可看到相关源码。

![Alt text](/assets/zh-cn/UserManual/App/1490686384224.png)

2.5.关于源码的使用说明，请参考文档解压后的附带文件《源码说明》！

![Alt text](/assets/zh-cn/UserManual/App/1490686450533.png)


## 3.	重要提示

#### 查阅《[APP代码自动生成服务介绍](http://docs.gizwits.com/zh-cn/UserManual/devApp.html)》，可了解自动生成的APP代码模块具备哪些功能；

#### 查阅《APP开源框架》，可了解

 - [iOS开源框架使用指南](http://docs.gizwits.com/zh-cn/AppDev/iosframe.html)
 
 - [iOS App消息推送集成指南](http://docs.gizwits.com/zh-cn/AppDev/iOS%E6%B6%88%E6%81%AF%E6%8E%A8%E9%80%81.html)
 
 - [iOS App集成第三方登录与换肤指南](http://docs.gizwits.com/zh-cn/AppDev/iOS%E7%AC%AC%E4%B8%89%E6%96%B9%E7%99%BB%E9%99%86%E4%B8%8E%E6%8D%A2%E8%82%A4.html)
 - [iOS App快速开发实例](http://docs.gizwits.com/zh-cn/quickstart/iOSAPPFrame.html)
 - [Android开源框架使用指南（含源码）](http://docs.gizwits.com/zh-cn/AppDev/Android%E5%BC%80%E6%BA%90%E6%A1%86%E6%9E%B6%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.html)
 - [Android App消息推送集成指南](http://docs.gizwits.com/zh-cn/AppDev/Android%E6%B6%88%E6%81%AF%E6%8E%A8%E9%80%81.html)
 - [Android App集成第三方登录与换肤指南](http://docs.gizwits.com/zh-cn/AppDev/Android%E7%AC%AC%E4%B8%89%E6%96%B9%E7%99%BB%E5%BD%95%E4%B8%8E%E6%8D%A2%E8%82%A4.html)
 - [APICloud开源框架使用指南](http://docs.gizwits.com/zh-cn/AppDev/APICloudFrame.html)
 
#### 查阅《APP开发SDK》，可随心开发IoT APP（很多细节设计，均可在里面找到应用案例）
 
 - [iOS SDK 2.0集成指南](http://docs.gizwits.com/zh-cn/AppDev/iOSSDKA2.html)
 - [Android SDK 2.0集成指南](http://docs.gizwits.com/zh-cn/AppDev/AndroidSDKA2.html)
 - [APICloud SDK使用指南](http://docs.gizwits.com/zh-cn/AppDev/APICloudWifiSDK.html)
 - [SDK数据透传方法解析](http://docs.gizwits.com/zh-cn/AppDev/SDK%E6%95%B0%E6%8D%AE%E9%80%8F%E4%BC%A0%E6%96%B9%E6%B3%95%E8%A7%A3%E6%9E%90.html)
 - [SDK调试日志抓取教程](http://docs.gizwits.com/zh-cn/AppDev/SDK%E8%B0%83%E8%AF%95%E6%97%A5%E5%BF%97%E6%8A%93%E5%8F%96%E6%95%99%E7%A8%8B.html)
 - [SDK错误码表](http://docs.gizwits.com/zh-cn/AppDev/sdk_error.html)
 
#### 更多应用开发

  - [应用开发FAQ](http://docs.gizwits.com/zh-cn/AppDev/%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91FAQ.html)
  - [设备分享功能使用流程](http://docs.gizwits.com/zh-cn/Cloud/SharingSDK.html)
  - [第三方登录平台申请流程](http://docs.gizwits.com/zh-cn/AppDev/third-party.html)
