title: ArduinoUNOWiFi接入机智云介绍
----


# 1. 前文需知
## 1.1 准备工作

硬件：GOKIT 2/3 功能板+ArduinoUnoWiFi
软件：机智云产品调试APP（点击此处为下载链接）+Arduino IDE（1.7.10版以上）
其他：机智云开发者账号

## 1.2	 初识ArduinoUnoWiFi
ArduinoUnoWiFi 是 ArduinoOrg 推出的一款基于 ArduinoUno 的开发板，主芯片仍然采用与 ArduinoUno 相同的 ATMega328p，使得开发者能够像使用 Arduino Uno一样使用它。ArduinoUnoWiFi集成了乐鑫的ESP8266芯片作为WiFi模块以提供无线联网功能，支持 OTA程序无线下载功能，支持 REST 方式实现远程控制，支持 Web 方式轻松配置网络。WiFi 功能使得 Arduino UnoWiFi 可以轻松实现无线控制，但是假如没有一款优秀的云服务器来提供固定 IP访问和数据保存，也是无法实现不在同一局域网中的远程控制的。Gizwits 为个人开发者带来了福音，在设备节点小于一定数量时，Gizwits 为开发者提供免费云服务器使用。另外为了简化开发难度，Gizwits 提供了数据上传分发的详细协议格式及 APP 范例。
本文将介绍如何自动生成ArduinoUno平台的机智云接入库，将库导入Arduino IDE，编译下载到Arduino unoWiFi上。

## 1.3	 什么是“代码自动生成工具”

为了降低开发者的开发门槛，缩短开发周期，降低开发资源投入，机智云推出了代码自动生成服务。云端会根据产品定义的数据点生成对应产品的设备端代码。

自动生成的代码实现了机智云通信协议的解析与封包、传感器数据与通信数据的转换逻辑，并封装成了简单的API，且提供了多种平台的实例代码。当设备收到云端或APP端的数据后，程序会将数据转换成对应的事件并通知到应用层，开发者只需要在对应的事件处理逻辑中添加传感器的控制函数，就可以完成产品的开发。

使用自动生成的代码开发产品，就不必再处理协议相关的部分了，开发者可以将节省出来的精力集中在产品的核心功能开发上。

# 2. 利用“代码自动生成工具”自动生成Arduino平台MCU代码
## 2.1 创建产品
登录机智云开发者中心：http://dev.gizwits.com/

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486535243280.png)

点击右上角创建新产品，输入相应的产品信息后点击“保存”。

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486535255313.png)

## 2.2 添加数据点
添加相应的数据点

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486535272019.png)

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486535281222.png)

添加成功后点击“应用”

 ![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486535287438.png)


## 2.3 生成arduino平台的MCU方案代码
注：如果之前没有定义数据点则无法使用自动生成代码服务。

1）定义好产品后，选择左侧服务中的“MCU开发”(假设采用的MCU是ArduinoUNOWiFi)，选中硬件方案中的“独立MCU方案”，再选择“硬件平台”中的“ArduinoUNOWiFi”，最后点击“生成代码包”，等待生成完毕下载即可。

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486535303197.png)
2）下载完成后解压如下

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486535313938.png)

# 3.	Arduino平台代码的导入和编译下载
## 3.1 Arduino IDE的下载和安装

Arduino IDE(Integrated Development Environment)即Arduino 集成开发环境，只要在IDE中编写程序代码，将程序上传到Arduino电路板后，程序便会告诉Arduino电路板要做些什么了。本文档使用Arduino IDE 1.7.10版本，以下为下载链接

链接: http://pan.baidu.com/s/1c25QA8w 密码: ixkj

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486535471966.png)

下载完后为一个zip压缩包，解压出来为一个exe文件，双击安装即可。安装完成后，打开入下图所示界面。

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/20170918145646.png)


## 3.2 自动生成接入库导入Arduino IDE
1）打开Arduino IDE，点击项目-导入库-添加库。

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486535634779.png)

2）将自动生成代码解压到一个名为GizwitsArduinoUnoWiFi的文件夹下，点击打开。

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/20170918150319.png)

3）导入成功后，导入的库的目录在我的文档-Arduino-libraries下

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/20170918150418.png)

4）打开GizwitsArduinoUnoWiFi文件夹，examples便是示例文件夹。

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/20170918150601.png)

注：生成文件的介绍以及使用请查看文档《ArduinoUnoWiFiSDK 之 API 介绍》

## 3.3	 将自动生成并编译好的代码上传到ArduinoUnoWiFi
自动生成完的代码的examples目录下有两个文件夹，文件夹里面分别是networkconfig.ino（配置网络示例）和simpleTry.ino（数据点示例）

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486535883556.png)

注：这里需要先上传完networkconfig.ino（配置网络示例），用机智云调试APP配置网络，配置成功后，再上传simpleTry.ino（数据点示例）。



## 3.3.1 上传networkconfig.ino（配置网络示例）
1）打开Arduino IDE，选择工具-板-Arduino Uno WiFi

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486535900315.png)

2）打开设备管理器，找到Arduino Uno WiFi的端口，这里我们的端口为COM6。

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486535906763.png)

3）我们点开IDE工具-端口，选择COM6（Arduino Uno WiFi），然后右下角显示arduino Uno on COM6即可。

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486535915120.png)

4）点击上传，显示上传成功

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486535930666.png)

5）配置网络，本文选用机智云调试APP来配置网络
![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486535948870.png)     

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486535954721.png)   

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486535980984.png)

6）若配置失败，则检查wifi环境是否故障，是否受限，应采用2.4Ghz频段的WIFI环境进行配置，若配置成功则进入下一步


## 3.3.2 上传simpleTry.ino（数据点示例）
1）打开simpleTry文件夹内的simpleTry.ino，选好端口，点击上传，显示上传成功。

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486536006030.png)

2）将设备重新上电，点击刷新，将会看到名称已显示，说明MCU固件已经完全烧录成功。

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486536013282.png)

# 4. 相关支持

 - 1)相关支持
 
如果您是开发者

注册机智云开发者平台，即可免费体验相关开发工具

开发者平台：site.gizwits.com

Gokit在线申请：www.gizwits.com/zh-cn/gokit


 - 2)如果您是团队
 
GizWits针对团体有很多支持计划，您可以和GizWtis联系，快速得到技术支持

联系邮箱：service@gizwits.com

联系电话：020-6224-0080

官方二维码：

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/intro/1486536021902.png)
