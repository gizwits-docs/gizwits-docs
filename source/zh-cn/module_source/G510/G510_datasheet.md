title: FIBOCOM_G510_datasheet_cn
---

# 1.	简介

## 1.1 产品描述

#### G510 模块支持 GSM 四频 850/900/1800/1900 MHz，模块的 GPRS 支持 class 10。该模块就是一个超小型的移动电话，它能够被集成进任何需要通过蜂窝网络进行语音通话或数据传输的系统或者产品中。因此，它能够大大提高系统的能力，将其从一个独立的，孤立的产品提升到一个强大的拥有全球通讯能力的高性能系统。

## 1.2 产品规格

###### 表1-1

![表1-1](http://docs.gizwits.com/assets/zh-cn/module_source/G510/1.png)

# 2. 硬件概述

## 2.1 硬件框图

#### 下图显示了模块的硬件框图。模块包括三个部分：数字部分，模拟部分和 GSM 收发机部分。

![图 2-1 G510 硬件框图](http://docs.gizwits.com/assets/zh-cn/module_source/G510/2.png)

###### 图 2-1 G510 硬件框图

### 2.1.1 数字部分

#### 1. 集成 Flash

#### 2. 集成 PSRAM

#### 3. 通信串口

#### 4. SIM 卡

#### 5. RTC 时钟

### 2.1.2 模拟部分

#### 1. 电源管理

#### 2. 锁相环

### 3.1.3 GSM 收发机部分

#### 1. G510 Q50-00 支持 GSM 850/900/1800/1900 频段

#### 2. 射频接收机，包括低噪声放大器，混频器，PLL，I/Q 输入输出

#### 3. GSM 数据接收发射芯片

#### 4. 射频前端控制，包括 RFPA 和天线开关

## 2.2 电源

#### 模块必须由外部 3.3V 到 4.5V 的直流电源单独供电，而且电源必须在此电压下允许有 2.0A 的电流通过，此电流只是在 GSM 的时隙发送时的瞬态电流。 模块提供 2 个管脚由外部来供电，如下表：

###### 表2-2

![表2-2](http://docs.gizwits.com/assets/zh-cn/module_source/G510/3.png)

### 2.2.1 电源管理

#### 设计模块电源时必须小心谨慎。外部的直流电源不仅仅是给模块的数字和模拟接口供电，同时，也直接给射频部分的功率放大器供电。因此，任何的供电不稳，纹波大或者噪声等，都将直接影响到模块的性能。

#### GSM 是时分多址，在发送时隙时会导致瞬时电流波动，由此会出现电压纹波现象。此时如果不处理妥当，这些频繁的电压纹波将会降低模块的性能。

#### 建议将此纹波控制在 300mV以内。在任何情况下，模块的供电都不应该低于它的最小电压。

#### 为了降低纹波等对电源的影响，我们建议：

##### 1. 在模块的电源输入端使用一颗 1000uF 或者更大的，低 ESR 的电容。这颗电容，越靠近模块的 VBAT管脚越好。

##### 2. 使用低阻的电源，电源线和 LAYOUT 走线。

##### 3. 电源走线越短越好。

#### 使用滤波电容给模块的供电滤波，如下表：

###### 表2-3

![表2-3](http://docs.gizwits.com/assets/zh-cn/module_source/G510/4.png)

## 2.3 开关机

#### 模块的开关机涉及到 2 个硬件信号， POWER_ON 和 VDD。

#### POWER_ON 是开关机最重要的信号，而 VDD 电平能说明模块是否已经开机。当 VDD 的电平是 0V时，说明此时处于关机状态。当 VDD 的电平是 2.85V 时，说明此时模块已经开机。

###### 表2-4

![表2-4](http://docs.gizwits.com/assets/zh-cn/module_source/G510/5.png)

### 2.3.1 模块开机

#### 模块处于关机状态时，PMU 工作在低功耗状态，只有 RTC 在工作。当 POWER_ON 信号为低电平并且持续超过 800ms 时，模块将开机。下图表明 POWER_ON 拉低 800ms 后成功开机：

![图 2-2 模块开机成功](http://docs.gizwits.com/assets/zh-cn/module_source/G510/6.png)

###### 图 2-2 模块开机成功

#### 下图表明在 POWER_ON 信号拉低的时间为 600ms 时，模块无法开机：

![图 2-3 模块开机失败](http://docs.gizwits.com/assets/zh-cn/module_source/G510/7.png)

###### 图 2-3 模块开机失败

### 2.3.2 模块关机

#### 有以下两种模块关机方式：

##### 1. 把 POWER_ON 拉低超过 3s。

![图 2-4 模块关机成功](http://docs.gizwits.com/assets/zh-cn/module_source/G510/8.png)

###### 图 2-4 模块关机成功

#### 模块开机后 POWER_ON 的常态是高电平。当把 POWER_ON 拉低超过 3s 后，模块将会关机。此关机会逐步关掉所有的应用接口（包括 UART,SIM card 等）和注销网络。

## 2.4 时钟信号

#### 模块包含了一种实时时钟 (RTC) 机制，执行许多内部函数，其中之一是保持时间。RTC 子系统嵌入在 PMU，并且在所有模块工作模式（关闭、空闲、睡眠)下运行，只要供电在最低工作电平以上就一直运行。

#### 当主电源不供电时，备用电池或电容可以通过接口连接器的 RTC pin 脚进行供电。

#### 当主电源供电和 RTC 引脚与模块断开连接，RTC 定时器将会重置，并且当前时间和日期将会丢失。下一次通电，模块的时间和日期将需要再次设置。

### 2.4.1 RTC 描述

###### 表2-5

![表2-5](http://docs.gizwits.com/assets/zh-cn/module_source/G510/10.png)

### 2.4.2 RTC 应用

#### 模块的时钟和数据可以按照以下方式进行设置应用：

##### 1. 自动从 GSM 网络检索。由于模块在 GSM 网络中，支持自动时区更新操作，它将与连接到网络时的日期和本地时间更新 RTC。RTC 会继续从那点时间开始运作。

##### 2. VBACKUP（pin6）的输入电压范围：2.0V~3.3V。当 VBACKUP 电压低于 2.0V，当前时间和日期将会丢失。

### 2.4.3 RTC 功耗

#### 当模块断电后，仅 RTC 供电情况下模块的功耗情况：

###### 表2-6

![表2-6](http://docs.gizwits.com/assets/zh-cn/module_source/G510/11.png)

## 2.5 串口

#### G510 有 3 个 UART 串口。

#### UART1 是一个完全独立的 8 线串行通信接口 (UART1). 这是主串口。

#### UART2 是一个 2 线串口，只支持部分 AT 命令。

#### HOST UART 是个 Debug UART，主要用来下载，校准，Trace 等，不支持 AT 命令。

### 2.5.1 UART1

#### 模块 UART1 是一个标准的 8 信号总线。这个 UART 用于与模块和命令接口、GPRS 数据、编程和软件升级之间的所有通信。

#### 模块被定义为 DCE，而用户的应用板被定义为 DTE。这些定义适用于 UART 信号的命名规定，和数据流动方向，如下表所示：

###### 表2-7

![表2-7](http://docs.gizwits.com/assets/zh-cn/module_source/G510/12.png)

#### 推荐连接方法：

###### 表2-8

![表2-8](http://docs.gizwits.com/assets/zh-cn/module_source/G510/13.png)

#### 支持所有的流控方式：硬件流控或非流控。

#### UART 1 默认端口配置为 8 个数据位、1 个停止位和无奇偶校验。

### 2.5.2 UART2

###### 表2-9

![表2-9](http://docs.gizwits.com/assets/zh-cn/module_source/G510/14.png)

UART2 支持部分 AT 命令，详见 AT 命令手册。

###### 表2-10

![表2-10](http://docs.gizwits.com/assets/zh-cn/module_source/G510/15.png)

### 2.5.3 HOST UART

#### HOST UART 是个 Debug UART，主要用来下载，校准，Trace 等，不支持 AT 命令。此口只在生产调试时使用，用户只需接测试点。

###### 表2-11

![表2-11](http://docs.gizwits.com/assets/zh-cn/module_source/G510/16.png)

## 2.6 SIM 接口

#### 模块包含了一个 SIM 卡接口，这个接口符合 GSM 11.11 和 GSM 11.12 标准（基于 ISO/IEC 7816）。这些标准定义了 GSM SIM 卡的电气特性、 信令和协议规范。

#### 模块不包含 SIM 卡槽。SIM 卡槽必须放在模块外部的用户开发板上。模块的 SIM 卡接口包括了所有必须的信号，这些信号被接到接口连接器，直接并全部连接到外部的 SIM 卡。

#### 模块支持 1.8V 或者 2.85V 电平自动识别。当模块在开机后，首先 SIM_VCC 向外部 SIM 卡输出 1.8V电压来建立通信。如果通信不成功，SIM_VCC 会再次输出 2.85V 电压，并和 SIM 卡建立通信。

###### 表2-12

![表2-12](http://docs.gizwits.com/assets/zh-cn/module_source/G510/17.png)

### 2.6.1 SIM 连接

#### 下图显示了一个典型的 SIM 卡接口，连接到模块。在模块开发板上，使用 MOLEX （PN 912283001 &912360001）SIM 卡槽，来实现这种连接方式。

#### 无论 SIM_CD 是否使用，都必须上拉，保证 SIM 卡的检测稳定。模块内部已经将 SIM_DATA 信号上拉到 SIM_VCC，外围无需再上拉。

###### 图 2-5 SIM 卡参考电路

![图 2-5 SIM 卡参考电路](http://docs.gizwits.com/assets/zh-cn/module_source/G510/18.png)

### 2.6.2 SIM 设计准则

#### SIM 卡接口和信号的设计特别重要。为了满足设计标准和规定，以下几点是必须要遵循的设计准则：

##### 1. SIM 卡的位置以及 SIM 信号的走线，必须远离任何可能的电磁干扰源，像射频天线和数字开关信号等。

##### 2. 在模块接口连接器和 SIM 卡槽之间，SIM 卡走线长度不应超过 100mm，这样满足 EMC 法则，同时提供信号的完整性。

##### 3. 为了避免 SIM 卡时钟和数据信号 （SIM_CLK 和 SIM_DATA） 之间的串扰，建议在开发板上将它们隔开，最好是由大地隔开。

##### 4. SIM 卡信号应使用低容性的保护性元器件进行 ESD 保护。建议使用 AVR M1005C270MAAB(TDK) ，并且 ESD 器件应该布局在 SIM 卡的附近。

## 2.7 控制和指示接口

#### G510 的一些信号是用来控制和显示模块的工作状态。以下描述为这些信号定义和应用。

###### 表2-13

![表2-13](http://docs.gizwits.com/assets/zh-cn/module_source/G510/19.png)

### 2.7.1 VDD 参考标准

#### 模块有一个规定的电压输出信号 VDD。要求输出 2.8V 电压，用于客户应用。能够提供 200mA 的电流，作为外部数字电路的电源。

#### 当模块开机时，VDD 输出。所以 VDD 可以指示模块的开机。

#### 注意：VDD 是来自模块的主电源，任何通过 VDD 供电的电路也都源自模块的 VBAT 供电。模块整体的供电电流受 VDD 工作的影响。

###### 表2-14

![表2-14](http://docs.gizwits.com/assets/zh-cn/module_source/G510/20.png)

### 2.7.2 EMERG_RST

#### EMERG_RST 定义为紧急关机，此 pin 脚被拉低后 1s 内系统将会关机，如下图：

#### 注意：它只能作为紧急情况下使用，尽量减少使用此 pin 脚的次数。


![图 2-6 拉低 EMERG_RST, 模块紧急关机](http://docs.gizwits.com/assets/zh-cn/module_source/G510/21.png)

###### 图 2-6 拉低 EMERG_RST, 模块紧急关机

### 2.7.3 LPG

#### 作为交替产生的同步信号，这个控制脚可以用来驱动应用平台的 LED 指示灯。

#### 推荐电路如下：

![图 2- LPG 参考电路LED 和 PIN 脚的状态：LED 灭为高电平，LED 亮为低电平。](http://docs.gizwits.com/assets/zh-cn/module_source/G510/22.png)

###### 图 2-7 LPG 参考电路LED 和 PIN 脚的状态：LED 灭为高电平，LED 亮为低电平。

###### 表2-15

![表2-15](http://docs.gizwits.com/assets/zh-cn/module_source/G510/23.png)

# 3 电气特性和环境特性

## 3.1 电气特性

#### 下表给出了模块接口信号的最大电气特性。

#### 注意：超出最大值可能会导致模块的永久性损坏。

###### 表3-1

![表3-1](http://docs.gizwits.com/assets/zh-cn/module_source/G510/24.png)

## 3.2 环境特性

#### 本表列出了模块工作的环境条件。

#### 注意：超出最大值可能会导致模块的永久性损坏。

###### 表3-2

![表3-2](http://docs.gizwits.com/assets/zh-cn/module_source/G510/25.png)

## 3.3 管脚定义说明

#### 下表总结了所有管脚规范。

#### 注意：不是由客户应用程序使用的接口必须悬空。模块采用了必要的内部电路，以保持与默认状态无关的信号。对于没有应用的管脚，不要连接任何的器件或施加任何的电压。

###### 表3-3

![表3-3](http://docs.gizwits.com/assets/zh-cn/module_source/G510/26.png)

#### 注意： T=三态

## 3.4 管脚定义图示

![图 3-1 管脚定义图](http://docs.gizwits.com/assets/zh-cn/module_source/G510/27.png)

###### 图 3-1 管脚定义图

# 4 结构设计

## 4.1 结构尺寸图

#### 下图显示了模块的结构图：

###### 图 4-1 结构图

![图 4-1 结构图](http://docs.gizwits.com/assets/zh-cn/module_source/G510/28.png)

## 4.2 推荐 PCB Layout

#### 下图为 PCB 的推荐布局：

###### 图 4-2 推荐 PCB 设计 （顶部视图）

![图 4-2 推荐 PCB 设计 （顶部视图）](http://docs.gizwits.com/assets/zh-cn/module_source/G510/29.png)

# I. 附录 - 资源

##### • [广和通G510模组烧写方法](http://docs.gizwits.com/zh-cn/deviceDev/debug/G510.html)

##### • [获取广和通G510 Gagent日志（教程中“4.获取广和通G510 Gagent日志”）](http://docs.gizwits.com/zh-cn/deviceDev/%E9%80%9A%E8%AE%AF%E6%A8%A1%E7%BB%84%E8%B0%83%E8%AF%95%E6%97%A5%E5%BF%97%E6%8A%93%E5%8F%96%E6%95%99%E7%A8%8B.html)

##### • [GAgent for 广和通Fibocom G510 04020027](http://gizwits.oss.aliyuncs.com/hardware_resource/GAgent_00FBG510_04020027_17041911_bps9600.zip)