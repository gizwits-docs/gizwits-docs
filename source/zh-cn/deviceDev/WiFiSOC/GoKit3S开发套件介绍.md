title: GoKit3(S)开发套件介绍
---


#   GoKit3(S)是什么

GoKit3(S)是机智云（GizWits）推出的物联网智能硬件开发套件（第三代），目的是帮助传统硬件快速接入互联网。完成入网之后，数据可以在产品与云端、制造商与用户之间互联互通，实现智能互联。

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

注：详细硬件原理图请查看 [《GoKit3.2 硬件手册》](/zh-cn/deviceDev/WiFiSOC/intro/./assets/zh-cn/deviceDev/WiFiSOC/intro/4_GoKit-SoC-ESP8266%20%E7%A1%AC%E4%BB%B6%E6%89%8B%E5%86%8C.doc)

#  GoKit3(S)用法

**SoC方式**

SoC是最新推出的开发方式，即功能板+wifi模组的连接方式，是GoKit3(S)的默认方式，发货固件即为SoC固件，可直接使用，用法与GoKit2相同。需要注意的是SoC方式不能接底板，否则不能正常运行。

二次开发源码包及原理图已经开放，地址是：

1、ESP8266 SoC源码包[http://site.gizwits.com/zh-cn/developer/resource/hardware?type=GoKit](http://site.gizwits.com/zh-cn/developer/resource/hardware?type=GoKit) ，选择“微信宠物屋 for GoKit3(S) ESP8266”进行下载。

2、原理图： [http://club.gizwits.com/thread-2889-1-1.html](http://club.gizwits.com/thread-2889-1-1.html)

**MCU方式**

MCU的方式可得到与GoKit2相同的开发方式，即底板+功能板+wifi模组的连接方式。使用MCU的连接方式需要开发者自更新wifi模组的固件，固件下载地址及烧录方法见下面链接：

1、GAgent固件：[http://site.gizwits.com/zh-cn/developer/resource/hardware?type=GAgent](http://site.gizwits.com/zh-cn/developer/resource/hardware?type=GAgent) 选择“GAgent for ESP8266”。

2、GAgent固件烧录方法：[http://docs.gizwits.com/hc/kb/article/156881/](http://docs.gizwits.com/hc/kb/article/156881/)

3、STM32 MCU源码包 [http://site.gizwits.com/zh-cn/developer/resource/hardware?type=GoKit](http://site.gizwits.com/zh-cn/developer/resource/hardware?type=GoKit)，选择“微信宠物屋 for GoKit 2 STM”进行下载。

#  相关支持

如果您是创客

GoKit是面向智能硬件开发者限量免费开放，注册我们的论坛或关注我们的官方微信均可发起申请即可。

官方网站地址： [http://site.gizwits.com/developer/activity/gokit/request](http://site.gizwits.com/developer/activity/gokit/request)

如果您是团体

GizWits针对团体有很多支持计划，您可以和GizWtis联系，快速得到GoKit以及技术支持；

网站地址： [http://www.gizwits.com/about-us](http://www.gizwits.com/about-us)
