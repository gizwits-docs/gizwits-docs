title: wifi模组入网之SoftAp配网方案
---
# 1.简介

SoftAp配网方案包括Softap配网流程、硬件开发部分和APP开发流程。其中，硬件开发部分，开发者可以根据机智云串口通信协议自行修改模组发出Softap热点名称和连接密码。如果开发者不修改，则模组发出Softap热点名称就为默认名称“XPG-GAgent-xxxx”，xxxx表示模组mac最后4位字符，密码为123456789。

# 2.SoftAp配网流程

![Alt text](./png1.png)
sotfap配网流程原理：
(1) APP端连接目标路由器，并且获取目标路由器的ssid和手动输入的密码。
(2) 触发WiFi模组进入softap配网模式。
(3) 手机去请求连接WiFi模组发出来的softap热点，并且把目标路由器ssid和密码发送给模组端。
(4) WiFi模组拿到路由器ssid和password信息后，发送ACK给app。同时也去连接目标路由器。
(5) 模组关闭softap模式，尝试连接符合ssid和password的路由器。同时，手机断开与模组连接，自动连接上一次连接的路由器。（android手机自动连接原来记忆的路由器，iOS手机随机连接当前环境可连接的路由器。)
(6) app sdk监听局域网模组广播配置成功包。同时，app sdk向云端查询设备是否配置入网成功。不管局域网收到配置成功包或者查询到设备入网成功，app sdk皆认为配网成功，并且回调配网成功。
具体流程可以查看以下时序图：
![Alt text](./png2.png)

# 3.硬件开发部分
### 3.1.下载机智云串口协议文档
(1) 根据已经创建好的产品，并且定义好数据点，选中产品。

![Alt text](./png3.png)
(2) 下载模组与mcu之间的串口通信协议。

![Alt text](./png4.png)

### 3.2.自定义softap热点名称
机智云固件默认softap热点名称格式为“XPG-GAgent-xxxx”，xxxx表示模组mac最后4位字符，密码为123456789。如果客户想自定义WiFi模组softap热点名称，并且不设置密码，可以根据通信协议上面的“3.1获取设备信息”上面的data字段来修改。

![Alt text](./png5.png)

如：设置重置WiFi模组后，默认进入softap模式，并且热点名称叫“John”，密码为空。
示例为：cfgMode=1&apName0=John
以下就是串口通信包的解析图：

![Alt text](./png6.png)

"cfgMode=1&apName0=John"字符转16进制为：63 66 67 4D 6F 64 65 3D 31 26 61 70 4E 61 6D 65 30 3D 4A 6F 68 6E
当mcu端完成以上“3.1获取设备信息”设置后，WiFi模块与mcu的串口通信稳定下来，mcu端就可以请求WiFi模组进入softap配网模式。

### 3.3.mcu程序开发softap配网功能

(1) 打开3.1下载的机智云串口协议

![Alt text](./png7.png)

(2) 根据协议上面的3.6通知WiFi模组进入配置模式

![Alt text](./png8.png)


此外，softap配网说明：
a.把上面的配网方式字段赋值0x01
b.示例：FF FF 00 06 09 02 00 00 01 12 
c.协议上面的这些参数，是可选字段，如果没有用到，可以直接不传，如下图。
![Alt text](./png9.png)

