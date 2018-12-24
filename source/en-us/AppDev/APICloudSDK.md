title: Guide to Gizwits App SDK 2.0 for APICloud
---

# Overview
The Gizwits App SDK for APICloud (hereinafter referred to as the SDK) mainly helps developers to maintain the user system, the binding relationship between users and devices, the device configuration of network access, the acquisition of the device status, and the device commands. 

## Release notes

### New features

1. The latest version is 1.3.0. For the native Gizwits App SDKs, the latest version is 2.04.04.
2. The SDK startup API startWithAppID gets new parameters of the domain name and the productKey filter.
3. Device configuration API setDeviceOnboarding adds a custom enumeration value for the module type parameter for developers to use their own configuration library.
4. The scheduled task API will be updated in the next release. The current scheduled task API has been deprecated and it is not recommended to use it.

### About backwards compatibility with versions prior to 1.2.4

Some APIs have been deprecated in the current release. However, they allow for backwards compatibility with versions prior to 1.2.4. Your Apps can continue using the APIs with no API call changes, but pay attention to the following three points:

1. When the new gizWifiSDK module reports device Data Points, the Data Point values of Boolean type are returned as true or false strictly following the JSON format, while the old gizWifiSDK module returns 1 or 0. When the App receives a Boolean type Data Point, please update the variable receiving method using Boolean type.

2. In the new gizWifiSDK module, all APIs except the following deprecated APIs now return values using new error codes. The App can convert the new error code value to the old error code value through the error codes conversion function errorCodeConversion. The errorCodeConversion function description is showed on the Constant page below the old and new error codes comparison table. 

3. When any API is successfully executed, the returned msg field corresponding to the error code 0 uses the string "GIZ_SDK_SUCCESS" based on the new error codes.

In addition, the SDK will issue device commands in strict accordance with the JSON format. For example, if a device's Data Point is defined as Boolean type, the corresponding command can only be sent with true/false. If it is 1/0 or "1" / "0", it will fail to issue.

### Function comparison between deprecated API and new API

It is not mandatory for the deprecated API (allowing for backwards compatibility with versions prior to 1.2.4.) to be replaced. Apps that have already been developed can continue to use them, but it is recommended for newly developed Apps to use the new API directly. For developers who don't care about deprecated API, skip this section.

Enumeration value changes:

GizWifiConfigureMode

```
Description: The sequence number of the enumeration value starts from 0. See the Constant page.
Method: the SoftAP mode value that was 1, now is changed to 0; the AirLink mode value that was 2, now is changed to 1.
```

Deprecated API:

gizWifiSDK class

* setDeviceWifi

```
Description: the API name is changed.
Alternative: setDeviceOnboarding, the enumeration values of the parameter mode are changed (0 = GizWifiSoftAP, 1 = GizWifiAirLink).
```

* updateDeviceFromServer

```
Description: The Gizwits App SDK will automatically download and update the device configuration file, and the App doesn’t need to use this API.
Alternative: None.
```

* bindDevice

```
Description: For device security reasons, it is recommended to use a more secure device binding API. The Gizwits App SDK will automatically bind the logged-in LAN devices, so for LAN devices, the App does not need to call the binding API.
Alternative: bindRemoteDevice, requires product productKey and corresponding productSecret, and device MAC to bind devices.
```

* registerUserByPhoneAndCode
* registerUserByEmail

```
Description: These two APIs are merged into one API.
Alternative: registerUser
```

* transAnonymousUserToNormalUser
* transAnonymousUserToPhoneUser

```
Description: These two APIs are merged into one API.
Alternative: transAnonymousUser
```

* changeUserPasswordByCode
* changeUserPasswordByEmail

```
Description: These two APIs are merged into one API.
Alternative: resetPassword
```

* changeUserEmail
* changeUserPhone
* changeUserAdditionalInfo

```
Description: These three APIs are merged into one API.
Alternative: resetPassword
```

gizWifiDevice class, GizWifiCentralControlDevice class

* login
* disconnect

```
Description: The device login mechanism has been changed. The Gizwits App SDK supports device automatic login and automatic reconnection after device disconnection. When the reconnection is successful, the device will report the device current status. 
Alternative: setSubscribe
```

* getIsBind

```
Description: To optimize the API usage, the Gizwits App SDK can determine the device binding status, and the App does not need to pass other parameters.
Alternative: Using the isBind parameter of the getDeviceInfo method
```

Deprecated parameters:

* passcode

```
Description: No longer return the valid device password string for security reasons

Related APIs:
The devices information returned by getBoundDevices in GizWifiSDK class 
The devices information returned by getDeviceInfo in GizWifiDevice class
The devices information returned by getDeviceInfo in GizWifiCentralControlDevice class
```

* isOnline
* isConnected

```
Description: These two parameters are merged and replaced by parameter netStatus.
        netStatus set to 2 is equivalent to isConnect equal to true
        netStatus set to 0 or 1 is equivalent to isConnect equal to false
        netStatus set to 0 is equivalent to isOnline equal to false
        netStatus set to 1 or 2 is equivalent to isOnline equal to true

Related APIs:
The devices information returned by getBoundDevices in GizWifiSDK class 
The returned value of registerNotifications in GizWifiDevice class
The returned value of registerNotifications in GizWifiCentralControlDevice class
The returned value of GetSubDevices in GizWifiCentralControlDevice class
The returned value of addSubDevice in GizWifiCentralControlDevice class
The returned value of deleteSubDevice in GizWifiCentralControlDevice class
The returned value of registerNotifications in GizWifiSubDevice class
The returned value of getDeviceInfo in GizWifiSubDevice class
```

* cmd
* entity0

```
Description: To optimize the parameter format for the issued commands, when the command is issued, directly pass the Data Point names and values. When the data is reported, the Data Point names and values can also be directly reported.

Related APIs:
To issue commands using write in GizWifiDevice class
To issue commands using write in GizWifiCentralControlDevice class
To issue commands using write in GizWifiSubDevice class
```

* status

```
Description: To optimize the data reporting format, directly report the Data Point names and values.

Related APIs:
The returned value of registerNotifications in GizWifiDevice class
The returned value of registerNotifications in GizWifiCentralControlDevice class
The returned value of registerNotifications in GizWifiSubDevice class

The returned value of write in GizWifiDevice class
The returned value of write in GizWifiCentralControlDevice class
The returned value of write in GizWifiSubDevice class
```

# Description

## gizWifiSDK class

The gizWifiSDK class is the base class of Gizwits App SDK. This class provides the basic APIs for the SDK initialization, settings, user management, and device management.

### startWithAppID

It is used to start the SDK. Note that other API functions can be performed normally after this API function is successfully executed. The SDK startup may take 1 to 2 seconds on the Android platform. It is recommended that you continue to call other API functions when you receive the returned ret value 8316 (it means the SDK startup success) or delays about 2 seconds after startup.

```
startWithAppID({params}, callback(ret, err))
```

#### params

appID:

* Type: string
* Default: none
* Description: The application ID that you applied for on the Gizwits website.

cloudServiceInfo:

* Type: numeric array
* Default: 0
* Description: The domain information of the server to be used. Developers who use the Gizwits production cloud service do not need to use this parameter, which is required only when you want to connect to other cloud services. If the domain name information does not specify a port number, the SDK uses the default service port. In this case, write the domain name like this: api.gizwits.com. If you need to specify a special port, you need to specify both the HTTP and HTTPS ports. In this case, write the domain name like this: api.gizwits.com:81&8443
* Internal fields

```
{
	openAPIInfo: // API service domain name
	siteInfo: // site service domain name
	pushInfo: // push notification service domain name
}
```

specialProductKeys:

* Type: string array
* Default: none
* Description: A list of productKeys of devices to be filtered. Omit to get all discovered devices. Once specified, the SDK will only return the devices after filtered.

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    errorCode: 8316, // the SDK started successfully, numeric type
    msg: // description of the success message, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
}
```

#### Sample code

```
// do not specify the domain name and the productKey filter, the code for reference is as follows: 
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.startWithAppID({"appID": "your_app_id"}, function(ret, err) {
alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});

