title: Android App快速开发
---

# 概述

本文主要介绍了如何快速使用机智云安卓APP开源框架来进行APP的开发与测试，在阅读本文档之前，请先完成[APP开发准备工作](/zh-cn/quickstart/准备工作.html)

# 	10分钟部署调试机智云APP开源框架
## 1.	下载安卓APP开源框架
APP开源框架编译环境：Eclipse

安卓APP开源框架下载地址：
https://git.oschina.net/dantang/GizOpenSource_AppKit_Android
 
![@Android下载地址](/assets/zh-cn/quickstart/Android下载地址.png)

## 2.	导入到Eclipse工程
导入过程中可能会出现如下错误

 ![](/assets/zh-cn/quickstart/错误码.png)

此时需要将project.properties中的target版本修改为eclipse对应的安卓SDK版本即可。
 
![Alt text](/assets/zh-cn/quickstart/修改proguard-project中的targe.png)

## 3.	开源框架包结构说明
如下图所示，将Package Presentation设置为Hierarchical
 
![Alt text](/assets/zh-cn/quickstart/设置Package Presentation.png)

此时可以清晰的看到整个工程的目录结构，如图所示，机智云开源框架将每一个模块都独立为Package， Package与Package之间进行最大程度解耦。在开发过程中，如果想删除某一功能，比如不想使用第三方登录，则可以直接将“ThirdAccountModule”包直接删除即可，不会对其他包产生影响。
 
![Alt text](/assets/zh-cn/quickstart/目录解释说明.png)

## 4.	修改UIConfig.json文件
在上面所列的文件中。assets目录下的UIConfig.json文件是一个全局配置文件，在这里可以设置工程的配置信息，逐一介绍：

- **app_id：机智云 app id**
- **app_secret：机智云 app secret**
- **product_key：机智云 product key**
- **wifi_type_select：默认配置模块wifi模组选择功能是否开启**
- **tencent_app_id：qq登录 app id**
- **wechat_app_id：微信登录 app** id
- **wechat_app_secret：微信登录 app secret**
- **push_type：推送类型 【0：关闭，1：极光，2：百度】**
- **bpush_app_key：百度推送 app key**
- **openAPI_URL：openAPI 域名及端口，格式：“api.gizwits.com:80”，不写端口默认80**
- **site_URL：site 域名及端口，格式：“site.gizwits.com:80”，不写端口默认80**
- **push_URL：推送绑定服务器 域名及端口，格式：“push.gizwits.com:80”，不写端口默认80**
- **buttonColor：按钮颜色**
- **buttonTextColor：按钮文字颜色**
- **navigationBarColor：导航栏颜色**
- **navigationBarTextColor：导航栏文字颜色**
- **configProgressViewColor：配置中界面 progress view 颜色**
- **addDeviceTitle：添加设备界面 导航栏标题文字**
- **qq：是否打开QQ登录【true：打开】**
- **wechat：是否打开微信登录【true：打开】**
- **anonymousLogin：是否打开匿名登录【true：打开】**


在机智云官网上分别找到产品的Product Key、App ID与App Secret分别填入json文件中对应的位置，如下图所示：
 
![Alt text](/assets/zh-cn/quickstart/修改信息.png)

## 5.	APP部署运行
正确填写Product Key、App ID与App Secret后，工程就可以部署运行了，
 
![Alt text](/assets/zh-cn/quickstart/app.png)

 
![Alt text](/assets/zh-cn/quickstart/app2.png)

## 6.	注册新用户
 
![Alt text](/assets/zh-cn/quickstart/用户注册.png)

## 7.	登录用户
注册成功后，APP会自动登录，此时将跳转到“我的设备”界面

![Alt text](/assets/zh-cn/quickstart/用户登录.png)

## 8.	启动虚拟设备并显示二维码
打开开发者中心对应产品的“虚拟设备”栏目。
虚拟设备：云端自动生成的一个仿真设备，可模拟真实设备上报数据的行为。在实体设备还未开发完成的情况下，开发者可以利用机智云提供的虚拟设备工具进行APP调试，测试远程控制设备的功能。
 
