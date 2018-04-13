title: 机智云设备分享功能使用流程
----
# 1.概述
用户绑定设备后，可以通过设备分享的方式让其他人使用设备。设备分享提供了更好的设备权限管理，在多用户使用同一个设备时提供了更安全、更便捷的设备绑定方式。设备绑定权限分为四种：
Owner：设备的主账号，可以分享设备；
Guest：设备的分享账号，可以接受分享邀请，不能再分享设备给其他人；
Special：最早绑定设备但还未分享设备的账号，分享设备后即成为设备的主账号；
Normal：其他已绑定了设备的账号，不能分享设备，也不能成为设备的主账号；
只有最早绑定设备的账号或设备的主账号才能分享设备。一旦设备有了主账号，其他人就无法再绑定了。主账号可以查看设备的当前已绑定用户，可以解绑其他用户。在设备没有主账号时，其他用户仍然可以绑定这个设备。

* 注：使用设备分享功能之前，需要在开发者中心-产品基础信息内打开该功能，打开之后将无法关闭
![Alt text](/assets/zh-cn/cloud/share/20180301103813.png)

# 2.设备分享功能的应用场景
产品设计流程如下：
![Alt text](/assets/zh-cn/cloud/share/1495023662167.png)
## 2.1.应用场景1:一个设备对一个用户
一个设备只能被一个用户绑定和控制，就是说用户只要Special /Owner身份，而没有Normal/ Guest身份。代码设置流程图如下：
![Alt text](/assets/zh-cn/cloud/share/1495023716835.png)
（注意：因为该应用场景是一个设备对应一个用户，Special身份调用账号分享功能成为Owner身份的时候，调用sharingDevice接口上guestUser参数直接在代码上写死一个该appid注册的账号就成，不需要到UI上的。）
## 2.2.应用场景2:一个设备对多个用户
该场景是常用场景，一个设备可以被多个用户绑定，当Special用户成为Owner身份,其它用户要绑定该设备，只能Owner用户通过调用设备分享功能分享给其它的用户，然后其它用户才能远程控制该设备。就是说用户可以是Special /Owner身份，也可以是Normal/ Guest身份。代码设计流程图如下：
（1）创建分享邀请
![Alt text](/assets/zh-cn/cloud/share/1495023767323.png)
（2）接收分享邀请
![Alt text](/assets/zh-cn/cloud/share/1495023781290.png)

# 3.硬件设计部分
## 3.1.可绑定模式功能介绍
在wifi模组请求设备信息的时候，mcu回复的命令中包含了一个绑定超时的字段，该字段值为0时，表示该设备随时可以在局域网内被绑定。大于0时，需要协议中《4.12MCU通知WiFi模组进入可绑定模式》的命令来配合使用。
![Alt text](/assets/zh-cn/cloud/share/1495023823523.png)
![Alt text](/assets/zh-cn/cloud/share/1495023837532.png)
## 3.2.APP设备分享功能要结合硬件绑定超时功能的原因
分析：在局域网内，当用户使用了设备分享功能成为Owner身份，其它用户在该局域网内调用发现设备接口还是可以发现设备和控制设备，只是不能绑定设备而已。
在大循环情况下，先前绑定过该设备的用户，Owner身份用户除外，调用获取绑定设备列表，是发现不了该设备的，只能通过Owner身份用户将设备分享出来给其它用户控制。
## 3.3.重置WiFi模组功能
当设备reset模组后，模组会清除先前配置的ssid和密码、did，passcode等信息，还将先前跟该设备绑定过的绑定关系全部清除掉。
![Alt text](/assets/zh-cn/cloud/share/1495023887642.png)
## 3.4.APP设备分享功能需要硬件做重置WiFi模组功能的原因
分析：当该设备已经被其他用户设置为Owner或者Special身份后，且不能确认是设置了那个用户。此时，设备reset模组后，会把先前跟该设备绑定过的用户全部清除，以及先前的用户Owner或者Special身份也会清除掉。客户重新再配置和绑定该设备就成为Special身份，然后再分享设备，该用户就重新成为Owner身份了。
# 4.APP开发部分
## 4.1.Android sdk 接口部分
### 4.1.1账号分享
账号分享时，对方账号可以是手机号、邮箱、普通用户名或者匿名账号，但必须是已经在机智云注册过的用户。如果该用户已经是这个设备的Guest账号或者已经绑定了这个设备，分享邀请会创建失败。账号分享邀请的有效期为24小时，即对方必须在24小时内作出响应，否则账号邀请会过期失效。
（注意：如果产品用的是应用场景1，一个设备对一个用户，guestUser参数填死一个已注册的用户就成，该接口不需要在做UI交互，具体流程请查看2.1.应用场景1。）
账号分享时要指定账号类型，匿名账号的guestUser参数填匿名账号的uid。账号分享创建成功时，回调参数中会返回sharingID，但不会返回QRCodeImage。下面仅以手机号分享举例：
【示例代码】

```
 // 设置设备分享监听
GizDeviceSharing.setListener(mListener);
// 在设备列表中找到可以分享的设备
// 通过手机号分享设备
GizDeviceSharing.sharingDevice("your_token", "your_device_id", GizDeviceSharingWay.GizDeviceSharingByNormal, "guest_phone_number", GizUserAccountType.GizUserPhone);
GizDeviceSharingListener mListener = new GizDeviceSharingListener() {
    // 实现设备分享的回调
    @Override
    public void didSharingDevice(GizWifiErrorCode result, String deviceID, int sharingID, Bitmap QRCodeImage) {
        if (result == GizWifiErrorCode.GIZ_SDK_SUCCESS) {
            // 分享成功
        } else {
            // 分享失败
        }
    }
};
```