// to specify cloudServiceInfo and productKey filter, the code for reference is as follows:
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.startWithAppID({"appID": "your_app_id", "specialProductKeys": ["your_product_key"], "cloudServiceInfo": {"openAPIInfo": "xxx.xxxx.com", "siteInfo": "xxx.xxxx.com ”}}, function(ret, err) {
alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability

iOS, Android

Available for the version 1.0.0 and higher

### registerNotifications

It is used to register for the SDK event notifications which include the SDK startup failure or success, device list change reporting, etc.

```
registerNotifications({params}, callback(ret, err))
```

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    GizEventSDK: // SDK event
    {errorCode: xxx, msg: "xxx"}, // event code (see GizWifiErrorCode, numeric type)
    GizEventDevice: // device exception event
    {errorCode: xxx, msg: "xxx"}, // event code (see GizWifiErrorCode, numeric type)
    GizEventM2MService: // M2M exception event
    {errorCode: xxx, msg: "xxx"}, // event code (see GizWifiErrorCode, numeric type)
    GizEventToken: // Token expiration
    {errorCode: xxx, msg: "xxx"}, // event code (see GizWifiErrorCode, numeric type)
    devices: [{ // device array (the following fields are device object information), array type
        mac: // device MAC address, string type
        did: // device unique identifier, string type
        ip: // device IP address, string type
        productKey: // product identifier of the device, the string type
        productName: // product name of the device, string type
        remark: // device remark information, string type
        alias: // device alias, string type
        type: // device type (see enumeration definition GizWifiDeviceType), numeric type 
        netStatus: // device network state (see enumeration definition GizWifiDeviceNetStatus), numeric type
        isLAN: // Whether the device is in the same LAN, boolean type
        isBind: // Whether the device is bound, boolean type
        isDisabled: // Whether the device has been logged out in the cloud, boolean type
        isProductDefined: // Whether the device defines a Data Point, boolean type
        isSubscribed: // Whether the device is subscribed, boolean type
    }]
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type 
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.registerNotifications(function(ret, err) {
    alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability

iOS, Android

Available for the version 1.0.0 and higher

### getVersion

Get the SDK version number.

```
getVersion(callback(ret, err))
```

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    version: // SDK version number, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.getVersion(function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### setLogLevel

Set up the SDK logging.

```
setLogLevel({params})
```

#### params
logLevel:

* Type: Numeric type, see Enumeration Definition GizLogPrintLevel
* Default: 3, for detailed log output
* Description: SDK log output level

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.setLogLevel({"logLevel": 3});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher


### disableLAN

Disable Micro Cycle.

```
disableLAN({params}, callback(ret, err))
```

#### params

disabled:

* Type: Boolean 
* Default: false, enabled
* Description: It can disable the Micro Cycle functions of device discovery and device control in the same LAN.

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    errorCode: 0, // successful execution, numeric type
    msg: // description of the success message, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.disableLAN({"disabled": true}, function(ret, err) {
    alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### setCloudService

Change the service domain name.

```
setCloudService({params}, callback(ret, err))
```

#### params

openAPIDomain:

* Type: string 
* Default: none
* Description: Open API service domain name

openAPIPort:

* Type: numeric
* Default: none
* Description: Open API service port

siteDomain:

* Type: string
* Default: none
* Description: site service domain name

sitePort:

* Type: numeric
* Default: none
* Description: site service port

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    openAPIDomain: // api domain name, string type
    openAPIPort": // api port, numeric type
    siteDomain: // site domain name, string type
    sitePort: // site port, numeric type 
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.setCloudService({
    "openAPIDomain": "your_api_domain",
    "openAPIPort": your_api_port,
    "siteDomain": "your_site_domain",
    "sitePort": your_site_port
}, function(ret, err) {
    alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### getListInfo

Get the SDK version number.

```
getListInfo(callback(ret, err))
```

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    devices: [{ // device array (the following fields are device object information), array type
        mac: // device MAC address, string type
        did: // device unique identifier, string type
        ip: // device IP address, string type
        productKey: // product identifier of the device, the string type
        productName: // product name of the device, string type
        remark: // device remark information, string type
        alias: // device alias, string type
        type: // device type (see enumeration definition GizWifiDeviceType), numeric
        netStatus: // device network state (see enumeration definition GizWifiDeviceNetStatus), numeric type
        isLAN: // Whether the device is in the same LAN device, boolean type
        isBind: // Whether the device is bound, boolean type
        isDisabled: // Whether the device has been logged out in the cloud, boolean type
        isProductDefined: // Whether the device defines a Data Point, boolean type
        isSubscribed: // Whether the device is subscribed, boolean type
    }]
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.getListInfo(function(ret, err) {
        alert("ret = " + JSON.stringify(ret))
});
```

#### Availability
iOS, Android 

Available for the version 1.0.0 and higher

### getPhoneSSID

Get the SSID of the current Wi-Fi LAN where the phone is located.

```
getPhoneSSID(callback(ret, err))
```

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    SSID: // SSID of the current Wi-Fi LAN where the phone is located, string type
}
```
err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.getPhoneSSID(function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### setDeviceOnboarding

It is used to configure the device routing. To be able to connect the device to a Wi-Fi network, you need to configure the device with the Wi-Fi router first. When configuring, you need to send the router SSID and password to be configured to the device.

The device configuration supports two modes: SoftAP and AirLink. Pressing different buttons on the device allows the device to enter the corresponding configuration mode. For the detailed operation, please visit the Gizwits website.

When configuring the SoftAP mode, the device module will create a hotspot, to which the mobile phone must be connected before it can be configured. If the device firmware is provided by Gizwits, the module hotspot name prefix is "XPG-GAgent-" and the password is "123456789". When the device is in AirLink mode, the phone can start configuration at any time. However, regardless of any configuration mode, when the device is online, the mobile phone must be connected to the WLAN to be configured so as to confirm that the device has been configured successfully. When the device is configured successfully, the device MAC address is returned in the callback. If the device is reset, the device did may be available in the device discovery callback.

```
setDeviceOnboarding({params}, callback(ret, err))
```

#### params

ssid:

* Type: string
* Default: none
* Description: Wi-Fi SSID to be configured.

Key:

* Type: string
* Default: none
* Description: Wi-Fi password to be configured.

mode:

* Type: numeric 
* Default: none
* Description: Device configuration mode (see GizWifiConfigureMode enumeration definition).

softAPSSIDPrefix:

* Type: string
* Default: none
* Description: The full SSID name in SoftAPMode mode of Gizwits Gokit with the default prefix is "XPG-GAgent-".

timeout:

* Type: numeric
* Default: 30
* Description: Configure the timeout period. The timeout is recommended to be set to 60 seconds.

gagentTypes:

* Type: numeric array
* Default: 4
* Description: Module type (see GAgentType enumeration definition). If you do not specify this parameter, the Espressif module is configured by default. GizWifiGAgentType defines all the module types supported by the SDK. GizWifiGAgentType also defines a GizGAgentOther enumeration value for developers to use their own configuration library for device configuration.

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    device:{ // the successfully configured device. The following fields are device information:
        "mac": // device MAC
           "did": // device did
           "productKey":// device type identifier
       }
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
// SoftAP configuration
gizWifiSDK.setDeviceOnboarding({
    "ssid": "your_ssid",
    "key": "your_key",
    "mode": 0,
    "softAPSSIDPrefix": "your_prefix",
    "timeout": 60
}, function(ret, err) {
    alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});

// AirLink configuration for Espressif module
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
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### getSSIDList

Get a list of device hotspots. When the device Wi-Fi module is in the SoftAP mode, you can obtain a list of Wi-Fi hotspots that the device searches for. This API requires the phone to connect to the SoftAP hotspot of the device module before it can work.

```
getSSIDList(callback(ret, err))
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    wifiSSIDs: [{ // Wi-Fi hotspot list, the following fields are hotspot information:
           "ssid": // Wi-Fi ssid
           "rssi": // Wi-Fi signal strength
       }]
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.getSSIDList(function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### getBoundDevices

Get a list of bound devices. There are different ways for different network environments:
When the mobile phone can access the external network, the API initiates a request for obtaining a bound device list to the cloud;
When the mobile phone cannot access the external network, the devices in the current WLAN are discovered in real time, but retains the bound device that has been acquired before;
When the mobile phone has no connection, the unbound devices in the WLAN will disappear, but the bound devices that have been acquired before will be retained.

```
getBoundDevices({params}, callback(ret, err))
```

#### params

uid:

* Type: string
* Default: none
* Description: The uid obtained after the user logs in. When uid and token are not passed, only the Micro Cycle devices will be obtained.

token:

* Type: string
* Default: none
* Description: The token obtained after the user logs in. When uid and token are not passed, only the Micro Cycle devices will be obtained.

specialProductKeys:

* Type: string array
* Default: none
* Description: Specify the identifiers of product types to be filtered. Multiple Product Keys to be filtered can be specified at the same time.

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    devices: [{ // device array (the following fields are device object information), array type
        Mac: // device MAC address, string type
        did: // device unique identifier, string type
        ip: // device IP address, string type
        productKey: // product identifier of the device, string type
        productName: // product name of the device, string type
        remark: // device remark information, string type
        alias: // device alias, string type
        type: // device type (see enumeration definition GizWifiDeviceType), numeric
        netStatus: // device network state (see enumeration definition GizWifiDeviceNetStatus), numeric
        isLAN: // Whether the device is in the same LAN, boolean type
        isBind: // Whether the device is bound, boolean type
        isDisabled: // Whether the device has been logged out in the cloud, boolean type
        isProductDefined: // Whether the device defines a Data Point, boolean type
        isSubscribed: // Whether the device is subscribed, boolean type
    }]
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
    gizWifiSDK.getBoundDevices({
        "uid": 'your_uid',
        "token": 'your_token',
        "specialProductKeys": ['your_product_key']
     }, function (ret1, err1) {
        alert("ret1 = " + JSON.stringify(ret1) + "err1 = " + JSON.stringify(err1))
    });
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### bindRemoteDevice

Bind the remote devices to the cloud.

```
bindRemoteDevice({params}, callback(ret, err))
```

#### params

uid:

* Type: string
* Default: none
* Description: The uid obtained after the user logs in.

token:

* Type: string
* Default: none
* Description: The token obtained after the user logs in.

mac:

* Type: string
* Default: none
* Description: The MAC of the device to be bound 

productKey:

* Type: string
* Default: none
* Description: The productKey of the device to be bound.

productSecret:

* Type: string
* Default: none
* Description: The productSecret of the device to be bound

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    did: // device unique identifier, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
}
```

#### Sample code

```
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
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### unbindDevice

Unbind the device from the cloud. After logging in, you can unbind the bound device from your own account in the cloud.

```
unbindDevice({params}, callback(ret, err))
```

#### params
uid:

* Type: string
* Default: none
* Description: The uid obtained after the user logs in.

token:

* Type: string
* Default: none
* Description: The token obtained after the user logs in.

did:

* Type: string
* Default: none
* Description: The unique identifier of the device.

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    did: // device unique identifier, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.unbindDevice({
    "uid": 'your_uid',
    "token": 'your_token',
    "did": 'your_device_id'
}, function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher


### userLoginAnonymous

Log in anonymously with no need to register a user account.

```
userLoginAnonymous(callback(ret, err))
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    uid: // user uid, string type
    token: // login session token, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.userLoginAnonymous(function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### userLogin

User login. You need to log in with the registered user name and password, which can be the mobile phone user name, email user name or regular user name.

```
userLogin({params}, callback(ret, err))
```

#### params

userName:

* Type: string
* Default: none
* Description: The username to log in.

password:

* Type: string
* Default: none
* Description: The password to log in.

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    uid: // user uid, string type
    token: // login session token, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.userLogin({
    "userName": 'your_user_name',
        "password": 'your_password'
}, function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
})
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### userLoginWithThirdAccountType

Login with third party account which supports Baidu, Sina, and QQ. You need to use the third-party shareSDK tool or the corresponding SDK to obtain the uid and token before using this API.

```
userLoginWithThirdAccountType({params}, callback(ret, err))
```

#### params

uid: uid obtained after logging in to a third-party authentication platform

* Type: string
* Default: none
* Description: User id used to log in

token: the token obtained after logging in to a third-party authentication platform

* Type: string
* Default: none
* Description: The password used to log in

thirdAccountType:

* Type: numeric
* Default: none
* Description: Third-party account type (see GizThirdAccountType enumeration definition)

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    uid: // uid obtained after logging in to Gizwits IoT Cloud, string type
    token: // token obtained after logging in to Gizwits IoT Cloud, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.userLoginWithThirdAccountType({
        "thirdAccountType": 0,
        "uid": 'your_third_uid',
        "token": 'your_third_token'
}, function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### requestSendVerifyCode

Request SMS verification code with the App Secret and the mobile phone number.

```
requestSendVerifyCode({params}, callback(ret, err))
```

#### params

appSecret:

* Type: string
* Default: none
* Description: The secret information of the App, as seen from site.gizwits.com

phone:

* Type: string
* Default: none
* Description: mobile phone number

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    errorCode: 0, // The verification code is successfully obtained, numeric type
    msg: // message description, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.requestSendVerifyCode({
        "appSecret": 'your_app_secret',
        "phone": 'your_phone_number'
}, function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher


### getCaptchaCode

Get a captcha code with App Secret.

```
getCaptchaCode({params}, callback(ret, err))
```

#### params

appSecret:

* Type: string
* Default: none
* Description: The secret of the application is the signature string corresponding to the AppID, as seen from site.gizwits.com

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    token: // captcha token, expires after 1 hour, string type
    captchaId: // captcha code id, expires after 5 minutes, string type
    captchaURL: // captcha code url, expires after use, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
}
```
#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.getCaptchaCode({
        "appSecret": 'your_app_secret'
}, function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### requestSendPhoneSMSCode

Obtain SMS verification code with captcha code.

```
requestSendPhoneSMSCode({params}, callback(ret, err))
```

#### params

token:

* Type: string
* Default: none
* Description: Captcha token, obtained by getCaptchaCode

captchaId:

* Type: string
* Default: none
* Description: Captcha id, obtained by getCaptchaCode

captchaCode:

* Type: string
* Default: none
* Description: Verification code, whose content is from the image

phone:

* Type: string
* Default: none
* Description: Mobile phone number

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    errorCode: 0, // The verification code is successfully obtained, numeric type
    msg: // message description, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.requestSendPhoneSMSCode({
        "token": 'your_captcha_code_token',
        "captchaId": 'your_captcha_code_id',
        "captchaCode": 'your_captcha_code',
        "phone": 'your_phone_number'
}, function(ret, err) {
    alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability

iOS, Android

Available for the version 1.0.0 and higher

### verifyPhoneSMSCode

Verify the SMS verification code. Note that after verifying the SMS verification code, the verification code will be invalid and can no longer be used for registration with the mobile phone.

```
verifyPhoneSMSCode({params}, callback(ret, err))
```

#### params
token:

* Type: string
* Default: none
* Description: Captcha token, obtained by getCaptchaCode

phoneCode:

* Type: string
* Default: none
* Description: The verification code content in the SMS

phone:

* Type: string
* Default: none
* Description: Mobile phone number

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    errorCode: 0, // The verification code is successfully obtained, numeric type
    msg: // message description, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.verifyPhoneSMSCode({
        "token": 'your_captcha_code_token',
        "phoneCode": 'your_phone_sms_code',
        "phone": 'your_phone_number'
}, function(ret, err) {
    alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### registerUser

User registration with specified user type. The user name of the mobile phone user is the mobile phone number, the user name of the Email user is the Email address, and the user name of the regular user can be the normal user name.

```
registerUser({params}, callback(ret, err))
```

#### params
userName:

* Type: string type
* Default: none
* Description: Username.

password:

* Type: string type
* Default: none
* Description: Password.

verifyCode:

* Type: string type
* Default: none
* Description: SMS verification code, invalid after registration and cannot be used again.

accountType:

* Type: string type
* Default: none
* Description: User type, see the GizUserAccountType enumeration definition for details. When registering with mobile phone number, this parameter is specified as the mobile phone user. When registering with Email address, this parameter is specified as the Email user. When registering with a normal user name, this parameter is specified as the regular user.

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    uid: // uid returned after successful registration, string type
    token: // token returned after successful registration, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.registerUser({
    "userName": 'your_phone_number',
    "password": 'your_password',
    "verifyCode": 'your_verify_code',
    "accountType": 1
}, function(ret, err) {
    alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher


### transAnonymousUser

The user type conversion for anonymous user who can be converted to a mobile phone user or regular user. Note that the target user account must be unregistered.

```
transAnonymousUser({params}, callback(ret, err))
```

#### params
token:

* Type: string
* Default: none
* Description: The token obtained when the user logs in or registers.

userName:

* Type: string
* Default: none
* Description: The target user account of regular user or mobile phone user

password:

* Type: string
* Default: none
* Description: The user password after conversion

verifyCode:

* Type: string
* Default: none
* Description: SMS verification code to be used when converted to a mobile phone user

accountType:

* Type: numeric
* Default: none
* Description: User type, see the GizThirdAccountType enumeration definition for details. When the target user name is a mobile phone number, this parameter is specified as 1. When the target user name is a regular user account, this parameter is specified as 0.

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    uid: // uid returned after successful registration, string type
    token: // token returned after successful registration, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
}
```

#### Sample code

```
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
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### resetPassword

It is used to reset the user password.

```
resetPassword({params}, callback(ret, err))
```

#### params
userName:

* Type: string
* Default: none
* Description: The mobile phone number or Email address of the user account whose password is to be reset

verifyCode:

* Type: string
* Default: none
* Description: SMS verification code used when resetting a mobile phone user password.

newPassword:

* Type: string
* Default: none
* Description: New password

accountType:

* Type: numeric type
* Default: none
* Description: User type, see the GizThirdAccountType enumeration definition for details. When the user name of the password to be reset is a mobile phone number, this parameter is specified as mobile phone user. When the user name of the password to be reset is an Email address, this parameter is specified as Email user.

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    errorCode: 0 // successful execution, numeric type
    msg: // message description, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.resetPassword({
    "userName": 'your_phone_number',
    "verifyCode": 'your_verify_code',
    "newPassword": 'your_new_password',
    "accountType": 1
}, function(ret, err) {
    alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### changeUserPassword

Modify the user password.

```
changeUserPassword({params}, callback(ret, err))
```

#### params

token:

* Type: string
* Default: none
* Description: The token obtained when the user logs in or registers.

oldPassword:

* Type: string
* Default: none
* Description: Old password

newPassword:

* Type: string
* Default: none
* Description: New password

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    errorCode: 0 // successful execution, numeric type
    msg: // message description, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.changeUserPassword({
    "token": 'your_token',
    "oldPassword": 'your_old_password',
    "newPassword": 'your_new_password'
}, function(ret, err) {
    alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### changeUserInfo

```
changeUserInfo({params}, callback(ret, err))
```

#### params
token:

* Type: string
* Default: none
* Description: The token obtained when the user logs in or registers.

userName:

* Type: string
* Default: none
* Description: The mobile phone number or Email address to be modified

verifyCode:

* Type: string
* Default: none
* Description: SMS verification code to be used when modifying the mobile phone number

accountType:

* Type: string
* Default: none
* Description: User type, see the GizThirdAccountType enumeration definition for details. When the mobile phone number is modified, the accountType is set to 1; when the regular user name is modified, the accountType is set to 2; when the personal information is modified, the accountType is set to 0; when the user name and personal information are modified at the same time, the accountType is specifed according to the mobile phone number or Email address to be modified.

additionalInfo:

* Type: string
* Default: none
* Description: The personal information to be modified, as detailed in the GizUserInfo class definition. If you only want to modify your personal information, you need to specify the token and omit username and code.
* Internal fields:

```
{
    "name": // nickname, string type
    "gender": // gender, see UserGenderType enumeration, numeric type
    "birthday": // birthday, string type
    "address": // address, string type
    "remark": // comment, string type
}
```

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    errorCode: 0, // conversion succeeded, numeric type
    msg: // message description, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
}
```

#### Sample code

```
// Modify the mobile phone number
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.changeUserInfo({
    "token": 'your_token',
    "userName": 'your_phone_number',
    "verifyCode": 'your_verify_code',
    "accountType": 1
}, function(ret, err) {
    alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### getUserInfo

Get user information. After the user logs in, the user's personal information can be obtained.

```
getUserInfo({params}, callback(ret, err))
```

#### params
token:

* Type: string
* Default: none
* Description: The token obtained when the user logs in or registers.

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    "uid": // user uid, string type
    "username": // username, string type
    "email": // Email address, string type
    "phone": // mobile phone number, string type
    "isAnonymous": // Whether it is an anonymous user, boolean type
    "name": // nickname, string type
    "gender": // gender, UserGenderType enumeration type
    "birthday": // birthday, string type
    "address": // address, string type
    "remark": // comment, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.getUserInfo({
    "token": 'your_token'
},function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### getGroups

Get a list of device groups under the user account. You need to complete the user login before you can get the device grouping list. Device grouping refers to dividing the devices managed by a central control gateway into multiple groups, which facilitates batch operation of devices. A device group can only contain one type of devices. For the common application scenarios, such as turning off all the lights in a room before going to bed, dimming the two floor lamps on the bedside, you can divide the devices into two groups, one is the switch light group, and the other is floor lamp group.

```
getGroups({params}, callback(ret, err))
```

#### params
uid:

* Type: string
* Default: none
* Description: The uid obtained when the user logs in or registers.

token:

* Type: string
* Default: none
* Description: The token obtained when the user logs in or registers.

specialProductKeys:

* Type: string
* Default: none
* Description: The identifiers of the groups to be filtered, an array of strings. Omit not to filter.

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    groups:[{ // group objects (the following fields are group object information), array type
        "gid": // group ID, string type
    }]
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.getGroups({
        "uid": 'your_uid',
        "token": 'your_token',
        "specialProductKeys": []
},function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### addGroup

Add a device group and return the current list of device groups after adding

```
addGroup({params}, callback(ret, err))
```

#### params
uid:

* Type: string
* Default: none
* Description: The uid obtained when the user logs in or registers.

token:

* Type: string
* Default: none
* Description: The token obtained when the user logs in or registers.

productKey:

* Type: string
* Default: none
* Description: Specify the group type identifier

groupName:

* Type: string
* Default: none
* Description: Specify the group name

specialDevices:

* Type: JSON object
* Default: none
* Description: Specify the devices to be added into the group. Omit not to add devices.

* Internal fields

```
{
    "mac": // MAC address of the central control gateway to which the child device belongs, string type
    "did": // did of the central control gateway to which the child device belongs, string type
    "subDid": // child device's did, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    groups:[{ // group objects (the following fields are group object information), array type
        "gid": // group ID, string type
    }]
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
}
```

#### Sample code

```
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
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### removeGroup

