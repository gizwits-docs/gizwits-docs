title: Get started with App development
---

# Overview

This document mainly introduces the functions of the Gizwits App SDK and Gizwits App Framework, as well as the preparatory work for the early stage. Developers can choose the convenient way for App development according to their own project requirement.

# Gizwits App Development Resources 

Gizwits now offers three App development methods (integrating Gizwits App SDKs, using Gizwits App Framework, and using Gizwits App Code Auto-Generator), which facilitate rapid App development according to the different needs of developers. The following are recommended development methods with corresponding requirements.

## 1. Gizwits App SDKs

The Gizwits App SDKs (hereinafter referred to as SDK) encapsulate the communication process between the mobile phones (including PAD and other devices) and the devices, as well as between the mobile phones and Gizwits IoT Cloud. The process includes network access configuration, device discovery, connectivity, control, heartbeat, status reporting, and alarm notification. Using the Gizwits App SDKs, you can quickly complete App development and only need to focus on the App UI and UE design. Relatively complex protocols and error handling can be ignored.

This method is applicable to the App that needs to do complex business logic processing, or needs to integrate the Gizwits App SDK to accomplish remote control after the App development has been completed.

Gizwits currently offers three SDKs: the native Gizwits App SDK for iOS, the native Gizwits App SDK for Android, and the Gizwits App SDK for APICloud on cross-platform. Developers can choose anyone according to the needs of the project. The Gizwits App SDK for APICloud can be used to develop once with HTML5 technology and can be adapted to both iOS and Android platforms.


