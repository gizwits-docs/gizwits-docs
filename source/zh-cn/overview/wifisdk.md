title: 设备接入SDK概述
---
# 1. 设备接入SDK概述
## 1.1.  SDK目的与功能
机智云的设备接入SDK（以下简称SDK）封装了手机（包括PAD等设备）与机智云智能硬件的通讯过程，以及手机与云端的通讯过程。这些过程包括配置入网、发现、连接、控制、心跳、状态上报、报警通知等。使用SDK，可以使得开发者快速完成APP开发，开发者仅需关注APP的UI和UE设计即可，而相对复杂的协议与错误处理等事项可忽略。 

相比之下，SDK在新接口定义上做了进一步的简化，使用流程更加简单了。APP已经完全不需要了解设备连接方面的概念，可以更专注于APP用户体验的优化设计。
## 1.2. 机智云物联方案概况

## 1.3.  找到最合适的SDK
机智云目前提供3套SDK：iOS平台原生SDK、Android平台原生SDK、APICloud跨平台SDK。开发者可以根据项目需要自行选择，其中APICloud版本SDK可以用H5技术一次开发，同时适配iOS和Android两个平台，具体内容请参考：《APICloud SDK 集成指南》。
## 1.4.  相关名词定义
### 1.4.1.   GAgent
全称Gizwits Agent，运行于Wi-Fi模块中，设备通过GAgent接入机智云服务器。 目前已兼容国内主流的Wi-Fi模块， 开发者也可以通过获取GAgent二次开发包实现自定义的模块接入机智云。
### 1.4.2.   小循环
智能设备与手机、智能设备与智能设备之间，通过连接同一个路由器实现局域网内部的通信（查看状态或控制），我们称之为小循环。
### 1.4.3.   大循环
智能设备通过路由器或直接接入互联网以实现用户的远程监测与控制，我们称为大循环。
### 1.4.4.   ProductKey
产品标识码，开发者通过机智云后台创建新产品后，自动生成的一个32位字符串。在机智云的数据库中是一个唯一的号码，开发者完成开发写入设备主控MCU后，机智云通过此标识码对设备进行识别并自动完成注册。
### 1.4.5.   DID
设备号，当一个设备初次接入机智云时，机智云自动根据ProductKey以及设备Wi-Fi模块MAC地址为此设备注册一个did，此did全网唯一，用于与用户的绑定及后续操作。
### 1.4.6.   PassCode
设备通行证，用于校验用户的绑定/控制权限。当用户发起设备绑定时，只要是合法操作即可拿到此通行证，通过此通行证绑定设备并对设备进行有效期内的查看、控制等操作。GAgent首次运行时生成随机数作为设备通行证，生成后保存在非易失性存储器上。设备上线时需要上报给服务器。
### 1.4.7.   AppID
应用标识码，当开发者需要为一款智能产品开发应用（包括iOS、Android、Web应用等）时，后台会自动生成一个AppID，并与此设备进行关联。应用开发时需要填入此AppID。
### 1.4.8. Onboarding

也叫配置入网，用户将一款基于Wi-Fi的物联网设备配置连接上路由器的过程称为Onboarding。新设备第一次使用时需要知道路由器的账号和密码，以通过路由器连接互联网。由于大多数的物联网设备没有自带的屏幕和键盘，所以需要通过智能手机向设备发送路由器的SSID和密码，这个过程机智云称为Onboarding。机智云提供的Wi-Fi设备接入SDK中已经内置了此配置的功能。

### 1.4.9. AirLink

机智云对各种SmartConfig、SmartLink这种UDP广播报方式对设备配置入网的技术统称，兼容了多个Wi-Fi模块厂商的配置协议，总结了一套良好用户体验的标准Onboarding操作流程，机智云的Wi-Fi 设备接入SDK已经内置AirLink技术。

### 1.4.10. SoftAP

由于目前各个Wi-Fi模块厂商的Smart Config协议均未完全成熟，也不支持5G路由器信号。机智云在提供了AirLink配置模式的同时也支持SoftAP模式配置设备接入路由器。当设备进入SoftAP配置模式时，设备本身将成为一个AP，智能手机可直接与设备进行连接，然后在手机上的界面上输入路由器的SSID和密码，设备接收到信息的时候会自动尝试连接路由器，连接成功则自动切换到正常使用的模式。
## 1.5. 集成准备

### 1.5.1. 注册机智云账号

在使用机智云服务前，你需要通过site.gizwits.com 
注册一个开发者账号。请完整填写你的注册信息。 
此部分请参考《快速入门》。

### 1.5.2. 新建设备接入

此部分请参考《快速入门》。

### 1.5.3. 获得 app ID 和产品标识码（productkey）

此部分请参考《快速入门》。

### 1.5.4. 下载SDK

### 1.5.5. 导入SDK

第一步，双击解开压缩包 GizWifiSDK-iOS-xxx.zip。 
第二步，将解压后的文件添加到指定的工程中： 
第三步，下载并添加依赖库OpenSSL。下载完成双击解压后，将lib-ios拷贝到项目目录，并添加到指定的工程中。 
第四步，如果使用的是Xcode7.2以下版本，需要添加AudioToolbox、SystemConfiguration、CoreTelephony库。
第五步，一定要记得在Info.plist设置支持ATS特性，否则iOS9下某些功能无法正常使用
最后，确保工程里面有这些链接库，SDK就添加完成了:
# 2. SDK流程简介

## 2.1. 通用流程图
## 2.2. 关键点说明
1)  SDK已经封装了所有的用户、配置、发现、连接、控制的过程，开发者使用这些API可以完成上述流程中的功能开发，不需要再自行实现通讯协议。 
2)  SDK采取回调的工作方式，所以必须设置必要的委托，比如通用委托和设备委托，具体请参见流程详解。SDK在主线程中给APP回调。
# 3. SDK流程详解

## 3.1. 初始化部分

### 3.1.1.   初始化部分流程图
### 3.1.2.   引用头文件

``` python
import <GizWifiSDK/GizWifiSDK.h>
```

### 3.1.3.   设置SDK通用委托
注册SDK通用委托是为了能让APP收到来自GizWifiSDK类的响应事件，包含了注册、登录、配置设备、绑定设备等回调接口。这是SDK使用中十分重要的一个委托，与GizWifiSDK类相关的操作都会在这里会回调。如果没有正确注册通用委托，将无法正常使用SDK。注册委托时，APP可以根据自己的需求实现回调接口。

### 3.1.4.   初始化SDK

SDK启动前，任何功能都是无法正常使用的。SDK启动时，会进行SDK初始化，并自动发现当前局域网设备。SDK将通过通用委托，上报已发现的设备以及相应的事件。APP可以先设置SDK的通用委托，再启动SDK，以便处理这些事件通知。 
SDK启动时需要指定应用程序的AppID，开发者需要先在机智云网站上为自己的APP申请一个AppID，请在应用的AppDelegate中调用该方法指定应用的AppID。该方法只需要调用一次。 

SDK的日志可以帮助开发者发现APP运行时发生的问题。SDK默认将所有日志信息输出到调试终端和日志文件中，日志文件保存在应用程序的Documents\GizWifiSDK\GizSDKLog目录下。APP如果不希望在调试终端输出日志，可以通过日志级别设置接口，把日志输出级别修改为GizLogPrintNone。 

【示例代码】

```
[GizWifiSDK shareInstance].delegate = self;
[GizWifiSDK startWithAppID:@"your_app_id"];
// 实现系统事件通知回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didNotifyEvent:(GizEventType)eventType eventSource:(id)eventSource eventID:(GizWifiErrorCode)eventID eventMessage: (NSString *)eventMessage {if(eventType == GizEventSDK)
- {
 // SDK发生异常的通知
 NSLog(@"SDK event happened: [%@] = %@", @(eventID), eventMessage);
 }
 else if(eventType == GizEventDevice) 
 {
// 设备连接断开时可能产生的通知
GizWifiDevice* mDevice = (GizWifiDevice*)eventSource;
NSLog(@"device mac %@ disconnect caused by %@", mDevice.macAddress, eventMessage);
} 
else if(eventType == GizEventM2MService) 
{
    // M2M服务返回的异常通知
 NSLog(@"M2M domain %@ exception happened: [%@] = %@", (NSString*)eventSource, @(eventID), eventMessage);
 } 
 else if(eventType == GizEventToken)
 {
// token失效通知
NSLog(@"token %@ expired: %@", (NSString*)eventSource, eventMessage);
}
```




## 3.2.  用户部分
机智云的用户系统包含了用户的注册、登录、重置密码、修改个人信息等功能，机智云以APPID区分用户系统，不同APPID的用户系统相互独立。更换APPID后，需要重新注册用户。 
以下流程中涉及到的监听器注册方法是用子类继承基类的方式实现的。

### 3.2.1. 用户部分主要流程图
用户的注册方式有多种，比如手机号、普通用户名、邮箱等，APP可以根据需要采取不同的方式。其他流程比如登录、密码修改、个人信息修改等部分，请直接阅读下面的流程文档。

### 3.2.2. 用户注册

机智云提供三种用户注册方式：手机注册、普通用户注册、邮箱注册。

#### 3.2.2.1. 注册手机用户

通过手机注册账号，需要一个有效的手机号。注册时需要两步操作：获取短信验证码、用短信验证码注册用户。 
第一步：获取短信验证码。SDK向云端发送短信验证码请求，如果请求成功，云端会给手机发送短信验证码。 
【示例代码】

```
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] requestSendPhoneSMSCode:@"your_app_secret" phone:@"your_phone_number"];
// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didRequestSendPhoneSMSCode:(NSError *)result token:(NSString *)token {
if(result.code == GIZ_SDK_SUCCESS) {
        // 请求成功
} else {
        // 请求失败
}
}
```

# 1. 设备接入SDK概述
## 1.1.  SDK目的与功能
机智云的设备接入SDK（以下简称SDK）封装了手机（包括PAD等设备）与机智云智能硬件的通讯过程，以及手机与云端的通讯过程。这些过程包括配置入网、发现、连接、控制、心跳、状态上报、报警通知等。使用SDK，可以使得开发者快速完成APP开发，开发者仅需关注APP的UI和UE设计即可，而相对复杂的协议与错误处理等事项可忽略。 

相比之下，SDK在新接口定义上做了进一步的简化，使用流程更加简单了。APP已经完全不需要了解设备连接方面的概念，可以更专注于APP用户体验的优化设计。
## 1.2. 机智云物联方案概况

