title: 零零N102 串口烧写说明
---
# 概述

本文针对零零智能N102工业宽温NB-IOT MINI DTU进行串口模式烧写流程整理了一篇操作流程。**合作厂商在进行模块烧写操作时请依次按照如下步骤进行，否则会产生不可控的错误。**
# 操作流程

## 1. 获取对应lod固件

以项目的形式向机智云FAE同事申请Air202 lod 固件。

## 2. 解压固件压缩包

解压之后会发现有两个文件夹，其中一个文件夹为“量产升级用.lod文件”，该文件夹中包含一个.lod文件为我们烧录所需要的固件，例如：00AIR202_04030009_Luat_V0027_8955_SSL.lod。

备注：文件夹名为”远程升级用.bin文件”中的.bin文件为OTA的固件，例如：00AIR202_04030009_Luat_V0027_8955_SSL.bin。

## 3. 设备连接

Air202模组的UART1主串口用于与MCU进行串口通信，其简易通信接线如图3-1所示；调试串口HOST用于固件烧录和打印日志，其通信接线如图3-2所示：

![设备连接](/assets/zh-cn/deviceDev/debug/Air202/air202programming_1.png)

图3-1  UART1三线制连接方式示意图

![设备连接](/assets/zh-cn/deviceDev/debug/Air202/air202programming_2.png)

图3-2  软件调试串口连线图

Air202模组在产品中实际搭建线路时，可参考官方转接板线路图进行连线，如图3-3所示：

![设备连接](/assets/zh-cn/deviceDev/debug/Air202/air202programming_3.png)
![设备连接](/assets/zh-cn/deviceDev/debug/Air202/air202programming_4.png)
![设备连接](/assets/zh-cn/deviceDev/debug/Air202/air202programming_5.png)
![设备连接](/assets/zh-cn/deviceDev/debug/Air202/air202programming_6.png)


## 4. 下载LuaTools工具

打开合宙官网：http://www.openluat.com/

选择上面的“产品中心”，随便选一个产品，如：Air202 GPRS 通信模块

点击模块介绍那边的“资料下载”选项卡

点击“[LuaTools] Luat下载调试工具x.x.x”下载

可以直接打开下面链接下载：
http://www.openluat.com/Product/file/rda8955/luatools-redirect.html

下载后可能会进行自动升级，这个工具基本上是持续使用，都不会出现版本过旧的问题。

![LuaTools](/assets/zh-cn/deviceDev/debug/Air202/air202programming_7.png)
↑软件界面
如果软件模式不是2G模式，点击“切换模式”→“切换至2G”

![LuaTools](/assets/zh-cn/deviceDev/debug/Air202/air202programming_8.png)


## 5. 烧写操作

### 注意：请先打开串口再将模块上电！ 
模块输入电压为5V，接软件调试串口HOST。

我以烧录的00AIR202_04030009_Luat_V0027_8955_SSL.lod为例，首先在调试工具中确保串口选项卡的串口为你设备的串口值，点击下载LOD(core)按钮，选中之前在工具目录的lod文件：

![烧写操作](/assets/zh-cn/deviceDev/debug/Air202/air202programming_9.png)

![烧写操作](/assets/zh-cn/deviceDev/debug/Air202/air202programming_10.png)


**固件烧录中**

![烧写操作](/assets/zh-cn/deviceDev/debug/Air202/air202programming_11.png)


**烧录完成**

![烧写操作](/assets/zh-cn/deviceDev/debug/Air202/air202programming_12.png)
