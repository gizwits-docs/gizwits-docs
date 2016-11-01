title:Android App开源框架使用教程
---

# 概述
本文主要介绍了机智云设备接入SDK的功能以及如何快速使用机智云APP开源框架来进行APP的开发与测试。
# 机智云APP开发资源简述
## 1. 机智云设备接入SDK
机智云的设备接入SDK（以下简称SDK）封装了手机（包括PAD等设备）与机智云智能硬件的通讯过程，以及手机与云端的通讯过程。这些过程包括配置入网、发现、连接、控制、心跳、状态上报、报警通知等。使用SDK，可以使得开发者快速完成APP开发，开发者仅需关注APP的UI和UE设计即可，而相对复杂的协议与错误处理等事项可忽略。

机智云目前提供3套SDK：iOS平台原生SDK、Android平台原生SDK、APICloud跨平台SDK。开发者可以根据项目需要自行选择，其中APICloud版本SDK可以用H5技术一次开发，同时适配iOS和Android两个平台。

 ![@机智云SDK功能](./机智云SDK功能.png)

 
## 2.	机智云APP开源框架
为了进一步降低开发者的开发难度，机智云推出了APP开源框架。在框架中，已经模块化集成了如下功能：

1）用户部分：用户注册，找回密码、第三方登录（微信登录、QQ登录）用户登录：包括云端用户登录，第三方登录（微信登录、QQ登录）
2）配置设备入网（Arilink+SoftAP）
3）设备发现，列表展示
4）消息推送：极光推送、百度推送
5）自定义皮肤

APP开源框架将各个模块独立成包，开发者如果想了解其中某一个模块的实现代码与流程，直接参考框架代码即可。下面就将如何使用机智云开源框架快速开发一个APP做详细的讲解。

# 准备工作
## 1.	创建产品并定义数据点
 ![@创建产品](./创建产品.png)

 
![@创建数据点](./创建数据点.png)


## 2.	为产品创建安卓和iOS应用
在服务栏目下，点击“应用配置”，分别添加安卓与iOS应用。
 
![@添加应用](./添加应用.png)

 
![@添加Android和iOS应用](./添加Android和iOS应用.png)

## 3.	App ID与App Secret含义与作用
**App ID：**应用标识码，当开发者需要为一款智能产品开发应用（包括iOS、Android、Web应用等）时，在机智云开发者中创建应用的时候，后台会自动生成一个AppID，并与此设备进行关联。应用开发时需要填入此AppID。在APP注册的所有用户绑定在该Appid下。

**App Secret：**App ID的验证密钥。

如下图所示，为APPID在开发APP过程中的作用。
 
![@AppID的作用](./AppID的作用.png)

# 10分钟部署调试机智云APP开源框架
## 1.	下载安卓APP开源框架
APP开源框架编译环境：Eclipse

安卓APP开源框架下载地址：
https://git.oschina.net/dantang/GizOpenSource_AppKit_Android
 
![@Android下载地址](./Android下载地址.png)

## 2.	导入到Eclipse工程
导入过程中可能会出现如下错误
 ![](./错误码.png)

此时需要将proguard-project中的target版本修改为eclipse对应的安卓SDK版本即可。
 
![Alt text](./修改proguard-project中的targe.png)

## 3.	开源框架包结构说明
如下图所示，将Package Presentation设置为Hierarchical
 
![Alt text](./设置Package Presentation.png)

此时可以清晰的看到整个工程的目录结构，如图所示，机智云开源框架将每一个模块都独立为Package， Package与Package之间进行最大程度解耦。在开发过程中，如果想删除某一功能，比如不想使用第三方登录，则可以直接将“ThirdAccountModule”包直接删除即可，不会对其他包产生影响。
 
![Alt text](./目录解释说明.png)

