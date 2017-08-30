title:  TinyCon3350-M26_datasheet
---

# 1 综述

#### M26模块是一款工业级的四频段GSM/GPRS无线模块。其工作频段是：GSM850MHz，EGSM900MHz，DCS1800MHz和PCS1900MHz。

#### M26具有15.8mm × 17.7mm × 2.3mm的超小尺寸，能够满足设备无线远程遥控设备的需求。

#### M26是贴片式模块，44个管脚，采用LCC封装，并通过焊盘内嵌于各类数传产品应用中，提供了模块与客户主板间丰富的硬件接口。

备注：该模块完全符合 RoHS 标准。

## 1.1. 主要性能

表 1：模块主要性能

![表 1：模块主要性能](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/1.png)

备注：当模块工作于此温度范围, 可能发生偏离 GSM 规范的现象，例如频偏和相位误差会增加，但是不会掉线。

表 2：编码格式和耦合时最大网络数据速度率

![表 2：编码格式和耦合时最大网络数据速度率](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/2.png)

## 1.2. 功能框图

#### 下图为M26功能框图，阐述了其主要功能

#### • 电源管理

#### • 存储器

#### • GSM射频

#### • 接口部分

##### -电源供电

##### -开关机接口

##### -串口

##### -SIM卡接口

![图 1：功能框图](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/51.png)

图 1：功能框图

## 1.3 管脚描述

![图 2：管脚分配图](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/52.png)

图 2：管脚分配图

表 3：参数定义

![表 3：参数定义](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/3.png)

表 4：引脚描述

![表 4：引脚描述](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/4.png)

## 1.4 Flash 空间分配 

#### TinyCon3350-M26模块内置了24Mbit Flash存储器。Flash地址分配如下图所示：

![图 3：Flash 空间分配图](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/53.png)

图 3：Flash 空间分配图

#### TinyCon3350-M26模块为用户分配了200KB的编程代码空间

#### l RAM

#### TinyCon3350-M26模块为嵌入式应用预留了100KB的内存编程

# 2应用接口

#### M26模块有44个 (1.5mm × 0.7mm)贴片引脚。以下章节详细阐述了模块各组接口的功能：

##### • 电源供电 (请参考 3.3 章节) 

##### • 开关机控制口 (请参考 3.4 章节) 

##### • 省电技术 (请参考 3.5 章节) 

##### • RTC (请参考 3.7 章节) 

##### • 串口 (请参考 3.8 章节) 

##### • SIM 卡接口 (请参考 3.11 章节) 

## 2.1 电源供电

### 2.1.1. 模块电源供电特性

#### 在 GSM/GPRS 模块应用设计中，电源设计是很重要的一部分。由于 GSM 发射时每隔 4.615ms 会有一个持续 577us（即 1/8 的 TDMA 周期（4.615ms））的突发脉冲。在突发脉冲阶段内，电源必须能够提供高的峰值电流，保证电压不会跌落到模块最低工作电压。

#### 对于 M26 模块，在最大发射功率等级下模块的峰值电流会达到 1.6A，这会引起 VBAT 端电压的跌落。为确保模块能够稳定正常工作，建议模块 VBAT 端的最大跌落电压不应超过 400mV。

![图 4：模块发射时的电压电流波形图](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/54.png)

图 4：模块发射时的电压电流波形图

### 2.1.2. 减少电压跌落

#### 模块电源 VBAT 电压输入范围为 3.3V~4.6V。为保证 VBAT 电压不会跌落到 3.3V 以下，在靠近模块VBAT 输入端，建议并联一个低 ESR(ESR=0.7Ω)的 100uF 的钽电容，以及 100nF、33pF（0603 封装）、10pF（0603 封装）滤波电容，VBAT 输入端参考电路如图 4 所示。并且建议 VBAT 的 PCB 走线尽量短且足够宽，减小 VBAT 走线的等效阻抗，确保在最大发射功率时大电流下不会产生太大的电压跌落。建议 VBAT走线宽度不少于 2mm，并且走线越长，线宽越宽。

![图 5：VBAT 输入参考电路](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/55.png)

图 5：VBAT 输入参考电路

