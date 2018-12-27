title: 零零N102 串口烧写说明
---
# 概述

本文针对零零智能N102工业宽温NB-IOT MINI DTU进行串口模式烧写流程整理了一篇操作流程。**合作厂商在进行模块烧写操作时请依次按照如下步骤进行，否则会产生不可控的错误。**
# 操作流程

## 1. 获取对应lod固件

以项目的形式向机智云FAE同事申请N102 DTU固件。

## 2. 解压固件压缩包

解压之后releasebin文件夹中的flash_download.cfg文件就是固件。

## 3. 设备连接

N102 DTU模组的UART1主串口用于与MCU进行串口通信，其简易通信接线如图3-1所示；调试串口UART0用于固件烧录和打印日志，其通信接线如图3-2所示：

![设备连接](/assets/zh-cn/deviceDev/debug/N102_DTU/N102programming_1.png)

图3-1  UART1三线制连接方式示意图

![设备连接](/assets/zh-cn/deviceDev/debug/N102_DTU/N102programming_2.png)

图3-2  调试串口UART0连线图

### N102 的实际线路图如图3-3所示：

![设备连接](/assets/zh-cn/deviceDev/debug/N102_DTU/N102programming_3.png)

图3-3  N102 接线图

## 4. 下载FLASH_TOOL工具

### FLASH_TOOL工具下载链接：

http://docs.gizwits.com/assets/pdf/IOT_FLASH_TOOL/IOT_Flash_Tool.rar

![FLASH_TOOL](/assets/zh-cn/deviceDev/debug/N102_DTU/N102programming_4.png)

↑软件界面

## 5. 烧写操作

### 注意：请先打开串口再将模块上电！ 

模块输入电压为5V，接软件调试串口UART0。

#### 5.1 首先在调试工具中确保串口选项卡的串口为你设备的串口值，选择下载的固件，点击start，模组上电(pwrkey先不拉低)，然后pwrkey拉低到串口烧写软件出现进度条，设备上电，出现进度条：

![烧写操作](/assets/zh-cn/deviceDev/debug/N102_DTU/N102programming_5.png)

### 5.2 固件烧录中

![烧写操作](/assets/zh-cn/deviceDev/debug/N102_DTU/N102programming_6.png)

### 5.3 烧录完成

![烧写操作](/assets/zh-cn/deviceDev/debug/N102_DTU/N102programming_7.png)

#### 5.4 使用串口助手连接串口uart0，检查固件版本是否正确。

![版本](/assets/zh-cn/deviceDev/debug/N102_DTU/N102programming_8.png)

注：目前纸质标签模组查看模组日志波特率是9600，激光雕刻模组查看模组日志波特率是115200。

## 6. 查看有无写入IMEI和AUTHCODE（授权秘钥）

打开串口调试助软件，波特率115200，连接模块的串口UART0。

### 6.1 查看IMEI，输入AT+CGSN=1(1后面要加回车)，输入3-4次。IMEI一般都是已经写好的

AT+CGSN=1

+CGSN: 866061038958554

OK

返回IMEI，模块里面已写入IMEI。

/*********************************************************/

AT+CGSN=1

+CGSN: 000000000000000!

OK

返回多个0，模块里面没有写入IMEI，需要写入IMEI。

写入实例：

AT*MCGSN=1,"012345678912345"(IMEI在模组表面可查看)

/*********************************************************/

### 6.2 查看AUTHCODE，输入AT+AUTHCODE?(?后面要加回车)

AT+AUTHCODE?

+AUTHCODE:b746XXXXXXXXXXXXXXX77

OK

返回AUTHCODE，模块里面已写入AUTHCODE

/*********************************************************/

AT+AUTHCODE?

+AUTHCODE:

OK

返回空，模块里面没有AUTHCODE，需要写入AUTHCODE。

写入实例：

AT+AUTHCODE=XXXXXXXXXXXXXXXXXXX

/*********************************************************/

注：客户编号（PIN）和授权码（Auth_Code）根据IMEI生成AUTHCODE（授权秘钥），如需使用授权密钥，可联系机智云FAE或者销售同事获取。

## 7. 模组添加到产品里

先创建NB-IOT产品，通讯方式选择NB-IOT，命令下发模式选择DRX。

![添加产品](/assets/zh-cn/deviceDev/debug/N102_DTU/N102programming_9.png)

选择设备管理，添加设备，输入IMEI和设备型号(N102)，完成添加。

![添加产品](/assets/zh-cn/deviceDev/debug/N102_DTU/N102programming_10.png)

## 8. 确保天线没问题与电信NB卡没问题。

天线问题：没插电线或者天线有问题，可以使用AT+CSQ指令查看模组信号强度，0~10 代表低； 10~20代表中； 20~31代表高；99代表未插卡。

![信号检测](/assets/zh-cn/deviceDev/debug/N102_DTU/N102programming_11.png)

电信NB卡有可能会有过期需要续费才能用的情况，但是从NB模组日志中是看不出来的，建议直接找真真确认卡有无问题

### 9. 最后，确保上述步骤4/5/6/7/8 都没问题后，就可以用IOE demo APP 和 机智云串口调试助手模拟mcu调试N102模块

