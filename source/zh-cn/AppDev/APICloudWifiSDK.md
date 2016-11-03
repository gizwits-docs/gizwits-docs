title: APICloud SDK使用指南
---

# 概述

机智云gizWifiSDK主要帮助开发者通过sdk接口调用的方式维护用户系统，用户与设备的绑定关系，设备的配置上线以及设备状态的获取和控制指令的发送。

# APICloud机智云模块更新说明

### 当前版本变更内容：

1、版本号为1.3.0，原生SDK为2.04.04版本

2、SDK启动接口：startWithAppID，增加域名和过滤productKey参数：

3、设备配置接口：setDeviceOnboarding，模组类型参数增加了一个自定义枚举值，用于开发者使用自己的配置库

4、定时任务接口将在下一个新版本中有接口更新发布，现有定时任务接口已被废弃，不推荐使用

### 当前版本对1.2.4之前版本的兼容：

我们对1.2.4之前版本的一些接口做了兼容，这些接口在当前版本中已被废弃。已经使用了这些接口的App不需要修改接口调用，但要注意以下三点修改：

一、新版gizWifiSDK模块上报设备数据点时，布尔类型的数据点值是严格按照json格式定义返回true或false，而旧版gizWifiSDK模块返回的是1或0。App在接收布尔类型数据点时，请修改变量接收方式，使用布尔类型接收。

二、新版gizWifiSDK模块除以下废弃接口外的所有接口，返回值均使用了新错误码值。App可以通过新旧错误码转换函数errorCodeConversion，将新错误码值转换为旧错误码值。errorCodeConversion函数说明在Constant页面的新旧错误码对照表后。

三、接口执行成功时返回的错误码0对应的描述，msg字段，均统一使用了新错误码值对应的字符串"GIZ_SDK_SUCCESS"。

此外，SDK对下发的设备操作指令，将严格按照Json格式限制数据类型。例如，如果设备的数据点定义的是布尔类型，指令下发时只能发true/false，如果发的是1/0或者"1"/"0"，都会拒绝下发。

### 废弃接口与新接口功能对比

废弃接口（即兼容接口）不强制要求更换，已经开发的app还可以继续使用，但新开发的app建议直接使用新接口。不关心废弃接口的开发者，请跳过本节直接看接口说明。

枚举值变更：

GizWifiConfigureMode 

    变更说明：枚举值的起始序号统一从0开始。见Constant页相应表格
    变更方式：原来的softap模式为1，变更为0；原来的airlink模式为2，变更为1

废弃接口：

gizWifiSDK类

* setDeviceWifi

        废弃说明：更换接口名称
        替代接口：setDeviceOnboarding，参数mode枚举值有变更（0 = GizWifiSoftAP、1 = GizWifiAirLink）

* updateDeviceFromServer

        废弃说明：机智云SDK模块会自动下载并更新设备的配置文件，App可以不再依赖这个接口了
        替代接口：无。

* bindDevice

        废弃说明：出于设备安全考虑，推荐使用更安全的设备绑定接口。机智云SDK模块会对已登录的局域网设备做自动绑定，因此对于局域网设备，App不需要调用绑定接口了
        替代接口：bindRemoteDevice，需要产品productKey和对应的productSecret，以及设备mac才能绑定

* registerUserByPhoneAndCode
* registerUserByEmail

        废弃说明：接口合并
        替代接口：registerUser

* transAnonymousUserToNormalUser
* transAnonymousUserToPhoneUser

        废弃说明：接口合并
        替代接口：transAnonymousUser

* changeUserPasswordByCode
* changeUserPasswordByEmail

        废弃说明：接口合并
        替代接口：resetPassword

* changeUserEmail
* changeUserPhone
* changeUserAdditionalInfo
    
        废弃说明：接口合并。这三个接口已删除
        替代接口：resetPassword


gizWifiDevice类、GizWifiCentralControlDevice类

* login
* disconnect

        废弃说明：变更设备登录机制。机智云SDK模块已支持设备自动登录和掉线后自动恢复，成功时会上报设备的当前状态
        替代接口：setSubscribe

* getIsBind

        废弃说明：优化接口使用方式。机智云SDK模块能够判断出设备的绑定状态，App不需要传递其他参数
        替代接口：getDeviceInfo方法的isBind字段


弃用的字段：

* passcode 

        弃用说明：出于安全考虑不再返回真实有效的设备密码字符串

        相关接口：
        GizWifiSDK类getBoundDevices接口返回值的devices信息
        GizWifiDevice类的getDeviceInfo接口返回值的devices信息
        GizWifiCentralControlDevice类的getDeviceInfo接口返回值的devices信息

* isOnline
* isConnected
    
        弃用说明：字段含义合并，由netStatus替代。
                netStatus为2 等同于 isConnect为true
                netStatus为0或1 等同于 isConnect为false
                netStatus为0 等同于 isOnline为false
                netStatus为1或2 等同于 isOnline为true
        相关接口：
        GizWifiSDK类getBoundDevices接口返回值的devices信息
        GizWifiDevice类的registerNotifications接口返回值
        GizWifiCentralControlDevice类的registerNotifications接口返回值
        GizWifiCentralControlDevice类的getSubDevices接口返回值
        GizWifiCentralControlDevice类的addSubDevice接口返回值
        GizWifiCentralControlDevice类的deleteSubDevice接口返回值
        GizWifiSubDevice类的registerNotifications接口返回值
        GizWifiSubDevice类的getDeviceInfo接口返回值


* cmd
* entity0

        弃用说明：优化指令下发的参数格式。指令下发时，直接传数据点名称和值即可，数据上报时，也直接上报数据点名称和值
        相关接口：
        GizWifiDevice类的write接口下发参数
        GizWifiCentralControlDevice类的write接口下发参数
        GizWifiSubDevice类的write接口下发参数

* status

        弃用说明：优化数据上报格式，直接上报数据点名称和值
        相关接口：
        GizWifiDevice类的registerNotifications接口返回值
        GizWifiCentralControlDevice类的registerNotifications接口返回值
        GizWifiSubDevice类的registerNotifications接口返回值

        GizWifiDevice类的write接口返回值
        GizWifiCentralControlDevice类的write接口返回值
        GizWifiSubDevice类的write接口返回值

枚举值变更：

* GizWifiConfigureMode 

       变更说明：枚举值的起始序号统一从0开始。见Constant页相应表格
       变更方式：原来的softap模式为1，变更为0；原来的airlink模式为2，变更为1

# 接口说明

## gizWifiSDK类接口

机智云 Wi-Fi SDK 的基础类。该类提供了SDK初始化、基本设置、用户管理、设备管理的基本接口。


## startWithAppID<div id="a1"></div>
 
启动 SDK。 注意，该接口执行成功后才能正常执行其他接口功能。SDK启动在Android平台上可能会耗费1～2秒的时间，建议App开发者在收到启动ret返回8316(SDK启动成功)时或者启动后延时2秒左右再调用其他接口。

startWithAppID({params}, callback(ret, err))

### params
appID:

* 类型： 字符串
* 默认值：无
* 描述：开发者在[机智云网站](http://site.gizwits.com)申请的应用标识。

cloudServiceInfo:

* 类型： 数字类型数组
* 默认值：0
* 描述：要切换的服务器域名信息。使用机智云生产云服务的开发者不用传值，需要连接其他云服务的要传值。域名信息不指定端口则SDK使用默认服务端口，此时这样写域名：api.gizwits.com。若需要指定特殊端口，需同时指定 Http 和 Https 端口，此时这样写域名：api.gizwits.com:81&8443
* 内部字段

    {
        openAPIInfo: 	// api服务域名
        siteInfo:       // site服务域名
        pushInfo:       // 推送服务域名
    }


specialProductKeys:

* 类型： 字符串数组
* 默认值：无
* 描述：要过滤的设备 productKey 列表。如果希望返回所有能发现的设备则不需要传参。指定了之后,SDK 将只返回过滤后的设备

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            errorCode: 8316,	// SDK启动成功，数字类型
            msg:                // 成功消息的描述，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }


### 示例代码
   

```
 // 不指定域名和过滤productKey，参考代码如下：
	var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.startWithAppID({"appID": "your_app_id"}, function(ret, err) {
		alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

    // 要指定cloudServiceInfo和过滤的productKey，则参考代码如下：
    var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.startWithAppID({"appID": "your_app_id", "specialProductKeys": ["your_product_key"], "cloudServiceInfo": {"openAPIInfo": "xxx.xxxx.com", "siteInfo": "xxx.xxxx.com"}}, function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
    });
```

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## registerNotifications<div id="a2"></div>
 
注册 SDK 事件通知。通知的事件包括SDK启动失败或成功、设备列表变化上报等

registerNotifications({params}, callback(ret, err))

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            GizEventSDK: 		// SDK事件
            {errorCode: xxx, msg: "xxx"},   // 事件码（见GizWifiErrorCode，数字类型），事件描述（字符串类型）
            GizEventDevice:     // 设备异常事件
            {errorCode: xxx, msg: "xxx"},   // 事件码（见GizWifiErrorCode，数字类型），事件描述（字符串类型）
            GizEventM2MService: // M2M异常事件
            {errorCode: xxx, msg: "xxx"},   // 事件码（见GizWifiErrorCode，数字类型），事件描述（字符串类型）
            GizEventToken":     // Token失效
            {errorCode: xxx, msg: "xxx"},   // 事件码（见GizWifiErrorCode，数字类型），事件描述（字符串类型）
            devices: [{			// 设备数组（以下字段是设备对象信息），数组类型
                mac:			// 设备MAC地址，字符串类型
                did:  			// 设备唯一标识，字符串类型
                ip:				// 设备IP地址，字符串类型
                productKey:		// 设备的产品识别码，字符串类型
                productName:	// 设备的产品名称，字符串类型
                remark:			// 设备备注信息，字符串类型
                alias:			// 设备别名，字符串类型
                type:			// 设备类型（见枚举定义GizWifiDeviceType），数字类型
                netStatus:		// 设备网络状态（见枚举定义GizWifiDeviceNetStatus），数字类型
                isLAN:			// 设备是否是局域网设备，布尔类型
                isBind:			// 设备是否已绑定，布尔类型
                isDisabled:		// 设备是否已在云端注销，布尔类型
                isProductDefined:  // 设备是否定义了数据点，布尔类型
                isSubscribed:	// 设备是否已订阅，布尔类型
            }]
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }


### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.registerNotifications(function(ret, err) {
		alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## getVersion<div id="a3"></div>

获取SDK版本号

getVersion(callback(ret, err))

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            version:	// SDK版本号，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.getVersion(function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## setLogLevel<div id="a4"></div>

设置 SDK 日志。
setLogLevel({params})

### params
logLevel:

* 类型： 数字类型，见枚举定义GizLogPrintLevel
* 默认值：3，为详细日志输出
* 描述：SDK日志输出级别

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.setLogLevel({"logLevel": 3});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## disableLAN<div id="a5"></div>
 
禁用小循环

disableLAN({params}, callback(ret, err))

### params
disabled:

* 类型： 布尔类型
* 默认值：false，开启
* 描述：可禁用局域网下设备发现、设备控制等小循环下的功能

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            errorCode: 0,	// 执行成功，数字类型
            msg:            //成功消息的描述，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }


### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.disableLAN({"disabled": true}, function(ret, err) {
		alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本

## setCloudService<div id="a6"></div>
 
切换服务域名

setCloudService({params}, callback(ret, err))

### params
openAPIDomain:

* 类型：字符串类型
* 默认值：无
* 描述：openAPI服务域名

openAPIPort:

* 类型：数字类型
* 默认值：无
* 描述：openAPI服务端口

siteDomain:

* 类型：字符串类型
* 默认值：无
* 描述：site服务域名

sitePort:

* 类型：数字类型
* 默认值：无
* 描述：site服务端口

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            openAPIDomain:	// api域名，字符串类型
            openAPIPort":	// api端口，数字类型
            siteDomain:		// site域名，字符串类型
            sitePort: 			// site端口，数字类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }


### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.setCloudService({
		"openAPIDomain": "your_api_domain", 
		"openAPIPort": your_api_port, 
		"siteDomain": "your_site_domain", 
		"sitePort": your_site_port
	}, function(ret, err) {
		alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## getListInfo<div id="a7"></div>

获取SDK版本号

getListInfo(callback(ret, err))

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段
        {
            devices: [{			// 设备数组（以下字段是设备对象信息），数组类型
                mac:			// 设备MAC地址，字符串类型
                did:  			// 设备唯一标识，字符串类型
                ip:				// 设备IP地址，字符串类型
                productKey:		// 设备的产品识别码，字符串类型
                productName:	// 设备的产品名称，字符串类型
                remark:			// 设备备注信息，字符串类型
                alias:			// 设备别名，字符串类型
                type:			// 设备类型（见枚举定义GizWifiDeviceType），数字类型
                netStatus:		// 设备网络状态（见枚举定义GizWifiDeviceNetStatus），数字类型
                isLAN:			// 设备是否是局域网设备，布尔类型
                isBind:			// 设备是否已绑定，布尔类型
                isDisabled:		// 设备是否已在云端注销，布尔类型
                isProductDefined:  // 设备是否定义了数据点，布尔类型
                isSubscribed:	// 设备是否已订阅，布尔类型
            }]
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.getListInfo(function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## getPhoneSSID<div id="a8"></div>

获取手机当前Wifi的SSID

getPhoneSSID(callback(ret, err))

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            SSID:	// 手机当前wifi的SSID，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }


### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.getPhoneSSID(function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## setDeviceOnboarding<div id="a9"></div>
 
配置设备路由。设备要能连接到WiFi网络，需要先把设备配置到WiFi路由器上。配置时，需要给设备发送要配置的路由SSID和密码。

设备配置支持两种方式：SoftAP方式、AirLink方式。在设备上按不同的按键，可以使设备进入对应的配置模式。详细的操作方式，请访问[机智云网站](http://site.gizwits.com/zh-cn/document/gokit/i_01_stared/)。

进行 SoftAP 配置时，设备要处于 softap 模式。此时模组会产生一个热点名称，手机 wifi 必须连接此热点后才可以配置。如果是机智云提供的固件，模组热点名称前缀为"XPG-GAgent-"，密码为"123456789"。设备处于 airlink 模式时，手机随时都可以开始配置。但无论哪种配置方式，设备上线时，手机要连接到配置的局域网 wifi 上，才能够确认设备已配置成功。设备配置成功时，在回调中会返回设备 mac 地址。如果设备重置了，设备did可能要在设备搜索回调中才能获取。

setDeviceOnboarding({params}, callback(ret, err))

### params

ssid:

* 类型： 字符串
* 默认值：无
* 描述：要配置的Wifi SSID

key:

* 类型： 字符串
* 默认值：无
* 描述：要配置的 Wifi 密码

mode:

* 类型： 数字类型
* 默认值：无
* 描述：设备配置方式（见 GizWifiConfigureMode 枚举定义）

softAPSSIDPrefix:

* 类型： 字符串
* 默认值：无
* 描述：SoftAPMode 模式下SoftAP 的 SSID 全名。机智云的GoKit，默认前缀为"XPG-GAgent-"

timeout:

* 类型： 数字类型
* 默认值：30
* 描述：配置超时时间。超时时间建议设置为60秒

gagentTypes:

* 类型： 数字类型数组
* 默认值：4
* 描述：模组类型（见 GAgentType 枚举定义），若不指定此参数则默认配置乐鑫模组。GizWifiGAgentType定义了 SDK 支持的所有模组类型。GizWifiGAgentType还定义了一个GizGAgentOther枚举值，用于开发者使用自己的配置库进行设备配置，此时参数传GizGAgentOther即可

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            device:{		// 配置成功的设备，以下字段是设备信息：
                "mac":		// 设备mac
       			"did":		// 设备did
       			"productKey":// 设备类型标识码
       		}
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }


### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
    // softap配置
	gizWifiSDK.setDeviceOnboarding({
        "ssid": "your_ssid",
        "key": "your_key",
        "mode": 0,
        "softAPSSIDPrefix": "your_prefix",
        "timeout": 60
	}, function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

    // airlink配置乐鑫模组
    GizGAgentESP = 4;
    gizWifiSDK.setDeviceOnboarding({
        "ssid": "your_ssid",
        "key": "your_key",
        "mode": 1,
        "gagentTypes": [GizGAgentESP],
        "timeout": 60
    }, function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
    });

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## getSSIDList<div id="a10"></div>

获取设备热点列表。设备 wifi 模组处于 SoftAP 热点模式时，可以获取设备搜索到的 WiFi 热点列表。此接口需要手机当前 Wifi 连上设备模组的 SoftAP 热点后才能工作。

getSSIDList(callback(ret, err))


### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            wifiSSIDs:[{   	// WiFi热点列表，以下字段是热点信息：
       			"ssid":		// WiFi的ssid
       			"rssi":		// WiFi的信号强弱
       		}]
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }


### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.getSSIDList(function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = "  JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## getBoundDevices<div id="a11"></div>
 
获取绑定设备列表。在不同的网络环境下，有不同的处理：
当手机能访问外网时，该接口会向云端发起获取绑定设备列表请求；
当手机不能访问外网时，局域网设备是实时发现的，但会保留之前已经获取过的绑定设备；
手机处于无网模式时，局域网未绑定设备会消失，但会保留之前已经获取过的绑定设备；

getBoundDevices({params}, callback(ret, err))

### params
uid:

* 类型： 字符串
* 默认值：无
* 描述：用户登录后获取到的uid。uid 和 token 都不传时，将只会得到小循环设备

token:

* 类型： 字符串
* 默认值：无
* 描述：用户登录后获取到的token。uid 和 token 都不传时，将只会得到小循环设备

specialProductKeys:

* 类型： 字符串数组
* 默认值：无
* 描述：指定过滤的产品类型识别码，可同时指定多个要过滤的 Product Key

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            devices: [{			// 设备数组（以下字段是设备对象信息），数组类型
                mac:			// 设备MAC地址，字符串类型
                did:  			// 设备唯一标识，字符串类型
                ip:				// 设备IP地址，字符串类型
                productKey:		// 设备的产品识别码，字符串类型
                productName:	// 设备的产品名称，字符串类型
                remark:			// 设备备注信息，字符串类型
                alias:			// 设备别名，字符串类型
                type:			// 设备类型（见枚举定义GizWifiDeviceType），数字类型
                netStatus:		// 设备网络状态（见枚举定义GizWifiDeviceNetStatus），数字类型
                isLAN:			// 设备是否是局域网设备，布尔类型
                isBind:			// 设备是否已绑定，布尔类型
                isDisabled:		// 设备是否已在云端注销，布尔类型
                isProductDefined:  // 设备是否定义了数据点，布尔类型
                isSubscribed:	// 设备是否已订阅，布尔类型
            }]
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
    	gizWifiSDK.getBoundDevices({
    		"uid": 'your_uid',
    		"token": 'your_token',
    		"specialProductKeys": ['your_product_key']
     	}, function (ret1, err1) {
    		alert("ret1 = " + JSON.stringify(ret1) + "err1 = " + JSON.stringify(err1))
    	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## bindRemoteDevice<div id="a12"></div>

绑定远端设备到云端

bindRemoteDevice({params}, callback(ret, err))


### params

uid:

* 类型： 字符串
* 默认值：无
* 描述：用户登录后获取到的uid。

token:

* 类型： 字符串
* 默认值：无
* 描述：用户登录后获取到的token。

mac:

* 类型： 字符串
* 默认值：无
* 描述：待绑定设备的mac

productKey:

* 类型： 字符串
* 默认值：无
* 描述：待绑定设备的productKey。

productSecret:

* 类型： 字符串
* 默认值：无
* 描述：待绑定设备的productSecret

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            did:  // 设备唯一标识，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
    	gizWifiSDK.bindRemoteDevice({
		"uid": 'your_uid',
		"token": 'your_token',
		"mac": 'your_device_mac',
		"productKey": 'your_product_key',
		"productSecret": 'your_product_secret'
    	}, function (ret, err) {
    		alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
    	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## unbindDevice<div id="a13"></div>

把设备从云端解绑。用户登录后，可以将已绑定的设备与云端自己的账户解绑。

unbindDevice({params}, callback(ret, err))

### params
uid:

* 类型： 字符串
* 默认值：无
* 描述：用户登录后获取到的uid。

token:

* 类型： 字符串
* 默认值：无
* 描述：用户登录后获取到的token。

did:

* 类型： 字符串
* 默认值：无
* 描述：设备唯一标识。

### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            did:  // 设备唯一标识，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.unbindDevice({
		"uid": 'your_uid',
		"token": 'your_token',
		"did": 'your_device_id'	
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本

## userLoginAnonymous<div id="a14"></div>

匿名登录。匿名方式登录，不需要注册用户账号

userLoginAnonymous(callback(ret, err))


### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            uid:  	// 用户uid，字符串类型
            token:	// 登录会话token，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }


### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.userLoginAnonymous(function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});


### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## userLogin<div id="a15"></div>
 
用户登录。需使用注册成功的用户名、密码进行登录，可以是手机用户名、邮箱用户名或普通用户名

userLogin({params}, callback(ret, err))

### params
userName:

* 类型： 字符串
* 默认值：无
* 描述：要登录的用户名。

password:

* 类型： 字符串
* 默认值：无
* 描述：要登录的密码。

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            uid:  	// 用户uid，字符串类型
            token:	// 登录会话token，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.userLogin({
		"userName": 'your_user_name',
	    	"password": 'your_password'
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	})

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本


## userLoginWithThirdAccountType<div id="a16"></div>

第三方账号登录。第三方账号支持百度、新浪、QQ，需要通过第三方的 shareSDK 工具或各自对应的SDK，获取到 uid 和 token 之后才可以使用此接口。

userLoginWithThirdAccountType({params}, callback(ret, err))

### params

uid: 登录第三方账号之后得到的uid

* 类型： 字符串
* 默认值：无
* 描述：要登录的用户id

token: 登录第三方账号之后得到的token

* 类型： 字符串
* 默认值：无
* 描述：要登录的密码

thirdAccountType:

* 类型： 数字类型
* 默认值：无
* 描述：第三方账号类型（见 GizThirdAccountType 枚举定义）

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            uid:  	// 登录机智云后得到的 uid，字符串类型
            token:	// 登录机智云后得到的 token，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.userLoginWithThirdAccountType({
	        "thirdAccountType": 0,
	        "uid": 'your_third_uid',
	        "token": 'your_third_token'
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});


### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## requestSendVerifyCode<div id="a17"></div>

通过App secret和手机号请求短信验证码。

requestSendVerifyCode({params}, callback(ret, err))

### params
appSecret: 

* 类型： 字符串
* 默认值：无
* 描述：应用的 secret 信息，从 site.gizwits.com 中可以看到

phone: 

* 类型： 字符串
* 默认值：无
* 描述：手机号

### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            errorCode: 0, 	// 验证码获取成功，数字类型
            msg: 			// 消息描述，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.requestSendVerifyCode({
	        "appSecret": 'your_app_secret',
	        "phone": 'your_phone_number'
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本


## getCaptchaCode<div id="a18"></div>

通过 App Secret 获取图片验证码。

getCaptchaCode({params}, callback(ret, err))

### params

appSecret: 

* 类型： 字符串
* 默认值：无
* 描述：应用的 secret 信息，是与 AppID 对应的应用签名字符串，从 site.gizwits.com 中可以看到

### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            token: 			// 图片验证码 token，图片验证码token在1小时后过期。字符串类型
            captchaId:		// 图片验证码 id，图片验证码5分钟后过期。字符串类型
            captchaURL:		// 图片验证码 url，图片验证码 url 在使用后过期。字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.getCaptchaCode({
	        "appSecret": 'your_app_secret'
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本

## requestSendPhoneSMSCode<div id="a19"></div>

通过图形验证码获取手机短信验证码

requestSendPhoneSMSCode({params}, callback(ret, err))

### params
token: 

* 类型： 字符串
* 默认值：无
* 描述：验证码 token，通过 getCaptchaCode 获取

captchaId: 

* 类型： 字符串
* 默认值：无
* 描述：验证码 id，通过 getCaptchaCode 获取

captchaCode: 

* 类型： 字符串
* 默认值：无
* 描述：验证码，来自图片的验证内容

phone: 

* 类型： 字符串
* 默认值：无
* 描述：手机号

### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            errorCode: 0, 	// 验证码获取成功，数字类型
            msg: 			// 消息描述，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.requestSendPhoneSMSCode({
	        "token": 'your_captcha_code_token',
	        "captchaId": 'your_captcha_code_id',
	        "captchaCode": 'your_captcha_code',
	        "phone": 'your_phone_number'
	}, function(ret, err) {
	    alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本


## verifyPhoneSMSCode<div id="a20"></div>

验证手机短信验证码。注意，验证短信验证码后，验证码就失效了，无法再用于手机号注册

verifyPhoneSMSCode({params}, callback(ret, err))

### params
token: 

* 类型： 字符串
* 默认值：无
* 描述：验证码 token，通过 getCaptchaCode 获取

phoneCode: 

* 类型： 字符串
* 默认值：无
* 描述：手机短信中的验证码内容

phone: 

* 类型： 字符串
* 默认值：无
* 描述：手机号

### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            errorCode: 0,   // 验证码获取成功，数字类型
            msg:            // 消息描述，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.verifyPhoneSMSCode({
	        "token": 'your_captcha_code_token',
	        "phoneCode": 'your_phone_sms_code',
	        "phone": 'your_phone_number'
	}, function(ret, err) {
	    alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本


## registerUser<div id="a21"></div>

用户注册。需指定用户类型注册。手机用户的用户名是手机号，邮箱用户的用户名是邮箱、普通用户的用户名可以是普通用户名

registerUser({params}, callback(ret, err))

### params
userName: 

* 类型： 字符串类型
* 默认值：无
* 描述：用户名。

password: 

* 类型： 字符串类型
* 默认值：无
* 描述：密码。

verifyCode: 

* 类型： 字符串类型
* 默认值：无
* 描述：手机短信验证码。短信验证码注册后就失效了，不能被再次使用

accountType: 

* 类型： 字符串类型
* 默认值：无
* 描述：用户类型，详细见 GizUserAccountType 枚举定义。注册手机号时，此参数指定为手机用户，注册邮箱时，此参数指定为邮箱用户，注册普通用户名时，此参数指定为普通用户

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            uid:  	// 注册成功后返回的uid，字符串类型
            token:	// 注册成功后返回的token，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.registerUser({
		"userName": 'your_phone_number',
		"password": 'your_password',
		"verifyCode": 'your_verify_code',
		"accountType": 1
	}, function(ret, err) {
		alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本

## transAnonymousUser<div id="a22"></div>

匿名用户转换，可转换为手机用户或者普通用户。注意，待转换的帐号必须是还未注册过的

transAnonymousUser({params}, callback(ret, err))

### params
token: 

* 类型： 字符串
* 默认值：无
* 描述：用户登录或注册时得到的 token

userName: 

* 类型： 字符串
* 默认值：无
* 描述：待转换的普通账号或手机号

password: 

* 类型： 字符串
* 默认值：无
* 描述：转换后的帐号密码

verifyCode: 

* 类型： 字符串
* 默认值：无
* 描述：转换为手机用户时要使用的手机短信验证码

accountType: 

* 类型： 数值类型
* 默认值：无
* 描述：用户类型，详细见 GizThirdAccountType 枚举定义。待转换的用户名是手机号时，此参数指定为1，待转换用户名是普通账号时，此参数指定为0

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            uid:  	// 注册成功后返回的uid，字符串类型
            token:	// 注册成功后返回的token，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.transAnonymousUser({
	    "token": 'your_token',
	    "userName": 'your_phone_number',
	    "password": 'your_password',
	    "verifyCode": 'your_verify_code',
	    "accountType": 1
	}, function(ret, err) {
	    alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## resetPassword<div id="a23"></div>
 
重置密码

resetPassword({params}, callback(ret, err))

### params

userName: 

* 类型： 字符串
* 默认值：无
* 描述：待重置密码的手机号或邮箱

verifyCode: 

* 类型： 字符串
* 默认值：无
* 描述：重置手机用户密码时需要使用手机短信验证码

newPassword: 

* 类型： 字符串
* 默认值：无
* 描述：新密码

accountType: 

* 类型：数值类型
* 默认值：无
* 描述：用户类型，详细见 GizThirdAccountType 枚举定义。待重置密码的用户名是手机号时，此参数指定为手机用户，待重置密码的用户名是邮箱时，此参数指定为邮箱用户

### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            errorCode: 0	// 执行成功，数字类型
            msg:            // 错误描述，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.resetPassword({
		"userName": 'your_phone_number',
		"verifyCode": 'your_verify_code',
		"newPassword": 'your_new_password',
		"accountType": 1
	}, function(ret, err) {
		alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## changeUserPassword<div id="a24"></div>

修改用户密码

changeUserPassword({params}, callback(ret, err))

### params

token: 

* 类型： 字符串
* 默认值：无
* 描述：用户登录或注册时得到的 token

oldPassword: 

* 类型： 字符串
* 默认值：无
* 描述：旧密码

newPassword: 

* 类型： 字符串
* 默认值：无
* 描述：新密码

### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            errorCode: 0	// 执行成功，数字类型
            msg:            // 错误描述，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.changeUserPassword({
		"token": 'your_token',
		"oldPassword": 'your_old_password',
		"newPassword": 'your_new_password'
	}, function(ret, err) {
		alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本


## changeUserInfo<div id="a25"></div>

匿名用户转手机用户。手机匿名登录后，可以转换为手机用户，但需要先获取到手机验证码才可以转换。转换后，匿名用户已经绑定的设备，会迁移到转换后的用户账号下。

changeUserInfo({params}, callback(ret, err))

### params
token: 

* 类型： 字符串
* 默认值：无
* 描述：用户登录或注册时得到的 token

userName: 

* 类型： 字符串
* 默认值：无
* 描述：待修改的手机号或邮箱

verifyCode: 

* 类型： 字符串
* 默认值：无
* 描述：修改手机号时要使用的手机短信验证码

accountType: 

* 类型： 字符串
* 默认值：无
* 描述：用户类型，详细见 GizThirdAccountType 枚举定义。修改手机号时，accountType传1；修改普通用户名时，accountType传2；只修改个人信息时，accountType传0；同时修改用户名和个人信息时，可根据待修改的是手机号还是邮箱来指定

additionalInfo: 

* 类型： 字符串
* 默认值：无
* 描述：待修改的个人信息，详细见 GizUserInfo 类定义。如果只修改个人信息，需要指定token，username、code不用传
* 内部字段：
        {
    		"name": 		// 昵称，字符串类型
    		"gender":	// 性别，见UserGenderType枚举，数字类型
    		"birthday": 	// 生日，字符串类型
    		"address": 	// 住址，字符串类型
    		"remark": 	// 备注，字符串类型
        }


### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            errorCode: 0, 	// 转换成功，数字类型
            msg: 			// 消息描述，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	// 修改手机号
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.changeUserInfo({
		"token": 'your_token',
		"userName": 'your_phone_number',
		"verifyCode": 'your_verify_code',
		"accountType": 1
	}, function(ret, err) {
		alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本


## getUserInfo<div id="a26"></div>

获取用户信息。用户登录后，可以获取用户的个人信息。

getUserInfo({params}, callback(ret, err))

### params
token: 

* 类型： 字符串
* 默认值：无
* 描述：用户登录或注册时得到的 token

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            "uid": 			// 用户登录的uid，字符串类型
    		"username": 	// 用户名，字符串类型
    		"email": 		// email信息，字符串类型
    		"phone":		// 电话号码，字符串类型
    		"isAnonymous":	// 是否为匿名用户，布尔类型
    		"name": 		// 昵称，字符串类型
    		"gender":		// 性别，UserGenderType枚举类型
    		"birthday":		// 生日，字符串类型
    		"address":		// 住址，字符串类型
    		"remark": 		// 备注，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.getUserInfo({
		"token": 'your_token'
	},function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});
### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## getGroups<div id="a27"></div>

获取用户账号下的设备分组列表。需要先完成用户登录，才能获取设备分组列表。设备分组是指把中控网关管理的子设备分成多个组，便于批量执行子设备操作。一个设备分组只能添加一种类型的设备。常见的应用场景，比如睡前把房间里所有的开关灯关掉，把床头的两个落地灯调暗，这时就可以把子设备分成两个组，一个是开关灯组，一个是落地灯组。

getGroups({params}, callback(ret, err))

### params
uid: 

* 类型： 字符串
* 默认值：无
* 描述：用户登录或注册时得到的 uid

token: 

* 类型： 字符串
* 默认值：无
* 描述：用户登录或注册时得到的 token

specialProductKeys: 

* 类型： 字符串
* 默认值：无
* 描述：待筛选的组类型标识，字符串数组。不指定则不筛选

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            groups:[{  	// 组对象（以下字段是组对象信息），数组类型
                "gid":	// 组ID，字符串类型
            }]
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.getGroups({
        	"uid": 'your_uid',
        	"token": 'your_token',
        	"specialProductKeys": []
    },function(ret, err) {
        	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
    });

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本

