title: iOS App集成第三方登录与换肤指南
---

# 概述
本文主要是介绍了如何通过开源框架快速支持QQ和微信登录，并介绍了如何实现app快速换肤
# QQ登录接入
APP要支持QQ登录，需要先到腾讯开放平台创建一个应用，获取应用的APPID，并设置到开源框架中即可。
## 1. 创建腾讯开发者账号
已有腾讯开发者账号可跳过这部分

 点击http://open.qq.com进入腾讯开放平台
 
 ![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478083850757.png)

点击《登录》，填写账号密码登录
![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478083866404.png)

登录成功后跳转到注册界面，开发者可根据自己的需要选择个人或者公司类型。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478083885241.png)

下图是选择个人注册的跳转界面，需填写完整的资料，并完成邮箱验证，即成功创建腾讯开发者账号。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478083900437.png)

## 2. 创建腾讯应用
点击http://open.qq.com进入腾讯开放平台，选择《应用接入》

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478083936437.png)

选择《移动应用iOS》，点击《创建应用》

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478083948783.png)

完善应用信息，并提交审核。审核通过后，即可使用红框部分的APP ID 和 APP KEY来创建QQ登录入口。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478083965470.png)

## 3. 绑定QQ应用到机智云
登录机智云开发者中心：http://dev.gizwits.com/zh-cn/developer/product/，选中需要绑定第三方登录的产品

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084000620.png)

进入产品设置界面，选择需要关联QQ登录的应用，如下图：

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084015885.png)

点击《关联第三方登录》进入关联界面，填写从腾讯开放平台申请到的APPID，并点击确定，即完成了机智云应用于QQ应用的绑定。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084031585.png)

## 4. 开源框架配置
### 4.1 配置腾讯APP ID
将在腾讯开发平台申请到的APPID填写到开源框架的配置文件UIConfig.json中

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084069770.png)

### 4.2 配置URL Schemes
选择QQ登陆跳转到QQ授权登陆界面，登陆成功后需要跳转回我们的APP，此时需要给QQ SDK一个跳转路径，这个路径就是通过URL Schemes来设置的。

   选择Targets -> Info 选择URL Types可以看到如下界面
   
![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084102806.png)

红框部分中必须修改的有两个部分：URL Schemes和Identifier。

URL Schemes的修改规则是：tencent + 腾讯的APP ID。

Identifier一般采用反转域名来保证名字的唯一性，也可如图填写程序的Bundle Identify。

# 微信登陆接入
APP要实现微信登陆，必须前往微信开放平台申请一个应用，获取应用的APPID和APPSecret并且配置到开源框架中即可。
## 1. 创建微信开发者账号
已有开发者账号可以直接跳过这部分

点击https://open.weixin.qq.com进入微信开放平台

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084183604.png)

点击《注册》进入以下界面，编辑基本信息

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084198928.png)

点击下一步，微信会往你的注册邮箱发送一份激活邮件

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084224981.png)

点击激活链接，跳转到完善资料界面，填写资料，点击完成即成功创建了微信开放平台开发者账号。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084253920.png)

## 2. 创建微信应用
点击https://open.weixin.qq.com进入微信开发平台，选中图13的《管理中心》跳转到应用创建界面

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084280247.png)

点击《创建移动应用》按钮，进入以下界面，填写基本信息。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084303367.png)

填写完成，点击《下一步》，进入《填写平台信息界面》，选择需要的应用平台（一般iOS和Android都要），填写完毕信息，点击《提交审核》即可，提交审核成功，7天内微信会给出审核结果。审核通过后，应用的APPID 和APPKey就可以使用了。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084317355.png)

## 3. 开源框架配置
### 3.1 配置微信APP ID
将在微信开发平台申请到的APPID和APPSecret填写到开源框架的配置文件UIConfig.json中，如下图

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/change/1478084442460.png)

### 3.2 配置URL Schemes

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