## 4.	修改UIConfig.json文件
在上面所列的文件中。assets目录下的UIConfig.json文件是一个全局配置文件，在这里可以设置工程的配置信息，逐一介绍：
- **app_id：**机智云 app id
- **app_secret：**机智云 app secret
- **product_key：**机智云 product key
- **wifi_type_select：**默认配置模块wifi模组选择功能是否开启
- **tencent_app_id：**qq登录 app id
- **wechat_app_id：**微信登录 app id
- **wechat_app_secret：**微信登录 app secret
- **push_type：**推送类型 【0：关闭，1：极光，2：百度】
- **bpush_app_key：**百度推送 app key
- **openAPI_URL：**openAPI 域名及端口，格式：“api.gizwits.com:80”，不写端口默认80
- **site_URL：**site 域名及端口，格式：“site.gizwits.com:80”，不写端口默认80
- **push_URL：**推送绑定服务器 域名及端口，格式：“push.gizwits.com:80”，不写端口默认80
- **buttonColor：**按钮颜色
- **buttonTextColor：**按钮文字颜色
- **navigationBarColor：**导航栏颜色
- **navigationBarTextColor：**导航栏文字颜色
- **configProgressViewColor：**配置中界面 progress view 颜色
- **addDeviceTitle：**添加设备界面 导航栏标题文字

在机智云官网上分别找到产品的Product Key、App ID与App Secret分别填入json文件中对应的位置，如下图所示：
 
![Alt text](./修改信息.png)

## 5.	APP部署运行
正确填写Product Key、App ID与App Secret后，工程就可以部署运行了，
 
![Alt text](./app.png)

 
![Alt text](./app2.png)

## 6.	注册新用户
 
![Alt text](./用户注册.png)

## 7.	登录用户
注册成功后，APP会自动登录，此时将跳转到“我的设备”界面

 
![Alt text](./用户登录.png)

## 8.	启动虚拟设备并显示二维码
打开开发者中心对应产品的“虚拟设备”栏目。
虚拟设备：云端自动生成的一个仿真设备，可模拟真实设备上报数据的行为。在实体设备还未开发完成的情况下，开发者可以利用机智云提供的虚拟设备工具进行APP调试，测试远程控制设备的功能。
 
![@虚拟设备](./虚拟设备.png)


 
![@开启虚拟设备](./开启虚拟设备.png)

## 9.	扫码绑定设备
打开左上角菜单，点击扫描绑定设备
 
![ ](./扫码绑定设备.png)

 
![Alt text](./扫码绑定设备2.png)


扫码成功后，会跳转回到“我的设备”界面，此时界面中会出现刚才扫描的“虚拟设备”
 
![Alt text](./设备列表.png)

## 10.	点击“智能灯”，进入控制页面
 
![Alt text](./控制页面.png)

进入控制页面，可以发现，控制页面为一个空白的页面。机智云开源框架为了让开发者快速开发APP，已将用户登录，设备发现，设备配网等功能做成了各个标准模块，仅保留控制页面让开发者自行开发设计，节省了开发者的时间。下章节，将示例如何快速开发一个简单好看的控制页面。

# 控制页面快速开发设计
## 1.	控制页面代码预览
依次打开ControlModule -> GosDeviceControlActivity.java，可以看到，整个控制页面非常简单，就只有一个TextView将设备的mac地址显示出来。
 
![Alt text](./代码预览.png)

## 2.	页面UI设计
根据创建的产品“智能灯”，想实现的UI效果如下：
![Alt text](./UI效果.png)

点击页面中间灯的控件，APP下发命令，控制灯的开关，并将灯的图片显示为开启状态。关闭的时候显示为关闭。

## 3.	页面布局代码开发
### 导入图片文件
![Alt text](./倒入图片.png)

将表示智能灯开关状态的图片拷贝到drawable目录下，如下图所示：
 
![Alt text](./drawable目录.png)


### 添加Button控件
**1）打开控制页面对应的布局文件“activity_gos_device_control.xml”**
 
![Alt text](./页面对应的布局文件.png)

**2）添加Button控件**
如图所示，将控制页面中多余控件删除，添加一个Button控件
![Alt text](./添加Button控件.png)

**3）使用selector来对Button控件背景进行控制**
在drawable文件夹下新建一个selector文件，如图所示：
 
![Alt text](./新建selector.png)

在btn_light_onoff_selector.xml添加背景切换代码：
 
