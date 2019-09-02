title: Real-time data synchronization using SNoti API 
---

# 1. Overview

SNoti API provides enterprises with a set of SSL communication API for pushing device-related events in real time and controlling the corresponding devices.

Note: Before using the SNoti API, you must first request to access the SNoti API and set the whitelist.

![Overview](../../../assets/en-us/UserManual/SNotiAPI/101.png)
 
# 2. Set up development environment

## 2.1. Download Eclipse and JDK

Download link:
Http://jingyan.baidu.com/article/bea41d435bc695b4c41be648.html

## 2.2. Install JDK

Installation process:
Http://jingyan.baidu.com/article/d7130635194f1513fcf47557.html

## 2.3. Install Eclipse

Installation process:
Http://jingyan.baidu.com/article/d7130635194f1513fcf47557.html

# 3. SNoti API

## 3.1. Access request

If you decide to use SNoti API for your product, you need to contact Gizwits technical support and provide the following information for the product, including product key and product name.

![Overview](../../../assets/en-us/UserManual/SNotiAPI/311.png) 
![Overview](../../../assets/en-us/UserManual/SNotiAPI/311-1.png) 

![Overview](../../../assets/en-us/UserManual/SNotiAPI/312.png)
 
## 3.2. Create credentials

![Create credentials](../../../assets/en-us/UserManual/SNotiAPI/321.png)
 
# 4. Run the demo

## 4.1. Download SNoti API demo source code

SNoti API demo source code download link:  

https://github.com/gizwits/noti-java-demo/tree/v2.0.0-netty

Gizwits provides two sets of SNoti API demo source code:

* V2.0.0-netty has a framework with its own dependency libraries.
* V2.0.0 has no framework, which will be explained below. Download it as shown below:

![SNoti demo source code](../../../assets/en-us/UserManual/SNotiAPI/411.png) 

## 4.2. Update settings in the source code

![Update settings in the source code](../../../assets/en-us/UserManual/SNotiAPI/421.png)

Find AuthId and AuthSecret as follows:

![AuthId and AuthSecret](../../../assets/en-us/UserManual/SNotiAPI/422.png)
 
## 4.3. Control device

Note: 

1. If you attempt to test the virtual device on Gizwits official website, the MAC address should be assigned with virtual:site
2. If you need to access SNoti API servers in US East region, the domain name should be changed to ussnoti.gizwits.com
3. The JSON data of issued command follows UTF-8 format

### 4.3.1. Issue command using Data Point Protocol v4

![Issue command using Data Point Protocol v4](../../../assets/en-us/UserManual/SNotiAPI/431.png)

Types of writable Data Points include: Boolean, enumeration, numeric, and extension type. The format is "name1": value1, of which name1 refers to the name of the Data Point, and value1 refers to the value of the Data Point. The value might be true/false (for Boolean type value), or a Unicode encoded string such as \u62bd (for enumeration type value), or a numeric, or a byte array (such as [23,2,3], for extension type). See the following examples:

* a. Boolean type, e.g. attrs={"Switch":false}
* b. Enumeration type, e.g. attrs={"Mode":"Sleep Mode"} //If issuing the enumeration type value with its original text string directly, it will fail. Thus, check if the format of the delivered text is UTF-8. If not, please send it after conversion. Take attrs={"Mode":"休眠模式"} as an example, since the delivered JSON data "休眠模式" is not in UTF-8 format, it should be converted to attrs={"Mode":"&#x4F11;&#x7720;&#x6A21;&#x5F0F;"}. 

Following online UTF-8 encoder is recommended:

http://tool.chinaz.com/tools/utf-8.aspx

![online UTF-8 encoder](../../../assets/en-us/UserManual/SNotiAPI/431-1.png)
 
* c. Numeric type, e.g., attrs={"Motor_Speed": 5}
* d. Extension type, e.g., attrs={"extension":[1,2,3,4,5,6,7,8,9,0]}

### 4.3.2. Issue command using Raw Data Protocol v4 (transparent transmission without Data Points)

(1) Issue SNoti API command

![Issue SNoti control instructions](../../../assets/en-us/UserManual/SNotiAPI/432.png)

The sent raw data in the above figure is: raw={1,22,33}

Note: 

For binary data to be sent, it should be converted to a byte array. For example, if you want to send 0x010203, it should be converted to:

```
{
"raw": [1, 2, 3]
}
```

For a hexadecimal array like [0x00, 0x00, 0x1a, ...], you need to convert it into a byte array. 

For a decimal number like 123, leave it as is, i.e., raw=[123].

(2) Device reports its state

After the device receives a command issued by the cloud, the device actively reports its current state.

FF FF 00 09 05 00 00 00 04 01 02 03 18

Because the data received is transparently transmitted, it is base64 encoded, and you have to decode it yourself. 
 
![Device reports its state](../../../assets/en-us/UserManual/SNotiAPI/432-1.png)

![Online base64 decoder](../../../assets/en-us/UserManual/SNotiAPI/432-2.png)

Online base64 decoder link:

 http://www1.tc711.com/tool/BASE64.htm

## 4.4. Run Maven project

(1) Right-click the project, select Run As->Maven Install, and then click Run.

![Run Maven project](../../../assets/en-us/UserManual/SNotiAPI/441.png)

(2) Run cmd.exe and open the target directory. Run java -jar gizwits-noti-demo-2.0.0-jar-with-dependencies.jar

![Run Maven project](../../../assets/en-us/UserManual/SNotiAPI/442.png)

(3) Input rc to issue a command. Check the cloud communication log to see if it succeeds.

Figure 1: The project uses Data Point Protocol v4 to issue a command

![Run Maven project](../../../assets/en-us/UserManual/SNotiAPI/443.png)

Figure 2: The project uses Raw Data Protocol v4 (transparent transmission without Data Points) to issue a command

![Run Maven project](../../../assets/en-us/UserManual/SNotiAPI/444.png)
 
(4) The device actively reports its current state.

FF FF 00 09 05 00 00 00 04 01 02 03 18

Because the data received is transparently transmitted, it is base64 encoded, and you have to decode it yourself.

![Run Maven project](../../../assets/en-us/UserManual/SNotiAPI/445.png)

Base64 decoding as follows

![Base64 decoding](../../../assets/en-us/UserManual/SNotiAPI/446.png)
 
# 5. Reference guide

SNoti API:

http://docs.gizwits.com/en-us/Cloud/NotificationAPI.html
