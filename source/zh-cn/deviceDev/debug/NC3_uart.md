title: 域格 NC3 串口烧写说明
---

# 一、概述

本文针对域格CLM920_NC3_LTE模块(以下略称NC3)进行串口模式烧写流程整理了一篇操作流程。合作厂商在进行模块烧写操作时请依次按照如下步骤进行，否则会产生不可控的错误。

# 二、准备工作

## 1. 获取对应固件

以项目的形式向机智云FAE同事申请域格NC3固件压缩包。

## 2. 解压固件压缩包

解压之后，会得到一个文件夹，点击打开文件夹内的downloadnoefs文件夹，里面的updateadb_9025.bat和downloadqfil_9025.bat就是我们烧写所要执行的批处理文件

## 3. 驱动安装

点击9x07_windows_driver_setup_v02.exe执行文件，按照步骤选择下一步，安装域格的驱动

## 4. 模组硬件连接

### 4.1 域格NC3模组管脚图

![name](/assets/zh-cn/deviceDev/debug/NC3/NC_uart_1.png)

### 4.2 电源接入管理

实际设计电源电路可使用开关 DC 电源或线性 LDO 电源来设计 VBAT 电源,两种设计电路都需要提供足够电流。具体参考以下电路设计：

![name](/assets/zh-cn/deviceDev/debug/NC3/NC_uart_2.png)

![name](/assets/zh-cn/deviceDev/debug/NC3/NC_uart_3.png)

![name](/assets/zh-cn/deviceDev/debug/NC3/NC_uart_4.png)

为防止浪涌及过压对模块的损坏，建议在模块 VBAT 引脚上并联一个 5.1V/500mW的齐纳二极管。

建议在 VBAT 管脚增加 3 个陶瓷电容(33pF,10pF,100nF)且靠近 VBAT 管脚放置。

模块最低工作电压为 3.3V，由于传输数据或 GSM 通话会产生 2A 以上电流，导致电源电压上产生纹波压降，因此实际供电电压不得低于 3.3V。

### 4.3 USIM卡参考电路

CLM920 NC3 模块不自带 USIM 卡槽，用户使用时需在自己的接口板上设计 USIM 卡槽。USIM 卡接口参考电路如下：

![name](/assets/zh-cn/deviceDev/debug/NC3/NC_uart_5.png)

USIM 接口线上建议选择 ONSEMI 公司的 SMF15C 器来做 ESD 防护，外围电路器件应该靠近卡座放置，SIM 卡座靠近模块布局。

USIM 卡电路容易受到射频干扰引起不识卡或掉卡，因此卡槽应尽量放置在远离天

线射频辐射的地方，卡走线尽量远离射频，电源和高速信号线。

UIM_DATA 内部已经通过 47K 电阻上拉到 VDD_EXT，外部不需要上拉。

UIM_DET 为 USIM 卡插入或未插入检测脚，默认时为高电平，热插拔应用时可通过此 PIN 脚检测 SIM 卡状态。

USIM 接口为避免瞬间电压过载，需在信号线通路上各串联一个 22R 的电阻。

USIM 卡座的地和模块的地要保持良好的连通性。

## 4.4 USB接口

CLM920 NC3 模块的 USB 接口提供一路 USB2.0 High-Speed 接口。接口支持从设备模式，不支持 USB 充电模式。USB 接口引脚定义如下：

![name](/assets/zh-cn/deviceDev/debug/NC3/NC_uart_6.png)

模块作为 USB 从设备,支持 USB 休眠及唤醒机制。USB 接口应用参考电路如下：

![name](/assets/zh-cn/deviceDev/debug/NC3/NC_uart_7.png)

USB 接口支持高速(480Mbps)和全速(12Mbps)模式，因此走线设计需要严格遵循USB2.0 协议要求，注意对数据线的保护，差分走线，控制阻抗为 90Ω。

为提高 USB 接口的抗静电性能，建议数据线上增加 ESD 保护器件，保护器件的等效电容值小于 2pF。

USB 接口总线供电电压由模块内部提供，不需外部提供。同时由于模块的 USB 接口对外不提供 USB 总线电源，模块只能作为 USB 总线设备的从设备。

USB 接口可支持的功能有：软件下载升级、数据通讯、AT Command、GNSS NMEA输出等功能。

## 4.5 串口的定义和使用

机智云对于域格NC3的模块使用了两个串口，以下为串口的作用以及管脚定义

**通信串口：**

| 管脚号 | 管脚名 | 描述 |
| 67 | TXD | UART发送数据 |




![name](/assets/zh-cn/deviceDev/debug/NC3/NC_uart_8.png)

![name](/assets/zh-cn/deviceDev/debug/NC3/NC_uart_9.png)

![name](/assets/zh-cn/deviceDev/debug/NC3/NC_uart_10.png)
![name](/assets/zh-cn/deviceDev/debug/NC3/NC_uart_11.png)