Delete a device group and returns the current device group list after deletion.

```
removeGroup({params}, callback(ret, err))
```

#### params
uid:

* Type: string
* Default: none
* Description: The uid obtained when the user logs in or registers.

token:

* Type: string
* Default: none
* Description: The token obtained when the user logs in or registers.

gid:

* Type: string
* Default: none
* Description: the ID of the group to be deleted

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    groups:[{ // group objects (the following fields are group object information), array type
        "gid": // group ID, string type
    }]
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
}
```

#### Sample code

```
var gizWifiSDK = api.require('gizWifiSDK');
gizWifiSDK.removeGroup({
    "uid": 'your_uid',
            "token": 'your_token',
       "gid": 'your_group_id'
}, function (ret, err) {
    alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### editGroup

Edit a device group and return the current device group list after edit.

```
editGroup({params}, callback(ret, err))
```

#### params
uid:

* Type: string
* Default: none
* Description: The uid obtained when the user logs in or registers.

token:

* Type: string
* Default: none
* Description: The token obtained when the user logs in or registers.

gid:

* Type: string
* Default: none
* Description: The ID of the group to be edited

groupName:

* Type: string
* Default: none
* Description: The name of the group to be edited

specialDevices:

* Type: JSON object
* Default: none
* Description: The device information in the group to be edited. Omit not to specify a device.

* Internal fields

```
{
    "mac": // MAC address of the central control gateway to which the child device belongs, string type
    "did": // ID of the central control gateway to which the child device belongs, string type
    "subDid": // child device's did, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    groups:[{ // group objects (the following fields are group object information), array type
        "gid": // group ID, string type
    }]
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
}
```

#### Sample code

```
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
```
	
#### Availability
iOS, Android

Available for the version 1.0.0 and higher


## gizWifiDevice class 

This class provides the function of device login, control, and receiving device information.

### registerNotifications

Register to receive device status change notifications. You can register with the device's MAC address and did. After registration, the device's subsequent login state changes and running state changes are reported to the App in real time. After the device is unbound or disconnected, the data will not be reported again.

```
registerNotifications({params}, callback(ret, err))
```

#### params

device:

* Type: JSON object
* Default: none
* Description: The device object whose notifications are to be received. The device object information can be obtained after getting the device list.
* Internal fields

```
{
    "mac": // device MAC address, string type
    "did": // device did, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    device: { // device object (the following fields are device object information), object type
        "mac": // device MAC address, string type
        "did": // device did, string type
    }
    netStatus: // device online state (see enumeration definition GizWifiDeviceNetStatus), numeric type
    data: { // device state, string type
        "attrName": "attrValue", // Data Point name: operation value
    }
    alerts: { // alarm, array type
        "attrName": "attrValue" // Data Point name: Alarm message
    }
    faults: { // fault, array type
        "attrName": "attrValue" // Data Point name: Fault message
    }
    binary: // binary data for transparent transmission, base64 encoded string, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
    device:{ // device object (the following fields are device object information), object type
        "mac": // device MAC address, string type
        "did": // device did, string type
    }
}
```

#### Sample code

```
var gizWifiDevice = api.require('gizWifiDevice');
gizWifiDevice.registerNotifications({
    "device": {
        "did": 'your_device_id',
        "mac": 'your_device_mac'
         }
}, function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### setSubscribe

Manage the device subscription. Subscribe to the device to receive the device push notifications and unsubscribe not to receive the device push notifications. After subscribing to the device, the SDK will automatically log in and automatically bind the device. After unsubscribing, the device will be automatically disconnected, but will not be automatically unbound. In general, device subscriptions will succeed, and the SDK will remember if you subscribe to a device.

```
setSubscribe({params}, callback(ret, err))
```

#### params
subscribed:

* Type: Boolean type
* Default: none
* Description: Subscribe or unsubscribe. True means subscription, false means unsubscribe

device:

* Type: JSON object
* Default: none
* Description: The device object to be logged in. The device object information can be obtained after you get the device list.
* Internal fields

```
{
    "mac": // device MAC address, string type
    "did": // device did, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    isSubscribed: // Whether you subscribe the device or unsubscribe, boolean type
    device: { // device object (the following fields are device object information), object type
        "mac": // device MAC address, string type
        "did": // device did, string type
    }
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
    device:{ // device object (the following fields are device object information), object type
        "mac": // device MAC address, string type
        "did": // device did, string type
    }
}
```

#### Sample code

```
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
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### getDeviceStatus

Get the device status. Performing subscription makes a device controllable in order to obtain its states, including the running states, alarms, faults, and data via transparent transmission.

```
getDeviceStatus({params}, callback(ret, err))
```

#### params
device:

* Type: JSON object
* Default: none
* Description: The device object to be queried, the device object information can be obtained when you get the device list.
* Internal fields

```
{
    "mac": // device MAC address, string type
    "did": // device did, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    device:{ // The device object on which the operation command is executed successfully (the following fields are device object information), object type
        "mac": // device MAC address, string type
        "did": // device did, string type
    }
    "data": { // device status, object type
        "attrName": "attrValue", // Data Point name: Operation value. If the Data Point is an extension type, the operation value is a base64 encoded string.
    }
    "alerts": { // alarm, object type
        "attrName": "attrValue" // Data Point name: Alarm message
    }
    "faults": { // fault, object type
        "attrName": "attrValue" // Data Point name: Fault message
    }
    "binary": // binary data for transparent transmission, base64 encoded string, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
    device:{ // device object (the following fields are device object information), object type
        "mac": // device MAC address, string type
        "did": // device did, string type
    }
}
```

#### Sample code

```
var gizWifiDevice = api.require('gizWifiDevice');
gizWifiDevice.getDeviceStatus({
    "device": {
        "did": 'your_device_id',
        "mac": 'your_device_mac'
    }
}, function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### write

It is used to send commands to devices. Performing subscription makes a device controllable in order to issues commands. Device control supports both Macro Cycle and Micro Cycle (i.e. WAN and LAN environments), and the SDK will give priority to Micro Cycle. Device control of Macro Cycle is only performed when the device can only be accessed through Macro Cycle. After the commands from Apps reach the device, the device current state changes will be reported. The Apps can obtain status data through the callback functions, including the device running status, alarms, faults, and data via transparent transmission.

Hardware product developers define the device's operational command set based on product capabilities. On the App side, the device's operation commands are formatted as Data Points and sent to the device. Data Points can be defined as Boolean, string, numeric, and extension type. How to define Data Points, please visit the Gizwits website.

If commands of device control need to transferred via transparent transmission, it can be implemented by defining Data Points of the extension type. For the binary data, it should be encoded as a base64 string and then passed in the data parameter of the write API. Similarly, for the binary data transparently transmitted by the device to the App, after received, it must first be decoded into binary data from base64 to be used correctly. Please note that you must use base64 codec, otherwise the binary data cannot be transparently transmitted correctedly.

Requirement: The format of the issued command should be delivered in the correct JSON type. For example, a boolean value issued with 0 or 1 may result in failure to deliver.

```
write({params}, callback(ret, err))
```

#### params

device:

* Type: JSON object
* Default: none
* Description: The device object to which the operation commands is to be sent, the device object information can be obtained when the device list is acquired.
* Internal fields

```
{
    "mac": // device MAC address, string type
    "did": // device did, string type
}
```

sn:

* Type: numeric type
* Default: none
* Description: The command sequence number can be carried when the operation command is sent. The command sequence number is generated and maintained by the App.

data:

* Type: JSON object
* Default: none
* Description: The operation command to be sent.
* Internal fields

```
{
    "data": { // device Data Point object type
        ......
        "attrName": "attrValue", // Operation command: Data Point name, operation value
                                // The Data Point name is a string type, and the type of the operation value is defined in the Data Point.
                                // If the Data Point is an extension type, the operation value needs to be a base64 encoded string
        ......
    }
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    device:{ // device object (the following fields are device object information), object type
        "mac": // device MAC address, string type
        "did": // device did, string type
    }
    "sn": // The sequence number of the issued command 
    "data": { // state, object type
        "attrName": "attrValue", // Data Point name: operation value. If the Data Point is an extension type, the operation value needs to be a base64 encoded string.
    }
    "alerts": { // alarm, object type
        "attrName": "attrValue" // Data Point name: Alarm message
    }
    "faults": { // fault, object type
        "attrName": "attrValue" // Data Point name: Fault message
    }
    "binary": // binary data for transparent transmission, base64 encoded string, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
    device:{ // device object, object type
        "mac": // device MAC address, string type
        "did": // device did, string type
    }
}
```

#### Sample code

```
var gizWifiDevice = api.require('gizWifiDevice');
gizWifiDevice.write({
    "device": {
        "did": 'your_device_id',
        "mac": 'your_device_mac'
    },
    "sn": 5
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
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### getHardwareInfo

Get device hardware information. Only in the Micro Cycle, the device hardware information can be obtained after the device logs in.

```
getHardwareInfo({params}, callback(ret, err))
```

#### params
device:

* Type: JSON object
* Default: none
* Description: Device object, device object information can be obtained when you get the device list.
* Internal fields

```
{
    "mac": // device MAC address, string type
    "did": // device did, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    device: { // device object (the following fields are device object information), object type
        "mac": // device MAC address, string type
        "did": // device did, string type
    }
    hardwareInfo: { // device hardware information, object type
        "wifiHardVer": // Wi-Fi hardware version number, string type
        "wifiSoftVer": // Wi-Fi software version number, string type
        "mcuHardVer": // device hardware version number, string type
        "mcuSoftVer": // device software version number, string type
        "firmwareId": // firmware fid, string type
        "firmwareVer": // firmware version number, string type
        "productKey": // product type identifier
    }
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
    device:{ // device object, object type
        "mac": // device MAC address, string type
        "did": // device did, string type
    }
}
```

#### Sample code

```
var gizWifiDevice = api.require('gizWifiDevice');
gizWifiDevice.getHardwareInfo({
        "device": {
        "did": 'your_device_id',
        "mac": 'your_device_mac'
        }
}, function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### exitProductionTesting

Exit the End-of-line test mode. This API can be called without subscribing to the device, and the device will respond when it enters the End-of-line test mode.

```
exitProductionTesting({params}, callback(ret, err))
```

#### params
device:

* Type: JSON object
* Default: none
* Description: Device object, device object information can be obtained when you get the device list.
* Internal fields

```
{
    "mac": // device MAC address, string type
    "did": // device did, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    device: { // device object, object type
        "mac": // device MAC address, string type
        "did": // device did, string type
    }
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
    device:{ // device object, object type
        "mac": // device MAC address, string type
        "did": // device did, string type
    }
}
```

#### Sample code

```
var gizWifiDevice = api.require('gizWifiDevice');
gizWifiDevice.exitProductionTesting({
        "device": {
        "did": 'your_device_id',
        "mac": 'your_device_mac'
        }
},function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### setCustomInfo

Modify the device's remark and alias after it is bound.

```
setCustomInfo({params}, callback(ret, err))
```

#### params
device:

* Type: JSON object
* Default: none
* Description: Device object to modify notes and aliases
* Internal fields

```
{
    "mac": // device MAC address, string type
    "did": // device did, string type
}
```

remark:

* Type: JSON object
* Default: none
* Description: The remark information to be modified. Omit not to update.

alias:

* Type: JSON object
* Default: none
* Description: The alias information to be modified. Omit not to update.

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    device: { // device object, object type
        "mac": // device MAC address, string type
        "did": // device did, string type
    }
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
    device:{ // device object, object type
        "mac": // device MAC address, string type
        "did": // device did, string type
    }
}
```

#### Sample code

```
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
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### getDeviceInfo

Get basic information about the device.

```
getDeviceInfo({params}, callback(ret, err))
```

#### params
device:

* Type: JSON object
* Default: none
* Description: The device object, the device MAC and did can be obtained when getting the device list.
* Internal fields

```
{
    "mac": // central control device MAC address, string type
    "did": // central control device did, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    device: { // device object (the following field is device information), object type
        mac: // device MAC address, string type
        did: // device unique identifier, string type
        ip: // device IP address, string type
        productKey: // product identifier of the device, string type
        productName: // product name of the device, string type
        remark: // device remark information, string type
        alias: // device alias, string type
        type: // device type (see enumeration definition GizWifiDeviceType), numeric type
        netStatus: // device network status (see enumeration definition GizWifiDeviceNetStatus), numeric type
        isLAN: // Whether the device is in the same WLAN, boolean type
        isBind: // Whether the device is bound, boolean type
        isDisabled: // Whether the device has been logged out in the cloud, boolean type
        isProductDefined: // Whether the device defines a Data Point, boolean type
        isSubscribed: // Whether the device is subscribed, boolean type
    }
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
    device: { // device object (the following field is device object information), object type
        "mac": // device MAC address, string type
        "did": // device did, string type
    }
}
```

#### Sample code

```
var gizWifiDevice = api.require('gizWifiDevice');
gizWifiDevice.getDeviceInfo({
    "device": {
        "did": 'your_device_id',
        "mac": 'your_device_mac'
        }
}, function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

## gizWifiCentralControlDevice class
This is the Gizwits central control Wi-Fi device class. This class provides the functions of the central control device to obtain the child device list, add child devices, and delete child devices. The central control device class inherits from the GizWifiDevice class and can use all APIs in the GizWifiDevice class.

After the device list is obtained, the type field in the getDeviceInfo() of the GizWifiDevice class can be used to know whether the device is a central control device. After the central control device logs in, it can perform operations such as adding and deleting child devices.

### registerNotifications

Register to get the child device list change notifications. When the central control device is in the state of adding a child device, it will actively report the child device that is currently connected to the network. After notification registration, the SDK will report the list of child devices to the App.

```
registerNotifications({params}, callback(ret, err))
```

#### params
device:

* Type: JSON object
* Default: none
* Description: the central control device object whose notifications are to be received after registration, the device object information can be obtained when getting the device list.
* Internal fields

```
{
    "mac": // central control device MAC address, string type
    "did": // central control device did, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    device:{ // central control device object, object type
        "mac": // central control device MAC address, string type
        "did": // central control device did, string type
    }
    netStatus: // The network state of the central control device (see the enumeration definition GizWifiDeviceNetStatus), numeric type
    subDevices: { // list of child devices reported by the control device, object array type
        "mac": // central control device MAC, string type
        "did": // central control device did, string type
        "subDid": // central control child device did, string type
        "netStatus": // Whether the central control child device is online (see the enumeration definition GizWifiDeviceNetStatus), numeric type
        "subProductKey": // central control child device type identifier, string type
        "subProductName": // central control child device product name, string type
        "type": // central control child device type (see enumeration definition GizWifiDeviceType), numeric type
        "productKey": // central control device type identifier, string type
        "productName": // central control device product name, string type
    }
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
    device: { // device object, object type
        "mac": // central control device MAC address, string type
        "did": // central control device did, string type
    }
}
```

#### Sample code

```
var gizWifiCentralControlDevice = api.require('gizWifiCentralControlDevice');
gizWifiCentralControlDevice.registerNotifications({
        "device": {
                "mac": 'your_device_mac',
                "did": 'your_device_id'
        }
}, function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### getSubDevices

Get a list of child devices.

```
getSubDevices({params}, callback(ret, err))
```

#### params
device:

* Type: JSON object
* Default: none
* Description: The central control device object, device object information can be obtained when getting the device list.
* Internal fields

```
{
    "mac": // central control device MAC address, string type
    "did": // central control device did, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    device: { // central control device object, object type
        "mac": // central control device MAC address, string type
        "did": // central control device did, string type
    }
    subDevices: { // list of child devices reported by the control device, object array type
        "mac": // central control device MAC, string type
        "did": // central control device did, string type
        "subDid": // child device did, string type
        "subProductKey": // child device type identifier, string type
        "subProductName": // child device product name, string type
        "type": // child device type, numeric type
        "netStatus": // Whether the central control child device is online (see the enumeration definition GizWifiDeviceNetStatus), numeric type
        "productKey": // central control device type identifier, string type
        "productName": // central control device product name, string type
    }
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
    device:{ // control device object, object type
        "mac": // central control device MAC address, string type
        "did": // central control device did, string type
    }
}
```

#### Sample code

```
var gizWifiCentralControlDevice = api.require('gizWifiCentralControlDevice');
gizWifiCentralControlDevice.getSubDevices({
        "device": {
                "mac": 'your_device_mac',
        "did": 'your_device_id'
        }
}, function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### addSubDevice

Add a child device.

```
addSubDevice({params}, callback(ret, err))
```

#### params
device:

* Type: JSON object
* Default: none
* Description: The central control device object, device object information can be obtained when getting the device list.
* Internal fields

```
{
    "mac": // central control device MAC address, string type
    "did": // central control device did, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    device:{ // central control device object, object type
        "mac": // central control device MAC address, string type
        "did": // central control device did, string type
    }
    subDevices: { // list of child devices reported by the central control device, object array type
        "mac": // central control device MAC, string type
        "did": // central control device did, string type
        "subDid": // child device did, string type
        "subProductKey": // child device type identifier, string type
        "subProductName": // child device product name, string type
        "type": // child device type, numeric type
        "netStatus": // Whether the central control child device is online (see the enumeration definition GizWifiDeviceNetStatus), numeric type
        "productKey": // central control device type identifier, string type
        "productName": // central control device product name, string type
    }
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
    device:{ // central control device object, object type
        "mac": // central control device MAC address, string type
        "did": // central control device did, string type
    }
}
```

#### Sample code

```
var gizWifiCentralControlDevice = api.require('gizWifiCentralControlDevice');
gizWifiCentralControlDevice.addSubDevice({
        "device": {
                "mac": 'your_device_mac',
        "did": 'your_device_id'
        }
}, function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### deleteSubDevice

Delete the child device.

```
deleteSubDevice({params}, callback(ret, err))
```

#### params

device:

* Type: JSON object
* Default: none
* Description: The central control device object, device object information can be obtained when getting the device list.
* Internal fields

```
{
    "mac": // central control device MAC address, string type
    "did": // central control device did, string type
}
```

subDid:

* Type: JSON object
* Default: none
* Description: The did of the child device to be deleted

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    device:{ // central control device object (the following fields are device object information), object type
        "mac": // central control device MAC address, string type
        "did": // central control device did, string type
    }
    subDevices: { // list of child devices reported by the central control device, object array type
        "mac": // central control device MAC, string type
        "did": // central control device did, string type
        "subDid": // child device did, string type
        "subProductKey": // child device type identifier, string type
        "subProductName": // child device product name, string type
        "type": // child device type, numeric type
        "netStatus": // Whether the central control child device is online (see the enumeration definition GizWifiDeviceNetStatus), numeric type
        "productKey": // central control device type identifier, string type
        "productName": // central control device product name, string type
    }
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
    device:{ // central control device object, object type
        "mac": // central control device MAC address, string type
        "did": // central control device did, string type
    }
}
```

#### Sample code

```
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
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

## gizWifiSubDevice class 

This is the Gizwits Wi-Fi child device class. This class provides child device control and child device status reporting. This class inherits from the GizWifiDevice class and can use all APIs in the GizWifiDevice class.

### registerNotifications

Register to get the child device status change notifications.

```
registerNotifications({params}, callback(ret, err))
```

#### params
device:

* Type: JSON object
* Default: none
* Description: The child device object whose notifications are to be received. The child device object information can be obtained when getting the child device list.
* Internal fields

```
{
    "mac": // device MAC address, string type
    "did": // device did, string type
    "subDid": // child device did, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    device:{ // child device object, object type
        "mac": // central control device MAC address, string type
        "did": // central control device did, string type
        "subDid": // child device did, string type
    }
    netStatus: // Whether the child device is online (see GizWifiDeviceNetStatus), numeric type
    "data": { // device status, object type
        "attrName": "attrValue", // Data Point name: Operation value. If the Data Point is an extension type, the operation value needs to be a base64 encoded string.
    }
    "alerts": { // alarm, object type
        "attrName": "attrValue" // Data Point name: Alarm message
    }
    "faults": { // fault, object type
        "attrName": "attrValue" // Data Point name: Fault message
    }
    "binary": // binary data for transparent transmission, base64 encoded string, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
    device: { // device object (the following fields are device object information), object type
        "mac": // device MAC address, string type
        "did": // device did, string type
        "subDid": // child device did, string type
    }
}
```

#### Sample code

```
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
```

#### Availability
iOS, Android 

Available for the version 1.0.0 and higher

### getDeviceStatus

Get the device status. Only when a subscribed device becomes controllable, its states can be obtained, including the running state, alarms, faults, and data via transparent transmission.

```
getDeviceStatus({params}, callback(ret, err))
```

#### params
device:

* Type: JSON object
* Default: none
* Description: The device object to be queried. The device object information can be obtained when getting the device list.
* Internal fields

```
{
    "mac": // device MAC address, string type
    "did": // device did, string type
    "subDid": // child device did, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    device:{ // device object (the following fields are device object information), object type
        "mac": // device MAC address, string type
        "did": // device did, string type
        "subDid": // child device did, string type
    }
    "data": { // device status, object type
        "attrName": "attrValue", // Data Point name: Operation value. If the Data Point is an extension type, the operation value needs to be a base64 encoded string.
    }
    "alerts": { // alarm, object type
        "attrName": "attrValue" // Data Point name: Alarm message
    }
    "faults": { // fault, object type
        "attrName": "attrValue" // Data Point name: Fault message
    }
    "binary": // binary data for transparent transmission, base64 encoded string, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), number type
    msg: // error description, string type
    device:{ // device object (the following fields are device object information), object type
        "mac": // device MAC address, string type
        "did": // device did, string type
        "subDid": // child device did, string type
    }
}
```

#### Sample code

```
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
```

#### Availability
iOS, Android 

Available for the version 1.0.0 and higher

### write

It is used to control child devices, which is the same as the regular device control.

```
write({params}, callback(ret, err))
```

#### params
device:

* Type: JSON object
* Default: none
* Description: The device object to which the operation commands are to be sent, the device object information can be obtained when getting the device list.
* Internal fields

```
{
    "mac": // device MAC address, string type
    "did": // device did, string type
    "subDid": // child device did, string type
}
```

sn:

* Type: JSON object
* Default: none
* Description: The sequence number of the command to be sent, generated and maintained by the App

data:

* Type: JSON object
* Default: none
* Description: The command to be sent, the format is the same as the normal device control.
* Internal fields

```
{
    "data": { // device status, string type
        "attrName": "attrValue", // Data Point name: Operation value. If the Data Point is an extension type, the operation value needs to be a base64 encoded string.
    }
    "alerts": { // alarm, array type
        "attrName": "attrValue" // Data Point name: Alarm message
    }
    "faults": { // fault, array type
        "attrName": "attrValue" // Data Point name: Fault message
    }
    "binary": // binary data for transparent transmission, base64 encoded string, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    device: { // device object (the following fields are device object information), object type
        "mac": // device MAC address, string type
        "did": // device did, string type
        "subDid": // child device did, string type
    }
    "sn": // command sequence number, corresponding to the sending sequence by the App, numeric type
    "data": { // device status, object type
        "attrName": "attrValue", // Data Point name: Operation value. If the Data Point is an extension type, the operation value needs to be a base64 encoded string.
    }
    "alerts": { // alarm, object type
        "attrName": "attrValue" // Data Point name: Alarm message
    }
    "faults": { // fault, object type
        "attrName": "attrValue" // Data Point name: Fault message
    }
    "binary": // binary data for transparent transmission, base64 encoded string, string type
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric
    msg: // error description, string type
    device: { // device object (the following fields are device object information), object type
        "mac": // device MAC address, string type
        "did": // device did, string type
        "subDid": // child device did, string type
    }
}
```

#### Sample code

```
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
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### getDeviceInfo

Get basic information about the child device.

```
getDeviceInfo({params}, callback(ret, err))
```

#### params
device:

* Type: JSON object
* Default: none
* Description: The child device object, the device MAC and did can be obtained when getting the device list.
* Internal fields

```
{
    "mac": // central control device MAC address, string type
    "did": // central control device did, string type
    "subDid": // child device did, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    device: { // child device object (the following fields are child device information), object type
        "mac": // central control device MAC address, string type
        "did": // central control device did, string type
        "subDid": // child device did, string type
        "subProductKey": // child device type identifier, string type
        "subProductName": // child device product name, string type
        "type": // subdevice type (see GizWifiDeviceType), numeric type
        "netStatus": // Whether the child device is online (see GizWifiDeviceNetStatus), numeric type
        "productKey": // central control device type identifier, string type
        "productName": // central control device product name, string type
    }
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
    device:{ // device object (the following fields are device object information), object type
        "mac": // device MAC address, string type
        "did": // device did, string type
        "subDid": // child device did, string type
    }
}
```

#### Sample code

```
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
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

## gizWifiGroup class 

This is the Gizwits Wi-Fi device grouping class, which provides device grouping functions for the central control.

### getDevices

Get a device list of the group.

```
getDevices({params}, callback(ret, err))
```

#### params
group:

* Type: JSON object
* Default: none
* Description: Group object, group object information can be obtained when getting the group list.
* Internal fields

```
{
    "gid": // group ID, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    group: { // group object, object type
        "gid": // group ID, string type
    }
    devices: [{ // child device list of the group, object array
        "mac": // device MAC, string type
        "did": // device did, string type
        "subDid": // child device did, string type
    }]
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
    group:{ // group object, object type
        "gid": // group ID, string type
    }
}
```

#### Sample code

```
var gizWifiGroup = api.require('gizWifiGroup');
gizWifiGroup.getDevices({
    "group": {
               "gid": 'your_group_id'
    }
}, function(ret, err) {
        alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### addDevice

Add a device to the group. After adding, return the whole device list.

```
addDevice({params}, callback(ret, err))
```

#### params
group:

* Type: JSON object
* Default: none
* Description: Group object, group object information can be obtained when getting the group list.
* Internal fields

```
{
    "gid": // group ID, string type
}
```

device:

* Type: JSON object
* Default: none
* Description: The device object to be added, the device object information can be obtained when getting the device list of the group.
* Internal fields

```
{
    "mac": // device MAC address, string type
    "did": // device did, string type
    "subDid": // child device did, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    group: { // group object, object type
        "gid": // group ID, string type
    }
    devices: [{ // child device list of the group, object array
        "mac": // device MAC, string type
        "did": // device did, string type
        "subDid": // child device did, string type
    }]
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
    group: { // group object, object type
        "gid": // group ID, string type
    }
}
```

#### Sample code

```
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
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### removeDevice

