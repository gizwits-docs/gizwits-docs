title: SDK数据透传方法解析
---

# 概述
本文主要介绍如何使用机智云设备接入SDK来进行APP与设备之间的数据透传。在APP和MCU之间，有两种数据透传方式：

+ 1、利用“扩展类型”数据点进行透传
+ 2、不定义数据点直接进行数据透传，即纯透传

# 扩展类型数据点透传

## 1.定义数据点

![Alt text](./1479700129063.png)

在机智云产品管理中的数据点中定义一个拓展类型的数据点，如上图所示：
定义数据长度为60个byte（透传情况下，数据长度暂时支持900字节内数据传输）。

## 2.设备上报数据协议说明

设备MCU按照数据点的定义格式上报透传数据，在完成新产品的定义后，每个新产品都有相应的串口通信协议文档，文档下载路径如下图所示：

![Alt text](./1479700275592.png)

在串口通信协议文档文档的4.9部分则有MCU上报数据的格式，如下图：
 
 ![Alt text](./1479700373845.png)
 
图中的dev_status(60B)即为需要透传的数据。

## 3.SDK回调接口说明

APP端接收到MCU上报数据的回调接口：didReceiveData，判断result为GizWifiErrorCode.GIZ_SDK_SUCCESS，则接收到的数据可能为普通数据点或者扩展数据点。

## 4.APP接收数据代码示例

**Andriod接收到MCU上报拓展数据类型代码示例：**

``` java
final protected static char[] hexArray = "0123456789ABCDEF".toCharArray();

// 将16进制的byte转为string，比如byte值为{0x62,0x63}，那么将转为“6263”
public static String bytesToHex(byte[] bytes) {
		char[] hexChars = new char[bytes.length * 3];
		for (int j = 0; j < bytes.length; j++) {
			int v = bytes[j] & 0xFF;
			hexChars[j * 3] = hexArray[v >>> 4];
			hexChars[j * 3 + 1] = hexArray[v & 0x0F];
			hexChars[j * 3 + 2] = ' ';
		}
		return new String(hexChars);
}

@Override
protected void didReceiveData(GizWifiErrorCode result, GizWifiDevice device,
			ConcurrentHashMap<String, Object> dataMap, int sn) {

	if (result == GizWifiErrorCode.GIZ_SDK_SUCCESS) {
	// 普通数据点类型，有布尔型、整形和枚举型数据，该种类型一般为可读写
		if (dataMap.get("data") != null) {
			ConcurrentHashMap<String, Object> map = (ConcurrentHashMap<String, Object>) dataMap.get("data");
			// 扩展数据点，key为"kuozhan"
			byte[] bytes = (byte[]) map.get("kuozhan");
			String string = bytesToHex(bytes);
			Toast.makeText(this, string, Toast.LENGTH_SHORT).show();
		}
	}
}
```

**iOS接收到MCU上报拓展数据类型代码示例：**

```objectivec
- (void)device:(GizWifiDevice *)device didReceiveData:(NSError *)result data:(NSDictionary *)dataMap withSN:(NSNumber *)sn
{
    if (result.code == GIZ_SDK_SUCCESS)
    {
        NSLog(@"接收到数据");
        NSDictionary *data = dataMap[@"data"];
        NSString *kuozhan = data[@"kuozhan"];
            
        NSLog(@"dataMap = %@", dataMap);
        NSLog(@"kuozhan = %@", kuozhan);
        
    }
}
```

## 5.设备上报数据案例

案例：根据数据点上报格式上报数据：

FF FF 00 42 05 00 00 00 04 01 02 03 04 05 06 07 08 09 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 78

注意定义的扩展数据类型为60个字节，因此上报数据的时候也一定要保证上报命令中“设备状态”字节数为60个字节，否则APP端将不会收到数据。多余的数据可以进行补零操作。

APP端接收到的dataMap字典中有一个"kuozhan"的key，对应的值即为透传的数据。

```json
dataMap = {
    alerts={
    };
    data ={
        kuozhan = <01020304 05060708 09000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000>;
    };
    faults={
    };
}
```

## 6.APP下发数据代码示例

APP在GizWifiDevice类的write接口中，按照数据点定义发送扩展数据。

**Andriod下发拓展数据类型命令代码示例：**

