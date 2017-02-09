title: ArduinoUnoWiFi 之ESP8266固件烧写教程
----


# 概况 
Arduino Uno WiFi是Arduino Org推出的一款基于Arduino Uno的开发板，主芯片仍然采用与Arduino Uno相同的ATMega328p，使得开发者能够像使用Arduino Uno一样使用它。

Arduino Uno WiFi集成了乐鑫的ESP8266芯片作为WiFi模块以提供无线联网功能，支持OTA程序无线下载功能，支持REST方式实现远程控制，支持Web方式轻松配置网络。 

WiFi功能使得Arduino Uno WiFi可以轻松实现无线控制，但是假如没有一款优秀的云服务器来提供固定IP访问和数据保存，也是无法实现不在同一局域网中的远程控制的。 

Gizwits为个人开发者带来了福音，在设备节点小于一定数量时，Gizwits为开发者提供免费云服务器使用。另外为了简化开发难度，Gizwits提供了数据上传分发的详细协议格式及APP范例。 

# 本文将介绍Arduino Uno WiFi 板ESP8266固件烧写流程与方法。

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/Tutorial/1486536567292.png)     

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/Tutorial/1486536575753.png)

                                                           

# 准备工作
## 1、ESP8266烧写工具及固件下载
链接: http://pan.baidu.com/s/1c25QA8w 密码: ixkj

## 2、连接烧写串口（TX/RX直连，如若出现连接失败，则做交叉连接尝试）：
![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/Tutorial/1486536736936.png)


# 烧录

## 按照下列步骤进行镜像上传：
 - 使用Arduino IDE工具下载Blink.ino到ATMega328p
 
![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/Tutorial/1486537111742.jpeg)

 - 使用USB2Serial工具的Tx Rx GND管脚分别接至Arduino Uno WiFi的Tx Rx GND管脚
 - 将USB2Serial工具USB接口接至PC，并保证驱动已安装，PC可识别串口
 - 将Uno WiFi断电，按住开发板上ESP B/L开关的同时上电，以进入下载模式
 - 使用FlashDownloadTool进行镜像下载，配置如下，其中COM PORT根据实际情况选择
 
![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/Tutorial/1486537178559.png)

 - 点击START按钮等待同步
 
![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/Tutorial/1486537198801.png)

 - 使用公对公杜邦线一端接至GND管脚，另一端接至Uno WiFi开发板背面ARDUINO.ORG上方的测试点，不需要焊接，程序上传完毕后断开即可
 - 测试点与GND导通时即完成同步，开始程序上传，上传完毕后断开即可

