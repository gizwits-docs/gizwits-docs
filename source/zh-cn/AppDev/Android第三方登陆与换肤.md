# 概述
本文主要是介绍了如何通过开源框架快速支持QQ和微信登陆，并介绍了如何实现app快速换肤

# QQ登陆接入

APP要支持QQ登陆，需要先到腾讯开放平台创建一个应用，获取应用的APPID，并设置到开源框架中即可。
    
## 1.创建腾讯开发者账号

   点击http://open.qq.com进入腾讯开放平台
   
 ![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478074977472.png)

   点击《登陆》，填写账号密码登陆
   
![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075035627.png)

登陆成功后跳转到注册界面，开发者可根据自己的需要选择个人或者公司类型。

 ![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075057029.png)

下图是选择个人注册的跳转界面，需填写完整的资料，并完成邮箱验证，即成功创建腾讯开发者账号。
 
![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075072214.png)

## 2.创建腾讯应用

点击http://open.qq.com进入腾讯开放平台，选择《应用接入》
 
![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075093037.png)

   选择《移动应用 安卓》，点击《创建应用》
   
 ![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075148169.png)

完善应用信息，并提交审核。审核通过后，即可使用红框部分的APP ID 和 APP KEY来创建QQ登陆入口。

![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075167275.png)

## 3.绑定QQ应用到机智云

登陆机智云开发者中心：http://dev.gizwits.com/zh-cn/developer/product/，选中需要绑定第三方登陆的产品

![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075216544.png)

进入产品设置界面，选择需要关联QQ登陆的应用，如下图：
 
 ![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075231726.png)

点击《关联第三方登陆》进入关联界面，填写从腾讯开放平台申请到的APPID，并点击确定，即完成了机智云应用于QQ应用的绑定。

![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075247601.png)

         
## 4.修改UIConfig.json文件

将在腾讯开发平台申请到的APPID填写到开源框架的配置文件UIConfig.json中
 
![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075283475.png)

正确填写“tencent_app_id”后部署运行，即可使用QQ登录了。

# 微信登陆接入

APP要实现微信登陆，必须前往微信开放平台申请一个应用，获取应用的APPID和APPSecret并且配置到开源框架中即可。

## 1.创建微信开发者账号

点击https://open.weixin.qq.com进入微信开放平台 
 
![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075315152.png)

点击《注册》进入以下界面，编辑基本信息
 
![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075324515.png)


点击下一步，微信会往你的注册邮箱发送一份激活邮件
 
![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075342437.png)


点击激活链接，跳转到完善资料界面，填写资料，点击完成即成功创建了微信开放平台开发者账号。
 
![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075352683.png)

## 2.创建微信应用

   点击https://open.weixin.qq.com进入微信开发平台，选中图13的《管理中心》跳转到应用创建界面
 
![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075448378.png)

点击《创建移动应用》按钮，进入以下界面，填写基本信息。
 
![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075458348.png)

填写完成，点击《下一步》，进入《填写平台信息界面》，选择需要的应用平台（一般iOS和Android都要），填写完毕信息，点击《提交审核》即可，提交审核成功，7天内微信会给出审核结果。审核通过后，应用的APPID 和APPKey就可以使用了。
 
![name](/assets/zh-cn/AppDev/AppFrame/android/change/1478075465698.png)

	
## 3.修改UIConfig.json文件

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

