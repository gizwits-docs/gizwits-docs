
# 概述

本文针对汉枫HF-LPB100模块进行串口模式烧写流程整理了一篇操作流程。合作厂商在进行模块烧写操作时请依次按照如下步骤进行，否则会产生不可控的错误。

# 操作流程

## 1.在机智云官网下载中心下载HF-LPB100对应的固件
 
 ![name](/assets/zh-cn/deviceDev/debug/LPB100/1478077175722.png)
 
 ![name](/assets/zh-cn/deviceDev/debug/LPB100/1478077150728.png)

##  2.解压下载的固件包
 
  ![name](/assets/zh-cn/deviceDev/debug/LPB100/1478077203909.png)
 
解压之后会发现有两个文件，其中一个文件名为带有UART的bin文件为我们所需要的固件。

 ![name](/assets/zh-cn/deviceDev/debug/LPB100/1478077302828.png)

## 3.设备连接

将HF-LPB100模块按照如下原理图进行接线，注意nReload（45号管脚）需要输入低电平，本实验直接接地处理。KEY1实现外部复位功能。
 
  ![name](/assets/zh-cn/deviceDev/debug/LPB100/1478077343754.png)

## 4.串口设置

### 4.1.确认串口参数

将上述串口连接电脑后，通过“我的电脑”->“管理”-> “设备管理器”->“端口（COM 和LPT）”选项中可以看到相应增加的COM口。
 
 ![name](/assets/zh-cn/deviceDev/debug/LPB100/1478077440542.png)

### 4.2下载串口工具SecureCRT

下载地址：http://pan.baidu.com/s/1dECLxYD

下载解压后双击 ![name](/assets/zh-cn/deviceDev/debug/LPB100/1478077477009.png)
打开SecureCRT，点击快速连接后会弹出串口配置对话框。

 ![name](/assets/zh-cn/deviceDev/debug/LPB100/1478077505370.png)

 ![name](/assets/zh-cn/deviceDev/debug/LPB100/1478077527730.png)

串口配置协议为Serial，端口为上述2.4.1中的COM口，波特率设置为115200（关键），数据位为8位，停止位为1位，无奇偶校验，最后点击连接。
连接成功后，在SecureCRT工作区间会有光标闪烁。

 ![name](/assets/zh-cn/deviceDev/debug/LPB100/1478077592325.png)

##  5.烧写操作

### 5.1.进入烧写模式

步骤一、当串口连接成功之后，将HF-LPB100进行复位（按下2.3节原理图所示的KEY1后松开）或者给模块重新上电。
 步骤二、在完成步骤一的同时，迅速连续单击键盘空格键，将会出现如下信息表示模块进入烧写模式。 
 
  ![name](/assets/zh-cn/deviceDev/debug/LPB100/1478077629762.png)

备注：此步骤不易操作实现，需要多次进行试验，当进行进入烧写模式操作始终无法显示上述信息的时候要注意检查串口设置是否正确，待确保串口设置无误后再次进行连接操作。

上述窗体显示信息中，各命令解释如下： 


|命令|含义|
|:------------- |:-------------|
|B|清除所有设置参数，包括出厂参数等|
|F|升级Firmware； Wi-Fi驱动一般不用升级，如错误擦除这部分，从汉枫官网下载HF-LPB100/HF-LPT100WiFi驱动进行升级。|
|N|升级Nvram；射频参数部分，无需改动。|
|S| 升级应用程序；SDK等编译出来文件的用此选项升级。|
|G|执行应用程序。|


注意：‘N’、‘F’、‘S’是模块启动的必须条件，如果其中任何一个无效，模块上电会直接进入升级模式，请小心输入。

### 5.2.进行烧写

 ![name](/assets/zh-cn/deviceDev/debug/LPB100/1478077792146.png)

步骤一、输入“S”升级应用程序，再输入“Y”进入接收固件状态。
 
步骤二、当窗体连续打印出“CCC….”后选择”菜单栏” 中“传输”->”发送Xmode(N)”， 选择2节中所示的固件文件，点击发送。

  ![name](/assets/zh-cn/deviceDev/debug/LPB100/1478077804547.png)

等待一段时候后，出现如上述信息表示烧写成功。
