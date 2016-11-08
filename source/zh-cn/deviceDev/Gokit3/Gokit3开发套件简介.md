title: Gokit3系列开发套件简介
---



# GoKit3介绍
Gokit3是GoKit产品系列的第三代，支持MCU、SoC、BLE、语音、模式切换等特性。目前支持的SoC方案模组有ESP8266、Hi3518E模组、宇音天下模组等。

GoKit3的扩展板的模组接口采用双排母的设计，模组的单排针根据用法不同选择MCU(MCU模式接口)和SoC(SoC模式接口)两种接入方式，如下图所示扩展板接口图：

![](/assets/zh-cn/deviceDev/Gokit3/intro/image1.png)

![](/assets/zh-cn/deviceDev/Gokit3/intro/image2.png)

 **说明：**

1. SoC版本的模组应该插到扩展板的SoC模式接口上。

2.  SoC版本使用时应与底板分离，否则模组程序无法正常启动。


# GoKit3套件

## 1、GoKit3(S)

![](/assets/zh-cn/deviceDev/Gokit3/intro/image3.jpg)

GoKit3(S)是机智云（GizWits）推出的物联网智能硬件开发套件之一，目的是帮助传统硬件快速接入互联网。完成入网之后，数据可以在产品与云端、制造商与用户之间互联互通，实现智能互联。

### 主要特点：

1.  分体式的设计方案，即底板(SoC方式应去掉)+功能板+模组。

2.  支持MCU和SoC两种连接方式。

3.  MCU方式支持多种无线WiFi模组并可随意更换。

4.  支持标准版(STM32底板)和创客版(Arduino底板)。

5.  基于机智云(GizWits)开发平台，高效、易用、安全。

6.  提供完整开源Demo工程和相关SDK集成指南。

### 硬件资源：

1. 红外探测器；

2. 温湿度传感器；

3. RGB三色LED；

4. 可调速微型直流电机；

5. 3个自定义功能按键

6. OLED显示屏接口；

7. Arduino标准接口；

8. 内置USB2UART调试接口。

9. 其他预留接口

### 创客版底板

![](/assets/zh-cn/deviceDev/Gokit3/intro/image4.png)

### 标准版底板

![](/assets/zh-cn/deviceDev/Gokit3/intro/image5.png)


## 2、GoKit3(V)

![](/assets/zh-cn/deviceDev/Gokit3/intro/image6.jpeg)


**GoKit3(V)**是机智云（GizWits）推出的物联网智能硬件开发套件（第三代）之一，目的是帮助传统硬件快速接入互联网。完成入网之后，数据可以在产品与云端、制造商与用户之间互联互通，实现智能互联。

### 主要特点：

1.  整体式的设计方案，较低的开发成本。

2.  语音识别模块，支持本地语音识别、识别词条自定义、提示音自定义及P0数据点关联。

3.  基于机智云(GizWits)开发平台，高效、易用、安全。

4.  提供完整开源Demo工程。

### 硬件资源：

1. 红外探测器；

2. 温湿度传感器；

3. RGB三色LED；

4. 可调速微型直流电机；

5. 3个自定义功能按键

6. OLED显示屏接口；

7. Arduino标准接口；

8. USB2UART调试接口。

9. 其他预留接口。

#  FAQ

## 1、SOC版与MCU版的区别
![@MCU方式](/assets/zh-cn/deviceDev/Gokit3/intro/image7.jpeg)

![@SoC方式](/assets/zh-cn/deviceDev/Gokit3/intro/image8.jpeg)


**MCU版**

是分体式的设计方案。WiFi模组只负责信息的接收与发送，它通过串口等方式与MCU进行通信，需要在MCU上进行协议解析与外设相关的开发。

总结：这种方案的优点是不受限于WiFi SOC片上资源、应用扩展度高；缺点是开发难度大、生产成本高。

**SOC版**

是整体式的设计方案。它将WiFi模组与外设驱动模块直接连接起来，直接在WiFi SOC上进行开发，省去了一层通讯过程。

 总结：这种方案的优点是能降低开发难度、降低生产成本；缺点是受限于WiFi SOC片上资源，应用有限。

## 2、GoKit3后期规划

为了使开发者能够基于GoKit开发更多类型产品及应用，我们有更高性能的SoC、BLE等不同接入方式的模组正在研发中，请大家关注机智云网站动态。
