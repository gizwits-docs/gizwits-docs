title: iOS SDK 2.0集成指南
---

# SDK_API参考手册
附件：[iOS_SDK2.0_API参考手册](/assets/pdf/iOS_SDK2.0_API参考手册.pdf)
# 设备接入SDK概述
## 1.	SDK目的与功能
机智云的设备接入SDK（以下简称SDK）封装了手机（包括PAD等设备）与机智云智能硬件的通讯过程，以及手机与云端的通讯过程。这些过程包括配置入网、发现、连接、控制、心跳、状态上报、报警通知等。使用SDK，可以使得开发者快速完成APP开发，开发者仅需关注APP的UI和UE设计即可，而相对复杂的协议与错误处理等事项可忽略。
相比之下，SDK在新接口定义上做了进一步的简化，使用流程更加简单了。APP已经完全不需要了解设备连接方面的概念，可以更专注于APP用户体验的优化设计。

## 2.	机智云物联方案概况
![Alt text](/assets/zh-cn/AppDev/iOSSDK/image1.png)
 
## 3.	找到最合适的SDK
机智云目前提供3套SDK：iOS平台原生SDK、Android平台原生SDK、APICloud跨平台SDK。开发者可以根据项目需要自行选择，其中APICloud版本SDK可以用H5技术一次开发，同时适配iOS和Android两个平台，具体内容请参考：《APICloud SDK 集成指南》。
## 4.	相关名词定义
### 4.1.	GAgent
全称Gizwits Agent，运行于Wi-Fi模块中，设备通过GAgent接入机智云服务器。 目前已兼容国内主流的Wi-Fi模块， 开发者也可以通过获取GAgent二次开发包实现自定义的模块接入机智云。
### 4.2.	小循环
智能设备与手机、智能设备与智能设备之间，通过连接同一个路由器实现局域网内部的通信（查看状态或控制），我们称之为小循环。
### 4.3.	大循环
智能设备通过路由器或直接接入互联网以实现用户的远程监测与控制，我们称为大循环。
### 4.4.	ProductKey
产品标识码，开发者通过机智云后台创建新产品后，自动生成的一个32位字符串。在机智云的数据库中是一个唯一的号码，开发者完成开发写入设备主控MCU后，机智云通过此标识码对设备进行识别并自动完成注册。
### 4.5.	DID
设备号，当一个设备初次接入机智云时，机智云自动根据ProductKey以及设备Wi-Fi模块MAC地址为此设备注册一个did，此did全网唯一，用于与用户的绑定及后续操作。
### 4.6.	PassCode
设备通行证，用于校验用户的绑定/控制权限。当用户发起设备绑定时，只要是合法操作即可拿到此通行证，通过此通行证绑定设备并对设备进行有效期内的查看、控制等操作。GAgent首次运行时生成随机数作为设备通行证，生成后保存在非易失性存储器上。设备上线时需要上报给服务器。
### 4.7.	AppID
应用标识码，当开发者需要为一款智能产品开发应用（包括iOS、Android、Web应用等）时，后台会自动生成一个AppID，并与此设备进行关联。应用开发时需要填入此AppID。
### 4.8.	Onboarding
也叫配置入网，用户将一款基于Wi-Fi的物联网设备配置连接上路由器的过程称为Onboarding。新设备第一次使用时需要知道路由器的账号和密码，以通过路由器连接互联网。由于大多数的物联网设备没有自带的屏幕和键盘，所以需要通过智能手机向设备发送路由器的SSID和密码，这个过程机智云称为Onboarding。机智云提供的Wi-Fi设备接入SDK中已经内置了此配置的功能。
### 4.9.	AirLink
机智云对各种SmartConfig、SmartLink这种UDP广播报方式对设备配置入网的技术统称，兼容了多个Wi-Fi模块厂商的配置协议，总结了一套良好用户体验的标准Onboarding操作流程，机智云的Wi-Fi 设备接入SDK已经内置AirLink技术。
### 4.10.	SoftAP
由于目前各个Wi-Fi模块厂商的Smart Config协议均未完全成熟，也不支持5G路由器信号。机智云在提供了AirLink配置模式的同时也支持SoftAP模式配置设备接入路由器。当设备进入SoftAP配置模式时，设备本身将成为一个AP，智能手机可直接与设备进行连接，然后在手机上的界面上输入路由器的SSID和密码，设备接收到信息的时候会自动尝试连接路由器，连接成功则自动切换到正常使用的模式。
## 5.	集成准备
### 5.1.	注册机智云账号
在使用机智云服务前，你需要通过site.gizwits.com
注册一个开发者账号。请完整填写你的注册信息。
此部分请参考《快速入门》。
### 5.2.	新建设备接入
此部分请参考《快速入门》。
### 5.3.	获得 app ID 和产品标识码（productkey）
此部分请参考《快速入门》。
### 5.4.	下载SDK
 ![Alt text](/assets/zh-cn/AppDev/iOSSDK/image2.png)

### 5.5.	导入SDK
首先双击解开压缩包 GizWifiSDK-iOS-xxx.zip。按照App开发的需要，可以选择使用动态库或者静态库。以下分别为动态库和静态库的加载方式：

5.5.1.	导入动态SDK

动态库在解压后的DynamicLibrary目录下。动态库加载请注意按照下图进行设置，否则应用运行后会立即崩溃：
![Alt text](/assets/zh-cn/AppDev/iOSSDK/image13.JPG)

5.5.2.	导入静态SDK

第一步，解压后，将StaticLibrary目录下的文件添加到指定的工程中：
![Alt text](/assets/zh-cn/AppDev/iOSSDK/image3.png)
  
第二步，下载并添加依赖库OpenSSL。下载完成双击解压后，将lib-ios拷贝到项目目录，并添加到指定的工程中。
![Alt text](/assets/zh-cn/AppDev/iOSSDK/image4.png)

![Alt text](/assets/zh-cn/AppDev/iOSSDK/image5.png)
  