## 1.3.  找到最合适的SDK
机智云目前提供3套SDK：iOS平台原生SDK、Android平台原生SDK、APICloud跨平台SDK。开发者可以根据项目需要自行选择，其中APICloud版本SDK可以用H5技术一次开发，同时适配iOS和Android两个平台，具体内容请参考：《APICloud SDK 集成指南》。
## 1.4.  相关名词定义
### 1.4.1.   GAgent
全称Gizwits Agent，运行于Wi-Fi模块中，设备通过GAgent接入机智云服务器。 目前已兼容国内主流的Wi-Fi模块， 开发者也可以通过获取GAgent二次开发包实现自定义的模块接入机智云。
### 1.4.2.   小循环
智能设备与手机、智能设备与智能设备之间，通过连接同一个路由器实现局域网内部的通信（查看状态或控制），我们称之为小循环。
### 1.4.3.   大循环
智能设备通过路由器或直接接入互联网以实现用户的远程监测与控制，我们称为大循环。
### 1.4.4.   ProductKey
产品标识码，开发者通过机智云后台创建新产品后，自动生成的一个32位字符串。在机智云的数据库中是一个唯一的号码，开发者完成开发写入设备主控MCU后，机智云通过此标识码对设备进行识别并自动完成注册。
### 1.4.5.   DID
设备号，当一个设备初次接入机智云时，机智云自动根据ProductKey以及设备Wi-Fi模块MAC地址为此设备注册一个did，此did全网唯一，用于与用户的绑定及后续操作。
### 1.4.6.   PassCode
设备通行证，用于校验用户的绑定/控制权限。当用户发起设备绑定时，只要是合法操作即可拿到此通行证，通过此通行证绑定设备并对设备进行有效期内的查看、控制等操作。GAgent首次运行时生成随机数作为设备通行证，生成后保存在非易失性存储器上。设备上线时需要上报给服务器。
### 1.4.7.   AppID
应用标识码，当开发者需要为一款智能产品开发应用（包括iOS、Android、Web应用等）时，后台会自动生成一个AppID，并与此设备进行关联。应用开发时需要填入此AppID。
### 1.4.8. Onboarding

也叫配置入网，用户将一款基于Wi-Fi的物联网设备配置连接上路由器的过程称为Onboarding。新设备第一次使用时需要知道路由器的账号和密码，以通过路由器连接互联网。由于大多数的物联网设备没有自带的屏幕和键盘，所以需要通过智能手机向设备发送路由器的SSID和密码，这个过程机智云称为Onboarding。机智云提供的Wi-Fi设备接入SDK中已经内置了此配置的功能。

### 1.4.9. AirLink

机智云对各种SmartConfig、SmartLink这种UDP广播报方式对设备配置入网的技术统称，兼容了多个Wi-Fi模块厂商的配置协议，总结了一套良好用户体验的标准Onboarding操作流程，机智云的Wi-Fi 设备接入SDK已经内置AirLink技术。

### 1.4.10. SoftAP

由于目前各个Wi-Fi模块厂商的Smart Config协议均未完全成熟，也不支持5G路由器信号。机智云在提供了AirLink配置模式的同时也支持SoftAP模式配置设备接入路由器。当设备进入SoftAP配置模式时，设备本身将成为一个AP，智能手机可直接与设备进行连接，然后在手机上的界面上输入路由器的SSID和密码，设备接收到信息的时候会自动尝试连接路由器，连接成功则自动切换到正常使用的模式。
## 1.5. 集成准备

### 1.5.1. 注册机智云账号

在使用机智云服务前，你需要通过site.gizwits.com 
注册一个开发者账号。请完整填写你的注册信息。 
此部分请参考《快速入门》。

### 1.5.2. 新建设备接入

此部分请参考《快速入门》。

### 1.5.3. 获得 app ID 和产品标识码（productkey）

此部分请参考《快速入门》。

### 1.5.4. 下载SDK

### 1.5.5. 导入SDK

第一步，双击解开压缩包 GizWifiSDK-iOS-xxx.zip。 
第二步，将解压后的文件添加到指定的工程中： 
第三步，下载并添加依赖库OpenSSL。下载完成双击解压后，将lib-ios拷贝到项目目录，并添加到指定的工程中。 
第四步，如果使用的是Xcode7.2以下版本，需要添加AudioToolbox、SystemConfiguration、CoreTelephony库。
第五步，一定要记得在Info.plist设置支持ATS特性，否则iOS9下某些功能无法正常使用
最后，确保工程里面有这些链接库，SDK就添加完成了:
# 2. SDK流程简介

## 2.1. 通用流程图
## 2.2. 关键点说明
1)  SDK已经封装了所有的用户、配置、发现、连接、控制的过程，开发者使用这些API可以完成上述流程中的功能开发，不需要再自行实现通讯协议。 
2)  SDK采取回调的工作方式，所以必须设置必要的委托，比如通用委托和设备委托，具体请参见流程详解。SDK在主线程中给APP回调。
# 3. SDK流程详解

## 3.1. 初始化部分

### 3.1.1.   初始化部分流程图
### 3.1.2.   引用头文件

```
import <GizWifiSDK/GizWifiSDK.h>
```

### 3.1.3.   设置SDK通用委托
注册SDK通用委托是为了能让APP收到来自GizWifiSDK类的响应事件，包含了注册、登录、配置设备、绑定设备等回调接口。这是SDK使用中十分重要的一个委托，与GizWifiSDK类相关的操作都会在这里会回调。如果没有正确注册通用委托，将无法正常使用SDK。注册委托时，APP可以根据自己的需求实现回调接口。

### 3.1.4.   初始化SDK

SDK启动前，任何功能都是无法正常使用的。SDK启动时，会进行SDK初始化，并自动发现当前局域网设备。SDK将通过通用委托，上报已发现的设备以及相应的事件。APP可以先设置SDK的通用委托，再启动SDK，以便处理这些事件通知。 
SDK启动时需要指定应用程序的AppID，开发者需要先在机智云网站上为自己的APP申请一个AppID，请在应用的AppDelegate中调用该方法指定应用的AppID。该方法只需要调用一次。 

SDK的日志可以帮助开发者发现APP运行时发生的问题。SDK默认将所有日志信息输出到调试终端和日志文件中，日志文件保存在应用程序的Documents\GizWifiSDK\GizSDKLog目录下。APP如果不希望在调试终端输出日志，可以通过日志级别设置接口，把日志输出级别修改为GizLogPrintNone。 

【示例代码】

```
[GizWifiSDK shareInstance].delegate = self;
[GizWifiSDK startWithAppID:@"your_app_id"];
// 实现系统事件通知回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didNotifyEvent:(GizEventType)eventType eventSource:(id)eventSource eventID:(GizWifiErrorCode)eventID eventMessage: (NSString *)eventMessage {if(eventType == GizEventSDK)
- {
 // SDK发生异常的通知
 NSLog(@"SDK event happened: [%@] = %@", @(eventID), eventMessage);
 }
 else if(eventType == GizEventDevice) 
 {
// 设备连接断开时可能产生的通知
GizWifiDevice* mDevice = (GizWifiDevice*)eventSource;
NSLog(@"device mac %@ disconnect caused by %@", mDevice.macAddress, eventMessage);
} 
else if(eventType == GizEventM2MService) 
{
    // M2M服务返回的异常通知
 NSLog(@"M2M domain %@ exception happened: [%@] = %@", (NSString*)eventSource, @(eventID), eventMessage);
 } 
 else if(eventType == GizEventToken)
 {
// token失效通知
NSLog(@"token %@ expired: %@", (NSString*)eventSource, eventMessage);
}
```




## 3.2.  用户部分
机智云的用户系统包含了用户的注册、登录、重置密码、修改个人信息等功能，机智云以APPID区分用户系统，不同APPID的用户系统相互独立。更换APPID后，需要重新注册用户。 
以下流程中涉及到的监听器注册方法是用子类继承基类的方式实现的。

### 3.2.1. 用户部分主要流程图
用户的注册方式有多种，比如手机号、普通用户名、邮箱等，APP可以根据需要采取不同的方式。其他流程比如登录、密码修改、个人信息修改等部分，请直接阅读下面的流程文档。

### 3.2.2. 用户注册

机智云提供三种用户注册方式：手机注册、普通用户注册、邮箱注册。

#### 3.2.2.1. 注册手机用户

通过手机注册账号，需要一个有效的手机号。注册时需要两步操作：获取短信验证码、用短信验证码注册用户。 
第一步：获取短信验证码。SDK向云端发送短信验证码请求，如果请求成功，云端会给手机发送短信验证码。 
【示例代码】

```
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] requestSendPhoneSMSCode:@"your_app_secret" phone:@"your_phone_number"];
// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didRequestSendPhoneSMSCode:(NSError *)result token:(NSString *)token {
if(result.code == GIZ_SDK_SUCCESS) {
        // 请求成功
} else {
        // 请求失败
}
}
```

# 1. 设备接入SDK概述
## 1.1.  SDK目的与功能
机智云的设备接入SDK（以下简称SDK）封装了手机（包括PAD等设备）与机智云智能硬件的通讯过程，以及手机与云端的通讯过程。这些过程包括配置入网、发现、连接、控制、心跳、状态上报、报警通知等。使用SDK，可以使得开发者快速完成APP开发，开发者仅需关注APP的UI和UE设计即可，而相对复杂的协议与错误处理等事项可忽略。 

相比之下，SDK在新接口定义上做了进一步的简化，使用流程更加简单了。APP已经完全不需要了解设备连接方面的概念，可以更专注于APP用户体验的优化设计。
## 1.2. 机智云物联方案概况

## 1.3.  找到最合适的SDK
机智云目前提供3套SDK：iOS平台原生SDK、Android平台原生SDK、APICloud跨平台SDK。开发者可以根据项目需要自行选择，其中APICloud版本SDK可以用H5技术一次开发，同时适配iOS和Android两个平台，具体内容请参考：《APICloud SDK 集成指南》。
## 1.4.  相关名词定义
### 1.4.1.   GAgent
全称Gizwits Agent，运行于Wi-Fi模块中，设备通过GAgent接入机智云服务器。 目前已兼容国内主流的Wi-Fi模块， 开发者也可以通过获取GAgent二次开发包实现自定义的模块接入机智云。
### 1.4.2.   小循环
智能设备与手机、智能设备与智能设备之间，通过连接同一个路由器实现局域网内部的通信（查看状态或控制），我们称之为小循环。
### 1.4.3.   大循环
智能设备通过路由器或直接接入互联网以实现用户的远程监测与控制，我们称为大循环。
### 1.4.4.   ProductKey
产品标识码，开发者通过机智云后台创建新产品后，自动生成的一个32位字符串。在机智云的数据库中是一个唯一的号码，开发者完成开发写入设备主控MCU后，机智云通过此标识码对设备进行识别并自动完成注册。
### 1.4.5.   DID
设备号，当一个设备初次接入机智云时，机智云自动根据ProductKey以及设备Wi-Fi模块MAC地址为此设备注册一个did，此did全网唯一，用于与用户的绑定及后续操作。
### 1.4.6.   PassCode
设备通行证，用于校验用户的绑定/控制权限。当用户发起设备绑定时，只要是合法操作即可拿到此通行证，通过此通行证绑定设备并对设备进行有效期内的查看、控制等操作。GAgent首次运行时生成随机数作为设备通行证，生成后保存在非易失性存储器上。设备上线时需要上报给服务器。
### 1.4.7.   AppID
应用标识码，当开发者需要为一款智能产品开发应用（包括iOS、Android、Web应用等）时，后台会自动生成一个AppID，并与此设备进行关联。应用开发时需要填入此AppID。
### 1.4.8. Onboarding