## addGroup<div id="a28"></div>

添加设备分组。添加后返回当前的设备分组列表

addGroup({params}, callback(ret, err))

### params
uid: 

* 类型： 字符串
* 默认值：无
* 描述：用户登录或注册时得到的 uid

token: 

* 类型： 字符串
* 默认值：无
* 描述：用户登录或注册时得到的 token

productKey: 

* 类型： 字符串
* 默认值：无
* 描述：指定组类型标识

groupName: 

* 类型： 字符串
* 默认值：无
* 描述：指定组名称

specialDevices: 

* 类型： JSON对象
* 默认值：无
* 描述：指定加入组内的设备。字典数组，依赖键值 sdid（子设备标识码）、did（父设备标识码）。不加入设备则不传
* 内部字段

		{
			"mac":		// 子设备所属中控网关的mac地址，字符串类型
			"did": 		// 子设备所属中控网关的did，字符串类型
			"subDid":	// 子设备的did，字符串类型
		}


### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            groups:[{  	// 组对象（以下字段是组对象信息），数组类型
                "gid":	// 组ID，字符串类型
            }]
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.addGroup({
            	"uid": 'your_uid',
            	"token": 'your_token',
            	"productKey": 'your_group_type',
            	"groupName": 'your_group_name',
            	"specialDevices": []
        },function(ret, err) {
            	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err));
        });

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本


## removeGroup<div id="a29"></div>

删除设备分组。删除后返回当前的设备分组列表

removeGroup({params}, callback(ret, err))

### params
uid: 

* 类型： 字符串
* 默认值：无
* 描述：用户登录或注册时得到的 uid

token: 

* 类型： 字符串
* 默认值：无
* 描述：用户登录或注册时得到的 token

gid: 

* 类型： 字符串
* 默认值：无
* 描述：待删除的组id

### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            groups:[{  	// 组对象（以下字段是组对象信息），数组类型
                "gid":	// 组ID，字符串类型
            }]
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
	gizWifiSDK.removeGroup({
		"uid": 'your_uid',
            	"token": 'your_token',
	       "gid": 'your_group_id'
	}, function (ret, err) {
		alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本


## editGroup<div id="a30"></div>
 
编辑设备分组。编辑分组后返回当前的设备分组列表

editGroup({params}, callback(ret, err))

### params
uid: 

* 类型： 字符串
* 默认值：无
* 描述：用户登录或注册时得到的 uid

token: 

* 类型： 字符串
* 默认值：无
* 描述：用户登录或注册时得到的 token

gid: 

* 类型： 字符串
* 默认值：无
* 描述：待编辑组的组id

groupName: 

* 类型： 字符串
* 默认值：无
* 描述：待编辑组的组名称

specialDevices: 

* 类型： JSON对象
* 默认值：无
* 描述：要编辑的组内设备信息，依赖键值 sdid（子设备标识码）、did（父设备标识码）。不指定设备则不传
* 内部字段

		{
			"mac":		// 子设备所属中控网关的mac地址，字符串类型
			"did": 		// 子设备所属中控网关的did，字符串类型
			"subDid":	// 子设备的did，字符串类型
		}

### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            groups:[{  	// 组对象（以下字段是组对象信息），数组类型
                "gid":	// 组ID，字符串类型
            }]
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
	var gizWifiSDK = api.require('gizWifiSDK');
    	gizWifiSDK.editGroup({
		"uid": 'your_uid',
        	"token": 'your_token',
        	"gid": 'your_group_id',
        	"groupName": 'your_group_name',
        	"specialDevices": []
    	}, function (ret, err) {
        	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
    	});

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本


# gizWifiDevice类接口
机智云 Wi-Fi 的设备类。该类提供了设备登录，控制、接收设备信息功能。

## registerNotifications<div id="a31"></div>

注册设备状态变化通知。只要得到设备的mac地址和did，就可以注册设备通知。注册后，设备后续的登录状态变化、运行状态变化都会实时上报给APP。设备解绑或断开连接后，就不会再上报数据了。

registerNotifications({params}, callback(ret, err))

### params

device: 

* 类型： JSON对象
* 默认值：无
* 描述：要注册通知的设备对象，设备对象信息可以在获取设备列表时得到。
* 内部字段

		{
			"mac":		// 设备mac地址，字符串类型
			"did": 		// 设备did，字符串类型
		}

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            device: {   // 执行成功的设备对象（以下字段是设备对象信息），对象类型
                "mac":	// 设备mac地址，字符串类型
                "did": 	// 设备did，字符串类型
            }
            netStatus: // 设备在线状态（见枚举定义GizWifiDeviceNetStatus），数字类型
            data: {					// 设备状态，字符串类型
                "attrName":"attrValue",	// 数据点名称: 操作值
            }
            alerts: {					// 报警，数组类型
                "attrName": "attrValue"	// 数据点名称: 报警内容
            }   
            faults: {			 		// 故障，数组类型
                "attrName": "attrValue"	// 数据点名称: 故障内容
            }
            binary: 	// 二进制透传数据，base64编码字符串，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            device:{   	// 执行失败的设备对象（以下字段是设备对象信息），对象类型
                "mac":	// 设备mac地址，字符串类型
                "did": 	// 设备did，字符串类型
            }
        }

### 示例代码
	var gizWifiDevice = api.require('gizWifiDevice');
	gizWifiDevice.registerNotifications({
		"device": {
			"did": 'your_device_id',
			"mac": 'your_device_mac'
	     	}
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});


### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## setSubscribe<div id="a32"></div>

设备订阅或解除订阅。订阅了设备，表示使用者关心这个设备的消息推送。解除订阅，表示使用者不关心这个设备的消息推送。订阅设备后，SDK将自动登录和自动绑定设备。解除订阅后，设备连接将自动断开，但不会自动解绑。一般来说，设备订阅都会成功的，SDK会记住设备是否被订阅了。

setSubscribe({params}, callback(ret, err))

### params
subscribed: 

* 类型：布尔类型
* 默认值：无
* 描述：订阅或解除订阅。true表示订阅，false表示解除订阅

device: 

* 类型： JSON对象
* 默认值：无
* 描述：要登录的设备对象，设备对象信息可以在获取设备列表时得到。
* 内部字段

        {
			"mac":		// 设备mac地址，字符串类型
			"did": 		// 设备did，字符串类型
		}

### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            isSubscribed: 	// 设备是被订阅了还是被取消订阅了，布尔类型
            device: {   	// 执行成功的设备对象（以下字段是设备对象信息），对象类型
                "mac":      // 设备mac地址，字符串类型
                "did":      // 设备did，字符串类型
            }
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            device:{   	// 执行失败的设备对象（以下字段是设备对象信息），对象类型
                "mac":	// 设备mac地址，字符串类型
                "did": 	// 设备did，字符串类型
            }
        }

### 示例代码
	var gizWifiDevice = api.require('gizWifiDevice');
	gizWifiDevice.setSubscribe({
		"subscribed": true,
		"device": {
            "mac": 'your_device_mac',
            "did": 'your_device_id'
	  	}
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本 


## getDeviceStatus<div id="a33"></div>

获取设备状态。已订阅的设备变为可控状态后才能获取到状态，包括设备的运行状态、报警、故障、透传数据等。

getDeviceStatus({params}, callback(ret, err))

### params
device: 

* 类型： JSON对象
* 默认值：无
* 描述：要查询的设备对象，设备对象信息可以在获取设备列表时得到。
* 内部字段

		{
			"mac":		// 设备mac地址，字符串类型
			"did": 		// 设备did，字符串类型
		}

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            device:{   	// 操作命令执行成功的设备对象（以下字段是设备对象信息），对象类型
                "mac":	// 设备mac地址，字符串类型
                "did": 	// 设备did，字符串类型
            }
            "data": {					// 设备状态，对象类型
                "attrName":"attrValue",	// 数据点名称: 操作值。如果数据点是扩展类型，操作值为base64编码字符串
            }
            "alerts": {					// 报警，对象类型
                "attrName": "attrValue"	// 数据点名称: 报警内容
            }
            "faults": {			 		// 故障，对象类型
                "attrName": "attrValue"	// 数据点名称: 故障内容
            }
            "binary": 	// 二进制透传数据，base64编码字符串，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            device:{   	// 查询失败的设备对象（以下字段是设备对象信息），对象类型
                "mac":	// 设备mac地址，字符串类型
                "did": 	// 设备did，字符串类型
            }
        }

