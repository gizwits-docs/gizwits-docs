title: Android开源框架使用指南（含源码）
---
# 简介

本文档为机智云物联网开源基础App套件使用说明，旨在为机智云物联网开发者提供一个快速开发模板，可在此工程基础上进行快速开发或参考相关代码进行开发。

Android开源框架工程源码链接：

<https://git.oschina.net/dantang/GizOpenSource_AppKit_Android>

Android Gokit App是使用开源框架工程的源码范例，源码链接：

<https://git.oschina.net/dantang/GoKit_Demo_Android>

也可在下载中心下载Android Gokit App：

![](/assets/zh-cn/AppDev/AppFrame/android/Instructions//image1.png)

# 目录结构说明

+ A.     Libs: 包括 GizWifiSDK 在内的的第三方库目录**
+  assets: 包含 UIConfig.json 配置文件
+ B.     GizOpenSource: 组成模块
    - GizOpenSourceModules：组成模块
    - GosApplication.java // SDK 在此启动
    - CommonModule // 公共方法类、资源文件读取类 
    - ConfigModule // 设备配置模块，包含 AirLink 及 SoftAP
    - UserModule // 用户模块，包含 用户登录、用户注册、找回密码
    - DeviceModule // 设备模块，包含 设备列表
    - ControlModule // 控制模块，包含 控制示例
    - SettingsModule // 设置模块，包含 设置菜单 及其 包含的子菜单项（关于等）
    - PushModule // 推送模块，包含 百度和极光的推送SDK 集成封装
    - ThirdAccountModule // 第三方登录模块， 包含 第三方登录（QQ、微信等）
    - view // 自定义控件
    - utils // 工具类
    - wxapi // 微信集成包
    - zxing // 扫描二维码

#   快速集成指南

默认程序入口在 UserModule 中的 GosUserLoginActivity。

**A.     设定初始化参数**

在工程的 GosApplication.java 文件中填写机智云AppID及AppSecret，如果使用第三方登录或推送，需要填写相应的从其他资源平台申请的参数；如果使用推送需要打开当前需要使用推送的类型的初始化，如果都为注释状态则表示当前不使用第三方推送，同时只支持一种第三方推送，不可打开多个第三方推送宏定义的注释。可配置的参数有：

```json
app_id：机智云 app id
app_secret：机智云 app secret
product_key：机智云 product key
wifi_type_select：默认配置模块wifi模组选择功能是否开启
tencent_app_id：qq登录 app id
wechat_app_id：微信登录 app id
wechat_app_secret：微信登录 app secret
push_type：推送类型 【0：关闭，1：极光，2：百度】
bpush_app_key：百度推送 app key
openAPI_URL：openAPI 域名及端口，格式：“api.gizwits.com:80”，不写端口默认80
site_URL：site 域名及端口，格式：“site.gizwits.com:80”，不写端口默认80
push_URL：推送绑定服务器 域名及端口，格式：“push.gizwits.com:80”，不写端口默认80
buttonColor：按钮颜色
buttonTextColor：按钮文字颜色
navigationBarColor：导航栏颜色
navigationBarTextColor：导航栏文字颜色
configProgressViewColor：配置中界面 progress view 颜色
addDeviceTitle：添加设备界面 导航栏标题文字
qq：是否打开QQ登录【true：打开】
wechat：是否打开微信登录【true：打开】
anonymousLogin：是否打开匿名登录【true：打开】
```

**需要注意:**

1.极光推送的appid需要在AndroidManifest.xml 中填写见243行。

2.微信登录需要进行在腾讯api中设置自己的md5值否者无法正常运行

3.tencent\_app\_id需要在AndroidManifest.xml中89行填写

**B.     加载控制界面**

1）框架工程内提供的代码已经可以在不修改任何代码的前提下，进行到控制界面的跳转操作，开发者只需要关心操作界面的逻辑即可，如果需要在设备列表界面中点击某设备后，跳转到自己创建的控制器视图中，请在 GosDeviceListActivity.java  文件中修改相应跳转参数。请按照图示修改跳转视图的类定义，如果使用默认提供的空白界面（GosDeviceControlActivity）来进行编写控制界面，可略过此步骤。

![](/assets/zh-cn/AppDev/AppFrame/android/Instructions//image2.png)

2） 在控制界面中注册设备的监听，并实现回调，如图：

![](/assets/zh-cn/AppDev/AppFrame/android/Instructions//image3.png)

用于接收SDK上报的设备状态变化通知，将接收到的上报数据解析并更新界面。

3）控制界面中对当前设备设置监听，例如：device.setListener(gizWifiDeviceListener);                                                                             

4）实现控制命令下发，需要调用SDK中GizWifiDevice类实例的接口方法：device.write(concurrentHashMap ,0);     具体参数解释，请参考SDK使用文档。                                                                                                  

5）退出控制界面时，需要取消当前设备订阅，调用SDK中GizWifiDevice类实例的接口方法，将参数设为False：    device.setSubscribe(false);

**C.     设置界面增加菜单项及点击处理**

如果需要在设置界面进行列表项的增加或修改，需要在activity\_gos\_settings.xml中添加相应控件，并在模块（SettingsModule）中的GosSettingsActivity.java文件中添加相应事件。

#  常见问题

**A.     支持Android版本？**

目前支持Android 4.0及更高版本系统。

 **B.     关于修改版本号**

在工程的AndroidManifest.xml 文件下，修改versionNmae即可更改SettingsModule模块下，关于界面的版本号显示。示例：

![](/assets/zh-cn/AppDev/AppFrame/android/Instructions//image4.png)

**C.     关于推送与包名（以下使用集成极光推送示例）**

在新建工程下，替换框架内模块使用时。需要将AndroidManifest.xml 文件package与申请推送时所填包名相对应，并修改集成推送时相应位置。示例：

![](/assets/zh-cn/AppDev/AppFrame/android/Instructions//image5.png)

与申请推送应用保持一致，示例：

![](/assets/zh-cn/AppDev/AppFrame/android/Instructions//image6.png)

修改集成推送的相应位置：

在工程的AndroidManifest.xml文件中修改

1)    
```
<permission android:name=”您应用的包名.permission.JPUSH_MESSAGE” android:protectionLevel=”signature” />
```

（详见开源APP套件的AndroidManifest.xml文件第13行）

2)

```
<uses-permission android:name=”您应用的包名.permission.JPUSH_MESSAGE” />
```

（详见开源APP套件的AndroidManifest.xml文件第17行）

3)       

```
DaemonService下<category android:name=”您应用的包名” />
```

（详见开源APP套件的AndroidManifest.xml文件第159行）
      
4)  

```
PushPeceiver下<category android:name=”您应用的包名” />
```

（详见开源APP套件的AndroidManifest.xml文件第170行）

5)        

```
PushActivity下<category android:name=”您应用的包名” />
```

（详见开源APP套件的AndroidManifest.xml文件第193行）

6)       

```
JPushReceiver下<category android:name=”您应用的包名” />
```

（详见开源APP套件的AndroidManifest.xml文件第224行）

7)      

 ```
<meta-data android:name=”JPUSH_APPKEY” android:value=”Your AppKey” />
```

（详见开源APP套件的AndroidManifest.xml文件第240行）
