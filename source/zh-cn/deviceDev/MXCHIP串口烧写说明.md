title: HF-LPB100串口烧写说明
---

#  概述

本文针对庆科GAgent for MXCHIP模块进行串口模式烧写流程整理了一篇操作流程。合作厂商在进行模块烧写操作时请依次按照如下步骤进行，否则会产生不可控的错误。

# 操作流程

## 1.下载MXCHIP模块对应的固件

 ![name](/assets/zh-cn/deviceDev/debug/MXCHP/1478078324899.png)

  ![name](/assets/zh-cn/deviceDev/debug/MXCHP/1478078309566.png)
 
  ![name](/assets/zh-cn/deviceDev/debug/MXCHP/1478078354870.png)

 
## 2.确认固件文件

 ![name](/assets/zh-cn/deviceDev/debug/MXCHP/1478078363806.png)

如图所示bin文件为我们所需要的固件。

## 3.设备连接

接线原理图如下，注意PB1管脚需要输入低电平，本实验直接接地处理，KEY1实现外部复位功能。

  ![name](/assets/zh-cn/deviceDev/debug/MXCHP/1478078494199.png)


## 4.串口设置
### 4.1确认串口参数

 ![name](/assets/zh-cn/deviceDev/debug/MXCHP/1478078509304.png)

将上述开发板连接电脑后，通过“我的电脑”->“管理”-> “设备管理器”->“端口（COM 和LPT）”选项中可以看到相应增加的COM口。


### 4.2下载串口工具SecureCRT

下载地址：http://pan.baidu.com/s/1dECLxYD

下载解压后双击 ![name](/assets/zh-cn/deviceDev/debug/MXCHP/1478078522125.png) 打开SecureCRT，点击快速连接后会弹出串口配置对话框。

 ![name](/assets/zh-cn/deviceDev/debug/MXCHP/1478078546592.png)

  ![name](/assets/zh-cn/deviceDev/debug/MXCHP/1478078579177.png)

串口配置协议为Serial，端口为上述2.4.1中的COM口，波特率设置为115200（关键），数据位为8位，停止位为1位，无奇偶校验，最后点击连接。

## 5.烧写操作

### 5.1、进入烧写模式

步骤一、当串口连接成功之后，对庆科模块进行复位（按下2.3节中所示的KEY1按键后松开），在SecureCRT工作区间会显示如下信息，表示进入烧写模式，若出现乱码，请重新创建串口连接，或重启SecureCRT，若不出现以下信息，请确认设备连接是否正确。
 
  ![name](/assets/zh-cn/deviceDev/debug/MXCHP/1478078653629.png)

### 5.2、进行烧写

步骤一、输入“1”后回车 

 ![name](/assets/zh-cn/deviceDev/debug/MXCHP/1478078682068.png)


步骤二、当窗体连续打印出“CCC….”后选择”菜单栏” 中“传输”->”发送Ymodem(D)”， 选择第2节中所示的固件文件，点击添加后再点击确定。
 
 ![name](/assets/zh-cn/deviceDev/debug/MXCHP/1478078694294.png)

等待一段时候后，出现如上述信息表示烧写成功。
