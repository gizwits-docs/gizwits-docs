title: Gizwits App Code Auto-Generator
---

# Overview

In order to lower the barrier for the development of smart hardware App and reduce the investment in development resources, Gizwits has further developed the App open source code that implements the complete functions based on the Gizwits App Framework. After creating corresponding Data Points on the product project, Gizwits IoT Cloud generates an App reference code of the corresponding product according to the defined Data Points.

The automatically generated App code modularly integrates the necessary functions of a smart hardware App, mainly including:

1. User module: user registration, password recovery, third party anthentication (Wechat, QQ)
2. Network access configuration (Arilink+SoftAP)
3. Device discovery and list
4. Device control
5. Push notification: After the device raises the alarm, the alarm information is pushed to the App. The main push platforms we use are Jiguang Push and Baidu Push.

After developers download the source code, they only need to optimize the UI and design the control logic and device control interface. The control page of the source code implements the standard flow of device control using Gizwits App SDK. During the secondary development of the App, you only need to optimize related code according to the process to complete the control App of your own product.

Gizwits App Code Auto-Generator currently supports Andriod, iOS, and APICloud.

# User Guide

## 1. Create an application

1.1. After creating the product and Data Points in the Gizwits Developer Center, choose “Application Configuration”.

![Create an application](../../../assets/en-us/UserManual/app/11.png)

Note that the naming of Data Points cannot be a common programming language keywords, such as switch, static, enum, native, etc. Otherwise, the generated code will be incorrect!

1.2. Choose “New Application” on the Application Configuration page

![Create an application](../../../assets/en-us/UserManual/app/12.png)

1.3. Create an Android application and an iOS application separately.

![Create an application](../../../assets/en-us/UserManual/app/13.png)

![Create an application](../../../assets/en-us/UserManual/app/14.png)

![Create an application](../../../assets/en-us/UserManual/app/15.png)
 
 
## 2. Generate code

2.1. Check the product secret and copy it to the clipboard.

![Generate code](../../../assets/en-us/UserManual/app/16.png)

2.2. Click “Application Development”, select the Android application you just created, paste the product secret you copied, and click “Generate Code Package”.

![Generate code](../../../assets/en-us/UserManual/app/17.png)

2.3. After a while, you can download the source code.

![Generate code](../../../assets/en-us/UserManual/app/18.png)

2.4. The downloaded source code is a compressed file. After decompression, you can see the related source code.

![Generate code](../../../assets/en-us/UserManual/app/19.png)

2.5. For the guide to the source code, please refer to the appendix "source code explanation" after decompression!

![Generate code](../../../assets/en-us/UserManual/app/20.png)

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