title: ESP8266串口烧写说明
---

# 概述

本文针对乐鑫ESP8266模块进行串口模式烧写流程整理了一篇操作流程。**合作厂商在进行模块烧写操作时请依次按照如下步骤进行，否则会产生不可控的错误。**

# 操作流程

## 1.下载ESP8266对应的固件
 
 ![name](/assets/zh-cn/deviceDev/debug/ESP8266/1478076360990.png)

 ![name](/assets/zh-cn/deviceDev/debug/ESP8266/1478076396266.png)

  ![name](/assets/zh-cn/deviceDev/debug/ESP8266/new1.png)

## 2.确认固件文件（以合并固件为例）
 
 ![name](/assets/zh-cn/deviceDev/debug/ESP8266/1478076417476.png)

如图所示bin文件为我们所需要的固件。

## 3.设备连接 

将ESP8266模块按照如下原理图进行接线，注意GPIO0（18号管脚）需要输入低电平，本实验直接接地处理，KEY1实现外部复位功能。

  ![name](/assets/zh-cn/deviceDev/debug/ESP8266/1478076437289.png)

**上图为烧录固件简易原理图，在产品中实际搭建线路时，请参考官方提供线路图，如下所示：**

![name](/assets/zh-cn/deviceDev/debug/ESP8266/1478158365798.png)


## 4.串口设置

###  下载烧写软件

下载地址：http://pan.baidu.com/s/1mhMGSeG

### 烧写固件

 ![name](/assets/zh-cn/deviceDev/debug/ESP8266/20161118150552.png)
 
 使用如上图所示固件烧录固件时，串口烧录工具参数需按照如下方式填写：

 **请务必依次对照下图所选的地方进行相应的填写：**
 使用MCU方案烧写方式（合并烧写）：
 
 ![name](/assets/zh-cn/deviceDev/debug/ESP8266/new2.png)
 
 ![name](/assets/zh-cn/deviceDev/debug/ESP8266/new3.png)
 
 ![name](/assets/zh-cn/deviceDev/debug/ESP8266/new4.png)
 
  使用SOC方案烧写方式（32Mbit方案分区烧写）：
  
 ![name](/assets/zh-cn/deviceDev/debug/ESP8266/new5.png)

## 5烧写操作 

步骤一、当串口连接成功之后，点击如上图的“START”按钮，

  ![name](/assets/zh-cn/deviceDev/debug/ESP8266/1478076571280.png)

会出现

  ![name](/assets/zh-cn/deviceDev/debug/ESP8266/1478076577320.png)

步骤二、将ESP8266进行复位（按下2.3节原理图所示的KEY1后松开）将会出现如下信息表示模块正在进行烧写。
 
  ![name](/assets/zh-cn/deviceDev/debug/ESP8266/1478076590987.png)

步骤三、等待一段时间后，出现“FINISH”字样表示烧写成功。
 
 ![name](/assets/zh-cn/deviceDev/debug/ESP8266/1478076247606.png)