第三步，如果使用的是Xcode7.2以下版本，需要添加AudioToolbox、SystemConfiguration、CoreTelephony库。
![Alt text](/assets/zh-cn/AppDev/iOSSDK/image6.png)

第四步，一定要记得在Info.plist设置支持ATS特性，否则iOS9下某些功能无法正常使用
![Alt text](/assets/zh-cn/AppDev/iOSSDK/image7.png)

最后，确保工程里面有这些链接库，SDK就添加完成了:
 ![Alt text](/assets/zh-cn/AppDev/iOSSDK/image8.png)


### 5.6.	通过cocoapods使用GizWifiSDK（可选）
第一步：确认本机安装的cocoapods能正常工作

```
pod --help
```

第二步：编辑工程对应的Podfile文件

>  #Uncomment this line to define a global platform for your project  #
> platform :ios, '6.0'
> 
>  #source 'https://github.com/gizwits/PodSpecs.git' 
>  Source ‘https://git.oschina.net/dantang/PodSpecs.git’  
>  #以上两个源选一个即可
> 
> target 'cocoapodsTest' do   pod 'GizWifiSDK', '2.04.04' end

第三步：安装

```
pod install --no-repo-update
```

第四步：打开workspace工程即可


# SDK流程简介
## 1.	通用流程图
 ![Alt text](/assets/zh-cn/AppDev/iOSSDK/image9.png)

## 2.	关键点说明
1)	SDK已经封装了所有的用户、配置、发现、连接、控制的过程，开发者使用这些API可以完成上述流程中的功能开发，不需要再自行实现通讯协议。

2)	SDK采取回调的工作方式，所以必须设置必要的委托，比如通用委托和设备委托，具体请参见流程详解。SDK在主线程中给APP回调。

# SDK流程详解
## 1.	初始化部分
### 1.1.	初始化部分流程图
 ![Alt text](/assets/zh-cn/AppDev/iOSSDK/image10.png)

### 1.2.	引用头文件

```
import <GizWifiSDK/GizWifiSDK.h>
```

### 1.3.	设置SDK通用委托
注册SDK通用委托是为了能让APP收到来自GizWifiSDK类的响应事件，包含了注册、登录、配置设备、绑定设备等回调接口。这是SDK使用中十分重要的一个委托，与GizWifiSDK类相关的操作都会在这里会回调。如果没有正确注册通用委托，将无法正常使用SDK。注册委托时，APP可以根据自己的需求实现回调接口。
### 1.4.	初始化SDK
SDK启动前，任何功能都是无法正常使用的。SDK启动时，会进行SDK初始化，并自动发现当前局域网设备。SDK将通过通用委托，上报已发现的设备以及相应的事件。APP可以先设置SDK的通用委托，再启动SDK，以便处理这些事件通知。

SDK启动时需要指定应用程序的AppID，开发者需要先在机智云网站上为自己的APP申请一个AppID，请在应用的AppDelegate中调用该方法指定应用的AppID。该方法只需要调用一次。

SDK的日志可以帮助开发者发现APP运行时发生的问题。SDK默认将所有日志信息输出到调试终端和日志文件中，日志文件保存在应用程序的Documents\GizWifiSDK\GizSDKLog目录下。APP如果不希望在调试终端输出日志，可以通过日志级别设置接口，把日志输出级别修改为GizLogPrintNone。

【示例代码】

```objectivec
[GizWifiSDK shareInstance].delegate = self;
[GizWifiSDK startWithAppID:@"your_app_id"];


// 实现系统事件通知回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didNotifyEvent:(GizEventType)eventType eventSource:(id)eventSource eventID:(GizWifiErrorCode)eventID eventMessage: (NSString *)eventMessage {
if(eventType == GizEventSDK) {
// SDK发生异常的通知
NSLog(@"SDK event happened: [%@] = %@", @(eventID), eventMessage);
} else if(eventType == GizEventDevice) {
// 设备连接断开时可能产生的通知
GizWifiDevice* mDevice = (GizWifiDevice*)eventSource;
NSLog(@"device mac %@ disconnect caused by %@", mDevice.macAddress, eventMessage);
} else if(eventType == GizEventM2MService) {
// M2M服务返回的异常通知
NSLog(@"M2M domain %@ exception happened: [%@] = %@", (NSString*)eventSource, @(eventID), eventMessage);
} else if(eventType == GizEventToken) {
// token失效通知
NSLog(@"token %@ expired: %@", (NSString*)eventSource, eventMessage);
}
}
```

## 2.	用户部分
机智云的用户系统包含了用户的注册、登录、重置密码、修改个人信息等功能，机智云以APPID区分用户系统，不同APPID的用户系统相互独立。更换APPID后，需要重新注册用户。

以下流程中涉及到的监听器注册方法是用子类继承基类的方式实现的。
### 2.1.	用户部分主要流程图
 
用户的注册方式有多种，比如手机号、普通用户名、邮箱等，APP可以根据需要采取不同的方式。其他流程比如登录、密码修改、个人信息修改等部分，请直接阅读下面的流程文档。
### 2.2.	用户注册
机智云提供三种用户注册方式：手机注册、普通用户注册、邮箱注册。
#### 2.2.1.	注册手机用户
通过手机注册账号，需要一个有效的手机号。注册时需要两步操作：获取短信验证码、用短信验证码注册用户。

第一步：获取短信验证码。SDK向云端发送短信验证码请求，如果请求成功，云端会给手机发送短信验证码。

【示例代码】

```objectivec
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

第二步：用短信验证码注册。APP把手机收到的短信验证码传给SDK，填上手机号和密码就可以注册了。

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] registerUser:@"your_phone_number" password:@"your_password" verifyCode:@"your_verify_code" accountType:GizUserPhone];

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didRegisterUser:(NSError *)result uid:(NSString *)uid token:(NSString *)token {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 注册成功
    } else {
        // 注册失败
    }
}
```