### 4.1.2.二维码分享
二维码分享时，二维码有效期为15分钟，即对方必须在15分钟内扫描生成的二维码并作出响应，否则二维码邀请会过期失效。二维码分享邀请创建成功时，回调参数中会返回sharingID，同时还会返回对应的二维码图片QRCodeImage，App直接加载图片即可。

  【示例代码】
  

```
 // 设置设备分享监听
GizDeviceSharing.setListener(mListener);
// 在设备列表中找到可以分享的设备
// 二维码分享设备
GizDeviceSharing.sharingDevice("your_token", "your_device_id", GizDeviceSharingWay.GizDeviceSharingByQRCode, null, null);
GizDeviceSharingListener mListener = new GizDeviceSharingListener() {
    // 实现设备分享的回调
    @Override
    public void didSharingDevice(GizWifiErrorCode result, String deviceID, int sharingID, Bitmap QRCodeImage) {
        if (result == GizWifiErrorCode.GIZ_SDK_SUCCESS) {
            // 分享成功
        } else {
            // 分享失败
        }
    }
};
```
### 4.1.3.接受分享邀请
Guest账号可以查询发给自己的设备分享邀请，只有Guest账号可以接受分享邀请。
接受账号分享邀请
Guest查询到的分享邀请如果是还未接受的状态，可以接受或者拒绝邀请。
【示例代码】

```
// 设置设备分享监听
GizDeviceSharing.setListener(mListener);
// 查询发给自己的分享邀请列表
GizDeviceSharing.getDeviceSharingInfos("your_token", GizDeviceSharingType.GizDeviceSharingToMe, "your_device_id");
GizDeviceSharingListener mListener = new GizDeviceSharingListener() {
    // 实现获取分享邀请列表的回调	
    @Override
    public void didGetDeviceSharingInfos(GizWifiErrorCode result, String deviceID, List<GizDeviceSharingInfo> deviceSharingInfos) {
        if (result == GizWifiErrorCode.GIZ_SDK_SUCCESS) {
	
	    	// 获取成功。找到deviceSharingInfos中状态为未接受的分享邀请，your_sharing_id为要接受的分享邀请
	    	int your_sharing_id = -1;
	    	for (int i = 0; i < deviceSharingInfos.size(); i++) {
	    		GizDeviceSharingInfo mDeviceSharing = deviceSharingInfos.get(i);
	    		if (mDeviceSharing.getStatus() == GizDeviceSharingStatus.GizDeviceSharingNotAccepted) {
	    			your_sharing_id = mDeviceSharing.getId();
	    			break;
	    		}
	    	}
    
	    	// 接受邀请
	    	if (your_sharing_id != -1) {
	    		GizDeviceSharing.acceptDeviceSharing("your_token", your_sharing_id, true);
	    	}
		
        } else {
            // 获取失败
        }
    }
    
    // 实现接受分享邀请的回调	
    @Override
    public void didAcceptDeviceSharing(GizWifiErrorCode result, int sharingID) {
        if (result == GizWifiErrorCode.GIZ_SDK_SUCCESS) {
            // 接受成功
        } else {
            // 接受失败
        }
    }
};
```
## 4.2.IOS sdk 接口部分
### 4.2.1.账号分享
账号分享时，对方账号可以是手机号、邮箱、普通用户名或者匿名账号，但必须是已经在机智云注册过的用户。如果该用户已经是这个设备的Guest账号或者已经绑定了这个设备，分享邀请会创建失败。账号分享邀请的有效期为24小时，即对方必须在24小时内作出响应，否则账号邀请会过期失效。
（注意：如果产品用的是应用场景1，一个设备对一个用户，guestUser参数填死一个已注册的用户就成，该接口不需要在做UI交互，具体流程请查看2.1.应用场景1。）
账号分享时要指定账号类型，匿名账号的guestUser参数填匿名账号的uid。账号分享创建成功时，回调参数中会返回sharingID，但不会返回QRCodeImage。下面仅以手机号分享举例：
【示例代码】

```
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
### 4.2.2. 二维码分享
二维码分享时，二维码有效期为15分钟，即对方必须在15分钟内扫描生成的二维码并作出响应，否则二维码邀请会过期失效。二维码分享邀请创建成功时，回调参数中会返回sharingID，同时还会返回对应的二维码图片QRCodeImage，App直接加载图片即可。
【示例代码】

```
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
### 4.2.3 接受分享邀请
Guest账号可以查询发给自己的设备分享邀请，只有Guest账号可以接受分享邀请。
接受账号分享邀请
Guest查询到的分享邀请如果是还未接受的状态，可以接受或者拒绝邀请。
【示例代码】

```
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


# 5.参考文档
Android sdk使用指南文档:[http://docs.gizwits.com/zh-cn/AppDev/AndroidSDKA2.html](http://docs.gizwits.com/zh-cn/AppDev/AndroidSDKA2.html)
IOS sdk使用指南文档:[http://docs.gizwits.com/zh-cn/AppDev/iOSSDKA2.html](http://docs.gizwits.com/zh-cn/AppDev/iOSSDKA2.html)