也叫配置入网，用户将一款基于Wi-Fi的物联网设备配置连接上路由器的过程称为Onboarding。新设备第一次使用时需要知道路由器的账号和密码，以通过路由器连接互联网。由于大多数的物联网设备没有自带的屏幕和键盘，所以需要通过智能手机向设备发送路由器的SSID和密码，这个过程机智云称为Onboarding。机智云提供的Wi-Fi设备接入SDK中已经内置了此配置的功能。

### 1.4.9. AirLink

机智云对各种SmartConfig、SmartLink这种UDP广播报方式对设备配置入网的技术统称，兼容了多个Wi-Fi模块厂商的配置协议，总结了一套良好用户体验的标准Onboarding操作流程，机智云的Wi-Fi 设备接入SDK已经内置AirLink技术。

### 1.4.10. SoftAP

由于目前各个Wi-Fi模块厂商的Smart Config协议均未完全成熟，也不支持5G路由器信号。机智云在提供了AirLink配置模式的同时也支持SoftAP模式配置设备接入路由器。当设备进入SoftAP配置模式时，设备本身将成为一个AP，智能手机可直接与设备进行连接，然后在手机上的界面上输入路由器的SSID和密码，设备接收到信息的时候会自动尝试连接路由器，连接成功则自动切换到正常使用的模式。
## 1.5. 集成准备

### 1.5.1. 注册机智云账号

在使用机智云服务前，你需要通过site.gizwits.com 
注册一个开发者账号。请完整填写你的注册信息。 
此部分请参考《快速入门》。

### 1.5.2. 新建设备接入

此部分请参考《快速入门》。

### 1.5.3. 获得 app ID 和产品标识码（productkey）

此部分请参考《快速入门》。

### 1.5.4. 下载SDK

### 1.5.5. 导入SDK

第一步，双击解开压缩包 GizWifiSDK-iOS-xxx.zip。 
第二步，将解压后的文件添加到指定的工程中： 
第三步，下载并添加依赖库OpenSSL。下载完成双击解压后，将lib-ios拷贝到项目目录，并添加到指定的工程中。 
第四步，如果使用的是Xcode7.2以下版本，需要添加AudioToolbox、SystemConfiguration、CoreTelephony库。
第五步，一定要记得在Info.plist设置支持ATS特性，否则iOS9下某些功能无法正常使用
最后，确保工程里面有这些链接库，SDK就添加完成了:
# 2. SDK流程简介

## 2.1. 通用流程图
## 2.2. 关键点说明
1)  SDK已经封装了所有的用户、配置、发现、连接、控制的过程，开发者使用这些API可以完成上述流程中的功能开发，不需要再自行实现通讯协议。 
2)  SDK采取回调的工作方式，所以必须设置必要的委托，比如通用委托和设备委托，具体请参见流程详解。SDK在主线程中给APP回调。
# 3. SDK流程详解

## 3.1. 初始化部分

### 3.1.1.   初始化部分流程图
### 3.1.2.   引用头文件

```
import <GizWifiSDK/GizWifiSDK.h>
```

### 3.1.3.   设置SDK通用委托
注册SDK通用委托是为了能让APP收到来自GizWifiSDK类的响应事件，包含了注册、登录、配置设备、绑定设备等回调接口。这是SDK使用中十分重要的一个委托，与GizWifiSDK类相关的操作都会在这里会回调。如果没有正确注册通用委托，将无法正常使用SDK。注册委托时，APP可以根据自己的需求实现回调接口。

### 3.1.4.   初始化SDK

SDK启动前，任何功能都是无法正常使用的。SDK启动时，会进行SDK初始化，并自动发现当前局域网设备。SDK将通过通用委托，上报已发现的设备以及相应的事件。APP可以先设置SDK的通用委托，再启动SDK，以便处理这些事件通知。 
SDK启动时需要指定应用程序的AppID，开发者需要先在机智云网站上为自己的APP申请一个AppID，请在应用的AppDelegate中调用该方法指定应用的AppID。该方法只需要调用一次。 

SDK的日志可以帮助开发者发现APP运行时发生的问题。SDK默认将所有日志信息输出到调试终端和日志文件中，日志文件保存在应用程序的Documents\GizWifiSDK\GizSDKLog目录下。APP如果不希望在调试终端输出日志，可以通过日志级别设置接口，把日志输出级别修改为GizLogPrintNone。 

【示例代码】

```
[GizWifiSDK shareInstance].delegate = self;
[GizWifiSDK startWithAppID:@"your_app_id"];
// 实现系统事件通知回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didNotifyEvent:(GizEventType)eventType eventSource:(id)eventSource eventID:(GizWifiErrorCode)eventID eventMessage: (NSString *)eventMessage {if(eventType == GizEventSDK)
- {
 // SDK发生异常的通知
 NSLog(@"SDK event happened: [%@] = %@", @(eventID), eventMessage);
 }
 else if(eventType == GizEventDevice) 
 {
// 设备连接断开时可能产生的通知
GizWifiDevice* mDevice = (GizWifiDevice*)eventSource;
NSLog(@"device mac %@ disconnect caused by %@", mDevice.macAddress, eventMessage);
} 
else if(eventType == GizEventM2MService) 
{
    // M2M服务返回的异常通知
 NSLog(@"M2M domain %@ exception happened: [%@] = %@", (NSString*)eventSource, @(eventID), eventMessage);
 } 
 else if(eventType == GizEventToken)
 {
// token失效通知
NSLog(@"token %@ expired: %@", (NSString*)eventSource, eventMessage);
}
```




## 3.2.  用户部分
机智云的用户系统包含了用户的注册、登录、重置密码、修改个人信息等功能，机智云以APPID区分用户系统，不同APPID的用户系统相互独立。更换APPID后，需要重新注册用户。 
以下流程中涉及到的监听器注册方法是用子类继承基类的方式实现的。

### 3.2.1. 用户部分主要流程图
用户的注册方式有多种，比如手机号、普通用户名、邮箱等，APP可以根据需要采取不同的方式。其他流程比如登录、密码修改、个人信息修改等部分，请直接阅读下面的流程文档。

### 3.2.2. 用户注册

机智云提供三种用户注册方式：手机注册、普通用户注册、邮箱注册。

#### 3.2.2.1. 注册手机用户

通过手机注册账号，需要一个有效的手机号。注册时需要两步操作：获取短信验证码、用短信验证码注册用户。 
第一步：获取短信验证码。SDK向云端发送短信验证码请求，如果请求成功，云端会给手机发送短信验证码。 
【示例代码】

```
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] requestSendPhoneSMSCode:@"your_app_secret" phone:@"your_phone_number"];
// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didRequestSendPhoneSMSCode:(NSError *)result token:(NSString *)token {
if(result.code == GIZ_SDK_SUCCESS) {
        // 请求成功
} else {
        // 请求失败
}
}
```

# 1. 设备接入SDK概述
## 1.1.  SDK目的与功能
机智云的设备接入SDK（以下简称SDK）封装了手机（包括PAD等设备）与机智云智能硬件的通讯过程，以及手机与云端的通讯过程。这些过程包括配置入网、发现、连接、控制、心跳、状态上报、报警通知等。使用SDK，可以使得开发者快速完成APP开发，开发者仅需关注APP的UI和UE设计即可，而相对复杂的协议与错误处理等事项可忽略。 

相比之下，SDK在新接口定义上做了进一步的简化，使用流程更加简单了。APP已经完全不需要了解设备连接方面的概念，可以更专注于APP用户体验的优化设计。
## 1.2. 机智云物联方案概况

## 1.3.  找到最合适的SDK
机智云目前提供3套SDK：iOS平台原生SDK、Android平台原生SDK、APICloud跨平台SDK。开发者可以根据项目需要自行选择，其中APICloud版本SDK可以用H5技术一次开发，同时适配iOS和Android两个平台，具体内容请参考：《APICloud SDK 集成指南》。
## 1.4.  相关名词定义
### 1.4.1.   GAgent
全称Gizwits Agent，运行于Wi-Fi模块中，设备通过GAgent接入机智云服务器。 目前已兼容国内主流的Wi-Fi模块， 开发者也可以通过获取GAgent二次开发包实现自定义的模块接入机智云。
### 1.4.2.   小循环
智能设备与手机、智能设备与智能设备之间，通过连接同一个路由器实现局域网内部的通信（查看状态或控制），我们称之为小循环。
### 1.4.3.   大循环
智能设备通过路由器或直接接入互联网以实现用户的远程监测与控制，我们称为大循环。
### 1.4.4.   ProductKey
产品标识码，开发者通过机智云后台创建新产品后，自动生成的一个32位字符串。在机智云的数据库中是一个唯一的号码，开发者完成开发写入设备主控MCU后，机智云通过此标识码对设备进行识别并自动完成注册。
### 1.4.5.   DID
设备号，当一个设备初次接入机智云时，机智云自动根据ProductKey以及设备Wi-Fi模块MAC地址为此设备注册一个did，此did全网唯一，用于与用户的绑定及后续操作。
### 1.4.6.   PassCode
设备通行证，用于校验用户的绑定/控制权限。当用户发起设备绑定时，只要是合法操作即可拿到此通行证，通过此通行证绑定设备并对设备进行有效期内的查看、控制等操作。GAgent首次运行时生成随机数作为设备通行证，生成后保存在非易失性存储器上。设备上线时需要上报给服务器。
### 1.4.7.   AppID
应用标识码，当开发者需要为一款智能产品开发应用（包括iOS、Android、Web应用等）时，后台会自动生成一个AppID，并与此设备进行关联。应用开发时需要填入此AppID。
### 1.4.8. Onboarding

也叫配置入网，用户将一款基于Wi-Fi的物联网设备配置连接上路由器的过程称为Onboarding。新设备第一次使用时需要知道路由器的账号和密码，以通过路由器连接互联网。由于大多数的物联网设备没有自带的屏幕和键盘，所以需要通过智能手机向设备发送路由器的SSID和密码，这个过程机智云称为Onboarding。机智云提供的Wi-Fi设备接入SDK中已经内置了此配置的功能。

### 1.4.9. AirLink

机智云对各种SmartConfig、SmartLink这种UDP广播报方式对设备配置入网的技术统称，兼容了多个Wi-Fi模块厂商的配置协议，总结了一套良好用户体验的标准Onboarding操作流程，机智云的Wi-Fi 设备接入SDK已经内置AirLink技术。