#### 2.2.2.	注册普通用户
注册普通用户，使用用户名、密码即可创建一个账号。

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] registerUser:@"your_user_name" password:@"your_password" verifyCode:nil accountType:GizUserNormal];

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didRegisterUser:(NSError *)result uid:(NSString *)uid token:(NSString *)token {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 注册成功
    } else {
        // 注册失败
    }
}
```

#### 2.2.3.	注册邮箱用户
通过有效的电子邮箱地址，注册一个账号。注册成功后，云端会给指定邮箱发送注册成功的邮件。

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] registerUser:@"your_email_address" password:@"your_password" verifyCode:nil accountType:GizUserEmail];

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didRegisterUser:(NSError *)result uid:(NSString *)uid token:(NSString *)token {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 注册成功
    } else {
        // 注册失败
    }
}
```

### 2.3.	用户登录
机智云提供三种用户登录方式：实名登录、匿名登录、第三方账号登录。实名登录适用于设计了登录界面，必须使用用户名密码注册登录以后才能使用的APP。匿名登录适用于没有设计登录界面，由后台自动生成用户账号的APP。登录后获取到的token有效期为7天。
#### 2.3.1.	实名登录
实名用户登录时，用户名可以是注册过的手机号、邮箱、普通用户名。登录账号要先注册好，如果更换了AppID，登录账号需要重新注册。

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] userLogin:@"your_user_name" password:@"your_user_password"]; 

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didUserLogin:(NSError *)result uid:(NSString *)uid token:(NSString *)token {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 登录成功
    } else {
        // 登录失败
    }
}
```

#### 2.3.2.	匿名登录
用户每次匿名登录时，获取到的uid是相同的。匿名用户登录时，如果账号不存在，系统会根据设备唯一标识码，生成一个匿名账号，并登录该账号。

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] userLoginAnonymous];

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didUserLogin:(NSError *)result uid:(NSString *)uid token:(NSString *)token {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 登录成功
    } else {
        // 登录失败
    }
}
```

#### 2.3.3.	第三方账号登录
目前支持的第三方账号有百度、新浪、腾讯。用户可以使用这三者的API获取到uid和token登录机智云，使用第三方账号登录时无需在机智云上注册，可直接登录。

开发者可通过新浪、百度或腾讯api获取uid和token, 具体方法请参考各第三方平台的开发者文档。也可以使用以下工具获取第三方账号uid、token：

ShareSDK http://mob.com/
BaiduSDK http://developer.baidu.com/wiki/index.php?title=%E5%B8%AE%E5%8A%A9%E6%96%87%E6%A1%A3%E9%A6%96%E9%A1%B5/%E7%99%BE%E5%BA%A6%E5%B8%90%E5%8F%B7%E8%BF%9E%E6%8E%A5

【示例代码】

```objectivec
// 以新浪账号为例
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] userLoginWithThirdAccount:GizThirdSINA uid:@"your_third_uid" token:@"your_third_token"]; 

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didUserLogin:(NSError *)result uid:(NSString *)uid token:(NSString *)token {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 登录成功
    } else {
        // 登录失败
    }
}
```

### 2.4.	重置密码
如果忘记了用户密码，可以通过手机验证码或邮箱设置新的密码。SDK支持手机号重置密码和邮箱重置密码两种，手机号重置需要接收验证码，邮箱重置需要进⼊邮箱，根据链接提示进行重置。
#### 2.4.1.	手机号重置密
手机号重置密码时，需要先获取短信验证码再重置。获取短信验证码方式与手机注册时相同。

第一步：获取短信验证码

【示例代码】

```objectivec
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

第二步：用短信验证码重置密码

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] resetPassword:@"your_phone_number" verifyCode:@"your_verify_code" newPassword:@"your_new_password" accountType:GizUserPhone]; 

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didChangeUserPassword:(NSError *)result {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 修改成功
    } else {
        // 修改失败
    }
}
```

#### 2.4.2.	邮箱重置密码
邮箱重置密码时，云端会给指定邮箱发送安全链接。用户需要到邮箱中查收邮件，并按邮件指示执行重置操作。重置密码邮件有可能进入用户的邮箱的垃圾箱中，需提醒用户。
邮件发送成功回调与密码修改成功回调一致，因此需要注意在回调的时候区分。

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] resetPassword:@"your_email_address" verifyCode:nil newPassword:@"your_new_password" accountType:GizUserEmail]; 

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didChangeUserPassword:(NSError *)result {
    if(result.code == GIZ_SDK_SUCCESS) {
        	//重置密码邮件发送成功，提示用户查收
    } else {
        	//重置密码邮件发送失败，弹出错误信息
    }
}
```

### 2.5.	修改密码
用户登录后可以修改密码。

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] changeUserPassword:@"your_token" oldPassword:@"your_old_password" newPassword:@"your_new_password"]; 

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didChangeUserPassword:(NSError *)result {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 修改成功
    } else {
        // 修改失败
    }
}
```

### 2.6.	匿名用户转换
匿名注册的用户可以转换为普通用户或者手机用户，转换后匿名用户的信息会转移到实名用户下，原匿名账号失效。但普通用户和手机用户必须是还未注册过的，已注册的用户名是无法转换的。
#### 2.6.1.	匿名用户转普通用户
转普通用户时，填入待转换的用户名、密码，以及登录的token就可以了。

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] transAnonymousUser:@"your_token" username:@"your_user_name" password:@"your_password" verifyCode:nil accountType:GizUserNormal]; 

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didTransAnonymousUser:(NSError *)result {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 转换成功
    } else {
        // 转换失败
    }
}
```

#### 2.6.2.	匿名用户转手机用户
转手机用户时，需要填入待转换的手机号、密码、短信验证码，登录的token。获取短信验证码的过程与手机注册时一样。

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] transAnonymousUser:@"your_token" username:@"your_phone_number" password:@"your_password" verifyCode:@"your_verify_code" accountType:GizUserPhone]; 

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didTransAnonymousUser:(NSError *)result {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 转换成功
    } else {
        // 转换失败
    }
}
```

### 2.7.	修改用户信息
实名用户不支持修改普通用户名，可以修改邮箱、手机号，可以补充个人信息。实名用户必须登录后才能修改这些信息，并且待修改的邮箱或手机号必须是已经注册过的。

