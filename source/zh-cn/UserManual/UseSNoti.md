title:  Snoti 数据实时同步服务demo使用教程
----
# 1.概述
为企业提供 SSL 通讯 API，用于实时推送设备与产品相关的事件，以及控制对应的设备。
（注意：使用snoti服务之前，要先开通snoti服务和添加白名单。）
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490856868600.png)

# 2.环境搭建
## 2.1.下载eclipse和jdk
下载链接:
[http://jingyan.baidu.com/article/bea41d435bc695b4c41be648.html](http://jingyan.baidu.com/article/bea41d435bc695b4c41be648.html)
## 2.2.安装jdk
安装流程:

[http://jingyan.baidu.com/article/d7130635194f1513fcf47557.html](http://jingyan.baidu.com/article/d7130635194f1513fcf47557.html)
## 2.3.安装eclipse
安装流程:
[http://jingyan.baidu.com/article/d7130635194f1513fcf47557.html](http://jingyan.baidu.com/article/d7130635194f1513fcf47557.html)
# 3.snoti服务开通流程
## 3.1.申请开通snoti
确定产品使用snoti后，开发者需要联系机智云技术支持，提供产品如下的对应信息，包括
Productkey和产品名称。
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490857118643.png)
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490857126972.png)
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490857171212.png)

## 3.2.新建授权
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490857211637.png)

# 4.运行demo流程
## 4.1.下载snoti的demo源码
snoti的demo源码下载链接：
[https://github.com/gizwits/noti-java-demo/tree/v2.0.0-netty](https://github.com/gizwits/noti-java-demo/tree/v2.0.0-netty)
机智云提供了两个款源码:
V2.0.0-netty是加了框架的，有自己的依赖库。
V2.0.0是没有加框架的，下面我要讲解是这个没有加框架的demo。下载的地方如下图：
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490857294272.png)

## 4.2.snoti的代码要修改的地方
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490857318796.png)
AuthId和AuthSecret信息如下：
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490857349059.png)

## 4.3.snoti控制设备
（注意：1.如果用的是机智云官网上的虚拟设备测试，mac地址就填virtual:site
2.如果用的是美东服务器snoti服务器dome上面的域名就改成ussnoti.gizwits.com
3.snoti下发控制指令整个json数据都是utf-8格式的）

### 4.3.1.V4产品的数据点格式下发控制
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490857377784.png)
可写数据点类型包括：布尔值类型、枚举类型、数值类型和扩展类型。写法为"name1": value1,("name1"指数据点的标识名(name)，value1指数据点的值。值可以为true/false(bool)，Unicode编码的字符串如\u62bd(enum)，数字或byte数组(如 [23,2,3]，用于扩展类型))，示例如下：
a.布尔值类型，如，attrs={“Switch”:false}
b.枚举类型，如，attrs={"Mode":"休眠模式"}//如果枚举类型数据点直接下发字符串不成功，检查一下的文本下发的格式是不是utf-8的，如果不是请转换后在下发。如attrs={"Mode":"休眠模式"}由于下发的sjon数据不是utf-8格式，转换为attrs={"Mode":"![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490857981790.png)
"}在下发。utf8编码在线工具如下：
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490858001512.png)
c.数值类型，如，attrs={“Motor_Speed”:5}
d.扩展类型，如，attrs={"extension":[1,2,3,4,5,6,7,8,9,0]}


### 4.3.2.V4产品自定义协议格式（用于不定义数据点，直接透传）
（1）snoti下发控制指令
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490858050560.png)
发送原始数据格式raw={1,22,33}
（注意：二进制转 byte 数组，如要发送 010203，就是
{
"raw": [1, 2, 3]
}
一般情况下，协议交互都是16进制的数组，例如[0x00, 0x00, 0x1a, ...] 
就把这种数组，用10进制表示就成，如要发十进制123值为raw=[123]
）
（2）设备上报状态
当设备收到云端下发的控制指令后，设备主动上报当前状态
FF FF 00 09 05 00 00 00 04 01 02 03 18 
因为是透传的，收到的数据是base64加密了，厂家得自己进行base64解密。
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490858101947.png)
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490858110840.png)
[Base64在线解密链接](http://docs.gizwits.com/zh-cn/tools/Base64_encode_decode.html)
### 4.4.运行maven工程
（1）鼠标右击工程，选择Run As->Maven Install，然后点击运行。
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490858155758.png)
（2）运行cmd.exe端，打开target目录的位置。运行java -jar gizwits-noti-demo-2.0.0-jar-with-dependencies.jar
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490858171472.png)
（3）输入rc进行下发控制指令，查看云端的通讯日志，看下发的指令是否正确
图1：项目是走V4版本的数据点协议，下发的控制指令

![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490858188425.png)
图2：项目是走V4版本的自定义协议（就是透传，不走数据点），下发的控制指令
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490858208857.png)
（4）当设备主动上报当前状态
FF FF 00 09 05 00 00 00 04 01 02 03 18 
因为是透传的，收到的数据是base64加密了，厂家得自己进行base64解密。
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490858221857.png)
base64解密，如下
![Alt text](/assets/zh-cn/UserManual/SNotiAPI/1490858234561.png)

# 5.参考资料
SNoti API：
[http://docs.gizwits.com/zh-cn/Cloud/NotificationAPI.html](http://docs.gizwits.com/zh-cn/Cloud/NotificationAPI.html)