### 1.4.10. SoftAP

由于目前各个Wi-Fi模块厂商的Smart Config协议均未完全成熟，也不支持5G路由器信号。机智云在提供了AirLink配置模式的同时也支持SoftAP模式配置设备接入路由器。当设备进入SoftAP配置模式时，设备本身将成为一个AP，智能手机可直接与设备进行连接，然后在手机上的界面上输入路由器的SSID和密码，设备接收到信息的时候会自动尝试连接路由器，连接成功则自动切换到正常使用的模式。
## 1.5. 集成准备

### 1.5.1. 注册机智云账号

在使用机智云服务前，你需要通过site.gizwits.com 
注册一个开发者账号。请完整填写你的注册信息。 
此部分请参考《快速入门》。

### 1.5.2. 新建设备接入

此部分请参考《快速入门》。

### 1.5.3. 获得 app ID 和产品标识码（productkey）

此部分请参考《快速入门》。

### 1.5.4. 下载SDK

### 1.5.5. 导入SDK

第一步，双击解开压缩包 GizWifiSDK-iOS-xxx.zip。 
第二步，将解压后的文件添加到指定的工程中： 
第三步，下载并添加依赖库OpenSSL。下载完成双击解压后，将lib-ios拷贝到项目目录，并添加到指定的工程中。 
第四步，如果使用的是Xcode7.2以下版本，需要添加AudioToolbox、SystemConfiguration、CoreTelephony库。
第五步，一定要记得在Info.plist设置支持ATS特性，否则iOS9下某些功能无法正常使用
最后，确保工程里面有这些链接库，SDK就添加完成了:
# 2. SDK流程简介

## 2.1. 通用流程图
## 2.2. 关键点说明
1)  SDK已经封装了所有的用户、配置、发现、连接、控制的过程，开发者使用这些API可以完成上述流程中的功能开发，不需要再自行实现通讯协议。 
2)  SDK采取回调的工作方式，所以必须设置必要的委托，比如通用委托和设备委托，具体请参见流程详解。SDK在主线程中给APP回调。
# 3. SDK流程详解

## 3.1. 初始化部分

### 3.1.1.   初始化部分流程图
### 3.1.2.   引用头文件

```
import <GizWifiSDK/GizWifiSDK.h>
```

### 3.1.3.   设置SDK通用委托
注册SDK通用委托是为了能让APP收到来自GizWifiSDK类的响应事件，包含了注册、登录、配置设备、绑定设备等回调接口。这是SDK使用中十分重要的一个委托，与GizWifiSDK类相关的操作都会在这里会回调。如果没有正确注册通用委托，将无法正常使用SDK。注册委托时，APP可以根据自己的需求实现回调接口。

### 3.1.4.   初始化SDK

SDK启动前，任何功能都是无法正常使用的。SDK启动时，会进行SDK初始化，并自动发现当前局域网设备。SDK将通过通用委托，上报已发现的设备以及相应的事件。APP可以先设置SDK的通用委托，再启动SDK，以便处理这些事件通知。 
SDK启动时需要指定应用程序的AppID，开发者需要先在机智云网站上为自己的APP申请一个AppID，请在应用的AppDelegate中调用该方法指定应用的AppID。该方法只需要调用一次。 

SDK的日志可以帮助开发者发现APP运行时发生的问题。SDK默认将所有日志信息输出到调试终端和日志文件中，日志文件保存在应用程序的Documents\GizWifiSDK\GizSDKLog目录下。APP如果不希望在调试终端输出日志，可以通过日志级别设置接口，把日志输出级别修改为GizLogPrintNone。 

【示例代码】

```
[GizWifiSDK shareInstance].delegate = self;
[GizWifiSDK startWithAppID:@"your_app_id"];
// 实现系统事件通知回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didNotifyEvent:(GizEventType)eventType eventSource:(id)eventSource eventID:(GizWifiErrorCode)eventID eventMessage: (NSString *)eventMessage {if(eventType == GizEventSDK)
- {
 // SDK发生异常的通知
 NSLog(@"SDK event happened: [%@] = %@", @(eventID), eventMessage);
 }
 else if(eventType == GizEventDevice) 
 {
// 设备连接断开时可能产生的通知
GizWifiDevice* mDevice = (GizWifiDevice*)eventSource;
NSLog(@"device mac %@ disconnect caused by %@", mDevice.macAddress, eventMessage);
} 
else if(eventType == GizEventM2MService) 
{
    // M2M服务返回的异常通知
 NSLog(@"M2M domain %@ exception happened: [%@] = %@", (NSString*)eventSource, @(eventID), eventMessage);
 } 
 else if(eventType == GizEventToken)
 {
// token失效通知
NSLog(@"token %@ expired: %@", (NSString*)eventSource, eventMessage);
}
```




## 3.2.  用户部分
机智云的用户系统包含了用户的注册、登录、重置密码、修改个人信息等功能，机智云以APPID区分用户系统，不同APPID的用户系统相互独立。更换APPID后，需要重新注册用户。 
以下流程中涉及到的监听器注册方法是用子类继承基类的方式实现的。

### 3.2.1. 用户部分主要流程图
用户的注册方式有多种，比如手机号、普通用户名、邮箱等，APP可以根据需要采取不同的方式。其他流程比如登录、密码修改、个人信息修改等部分，请直接阅读下面的流程文档。

### 3.2.2. 用户注册

机智云提供三种用户注册方式：手机注册、普通用户注册、邮箱注册。

#### 3.2.2.1. 注册手机用户

通过手机注册账号，需要一个有效的手机号。注册时需要两步操作：获取短信验证码、用短信验证码注册用户。 
第一步：获取短信验证码。SDK向云端发送短信验证码请求，如果请求成功，云端会给手机发送短信验证码。 
【示例代码】

```
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] requestSendPhoneSMSCode:@"your_app_secret" phone:@"your_phone_number"];
// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didRequestSendPhoneSMSCode:(NSError *)result token:(NSString *)token {
if(result.code == GIZ_SDK_SUCCESS) {
        // 请求成功
} else {
        // 请求失败
}
}
```

# 1. 设备接入SDK概述
## 1.1.  SDK目的与功能
机智云的设备接入SDK（以下简称SDK）封装了手机（包括PAD等设备）与机智云智能硬件的通讯过程，以及手机与云端的通讯过程。这些过程包括配置入网、发现、连接、控制、心跳、状态上报、报警通知等。使用SDK，可以使得开发者快速完成APP开发，开发者仅需关注APP的UI和UE设计即可，而相对复杂的协议与错误处理等事项可忽略。 

相比之下，SDK在新接口定义上做了进一步的简化，使用流程更加简单了。APP已经完全不需要了解设备连接方面的概念，可以更专注于APP用户体验的优化设计。
## 1.2. 机智云物联方案概况

## 1.3.  找到最合适的SDK
机智云目前提供3套SDK：iOS平台原生SDK、Android平台原生SDK、APICloud跨平台SDK。开发者可以根据项目需要自行选择，其中APICloud版本SDK可以用H5技术一次开发，同时适配iOS和Android两个平台，具体内容请参考：《APICloud SDK 集成指南》。
## 1.4.  相关名词定义
### 1.4.1.   GAgent
全称Gizwits Agent，运行于Wi-Fi模块中，设备通过GAgent接入机智云服务器。 目前已兼容国内主流的Wi-Fi模块， 开发者也可以通过获取GAgent二次开发包实现自定义的模块接入机智云。
### 1.4.2.   小循环
智能设备与手机、智能设备与智能设备之间，通过连接同一个路由器实现局域网内部的通信（查看状态或控制），我们称之为小循环。
### 1.4.3.   大循环
智能设备通过路由器或直接接入互联网以实现用户的远程监测与控制，我们称为大循环。
### 1.4.4.   ProductKey
产品标识码，开发者通过机智云后台创建新产品后，自动生成的一个32位字符串。在机智云的数据库中是一个唯一的号码，开发者完成开发写入设备主控MCU后，机智云通过此标识码对设备进行识别并自动完成注册。
### 1.4.5.   DID
设备号，当一个设备初次接入机智云时，机智云自动根据ProductKey以及设备Wi-Fi模块MAC地址为此设备注册一个did，此did全网唯一，用于与用户的绑定及后续操作。
### 1.4.6.   PassCode
设备通行证，用于校验用户的绑定/控制权限。当用户发起设备绑定时，只要是合法操作即可拿到此通行证，通过此通行证绑定设备并对设备进行有效期内的查看、控制等操作。GAgent首次运行时生成随机数作为设备通行证，生成后保存在非易失性存储器上。设备上线时需要上报给服务器。
### 1.4.7.   AppID
应用标识码，当开发者需要为一款智能产品开发应用（包括iOS、Android、Web应用等）时，后台会自动生成一个AppID，并与此设备进行关联。应用开发时需要填入此AppID。
### 1.4.8. Onboarding

也叫配置入网，用户将一款基于Wi-Fi的物联网设备配置连接上路由器的过程称为Onboarding。新设备第一次使用时需要知道路由器的账号和密码，以通过路由器连接互联网。由于大多数的物联网设备没有自带的屏幕和键盘，所以需要通过智能手机向设备发送路由器的SSID和密码，这个过程机智云称为Onboarding。机智云提供的Wi-Fi设备接入SDK中已经内置了此配置的功能。

### 1.4.9. AirLink

机智云对各种SmartConfig、SmartLink这种UDP广播报方式对设备配置入网的技术统称，兼容了多个Wi-Fi模块厂商的配置协议，总结了一套良好用户体验的标准Onboarding操作流程，机智云的Wi-Fi 设备接入SDK已经内置AirLink技术。

### 1.4.10. SoftAP

由于目前各个Wi-Fi模块厂商的Smart Config协议均未完全成熟，也不支持5G路由器信号。机智云在提供了AirLink配置模式的同时也支持SoftAP模式配置设备接入路由器。当设备进入SoftAP配置模式时，设备本身将成为一个AP，智能手机可直接与设备进行连接，然后在手机上的界面上输入路由器的SSID和密码，设备接收到信息的时候会自动尝试连接路由器，连接成功则自动切换到正常使用的模式。
## 1.5. 集成准备

### 1.5.1. 注册机智云账号

在使用机智云服务前，你需要通过site.gizwits.com 
注册一个开发者账号。请完整填写你的注册信息。 
此部分请参考《快速入门》。

### 1.5.2. 新建设备接入

此部分请参考《快速入门》。

### 1.5.3. 获得 app ID 和产品标识码（productkey）

此部分请参考《快速入门》。

### 1.5.4. 下载SDK

### 1.5.5. 导入SDK

