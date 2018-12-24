title: ESP-WROOM-02D串口烧写说明
---

# 概述

本文针对乐鑫ESP-WROOM-02D模块进行串口模式烧写流程整理了一篇操作流程。**合作厂商在进行模块烧写操作时请依次按照如下步骤进行，否则会产生不可控的错误。**

# 操作流程

## 1.下载ESP-WROOM-02D对应的固件

ESP-WROOM-02D GAgent固件下载地址：https://download.gizwits.com/zh-cn/p/92/94
由于ESP-WROOM-02D与ESP8266的CPU相同，所以下载ESP8266的GAgent固件可适用于ESP-WROOM-02D。 
 ![name](/assets/zh-cn/deviceDev/debug/ESP-EROOM-02D/ESPEROOMprogramming_1.png)

 ![name](/assets/zh-cn/deviceDev/debug/ESP-EROOM-02D/ESPEROOMprogramming_2.png)

  ![name](/assets/zh-cn/deviceDev/debug/ESP-EROOM-02D/ESPEROOMprogramming_3.png)

## 2.确认固件文件（以combine固件为例）
 
 ![name](/assets/zh-cn/deviceDev/debug/ESP-EROOM-02D/ESPEROOMprogramming_4.png)

如图所示.bin文件为我们所需要的固件，由于ESP-WROOM-02DM模组的flash是2MB的，使用机智云官网乐鑫8266固件的16Mbit固件。如图所示bin文件为我们所需要的固件。

## 3.设备连接 

将ESP-WROOM-02D模块按照如下原理图进行接线，注意GPIO0（7号管脚）需要输入低电平，本实验直接接地处理，KEY1实现外部复位功能。
  ![name](/assets/zh-cn/deviceDev/debug/ESP-EROOM-02D/ESPEROOMprogramming_5.png)

**上图为烧录固件简易原理图，在产品中实际搭建线路时，请参考官方提供线路图，如下所示：**

  ![name](/assets/zh-cn/deviceDev/debug/ESP-EROOM-02D/ESPEROOMprogramming_6.png)


## 4.串口设置

###  下载烧写软件

下载地址：https://www.espressif.com/zh-hans/support/download/other-tools?keys=&field_type_tid%5B%5D=14

## 5.烧写操作

 **请务必依次对照下图所选的地方进行相应的填写：**
 
 ### 使用MCU方案烧写方式（combine固件烧写）：
 
 ### （1）工具界面设置
 
 ![name](/assets/zh-cn/deviceDev/debug/ESP-EROOM-02D/ESPEROOMprogramming_7.png)
 
 ### （2）选择串口/波特率，点击”START”
 
 ![name](/assets/zh-cn/deviceDev/debug/ESP-EROOM-02D/ESPEROOMprogramming_8.png)
 
 ### （3）设备上电，开始进行烧录 
 
 ![name](/assets/zh-cn/deviceDev/debug/ESP-EROOM-02D/ESPEROOMprogramming_9.png)
 
 ### （4）固件烧录完成
  
 ![name](/assets/zh-cn/deviceDev/debug/ESP-EROOM-02D/ESPEROOMprogramming_10.png)



