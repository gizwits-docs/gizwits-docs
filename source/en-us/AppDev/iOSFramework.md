title: Guide to Gizwits App Framework for iOS
---

# Overview

Gizwits App Framework (hereinafter referred to as Framework) is an open-source mobile application development framework developed based Gizwits App SDK to achieve the SDK loading, initialization, user registration, user login, device configuration, device discovery, device connection, device listing and other basic functions. The Framework is a source code project which is available to all developers and currently supports iOS and Android platforms. App developers can create a complete App by implementing specific product control pages based on the Framework.

This guide also comes with the source code of Gizwits Gokit App, which is an example project that employs the Framework and intended for developers to achieve a rapid development.

* For source code of the Framework for iOS, find here:

https://git.oschina.net/dantang/GizOpenSource_AppKit_iOS

* For source code of Gizwits Gokit App for iOS, find here:

https://git.oschina.net/dantang/GoKit_Demo_iOS

It can also be downloaded at the Download Center:

![iOS Gokit App](/assets/en-us/AppDev/iOSFramework/image1.png)
 
# The Framework code directory structure

__A. Library: Third-party library directory including GizWifiSDK__

__B. GizOpenSourceModules: contains__

* CommonModule: Common helper classes, resource files, and custom Cell
* ConfigModule: Device configuration module, including AirLink and SoftAP
* UserModule: User module, including user login, user registration, password recovery
* DeviceModule: Device module, including device listing
* SettingsModule: Settings module, containing settings of menu and submenus (About etc.)
* PushModule: Push notification module, encapsulating Baidu push SDK and Jiguang push SDK 

# Quick Integration Guide

## 1. Set initialization parameters

The default program entry is LoginViewController in UserModule. Gizwits AppID, AppSecret and program styles can be set in GOpenSourceModules/CommonModule/UIConfig.json file of the project.

If you use third-party authentication or push notification, it is important to ensure that the appropriate parameters are set to the same values as used in the corresponding platforms. If you use the push notification, you need to uncomment the related macro line in order to enable the corresponding type of push notification. If you don’t uncomment all the related macro lines, it means you are not using any third-party push notification at the time. Only one type of third-party push notifciation is supported at the same time, hence don’t uncomment multiple third-party push notification macro lines.

Configurable parameters are:

* app_id: Gizwits app id
* app_secret: Gizwits app secret
* product_key: Gizwits product key 
* wifi_type_select: whether the Wi-Fi module selection function is enabled
* tencent_app_id: app id for qq authentication
* wechat_app_id: app id for WeChat authentication
* wechat_app_secret: app secret for WeChat authentication
* push_type: Push notifciation type [0: Off, 1: Jiguang, 2: Baidu]
* jpush_app_key: app key for Jiguang push notification
* bpush_app_key: app key for Baidu push notification
* openAPIDomain: Open API domain name and port, format: "api.gizwits.com". To specify the port, the format is: "xxx.xxxxxxx.com:81&8443"
* siteDomain: Site domain name and port, format: "site.gizwits.com". To specify the port, the format is: "xxx.xxxxxxx.com:81&8443"
* pushDomain: push notification service domain name and port, format: "push.gizwits.com". To specify the port, the format is: "xxx.xxxxxxx.com:81&8443"
* buttonColor: Button color
* buttonTextColor: Button text color
* navigationBarColor: Navigation bar color
* navigationBarTextColor: Navigation bar text color
* configProgressViewColor: Configuration progress view color
* statusBarStyle: Status bar text color [0: black, 1: white] 
* addDeviceTitle: Title of “Add Device” page
* qq: whether to enable QQ auhentication [true: enabled]
* wechat: whether to enable WeChat auhentication [true: enabled] 
* anonymousLogin: whether to enable anonymous login [true: enabled] 

## 2. Loading the control page

1) The code provided in the Framework project implements the redirection to the control page without any modification. You only need to focus on the logic of the operation pages. If you want to click a device in the device list page and jump to the view you created, modify the corresponding redirection parameters in the AppDelegate.m file. Please modify the imported header files and class definition of the target view as shown in the figure. If you use the blank page (GosDeviceController) provided by default to create the control page, you can skip this step.