### 2.1.3. 供电参考电路

#### 电源设计对模块的供电至关重要，必须选择能够提供至少 2A 电流能力的电源。若输入电压跟模块的供电电压的压差不是很大，建议选择 LDO 作为供电电源。若输入输出之间存在比较大的压差，则使用开关电源转换器。

#### 下图是+5V 供电的参考设计，采用了 Micrel 公司的 LDO，型号为 MIC29302WU。它的输出电压是 4.0V，负载电流峰值到 3A。为确保输出电源的稳定，建议在输出端预留一个稳压管，并且靠近模块 VBAT 管脚摆放。建议选择反向击穿电压为 5.1V，耗散功率为 1W 以上的稳压管。

![图 6：供电输入参考设计](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/56.png)

图 6：供电输入参考设计

备注：建议通过控制电源芯片的使能脚控制模块的电源，当模块工作异常时可以通过控制使能脚重启模块；也可以通过 P 通道的 MOSFET 开关来控制模块电源供应。

## 2.2. 开关机

#### 控制 PWRKEY 引脚的方法是直接使用一个按钮开关。按钮附近需放置一个 TVS 用以 ESD 保护。下图为参考电路：

### 2.2.1 PWRKEY 引脚开机

#### 模块正常开机方式是通过 PWRKEY 引脚来开机。将 PWRKEY 置为低电平，大约 1s 后模块开机成功。

#### 推荐使用开集驱动电路来控制 PWRKEY 引脚。下图为参考电路：

![图 7：开集驱动开机参考电路](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/57.png)

图 7：开集驱动开机参考电路

#### 另一种控制 PWRKEY 引脚的方法是直接使用一个按钮开关。按钮附近需放置一个 TVS用以 ESD 保护。下图为参考电路：

![图 8：按键开机参考电路](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/58.png)

图 8：按键开机参考电路

#### 开机时序图如下图所示：

![图 9：开机时序图](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/59.png)

图 9：开机时序图

备注：在拉低管脚 PWRKEY 之前，保证 VBAT 电压稳定。建议 VBAT 上电到管脚 PWRKEY 拉低之间的时间T1 为 100ms 左右。

### 2.2.2. 关机

#### 模块通过以下的方式可以关机：

##### • 正常关机：控制 PWRKEY 引脚关机

##### • 低压关机：模块检测到 VBAT 低压时，会自动关机。

#### 2.2.2.1. PWRKEY 引脚关机

#### 模块在开机状态下，PWRKEY 管脚拉低一段时间，模块关机。

#### 关机过程中，模块需要注销GSM网络，注销时间与当前网络状态有关，经测定用时约2s~12s，因此建议延长 12s 后再对模块进行断电或重启的操作，以确保在完全关机之前让软件保存好重要数据。

#### 模块内核程序检测 PWRKEY 拉低后，通过回调 API 函数会使模块关机。

#### 关机之后，模块进入关机模式。关机时序见下图。

![图 10：关机时序](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/60.png)

图 10：关机时序

备注：要实现关机功能，PWRKEY 引脚不能一直拉低。否则，关机后模块又上电重新开机了, 相当于模块重启。 

#### 2.2.2.2 低压自动关机

#### 低压将引起模块关机。模块会持续监测 VBAT 端的电压。如果出现以下几种情况，模块会通过回调函数提示给应用程序。

##### l VBAT电压低于3.5V：低压告警。

##### l VBAT电压低于3.3V：低压关机

### 2.2.3 推荐的系统开关机电路 

#### 为了确保OpenCPU系统的稳定性，建议使用一个低功耗的微处理器监控TinyCon3350-M26模块的运行状态。该微处理器应具有若干GPIO、一路可选的AD输入接口。系统架构框图如下图所示。该系统架构具有以下两个优点：

##### l 当AD检测到VBAT电压过低或过高时，微处理器通过控制PWRKEY关闭模块，并且通过控制PMOS 管切断VBAT。

##### l TinyCon3350-M26模块正常工作时，定时输出脉冲给微处理器。如果微处理器超时未检测到脉冲输入， 微处理器将首先切断VBAT，然后再给模块重新上电。