第一步，双击解开压缩包 GizWifiSDK-iOS-xxx.zip。 
第二步，将解压后的文件添加到指定的工程中： 
第三步，下载并添加依赖库OpenSSL。下载完成双击解压后，将lib-ios拷贝到项目目录，并添加到指定的工程中。 
第四步，如果使用的是Xcode7.2以下版本，需要添加AudioToolbox、SystemConfiguration、CoreTelephony库。
第五步，一定要记得在Info.plist设置支持ATS特性，否则iOS9下某些功能无法正常使用
最后，确保工程里面有这些链接库，SDK就添加完成了:
# 2. SDK流程简介

## 2.1. 通用流程图
## 2.2. 关键点说明
1)  SDK已经封装了所有的用户、配置、发现、连接、控制的过程，开发者使用这些API可以完成上述流程中的功能开发，不需要再自行实现通讯协议。 
2)  SDK采取回调的工作方式，所以必须设置必要的委托，比如通用委托和设备委托，具体请参见流程详解。SDK在主线程中给APP回调。
# 3. SDK流程详解

## 3.1. 初始化部分

### 3.1.1.   初始化部分流程图
### 3.1.2.   引用头文件

```
import <GizWifiSDK/GizWifiSDK.h>
```

### 3.1.3.   设置SDK通用委托
注册SDK通用委托是为了能让APP收到来自GizWifiSDK类的响应事件，包含了注册、登录、配置设备、绑定设备等回调接口。这是SDK使用中十分重要的一个委托，与GizWifiSDK类相关的操作都会在这里会回调。如果没有正确注册通用委托，将无法正常使用SDK。注册委托时，APP可以根据自己的需求实现回调接口。

### 3.1.4.   初始化SDK

SDK启动前，任何功能都是无法正常使用的。SDK启动时，会进行SDK初始化，并自动发现当前局域网设备。SDK将通过通用委托，上报已发现的设备以及相应的事件。APP可以先设置SDK的通用委托，再启动SDK，以便处理这些事件通知。 
SDK启动时需要指定应用程序的AppID，开发者需要先在机智云网站上为自己的APP申请一个AppID，请在应用的AppDelegate中调用该方法指定应用的AppID。该方法只需要调用一次。 

SDK的日志可以帮助开发者发现APP运行时发生的问题。SDK默认将所有日志信息输出到调试终端和日志文件中，日志文件保存在应用程序的Documents\GizWifiSDK\GizSDKLog目录下。APP如果不希望在调试终端输出日志，可以通过日志级别设置接口，把日志输出级别修改为GizLogPrintNone。 

【示例代码】

```
[GizWifiSDK shareInstance].delegate = self;
[GizWifiSDK startWithAppID:@"your_app_id"];
// 实现系统事件通知回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didNotifyEvent:(GizEventType)eventType eventSource:(id)eventSource eventID:(GizWifiErrorCode)eventID eventMessage: (NSString *)eventMessage {if(eventType == GizEventSDK)
- {
 // SDK发生异常的通知
 NSLog(@"SDK event happened: [%@] = %@", @(eventID), eventMessage);
 }
 else if(eventType == GizEventDevice) 
 {
// 设备连接断开时可能产生的通知
GizWifiDevice* mDevice = (GizWifiDevice*)eventSource;
NSLog(@"device mac %@ disconnect caused by %@", mDevice.macAddress, eventMessage);
} 
else if(eventType == GizEventM2MService) 
{
    // M2M服务返回的异常通知
 NSLog(@"M2M domain %@ exception happened: [%@] = %@", (NSString*)eventSource, @(eventID), eventMessage);
 } 
 else if(eventType == GizEventToken)
 {
// token失效通知
NSLog(@"token %@ expired: %@", (NSString*)eventSource, eventMessage);
}
```




## 3.2.  用户部分
机智云的用户系统包含了用户的注册、登录、重置密码、修改个人信息等功能，机智云以APPID区分用户系统，不同APPID的用户系统相互独立。更换APPID后，需要重新注册用户。 
以下流程中涉及到的监听器注册方法是用子类继承基类的方式实现的。

### 3.2.1. 用户部分主要流程图
用户的注册方式有多种，比如手机号、普通用户名、邮箱等，APP可以根据需要采取不同的方式。其他流程比如登录、密码修改、个人信息修改等部分，请直接阅读下面的流程文档。

### 3.2.2. 用户注册

机智云提供三种用户注册方式：手机注册、普通用户注册、邮箱注册。

#### 3.2.2.1. 注册手机用户

通过手机注册账号，需要一个有效的手机号。注册时需要两步操作：获取短信验证码、用短信验证码注册用户。 
第一步：获取短信验证码。SDK向云端发送短信验证码请求，如果请求成功，云端会给手机发送短信验证码。 
【示例代码】

```
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] requestSendPhoneSMSCode:@"your_app_secret" phone:@"your_phone_number"];
// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didRequestSendPhoneSMSCode:(NSError *)result token:(NSString *)token {
if(result.code == GIZ_SDK_SUCCESS) {
        // 请求成功
} else {
        // 请求失败
}
}
```

# 1. 设备接入SDK概述
## 1.1.  SDK目的与功能
机智云的设备接入SDK（以下简称SDK）封装了手机（包括PAD等设备）与机智云智能硬件的通讯过程，以及手机与云端的通讯过程。这些过程包括配置入网、发现、连接、控制、心跳、状态上报、报警通知等。使用SDK，可以使得开发者快速完成APP开发，开发者仅需关注APP的UI和UE设计即可，而相对复杂的协议与错误处理等事项可忽略。 

相比之下，SDK在新接口定义上做了进一步的简化，使用流程更加简单了。APP已经完全不需要了解设备连接方面的概念，可以更专注于APP用户体验的优化设计。
## 1.2. 机智云物联方案概况

## 1.3.  找到最合适的SDK
机智云目前提供3套SDK：iOS平台原生SDK、Android平台原生SDK、APICloud跨平台SDK。开发者可以根据项目需要自行选择，其中APICloud版本SDK可以用H5技术一次开发，同时适配iOS和Android两个平台，具体内容请参考：《APICloud SDK 集成指南》。
## 1.4.  相关名词定义
### 1.4.1.   GAgent
全称Gizwits Agent，运行于Wi-Fi模块中，设备通过GAgent接入机智云服务器。 目前已兼容国内主流的Wi-Fi模块， 开发者也可以通过获取GAgent二次开发包实现自定义的模块接入机智云。
### 1.4.2.   小循环
智能设备与手机、智能设备与智能设备之间，通过连接同一个路由器实现局域网内部的通信（查看状态或控制），我们称之为小循环。
### 1.4.3.   大循环
智能设备通过路由器或直接接入互联网以实现用户的远程监测与控制，我们称为大循环。
### 1.4.4.   ProductKey
产品标识码，开发者通过机智云后台创建新产品后，自动生成的一个32位字符串。在机智云的数据库中是一个唯一的号码，开发者完成开发写入设备主控MCU后，机智云通过此标识码对设备进行识别并自动完成注册。
### 1.4.5.   DID
设备号，当一个设备初次接入机智云时，机智云自动根据ProductKey以及设备Wi-Fi模块MAC地址为此设备注册一个did，此did全网唯一，用于与用户的绑定及后续操作。
### 1.4.6.   PassCode
设备通行证，用于校验用户的绑定/控制权限。当用户发起设备绑定时，只要是合法操作即可拿到此通行证，通过此通行证绑定设备并对设备进行有效期内的查看、控制等操作。GAgent首次运行时生成随机数作为设备通行证，生成后保存在非易失性存储器上。设备上线时需要上报给服务器。
### 1.4.7.   AppID
应用标识码，当开发者需要为一款智能产品开发应用（包括iOS、Android、Web应用等）时，后台会自动生成一个AppID，并与此设备进行关联。应用开发时需要填入此AppID。
### 1.4.8. Onboarding

也叫配置入网，用户将一款基于Wi-Fi的物联网设备配置连接上路由器的过程称为Onboarding。新设备第一次使用时需要知道路由器的账号和密码，以通过路由器连接互联网。由于大多数的物联网设备没有自带的屏幕和键盘，所以需要通过智能手机向设备发送路由器的SSID和密码，这个过程机智云称为Onboarding。机智云提供的Wi-Fi设备接入SDK中已经内置了此配置的功能。

### 1.4.9. AirLink

机智云对各种SmartConfig、SmartLink这种UDP广播报方式对设备配置入网的技术统称，兼容了多个Wi-Fi模块厂商的配置协议，总结了一套良好用户体验的标准Onboarding操作流程，机智云的Wi-Fi 设备接入SDK已经内置AirLink技术。

### 1.4.10. SoftAP

由于目前各个Wi-Fi模块厂商的Smart Config协议均未完全成熟，也不支持5G路由器信号。机智云在提供了AirLink配置模式的同时也支持SoftAP模式配置设备接入路由器。当设备进入SoftAP配置模式时，设备本身将成为一个AP，智能手机可直接与设备进行连接，然后在手机上的界面上输入路由器的SSID和密码，设备接收到信息的时候会自动尝试连接路由器，连接成功则自动切换到正常使用的模式。
## 1.5. 集成准备

### 1.5.1. 注册机智云账号

在使用机智云服务前，你需要通过site.gizwits.com 
注册一个开发者账号。请完整填写你的注册信息。 
此部分请参考《快速入门》。

### 1.5.2. 新建设备接入

此部分请参考《快速入门》。

### 1.5.3. 获得 app ID 和产品标识码（productkey）

此部分请参考《快速入门》。

### 1.5.4. 下载SDK

### 1.5.5. 导入SDK

第一步，双击解开压缩包 GizWifiSDK-iOS-xxx.zip。 
第二步，将解压后的文件添加到指定的工程中： 
第三步，下载并添加依赖库OpenSSL。下载完成双击解压后，将lib-ios拷贝到项目目录，并添加到指定的工程中。 
第四步，如果使用的是Xcode7.2以下版本，需要添加AudioToolbox、SystemConfiguration、CoreTelephony库。
第五步，一定要记得在Info.plist设置支持ATS特性，否则iOS9下某些功能无法正常使用
最后，确保工程里面有这些链接库，SDK就添加完成了:
# 2. SDK流程简介

## 2.1. 通用流程图
## 2.2. 关键点说明
1)  SDK已经封装了所有的用户、配置、发现、连接、控制的过程，开发者使用这些API可以完成上述流程中的功能开发，不需要再自行实现通讯协议。 
2)  SDK采取回调的工作方式，所以必须设置必要的委托，比如通用委托和设备委托，具体请参见流程详解。SDK在主线程中给APP回调。
# 3. SDK流程详解

## 3.1. 初始化部分

### 3.1.1.   初始化部分流程图
### 3.1.2.   引用头文件

```
import <GizWifiSDK/GizWifiSDK.h>
```