实名用户修改邮箱或手机号成功后，可以使用修改后的邮箱或手机号登录。登录后获得的绑定设备列表与原实名用户一致。

修改邮箱或手机号时，可以同时补充个人信息。不想修改个人信息时，对应参数可以传nil。同时修改个人信息时，如果邮箱或用户名修改成功而个人信息修改失败，回调会返回成功并在errorMessage中提示个人信息修改失败的原因。

#### 2.7.1.	修改用户邮箱
只修改用户邮箱时，个人信息的参数传nil，用户类型可以指定为邮箱用户。以下为修改用户邮箱的示例代码。

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] changeUserInfo:@"your_token" username:@"your_email_address" SMSVerifyCode:nil userType:GizUserEmail additionalInfo:nil]; 

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didChangeUserInfo:(NSError *)result {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 修改成功
    } else {
        // 修改失败
    }
}
```

#### 2.7.2.	修改用户手机号
只修改用户手机号时，个人信息参数传nil，用户类型可以指定为手机用户。修改手机号之前，需要先获取手机验证码。以下示例代码为修改用户手机号的代码，获取短信验证码的代码请参考手机号注册。

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] changeUserInfo:@"your_token" username:@"your_phone_number" SMSVerifyCode: @"your_verify_code" userType:GizUserPhone additionalInfo:nil]; 

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didChangeUserInfo:(NSError *)result {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 修改成功
    } else {
        // 修改失败
    }
}
```

#### 2.7.3.	修改用户个人信息
只修改用户个人信息时，手机号或邮箱参数传nil，用户类型可以指定为普通用户。个人信息包含多项内容，通过GizUserInfo类指定。其中不想修改的信息填nil，云端会保留上次修改过的值。

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self; 

GizUserInfo* additialInfo = new GizUserInfo();
additialInfo.name = @"nickname";
additialInfo.userGender = GizUserGenderMale;
additialInfo.birthday = @"1990-1-1";
additialInfo.address = @"Beijing";
additialInfo.remark = @"home";

[[GizWifiSDK sharedInstance] changeUserInfo:@"your_token" username:nil SMSVerifyCode:nil userType:GizUserNormal additionalInfo:additialInfo]; 

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didChangeUserInfo:(NSError *)result {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 修改成功
    } else {
        // 修改失败
    }
}
```

#### 2.7.4.	同时修改邮箱和个人信息
修改邮箱同时修改个人信息时，用户类型需指定为邮箱用户。

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self; 

GizUserInfo* additialInfo = new GizUserInfo();
additialInfo.name = @"nickname";
additialInfo.userGender = GizUserGenderMale;
additialInfo.birthday = @"1990-1-1";
additialInfo.address = @"Beijing";
additialInfo.remark = @"home";

[[GizWifiSDK sharedInstance] changeUserInfo:@"your_token" username:nil SMSVerifyCode:nil userType:GizUserEmail additionalInfo:additialInfo]; 

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didChangeUserInfo:(NSError *)result {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 修改成功
    } else {
        // 修改失败
    }
}
```

#### 2.7.5.	同时修改手机号和个人信息
修改手机号同时修改个人信息时，用户类型需指定为手机用户。修改手机号同样需要先获取手机验证码，获取短信验证码的代码请参考手机号注册。

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self; 

GizUserInfo* additialInfo = new GizUserInfo();
additialInfo.name = @"nickname";
additialInfo.userGender = GizUserGenderMale;
additialInfo.birthday = @"1990-1-1";
additialInfo.address = @"Beijing";
additialInfo.remark = @"home";

[[GizWifiSDK sharedInstance] changeUserInfo:@"your_token" username:@"your_phone_number" SMSVerifyCode: @"your_verify_code" userType:GizUserPhone additionalInfo:nil];

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didChangeUserInfo:(NSError *)result {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 修改成功
    } else {
        // 修改失败
    }
}
```

## 3.	配置设备入网部分
控制设备前，需要先让设备连到路由器上。连上路由器的设备，如果路由器能接入外网，设备会自动注册到机智云。

有两种配置方式能够让设备连到路由器上，一种是Airlink方式，一种是Softap方式，APP可以根据产品需求采取相应的配置方式。在开始配置前，设备要先进入配置模式，然后APP调用配置接口发送要配置的路由器ssid和密码。设备配置成功后，SDK给APP返回已配置成功的设备mac地址和产品类型标识，便于APP做下一步的操作。如果设备是重置后进入的配置模式，如果配置成功时设备还来不及从云端获取到DID，则APP得到的DID为空。

SDK的设备配置接口如果超时时间还未结束，无法进行下一次配置。此外，因为设备配置成功的广播包只有APP连到同一路由上才能收取，因此这个超时时间应该预留出APP连接到路由器的时间。

需要注意的是，如果配置上线的设备不是APP要获取的产品类型，该设备就不会出现在设备列表中。

### 3.1.	设备配置流程图
 ![Alt text](/assets/zh-cn/AppDev/iOSSDK/image11.png)

### 3.2.	AirLink配置
AirLink使⽤UDP广播方式，由手机端发出含有目标路由器名称和密码的广播，设备上的Wifi模块接收到广播包后自动连接目标路由器，连上路由器后发出配置成功广播，通知手机配置已完成。

模块开启AirLink模式后，如果一分钟内未收到AirLink广播或无法正确连上路由器，将进入SoftAP模式。

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] setDeviceOnboarding:@"your_ssid" key:@"your_key" mode:GizWifiAirLink softAPSSIDPrefix:nil timeout:60 wifiGAgentType:[NSArray arrayWithObjects: @(GizGAgentESP), nil]];

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didSetDeviceOnboarding:(NSError *)result mac:(NSString *)mac did:(NSString *)did productKey:(NSString *)productKey {
if(result.code == GIZ_SDK_SUCCESS) {
// 配置成功
} else {
// 配置失败
}
}
```