2) Set the GizWifiDeviceDelegate in the control page, for example:

```
self.device.delegate = self;
```

3) Defining the delegate callback of the class in the control page to implement the GizWifiDeviceDelegate delegate method of the Gizwits App SDK:

```
- (void)device:(GizWifiDevice *)device didReceiveData:(NSError *)result data:(NSDictionary *)data withSN:(NSNumber *)sn;
```

It is used to receive the device state change notification reported by the Gizwits App SDK, which will be parsed in order to update the page.

4) To implement the command issuing, you need to call the interface method of the GizWifiDevice instance in the Gizwits App SDK:

```
 (void)write:(NSDictionary *)data withSN:(int)sn;
```

For detailed parameter explanation, see the guide to Gizwits App SDK.

5) When exiting the control page, you need to unsubscribe from the current device, and call the interface method of the GizWifiDevice instance in the Gizwits App SDK with the parameter set to NO:

```
- (void)setSubscribe:(BOOL)subscribed;
```

## 3. Add menu items on the settings page

If you need to add or modify an list item in the settings page, you need to update the GosSettingsViewController class file in the SettingsModule. Find and modify the delegate method of the UITableView in the .m file.

# FAQ

## A. Which iOS versions are supported by the Framework?

It supports iOS 7 and later systems currently.

## B. How to change the version number?

The version number consists of two parts, the format is: project version number.program compilation time, where the project version number is set in the info, the program compilation time consists of the latter two digits of the year, month and day, which has a total of 6 characters. If you need to modify the display version number, you need to update the value of the property appVersionLabel in the viewDidLoad method of About page (GosAboutViewController) of SettingsModule.

# See Also

See [Gizwits App Code Auto-Generator](http://docs.gizwits.com/en-us/AppDev/AppCodeAutoGenerator.html) to learn about the functionality of the automatically generated App code.

See "Gizwits App Framework" to grasp

* [Gizwits App Framework for iOS](http://docs.gizwits.com/en-us/AppDev/iOSFramework.html)
* [Push notification integration for iOS App](http://docs.gizwits.com/en-us/AppDev/iOSPushNotification.html)
* [Third-party authentication and re-skin for iOS App](http://docs.gizwits.com/en-us/AppDev/iOSAuthReSkin.html)
* [Quick start with iOS App development](http://docs.gizwits.com/en-us/AppDev/iOSDevQuickStart.html)
* [Gizwits App Framework for Android](http://docs.gizwits.com/en-us/AppDev/AndroidFramework.html)
* [Push notification integration for Android App](http://docs.gizwits.com/en-us/AppDev/AndroidPushNotification.html)
* [Third-party authentication and re-skin for Android](http://docs.gizwits.com/en-us/AppDev/AndroidAuthReSkin.html)
* [Quick start with Android App development](http://docs.gizwits.com/en-us/AppDev/AndroidDevQuickStart.html)
* [Gizwits App Framework for APICloud](http://docs.gizwits.com/en-us/AppDev/APICloudFramework.html)

See "App Development SDK" to develop your IoT App

* [Gizwits App SDK for Android](http://docs.gizwits.com/en-us/AppDev/AndroidSDKA2.html)
* [Gizwits App SDK for iOS](http://docs.gizwits.com/en-us/AppDev/iOSSDKA2.html)
* [Gizwits App SDK for APICloud](http://docs.gizwits.com/en-us/AppDev/APICloudSDK.html)
* [Data transparent transmission](http://docs.gizwits.com/en-us/AppDev/TransparentTransmission.html)
* [Get Gizwits App SDK debug log](http://docs.gizwits.com/en-us/AppDev/SDKLogCapture.html)
* [SDK error codes](http://docs.gizwits.com/en-us/AppDev/SDKErrorCodes.html)

More application development guides

* [FAQ of mobile application development](http://docs.gizwits.com/en-us/AppDev/AppDevFAQ.html)
* [Gizwits Device Sharing](http://docs.gizwits.com/en-us/AppDev/DeviceSharing.html)
* [Set up third-party authentication with the provider of choice](http://docs.gizwits.com/en-us/AppDev/ThirdpartyAuth.html)