### 3.1.3.   设置SDK通用委托
注册SDK通用委托是为了能让APP收到来自GizWifiSDK类的响应事件，包含了注册、登录、配置设备、绑定设备等回调接口。这是SDK使用中十分重要的一个委托，与GizWifiSDK类相关的操作都会在这里会回调。如果没有正确注册通用委托，将无法正常使用SDK。注册委托时，APP可以根据自己的需求实现回调接口。

### 3.1.4.   初始化SDK

SDK启动前，任何功能都是无法正常使用的。SDK启动时，会进行SDK初始化，并自动发现当前局域网设备。SDK将通过通用委托，上报已发现的设备以及相应的事件。APP可以先设置SDK的通用委托，再启动SDK，以便处理这些事件通知。 
SDK启动时需要指定应用程序的AppID，开发者需要先在机智云网站上为自己的APP申请一个AppID，请在应用的AppDelegate中调用该方法指定应用的AppID。该方法只需要调用一次。 

SDK的日志可以帮助开发者发现APP运行时发生的问题。SDK默认将所有日志信息输出到调试终端和日志文件中，日志文件保存在应用程序的Documents\GizWifiSDK\GizSDKLog目录下。APP如果不希望在调试终端输出日志，可以通过日志级别设置接口，把日志输出级别修改为GizLogPrintNone。 

【示例代码】

```
[GizWifiSDK shareInstance].delegate = self;
[GizWifiSDK startWithAppID:@"your_app_id"];
// 实现系统事件通知回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didNotifyEvent:(GizEventType)eventType eventSource:(id)eventSource eventID:(GizWifiErrorCode)eventID eventMessage: (NSString *)eventMessage {if(eventType == GizEventSDK)
- {
 // SDK发生异常的通知
 NSLog(@"SDK event happened: [%@] = %@", @(eventID), eventMessage);
 }
 else if(eventType == GizEventDevice) 
 {
// 设备连接断开时可能产生的通知
GizWifiDevice* mDevice = (GizWifiDevice*)eventSource;
NSLog(@"device mac %@ disconnect caused by %@", mDevice.macAddress, eventMessage);
} 
else if(eventType == GizEventM2MService) 
{
    // M2M服务返回的异常通知
 NSLog(@"M2M domain %@ exception happened: [%@] = %@", (NSString*)eventSource, @(eventID), eventMessage);
 } 
 else if(eventType == GizEventToken)
 {
// token失效通知
NSLog(@"token %@ expired: %@", (NSString*)eventSource, eventMessage);
}
```




## 3.2.  用户部分
机智云的用户系统包含了用户的注册、登录、重置密码、修改个人信息等功能，机智云以APPID区分用户系统，不同APPID的用户系统相互独立。更换APPID后，需要重新注册用户。 
以下流程中涉及到的监听器注册方法是用子类继承基类的方式实现的。

### 3.2.1. 用户部分主要流程图
用户的注册方式有多种，比如手机号、普通用户名、邮箱等，APP可以根据需要采取不同的方式。其他流程比如登录、密码修改、个人信息修改等部分，请直接阅读下面的流程文档。

### 3.2.2. 用户注册

机智云提供三种用户注册方式：手机注册、普通用户注册、邮箱注册。

#### 3.2.2.1. 注册手机用户

通过手机注册账号，需要一个有效的手机号。注册时需要两步操作：获取短信验证码、用短信验证码注册用户。 
第一步：获取短信验证码。SDK向云端发送短信验证码请求，如果请求成功，云端会给手机发送短信验证码。 
【示例代码】

```
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] requestSendPhoneSMSCode:@"your_app_secret" phone:@"your_phone_number"];
// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didRequestSendPhoneSMSCode:(NSError *)result token:(NSString *)token {
if(result.code == GIZ_SDK_SUCCESS) {
        // 请求成功
} else {
        // 请求失败
}
}
```

# 1. 设备接入SDK概述
## 1.1.  SDK目的与功能
机智云的设备接入SDK（以下简称SDK）封装了手机（包括PAD等设备）与机智云智能硬件的通讯过程，以及手机与云端的通讯过程。这些过程包括配置入网、发现、连接、控制、心跳、状态上报、报警通知等。使用SDK，可以使得开发者快速完成APP开发，开发者仅需关注APP的UI和UE设计即可，而相对复杂的协议与错误处理等事项可忽略。 

相比之下，SDK在新接口定义上做了进一步的简化，使用流程更加简单了。APP已经完全不需要了解设备连接方面的概念，可以更专注于APP用户体验的优化设计。
## 1.2. 机智云物联方案概况

## 1.3.  找到最合适的SDK
机智云目前提供3套SDK：iOS平台原生SDK、Android平台原生SDK、APICloud跨平台SDK。开发者可以根据项目需要自行选择，其中APICloud版本SDK可以用H5技术一次开发，同时适配iOS和Android两个平台，具体内容请参考：《APICloud SDK 集成指南》。
## 1.4.  相关名词定义
### 1.4.1.   GAgent
全称Gizwits Agent，运行于Wi-Fi模块中，设备通过GAgent接入机智云服务器。 目前已兼容国内主流的Wi-Fi模块， 开发者也可以通过获取GAgent二次开发包实现自定义的模块接入机智云。
### 1.4.2.   小循环
智能设备与手机、智能设备与智能设备之间，通过连接同一个路由器实现局域网内部的通信（查看状态或控制），我们称之为小循环。
### 1.4.3.   大循环
智能设备通过路由器或直接接入互联网以实现用户的远程监测与控制，我们称为大循环。
### 1.4.4.   ProductKey
产品标识码，开发者通过机智云后台创建新产品后，自动生成的一个32位字符串。在机智云的数据库中是一个唯一的号码，开发者完成开发写入设备主控MCU后，机智云通过此标识码对设备进行识别并自动完成注册。
### 1.4.5.   DID
设备号，当一个设备初次接入机智云时，机智云自动根据ProductKey以及设备Wi-Fi模块MAC地址为此设备注册一个did，此did全网唯一，用于与用户的绑定及后续操作。
### 1.4.6.   PassCode
设备通行证，用于校验用户的绑定/控制权限。当用户发起设备绑定时，只要是合法操作即可拿到此通行证，通过此通行证绑定设备并对设备进行有效期内的查看、控制等操作。GAgent首次运行时生成随机数作为设备通行证，生成后保存在非易失性存储器上。设备上线时需要上报给服务器。
### 1.4.7.   AppID
应用标识码，当开发者需要为一款智能产品开发应用（包括iOS、Android、Web应用等）时，后台会自动生成一个AppID，并与此设备进行关联。应用开发时需要填入此AppID。
### 1.4.8. Onboarding

也叫配置入网，用户将一款基于Wi-Fi的物联网设备配置连接上路由器的过程称为Onboarding。新设备第一次使用时需要知道路由器的账号和密码，以通过路由器连接互联网。由于大多数的物联网设备没有自带的屏幕和键盘，所以需要通过智能手机向设备发送路由器的SSID和密码，这个过程机智云称为Onboarding。机智云提供的Wi-Fi设备接入SDK中已经内置了此配置的功能。

### 1.4.9. AirLink

机智云对各种SmartConfig、SmartLink这种UDP广播报方式对设备配置入网的技术统称，兼容了多个Wi-Fi模块厂商的配置协议，总结了一套良好用户体验的标准Onboarding操作流程，机智云的Wi-Fi 设备接入SDK已经内置AirLink技术。

### 1.4.10. SoftAP

由于目前各个Wi-Fi模块厂商的Smart Config协议均未完全成熟，也不支持5G路由器信号。机智云在提供了AirLink配置模式的同时也支持SoftAP模式配置设备接入路由器。当设备进入SoftAP配置模式时，设备本身将成为一个AP，智能手机可直接与设备进行连接，然后在手机上的界面上输入路由器的SSID和密码，设备接收到信息的时候会自动尝试连接路由器，连接成功则自动切换到正常使用的模式。
## 1.5. 集成准备

### 1.5.1. 注册机智云账号

在使用机智云服务前，你需要通过site.gizwits.com 
注册一个开发者账号。请完整填写你的注册信息。 
此部分请参考《快速入门》。

### 1.5.2. 新建设备接入

此部分请参考《快速入门》。

### 1.5.3. 获得 app ID 和产品标识码（productkey）

此部分请参考《快速入门》。

### 1.5.4. 下载SDK

### 1.5.5. 导入SDK

第一步，双击解开压缩包 GizWifiSDK-iOS-xxx.zip。 
第二步，将解压后的文件添加到指定的工程中： 
第三步，下载并添加依赖库OpenSSL。下载完成双击解压后，将lib-ios拷贝到项目目录，并添加到指定的工程中。 
第四步，如果使用的是Xcode7.2以下版本，需要添加AudioToolbox、SystemConfiguration、CoreTelephony库。
第五步，一定要记得在Info.plist设置支持ATS特性，否则iOS9下某些功能无法正常使用
最后，确保工程里面有这些链接库，SDK就添加完成了:
# 2. SDK流程简介

## 2.1. 通用流程图
## 2.2. 关键点说明
1)  SDK已经封装了所有的用户、配置、发现、连接、控制的过程，开发者使用这些API可以完成上述流程中的功能开发，不需要再自行实现通讯协议。 
2)  SDK采取回调的工作方式，所以必须设置必要的委托，比如通用委托和设备委托，具体请参见流程详解。SDK在主线程中给APP回调。
# 3. SDK流程详解

## 3.1. 初始化部分

### 3.1.1.   初始化部分流程图
### 3.1.2.   引用头文件

```
import <GizWifiSDK/GizWifiSDK.h>
```

### 3.1.3.   设置SDK通用委托
注册SDK通用委托是为了能让APP收到来自GizWifiSDK类的响应事件，包含了注册、登录、配置设备、绑定设备等回调接口。这是SDK使用中十分重要的一个委托，与GizWifiSDK类相关的操作都会在这里会回调。如果没有正确注册通用委托，将无法正常使用SDK。注册委托时，APP可以根据自己的需求实现回调接口。

### 3.1.4.   初始化SDK

SDK启动前，任何功能都是无法正常使用的。SDK启动时，会进行SDK初始化，并自动发现当前局域网设备。SDK将通过通用委托，上报已发现的设备以及相应的事件。APP可以先设置SDK的通用委托，再启动SDK，以便处理这些事件通知。 
SDK启动时需要指定应用程序的AppID，开发者需要先在机智云网站上为自己的APP申请一个AppID，请在应用的AppDelegate中调用该方法指定应用的AppID。该方法只需要调用一次。 

SDK的日志可以帮助开发者发现APP运行时发生的问题。SDK默认将所有日志信息输出到调试终端和日志文件中，日志文件保存在应用程序的Documents\GizWifiSDK\GizSDKLog目录下。APP如果不希望在调试终端输出日志，可以通过日志级别设置接口，把日志输出级别修改为GizLogPrintNone。 

【示例代码】