- [Download Gizwits App SDK for Android](http://download.gizwits.com/zh-cn/p/95/97)
- [Guide to Gizwits App SDK for Android](../AppDev/AndroidSDKA2.html)

- [Download Gizwits App SDK for iOS](http://download.gizwits.com/zh-cn/p/95/97)
- [Guide to Gizwits App SDK for iOS](../AppDev/iOSSDKA2.html)

- [Download Gizwits App SDK for APICloud](http://download.gizwits.com/zh-cn/p/95/97)
- [Guide to Gizwits App SDK for APICloud](../AppDev/APICloudSDK.html)


![Overview](/assets/en-us/AppDev/AppDevGetStarted/1.png)

## 2. Gizwits App Framework

In order to further ease the challenges associated with App development, Gizwits launched the Gizwits App Framework in which the following functions have been modularly integrated:

This method is applicable to the App that needs to do simple business logic processing.

1. User module: user registration, user login, password recovery, third party authentication (WeChat, QQ)
2. Network access configuration for device (Arilink+SoftAP)
3. Device discovery and list
4. Push notification: supports Jiguang Push, Baidu Push
5. Custom skin

The Gizwits App Framework makes each module an independent package. If you want to know the implementation code and flow of one of the modules, directly refer to the framework code.


* [Gizwits App Framework for iOS](../AppDev/iOSFramework.md)
* [Quick start with iOS App development](../quickstart/iOSDevQuickStart.md)
* [Gizwits App Framework for Android](../AppDev/AndroidFramework.md)
* [Quick start with Android App development](../quickstart/AndroidDevQuickStart.md)
* [Gizwits App Framework for APICloud](../AppDev/APICloudFramework.md)

## 3. Gizwits App Code Auto-generator

This method is applicable to the project that needs its own product App to debug, or requires a complete App code for reference.

In order to lower the barrier for the development of smart hardware App and reduce the investment in development resources, Gizwits has further developed the App open source code that implements the complete functions based on the Gizwits App Framework. After creating corresponding Data Points on the product project, Gizwits IoT Cloud generates an App reference code of the corresponding product according to the defined Data Points.

The automatically generated App code modularly integrates the necessary functions of a smart hardware App, mainly including:

1. User module: user registration, password recovery, third party anthentication (Wechat, QQ)
2. Network access configuration (Arilink+SoftAP)
3. Device discovery and list
4. Device control
5. Push notification: After the device raises the alarm, the alarm information is pushed to the App. The main push platforms we use are Jiguang Push and Baidu Push.

After developers download the source code, they only need to optimize the UI and design the control logic and device control interface. The control page of the source code implements the standard flow of device control using Gizwits App SDK. During the secondary development of the App, you only need to package and install to complete the control App of your own product.

[Gizwits App Code Auto-Generator](../UserManual/AppCodeAutoGenerator.md)

## 4.Other App development tutorials

* [Push notification integration for iOS App](../AppDev/iOSPushNotification.md)
* [Third-party authentication and re-skin for iOS App](../AppDev/iOSAuthReSkin.md)
* [Push notification integration for Android App](../AppDev/AndroidPushNotification.md)
* [Third-party authentication and re-skin for Android](../AppDev/AndroidAuthReSkin.md)
* [Data transparent transmission](../AppDev/TransparentTransmission.md)

Note: The above tutorials are all based on Gizwits App Framework.

# Get ready

## 1. Create a product and define Data Points

![Create a product and define Data Points](/assets/en-us/AppDev/AppDevGetStarted/2.png)

![Create a product and define Data Points](/assets/en-us/AppDev/AppDevGetStarted/3.png)
 
## 2. Create Android and iOS applications for your product

In the left navigation pane, click "Application Configuration" under “Services” to add Android and iOS applications respectively.

![Create Android and iOS applications for your product](/assets/en-us/AppDev/AppDevGetStarted/4.png)

![Create Android and iOS applications for your product](/assets/en-us/AppDev/AppDevGetStarted/5.png)
 
## 3. The meaning and role of App ID and App Secret
App ID: application identification code, when the developer needs to develop applications for a smart product (including iOS, Android, Web applications, etc.), an App ID is automatically generated after an application is created in the Gizwits Developer Center and associates with the device. This App ID is required during application development. All users registered in the App are bound under this App ID.

App Secret: App ID verification secret.

As shown in the figure below, it is the role that App ID plays in the process of developing App.

![App ID](/assets/en-us/AppDev/AppDevGetStarted/6.png)

# See Also

See [Gizwits App Code Auto-Generator](../UserManual/AppCodeAutoGenerator.md) to learn about the functionality of the automatically generated App code.

See "Gizwits App Framework" to grasp

* [Gizwits App Framework for iOS](../AppDev/iOSFramework.md)
* [Push notification integration for iOS App](../AppDev/iOSPushNotification.md)
* [Third-party authentication and re-skin for iOS App](../AppDev/iOSAuthReSkin.md)
* [Quick start with iOS App development](../quickstart/iOSDevQuickStart.md)
* [Gizwits App Framework for Android](../AppDev/AndroidFramework.md)
* [Push notification integration for Android App](../AppDev/AndroidPushNotification.md)
* [Third-party authentication and re-skin for Android](../AppDev/AndroidAuthReSkin.md)
* [Quick start with Android App development](../quickstart/AndroidDevQuickStart.md)
* [Gizwits App Framework for APICloud](../AppDev/APICloudFramework.md)

See "App Development SDK" to develop your IoT App

* [Gizwits App SDK for Android](../AppDev/AndroidSDKA2.md)
* [Gizwits App SDK for iOS](../AppDev/iOSSDKA2.md)
* [Gizwits App SDK for APICloud](../AppDev/APICloudSDK.md)
* [Data transparent transmission](../AppDev/TransparentTransmission.md)
* [Get Gizwits App SDK debug log](../AppDev/SDKLogCapture.md)
* [SDK error codes](../AppDev/SDKErrorCodes.md)

More application development guides

* [FAQ of mobile application development](../AppDev/AppDevFAQ.md)
* [Gizwits Device Sharing](../cloud/DeviceSharing.md)
* [Set up third-party authentication with the provider of choice](../AppDev/ThirdpartyAuth.md)
