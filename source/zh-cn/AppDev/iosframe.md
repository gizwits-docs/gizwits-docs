title: iOS开源框架使用指南（含源码）
---

# 开源框架简介
机智云APP开源框架是使用机智云SDK开发的APP模板，实现了SDK的加载、初始化、用户注册、用户登陆、设备配置、设备发现、设备连接、设备列表等基本的功能。APP开源框架是一个可以编译的源码工程，对所有开发者开源，目前提供iOS和Android版本。APP开发者可以在框架上实现具体产品的控制页面就可以生成一个完整的APP。

本文档为机智云物联网开源基础App套件使用说明，旨在为机智云物联网开发者提供一个快速开发模板，可在此工程基础上进行快速开发或参考相关代码进行开发。

iOS开源框架工程源码链接：
https://git.oschina.net/dantang/GizOpenSource_AppKit_iOS

iOS Gokit App是使用开源框架工程的源码范例，源码链接：
https://git.oschina.net/dantang/GoKit_Demo_iOS
也可在下载中心下载：

![Alt text](/assets/zh-cn/AppDev/AppFrame/image1.png)


# 框架目录结构说明
**A. Library: 包括 GizWifiSDK 在内的的第三方库目录**

**B. GizOpenSourceModules: 组成模块**

- CommonModule: 公共方法类、资源文件 及 自定义 Cell
- ConfigModule: 设备配置模块，包含 AirLink 及 SoftAP
- UserModule: 用户模块，包含 用户登录、用户注册、找回密码
- DeviceModule: 设备模块，包含 设备列表
- SettingsModule: 设置模块，包含 设置菜单 及其 包含的子菜单项（关于等）
- PushModule: 推送模块，包含 百度和极光的推送SDK 集成封装

# 快速集成指南
## 1.设定初始化参数

默认程序入口在 UserModule 中的 LoginViewController。在工程的GOpenSourceModules/CommonModule/UIConfig.json 文件中可填写机智云AppID及AppSecret以及程序样式。

如果使用第三方登录或推送，需要填写相应的从其他资源平台申请的参数；如果使用推送需要打开当前需要使用推送的类型的宏注释，如果都为注释状态则表示当前不使用第三方推送，同时只支持一种第三方推送，不可打开多个第三方推送宏定义的注释。

可配置参数有：

- **app_id：**机智云 app id
- **app_secret：**机智云 app secret
- **product_key：**机智云 product key
- **wifi_type_select：**默认配置模块wifi模组选择功能是否开启
- **tencent_app_id：**qq登录 app id
- **wechat_app_id：**微信登录 app id
- **wechat_app_secret：**微信登录 app secret
- **push_type：**推送类型 【0：关闭，1：极光，2：百度】
- **jpush_app_key：**极光推送 app key
- **bpush_app_key：**百度推送 app key
- **openAPIDomain：**openAPI 域名及端口，格式：“api.gizwits.com”。要指定端口，格式为：”xxx.xxxxxxx.com:81&8443”
- **siteDomain：**site 域名及端口，格式：“site.gizwits.com”。要指定端口，格式为：”xxx.xxxxxxx.com:81&8443”
- **pushDomain：**推送绑定服务器 域名及端口，格式：“push.gizwits.com”。要指定端口，格式为：”xxx.xxxxxxx.com:81&8443”
- **buttonColor：**按钮颜色
- **buttonTextColor：**按钮文字颜色
- **navigationBarColor：**导航栏颜色
- **navigationBarTextColor：**导航栏文字颜色
- **configProgressViewColor：**配置中界面 progress view 颜色
- **statusBarStyle：**状态文字栏颜色 【0：黑色，1：白色】
- **addDeviceTitle：**添加设备界面 导航栏标题文字
- **qq：**是否打开QQ登录【true：打开】
- **wechat：**是否打开微信登录【true：打开】
- **anonymousLogin：**是否打开匿名登录【true：打开】

## 2.加载控制界面

1）框架工程内提供的代码已经可以在不修改任何代码的前提下，进行到控制界面的跳转操作，开发者只需要关心操作界面的逻辑即可。如果需要在设备列表界面中点击某设备后，跳转到自己创建的控制器视图中，请在 AppDelegate.m 文件中修改相应跳转参数。请按图所示修改引入的头文件及跳转视图的类定义，如果使用默认提供的空白界面（GosDeviceController）来进行编写控制界面，可略过此步骤。
 

2）在控制界面中设置 GizWifiDeviceDelegate 委托的代理，例如：

```
self.device.delegate = self;
```

3）在控制界面中定义类的委托回调，实现 SDK的GizWifiDeviceDelegate 委托的方法：

```
- (void)device:(GizWifiDevice *)device didReceiveData:(NSError *)result data:(NSDictionary *)data withSN:(NSNumber *)sn;
```

用于接收SDK上报的设备状态变化通知，将接收到的上报数据解析并更新界面。

4）实现控制命令下发，需要调用SDK中GizWifiDevice类实例的接口方法：
- (void)write:(NSDictionary *)data withSN:(int)sn;
具体参数解释，请参考SDK使用文档。

5）退出控制界面时，需要取消当前设备订阅，调用SDK中GizWifiDevice类实例的接口方法，将参数设为NO：

```
- (void)setSubscribe:(BOOL)subscribed;
```

 
## 3.设置界面增加菜单项及点击处理
如果需要在设置界面进行列表项的增加或修改，需要操作设置模块（SettingsModule）中的GosSettingsViewController类文件，在 .m 文件中找到 UITableView 的委托方法，进行修改。


# 常见问题
**A、支持哪些iOS版本？**

目前支持iOS 7及更高版本系统。

**B、如何更改关于界面中的版本号？**

关于版本号由两部分构成，格式为：工程版本号.程序编译时间，其中程序版本号是在info里设置的版本号，程序编译时间为年份后两位、月、日，共6位组成。如果需要修改显示效果，需要到设置模块（SettingsModule）的关于界面（GosAboutViewController）的viewDidLoad 方法中修改属性appVersionLabel的赋值。



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