![@虚拟设备](/assets/zh-cn/quickstart/虚拟设备.png)


 
![@开启虚拟设备](/assets/zh-cn/quickstart/开启虚拟设备.png)

## 9.	扫码绑定设备
打开左上角菜单，点击扫描绑定设备
 
![ ](/assets/zh-cn/quickstart/扫码绑定设备.png)

 
![Alt text](/assets/zh-cn/quickstart/扫码绑定设备2.png)


扫码成功后，会跳转回到“我的设备”界面，此时界面中会出现刚才扫描的“虚拟设备”
 
![Alt text](/assets/zh-cn/quickstart/设备列表.png)

## 10.	点击“智能灯”，进入控制页面
 
![Alt text](/assets/zh-cn/quickstart/控制页面.png)

进入控制页面，可以发现，控制页面为一个空白的页面。机智云开源框架为了让开发者快速开发APP，已将用户登录，设备发现，设备配网等功能做成了各个标准模块，仅保留控制页面让开发者自行开发设计，节省了开发者的时间。下章节，将示例如何快速开发一个简单好看的控制页面。

# 	控制页面快速开发设计
## 1.	控制页面代码预览
依次打开ControlModule -> GosDeviceControlActivity.java，可以看到，整个控制页面非常简单，就只有一个TextView将设备的mac地址显示出来。
 
![Alt text](/assets/zh-cn/quickstart/代码预览.png)

## 2.	页面UI设计
根据创建的产品“智能灯”，想实现的UI效果如下：

![Alt text](/assets/zh-cn/quickstart/UI效果.png)

点击页面中间灯的控件，APP下发命令，控制灯的开关，并将灯的图片显示为开启状态。关闭的时候显示为关闭。

## 3.	页面布局代码开发
### 导入图片文件

![Alt text](/assets/zh-cn/quickstart/倒入图片.png)

将表示智能灯开关状态的图片拷贝到drawable目录下，如下图所示：
 
![Alt text](/assets/zh-cn/quickstart/drawable目录.png)


### 添加Button控件
**1）打开控制页面对应的布局文件“activity_gos_device_control.xml”**
 
![Alt text](/assets/zh-cn/quickstart/页面对应的布局文件.png)

**2）添加Button控件**
如图所示，将控制页面中多余控件删除，添加一个Button控件

![Alt text](/assets/zh-cn/quickstart/添加Button控件.png)

**3）使用selector来对Button控件背景进行控制**
在drawable文件夹下新建一个selector文件，如图所示：
 
![Alt text](/assets/zh-cn/quickstart/新建selector.png)

在btn_light_onoff_selector.xml添加背景切换代码：
 
![Alt text](/assets/zh-cn/quickstart/添加背景切换代码.png)

代码如下：
```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- 选中状态的背景图片 -->
    <item android:drawable="@drawable/light_on" android:state_selected="true"/>
    <!-- 未选中状态的背景图片 -->
    <item android:drawable="@drawable/light_off"/>

</selector>

```


**4）将Button控件的背景设置为btn_light_onoff_selector，代码如下：**
 
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical" >

    <Button
        android:id="@+id/btn_light_onoff"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" 
        android:background="@drawable/btn_light_onoff_selector"/>

</LinearLayout>

```

此时整个页面布局就做好了。

## 4.	控制逻辑代码开发
### 4.1.编写控制页面代码

下图为该产品在云端创建的数据点。
 
![Alt text](/assets/zh-cn/quickstart/定义变量.png)

整个GosDeviceControlActivity的参考代码如下：

```java

package com.gizwits.opensource.appkit.ControlModule;

