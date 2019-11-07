title: Android App集成第三方登录与换肤指南
---

查看[iOS第三方登录与换肤指南](/zh-cn/AppDev/iOS第三方登陆与换肤.html)

查看[第三方登录平台申请流程](/zh-cn/AppDev/third-party.html)


# 概述
本文主要是介绍了如何通过开源框架快速支持QQ和微信登录，并介绍了如何实现app快速换肤

# QQ登录接入

APP要支持QQ登录，需要先到腾讯开放平台创建一个应用，获取应用的APPID，并设置到开源框架中即可。

## 获取APP ID 并绑定应用
查看[QQ开放平台应用申请教程](http://docs.gizwits.com/zh-cn/AppDev/third-party.html#腾讯QQ)获取APP ID和绑定机智云应用

## 修改UIConfig.json文件

将在腾讯开发平台申请到的APPID填写到开源框架的配置文件UIConfig.json中

![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075283475.png)

正确填写“tencent_app_id”后部署运行，即可使用QQ登录了。

# 微信登录接入

APP要实现微信登录，必须前往微信开放平台申请一个应用，获取应用的APPID和APPSecret并且配置到开源框架中即可。

## 获取APPID和APPSecret
查看[微信开放平台应用申请教程](http://docs.gizwits.com/zh-cn/AppDev/third-party.html#微信)获取APPID和APPSecret


## 修改UIConfig.json文件

将在微信开发平台申请到的APPID和APPSecret填写到开源框架的配置文件UIConfig.json中，如下图

![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075506986.png)

正确填写“wechat_app_id”和"wechat_app_secret"后部署运行，即可使用微信登录了。

# APP快速换肤

开源框架已集成了皮肤定制功能。通过修改UIConfig.json文件即可实现快速换肤。

![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075576718.png)

如图红框内所示，为自定义皮肤代码修改区，各含义如下：



```
buttonColor：按钮颜色
buttonTextColor：按钮文字颜色
navigationBarColor：导航栏颜色
navigationBarTextColor：导航栏文字颜色
configProgressViewColor：配置中界面 progress view 颜色
```

通过修改对应的颜色值即可实现快速换肤，参考如下示例：


## 1.肤色一

```
"buttonColor":"6ebe37",
"buttonTextColor":"ffffff",
"navigationBarColor":"6ebe37",
"navigationBarTextColor":"ffffff",
"configProgressViewColor":"000000",
```

实际效果图：

 ![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075617640.png)

## 2.	肤色二

```
"buttonColor":"ff8a44",
"buttonTextColor":"ffffff",
"navigationBarColor":"ff8a44",
"navigationBarTextColor":"ffffff",
"configProgressViewColor":"000000",
```

实际效果图：

 ![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075629559.png)


## 3.	肤色三

```
"buttonColor":" 16b599",
"buttonTextColor":"ffffff",
"navigationBarColor":" 16b599",
"navigationBarTextColor":"ffffff",
"configProgressViewColor":"000000",
```

实际效果图：

![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075660720.png)