### 3.3.	SoftAP配置
设备进入SoftAP模式后，会产生一个Wifi热点。手机连上此热点后，将要配置的SSID和密码发给设备。设备上的Wi-Fi模块接收到SoftAP配置包后自动连接目标路由器，与airlink一样，连上路由器后发出配置成功广播，通知手机配置已完成。

使用机智云提供的模组固件，设备产生的Wifi热点以“XPG-GAgent-”开头，密码为” 123456789”。其他厂商提供的模组，SoftAP热点名称由各自厂商指定。APP可以根据需要传入正确的热点前缀。

【示例代码】

```objectivec
// MCU发出进入SoftAP串口指令，通知模组开启SoftAP模式。
详情请参考《智能云空调-机智云接入串口通信协议文档》
//让手机连接模组的SoftAP热点

//配置设备入网，发送要配置的wifi名称、密码 
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] setDeviceOnboarding:@"your_ssid" key:@"your_key" mode:GizWifiSoftAP softAPSSIDPrefix: @"your_gagent_hotspot_prefix" timeout:60 wifiGAgentType:nil]];

//模块收到配置信息，尝试连接路由器并自动关闭热点
//让手机连接到配置的wifi上

//等待配置完成或超时，回调配置完成接口
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didSetDeviceOnboarding:(NSError *)result mac:(NSString *)mac did:(NSString *)did productKey:(NSString *)productKey {
        if(result.code == GIZ_SDK_SUCCESS) {
            // 配置成功
        } else {
            // 配置失败
        }
}
```

## 4.	设备发现和订阅部分
### 4.1.	设备发现和订阅流程图
 ![Alt text](/assets/zh-cn/AppDev/iOSSDK/image12.png)

### 4.2.	设备发现
APP设置好委托，启动SDK后，就可以收到SDK的设备列表推送。每次局域网设备或者用户绑定设备发生变化时，SDK都会主动上报最新的设备列表。设备断电再上电、有新设备上线等都会触发设备列表发生变化。用户登录后，SDK会主动把用户已绑定的设备列表上报给APP，绑定设备在不同的手机上登录帐号都可获取到。

如果APP想要刷新绑定设备列表，可以调用绑定设备列表接口，同时可以指定自己关心的产品类型标识，SDK会把筛选后的设备列表返回给APP。

SDK提供设备列表缓存，设备列表中的设备对象在整个APP生命周期中一直有效。缓存的设备列表会与当前最新的已发现设备同步更新。

【示例代码】

```objectivec
// 使用缓存的设备列表刷新UI
NSArray* devices = [GizWifiSDK sharedInstance].deviceList;

// 接收设备列表变化上报，刷新UI
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didDiscovered:(NSError *)result deviceList:(NSArray *)deviceList {
        // 提示错误原因
        if(result.code != GIZ_SDK_SUCCESS) {
            NSLog(@"result: %@", result.localizedDescription);
        }
        // 显示变化后的设备列表
        NSLog(@"discovered deviceList: %@", deviceList);
		devices = deviceList;
}

// 主动刷新绑定设备列表、指定筛选的设备productKey
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] getBoundDevices:@"your_uid" token:@"your_token" specialProductKeys:[NSArray arrayWithObjects: @"your_product_key", nil]];
```

### 4.3.	设置设备的委托
在设备列表中得到设备对象，为其设置设备委托，以便于刷新设备UI。APP根据自己的需要实现相应的回调。

### 4.4.	设备订阅和绑定
APP得到设备列表后，给设备设置委托后，可以订阅设备。已订阅的设备将被自动绑定和自动登录，设备登录成功后会主动上报最新状态。

自动绑定仅限于局域网设备。对于无法在局域网内发现的设备，APP可以通过手动绑定的方式完成绑定。绑定成功的设备，需要订阅后才能使用。

无论是手动绑定还是自动绑定，设备的remark和alias信息，都需要在设备绑定成功后再设置。

解除订阅的设备，连接会被断开，不能再继续下发控制指令了。

#### 4.4.1.	设备订阅
所有通过SDK得到的设备，都可以订阅，订阅结果通过回调返回。订阅成功的设备，要在其网络状态变为可控时才能查询状态和下发控制指令。

【示例代码】

```objectivec
// 以设备列表中的第一个设备实例为例，为其设置委托 
GizWifiDevice* mDevice = nil;
for (int i = 0; i < deviceList.count; i++) {
	mDevice = deviceList[0];
mDevice.delegate = self;
[mDevice setSubscribe:YES];
break;
}

// 实现回调
- (void)device:(GizWifiDevice *)device didSetSubscribe:(NSError *)result isSubscribed:(BOOL)isSubscribed {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 订阅或取消订阅成功
    }
}
```

#### 4.4.2.	非局域网设备绑定
APP可以通过设备的mac、productKey、productSecret完成非局域网设备的绑定,可以用上述信息生成二维码，APP通过扫码方式绑定。GPRS设备、蓝牙设备等都是无法通过Wifi局域网发现的设备，都属于非局域网设备。

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self;
[[GizWifiSDK sharedInstance] bindRemoteDevice:@"your_uid" token:@"your_token" mac:@"your_mac" productKey:@"your_product_key" productSecret:@"your_product_secret"];

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didBindDevice:(NSError *)result did:(NSString *)did {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 绑定成功
    } else {
        // 绑定失败
    }
}
```

#### 4.4.3.	设置设备绑定信息
不订阅设备也可以设置设备的绑定信息。在设备列表中找到要修改的设备，如果是已绑定的，就可以修改remark和alias信息。

【示例代码】

```objectivec
// mDevice是从设备列表中获取到的设备实体对象，为其设置委托
mDevice.delegate = self;
[mDevice setCustomInfo:@"your_remark" alias:@"your_alias"]; 