# 4.APP开发部分
### 4.1.下载机智云APP sdk链接
链接为：[https://download.gizwits.com/zh-cn/p/95/97](https://download.gizwits.com/zh-cn/p/95/97)


### 4.2.Android APP开发softap配网流程
###### 4.2.1.下载SDK

![Alt text](./png10.png)

###### 4.2.2. 集成Android SDK流程
（1）导入SDK
第一步，双击解开压缩包 GizWifiSDK-Android-xxx.zip。
第二步，将解压后的libs目录下所有内容拷贝到指定工程的libs目录，保证下图红框中的文件都加载到了工程中：

![Alt text](./png11.png)

（2） 配置AndroidManifest.xml
请将下面权限配置代码复制到 AndroidManifest.xml 文件中：

```
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
<uses-permission android:name="android.permission.CHANGE_WIFI_MULTICAST_STATE" />
```
权限说明：

![Alt text](./png29.png)

（3）Android6.0系统文件读写权限设置
Android 6.0新增了运行时权限动态检测，GizWifiSDK中使用的以下权限需要在运行时判断：ACCESS_FINE_LOCATION，通过这个权限可以检测到手机当前wifi和可连接的wifi列表。
下面以这个权限申请举例说明如何编写动态检测代码：
Android6.0系统为targetSdkVersion小于23的应用默认授予了所申请的所有权限，所以如果App使用的targetSdkVersion低于23，可以正常运行。但如果用户在设置中取消了授予的权限，或者App使用的targetSdkVersion为23以上，需要在App代码中处理。以下以Android Studio举例：
目标SDK版本
在build.gradle中设置targetSdkVersion为23：

```
android {
	compileSdkVersion 23
	buildToolsVersion "23.0.1"
	defaultConfig {
		applicationId "com.yourcomany.app     
		minSdkVersion 18     
		targetSdkVersion 23     
		versionCode 1     
		versionName "1.0"
	}
	buildTypes {
		release {
			minifyEnabled false
			proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
		}
	}
}
```

检查并申请权限
需要检查APP是否已经拥有ACCESS_FINE_LOCATION权限，没有则申请权限：

```
if(ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {          
	ActivityCompat.requestPermissions(this, new String[] { Manifest.permission.ACCESS_FINE_LOCATION }, ACCESS_FINE_LOCATION_REQUEST_CODE);      
}
```

请求权限后，系统会弹出请求权限的对话框：
![Alt text](./png12.png)

用户选择允许后，会回调onRequestPermissionsResult方法, 该方法可类似如下处理：

```
onActivityResult  
Override  
public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {      
	super.onRequestPermissionsResult(requestCode, permissions, grantResults);      
	doNext(requestCode,grantResults);  
}

// 接着根据requestCode和grantResults(授权结果)做相应的后续处理：
private void doNext(int requestCode, int[] grantResults) {
	if (requestCode == ACCESS_FINE_LOCATION_REQUEST_CODE) {
		if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
              		// Permission Granted          
		} else {
              		// Permission Denied
		}
	}
}
```
Fragment中运行时权限的特殊处理

> 在Fragment中申请权限，不要使用ActivityCompat.requestPermissions,
> 直接使用Fragment的requestPermissions方法，否则会回调到Activity
> onRequestPermissionsResult
> 如果在Fragment中嵌套Fragment，在子Fragment中使用requestPermissions方
> 法，onRequestPermissionsResult不会回调回来，建议使用getParentFragment().requestPermissions方法。这个方法会回调到父Fragment中的onRequestPermissionsResult，在回调中加入以下代码可以把回调透传到子Fragment：

```
Override  
public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
	super.onRequestPermissionsResult(requestCode, permissions, grantResults);
	List<Fragment> fragments = getChildFragmentManager().getFragments();      
	if (fragments != null) {
		for (Fragment fragment : fragments) {
			if (fragment != null) {
				fragment.onRequestPermissionsResult(requestCode,permissions,grantResults);    
			}          
  		}      
 	}  
}
```

（4）如何在AndroidStudio上使用GizWifiSDK
第一步、下载sdk
下载完成以后请自行解压。

![Alt text](./png13.png)

第二步、导入jar包到Android Studio

![Alt text](./png14.png)

第三步、把jar包导成库文件

![Alt text](./png15.png)


第四步、导入so文件
请在main文件加下创建文件夹jniLibs,将armeabi粘贴到对应的文件夹下：

![Alt text](./png16.png)

第五步、导入完成以后查看对应的build.gradle
下图中可以看到已经关联库成功：

![Alt text](./png17.png)

第六步、测试是否成功

![Alt text](./png18.png)

如果有下面图片中的log的话代表成功：

![Alt text](./png19.png)

##### 4.2.3.Android SDK 配网接口使用
当APP端完成了sdk的集成，APP工程可以正常启动sdk后，就可以调试上面的配网接口。
注意：接口上面第4个参数，如"XPG-GAgent-xxxx”为WiFi设备热点ssid名称,xxxx表示模组mac最后4位字符，密码为123456789。

示例代码：

```
GizWifiSDK.sharedInstance().setListener(mListener);

GizWifiSDK.sharedInstance().setDeviceOnboardingDeploy("your_ssid", "your_key", 

GizWifiConfigureMode.GizWifiSoftAP, "XPG-GAgent-DF4A", 60, null, false);

// 实现回调

GizWifiSDKListener mListener = new GizWifiSDKListener() {

@Override

public void didSetDeviceOnboarding(GizWifiErrorCode result, GizWifiDevice device) {

if (result == GizWifiErrorCode.GIZ_SDK_SUCCESS) {

// 配置成功

} else {

// 配置失败

} 
}

};
```

### 4.3.iOS APP开发softap配网流程
##### 4.3.1. 下载SDK

![Alt text](./png20.png)

##### 4.3.2. 集成ios SDK
首先双击解开压缩包 GizWifiSDK-iOS-xxx.zip。按照App开发的需要，可以选择使用动态库或者静态库。以下分别为动态库和静态库的加载方式：
(1) 导入动态SDK
动态库在解压后的DynamicLibrary目录下。动态库加载请注意按照下图进行设置，否则应用运行后会立即崩溃：

![Alt text](./png21.png)

(2)导入静态SDK
第一步，解压后，将StaticLibrary目录下的文件添加到指定的工程中：

![Alt text](./png22.png)

第二步，下载并添加依赖库OpenSSL。下载完成双击解压后，将lib-ios拷贝到项目目录，并添加到指定的工程中。

![Alt text](./png23.png)

![Alt text](./png24.png)


第三步，如果使用的是Xcode7.2以下版本，需要添加AudioToolbox、SystemConfiguration、CoreTelephony库。

![Alt text](./png25.png)

第四步，一定要记得在Info.plist设置支持ATS特性，否则iOS9下某些功能无法正常使用

![Alt text](./png26.png)

最后，确保工程里面有这些链接库，SDK就添加完成了:

![Alt text](./png27.png)


(3)通过cocoapods使用GizWifiSDK（可选）


第一步：确认本机安装的cocoapods能正常工作 

> pod --help

第二步：编辑工程对应的Podfile文件 

> comment this line to define a global platform for your project #
> platform :ios, ‘6.0’  source ‘https://github.com/gizwits/PodSpecs.git'
> Source ‘https://git.oschina.net/dantang/PodSpecs.git’

以上两个源选一个即可 

> target ‘cocoapodsTest’ do pod ‘GizWifiSDK’, ‘2.04.04’ end

第三步：安装 

> pod install --no-repo-update

第四步：打开workspace工程即可


##### 4.3.3.iOS SDK 配网接口使用
当APP端完成了sdk的集成，APP工程可以正常启动sdk后，就可以调试上面的配网接口。
注意：接口上面第4个参数，如"your_gagent_hotspot_prefix”为WiFi设备热点ssid名称，密码为123456789。

```
示例代码：
[GizWifiSDK sharedInstance].delegate = self; 

// softap 配置 
[[GizWifiSDK sharedInstance] setDeviceOnboardingDeploy:@"your_ssid" 
key:@"your_key" mode:GizWifiSoftAP softAPSSIDPrefix: 
@"your_gagent_hotspot_prefix" timeout:60 wifiGAgentType:nil] bind:NO]; 

// 实现回调 
(void)wifiSDK:(GizWifiSDK *)wifiSDK didSetDeviceOnboarding:(NSError *)result device:(GizWifiDevice *)device { 
if(result.code == GIZ_SDK_SUCCESS) { 
// 配置成功 
} else { 
// 配置失败 
} 
} 
```

# 5.SoftAp配网APP开发demo参考代码

### 5.1.Android demo 代码
  下载链接：[https://eyun.baidu.com/s/3kWDBShT](https://eyun.baidu.com/s/3kWDBShT) 密码：0UHO

### 5.2.iOS demo 代码
  下载链接：[https://eyun.baidu.com/s/3jKgejMe](https://eyun.baidu.com/s/3jKgejMe) 密码：zVHf


6.参考资料
（1）机智云iOS SDK接口手册，下载链接为：[iOS_SDK2.0_API参考手册](http://docs.gizwits.com/assets/pdf/iOS_SDK2.0_API%E5%8F%82%E8%80%83%E6%89%8B%E5%86%8C.pdf)
（2）机智云Android SDK接口手册，下载链接为：[Android_SDK2.0_API参考手册](http://docs.gizwits.com/assets/pdf/Android_SDK2.0_API%E5%8F%82%E8%80%83%E6%89%8B%E5%86%8C.pdf)


# 7.FAQ
7.1.  Q：产品支持Softap功能后，是不是就支持5GHz频段的路由器了？

```
   A: 不是，Softap配网只是一种配网方式，它不能改变只支持2.4GHz的WiFi模组的频段的。所以，WiFi模组进入Softap配网，而路由器设置是5GHz频段的情况下，配网就会失败的。
```

7.2.  Q：iOS APP Softap配网返回错误码GIZ_SDK_DEVICE_CONFIG_SSID_NOT_MATCHED = 8311？
     
```
  A：该错误为手机当前连接的路由器和要配置的目标路由器不一致。原因是手机APP端与WiFi模组断开连接后，iOS 11以下版本（不包括iOS 11版本）系统的手机，回到手机APPUI界面，由于iOS系统问题，手机连接的路由器是系统根据信号强弱去连接的，不一定能连接会原来的目标路由器，这个就会出现手机热点和要配置的路由ssid不匹配的错误“GIZ_SDK_DEVICE_CONFIG_SSID_NOT_MATCHED = 8311”。因此，如果iOS 11版本以下（不包括11版本）的手机，就要人为去到手机WiFi设置界面，手动连接目标路由器。iOS 11以上版本（包括iOS 11版本），由于该版本系统允许手机APP端去连接目标的路由器，所以，iOS 11 以上版本（包括iOS 11版本）可以正常连接会原来的目标路由器。
```

7.3.Q:小米手机出现Softap配网一直失败问题，而其他的Android手机Softap是正常的？
  

```
   A:该问题是由于手机系统root权限导致的，只要是在APPUI界面调用获取ssid热点列表的时候，然后去连接模组Softap热点，由于手机系统root限制问题，不让去连接。出现这种情况，只能切换到手机WiFi设置界面，手动去连接WiFi模组发出来的Softap热点。
```




