title: GoKit3(S)开发套件介绍
---


#   GoKit3(S)是什么

GoKit3(S)是机智云（GizWits）推出的物联网智能硬件开发套件（第三代），目的是帮助传统硬件快速接入互联网。完成入网之后，数据可以在产品与云端、制造商与用户之间互联互通，实现智能互联。

#  了解SOC版与MCU版的区别

**MCU版**

是分体式的设计方案。WiFi模组只负责信息的接收与发送，它通过串口等方式与MCU进行通信，需要在MCU上进行协议解析与外设相关的开发。

总结：这种方案的优点是不受限于WiFi SOC片上资源、应用扩展度高；缺点是开发难度大、生产成本高。

**SOC版**

是整体式的设计方案。它将WiFi模组与外设驱动模块直接连接起来，直接在WiFi SOC上进行开发，省去了一层通讯过程。

总结：这种方案的优点是能降低开发难度、降低生产成本；缺点是受限于WiFi SOC片上资源，应用有限。

注：这里我们介绍的Gokit是SOC版。

#  了解GoKit3(S)的硬件结构

GoKit3(S)采用一体式SOC解决方案，并具有一定的拓展性，图如下：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/intro/1.png)

ESP8266 ：乐鑫的一款高性能无线WiFi模组，可直接控制扩展板片上资源。

功能扩展板：兼容多种型号的WiFi模组，用于连接各种外设传感器，用于模拟实际应用功能。

功能扩展板（正面）：
![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/intro/6.png)



功能扩展板（反面）：
![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/intro/2.png)



WiFi模组（正面）：
![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/intro/3.png)




WiFi模组（反面）：
![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/intro/4.png)


#  了解GoKit3(S)提供的硬件功能

| 序号 | 硬件功能 | 功能说明 |
| --- | --- | --- |
| 1 | 乐鑫ESP8266 WiFi模组 | ⽀持STA/AP⼯作模式 |
| 2 | 红外探测器 | 可以探测是否有阻挡 |
| 3 | RGB LED | 可编程全彩LED灯 |
| 4 | 可编程电机 | 可编程正反转及调速电机 |
| 5 | 温湿度传感器 |   |
| 6 | 三个可编程按键 |   |
| 7 | 一组咪头接口 |   |
| 8 | 扬声器接口 |   |
| 9 | 语音降噪模块接口 |   |
| 10 | USB转Uart接口 | 可以更方便对GoKit供电，并打印日志 |
| 11 | Uart TTL程序烧写接口 | 可用USB转TTL烧写模组SOC程序 |
| 12 | 双模式模组接口 | 可按需求切换为SOC模式（GoKit3(S)所使用的模式）或MCU模式 |
| 13 | OLED接口 | 可复用SPI等其他接口 |
|   | 预留接口 | 具有电源输出、SWD、Uart TTL、外置Arduino等接口功能 |

注：详细硬件原理图请查看 [《GoKit3.2 硬件手册》](/assets/zh-cn/deviceDev/WiFiSOC/intro/./assets/zh-cn/deviceDev/WiFiSOC/intro/4_GoKit-SoC-ESP8266%20%E7%A1%AC%E4%BB%B6%E6%89%8B%E5%86%8C.doc)

#  相关支持

如果您是创客

GoKit是面向智能硬件开发者限量免费开放，注册我们的论坛或关注我们的官方微信均可发起申请即可。

官方网站地址： [http://site.gizwits.com/developer/activity/gokit/request](http://site.gizwits.com/developer/activity/gokit/request)

官方二维码：
![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/intro/5.png)


如果您是团体

GizWits针对团体有很多支持计划，您可以和GizWtis联系，快速得到GoKit以及技术支持；

网站地址： [http://www.gizwits.com/about-us](http://www.gizwits.com/about-us)