![图 11：推荐的系统开关机系统框图](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/61.png)

图 11：推荐的系统开关机系统框图

#### 除此之外，看门狗器件也能被用于控制模块的电源。要求看门狗芯片的看门狗超时时间至少1.6s，如TI的TPS3823-33DBVR芯片。模块的一个GPIO口连接到看门狗的输入脚用来对看门狗喂狗。如果定时喂狗时间过了，看门狗将关闭模块电源。关于看门狗电路的示意图显示如下。

![图 12：看门狗电路](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/62.png)

图 12：看门狗电路

备注：如果模块的电源由看门狗控制且模块仅仅由 VRTC 供电，当电源 VBAT 切断时，实时时钟误差大约为 1 天 5 分钟。

## 2.3. RTC

#### M26 模块支持 RTC 实时时钟功能，RTC 的供电设计可以参考如下的三种方式：

##### •使用 VBAT 作为 RTC 的供电电源；

当模块关机后且 VBAT 没有断电的情况下，实时时钟 RTC 还是有效的，因为此时 VBAT 仍旧在给模块的 RTC 域供电。在这种模式下，VRTC 管脚可以悬空处理。

##### •使用 VRTC 作为 RTC 的供电电源；

如果 VBAT 在模块关机后被移除，需要在 VRTC 管脚接入纽扣电池或者超级电容等类似的备份电源用以维持实时时钟 RTC。

##### •同时使用 VBAT 和 VRTC 作为 RTC 的供电电源；

由于仅给 VRTC 管脚供电来维持 RTC 时间，会产生大约每天 5 分钟的误差，因此当 RTC 功能需要时，建议给 VBAT 和 VRTC 管脚同时供电。推荐的 RTC 供电设计电路如下图所示：

![图 13: 使用不可充电电池给 VRTC 管脚供电](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/63.png)

图 13: 使用不可充电电池给 VRTC 管脚供电

![图 14: 使用可充电电池给 VRTC 管脚供电](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/64.png)

图 14: 使用可充电电池给 VRTC 管脚供电

![图 15: 使用超级电容给 VRTC 管脚供电](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/65.png)

图 15: 使用超级电容给 VRTC 管脚供电

## 2.4. 串口

#### 主串口支持固定波特率和自适应波特率。自适应波特率支持范围 4800bps 到 115200bps。

#### 主串口：

##### • TXD：发送数据到 DTE 设备的 RXD 端。

##### • RXD：从 DTE 设备 TXD 端接收数据。

表 5：串口逻辑电平

![表 5：串口逻辑电平](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/5.png)

表 6：串口管脚定义

![表 6：串口管脚定义](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/6.png)

### 2.4.1. 主串口

#### 2.4.1.1. 主串口特点

##### • 包括数据线 TXD 和 RXD。

##### • 8 个数据位，无奇偶校验，一个停止位。

##### • 硬件流控默认关闭，软件流控暂不支持。

##### • GPRS 数传等。串口支持软件多路复用功能，软件升级。

##### • 支持波特率：300，600，1200，2400，4800，9600，14400，19200，28800，38400，57600，115200。

##### • 模块默认设置为自适应波特率。自适应波特率支持以下波特率：4800， 9600， 19200， 38400， 57600， 115200bps。

#### 2.4.1.2. 串口参考设计

![图 16：串口三线制连接方式示意图](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/66.png)

图 16：串口三线制连接方式示意图

#### 2.4.1.3. 软件升级

#### 主串口 TXD，RXD 可以用来升级软件。在软件升级过程中，PWRKEY 管脚必须拉低。软件升级可以参考下图连线： 

![图 17：软件升级连线图](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/67.png)

图 17：软件升级连线图

### 2.4.2. 调试串口

#### 调试串口：

##### • 数据线：DBG_TXD 和 DBG_RXD 

##### • 调试口仅用作软件调试，波特率配置为 460800bps 

##### • 串口会自动向外面输出 log 信息

#### 调试串口连线参考如下方式连接：

![图 18：软件调试连线图](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/68.png)

图 18：软件调试连线图

### 2.4.3. 串口应用