// 实现回调
- (void)device:(GizWifiDevice *)device didSetCustomInfo:(NSError *)result {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 修改成功
    } else {
        // 修改失败
    }
}
```

### 4.5.	设备解绑
已绑定的设备可以解绑，解绑需要APP调用接口完成操作，SDK不支持自动解绑。对于已订阅的设备，解绑成功时会被解除订阅，同时断开设备连接，设备状态也不会再主动上报了。设备解绑后，APP刷新绑定设备列表时就得不到该设备了。

【示例代码】

```objectivec
[GizWifiSDK sharedInstance].delegate = self;
[[GizWifiSDK sharedInstance] unbindDevice:@"your_uid" token:@"your_token" did:@"your_did"];

// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didUnbindDevice:(NSError *)result did:(NSString *)did {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 解绑成功
    } else {
        // 解绑失败
    }
}
```

### 4.6.	获取硬件信息
不订阅设备也可以获取硬件信息。APP可以获取模块协议版本号，mcu固件版本号等硬件信息，但只有局域网设备才支持该功能。

【示例代码】

```objectivec
// mDevice是从设备列表中获取到的设备实体对象，为其设置委托
mDevice.delegate = self;
[mDevice getHardwareInfo]; 

// 实现回调
- (void)device:(GizWifiDevice *)device didGetHardwareInfo:(NSError *)result hardwareInfo:(NSDictionary *)hardwareInfo {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 获取成功
		NSString *hardWareInfo = [NSString stringWithFormat:@"WiFi Hardware Version: %@,\
WiFi Software Version: %@,\
MCU Hardware Version: %@,\
MCU Software Version: %@,\
Firmware Id: %@,\
Firmware Version: %@,\
Product Key: %@“
, [hwInfo valueForKey: @"wifiHardVersion"]
, [hwInfo valueForKey: @"wifiSoftVersion"]
, [hwInfo valueForKey: @"mcuHardVersion"]
, [hwInfo valueForKey: @"mcuSoftVersion"]
, [hwInfo valueForKey: @"wifiFirmwareId"]
, [hwInfo valueForKey: @"wifiFirmwareVer"]
, [hwInfo valueForKey: @"productKey"];
    } else {
        // 获取失败
    }
}
```

## 5.	设备控制部分
SDK通过字典键值对方式进行设备控制和状态接收。SDK接收到APP下发的指令字典后，对应解析为设备可识别的数据，发送给设备。反之，SDK收到设备回复或上报的数据后，对应解析为字典键值对上报给APP。

智能设备需正确烧写了GAgent固件和机智云串口通讯协议。如果设备定义了数据点，APP发送的指令必须符合数据点定义。如果设备没有定义数据点，设备指令可以按照透传数据以自定义格式下发。

## 5.1.	设备控制流程图
 ![Alt text](/assets/zh-cn/AppDev/iOSSDK/image14.png)
 
## 5.2.	发送控制指令
设备订阅变成可控状态后，APP可以发送控制指令。控制指令是字典格式，键值对为数据点名称和值。操作指令的确认回复，通过didReceiveData回调返回。

APP下发操作指令时可以指定sn，通过回调参数中的sn能够对应到下发指令是否发送成功了。但回调参数dataMap有可能是空字典，这取决于设备回复时是否携带当前数据点的状态。

如果APP下发指令后只关心是否有设备状态上报，那么下发指令的sn可填0，这时回调参数sn也为0。

【示例代码】

```objectivec
//在设备列表中得到设备对象，设置委托
mDevice.delegate = self;

// 对已订阅变为可控状态的设备，发送开灯指令
int sn = 5;
[self write: @{@"LED_OnOff": @(YES)} sn:@(sn)];

// 实现回调
- (void)device:(GizWifiDevice *)device didReceiveData:(NSError *)result data:(NSDictionary *)data withSN:(NSNumber *)sn {
if(result.code == GIZ_SDK_SUCCESS) {
    // 命令序号相符，开灯指令执行成功
if (sn == 5) {
}
    } else {
        // 执行失败
    }
}
```

## 5.3.	接收设备状态
设备订阅变成可控状态后，APP可以随时收到设备状态的主动上报，仍然通过didReceiveData回调返回。设备上报状态时，回调参数sn为0，回调参数dataMap为设备上报的状态。

【示例代码】

```objectivec
(void)device:(GizWifiDevice *)device didReceiveData:(NSError *)result data:(NSDictionary *)data withSN:(NSNumber *)sn {
    //基本数据，与发送的数据格式⼀一致
    NSDictionary *_data = [data valueForKey:@"data"];

    // 报警
    NSArray *alarms = [data valueForKey:@"alerts"];

    // 故障
    NSArray *faults = [data valueForKey:@"faults"];

    //透传数据
    NSDictionary *binary = [data valueForKey:@“binary"];

    //处理这些类型的数据
}
```

## 5.4.	设备状态查询
设备订阅变成可控状态后，APP可以查询设备状态。设备状态查询结果也通过didReceiveData回调返回，回调参数sn为0。回调参数dataMap为设备回复的状态。

【示例代码】

```objectivec
// mDevice是从设备列表中获取到的设备实体对象，为其设置委托
mDevice.delegate = self;
[mDevice getDeviceStatus];

- (void)device:(GizWifiDevice *)device didReceiveData:(NSError *)result data:(NSDictionary *)data withSN:(NSNumber *)sn {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 数据解析与3.5.3相同
    } else {
        // 查询失败
    }
}
```

## 6. 设备定时任务
    通过给设备设置定时任务，可以让设备在预定的日期和时间执行某些操作。这些操作可以在一个月内的某几天重复，也可以在一周内的某几天重复。
    定时任务可以先设定好，然后在任何时候开始执行或停止执行。定时任务创建时默认开启。

### 6.1. 流程图
 ![Alt text](/assets/zh-cn/AppDev/iOSSDK/image15.png)
 
### 6.2. 创建定时任务
    定时任务可以重复执行，也可以只执行一次，重复执行分为按月重复和按周重复。但同时只能指定一种重复方式，即或者不重复或者按周重复或者按月重复。
    使用SDK接口时，按周重复时给变量weekDays传值，按月重复时给monthDays传值，但如果两个变量都传值则只会处理weekDays。
    下面分别以这三种情况举例说明。

#### 6.2.1. 创建一次性定时任务
    假设我们需要在2017年1月16日早上6点30分开灯。如下代码中，日期和时间想要设置为几月几日几时几分，就设定为对应的值。
    比如我们希望设定的是2017年1月16日早上6点30分，那么date为2017-01-16，time为06:30，其中time是24小时制，date按照示例代码格式传值即可。

【示例代码】

```objectivec
// 设置定时任务委托
[GizDeviceSchedulerCenter setDelegate:self];

