title: 机智云GAgent For HF-LPT230串口烧写说明
---
# 概述

本文针对汉枫HF-LPT230模块进行串口模式烧写流程整理了一篇操作流程。合作厂商在进行模块烧写操作时请依次按照如下步骤进行，否则会产生不可控的错误。

# 操作流程

## 1. 获取对应固件

以项目的形式向机智云FAE同事申请LPT230固件压缩包。

## 2. 解压固件压缩包

解压之后会发现有两个文件，其中一个文件名为带有”image”的bin文件为我们所需要的固件，例如：GAgent_00HFT230_04030007_2M_image_201810311738.bin。

备注：文件名带有”upgrade”的bin文件为OTA的固件，例如：GAgent_00HFT230_04030007_2M_upgrade_201810311738.bin。

## 3. 设备连接

将HF-LPT230模块按照如下原理图进行接线，注意nReload需要输入低电平，通过按键S2控制nReload的低电平输入。S1实现外部复位功能。

![设备连接](/assets/zh-cn/deviceDev/debug/LPT230/LPT230programming_1.png)

![设备连接](/assets/zh-cn/deviceDev/debug/LPT230/LPT230programming_10.png)

## 4. 串口设置

## 4.1 确认串口参数
将上述串口连接电脑后，通过“我的电脑”->“管理”-> “设备管理器”->“端口（COM 和LPT）”选项中可以看到相应增加的COM口。

![确认串口参数](/assets/zh-cn/deviceDev/debug/LPT230/LPT230programming_2.png)

## 4.2 下载串口工具SecureCRT

下载地址：[http://pan.baidu.com/s/1dECLxYD](http://pan.baidu.com/s/1dECLxYD)

下载解压后双击打开SecureCRT，点击快速连接后会弹出串口配置对话框。

![串口工具SecureCRT](/assets/zh-cn/deviceDev/debug/LPT230/LPT230programming_3.png)

![串口工具SecureCRT](/assets/zh-cn/deviceDev/debug/LPT230/LPT230programming_4.png)

串口配置协议为Serial，端口为上述2.4.1中的COM口，波特率设置为230400（关键），数据位为8位，停止位为1位，无奇偶校验，最后点击连接。

连接成功后，在SecureCRT工作区间会有光标闪烁。

![串口工具SecureCRT](/assets/zh-cn/deviceDev/debug/LPT230/LPT230programming_6.png)

![串口工具SecureCRT](/assets/zh-cn/deviceDev/debug/LPT230/LPT230programming_5.png)

## 5. 烧写操作

## 5.1 进入烧写模式

当串口连接成功之后，将HF-LPT230的nReload接入低电平（按下第3节原理图所示的S2），然后进行复位（按下第3节原理图所示的S1后松开）或者给模块重新上电后迅速连续单击键盘空格键，
将会出现如下信息表示模块进入烧写模式，松开S2。

![烧写操作](/assets/zh-cn/deviceDev/debug/LPT230/LPT230programming_7.png)

备注：此步骤不易操作实现，需要多次进行试验，当进行进入烧写模式操作始终无法显示上述信息的时候要注意检查串口设置是否正确，待确保串口设置无误后再次进行连接操作。

上述窗体显示信息中，各命令解释如下： 

| Item      |    Value |
| :-------- |:--------|
|命令‘B’	|清除所有设置参数，包括出厂参数等。|
|命令‘S’	|升级应用程序；SDK等编译出来文件（需使用串口方式的升级文件）的用此选项升级。|
|命令‘G’|	执行应用程序。|

## 5.2 进行烧写

输入“S”升级应用程序，再输入“Y”进入接收固件状态。

![烧写](/assets/zh-cn/deviceDev/debug/LPT230/LPT230programming_8.png)

当窗体连续打印出“CC”后选择”菜单栏” 中“传输”->”发送Xmode(N)”， 选择2.2节中所示的固件文件，点击发送。

![烧写](/assets/zh-cn/deviceDev/debug/LPT230/LPT230programming_9.png)

等待一段时候后，出现如上述信息表示烧写成功。