#### 3.3V 电平情况下的电平匹配电路参考设计如下。如果 MCU/ARM 是 3V 的电平，则根据分压原则，将电阻 5K6 要改为 10K。

![图 19：3.3V 电平转换电路](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/69.png)

图 19：3.3V 电平转换电路

备注：强烈建议当主机系统电平是 3V 或者 3.3V 时，在模块和主机的串口连接上加入分压电路以使电平匹配。对于更高的电压系统之间的电平匹配，需要在模块和主机之间增加电平转换芯片，要进一步了解信息，请参考文档 [14]。

#### 下图是标准 RS-232 接口和模块之间的连接示意图。客户需要确保电平转换芯片连接到模块的 IO 电压是 2.8V。

![图 20：RS232 电平转换电路](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/70.png)

图 20：RS232 电平转换电

## 2.5 SIM 卡接口

#### SIM 卡接口支持 GSM Phase1 规范的功能，同时也支持 GSM Phase 2+规范的功能和 FAST 64 kbps SIM 卡（用于 SIM 应用工具包）。

#### SIM 卡通过模块内部的电源供电，支持 1.8V 和 3.0V 供电。

表 7：SIM 卡接口管脚定义

![表 7：SIM 卡接口管脚定义](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/7.png)

#### 下图是使用 6-pin 的 SIM 卡座接口参考电路：

图 21：6-pin SIM 卡座参考电路图

![图 21：6-pin SIM 卡座参考电路图](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/78.png)

#### 在 SIM 卡接口的电路设计中，为了确保 SIM 卡的良好的性能和不被损坏，在电路设计中建议遵循以下设计原则：

##### • SIM卡座靠近模块摆放，尽量保证SIM卡信号线布线不超过200mm。

##### • SIM卡信号线布线远离RF线和VBAT电源线。

##### • SIM卡座的地与模块的SIM_GND布线要短而粗。SIM_VDD与SIM_GND布线保证不小于0.5mm，且在SIM_VDD与GND之间的旁路电容不超过1uF，并且靠近SIM卡座摆放。

##### • 为了防止SIM_CLK信号与SIM_DATA信号相互串扰，两者布线不能太靠近，并且在两条走线之间增加地屏蔽。此外，SIM_RST信号也需要地保护。

##### • 为了确保良好的ESD性能，建议SIM卡的引脚增加TVS管。选择的TVS管寄生电容不大于50pF；ESD保护器件尽量靠近SIM卡卡座摆放，SIM卡信号走线应先从SIM卡卡座连到ESD保护器件再从ESD保护器件连到模块。在模块和SIM卡之间需要串联22欧姆的电阻用以抑制杂散EMI，增强ESD防护。SIM卡的外围器件应尽量靠近SIM卡座摆放。

##### • 在SIM_DATA，SIM_VDD，SIM_CLK和SIM_RST线上并联33pF电容用于滤除的射频干扰。

# 3 天线接口

#### M26 包含两个天线接口，GSM 天线和 BT 天线接口。管脚 35 是 GSM 天线输入端，管脚 26 是 BT 天线输入端。GSM 和 BT 接口是具有 50Ω 特性阻抗的接口。

## 3.1. GSM 天线接口

#### 模块提供了 GSM 天线接口引脚 RF_ANT。

表 8：GSM 天线管脚定义

![表 8：GSM 天线管脚定义](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/8.png)

### 3.1.1. 参考设计

#### 对于天线接口的外围电路设计，为了能够更好地调节射频性能，建议预留匹配电路。天线连接参考电路如下图所示。其中 C1，C2 缺省不贴，只贴 0 欧姆 R1 电阻。

![图 22：射频参考电路](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/71.png)

图 22：射频参考电路

#### M26提供了一个RF焊盘接口供连接外部天线。从该焊盘到天线连接器间射频走线的特性阻抗要控制在50欧姆左右，且走线尽可能短。为了获得更好的射频性能，RF接口两侧各有两个接地焊盘。

#### 为了最小化 RF 走线或者 RF 线缆损耗，必须谨慎设计。建议线损和天线要满足下述两个表格的要求。

表 9：线损要求

![表 9：线损要求](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/9.png)

表 10：天线要求