// 一次性定时任务，在2017年1月16日早上6点30分开灯
GizDeviceScheduler *scheduler = [[GizDeviceScheduler alloc] init];
scheduler.date = @"2017-01-16";
scheduler.time = @"06:30";
scheduler.remark = @"一次性开灯任务";
scheduler.attrs = @{@"LED_OnOff": @YES};

// 创建设备定时任务，mDevice为在设备列表中得到的设备对象
[GizDeviceSchedulerCenter createScheduler:@"your_uid" token:@"your_token" schedulerOwner:mDevice scheduler:scheduler]; 

// 实现回调
- (void)didUpdateSchedulers:(GizWifiDevice*)schedulerOwner result:(NSError*)result schedulerList:(NSArray*)schedulerList {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 定时任务创建成功
    } else {
        // 创建失败
    }
}
```

#### 6.2.2. 创建按周重复的定时任务
    我们现在让定时任务按周重复执行，现在要每周的周一至周五早上6点30分都开灯。

【示例代码】

```objectivec
// 设置定时任务委托
[GizDeviceSchedulerCenter setDelegate:self];

// 每周一到周五重复执行的定时任务
GizDeviceScheduler *scheduler = [[GizDeviceScheduler alloc] init];
scheduler.time = @"06:30";
scheduler.weekDays = @[@GizScheduleMonday, @GizScheduleTuesday, @GizScheduleWednesday, @GizScheduleThursday, @GizScheduleFriday];
scheduler.remark = @"按周重复执行的开灯任务";
scheduler.attrs = @{@"LED_OnOff": @YES};

// 创建设备的定时任务，mDevice为在设备列表中得到的设备对象
[GizDeviceSchedulerCenter createScheduler:@"your_uid" token:@"your_token" schedulerOwner:mDevice scheduler:scheduler]; 

// 实现回调
- (void)didUpdateSchedulers:(GizWifiDevice*)schedulerOwner result:(NSError*)result schedulerList:(NSArray*)schedulerList {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 定时任务创建成功
    } else {
        // 创建失败
    }
}
```

#### 6.2.3. 创建按月重复的定时任务
    我们现在让定时任务按周重复执行，现在要每个月的1号、15号早上6点30分都开灯。
    注意不要同时设置按周重复，如果同时设置了按周重复，按月重复会被忽略。

【示例代码】

```objectivec
// 设置定时任务委托
[GizDeviceSchedulerCenter setDelegate:self];

// 每月1号和15号重复执行的定时任务
GizDeviceScheduler *scheduler = [[GizDeviceScheduler alloc] init];
scheduler.time = @"06:30";
scheduler.monthDays = @[@1, @15];
scheduler.remark = @"按月重复执行的开灯任务";
scheduler.attrs = @{@"LED_OnOff": @YES};

// 创建设备的定时任务，mDevice为在设备列表中得到的设备对象
[GizDeviceSchedulerCenter createScheduler:@"your_uid" token:@"your_token" schedulerOwner:mDevice scheduler:scheduler]; 

// 实现回调
- (void)didUpdateSchedulers:(GizWifiDevice*)schedulerOwner result:(NSError*)result schedulerList:(NSArray*)schedulerList {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 定时任务创建成功
    } else {
        // 创建失败
    }
}
```

### 6.3. 获取定时任务列表

    创建定时任务后，可以通过查询得到已经创建好的所有定时任务列表。得到定时任务列表后，可以对已经创建好的定时任务做修改或删除。

【示例代码】

```objectivec
// 设置定时任务委托
[GizDeviceSchedulerCenter setDelegate:self];

// 同步更新设备的定时任务列表，mDevice为在设备列表中得到的设备对象
[GizDeviceSchedulerCenter updateSchedulers:@"your_uid" token:@"your_token" schedulerOwner:mDevice]; 

// 实现回调
- (void)didUpdateSchedulers:(GizWifiDevice*)schedulerOwner result:(NSError*)result schedulerList:(NSArray*)schedulerList {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 定时任务列表同步更新成功
    } else {
        // 同步更新失败
    }
}
```

### 6.4. 修改定时任务
    
    可以修改已经创建好的定时任务。修改时，从获取到的定时任务列表中取出定时任务对象，编辑好要修改的内容。
    注意，一旦定时任务创建好之后，就被分配了一个ID，这个ID是不能被修改的。
    
【示例代码】

```objectivec
// 设置定时任务委托
[GizDeviceSchedulerCenter setDelegate:self];

// 把之前创建好的一次性定时任务修改成每月1号和15号重复执行的定时任务，scheduler是定时任务列表中要修改的定时任务对象
scheduler.time = @"06:30";
scheduler.remark = @"开灯任务";
scheduler.attrs = @{@"LED_OnOff": @YES};
scheduler.monthDays = @[@1, @15];

// 修改设备的定时任务，mDevice为在设备列表中得到的设备对象
[GizDeviceSchedulerCenter editScheduler:@"your_uid" token:@"your_token" schedulerOwner:mDevice scheduler:scheduler]; 

// 实现回调
- (void)didUpdateSchedulers:(GizWifiDevice*)schedulerOwner result:(NSError*)result schedulerList:(NSArray*)schedulerList {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 定时任务修改成功
    } else {
        // 修改失败
    }
}
```

### 6.5. 删除定时任务

    在得到的定时任务列表中，找到要删除的定时任务ID，删除定时任务。
    
【示例代码】

```objectivec
// 设置定时任务委托
[GizDeviceSchedulerCenter setDelegate:self];