```
[GizWifiSDK shareInstance].delegate = self;
[GizWifiSDK startWithAppID:@"your_app_id"];
// 实现系统事件通知回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didNotifyEvent:(GizEventType)eventType eventSource:(id)eventSource eventID:(GizWifiErrorCode)eventID eventMessage: (NSString *)eventMessage {if(eventType == GizEventSDK)
- {
 // SDK发生异常的通知
 NSLog(@"SDK event happened: [%@] = %@", @(eventID), eventMessage);
 }
 else if(eventType == GizEventDevice) 
 {
// 设备连接断开时可能产生的通知
GizWifiDevice* mDevice = (GizWifiDevice*)eventSource;
NSLog(@"device mac %@ disconnect caused by %@", mDevice.macAddress, eventMessage);
} 
else if(eventType == GizEventM2MService) 
{
    // M2M服务返回的异常通知
 NSLog(@"M2M domain %@ exception happened: [%@] = %@", (NSString*)eventSource, @(eventID), eventMessage);
 } 
 else if(eventType == GizEventToken)
 {
// token失效通知
NSLog(@"token %@ expired: %@", (NSString*)eventSource, eventMessage);
}
```




## 3.2.  用户部分
机智云的用户系统包含了用户的注册、登录、重置密码、修改个人信息等功能，机智云以APPID区分用户系统，不同APPID的用户系统相互独立。更换APPID后，需要重新注册用户。 
以下流程中涉及到的监听器注册方法是用子类继承基类的方式实现的。

### 3.2.1. 用户部分主要流程图
用户的注册方式有多种，比如手机号、普通用户名、邮箱等，APP可以根据需要采取不同的方式。其他流程比如登录、密码修改、个人信息修改等部分，请直接阅读下面的流程文档。

### 3.2.2. 用户注册

机智云提供三种用户注册方式：手机注册、普通用户注册、邮箱注册。

#### 3.2.2.1. 注册手机用户

通过手机注册账号，需要一个有效的手机号。注册时需要两步操作：获取短信验证码、用短信验证码注册用户。 
第一步：获取短信验证码。SDK向云端发送短信验证码请求，如果请求成功，云端会给手机发送短信验证码。 
【示例代码】

```
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] requestSendPhoneSMSCode:@"your_app_secret" phone:@"your_phone_number"];
// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didRequestSendPhoneSMSCode:(NSError *)result token:(NSString *)token {
if(result.code == GIZ_SDK_SUCCESS) {
        // 请求成功
} else {
        // 请求失败
}
}
```

# 1. 设备接入SDK概述
## 1.1.  SDK目的与功能
机智云的设备接入SDK（以下简称SDK）封装了手机（包括PAD等设备）与机智云智能硬件的通讯过程，以及手机与云端的通讯过程。这些过程包括配置入网、发现、连接、控制、心跳、状态上报、报警通知等。使用SDK，可以使得开发者快速完成APP开发，开发者仅需关注APP的UI和UE设计即可，而相对复杂的协议与错误处理等事项可忽略。 

相比之下，SDK在新接口定义上做了进一步的简化，使用流程更加简单了。APP已经完全不需要了解设备连接方面的概念，可以更专注于APP用户体验的优化设计。
## 1.2. 机智云物联方案概况

## 1.3.  找到最合适的SDK
机智云目前提供3套SDK：iOS平台原生SDK、Android平台原生SDK、APICloud跨平台SDK。开发者可以根据项目需要自行选择，其中APICloud版本SDK可以用H5技术一次开发，同时适配iOS和Android两个平台，具体内容请参考：《APICloud SDK 集成指南》。
## 1.4.  相关名词定义
### 1.4.1.   GAgent
全称Gizwits Agent，运行于Wi-Fi模块中，设备通过GAgent接入机智云服务器。 目前已兼容国内主流的Wi-Fi模块， 开发者也可以通过获取GAgent二次开发包实现自定义的模块接入机智云。
### 1.4.2.   小循环
智能设备与手机、智能设备与智能设备之间，通过连接同一个路由器实现局域网内部的通信（查看状态或控制），我们称之为小循环。
### 1.4.3.   大循环
智能设备通过路由器或直接接入互联网以实现用户的远程监测与控制，我们称为大循环。
### 1.4.4.   ProductKey
产品标识码，开发者通过机智云后台创建新产品后，自动生成的一个32位字符串。在机智云的数据库中是一个唯一的号码，开发者完成开发写入设备主控MCU后，机智云通过此标识码对设备进行识别并自动完成注册。
### 1.4.5.   DID
设备号，当一个设备初次接入机智云时，机智云自动根据ProductKey以及设备Wi-Fi模块MAC地址为此设备注册一个did，此did全网唯一，用于与用户的绑定及后续操作。
### 1.4.6.   PassCode
设备通行证，用于校验用户的绑定/控制权限。当用户发起设备绑定时，只要是合法操作即可拿到此通行证，通过此通行证绑定设备并对设备进行有效期内的查看、控制等操作。GAgent首次运行时生成随机数作为设备通行证，生成后保存在非易失性存储器上。设备上线时需要上报给服务器。
### 1.4.7.   AppID
应用标识码，当开发者需要为一款智能产品开发应用（包括iOS、Android、Web应用等）时，后台会自动生成一个AppID，并与此设备进行关联。应用开发时需要填入此AppID。
### 1.4.8. Onboarding

也叫配置入网，用户将一款基于Wi-Fi的物联网设备配置连接上路由器的过程称为Onboarding。新设备第一次使用时需要知道路由器的账号和密码，以通过路由器连接互联网。由于大多数的物联网设备没有自带的屏幕和键盘，所以需要通过智能手机向设备发送路由器的SSID和密码，这个过程机智云称为Onboarding。机智云提供的Wi-Fi设备接入SDK中已经内置了此配置的功能。

### 1.4.9. AirLink

机智云对各种SmartConfig、SmartLink这种UDP广播报方式对设备配置入网的技术统称，兼容了多个Wi-Fi模块厂商的配置协议，总结了一套良好用户体验的标准Onboarding操作流程，机智云的Wi-Fi 设备接入SDK已经内置AirLink技术。

### 1.4.10. SoftAP

由于目前各个Wi-Fi模块厂商的Smart Config协议均未完全成熟，也不支持5G路由器信号。机智云在提供了AirLink配置模式的同时也支持SoftAP模式配置设备接入路由器。当设备进入SoftAP配置模式时，设备本身将成为一个AP，智能手机可直接与设备进行连接，然后在手机上的界面上输入路由器的SSID和密码，设备接收到信息的时候会自动尝试连接路由器，连接成功则自动切换到正常使用的模式。
## 1.5. 集成准备

### 1.5.1. 注册机智云账号

在使用机智云服务前，你需要通过site.gizwits.com 
注册一个开发者账号。请完整填写你的注册信息。 
此部分请参考《快速入门》。

### 1.5.2. 新建设备接入

此部分请参考《快速入门》。

### 1.5.3. 获得 app ID 和产品标识码（productkey）

此部分请参考《快速入门》。

### 1.5.4. 下载SDK

### 1.5.5. 导入SDK

第一步，双击解开压缩包 GizWifiSDK-iOS-xxx.zip。 
第二步，将解压后的文件添加到指定的工程中： 
第三步，下载并添加依赖库OpenSSL。下载完成双击解压后，将lib-ios拷贝到项目目录，并添加到指定的工程中。 
第四步，如果使用的是Xcode7.2以下版本，需要添加AudioToolbox、SystemConfiguration、CoreTelephony库。
第五步，一定要记得在Info.plist设置支持ATS特性，否则iOS9下某些功能无法正常使用
最后，确保工程里面有这些链接库，SDK就添加完成了:
# 2. SDK流程简介

## 2.1. 通用流程图
## 2.2. 关键点说明
1)  SDK已经封装了所有的用户、配置、发现、连接、控制的过程，开发者使用这些API可以完成上述流程中的功能开发，不需要再自行实现通讯协议。 
2)  SDK采取回调的工作方式，所以必须设置必要的委托，比如通用委托和设备委托，具体请参见流程详解。SDK在主线程中给APP回调。
# 3. SDK流程详解

## 3.1. 初始化部分

### 3.1.1.   初始化部分流程图
### 3.1.2.   引用头文件

```
import <GizWifiSDK/GizWifiSDK.h>
```

### 3.1.3.   设置SDK通用委托
注册SDK通用委托是为了能让APP收到来自GizWifiSDK类的响应事件，包含了注册、登录、配置设备、绑定设备等回调接口。这是SDK使用中十分重要的一个委托，与GizWifiSDK类相关的操作都会在这里会回调。如果没有正确注册通用委托，将无法正常使用SDK。注册委托时，APP可以根据自己的需求实现回调接口。

### 3.1.4.   初始化SDK

SDK启动前，任何功能都是无法正常使用的。SDK启动时，会进行SDK初始化，并自动发现当前局域网设备。SDK将通过通用委托，上报已发现的设备以及相应的事件。APP可以先设置SDK的通用委托，再启动SDK，以便处理这些事件通知。 
SDK启动时需要指定应用程序的AppID，开发者需要先在机智云网站上为自己的APP申请一个AppID，请在应用的AppDelegate中调用该方法指定应用的AppID。该方法只需要调用一次。 

SDK的日志可以帮助开发者发现APP运行时发生的问题。SDK默认将所有日志信息输出到调试终端和日志文件中，日志文件保存在应用程序的Documents\GizWifiSDK\GizSDKLog目录下。APP如果不希望在调试终端输出日志，可以通过日志级别设置接口，把日志输出级别修改为GizLogPrintNone。 

【示例代码】

```
[GizWifiSDK shareInstance].delegate = self;
[GizWifiSDK startWithAppID:@"your_app_id"];
// 实现系统事件通知回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didNotifyEvent:(GizEventType)eventType eventSource:(id)eventSource eventID:(GizWifiErrorCode)eventID eventMessage: (NSString *)eventMessage {if(eventType == GizEventSDK)
- {
 // SDK发生异常的通知
 NSLog(@"SDK event happened: [%@] = %@", @(eventID), eventMessage);
 }
 else if(eventType == GizEventDevice) 
 {
// 设备连接断开时可能产生的通知
GizWifiDevice* mDevice = (GizWifiDevice*)eventSource;
NSLog(@"device mac %@ disconnect caused by %@", mDevice.macAddress, eventMessage);
} 
else if(eventType == GizEventM2MService) 
{
    // M2M服务返回的异常通知
 NSLog(@"M2M domain %@ exception happened: [%@] = %@", (NSString*)eventSource, @(eventID), eventMessage);
 } 
 else if(eventType == GizEventToken)
 {
// token失效通知
NSLog(@"token %@ expired: %@", (NSString*)eventSource, eventMessage);
}
```




