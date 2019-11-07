title: iOS App集成第三方登录与换肤指南
---

查看[Android第三方登录与换肤指南](/zh-cn/AppDev/Android第三方登录与换肤.html)

查看[第三方登录平台申请流程](/zh-cn/AppDev/third-party.html)


# 概述
本文主要是介绍了如何通过开源框架快速支持QQ和微信登录，并介绍了如何实现app快速换肤
# QQ登录接入
APP要支持QQ登录，需要先到腾讯开放平台创建一个应用，获取应用的APPID，并设置到开源框架中即可。
## 获取APP ID 并绑定应用
查看[QQ开放平台应用申请教程](http://docs.gizwits.com/zh-cn/AppDev/third-party.html#腾讯QQ)获取APP ID和绑定机智云应用

## 开源框架配置
### 配置腾讯APP ID
将在腾讯开发平台申请到的APPID填写到开源框架的配置文件UIConfig.json中

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084069770.png)

### 配置URL Schemes
选择QQ登陆跳转到QQ授权登陆界面，登陆成功后需要跳转回我们的APP，此时需要给QQ SDK一个跳转路径，这个路径就是通过URL Schemes来设置的。

   选择Targets -> Info 选择URL Types可以看到如下界面

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084102806.png)

红框部分中必须修改的有两个部分：URL Schemes和Identifier。

URL Schemes的修改规则是：tencent + 腾讯的APP ID。

Identifier一般采用反转域名来保证名字的唯一性，也可如图填写程序的Bundle Identify。

# 微信登陆接入
APP要实现微信登陆，必须前往微信开放平台申请一个应用，获取应用的APPID和APPSecret并且配置到开源框架中即可。

## 获取APPID和APPSecret
查看[微信开放平台应用申请教程](http://docs.gizwits.com/zh-cn/AppDev/third-party.html#微信)获取APPID和APPSecret

## 开源框架配置
### 配置微信APP ID
将在微信开发平台申请到的APPID和APPSecret填写到开源框架的配置文件UIConfig.json中，如下图

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084442460.png)

### 配置URL Schemes

选择微信登陆跳转到微信授权登陆界面，登陆成功后需要跳转回我们的APP，此时需要给微信SDK一个跳转路径，通过URL Schemes来设置这个路径。

选择Targets -> Info 选择URL Types可以看到如下界面。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084496344.png)

红框部分中必须修改的有两个部分：URL Schemes和Identifier。

URL Schemes的修改规则是：微信的APP ID。

Identifier一般采用反转域名来保证名字的唯一性，也可如图填写程序的Bundle Identify。

# APP快速换肤
开源框架已集成了皮肤定制功能。通过修改UIConfig.json文件即可实现快速换肤。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084543501.png)

如图红框内所示，为自定义皮肤代码修改区，各含义如下

```objectivec
buttonColor：按钮颜色
buttonTextColor：按钮文字颜色
navigationBarColor：导航栏颜色
navigationBarTextColor：导航栏文字颜色
configProgressViewColor：配置中界面 progress view 颜色
statusBarStyle：状态栏颜色
```
通过修改对应的颜色值即可实现快速换肤，参考如下示例：

**1. 肤色一**

```objectivec
"buttonColor":"6ebe37",
"buttonTextColor":"ffffff",
"navigationBarColor":"6ebe37",
"navigationBarTextColor":"ffffff",
"configProgressViewColor":"000000",
" statusBarStyle "：1
```
实际效果图：

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478096446835.png)

**2. 肤色二**
```objectivec
"buttonColor":"ff8a44",
"buttonTextColor":"ffffff",
"navigationBarColor":"ff8a44",
"navigationBarTextColor":"ffffff",
"configProgressViewColor":"000000",
" statusBarStyle "：1
```
实际效果图：

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478096491169.png)

**3. 肤色三**

```objectivec
"buttonColor":" 16b599",
"buttonTextColor":"ffffff",
"navigationBarColor":" 16b599",
"navigationBarTextColor":"ffffff",
"configProgressViewColor":"000000",
" statusBarStyle "：0
```
实际效果图：

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478096529940.png)





## 	重要提示

#### 查阅《[APP代码自动生成服务介绍](http://docs.gizwits.com/zh-cn/UserManual/devApp.html)》，可了解自动生成的APP代码模块具备哪些功能

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