![表 10：天线要求](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/10.png)

### 3.1.2. RF 输出功率

表 11：RF 传导功率

![表 11：RF 传导功率](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/11.png)

### 3.1.3. RF 接收灵敏度

表 12：RF 传导灵敏度

![表 12：RF 传导灵敏度](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/12.png)

### 3.1.4. 工作频率

表 13：模块工作频率

![表 13：模块工作频率](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/13.png)

### 3.1.5. 推荐 RF 焊接方式

#### 如果连接外置天线的射频连接器是通过焊接方式与模块相连的，请务必注意连接线的剥线方式及焊接方法，尤其是地要焊接充分，请按照下图中正确的焊接方式进行操作，以避免因焊接不良引起线损增大。

![图 23：天线连接器焊接形式](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/72.png)

图 23：天线连接器焊接形式

# 4 电气性能，可靠性

## 4.1. 绝对最大值

#### 下表所示是模块数字、模拟管脚的电源供电电压电流最大耐受值。

表 14：绝对最大值

![表 14：绝对最大值](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/14.png)

## 4.2. 工作温度

#### 下表所示为模块工作温度。

表 15：工作温度

![表 15：工作温度](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/15.png)

备注：当模块工作在此温度范围时，工作性能可能会偏离 GSM 规范，例如频率误差或者相位误差会增大，但是不会掉线。

## 4.3. 电源额定值

表 16：模块电源额定值

![表 16：模块电源额定值](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/18.png)

备注

1. 功率等级 5 

2. 功率等级 0 

3. 在 EGSM 900 频段下的 4 发 1 收功率有下降，故其耗流比 3 发 2 收要小。

## 4.4. 耗流

#### 耗流值如下表所示。

表 17：模块耗流

![表 17：模块耗流](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/16.png)

备注：GPRS CLASS 12为默认设置。模块可以通过AT+QGPCLASS设置GPRS从CLASS1到CLASS12。设置较低的CLASS等级，模块的电源供电电流会降低要求。

## 4.5. 静电防护

#### 在模块应用中，由于人体静电，微电子间带电摩擦等产生的静电，通过各种途径放电给模块，可能会对模块造成一定的损坏，所以ESD保护必须要重视，不管是在研发、生产组装、测试等过程，尤其在产品设计中，都应采取防ESD保护措施。如电路设计在接口处或易受ESD点增加ESD保护，生产中佩戴防静电手套等。

#### 下表为模块重点PIN脚的ESD耐受电压情况。

表 18：ESD 性能参数（温度：25℃, 湿度：45%）

![表 18：ESD 性能参数（温度：25℃, 湿度：45%）](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/17.png)

# 5 机械尺寸

#### 该章节描述了模块的机械尺寸。

## 5.1. 模块机械尺寸

![图 24：M26 俯视尺寸图（单位：毫米）](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/73.png)

图 24：M26 俯视尺寸图（单位：毫米）

![图 25：M26 底视尺寸图（单位：毫米）](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/74.png)

图 25：M26 底视尺寸图（单位：毫米）

## 5.2. 推荐封装

![图 26：推荐封装（单位：毫米）](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/75.png)

图 26：推荐封装（单位：毫米）

备注：

1. 保证 PCB 板上模块和其他元器件之间距离至少 3mm。

2. 上图两个半径 1.75mm 的圆形为对应模块的 RF 测试点，需要做 KEEPOUT 处理（即在主板上对应位置禁止铺铜和走线）。

## 5.3. 模块俯视图

![图 27：模块俯视图](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/76.png)

图 27：模块俯视图

## 5.4. 模块底视图

![图 28：模块底视图](http://docs.gizwits.com/assets/zh-cn/module_source/TinyCon3350-M26/77.png)

图 28：模块底视图

# I. 附录 - 资源

##### • 锐凌微TinyCon3350-M26须原厂烧写固件

##### • 获取锐凌微TinyCon3350-M26 Gagent日志（即将推出）

##### • [GAgent for 锐凌微 TinyCon3350-M26 04020018](http://gizwits.oss.aliyuncs.com/hardware_resource/GAgent_0GRLWM26_04020018_2017022011.bin)