// 删除设备的定时任务列表，mDevice为在设备列表中得到的设备对象，your_scheduler_id是要删除的定时任务ID
[GizDeviceSchedulerCenter deleteScheduler:@"your_uid" token:@"your_token" schedulerOwner:mDevice schedulerID:@"your_scheduler_id"]; 

// 实现回调
- (void)didUpdateSchedulers:(GizWifiDevice*)schedulerOwner result:(NSError*)result schedulerList:(NSArray*)schedulerList {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 定时任务删除成功
    } else {
        // 删除失败
    }
}
```

## 7. 设备分享
用户绑定设备后，可以通过设备分享的方式让其他人使用设备。设备分享提供了更好的设备权限管理，在多用户使用同一个设备时提供了更安全、更便捷的设备绑定方式。设备绑定权限分为四种：

* Owner：设备的主账号，可以分享设备；
* Guest：设备的分享账号，可以接受分享邀请，不能再分享设备给其他人；
* Special：最早绑定设备但还未分享设备的账号，分享设备后即成为设备的主账号；
* Normal：其他已绑定了设备的账号，不能分享设备，也不能成为设备的主账号；
    
只有最早绑定设备的账号或设备的主账号才能分享设备。一旦设备有了主账号，其他人就无法再绑定了。主账号可以查看设备的当前已绑定用户，可以解绑其他用户。在设备没有主账号时，其他用户仍然可以绑定这个设备。
        
### 7.1. 流程图
 ![Alt text](/assets/zh-cn/AppDev/iOSSDK/image16.png)
 
### 7.2. 创建设备分享邀请
分享设备之前，先检查自己有哪些可以分享的设备。App可以遍历查找SDK提供的设备列表，找到那些绑定权限为GizDeviceSharingSpecial或者GizDeviceSharingOwner的，就可以创建分享邀请了。

有两种方式可以创建分享邀请：账号分享和二维码分享。
    
#### 7.2.1. 账号分享
账号分享时，对方账号可以是手机号、邮箱、普通用户名或者匿名账号，但必须是已经在机智云注册过的用户。如果该用户已经是这个设备的Guest账号或者已经绑定了这个设备，分享邀请会创建失败。账号分享邀请的有效期为24小时，即对方必须在24小时内作出响应，否则账号邀请会过期失效。

账号分享时要指定账号类型，匿名账号的guestUser参数填匿名账号的uid。账号分享创建成功时，回调参数中会返回sharingID，但不会返回QRCodeImage。下面仅以手机号分享举例：
    
【示例代码】

```objectivec
// 设置设备分享委托
[GizDeviceSharing setDelegate:self];

// 在设备列表中找到可以分享的设备

// 通过手机号分享设备
[GizDeviceSharing sharingDevice:@"your_token" deviceID: @"your_device_id" sharingWay:GizDeviceSharingByNormal guestUser:@"guest_phone_number" guestUserType:GizUserPhone]; 

// 实现回调
- (void)didSharingDevice:(NSError*)result deviceID:(NSString*)deviceID sharingID:(NSInteger)sharingID QRCodeImage:(UIImage*)QRCodeImage {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 分享邀请创建成功
    } else {
        // 创建失败
    }
}
```

#### 7.2.2. 二维码分享
二维码分享时，二维码有效期为15分钟，即对方必须在15分钟内扫描生成的二维码并作出响应，否则二维码邀请会过期失效。二维码分享邀请创建成功时，回调参数中会返回sharingID，同时还会返回对应的二维码图片QRCodeImage，App直接加载图片即可。
    
【示例代码】

```objectivec
// 设置设备分享委托
[GizDeviceSharing setDelegate:self];

// 在设备列表中找到可以分享的设备

// 二维码分享设备
[GizDeviceSharing sharingDevice:@"your_token" deviceID: @"your_device_id" sharingWay:GizDeviceSharingByQRCode guestUser:nil guestUserType:GizUserOther]; 

// 实现回调
- (void)didSharingDevice:(NSError*)result deviceID:(NSString*)deviceID sharingID:(NSInteger)sharingID QRCodeImage:(UIImage*)QRCodeImage {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 分享邀请创建成功
    } else {
        // 创建失败
    }
}
```
### 7.3. 接受分享邀请
Guest账号可以查询发给自己的设备分享邀请，只有Guest账号可以接受分享邀请。
    
#### 7.3.1. 接受账号分享邀请
Guest查询到的分享邀请如果是还未接受的状态，可以接受或者拒绝邀请。
    
【示例代码】
```objectivec
// 设置设备分享委托
[GizDeviceSharing setDelegate:self];

// 查询发给自己的分享邀请列表
[GizDeviceSharing getDeviceSharingInfos:@"your_token" sharingType: GizDeviceSharingToMe deviceID: @"your_device_id"];

// 实现获取分享邀请列表的回调
- (void)didGetDeviceSharingInfos:(NSError*)result deviceID:(NSString*)deviceID deviceSharingInfos:(NSArray*)deviceSharingInfos {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 获取成功。找到deviceSharingInfos中状态为未接受的分享邀请，your_sharing_id为要接受的分享邀请
        NSInteger your_sharing_id = -1;
        for (int i = 0; i < deviceSharingInfos.count; i++) {
            GizDeviceSharingInfo* mDeviceSharing = [deviceSharingInfos objectAtIndex:i];
            if (mDeviceSharing.status == GizDeviceSharingNotAccepted) {
                your_sharing_id = mDeviceSharing.id;
                break;
            }
        }
           
        // 接受邀请
        if (your_sharing_id != -1) {
            [GizDeviceSharing acceptDeviceSharing:@"your_token" sharingID:your_sharing_id accept:YES];
        }
    } else {
        // 获取失败
    }
}

// 实现接受分享邀请的回调	
- (void)didAcceptDeviceSharing:(NSError*)result sharingID:(NSInteger)sharingID {
    if(result.code == GIZ_SDK_SUCCESS) {
        // 接受成功
    } else {
        // 接受失败
    }
}
```