```java
byte[] input1 = { 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77 };
// byte[] input2 = { 11, 22, 33, 44, 55, 66, 77, 88, 99};
ConcurrentHashMap<String, Object> dataMap = new ConcurrentHashMap<String, Object>();
dataMap.put("kuozhan", input1);
device.write(dataMap, 0);
```

**iOS下发拓展数据类型命令代码示例：**

```objectivec
char input1[7] = {0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77};
// char input2[7] = {11, 22, 33, 44, 55, 66, 77};
    NSData* data = [NSData dataWithBytes:input1 length:sizeof(input1)];
    NSDictionary *request = @{@"kuozhan": data};
    [self.device write:request withSN:44];
```

上述代码中，input1与input2的透传结果是不一样的，input1中定义的是十六进制的数值，input2中则是十进制的数值。如果使用input1中0x11的值下发给设备，那么设备将收到0x11的十六进制值，如果使用input2中11的值下发给设备，那么设备收到将是0x0b（十进制11对应十六进制b）。使用input1下发设备，MCU收到的数据为：

FF FF 00 43 03 45 00 00 01 01 11 22 33 44 55 66 77 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 69

# 无数据点透传

## 1.设备上报数据协议说明

MCU上报数据的格式如下表所示，包长度(len)是指从命令开始一直到校验和的字节长度(包括命令和校验和)。dev_status是需要透传数据，可以设置任意长度，但是暂时支持900B内传输。

![Alt text](./1479701502710.png)

如设备上报指令：FF FF 00 0D 05 00 00 00 06 11 22 33 44 55 66 77 F4  ；那么透传的数据为11 22 33 44 55 66 77
 
##  2.SDK回调接口说明
 
APP端接收到MCU上报数据的回调接口： didReceiveData，判断result为GizWifiErrorCode.GIZ_SDK_SUCCESS，则表示接收到数据成功，回传参数的dataMap 中的“binary”字段的值为透传数据。

## 3.APP接收数据代码示例

**Andriod接收MCU无数据点上报代码示例：**

``` java
@Override
protected void didReceiveData(GizWifiErrorCode result, GizWifiDevice device,ConcurrentHashMap<String, Object> dataMap, int sn) {
	if (result == GizWifiErrorCode.GIZ_SDK_SUCCESS) {
		// 透传数据，无数据点定义，适合开发者自行定义协议自行解析
		if (dataMap.get("binary") != null) {
		byte[] binary = (byte[]) dataMap.get("binary");
		Log.i("info", "Binary data:" + bytesToHex(binary));
			// 收到后面需要自行解析
		}
	}
}
```


**iOS接收MCU无数据点上报代码示例：**

```objectivec
- (void)device:(GizWifiDevice *)device didReceiveData:(NSError *)result data:(NSDictionary *)dataMap withSN:(NSNumber *)sn
{
    if (result.code == GIZ_SDK_SUCCESS)
    {
        NSLog(@"接收到数据");
        NSLog(@"dataMap = %@", dataMap);
        
        NSString *binary = dataMap[@"binary"];
        // 后面需要自行对binary数据进行解析
	}
}
```

如MCU上报：FF FF 00 0D 05 00 00 00 06 11 22 33 44 55 66 77 F4
则APP将打印： Binary data:11 22 33 44 55 66 77

## 4.APP下发数据代码示例

APP在GizWifiDevice类的write接口中，发送的json格式为：{"binary": "xxxxxx"}；MCU接收的数据格式如下：
 
 ![Alt text](./1479702010435.png)

**Andriod下发无数据点透传数据代码示例：**

``` java
byte[] input1 = { 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77 };
ConcurrentHashMap<String, Object> dataMap = new ConcurrentHashMap<String, Object>();
dataMap.put("binary", input1);
device.write(dataMap, 0);
```

**iOS下发无数据点透传数据代码示例：**

``` objectivec
char input1[7] = {0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77};
// char input2[7] = {11, 22, 33, 44, 55, 66, 77};    
NSData* data = [NSData dataWithBytes:input1 length:sizeof(input1)];
NSDictionary *request = @{@"binary": data};    
[self.device write:request withSN:0];
```

MCU接收到的APP下发数据格式（即以上bytes数组下发后，MCU接收到的数据）：
FF FF 00 0D 03 16 00 00 05 11 22 33 44 55 66 77 07