Delete a device within the group. After deletion, return the whole device list.

```
removeDevice({params}, callback(ret, err))
```

#### params
group:

* Type: JSON object
* Default: none
* Description: group object which can be obtained when getting the group list.
* Internal fields

```
{
    "gid": // group ID, string type
}
```

device:

* Type: JSON object
* Default: none
* Description: The device object to be deleted, the device object information can be obtained when obtaining the device list of the group.
* Internal fields

```
{
    "mac": // central control device MAC address, string type
    "did": // central control device did, string type
    "subDid": // child device did, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    group: { // group object, object type
        "gid": // group ID, string type
    } 
    devices: [{ // child device list of the group, object array 
        "mac": // device MAC, string type
        "did": // device did, string type
        "subDid": // child device did, string type
    }]
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
    group:{ // group object, object type
        "gid": // group ID, string type
    }
}
```

#### Sample code

```
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
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### getGroupInfo

Get information about a device group.

```
getGroupInfo({params}, callback(ret, err))
```

#### params
group:

* Type: JSON object
* Default: none
* Description: Group object, whose information can be obtained when getting the group list.
* Internal fields

```
{
    "gid": // group ID, string type
}
```

#### callback(ret, err)
ret

* Type: JSON object
* Internal fields

```
{
    group: { // group object, object type
        "gid": // group ID, string type
        "groupName": // group name, string type
        "productKey": // group type identifier, string type
    }
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
    group:{ // group object, object type
        "gid": // group ID, string type
    }
}
```

#### Sample code

```
var gizWifiGroup = api.require('gizWifiGroup');
gizWifiGroup.getGroupInfo({
    "group": {
            "gid": 'your_group_id'
    }
}, function(ret, err) {
    alert("ret = " + JSON.stringify(ret) + "err = " + JSON.stringify(err))
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher


## gizWifiBinary class 

The base64 codec class for binary data.

### encode

The base64 encoding function.

```
encode({params}, callback(ret, err))
```

#### params
binaryData:

* Type: JSON array
* Default: none
* Description: the data to be base64 encoded

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    binary: // the result string after base64 encoding, for example: AQIDBA==
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
}
```

#### Sample code

```
var GizWifiBinary = api.require("gizWifiBinary");

// encoding an array
var src = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
GizWifiBinary.encode({"binaryData": src}, function(ret, err) {
    alert("ret = " + JSON.stringify(ret));
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

### decode

The base64 decoding function.

```
decode({params}, callback(ret, err))
```

#### params

binary:

* Type: string
* Default: none
* Description: the string to be base64 decoded

#### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
    binaryData: // the array after base64 decoding, for example: [1, 2, 3, 4]
}
```

err

* Type: JSON object
* Internal fields

```
{
    errorCode: // error code (see enumeration definition GizWifiErrorCode), numeric type
    msg: // error description, string type
}
```

#### Sample code

```
var GizWifiBinary = api.require("gizWifiBinary");

// decode a string
var src2 = "AQIDBAUGBwgJCgsMDQ4PEBES";
GizWifiBinary.decode({"binary": src2}, function(ret, err) {
    alert("ret = " + JSON.stringify(ret));
});
```

#### Availability
iOS, Android

Available for the version 1.0.0 and higher

# Constants

The JSON field names and description.

GizWifiConfigureMode |	Configuration mode
-----|-----
GizWifiSoftAP|	SoftAP: 0
GizWifiAirLink|	AirLink: 1
GizLogPrintLevel|	Logging level
GizLogPrintNone|	No output for Native Gizwits App SDK: 0
GizLogPrintI|	Error log output: 1
GizLogPrintII|	Normal log output: 2
GizLogPrintAll|	All log output: 3
GizWifiDeviceType|	Device type
GizDeviceNormal|	Normal device: 0
GizDeviceCenterControl|	Central control device: 1
GizEventType|	Event type
GizEventSDK|	SDK system event: 0
GizEventDevice|	Device exception event: 1
GizEventM2MService|	M2M exception event: 2
GizEventToken|	Invalid Token event: 2
GAgentType|	Agent type
GizGAgentMXCHIP|	MXCHIP 3162 : 0
GizGAgentHF|	HF (Hi-Flying): 1
GizGAgentRTK|	RTK (Realtek): 2
GizGAgentWM|	WM (Winner Microelectronics): 3
GizGAgentESP|	ESP(Espressif): 4
GizGAgentQCA|	QCA (Qualcomm): 5 
GizGAgentTI|	TI : 6
GizGAgentFSK|	FSK(Beijing Yu tone World Technology): 7
GizGAgentMXCHIP3|	MXCHIP V3：8
GizGAgentBL|	BL(Broadlink): 9
GizGAgentAtmelEE|	Atmel: 10
GizGAgentOther|	Other: 11
GizUserAccountType|	User type
GizUserNormal|	Regular user: 0
GizUserPhone|	Mobile user: 1
GizUserEmail|	Email user: 2
GizThirdAccountType|	Third-party account type
GizThirdBAIDU|	Baidu: 0
GizThirdSINA|	Sina: 1
GizThirdQQ|	Tencent: 2
GizThirdWeChat|	Wechat: 3
GizUserGenderType|	User gender
GizUserGenderMale|	Male: 0
GizUserGenderFemale|	Female: 1
GizUserGenderUnknow|	Other: 2
GizWifiDeviceNetStatus|	Device network status
GizDeviceOffline|	Offline: 0
GizDeviceOnline|	Online: 1
GizDeviceControlled|	Controllable: 2
GizPushType|	Third-party push notification type
GizPushBaiDu|	Baidu: 0
GizPushJiGuang|	Jiguang: 1

# Error codes

errorCode |	msg
----|----
0	|GIZ_SDK_SUCCESS
8001	|GIZ_SDK_PARAM_FORM_INVALID
8002	|GIZ_SDK_CLIENT_NOT_AUTHEN
8003	|GIZ_SDK_CLIENT_VERSION_INVALID
8004	|GIZ_SDK_UDP_PORT_BIND_FAILED
8005	|GIZ_SDK_DAEMON_EXCEPTION
8006	|GIZ_SDK_PARAM_INVALID
8007	|GIZ_SDK_APPID_LENGTH_ERROR
8008	|GIZ_SDK_LOG_PATH_INVALID
8009	|GIZ_SDK_LOG_LEVEL_INVALID
8021	|GIZ_SDK_DEVICE_CONFIG_SEND_FAILED
8022	|GIZ_SDK_DEVICE_CONFIG_IS_RUNNING
8023	|GIZ_SDK_DEVICE_CONFIG_TIMEOUT
8024	|GIZ_SDK_DEVICE_DID_INVALID
8025	|GIZ_SDK_DEVICE_MAC_INVALID
8026	|GIZ_SDK_SUBDEVICE_DID_INVALID
8027	|GIZ_SDK_DEVICE_PASSCODE_INVALID
8028	|GIZ_SDK_DEVICE_NOT_CENTERCONTROL
8029	|GIZ_SDK_DEVICE_NOT_SUBSCRIBED
8030	|GIZ_SDK_DEVICE_NO_RESPONSE
8031	|GIZ_SDK_DEVICE_NOT_READY
8032	|GIZ_SDK_DEVICE_NOT_BINDED
8033	|GIZ_SDK_DEVICE_CONTROL_WITH_INVALID_COMMAND
8034	|GIZ_SDK_DEVICE_CONTROL_FAILED
8035	|GIZ_SDK_DEVICE_GET_STATUS_FAILED
8036	|GIZ_SDK_DEVICE_CONTROL_VALUE_TYPE_ERROR
8037	|GIZ_SDK_DEVICE_CONTROL_VALUE_OUT_OF_RANGE
8038	|GIZ_SDK_DEVICE_CONTROL_NOT_WRITABLE_COMMAND
8039	|GIZ_SDK_BIND_DEVICE_FAILED
8040	|GIZ_SDK_UNBIND_DEVICE_FAILED
8041	|GIZ_SDK_DNS_FAILED
8042	|GIZ_SDK_M2M_CONNECTION_SUCCESS
8043	|GIZ_SDK_SET_SOCKET_NON_BLOCK_FAILED
8044	|GIZ_SDK_CONNECTION_TIMEOUT
8045	|GIZ_SDK_CONNECTION_REFUSED
8046	|GIZ_SDK_CONNECTION_ERROR
8047	|GIZ_SDK_CONNECTION_CLOSED
8048	|GIZ_SDK_SSL_HANDSHAKE_FAILED
8049	|GIZ_SDK_DEVICE_LOGIN_VERIFY_FAILED
8050	|GIZ_SDK_INTERNET_NOT_REACHABLE
8096	|GIZ_SDK_HTTP_ANSWER_FORMAT_ERROR
8097	|GIZ_SDK_HTTP_ANSWER_PARAM_ERROR
8098	|GIZ_SDK_HTTP_SERVER_NO_ANSWER
8099	|GIZ_SDK_HTTP_REQUEST_FAILED
8100	|GIZ_SDK_OTHERWISE
8101	|GIZ_SDK_MEMORY_MALLOC_FAILED
8102	|GIZ_SDK_THREAD_CREATE_FAILED
8150	|GIZ_SDK_USER_ID_INVALID
8151	|GIZ_SDK_TOKEN_INVALID
8152	|GIZ_SDK_GROUP_ID_INVALID
8153	|GIZ_SDK_GROUPNAME_INVALID
8154	|GIZ_SDK_GROUP_PRODUCTKEY_INVALID
8155	|GIZ_SDK_GROUP_FAILED_DELETE_DEVICE
8156	|GIZ_SDK_GROUP_FAILED_ADD_DEVICE
8157	|GIZ_SDK_GROUP_GET_DEVICE_FAILED
8201	|GIZ_SDK_DATAPOINT_NOT_DOWNLOAD
8202	|GIZ_SDK_DATAPOINT_SERVICE_UNAVAILABLE
8203	|GIZ_SDK_DATAPOINT_PARSE_FAILED
8300	|GIZ_SDK_SDK_NOT_INITIALIZED
8301	|GIZ_SDK_APK_CONTEXT_IS_NULL
8302	|GIZ_SDK_APK_PERMISSION_NOT_SET
8303	|GIZ_SDK_CHMOD_DAEMON_REFUSED
8304	|GIZ_SDK_EXEC_DAEMON_FAILED
8305	|GIZ_SDK_EXEC_CATCH_EXCEPTION
8306	|GIZ_SDK_APPID_IS_EMPTY
8307	|GIZ_SDK_UNSUPPORTED_API
8308	|GIZ_SDK_REQUEST_TIMEOUT
8309	|GIZ_SDK_DAEMON_VERSION_INVALID
8310	|GIZ_SDK_PHONE_NOT_CONNECT_TO_SOFTAP_SSID
8311	|GIZ_SDK_DEVICE_CONFIG_SSID_NOT_MATCHED
8312	|GIZ_SDK_NOT_IN_SOFTAPMODE
8313	|GIZ_SDK_CONFIG_NO_AVAILABLE_WIFI
8314	|GIZ_SDK_RAW_DATA_TRANSMIT
8315	|GIZ_SDK_PRODUCT_IS_DOWNLOADING
8316	|GIZ_SDK_START_SUCCESS
9001	|GIZ_OPENAPI_MAC_ALREADY_REGISTERED
9002	|GIZ_OPENAPI_PRODUCT_KEY_INVALID
9003	|GIZ_OPENAPI_APPID_INVALID
9004	|GIZ_OPENAPI_TOKEN_INVALID
9005	|GIZ_OPENAPI_USER_NOT_EXIST
9006	|GIZ_OPENAPI_TOKEN_EXPIRED
9007	|GIZ_OPENAPI_M2M_ID_INVALID
9008	|GIZ_OPENAPI_SERVER_ERROR
9009	|GIZ_OPENAPI_CODE_EXPIRED
9010	|GIZ_OPENAPI_CODE_INVALID
9011	|GIZ_OPENAPI_SANDBOX_SCALE_QUOTA_EXHAUSTED
9012	|GIZ_OPENAPI_PRODUCTION_SCALE_QUOTA_EXHAUSTED
9013	|GIZ_OPENAPI_PRODUCT_HAS_NO_REQUEST_SCALE
9014	|GIZ_OPENAPI_DEVICE_NOT_FOUND
9015	|GIZ_OPENAPI_FORM_INVALID
9016	|GIZ_OPENAPI_DID_PASSCODE_INVALID
9017	|GIZ_OPENAPI_DEVICE_NOT_BOUND
9018	|GIZ_OPENAPI_PHONE_UNAVALIABLE
9019	|GIZ_OPENAPI_USERNAME_UNAVALIABLE
9020	|GIZ_OPENAPI_USERNAME_PASSWORD_ERROR
9021	|GIZ_OPENAPI_SEND_COMMAND_FAILED
9022	|GIZ_OPENAPI_EMAIL_UNAVALIABLE
9023	|GIZ_OPENAPI_DEVICE_DISABLED
9024	|GIZ_OPENAPI_FAILED_NOTIFY_M2M
9025	|GIZ_OPENAPI_ATTR_INVALID
9026	|GIZ_OPENAPI_USER_INVALID
9027	|GIZ_OPENAPI_FIRMWARE_NOT_FOUND
9028	|GIZ_OPENAPI_JD_PRODUCT_NOT_FOUND
9029	|GIZ_OPENAPI_DATAPOINT_DATA_NOT_FOUND
9030	|GIZ_OPENAPI_SCHEDULER_NOT_FOUND
9031	|GIZ_OPENAPI_QQ_OAUTH_KEY_INVALID
9032	|GIZ_OPENAPI_OTA_SERVICE_OK_BUT_IN_IDLE
9033	|GIZ_OPENAPI_BT_FIRMWARE_UNVERIFIED
9034	|GIZ_OPENAPI_BT_FIRMWARE_NOTHING_TO_UPGRADE
9035	|GIZ_OPENAPI_SAVE_KAIROSDB_ERROR
9036	|GIZ_OPENAPI_EVENT_NOT_DEFINED
9037	|GIZ_OPENAPI_SEND_SMS_FAILED
9038	|GIZ_OPENAPI_APPLICATION_AUTH_INVALID
9039	|GIZ_OPENAPI_NOT_ALLOWED_CALL_API
9040	|GIZ_OPENAPI_BAD_QRCODE_CONTENT
9041	|GIZ_OPENAPI_REQUEST_THROTTLED
9042	|GIZ_OPENAPI_DEVICE_OFFLINE
9043	|GIZ_OPENAPI_TIMESTAMP_INVALID
9044	|GIZ_OPENAPI_SIGNATURE_INVALID
9045	|GIZ_OPENAPI_DEPRECATED_API
9999	|GIZ_OPENAPI_RESERVED
10003	|GIZ_SITE_PRODUCTKEY_INVALID
10010	|GIZ_SITE_DATAPOINTS_NOT_DEFINED
10011	|GIZ_SITE_DATAPOINTS_NOT_MALFORME

# The mapping of new and old device configuration modes

GizWifiConfigureMode |	Configuration mode(old)	 | Configuration mode(new)
----|----|----
GizWifiSoftAP	|SoftAP: 1	|SoftAP: 0
GizWifiAirLink	|AirLink: 2	|AirLink: 1

# The mapping of new and old error codes

errorCode(new)	| errorCode(old) |	msg(old)
----|----|----
8002	|-49	|GizWifiError_START_SDK_FAILED
8004	|-30	|GizWifiError_UDP_PORT_BIND_FAILED
8006	|-20	|GizWifiError_INVALID_PARAM
8021	|-41	|GizWifiError_CONFIGURE_SENDFAILED
8022	|-46	|GizWifiError_IS_RUNNING
8023	|-40	|GizWifiError_CONFIGURE_TIMEOUT
8024	|-61	|GizWifiError_DEVICE_IS_INVALID
8029	|-11	|GizWifiError_NOT_CONNECTED
8033	|-20	|GizWifiError_INVALID_PARAM
8036	|-20	|GizWifiError_INVALID_PARAM
8037	|-20	|GizWifiError_INVALID_PARAM
8038	|-20	|GizWifiError_INVALID_PARAM
8041	|-27	|GizWifiError_DNS_FAILED
8042	|0	|GizWifiError_SUCCESS
8044	|-21	|GizWifiError_CONNECT_TIMEOUT
8045	|-45	|GizWifiError_CONNECTION_REFUSED
8046	|-19	|GizWifiError_CONNECTION_ERROR
8047	|-7	|GizWifiError_CONNECTION_CLOSED
8049	|-9	|GizWifiError_LOGIN_VERIFY_FAILED
8099	|-25	|GizWifiError_HTTP_FAIL
8100	|-1	|GizWifiError_GENERAL
8101	|-23	|GizWifiError_INSUFFIENT_MEM
8102	|-15	|GizWifiError_THREAD_CREATE
8153	|-62	|GizWifiError_GROUP_IS_INVALID
8300	|-60	|GizWifiError_SDK_INIT_FAILED
8307	|-47	|GizWifiError_UNSUPPORTED_API
8308	|-40	|GizWifiError_CONFIGURE_TIMEOUT
8310	|-39	|GizWifiError_CONFIGURE_SSID_NOT_MATCHED
8311	|-39	|GizWifiError_CONFIGURE_SSID_NOT_MATCHED
8312	|-42	|GizWifiError_NOT_IN_SOFTAPMODE
8315	|-46	|GizWifiError_IS_RUNNING
8316	|0	|GizWifiError_SUCCESS
other	|-1	|GizWifiError_GENERAL

# Error code conversion function

## errorCodeConversion

This function is specially designed for the error code compatibility of the App, which can save the time to update the code for the App. The old error code will be returned after passing the new error code according to the above mapping table.

```
errorCodeConversion({params}, callback(ret, err))
```

### params

errorCode:

* Type: JSON object
* Default: none
* Description: New error code

### callback(ret, err)

ret

* Type: JSON object
* Internal fields

```
{
     errorCode: // old error code, numeric type
}
```

### Sample code

```
var gizWifiGroup = api.require('gizWifiSDK');
gizWifiSDK.errorCodeConversion({
     "errorCode": 8033
}, function(ret, err) {
     alert("ret = " + JSON.stringify(ret))
});
```

### Availability

iOS, Android

Available for the version 1.0.0 and higher