### 示例代码
	var gizWifiDevice = api.require('gizWifiDevice');
	gizWifiDevice.getDeviceStatus({
		"device": {
			"did": 'your_device_id',
			"mac": 'your_device_mac'
		}
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本


## write<div id="a34"></div>

给设备发送控制指令，已订阅的设备变为可控状态后才能发送控制指令。设备控制时也分为大循环和小循环（即远程和局域网环境），SDK会优先进行小循环控制。当设备只能通过大循环访问时，才进行大循环控制。APP的设备控制指令到达设备端后，设备状态变化时会上报当前状态。APP通过回调函数可以得到状态数据，包括设备的运行状态、报警、故障、透传数据等。

硬件产品开发者根据产品功能来定义设备的操作命令集。在APP端，设备的操作命令以数据点形式格式化后发送到设备端。数据点可以定义布尔类型、字符串类型、数字类型、扩展类型的数据。如何定义数据点，请访问[机智云网站](http://site.gizwits.com/zh-cn/document/m2m/i_021_editdp/)。

如果开发者有需要透传的数据指令，可以通过定义扩展类型的数据点实现。如果要透传的是二进制数据，需要先用base64编码转换为字符串再写入write接口的data参数。同样，设备向APP透传的二进制数据，APP接收后，要先经过base64解码为二进制数据才能正确使用。请注意，一定要用base64编解码，否则二进制数据无法正确透传。

要求：下发的指令格式需按照正确的json类型下发。例如，布尔类型的值，下发的是0或1，可能会导致无法下发。

write({params}, callback(ret, err))

### params

device: 

* 类型： JSON对象
* 默认值：无
* 描述：要发送操作指令的设备对象，设备对象信息可以在获取设备列表时得到。
* 内部字段

		{
			"mac":		// 设备mac地址，字符串类型
			"did": 		// 设备did，字符串类型
		}

sn: 

* 类型： 数字类型
* 默认值：无
* 描述：发送操作指令时可以携带指令序号，指令序号由App生成和维护

data: 

* 类型： JSON对象
* 默认值：无
* 描述：要发送的操作指令。
* 内部字段

		{
			"data": {					// 设备数据点对象类型
				……
				"attrName": "attrValue",// 操作命令：数据点名称、操作值
										// 数据点名称是字符串类型，操作值的类型是在数据点中定义的
										// 如果数据点是扩展类型，操作值需为base64编码字符串
				……
			}
		}

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            device:{   	// 执行成功的设备对象（以下字段是设备对象信息），对象类型
                "mac":	// 设备mac地址，字符串类型
                "did": 	// 设备did，字符串类型
            }
            "sn": 		// 操作指令下发时的指令序号
            "data": {                       // 状态，对象类型
                "attrName": "attrValue",	// 数据点名称: 操作值。如果数据点是扩展类型，操作值需为base64编码字符串
            }
            "alerts": {					// 报警，对象类型
                "attrName": "attrValue"	// 数据点名称: 报警内容
            }
            "faults": {					// 故障，对象类型
                "attrName":"attrValue"	// 数据点名称: 故障内容
            }   
            "binary": 		// 二进制透传数据，base64编码字符串，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            device:{   	// 执行失败的设备对象，对象类型
                "mac":	// 设备mac地址，字符串类型
                "did": 	// 设备did，字符串类型
            }
        }

### 示例代码
	var gizWifiDevice = api.require('gizWifiDevice');
	gizWifiDevice.write({
		"device": {
			"did": 'your_device_id',
			"mac": 'your_device_mac'
		},
		"sn": 5
		"data": {
			"LED_G": 127,
               	"LED_B":254,
               	"LED_R":127,
               	"LED_OnOff":true,
               	"Motor_Speed":2
	     	}
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本


## getHardwareInfo<div id="a35"></div>
 
获取设备硬件信息。只有在小循环时，设备登录后才能够获取到设备硬件信息。

getHardwareInfo({params}, callback(ret, err))

### params
device: 

* 类型： JSON对象
* 默认值：无
* 描述：设备对象，设备对象信息可以在获取设备列表时得到。
* 内部字段

		{
			"mac":		// 设备mac地址，字符串类型
			"did": 		// 设备did，字符串类型
		}

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            device: {   // 执行成功的设备对象（以下字段是设备对象信息），对象类型
                "mac":	// 设备mac地址，字符串类型
                "did": 	// 设备did，字符串类型
            }
            hardwareInfo: {			// 设备硬件信息，对象类型
                "wifiHardVer":		// WiFi硬件版本号，字符串类型
                "wifiSoftVer":		// WiFi软件版本号，字符串类型
                "mcuHardVer":		// 设备硬件版本号，字符串类型
                "mcuSoftVer":		// 设备软件版本号，字符串类型
                "firmwareId":		// 固件fid，字符串类型
                "firmwareVer":		// 固件版本号，字符串类型
                "productKey":		// 产品类型识别码
            }
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            device:{   	// 执行失败的设备对象，对象类型
                "mac":	// 设备mac地址，字符串类型
                "did": 	// 设备did，字符串类型
            }
        }

### 示例代码
	var gizWifiDevice = api.require('gizWifiDevice');
	gizWifiDevice.getHardwareInfo({
	    	"device": {
			"did": 'your_device_id',
			"mac": 'your_device_mac'
	    	}
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## exitProductionTesting<div id="a36"></div>
 
退出产测模式。不订阅设备就可以调用此接口，设备进入产测模式后会做出响应

exitProductionTesting({params}, callback(ret, err))

### params
device: 

* 类型： JSON对象
* 默认值：无
* 描述：设备对象，设备对象信息可以在获取设备列表时得到。
* 内部字段

		{
			"mac":		// 设备mac地址，字符串类型
			"did": 		// 设备did，字符串类型
		}

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            device: {   // 执行成功的设备对象，对象类型
                "mac":	// 设备mac地址，字符串类型
                "did": 	// 设备did，字符串类型
            }
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            device:{   	// 执行失败的设备对象，对象类型
                "mac":	// 设备mac地址，字符串类型
                "did": 	// 设备did，字符串类型
            }
        }

### 示例代码
	var gizWifiDevice = api.require('gizWifiDevice');
	gizWifiDevice.exitProductionTesting({
	    	"device": {
			"did": 'your_device_id',
			"mac": 'your_device_mac'
	    	}
	},function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## setCustomInfo<div id="a37"></div>

修改设备的备注和别名。设备绑定后才能修改

setCustomInfo({params}, callback(ret, err))

### params
device: 

* 类型： JSON对象
* 默认值：无
* 描述：要修改备注和别名的设备对象
* 内部字段

        {
            "mac":		// 设备mac地址，字符串类型
            "did": 		// 设备did，字符串类型
        }

remark: 

* 类型： JSON对象
* 默认值：无
* 描述：待修改的备注信息。不修改可不传

alias: 

* 类型： JSON对象
* 默认值：无
* 描述：待修改的别名信息。不修改可不传

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            device: {   // 执行成功的设备对象，对象类型
                "mac":	// 设备mac地址，字符串类型
                "did": 	// 设备did，字符串类型
            }
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            device:{   	// 执行失败的设备对象，对象类型
                "mac":	// 设备mac地址，字符串类型
                "did": 	// 设备did，字符串类型
            }
        }

### 示例代码
	var gizWifiDevice = api.require('gizWifiDevice');
	gizWifiDevice.setCustomInfo({
	   	"device": {
			"did": 'your_device_id',
			"mac": 'your_device_mac'
	   	},
		"remark": "your_remark",
		"alias": "your_alias"
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## getDeviceInfo<div id="a38"></div>
 
获取设备基本信息。

getDeviceInfo({params}, callback(ret, err))

### params
device: 

* 类型： JSON对象
* 默认值：无
* 描述：设备对象，设备mac和did可以在获取设备列表时得到。
* 内部字段

		{
			"mac":		// 中控设备mac地址，字符串类型
			"did": 		// 中控设备did，字符串类型
		}

### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            device: {           // 设备对象（以下字段是设备信息），对象类型
                mac:			// 设备MAC地址，字符串类型
                did:  			// 设备唯一标识，字符串类型
                ip:				// 设备IP地址，字符串类型
                productKey:		// 设备的产品识别码，字符串类型
                productName:	// 设备的产品名称，字符串类型
                remark:			// 设备备注信息，字符串类型
                alias:			// 设备别名，字符串类型
                type:			// 设备类型（见枚举定义GizWifiDeviceType），数字类型
                netStatus:		// 设备网络状态（见枚举定义GizWifiDeviceNetStatus），数字类型
                isLAN:			// 设备是否是局域网设备，布尔类型
                isBind:			// 设备是否已绑定，布尔类型
                isDisabled:		// 设备是否已在云端注销，布尔类型
                isProductDefined:  // 设备是否定义了数据点，布尔类型
                isSubscribed:	// 设备是否已订阅，布尔类型
            }
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            device: {   	// 设备对象（以下字段是设备对象信息），对象类型
                "mac":		// 设备mac地址，字符串类型
                "did": 		// 设备did，字符串类型
            }
        }

### 示例代码
	var gizWifiDevice = api.require('gizWifiDevice');
	gizWifiDevice.getDeviceInfo({
		"device": {
			"did": 'your_device_id',
			"mac": 'your_device_mac'
	        }
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


# gizWifiCentralControlDevice类接口

机智云 Wi-Fi 的中控设备类。该类提供了中控设备获取子设备列表、添加子设备、删除子设备功能。中控设备类继承自GizWifiDevice类，可以使用GizWifiDevice类的所有接口。

在获取到设备列表时，通过GizWifiDevice类的getDeviceInfo()接口中的type字段信息，可以知道该设备是否为中控设备。中控设备登录后，就可以进行子设备添加、删除等操作了。

## registerNotifications<div id="a39"></div>
 
注册子设备列表变化通知。当中控设备处于子设备加网状态时，会主动上报当前已入网的子设备。APP注册通知后，SDK就会将子设备列表上报给APP。

registerNotifications({params}, callback(ret, err))

### params

device: 

* 类型： JSON对象
* 默认值：无
* 描述：要注册通知的中控设备对象，设备对象信息可以在获取设备列表时得到。
* 内部字段

		{
			"mac":		// 中控设备mac地址，字符串类型
			"did": 		// 中控设备did，字符串类型
		}

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            device:{   	// 注册成功的中控设备对象，对象类型
                "mac":	// 中控设备mac地址，字符串类型
                "did": 	// 中控设备did，字符串类型
            }
            netStatus: 	// 中控设备的网络状态（见枚举定义GizWifiDeviceNetStatus），数值类型
            subDevices: {			// 中控设备上报的子设备列表，对象数组类型
                "mac": 				// 中控设备mac，字符串类型
                "did":				// 中控设备did，字符串类型
                "subDid":			// 中控子设备did，字符串类型
                "netStatus":		// 中控子设备是否在线（见枚举定义GizWifiDeviceNetStatus），数值类型
        		"subProductKey": 	// 中控子设备类型标识码，字符串类型
                "subProductName": 	// 中控子设备产品名称，字符串类型
                "type": 			// 中控子设备类型（见枚举定义GizWifiDeviceType），数值类型
                "productKey": 		// 中控设备类型标识码，字符串类型
                "productName": 		// 中控设备产品名称，字符串类型
            }
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            device: {   // 注册失败的设备对象，对象类型
                "mac":	// 中控设备mac地址，字符串类型
                "did": 	// 中控设备did，字符串类型
            }
        }

### 示例代码
	var gizWifiCentralControlDevice = api.require('gizWifiCentralControlDevice');
	gizWifiCentralControlDevice.registerNotifications({
	        "device": {
	            	"mac": 'your_device_mac',
	            	"did": 'your_device_id'
	        }
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本

## getSubDevices<div id="a40"></div>

获取子设备列表。

getSubDevices({params}, callback(ret, err))

### params

device: 

* 类型： JSON对象
* 默认值：无
* 描述：中控设备对象，设备对象信息可以在获取设备列表时得到。
* 内部字段

		{
			"mac":		// 中控设备mac地址，字符串类型
			"did": 		// 中控设备did，字符串类型
		}

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            device: {   // 执行成功的中控设备对象，对象类型
                "mac":	// 中控设备mac地址，字符串类型
                "did": 	// 中控设备did，字符串类型
            }
            subDevices: {	// 中控设备上报的子设备列表，对象数组类型
                "mac": 					// 中控设备mac，字符串类型
                "did":					// 中控设备did，字符串类型
                "subDid": 				// 子设备did，字符串类型
                "subProductKey":		// 子设备类型标识，字符串类型
                "subProductName":		// 子设备产品名称，字符串类型
                "type":					// 子设备类型，数字类型
                "netStatus":            // 中控子设备是否在线（见枚举定义GizWifiDeviceNetStatus），数值类型
                "productKey":			// 中控设备类型标识，字符串类型
                "productName":			// 中控设备产品名称，字符串类型
            }
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            device:{   	// 执行失败的中控设备对象，对象类型
                "mac":	// 中控设备mac地址，字符串类型
                "did": 	// 中控设备did，字符串类型
            }
        }

### 示例代码
	var gizWifiCentralControlDevice = api.require('gizWifiCentralControlDevice');
	gizWifiCentralControlDevice.getSubDevices({
	        "device": {
	            	"mac": 'your_device_mac',
			"did": 'your_device_id'
	        }
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本

## addSubDevice<div id="a41"></div>

添加子设备。

addSubDevice({params}, callback(ret, err))


### params

device: 

* 类型： JSON对象
* 默认值：无
* 描述：中控设备对象，设备对象信息可以在获取设备列表时得到。
* 内部字段

		{
			"mac":		// 中控设备mac地址，字符串类型
			"did": 		// 中控设备did，字符串类型
		}

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            device:{   	// 执行成功的中控设备对象，对象类型
                "mac":	// 中控设备mac地址，字符串类型
                "did": 	// 中控设备did，字符串类型
            }
            subDevices:{	// 中控设备上报的子设备列表，对象数组类型
                "mac": 		// 中控设备mac，字符串类型
                "did":		// 中控设备did，字符串类型
                "subDid": 				// 子设备did，字符串类型
                "subProductKey":		// 子设备类型标识，字符串类型
                "subProductName":		// 子设备产品名称，字符串类型
                "type":					// 子设备类型，数字类型
                "netStatus":            // 中控子设备是否在线（见枚举定义GizWifiDeviceNetStatus），数值类型
                "productKey":			// 中控设备类型标识，字符串类型
                "productName":			// 中控设备产品名称，字符串类型
            }
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            device:{   	// 执行失败的中控设备对象，对象类型
                "mac":	// 中控设备mac地址，字符串类型
                "did": 	// 中控设备did，字符串类型
            }
        }

### 示例代码
	var gizWifiCentralControlDevice = api.require('gizWifiCentralControlDevice');
	gizWifiCentralControlDevice.addSubDevice({
	        "device": {
	            	"mac": 'your_device_mac',
			"did": 'your_device_id'
	        }
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## deleteSubDevice<div id="a42"></div>

删除子设备。

deleteSubDevice({params}, callback(ret, err))

### params

device: 

* 类型： JSON对象
* 默认值：无
* 描述：中控设备对象，设备对象信息可以在获取设备列表时得到。
* 内部字段

		{
			"mac":	// 中控设备mac地址，字符串类型
			"did": 	// 中控设备did，字符串类型
		}

subDid: 

* 类型： JSON对象
* 默认值：无
* 描述：要删除的子设备did

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            device:{   	// 执行成功的中控设备对象（以下字段是设备对象信息），对象类型
                "mac":	// 中控设备mac地址，字符串类型
                "did": 	// 中控设备did，字符串类型
            }
            subDevices:{		// 中控设备上报的子设备列表，对象数组类型
                "mac": 					// 中控设备mac，字符串类型
                "did":					// 中控设备did，字符串类型
                "subDid": 				// 子设备did，字符串类型
                "subProductKey":		// 子设备类型标识，字符串类型
                "subProductName":		// 子设备产品名称，字符串类型
                "type":					// 子设备类型，数字类型
                "netStatus":            // 中控子设备是否在线（见枚举定义GizWifiDeviceNetStatus），数值类型
                "productKey":			// 中控设备类型标识，字符串类型
                "productName":			// 中控设备产品名称，字符串类型
            }
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            device:{   	// 执行失败的中控设备对象，对象类型
                "mac":	// 中控设备mac地址，字符串类型
                "did": 	// 中控设备did，字符串类型
            }
        }

### 示例代码
	var gizWifiCentralControlDevice = api.require('gizWifiCentralControlDevice');
	gizWifiCentralControlDevice.deleteSubDevice({
	        "device": {
	            	"mac": 'your_device_mac',
	            	"did": 'your_device_mac'
	        },
		"subDid": 'your_sub_device_mac'
	 }, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


# gizWifiSubDevice类接口

机智云 Wi-Fi 的子设备类。该类提供了子设备控制、子设备状态上报功能。子设备类继承自GizWifiDevice类，可以使用GizWifiDevice类的所有接口。

## registerNotifications<div id="a43"></div>

注册子设备状态变化通知。

registerNotifications({params}, callback(ret, err))

### params
device: 

* 类型： JSON对象
* 默认值：无
* 描述：要注册通知的子设备对象，设备对象信息可以在获取子设备列表时得到
* 内部字段

		{
			"mac":		// 设备mac地址，字符串类型
			"did": 		// 设备did，字符串类型
			"subDid": 	// 子设备did，字符串类型
		}

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            device:{   	// 注册成功的子设备对象，对象类型
                "mac":		// 中控设备mac地址，字符串类型
                "did": 		// 中控设备did，字符串类型
                "subDid": 	// 子设备did，字符串类型
            }
            netStatus:		// 子设备是否在线（见GizWifiDeviceNetStatus），数值类型
            "data": {					// 设备状态，对象类型
                "attrName":"attrValue",	// 数据点名称: 操作值。如果数据点是扩展类型，操作值需为base64编码字符串
            }
            "alerts": {					// 报警，对象类型
                "attrName": "attrValue"	// 数据点名称: 报警内容
            }
            "faults": {			 		// 故障，对象类型
                "attrName": "attrValue"	// 数据点名称: 故障内容
            }
            "binary": 		// 二进制透传数据，base64编码字符串，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            device: {   // 注册失败的设备对象（以下字段是设备对象信息），对象类型
                "mac":      // 设备mac地址，字符串类型
                "did":      // 设备did，字符串类型
                "subDid": 	// 子设备did，字符串类型
            }
        }

### 示例代码
	var gizWifiSubDevice = api.require('gizWifiSubDevice');
	gizWifiSubDevice.registerNotifications({
	        "device": {
			"did": 'your_device_id',
			"mac": 'your_device_mac',
			"subDid": 'your_subDevice_id'
	        }
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## getDeviceStatus<div id="a44"></div>

获取设备状态。已订阅的设备变为可控状态后才能获取到状态，包括设备的运行状态、报警、故障、透传数据等。

getDeviceStatus({params}, callback(ret, err))

### params
device: 

* 类型： JSON对象
* 默认值：无
* 描述：要查询的设备对象，设备对象信息可以在获取设备列表时得到。
* 内部字段

		{
			"mac":		// 设备mac地址，字符串类型
			"did": 		// 设备did，字符串类型
			"subDid": 	// 子设备did，字符串类型
		}

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            device:{   	// 执行成功的设备对象（以下字段是设备对象信息），对象类型
                "mac":      // 设备mac地址，字符串类型
                "did":      // 设备did，字符串类型
                "subDid": 	// 子设备did，字符串类型
            }
            "data": {					// 设备状态，对象类型
                "attrName":"attrValue",	// 数据点名称: 操作值。如果数据点是扩展类型，操作值需为base64编码字符串
            }
            "alerts": {					// 报警，对象类型
                "attrName": "attrValue"	// 数据点名称: 报警内容
            }
            "faults": {			 		// 故障，对象类型
                "attrName": "attrValue"	// 数据点名称: 故障内容
            }
            "binary": 	// 二进制透传数据，base64编码字符串，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            device:{   	// 请求查询状态的设备对象（以下字段是设备对象信息），对象类型
                "mac":      // 设备mac地址，字符串类型
                "did":      // 设备did，字符串类型
                "subDid": 	// 子设备did，字符串类型
            }
        }

### 示例代码
	var gizWifiSubDevice = api.require('gizWifiSubDevice');
	gizWifiSubDevice.getDeviceStatus({
		"device": {
			"mac": 'your_device_mac',
			"did": 'your_device_id',
			"subDid": 'your_subDevcie_id'
		}
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本


## write<div id="a45"></div>
 
子设备控制。同普通设备控制一样。

write({params}, callback(ret, err))

### params

device: 

* 类型： JSON对象
* 默认值：无
* 描述：要发送操作指令的设备对象，设备对象信息可以在获取设备列表时得到。
* 内部字段

		{
			"mac":		// 设备mac地址，字符串类型
			"did": 		// 设备did，字符串类型
			"subDid": 	// 子设备did，字符串类型
		}

sn: 

* 类型： JSON对象
* 默认值：无
* 描述：要发送的操作指令的指令序号，由App生成并维护

data: 

* 类型： JSON对象
* 默认值：无
* 描述：要发送的操作指令，格式与普通设备相同
* 内部字段

        {
            "data": {		// 设备状态，字符串类型
                "attrName":"attrValue",	// 数据点名称: 操作值。如果数据点是扩展类型，操作值需为base64编码字符串
            }
            "alerts": {					// 报警，数组类型
                "attrName": "attrValue"	// 数据点名称: 报警内容
            }
            "faults": {			 		// 故障，数组类型
                "attrName": "attrValue"	// 数据点名称: 故障内容
            }
            "binary": 		// 二进制透传数据，base64编码字符串，字符串类型
        }

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            device: {   	// 执行成功的设备对象（以下字段是设备对象信息），对象类型
                "mac":		// 设备mac地址，字符串类型
                "did": 		// 设备did，字符串类型
                "subDid": 	// 子设备did，字符串类型
            }
            "sn": 		// 命令序号，与App下发的序号对应，数字类型
            "data": {					// 设备状态，对象类型
                "attrName":"attrValue",	// 数据点名称: 操作值。如果数据点是扩展类型，操作值需为base64编码字符串
            }
            "alerts": {					// 报警，对象类型
                "attrName": "attrValue"	// 数据点名称: 报警内容
            }
            "faults": {			 		// 故障，对象类型
                "attrName": "attrValue"	// 数据点名称: 故障内容
            }
            "binary": 	// 二进制透传数据，base64编码字符串，字符串类型
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            device: {   	// 执行失败的设备对象（以下字段是设备对象信息），对象类型
                "mac":		// 设备mac地址，字符串类型
                "did": 		// 设备did，字符串类型
                "subDid": 	// 子设备did，字符串类型
            }
        }

### 示例代码
	var gizWifiSubDevice = api.require('gizWifiSubDevice');
	gizWifiSubDevice.write({
		"device": {
			"did": 'your_device_id',
			"mac": 'your_device_mac',
			"subDid": 'your_subDevice_id'
	    	},
		"sn": 5,
		"data": {
			"LED_G": 127,
               	"LED_B": 254,
               	"LED_R": 127,
               	"LED_OnOff": true,
               	"Motor_Speed": 2
	     	}
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## getDeviceInfo<div id="a46"></div>

获取子设备基本信息。

getDeviceInfo({params}, callback(ret, err))

### params
device: 

* 类型： JSON对象
* 默认值：无
* 描述：子设备对象，设备mac和did可以在获取分组设备列表时得到。
* 内部字段

		{
			"mac":		// 中控设备mac地址，字符串类型
			"did": 		// 中控设备did，字符串类型
			"subDid": 	// 子设备did，字符串类型
		}

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            device: {   	// 子设备对象（以下字段是子设备信息），对象类型
                "mac":					// 中控设备mac地址，字符串类型
                "did": 					// 中控设备did，字符串类型
                "subDid": 				// 子设备did，字符串类型
                "subProductKey":		// 子设备类型标识，字符串类型
                "subProductName":		// 子设备产品名称，字符串类型
                "type":             // 子设备类型（见GizWifiDeviceType），数值类型
                "netStatus":		// 子设备是否在线（见GizWifiDeviceNetStatus），数值类型
                "productKey":			// 中控设备类型标识，字符串类型
                "productName":			// 中控设备产品名称，字符串类型
            }
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            device:{   	// 设备对象（以下字段是设备对象信息），对象类型
                "mac":		// 设备mac地址，字符串类型
                "did": 		// 设备did，字符串类型
                "subDid": 	// 子设备did，字符串类型
            }
        }

### 示例代码
	var gizWifiSubDevice = api.require('gizWifiSubDevice');
	gizWifiSubDevice.getDeviceInfo({
		"device": {
			"did": 'your_device_id',
			"mac": 'your_device_mac',
			"subDid": 'your_subDevice_id'
		}
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


# gizWifiGroup类接口

机智云 Wi-Fi 的设备分组类。该类提供了中控子设备分组功能。

## getDevices<div id="a47"></div>
 
获取分组设备列表。

getDevices({params}, callback(ret, err))

### params

group: 

* 类型： JSON对象
* 默认值：无
* 描述：组对象，组对象信息可以在获取分组列表时得到。
* 内部字段

        {
            "gid":		// 组ID，字符串类型
        }

### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            group: {   	// 获取组设备成功的组对象，对象类型
                "gid": 	// 组ID，字符串类型
            }
            devices: [{   	// 分组子设备列表，对象数组类型
                "mac": 		// 设备mac，字符串类型
                "did":		// 设备did，字符串类型
                "subDid":	// 子设备did，字符串类型
            }]
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            group:{   	// 获取组设备失败的组对象，对象类型
                "gid":	// 组ID，字符串类型
            }
        }

### 示例代码
	var gizWifiGroup = api.require('gizWifiGroup');
	gizWifiGroup.getDevices({
		"group": {
	       		"gid": 'your_group_id'
		}
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## addDevice<div id="a48"></div>

向组中添加设备。添加后，返回添加后的设备列表。

addDevice({params}, callback(ret, err))

### params
group: 

* 类型： JSON对象
* 默认值：无
* 描述：组对象，组对象信息可以在获取分组列表时得到。
* 内部字段

        {
            "gid":		// 组ID，字符串类型
        }

device: 

* 类型： JSON对象
* 默认值：无
* 描述：要添加的设备对象，设备对象信息可以在获取分组设备列表时得到。
* 内部字段

        {
            "mac":		// 设备mac地址，字符串类型
            "did": 		// 设备did，字符串类型
            "subDid": 	// 子设备did，字符串类型
        }

### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            group: {   		// 添加组设备成功的组对象，对象类型
                "gid": 		// 组ID，字符串类型
            }
            devices: [{   	// 分组子设备列表，对象数组类型
                "mac": 		// 设备mac，字符串类型
                "did":		// 设备did，字符串类型
                "subDid":	// 子设备did，字符串类型
            }]
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            group: {   	// 添加组设备失败的组对象，对象类型
                "gid":	// 组ID，字符串类型
            }
        }

### 示例代码
	var gizWifiGroup = api.require('gizWifiGroup');
	gizWifiGroup.addDevice({
	        "group": {
	            "gid": 'your_group_id'
	        },
	       "device": {
			"did": 'your_device_id',
			"mac": 'your_device_mac',
			"subDid": 'your_subDevice_id'
	       }
	}, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本

## removeDevice<div id="a49"></div>
 
删除分组内的设备。删除后，返回删除后的设备列表。

removeDevice({params}, callback(ret, err))

### params

group: 

* 类型： JSON对象
* 默认值：无
* 描述：组对象，组对象信息可以在获取分组列表时得到。
* 内部字段

        {
            "gid":		// 组ID，字符串类型
        }

device: 

* 类型： JSON对象
* 默认值：无
* 描述：要删除的设备对象，设备对象信息可以在获取分组设备列表时得到。
* 内部字段

        {
            "mac":		// 中控设备mac地址，字符串类型
            "did": 		// 中控设备did，字符串类型
            "subDid": 	// 子设备did，字符串类型
        }

### callback(ret, err)

ret

* 类型：JSON对象
* 内部字段

        {
            group: {   		// 删除组设备成功的组对象，对象类型
                "gid": 		// 组ID，字符串类型
            }
            devices: [{   	// 分组子设备列表，对象数组类型
                "mac": 		// 设备mac，字符串类型
                "did":		// 设备did，字符串类型
                "subDid":	// 子设备did，字符串类型
            }]
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            group:{   	// 删除组设备失败的组对象，对象类型
                "gid":	// 组ID，字符串类型
            }
        }

### 示例代码
	var gizWifiGroup = api.require('gizWifiGroup');
	gizWifiGroup.removeDevice({
	        "group": {
	            "gid": 'your_group_id'
	        },
	        "device":{
			"did": 'your_device_id',
			"mac": 'your_device_mac',
			"subDid": 'your_subDevice_id'
	        }
	 }, function(ret, err) {
	    	alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本


## getGroupInfo<div id="a50"></div>

获取分组设备列表。

getGroupInfo({params}, callback(ret, err))

### params
group: 

* 类型： JSON对象
* 默认值：无
* 描述：组对象，组对象信息可以在获取分组列表时得到。
* 内部字段

		{
			"gid":		// 组ID，字符串类型
		}

### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            group: {   	// 组对象，对象类型
                "gid": 			// 组ID，字符串类型
                "groupName": 	// 组名称，字符串类型
                "productKey": 	// 组类型标识，字符串类型
            }
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
            group:{   	// 组对象，对象类型
                "gid":	// 组ID，字符串类型
            }
        }

### 示例代码
	var gizWifiGroup = api.require('gizWifiGroup');
	gizWifiGroup.getGroupInfo({
		"group": {
	        	"gid": 'your_group_id'
		}
	}, function(ret, err) {
		alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
	});

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本

# gizWifiBinary类接口

二进制数据base64编解码类。

## encode<div id="a51"></div>

base64编码函数。

encode({params}, callback(ret, err))

### params

binaryData: 

* 类型： JSON数组
* 默认值：无
* 描述：需要做base64编码的数据

### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            binary:    	// 经过base64编码之后的字符串，例如：AQIDBA==
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
    var GizWifiBinary = api.require("gizWifiBinary");
    
    //数组编码字符串
    var src = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    GizWifiBinary.encode({"binaryData": src}, function(ret, err) {
        alert("ret = " + JSON.stringify(ret));
    });

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


## decode<div id="a52"></div>

base64解码函数。

decode({params}, callback(ret, err))

### params

binary: 

* 类型： 字符串
* 默认值：无
* 描述：需要做base64解码的字符串

### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            binaryData:    	// 经过base64解码之后的数值数组，例如：[1, 2, 3, 4]
        }

err

* 类型：JSON对象
* 内部字段

        {
            errorCode:	// 错误代码（见枚举定义GizWifiErrorCode），数字类型
            msg:		// 错误描述，字符串类型
        }

### 示例代码
    var GizWifiBinary = api.require("gizWifiBinary");

    //数组编码字符串
    var src2 = "AQIDBAUGBwgJCgsMDQ4PEBES";
    GizWifiBinary.decode({"binary": src2}, function(ret, err) {
        alert("ret = " + JSON.stringify(ret));
    });

### 可用性

iOS系统，Android系统

可提供的1.0.0及更高版本



# 常量定义

Json字段名及常量说明：

GizWifiConfigureMode  | 设备配置方式
---------- |   --------  |
GizWifiSoftAP  | 软AP配置方式：0
GizWifiAirLink  | 一键配置方式：1

GizLogPrintLevel  | 日志级别
---------- |   --------  |
GizLogPrintNone  | 原生SDK无日志输出：0
GizLogPrintI  | 错误日志输出：1
GizLogPrintII  | 一般日志输出：2
GizLogPrintAll  | 全部日志输出：3

GizWifiDeviceType  | 设备分类
---------- |   --------  |
GizDeviceNormal  | 普通设备：0
GizDeviceCenterControl  | 中控设备：1

GizEventType  | 事件类型
---------- |   --------  |
GizEventSDK  | SDK系统事件：0
GizEventDevice  | 设备异常事件：1
GizEventM2MService  | M2M异常事件：2
GizEventToken  | Token失效事件：2

GAgentType  | 模组类型
---------- |   --------  |
GizGAgentMXCHIP  | MXCHIP 3162 模组（庆科3162）：0
GizGAgentHF  | HF 模组（汉枫）：1
GizGAgentRTK  | RTK 模组（瑞昱）：2
GizGAgentWM  | WM 模组（联盛德）：3
GizGAgentESP  | ESP 模组（乐鑫）：4
GizGAgentQCA  | QCA 模组（高通）：5
GizGAgentTI  | TI 模组（TI）：6
GizGAgentFSK  | FSK 模组（宇音天下）：7
GizGAgentMXCHIP3  | MXCHIP V3：8
GizGAgentBL  | BL 模组（古北）：9
GizGAgentAtmelEE  | Atmel 模组：10
GizGAgentOther  | 其他模组：11

GizUserAccountType  | 用户账号类型
---------- |   --------  |
GizUserNormal | 普通用户：0
GizUserPhone  | 手机用户：1
GizUserEmail  | 邮箱用户：2

GizThirdAccountType  | 第三方账号类型
---------- |   --------  |
GizThirdBAIDU  | 百度账号：0
GizThirdSINA  | 新浪账号：1
GizThirdQQ  | 腾讯账号：2
GizThirdWeChat  | 微信账号：3

GizUserGenderType  | 用户性别
---------- |   --------  |
GizUserGenderMale  | 男：0
GizUserGenderFemale  | 女：1
GizUserGenderUnknow  | 其他：2

GizWifiDeviceNetStatus  | 设备网络状态
---------- |   --------  |
GizDeviceOffline  | 离线：0
GizDeviceOnline  | 在线：1
GizDeviceControlled  | 可控：2

GizPushType  | 第三方推送类型
---------- |   --------  |
GizPushBaiDu  | 百度推送：0
GizPushJiGuang  | 极光推送：1


## 错误码描述

errorCode |       msg  |
---------- |   --------  |
0  | GIZ_SDK_SUCCESS
8001  | GIZ_SDK_PARAM_FORM_INVALID
8002  | GIZ_SDK_CLIENT_NOT_AUTHEN
8003  | GIZ_SDK_CLIENT_VERSION_INVALID
8004  | GIZ_SDK_UDP_PORT_BIND_FAILED
8005  | GIZ_SDK_DAEMON_EXCEPTION
8006  | GIZ_SDK_PARAM_INVALID
8007  | GIZ_SDK_APPID_LENGTH_ERROR
8008  | GIZ_SDK_LOG_PATH_INVALID
8009  | GIZ_SDK_LOG_LEVEL_INVALID
 |
8021  | GIZ_SDK_DEVICE_CONFIG_SEND_FAILED
8022  | GIZ_SDK_DEVICE_CONFIG_IS_RUNNING
8023  | GIZ_SDK_DEVICE_CONFIG_TIMEOUT
8024  | GIZ_SDK_DEVICE_DID_INVALID
8025  | GIZ_SDK_DEVICE_MAC_INVALID
8026  | GIZ_SDK_SUBDEVICE_DID_INVALID
8027  | GIZ_SDK_DEVICE_PASSCODE_INVALID
8028  | GIZ_SDK_DEVICE_NOT_CENTERCONTROL
8029  | GIZ_SDK_DEVICE_NOT_SUBSCRIBED
8030  | GIZ_SDK_DEVICE_NO_RESPONSE
8031  | GIZ_SDK_DEVICE_NOT_READY
8032  | GIZ_SDK_DEVICE_NOT_BINDED
8033  | GIZ_SDK_DEVICE_CONTROL_WITH_INVALID_COMMAND
8034  | GIZ_SDK_DEVICE_CONTROL_FAILED
8035  | GIZ_SDK_DEVICE_GET_STATUS_FAILED
8036  | GIZ_SDK_DEVICE_CONTROL_VALUE_TYPE_ERROR
8037  | GIZ_SDK_DEVICE_CONTROL_VALUE_OUT_OF_RANGE
8038  | GIZ_SDK_DEVICE_CONTROL_NOT_WRITABLE_COMMAND
8039  | GIZ_SDK_BIND_DEVICE_FAILED
8040  | GIZ_SDK_UNBIND_DEVICE_FAILED
 |
8041  | GIZ_SDK_DNS_FAILED
8042  | GIZ_SDK_M2M_CONNECTION_SUCCESS
8043  | GIZ_SDK_SET_SOCKET_NON_BLOCK_FAILED
8044  | GIZ_SDK_CONNECTION_TIMEOUT
8045  | GIZ_SDK_CONNECTION_REFUSED
8046  | GIZ_SDK_CONNECTION_ERROR
8047  | GIZ_SDK_CONNECTION_CLOSED
8048  | GIZ_SDK_SSL_HANDSHAKE_FAILED
8049  | GIZ_SDK_DEVICE_LOGIN_VERIFY_FAILED
8050  | GIZ_SDK_INTERNET_NOT_REACHABLE
 |
8096  | GIZ_SDK_HTTP_ANSWER_FORMAT_ERROR
8097  | GIZ_SDK_HTTP_ANSWER_PARAM_ERROR
8098  | GIZ_SDK_HTTP_SERVER_NO_ANSWER
8099  | GIZ_SDK_HTTP_REQUEST_FAILED
 |
8100  | GIZ_SDK_OTHERWISE
8101  | GIZ_SDK_MEMORY_MALLOC_FAILED
8102  | GIZ_SDK_THREAD_CREATE_FAILED
 |
8150  | GIZ_SDK_USER_ID_INVALID
8151  | GIZ_SDK_TOKEN_INVALID
8152  | GIZ_SDK_GROUP_ID_INVALID
8153  | GIZ_SDK_GROUPNAME_INVALID
8154  | GIZ_SDK_GROUP_PRODUCTKEY_INVALID
8155  | GIZ_SDK_GROUP_FAILED_DELETE_DEVICE
8156  | GIZ_SDK_GROUP_FAILED_ADD_DEVICE
8157  | GIZ_SDK_GROUP_GET_DEVICE_FAILED
 |
8201  | GIZ_SDK_DATAPOINT_NOT_DOWNLOAD
8202  | GIZ_SDK_DATAPOINT_SERVICE_UNAVAILABLE
8203  | GIZ_SDK_DATAPOINT_PARSE_FAILED
 |
8300  | GIZ_SDK_SDK_NOT_INITIALIZED
8301  | GIZ_SDK_APK_CONTEXT_IS_NULL
8302  | GIZ_SDK_APK_PERMISSION_NOT_SET
8303  | GIZ_SDK_CHMOD_DAEMON_REFUSED
8304  | GIZ_SDK_EXEC_DAEMON_FAILED
8305  | GIZ_SDK_EXEC_CATCH_EXCEPTION
8306  | GIZ_SDK_APPID_IS_EMPTY
8307  | GIZ_SDK_UNSUPPORTED_API
8308  | GIZ_SDK_REQUEST_TIMEOUT
8309  | GIZ_SDK_DAEMON_VERSION_INVALID
8310  | GIZ_SDK_PHONE_NOT_CONNECT_TO_SOFTAP_SSID
8311  | GIZ_SDK_DEVICE_CONFIG_SSID_NOT_MATCHED
8312  | GIZ_SDK_NOT_IN_SOFTAPMODE
8313  | GIZ_SDK_CONFIG_NO_AVAILABLE_WIFI
8314  | GIZ_SDK_RAW_DATA_TRANSMIT
8315  | GIZ_SDK_PRODUCT_IS_DOWNLOADING
8316  | GIZ_SDK_START_SUCCESS
 |
9001 | GIZ_OPENAPI_MAC_ALREADY_REGISTERED
9002 | GIZ_OPENAPI_PRODUCT_KEY_INVALID
9003 | GIZ_OPENAPI_APPID_INVALID
9004 | GIZ_OPENAPI_TOKEN_INVALID
9005 | GIZ_OPENAPI_USER_NOT_EXIST
9006 | GIZ_OPENAPI_TOKEN_EXPIRED
9007 | GIZ_OPENAPI_M2M_ID_INVALID
9008 | GIZ_OPENAPI_SERVER_ERROR
9009 | GIZ_OPENAPI_CODE_EXPIRED
9010 | GIZ_OPENAPI_CODE_INVALID
9011 | GIZ_OPENAPI_SANDBOX_SCALE_QUOTA_EXHAUSTED
9012 | GIZ_OPENAPI_PRODUCTION_SCALE_QUOTA_EXHAUSTED
9013 | GIZ_OPENAPI_PRODUCT_HAS_NO_REQUEST_SCALE
9014 | GIZ_OPENAPI_DEVICE_NOT_FOUND
9015 | GIZ_OPENAPI_FORM_INVALID
9016 | GIZ_OPENAPI_DID_PASSCODE_INVALID
9017 | GIZ_OPENAPI_DEVICE_NOT_BOUND
9018 | GIZ_OPENAPI_PHONE_UNAVALIABLE
9019 | GIZ_OPENAPI_USERNAME_UNAVALIABLE
9020 | GIZ_OPENAPI_USERNAME_PASSWORD_ERROR
9021 | GIZ_OPENAPI_SEND_COMMAND_FAILED
9022 | GIZ_OPENAPI_EMAIL_UNAVALIABLE
9023 | GIZ_OPENAPI_DEVICE_DISABLED
9024 | GIZ_OPENAPI_FAILED_NOTIFY_M2M
9025 | GIZ_OPENAPI_ATTR_INVALID
9026 | GIZ_OPENAPI_USER_INVALID
9027 | GIZ_OPENAPI_FIRMWARE_NOT_FOUND
9028 | GIZ_OPENAPI_JD_PRODUCT_NOT_FOUND
9029 | GIZ_OPENAPI_DATAPOINT_DATA_NOT_FOUND
9030 | GIZ_OPENAPI_SCHEDULER_NOT_FOUND
9031 | GIZ_OPENAPI_QQ_OAUTH_KEY_INVALID
9032 | GIZ_OPENAPI_OTA_SERVICE_OK_BUT_IN_IDLE
9033 | GIZ_OPENAPI_BT_FIRMWARE_UNVERIFIED
9034 | GIZ_OPENAPI_BT_FIRMWARE_NOTHING_TO_UPGRADE
9035 | GIZ_OPENAPI_SAVE_KAIROSDB_ERROR
9036 | GIZ_OPENAPI_EVENT_NOT_DEFINED
9037 | GIZ_OPENAPI_SEND_SMS_FAILED
9038 | GIZ_OPENAPI_APPLICATION_AUTH_INVALID
9039 | GIZ_OPENAPI_NOT_ALLOWED_CALL_API
9040 | GIZ_OPENAPI_BAD_QRCODE_CONTENT
9041 | GIZ_OPENAPI_REQUEST_THROTTLED
9042 | GIZ_OPENAPI_DEVICE_OFFLINE
9043 | GIZ_OPENAPI_TIMESTAMP_INVALID
9044 | GIZ_OPENAPI_SIGNATURE_INVALID
9045 | GIZ_OPENAPI_DEPRECATED_API
9999 | GIZ_OPENAPI_RESERVED
 |
10003  | GIZ_SITE_PRODUCTKEY_INVALID
10010  | GIZ_SITE_DATAPOINTS_NOT_DEFINED
10011  | GIZ_SITE_DATAPOINTS_NOT_MALFORME


## 新旧设备配置方式对照表
GizWifiConfigureMode  | 设备配置方式（old）  | 设备配置方式（new） 
---------- |   --------  |   --------  |
GizWifiSoftAP  | 软AP配置方式：1  | 软AP配置方式：0
GizWifiAirLink  | 一键配置方式：2  | 一键配置方式：1


## 新旧错误码对照表

errorCode(new) |   errorCode(old)  |   msg(old)  |
---------- |   --------  |   --------  |
8002  | -49  | GizWifiError_START_SDK_FAILED
8004  | -30  | GizWifiError_UDP_PORT_BIND_FAILED
8006  | -20  | GizWifiError_INVALID_PARAM
||
8021 | -41  | GizWifiError_CONFIGURE_SENDFAILED
8022  | -46  | GizWifiError_IS_RUNNING
8023  | -40  | GizWifiError_CONFIGURE_TIMEOUT
8024  | -61  | GizWifiError_DEVICE_IS_INVALID
8029  | -11  | GizWifiError_NOT_CONNECTED
8033  | -20  | GizWifiError_INVALID_PARAM
8036  | -20  | GizWifiError_INVALID_PARAM
8037  | -20  | GizWifiError_INVALID_PARAM
8038  | -20  | GizWifiError_INVALID_PARAM
||
8041  | -27  | GizWifiError_DNS_FAILED
8042  | 0   | GizWifiError_SUCCESS
8044  | -21  | GizWifiError_CONNECT_TIMEOUT
8045  | -45  | GizWifiError_CONNECTION_REFUSED
8046  | -19  | GizWifiError_CONNECTION_ERROR
8047  | -7  | GizWifiError_CONNECTION_CLOSED
8049  | -9  | GizWifiError_LOGIN_VERIFY_FAILED
||
8099  | -25  | GizWifiError_HTTP_FAIL
||
8100  | -1  | GizWifiError_GENERAL
8101  | -23  | GizWifiError_INSUFFIENT_MEM
8102  | -15  | GizWifiError_THREAD_CREATE
||
8153  | -62  | GizWifiError_GROUP_IS_INVALID
||
8300  | -60  | GizWifiError_SDK_INIT_FAILED
8307  | -47  | GizWifiError_UNSUPPORTED_API
8308  | -40  | GizWifiError_CONFIGURE_TIMEOUT
8310  | -39  | GizWifiError_CONFIGURE_SSID_NOT_MATCHED
8311  | -39  | GizWifiError_CONFIGURE_SSID_NOT_MATCHED
8312  | -42  | GizWifiError_NOT_IN_SOFTAPMODE
8315  | -46  | GizWifiError_IS_RUNNING
8316  | 0  | GizWifiError_SUCCESS
其他  | -1 | GizWifiError_GENERAL


## 新旧错误码转换函数

errorCodeConversion

该函数是专为App做错误码兼容提供的，可以节省App修改代码的时间。输入新错误码，按照上面对照表返回旧错误码。

errorCodeConversion({params}, callback(ret, err))

### params
errorCode: 

* 类型： JSON对象
* 默认值：无
* 描述：新错误码，上面错误码

### callback(ret, err)
ret

* 类型：JSON对象
* 内部字段

        {
            errorCode:    // 旧错误码，数值类型
        }

### 示例代码
    var gizWifiGroup = api.require('gizWifiSDK');
    gizWifiSDK.errorCodeConversion({
        "errorCode": 8033
    }, function(ret, err) {
        alert("ret = " + JSON.stringify(ret))
    });

### 可用性
iOS系统，Android系统

可提供的1.0.0及更高版本