import java.util.concurrent.ConcurrentHashMap;
import com.gizwits.gizwifisdk.api.GizWifiDevice;
import com.gizwits.gizwifisdk.enumration.GizWifiErrorCode;
import com.gizwits.gizwifisdk.listener.GizWifiDeviceListener;
import com.gizwits.opensource.appkit.CommonModule.GosBaseActivity;
import com.gizwits.opensource.appkit.R;
import android.app.ActionBar;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class GosDeviceControlActivity extends GosBaseActivity {
	/** 智能灯设备 */
	private GizWifiDevice device;
	/** 导航栏 */
	ActionBar actionBar;
	/** 在云端创建的数据点标识名 */
	public static final String LIGHT_SWITCH = "switch";
	/** 开关灯Button */
	private Button btnLightSwitch;
	/** 设备监听器 */
	private GizWifiDeviceListener deviceListener = new GizWifiDeviceListener() {
		// 接收数据回调
		public void didReceiveData(GizWifiErrorCode result, GizWifiDevice device,
				ConcurrentHashMap<String, Object> dataMap, int sn) {
			// 已定义的设备数据点，有布尔、数值和枚举型数据
			if (dataMap.get("data") != null) {
				ConcurrentHashMap<String, Object> map = (ConcurrentHashMap<String, Object>) dataMap.get("data");
				// 根据标识名，在回调的map中找到设备上报的值
				if (map.get(LIGHT_SWITCH) != null) {
					boolean status = (Boolean) map.get(LIGHT_SWITCH);
					// 根据设备上报的值更改按钮的图标
					btnLightSwitch.setSelected(status);
				}
			}
		}
	};

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_gos_device_control);
		initDevice();
		// 设置ActionBar
		setActionBar(true, true, device.getProductName());
		initView();
	}

	@Override
	protected void onDestroy() {
		super.onDestroy();
		// 退出控制页面，取消设备订阅
		device.setSubscribe(false);
	}

	/**
	 * Description:初始化控件
	 */
	private void initView() {
		btnLightSwitch = (Button) findViewById(R.id.btn_light_onoff);
		btnLightSwitch.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				controlLight();
			}
		});
	}

	/**
	 * Description:初始化设备
	 */
	private void initDevice() {
		Intent intent = getIntent();
		device = (GizWifiDevice) intent.getParcelableExtra("GizWifiDevice");
		device.setListener(deviceListener);
		Log.i("Apptest", device.getDid());
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case android.R.id.home:
			this.finish();
			break;
		}
		return super.onOptionsItemSelected(item);
	}

	/**
	 * Description::控制智能灯
	 */
	private void controlLight() {
		if (btnLightSwitch.isSelected()) {
			// 下发控制命令
			sendCommand(false);
			// 更改Button控件状态
			btnLightSwitch.setSelected(false);
		} else {
			sendCommand(true);
			btnLightSwitch.setSelected(true);
		}
	}

	/**
	 * Description:下发命令方法
	 * 
	 * @param onOff
	 *            true表示开灯，false表示关灯
	 */
	private void sendCommand(boolean onOff) {
		int sn = 5;
		ConcurrentHashMap<String, Object> command = new ConcurrentHashMap<String, Object>();
		// map中key为云端创建数据点的标识名，value为需要传输的值
		command.put(LIGHT_SWITCH, onOff);
		// 调用write方法即可下发命令
		device.write(command, sn);
	}
}

```

### 4.2.	部署调试
完成上述代码编写之后，就可以部署到手机中测试控制结果了。

**下发命令**

如图所示，APP部署到手机上后，进入到控制页面，如下图所示：
 
![Alt text](/assets/zh-cn/quickstart/下发命令app 页面.png)

点击app中灯的图标，APP将下发控制命令，此时APP的按钮图标将变为开灯状态。
 
![Alt text](/assets/zh-cn/quickstart/app亮灯.png)

此时可以在云端虚拟设备的通信日志中看到app下发的控制命令，如下图：
 
![Alt text](/assets/zh-cn/quickstart/app下发控制指令.png)

**设备主动上报数据**
如图所示，在虚拟设备中，将开关的值改为“0”，点击下面的推送，此时可以看到通信日志中会有一条记录“虚拟设备上报数据”，表示设备上报数据成功了。
 
![Alt text](/assets/zh-cn/quickstart/上报数据.png)

此时APP的控制页面中，灯的按钮马上变成了关灯状态，表示APP成功收到了设备的上报数据。
 
![Alt text](/assets/zh-cn/quickstart/关灯.png)





## 	5. 重要提示

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




