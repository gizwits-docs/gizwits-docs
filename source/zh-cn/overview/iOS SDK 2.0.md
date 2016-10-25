title:  iOS SDK 2.0
---
# 1.设备接入SDK概述
## 1.1.  SDK目的与功能
机智云的设备接入SDK（以下简称SDK）封装了手机（包括PAD等设备）与机智云智能硬件的通讯过程，以及手机与云端的通讯过程。这些过程包括配置入网、发现、连接、控制、心跳、状态上报、报警通知等。使用SDK，可以使得开发者快速完成APP开发，开发者仅需关注APP的UI和UE设计即可，而相对复杂的协议与错误处理等事项可忽略。 

相比之下，SDK在新接口定义上做了进一步的简化，使用流程更加简单了。APP已经完全不需要了解设备连接方面的概念，可以更专注于APP用户体验的优化设计。
## 1.2.  机智云物联方案概况
![Alt text](/assets/zh-cn/app/1.2.png)
## 1.3.  找到最合适的SDK
机智云目前提供3套SDK：iOS平台原生SDK、Android平台原生SDK、APICloud跨平台SDK。开发者可以根据项目需要自行选择，其中APICloud版本SDK可以用H5技术一次开发，同时适配iOS和Android两个平台，具体内容请参考：《APICloud SDK 集成指南》。
## 1.4. 相关名词定义

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

### 1.4.8.   Onboarding

也叫配置入网，用户将一款基于Wi-Fi的物联网设备配置连接上路由器的过程称为Onboarding。新设备第一次使用时需要知道路由器的账号和密码，以通过路由器连接互联网。由于大多数的物联网设备没有自带的屏幕和键盘，所以需要通过智能手机向设备发送路由器的SSID和密码，这个过程机智云称为Onboarding。机智云提供的Wi-Fi设备接入SDK中已经内置了此配置的功能。

### 1.4.9.   AirLink

机智云对各种SmartConfig、SmartLink这种UDP广播报方式对设备配置入网的技术统称，兼容了多个Wi-Fi模块厂商的配置协议，总结了一套良好用户体验的标准Onboarding操作流程，机智云的Wi-Fi 设备接入SDK已经内置AirLink技术。

### 1.4.10.  SoftAP

由于目前各个Wi-Fi模块厂商的Smart Config协议均未完全成熟，也不支持5G路由器信号。机智云在提供了AirLink配置模式的同时也支持SoftAP模式配置设备接入路由器。当设备进入SoftAP配置模式时，设备本身将成为一个AP，智能手机可直接与设备进行连接，然后在手机上的界面上输入路由器的SSID和密码，设备接收到信息的时候会自动尝试连接路由器，连接成功则自动切换到正常使用的模式。

## 1.5.  集成准备

### 1.5.1.   注册机智云账号

在使用机智云服务前，你需要通过site.gizwits.com 
注册一个开发者账号。请完整填写你的注册信息。 
此部分请参考《快速入门》。

### 1.5.2.   新建设备接入

此部分请参考《快速入门》。

### 1.5.3.   获得 app ID 和产品标识码（productkey）

此部分请参考《快速入门》。

### 1.5.4.   下载SDK
![Alt text](/assets/zh-cn/app/1.54.png)
### 1.5.5.   导入SDK

第一步，双击解开压缩包 GizWifiSDK-iOS-xxx.zip。 
第二步，将解压后的文件添加到指定的工程中： 

![Alt text](/assets/zh-cn/app/1.55.png)
第三步，下载并添加依赖库OpenSSL。下载完成双击解压后，将lib-ios拷贝到项目目录，并添加到指定的工程中。 
![Alt text](/assets/zh-cn/app/1.552.png)
![Alt text](/assets/zh-cn/app/1.553.png)
第四步，如果使用的是Xcode7.2以下版本，需要添加AudioToolbox、SystemConfiguration、CoreTelephony库。
![Alt text](/assets/zh-cn/app/1.554.png)
第五步，一定要记得在Info.plist设置支持ATS特性，否则iOS9下某些功能无法正常使用
![Alt text](/assets/zh-cn/app/1.555.png)
最后，确保工程里面有这些链接库，SDK就添加完成了:
![Alt text](/assets/zh-cn/app/1.556.png)
# 2. SDK流程简介
## 2.1.  通用流程图
![Alt text](/assets/zh-cn/app/iossdk2.1.png)
## 2.2.  关键点说明
1)  SDK已经封装了所有的用户、配置、发现、连接、控制的过程，开发者使用这些API可以完成上述流程中的功能开发，不需要再自行实现通讯协议。 
2)  SDK采取回调的工作方式，所以必须设置必要的委托，比如通用委托和设备委托，具体请参见流程详解。SDK在主线程中给APP回调。
# 3. SDK流程详解
## 3.1.  初始化部分

