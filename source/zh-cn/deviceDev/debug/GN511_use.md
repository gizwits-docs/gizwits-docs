title: GN511使用说明
---
# 概述

#### GN511工业级DTU产品是一款高性能、低功耗、多频段物联网无线数传单元，秉承机智云工业级DTU研发经验，硬件设计上采用支持NB-IoT的N256无线通讯模块，具备5-24V宽压电源、贴片eSIM、485串口、232串口、硬件看门狗等必要功能，主板通过串口通讯可快速实现与云端的通讯连接。同时GN511集成STM32 MCU，用户可方便地实现协议转换、扩展等功能。
#### 本文主要介绍GN511如何快速接入机智云，以及实现简单的透传功能。

# 操作流程

## 1. 在机智云创建新产品，定义数据点，添加设备

#### 1.1 创建新产品

 ![name](/assets/zh-cn/deviceDev/debug/GN511/GN511_use_1.png)
 
 ![name](/assets/zh-cn/deviceDev/debug/GN511/GN511_use_2.png)

#### 1.2 定义数据点

 ![name](/assets/zh-cn/deviceDev/debug/GN511/GN511_use_3.png)
 
 ![name](/assets/zh-cn/deviceDev/debug/GN511/GN511_use_4.png)

 ![name](/assets/zh-cn/deviceDev/debug/GN511/GN511_use_5.png)

#### 1.3 添加设备

 ![name](/assets/zh-cn/deviceDev/debug/GN511/GN511_use_6.png)

 ![name](/assets/zh-cn/deviceDev/debug/GN511/GN511_use_7.png)



##  2. 下载自动生成mcu代码，烧写程序到GN511的mcu中

#### 2.1 下载自动生成代码

 ![name](/assets/zh-cn/deviceDev/debug/GN511/GN511_use_8.png)

#### 2.2 下载代码完成后，我们可以先尝试将编译好的程序通过 CON3 的 SW 调试接口烧写到mcu当中。

 ![name](/assets/zh-cn/deviceDev/debug/GN511/GN511_use_9.png)

## 3. 修改mcu程序，使得mcu可以正常运行

#### MCU 无外部晶振，必须使用内部时钟 HSI。 
#### STM32 的部分 IO 口默认主功能是 JLINK 的功能管脚，需要将关闭 JTAG-DP，启动SW-DP 才可以控制该 IO 口，例如本硬件中用到的 PB3 和 PB4. 
##### 注：寄存器控制配置方式: 

RCC->APB2ENR|=0x1D; //使能 ABC IO 口时钟 开启辅助时钟 

AFIO->MAPR |= 0x02000000; //关闭 JTAG-DP，启动 SW-DP

程序修改步骤，略，本文最后有参考代码

## 4. mcu控制N256的上电和掉电、开机和关机

#### 4.1 N256 上电
#### N256 默认不得电，需要通过 MCU 的 PB0(NB_PWR)来控制得电。
 i. PB0(NB_PWR)=1，N256 上电。 
 
 ii. PB0(NB_PWR)=0，N256 掉电。

#### 4.2 N256 开机
###### a) MCU 需要先通过 PB0(NB_PWR)=1 给 N256 上电。 
###### b) 等 N256 电压稳定后 MCU 再通过 PB1(NB_PKEY)来控制 N256 开机或关机。 
###### c) PB1(NB_PKEY)的电平逻辑和 N256 的 PWRKEY 的电平逻辑是非门 
 i. PB1(NB_PKEY)=1，N256 PWRKEY=0. 
 
 ii. PB1(NB_PKEY)=0，N256 PWRKEY=1. 
 
###### d) 在拉低管脚 PWRKEY 之前，保证 VBAT 电压稳定。建议 VBAT 上电到管脚 PWRKEY 拉低之间的时间 T1 为 100ms 左右。 
#### N256 开机后，可以通过查看模组日志或者输入 AT 命令（如AT+CGSN=1）查看响应，判断模块是否已经开机成功，若成功可以释放 PWRKEY 引脚，反之，则模块开机失败。
#### 注：使用GN511的COM1查看模组日志
#### 模组日志截图

 ![name](/assets/zh-cn/deviceDev/debug/GN511/GN511_use_10.png)


## 5. GN511上线，机智云IOE DEMO APP绑定设备

#### 当模组正常开机十多秒以后，模组会自动连接上机智云平台，此时我们可以使用机智云APP扫描二维码的方式绑定GN511，使用机智云串口助手的小工具生成设备绑定二维码
 串口助手下载地址：https://download.gizwits.com/zh-cn/p/98/119

 ![name](/assets/zh-cn/deviceDev/debug/GN511/GN511_use_11.png)

#### 生成设备绑定二维码后，我们可以下载机智云IOE DEMO APP扫码绑定设备
APP下载地址：https://download.gizwits.com/zh-cn/p/98/99

 ![name](/assets/zh-cn/deviceDev/debug/GN511/GN511_use_12.png)

## 6. 控制设备，下发透传数据，实现简单透传功能，机智云接入完毕

#### APP端下发透传数据，然后我们用GN511的485将该透传数据输出，本程序使用了485-1打印mcu日志，485-2输出透传数据

 ![name](/assets/zh-cn/deviceDev/debug/GN511/GN511_use_13.png)

#### GN511透传数据接收情况

 ![name](/assets/zh-cn/deviceDev/debug/GN511/GN511_use_14.png)

## 7. 参考资料下载

#### 参考代码下载地址：链接：https://pan.baidu.com/s/1QoSs4I2sHkpLZFUhYoCzfw 
提取码：p6vx 

#### 《GN511硬件IO说明书 V1.5》链接：https://pan.baidu.com/s/1FbwuWueLlPV1PCDkU1RXww 
提取码：pn0l 