![Alt text](./添加背景切换代码.png)

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
### 4.1.在GosDeviceControlActivity定义相关变量
根据数据点的标识名定义常量：LIGHT_SWITCH
 
![Alt text](./定义变量.png)

1）	定义开关灯Button控件

2）	定义设备监听器deviceListener，重写接收数据的回调
 
```java
public class GosDeviceControlActivity extends GosBaseActivity {

	/** The GizWifiDevice device */
	private GizWifiDevice device;

	/** The ActionBar actionBar */
	ActionBar actionBar;

	/** 数据点标识名 */
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
				boolean status = (Boolean) map.get(LIGHT_SWITCH);
				// 根据设备上报的值更改按钮的图标
				btnLightSwitch.setSelected(status);
			}
		}
	};

```

### 4.2.	初始化变量

```java
@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_gos_device_control);
		initDevice();
		// 设置ActionBar
		setActionBar(true, true, device.getProductName());
		initView();
	}

	private void initView() {
		btnLightSwitch = (Button) findViewById(R.id.btn_light_onoff);
		btnLightSwitch.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				controlLight();
			}
		});
	}

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

``` 

1）在initDevice()中找到设备，并设置设备的监听器

2）在initView()中找到Button控件，并设置点击事件监听器

```java
private void initView() {
btnLightSwitch = (Button) findViewById(R.id.btn_light_onoff);
btnLightSwitch.setOnClickListener(new OnClickListener() {
	@Override
	public void onClick(View v) {
			controlLight();
	}
});
}

private void initDevice() {
Intent intent = getIntent();
device = (GizWifiDevice) intent.getParcelableExtra("GizWifiDevice");
device.setListener(deviceListener);
Log.i("Apptest", device.getDid());
}

```

### 4.3.	实现控制逻辑
如图所示，在controlLight()方法中添加如下代码：
 
```java
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
	 * @param onOff
	 *            true表示开灯，false表示关灯
	 */
private void sendCommand(boolean onOff) {
		int sn = 5;
		ConcurrentHashMap<String, Object> command = new ConcurrentHashMap<String, Object>();
		command.put(LIGHT_SWITCH, onOff);
		device.write(command, sn);
}
```
### 4.4.	实现接收数据逻辑
如图所示，在设备监听器变量中实现监听回调，并控制开关图片的切换。
 

```java
/** 设备监听器 */
private GizWifiDeviceListener deviceListener = new GizWifiDeviceListener() {
	// 接收数据回调
public void didReceiveData(GizWifiErrorCode result, GizWifiDevice device,
				ConcurrentHashMap<String, Object> dataMap, int sn) {
			// 已定义的设备数据点，有布尔、数值和枚举型数据
	if (dataMap.get("data") != null) {
		ConcurrentHashMap<String, Object> map = (ConcurrentHashMap<String, Object>) dataMap.get("data");
		// 根据标识名，在回调的map中找到设备上报的值
		boolean status = (Boolean) map.get(LIGHT_SWITCH);
		// 根据设备上报的值更改按钮的图标
		btnLightSwitch.setSelected(status);
	}
}
};
```

### 4.5.	部署调试
完成上述代码编写之后，就可以部署到手机中测试控制结果了。

**下发命令**

如图所示，APP部署到手机上后，进入到控制页面，如下图所示：
 
![Alt text](./下发命令app 页面.png)

点击app中灯的图标，APP将下发控制命令，此时APP的按钮图标将变为开灯状态。
 
![Alt text](./app亮灯.png)

此时可以在云端虚拟设备的通信日志中看到app下发的控制命令，如下图：
 
![Alt text](./app下发控制指令.png)

**设备主动上报数据**
如图所示，在虚拟设备中，将开关的值改为“0”，点击下面的推送，此时可以看到通信日志中会有一条记录“虚拟设备上报数据”，表示设备上报数据成功了。
 
![Alt text](./上报数据.png)

此时APP的控制页面中，灯的按钮马上变成了关灯状态，表示APP成功收到了设备的上报数据。
 
![Alt text](./关灯.png)