### 3.1.1.   初始化部分流程图
![Alt text](/assets/zh-cn/app/iossdk3.11.png)
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
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didNotifyEvent:(GizEventType)eventType eventSource:(id)eventSource eventID:(GizWifiErrorCode)eventID eventMessage: (NSString *)eventMessage {
if(eventType == GizEventSDK)
{
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

### 3.2.1.   用户部分主要流程图
![Alt text](/assets/zh-cn/app/iossdk3.21.png)
用户的注册方式有多种，比如手机号、普通用户名、邮箱等，APP可以根据需要采取不同的方式。其他流程比如登录、密码修改、个人信息修改等部分，请直接阅读下面的流程文档。

### 3.2.2.   用户注册

机智云提供三种用户注册方式：手机注册、普通用户注册、邮箱注册。

#### 3.2.2.1.    注册手机用户

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
第二步：用短信验证码注册。APP把手机收到的短信验证码传给SDK，填上手机号和密码就可以注册了。 
【示例代码】
```
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] registerUser:@"your_phone_number" password:@"your_password" verifyCode:@"your_verify_code" accountType:GizUserPhone];
 
// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didRegisterUser:(NSError *)result uid:(NSString *)uid token:(NSString *)token {
    if(result.code == GIZ_SDK_SUCCESS)
    {
            // 注册成功
    } else {
            // 注册失败
    }
}
```
#### 3.2.2.2.    注册普通用户

注册普通用户，使用用户名、密码即可创建一个账号。 
【示例代码】
```
[GizWifiSDK sharedInstance].delegate = self; 
[[GizWifiSDK sharedInstance] registerUser:@"your_user_name" password:@"your_password" verifyCode:nil accountType:GizUserNormal];
 
// 实现回调
- (void)wifiSDK:(GizWifiSDK *)wifiSDK didRegisterUser:(NSError *)result uid:(NSString *)uid token:(NSString *)token 
{
    if(result.code == GIZ_SDK_SUCCESS) {
        // 注册成功
    } else {
         // 注册失败
 
    }
}
```
#### 3.2.2.3.    注册邮箱用户

通过有效的电子邮箱地址，注册一个账号。注册成功后，云端会给指定邮箱发送注册成功的邮件。 
【示例代码】
```
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
### 3.2.3.   用户登录

机智云提供三种用户登录方式：实名登录、匿名登录、第三方账号登录。实名登录适用于设计了登录界面，必须使用用户名密码注册登录以后才能使用的APP。匿名登录适用于没有设计登录界面，由后台自动生成用户账号的APP。登录后获取到的token有效期为7天。

#### 3.2.3.1.    实名登录

实名用户登录时，用户名可以是注册过的手机号、邮箱、普通用户名。登录账号要先注册好，如果更换了AppID，登录账号需要重新注册。 
【示例代码】
```
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
#### 3.2.3.2.    匿名登录

用户每次匿名登录时，获取到的uid是相同的。匿名用户登录时，如果账号不存在，系统会根据设备唯一标识码，生成一个匿名账号，并登录该账号。 
【示例代码】
```
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
#### 3.2.3.3.    第三方账号登录

目前支持的第三方账号有百度、新浪、腾讯。用户可以使用这三者的API获取到uid和token登录机智云，使用第三方账号登录时无需在机智云上注册，可直接登录。 
开发者可通过新浪、百度或腾讯api获取uid和token, 具体方法请参考各第三方平台的开发者文档。也可以使用以下工具获取第三方账号uid、token： 
ShareSDK http://mob.com/ 
BaiduSDK http://developer.baidu.com/wiki/index.php?title=%E5%B8%AE%E5%8A%A9%E6%96%87%E6%A1%A3%E9%A6%96%E9%A1%B5/%E7%99%BE%E5%BA%A6%E5%B8%90%E5%8F%B7%E8%BF%9E%E6%8E%A5 
【示例代码】
```
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
### 3.2.4.   重置密码

如果忘记了用户密码，可以通过手机验证码或邮箱设置新的密码。SDK支持手机号重置密码和邮箱重置密码两种，手机号重置需要接收验证码，邮箱重置需要进⼊邮箱，根据链接提示进行重置。

#### 3.2.4.1.    手机号重置密码

手机号重置密码时，需要先获取短信验证码再重置。获取短信验证码方式与手机注册时相同。 
第一步：获取短信验证码 
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
第二步：用短信验证码重置密码 
【示例代码】
```
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
#### 3.2.4.2.    邮箱重置密码

邮箱重置密码时，云端会给指定邮箱发送安全链接。用户需要到邮箱中查收邮件，并按邮件指示执行重置操作。重置密码邮件有可能进入用户的邮箱的垃圾箱中，需提醒用户。 
邮件发送成功回调与密码修改成功回调一致，因此需要注意在回调的时候区分。 
【示例代码】
```
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
### 3.2.5.   修改密码

用户登录后可以修改密码。 
【示例代码】
```
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
### 3.2.6.   匿名用户转换

匿名注册的用户可以转换为普通用户或者手机用户，转换后匿名用户的信息会转移到实名用户下，原匿名账号失效。但普通用户和手机用户必须是还未注册过的，已注册的用户名是无法转换的。

#### 3.2.6.1.    匿名用户转普通用户

转普通用户时，填入待转换的用户名、密码，以及登录的token就可以了。 
【示例代码】
```
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
#### 3.2.6.2.    匿名用户转手机用户

转手机用户时，需要填入待转换的手机号、密码、短信验证码，登录的token。获取短信验证码的过程与手机注册时一样。 
【示例代码】
```
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
### 3.2.7.   修改用户信息
实名用户不支持修改普通用户名，可以修改邮箱、手机号，可以补充个人信息。实名用户必须登录后才能修改这些信息，并且待修改的邮箱或手机号必须是已经注册过的。 

实名用户修改邮箱或手机号成功后，可以使用修改后的邮箱或手机号登录。登录后获得的绑定设备列表与原实名用户一致。 

修改邮箱或手机号时，可以同时补充个人信息。不想修改个人信息时，对应参数可以传nil。同时修改个人信息时，如果邮箱或用户名修改成功而个人信息修改失败，回调会返回成功并在errorMessage中提示个人信息修改失败的原因。
#### 3.2.7.1.    修改用户邮箱

只修改用户邮箱时，个人信息的参数传nil，用户类型可以指定为邮箱用户。以下为修改用户邮箱的示例代码。 
【示例代码】
```
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
#### 3.2.7.2.    修改用户手机号

只修改用户手机号时，个人信息参数传nil，用户类型可以指定为手机用户。修改手机号之前，需要先获取手机验证码。以下示例代码为修改用户手机号的代码，获取短信验证码的代码请参考手机号注册。 
【示例代码】
```
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
#### 3.2.7.3.    修改用户个人信息

只修改用户个人信息时，手机号或邮箱参数传nil，用户类型可以指定为普通用户。个人信息包含多项内容，通过GizUserInfo类指定。其中不想修改的信息填nil，云端会保留上次修改过的值。 
【示例代码】
```
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
#### 3.2.7.4.    同时修改邮箱和个人信息

修改邮箱同时修改个人信息时，用户类型需指定为邮箱用户。 
【示例代码】
```
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
#### 3.2.7.5.    同时修改手机号和个人信息

修改手机号同时修改个人信息时，用户类型需指定为手机用户。修改手机号同样需要先获取手机验证码，获取短信验证码的代码请参考手机号注册。 
【示例代码】
```
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













机智云 Open API 主要帮助开发者通过 HTTP 的方式维护用户、用户与设备之间的绑定关系，以及获取设备数据、发送控制指令给设备。

调用 API 需要获取 appid，product_key 和 token。appid 和 product_key 可以在产品信息页面获取到，token 通过用户注册和登录获取到。

下文中的参数统一用 {appid} 来表示，请将你自己的 appid 整个替换掉 {appid} （包括大括号）。
# 访问地址
http://api.gizwits.com
# SDK
python sdk: https://github.com/gizwits/gservice_sdk_py
# 用户信息 [/app/users]
## 创建匿名用户 [POST]
如果您想让您的用户不需要显示注册和登录就能使用机智云的功能，就可以通过匿名注册的方式来为该用户创建一个匿名用户。phone_id 可以是手机的唯一识别码。

或者您已经有了自己的用户系统，不希望用户再次注册一次机智云帐号，您也可以使用该接口，为您的每一个用户创建一个对应的机智云匿名帐号。这时，phone_id 可以是用户在您的系统中的唯一识别码。如在与微信应用做对接时，phone_id 可以设置成微信用户的 openid。
### Request (application/json)
Header
```
X-Gizwits-Application-Id: {appid}
```
```

```


    X-Gizwits-Application-Id: {appid}
Body

    {
    "phone_id": "apiary"
    }
### Response 201 (application/json)
Body

    { 
    "uid": "akkdlfeiow", 
    "token": "akdlfkad",
    "expire_at": 13894002020
    }