## 3.2.  用户部分
机智云的用户系统包含了用户的注册、登录、重置密码、修改个人信息等功能，机智云以APPID区分用户系统，不同APPID的用户系统相互独立。更换APPID后，需要重新注册用户。 
以下流程中涉及到的监听器注册方法是用子类继承基类的方式实现的。

### 3.2.1. 用户部分主要流程图
用户的注册方式有多种，比如手机号、普通用户名、邮箱等，APP可以根据需要采取不同的方式。其他流程比如登录、密码修改、个人信息修改等部分，请直接阅读下面的流程文档。

### 3.2.2. 用户注册

机智云提供三种用户注册方式：手机注册、普通用户注册、邮箱注册。

#### 3.2.2.1. 注册手机用户

通过手机注册账号，需要一个有效的手机号。注册时需要两步操作：获取短信验证码、用短信验证码注册用户。 
第一步：获取短信验证码。SDK向云端发送短信验证码请求，如果请求成功，云端会给手机发送短信验证码。 
【示例代码】

```
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] requestSendPhoneSMSCode:@"your_app_secret" phone:@"your_phone_number"];
// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didRequestSendPhoneSMSCode:(NSError *)result token:(NSString *)token {
if(result.code == GIZ_SDK_SUCCESS) {
        // 请求成功
} else {
        // 请求失败
}
}
```

# 1. 设备接入SDK概述
## 1.1.  SDK目的与功能
机智云的设备接入SDK（以下简称SDK）封装了手机（包括PAD等设备）与机智云智能硬件的通讯过程，以及手机与云端的通讯过程。这些过程包括配置入网、发现、连接、控制、心跳、状态上报、报警通知等。使用SDK，可以使得开发者快速完成APP开发，开发者仅需关注APP的UI和UE设计即可，而相对复杂的协议与错误处理等事项可忽略。 

相比之下，SDK在新接口定义上做了进一步的简化，使用流程更加简单了。APP已经完全不需要了解设备连接方面的概念，可以更专注于APP用户体验的优化设计。
## 1.2. 机智云物联方案概况

## 1.3.  找到最合适的SDK
机智云目前提供3套SDK：iOS平台原生SDK、Android平台原生SDK、APICloud跨平台SDK。开发者可以根据项目需要自行选择，其中APICloud版本SDK可以用H5技术一次开发，同时适配iOS和Android两个平台，具体内容请参考：《APICloud SDK 集成指南》。
## 1.4.  相关名词定义
### 1.4.1.   GAgent
全称Gizwits Agent，运行于Wi-Fi模块中，设备通过GAgent接入机智云服务器。 目前已兼容国内主流的Wi-Fi模块， 开发者也可以通过获取GAgent二次开发包实现自定义的模块接入机智云。
### 1.4.2.   小循环
智能设备与手机、智能设备与智能设备之间，通过连接同一个路由器实现局域网内部的通信（查看状态或控制），我们称之为小循环。
### 1.4.3.   大循环
智能设备通过路由器或直接接入互联网以实现用户的远程监测与控制，我们称为大循环。
### 1.4.4.   ProductKey
产品标识码，开发者通过机智云后台创建新产品后，自动生成的一个32位字符串。在机智云的数据库中是一个唯一的号码，开发者完成开发写入设备主控MCU后，机智云通过此标识码对设备进行识别并自动完成注册。
### 1.4.5.   DID
设备号，当一个设备初次接入机智云时，机智云自动根据ProductKey以及设备Wi-Fi模块MAC地址为此设备注册一个did，此did全网唯一，用于与用户的绑定及后续操作。
### 1.4.6.   PassCode
设备通行证，用于校验用户的绑定/控制权限。当用户发起设备绑定时，只要是合法操作即可拿到此通行证，通过此通行证绑定设备并对设备进行有效期内的查看、控制等操作。GAgent首次运行时生成随机数作为设备通行证，生成后保存在非易失性存储器上。设备上线时需要上报给服务器。
### 1.4.7.   AppID
应用标识码，当开发者需要为一款智能产品开发应用（包括iOS、Android、Web应用等）时，后台会自动生成一个AppID，并与此设备进行关联。应用开发时需要填入此AppID。
### 1.4.8. Onboarding

也叫配置入网，用户将一款基于Wi-Fi的物联网设备配置连接上路由器的过程称为Onboarding。新设备第一次使用时需要知道路由器的账号和密码，以通过路由器连接互联网。由于大多数的物联网设备没有自带的屏幕和键盘，所以需要通过智能手机向设备发送路由器的SSID和密码，这个过程机智云称为Onboarding。机智云提供的Wi-Fi设备接入SDK中已经内置了此配置的功能。

### 1.4.9. AirLink

机智云对各种SmartConfig、SmartLink这种UDP广播报方式对设备配置入网的技术统称，兼容了多个Wi-Fi模块厂商的配置协议，总结了一套良好用户体验的标准Onboarding操作流程，机智云的Wi-Fi 设备接入SDK已经内置AirLink技术。

### 1.4.10. SoftAP

由于目前各个Wi-Fi模块厂商的Smart Config协议均未完全成熟，也不支持5G路由器信号。机智云在提供了AirLink配置模式的同时也支持SoftAP模式配置设备接入路由器。当设备进入SoftAP配置模式时，设备本身将成为一个AP，智能手机可直接与设备进行连接，然后在手机上的界面上输入路由器的SSID和密码，设备接收到信息的时候会自动尝试连接路由器，连接成功则自动切换到正常使用的模式。
## 1.5. 集成准备

### 1.5.1. 注册机智云账号

在使用机智云服务前，你需要通过site.gizwits.com 
注册一个开发者账号。请完整填写你的注册信息。 
此部分请参考《快速入门》。

### 1.5.2. 新建设备接入

此部分请参考《快速入门》。

### 1.5.3. 获得 app ID 和产品标识码（productkey）

此部分请参考《快速入门》。

### 1.5.4. 下载SDK

### 1.5.5. 导入SDK

第一步，双击解开压缩包 GizWifiSDK-iOS-xxx.zip。 
第二步，将解压后的文件添加到指定的工程中： 
第三步，下载并添加依赖库OpenSSL。下载完成双击解压后，将lib-ios拷贝到项目目录，并添加到指定的工程中。 
第四步，如果使用的是Xcode7.2以下版本，需要添加AudioToolbox、SystemConfiguration、CoreTelephony库。
第五步，一定要记得在Info.plist设置支持ATS特性，否则iOS9下某些功能无法正常使用
最后，确保工程里面有这些链接库，SDK就添加完成了:
# 2. SDK流程简介

## 2.1. 通用流程图
## 2.2. 关键点说明
1)  SDK已经封装了所有的用户、配置、发现、连接、控制的过程，开发者使用这些API可以完成上述流程中的功能开发，不需要再自行实现通讯协议。 
2)  SDK采取回调的工作方式，所以必须设置必要的委托，比如通用委托和设备委托，具体请参见流程详解。SDK在主线程中给APP回调。
# 3. SDK流程详解

## 3.1. 初始化部分

### 3.1.1.   初始化部分流程图
### 3.1.2.   引用头文件

```
import <GizWifiSDK/GizWifiSDK.h>
```

### 3.1.3.   设置SDK通用委托
注册SDK通用委托是为了能让APP收到来自GizWifiSDK类的响应事件，包含了注册、登录、配置设备、绑定设备等回调接口。这是SDK使用中十分重要的一个委托，与GizWifiSDK类相关的操作都会在这里会回调。如果没有正确注册通用委托，将无法正常使用SDK。注册委托时，APP可以根据自己的需求实现回调接口。

### 3.1.4.   初始化SDK

SDK启动前，任何功能都是无法正常使用的。SDK启动时，会进行SDK初始化，并自动发现当前局域网设备。SDK将通过通用委托，上报已发现的设备以及相应的事件。APP可以先设置SDK的通用委托，再启动SDK，以便处理这些事件通知。 
SDK启动时需要指定应用程序的AppID，开发者需要先在机智云网站上为自己的APP申请一个AppID，请在应用的AppDelegate中调用该方法指定应用的AppID。该方法只需要调用一次。 

SDK的日志可以帮助开发者发现APP运行时发生的问题。SDK默认将所有日志信息输出到调试终端和日志文件中，日志文件保存在应用程序的Documents\GizWifiSDK\GizSDKLog目录下。APP如果不希望在调试终端输出日志，可以通过日志级别设置接口，把日志输出级别修改为GizLogPrintNone。 

【示例代码】

```
[GizWifiSDK shareInstance].delegate = self;
[GizWifiSDK startWithAppID:@"your_app_id"];
// 实现系统事件通知回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didNotifyEvent:(GizEventType)eventType eventSource:(id)eventSource eventID:(GizWifiErrorCode)eventID eventMessage: (NSString *)eventMessage {if(eventType == GizEventSDK)
- {
 // SDK发生异常的通知
 NSLog(@"SDK event happened: [%@] = %@", @(eventID), eventMessage);
 }
 else if(eventType == GizEventDevice) 
 {
// 设备连接断开时可能产生的通知
GizWifiDevice* mDevice = (GizWifiDevice*)eventSource;
NSLog(@"device mac %@ disconnect caused by %@", mDevice.macAddress, eventMessage);
} 
else if(eventType == GizEventM2MService) 
{
    // M2M服务返回的异常通知
 NSLog(@"M2M domain %@ exception happened: [%@] = %@", (NSString*)eventSource, @(eventID), eventMessage);
 } 
 else if(eventType == GizEventToken)
 {
// token失效通知
NSLog(@"token %@ expired: %@", (NSString*)eventSource, eventMessage);
}
```




## 3.2.  用户部分
机智云的用户系统包含了用户的注册、登录、重置密码、修改个人信息等功能，机智云以APPID区分用户系统，不同APPID的用户系统相互独立。更换APPID后，需要重新注册用户。 
以下流程中涉及到的监听器注册方法是用子类继承基类的方式实现的。

### 3.2.1. 用户部分主要流程图
用户的注册方式有多种，比如手机号、普通用户名、邮箱等，APP可以根据需要采取不同的方式。其他流程比如登录、密码修改、个人信息修改等部分，请直接阅读下面的流程文档。

### 3.2.2. 用户注册

机智云提供三种用户注册方式：手机注册、普通用户注册、邮箱注册。

#### 3.2.2.1. 注册手机用户

通过手机注册账号，需要一个有效的手机号。注册时需要两步操作：获取短信验证码、用短信验证码注册用户。 
第一步：获取短信验证码。SDK向云端发送短信验证码请求，如果请求成功，云端会给手机发送短信验证码。 
【示例代码】

```
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] requestSendPhoneSMSCode:@"your_app_secret" phone:@"your_phone_number"];
// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didRequestSendPhoneSMSCode:(NSError *)result token:(NSString *)token {
if(result.code == GIZ_SDK_SUCCESS) {
        // 请求成功
} else {
        // 请求失败
}
}
```

First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column
