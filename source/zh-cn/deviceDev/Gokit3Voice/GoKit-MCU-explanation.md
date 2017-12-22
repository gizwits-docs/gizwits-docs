title: GoKit-MCU程序详解
---

**[查看旧版MCU_程序详解](http://docs.gizwits.com/zh-cn/deviceDev/Gokit3Voice/GoKit3V程序详解.html)**

# 通信协议详解

## 1 协议命令格式

我们首先了解具体**通讯协议的约定**，可以看到协议格式为：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image3.png)

说明：

1) 包头(header)固定为0xFFFF；

2) 长度(len)是指从cmd 开始到整个数据包结束所占用的字节数；

3) 命令字（cmd）表示具体的命令含义，详见协议举例；

4) 消息序号(sn)由发送方给出,接收方响应命令时需把消息序号返回给发送方；

5) 标志位（flag），本产品填写默认0；

6) payload（p0数据区），详细参见p0 数据区约定；

7) 检验和(checksum)的计算方式为从len～DATA，按字节求和；

8) 所有发送的命令都带有确认,如在200 毫秒内没有收到接收方的响应,发送方；应重发,最多重发3 次；

9) 多于一个字节的整型数字以大端字节序编码（网络字节序）；

10) 数字均用16 进制表示；

## 2 “p0 数据区约定”解析

**“p0 数据区约定”有如下功能：**

1) 模块向MCU发送控制命令时携带p0 命令和命令标志位以及可写数据区

2) MCU主动发送状态时或者回复模块的状态查询时携带p0命令和完整数据区

3) 数据区会自动合并布尔和枚举变量，且有严格的顺序，不可任意改变

怎么来理解这三个功能呢？将前序中准备的**《XX-机智云接入串口通讯协议文档》**如打开，我们会看到如下命令：

1）WiFi模组请求设备信息；

2）WiFi模组与设备MCU的心跳；

3）设备MCU通知WiFi模组进入配置模式；

4）设备MCU重置WiFi模组；

5）WiFi模组向设备MCU通知WiFi模组工作状态的变化；

6）WiFi模组请求重启MCU；

7）非法消息通知；

8）WiFi模组读取设备的当前状态；

9）设备MCU向WiFi模组主动上报当前状态；

10）WiFi模组控制设备；
（之后非重点省略）

**“p0 数据区约定”**主要作用是完成有效数据的上传(协议4.8、4.9)与下达(协议4.10)，其中上传协议的组成形式为：**action(1B) + dev_status(11B)** ; 下达协议的组成形式为：**action(1B) + attr_flags(1B) + attr_vals(6B)** ; 其中：

| p0 数据区内容   | 含义                                       |
| :--------- | :--------------------------------------- |
| action     | 表示”p0 命令”的传输方向，即：WiFi -> MCU 或 MCU ->Wifi |
| dev_status | 表示上报的所有数据点的设备状态                          |
| attr_flags | 表示有效的控制型数据点                              |
| attr_vals  | 表示有效控制数据点的数据值                            |

需要特别注意的是“p0 数据区约定”约定第三条，数据区会自动合并布尔和枚举变量，且有严格的顺序，不可任意改变。对应上面的“byte0”合并了“bool”和“enum”类型。

至此**“p0 数据区约定”**的解析到此结束，之后我们还会分析MCU的程序实现。


# 程序详解

## 1 代码目录介绍

### 1.1 一级目录说明

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image4.png)

| 文件夹        | 说明          |
| :--------- | :---------- |
| Gizwits    | 协议相关目录      |
| Hal        | 外设驱动库       |
| Lib        | STM32驱动库    |
| Project    | 工程管理文件      |
| User       | 代码入口文件目录    |
| Utils      | 工具函数目录      |
| README.txt | GoKit3(V)文档 |

### 1.2 代码文件说明

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/20170918112608.png)


主要文件说明：

| 文件                 | 说明                                       |
| :----------------- | :--------------------------------------- |
| gizwits_product.c  | 该文件为产品相关处理函数，如 gizEventProcess(),平台相关硬件初始化，如串口、定时器等 |
| gizwits_product.h  | 该文件为 gizwits_product.c 的头文件，存放产品相关宏定义如： HARDWARE_VERSION 、SOFTWARE_VERSION |
| gizwits_protocol.c | 该文件为 SDK API 接口函数定义文件                    |
| gizwits_protocol.h | 该文件为 gizwits_protocol.c 对应头文件，相关 API 的接口声明均在此文件中 |


### 1.3 协议API介绍

| API 名称                                   | API 功能                                   |
| :--------------------------------------- | :--------------------------------------- |
| void gizwitsInit(void)                   | gizwits协议初始化接口。用户调用该接口可以完成Gizwits协议相关初始化（包括协议相关定时器、串口的初始化）。 |
| void gizwitsSetMode(uint8_t mode)        | 参数mode[in]：仅支持0,1和2,其他数据无效。参数为0，恢复模组出厂配置接口，调用会清空所有配置参数，恢复到出厂默认配置。参数为1时配置模组进入SoftAp模式；            	参数为2配置模组进入AirLink模式。 |
| void gizwitsSetMode(uint8_t mode)        | 参数mode[in]：仅支持0,1和2,其他数据无效。参数为0，恢复模组出厂配置接口，调用会清空所有配置参数，恢复到出厂默认配置。参数为1时配置模组进入SoftAp模式；            	参数为2配置模组进入AirLink模式 |
| void gizwitsHandle(dataPoint_t *dataPoint) | 参数dataPoint[in]:用户设备数据点。该函数中完成了相应协议数据的处理即数据上报的等相关操作。 |
| int8_t gizwitsEventProcess (eventInfo_t *info, uint8_t *data, uint32_t len) | 参数info[in]:事件队列;参数data[in]:数据;参数len [in]:数据长度;用户数据处理函数,包括wifi状态更新事件和控制事件。a)Wifi状态更新事件:WIFI_开头的事件为wifi状态更新事件，data参数仅在WIFI_RSSI有效，data值为RSSI值,数据类型为uint8_t，取值范围0~7。b)控制事件:与数据点相关,本版本代码会打印相关事件信息，相关数值也一并打印输出，用户只需要做命令的具体执行即可。 |

## 2 程序实现原理

**协议实现机制：**

协议解析后，将P0数据区的有效数据点生成对应的数据点事件，再按事件处理数据点。

**数据点转换事件的说明：**

根据协议P0数据区的attr_flags位判断出有效数据点，并将其转化成对应的数据点事件，然后在事件处理函数中(gizwitsEventProcess)完成事件的处理。

## 3 程序初始化说明

### 3.1 数据协议结构体的定义

结构体dataPoint_t  ，代码位置: **MCU_STM32xxx_source\Gizwits\gizwits_protocol.h**

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image6.png)


说明：结构体dataPoint_t作用是存储用户区的设备状态信息，用户根据云端定义的数据点向其对应的数据位赋值后便不需关心数据的转换，其数据位对应“p0 数据区约定”中的“4.9 设备MCU向WiFi模组主动上报当前状态”中的：dev_status(11B) 位：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image7.png)


**attrFlags_t、attrVals_t** ，代码位置: **MCU_STM32xxx_source\Gizwits\gizwits_protocol.h**

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image8.png)

结构体**attrFlags_t、attrVals_t**分别对应**“p0 数据区约定”**中的**“4.10 WiFi模组控制设备”**中的：attr_flags(1B) + attr_vals(6B)位：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image9.png)

结构体**devStatus_t**，代码位置: **MCU_STM32xxx_source\Gizwits\gizwits_protocol.h**

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image10.png)

结构体devStatus_t对应**“p0 数据区约定”中**的**“4.9 设备MCU向WiFi模组主动上报当前状态”**中的：dev_status(11B) 位：


![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/10.png)



特别说明：

A. 数据结构说明

dataPoint_t 为应用层数据结构，开发者需要了解并会使用（具体使用方式请查看：**“2.7.1 只读型数据的获取”**一节）。

attrFlags_t、attrVals_t、devStatus_t为通信层数据结构，开发者需要结合通讯协议进行理解。

B. 位段举例说明：

**uint8_t motor_switch:1;** 是一种位段的使用方式。因为 uint8_t型数据占用 8bit（8位）的空间，协议中**motor_switch占用**字段bit0（第一位）所以**uint8_t motor_switch:1**表示使用1位的空间。

uint8_t reserve:7; 因为程序中申请内存时的最小单位是byte(字节)，而这里我们是按bit(位，8bit = 1byte)进行了使用，故需补齐不足1byte的剩余bit(使用n bit后需补齐剩余的8-n bit)。

**注：位段不能跨字节操作，否则会造成数据读写错误。**


### 3.2 程序主函数

位置：MCU_STM32xxx_source\User\main.c中main() 函数：


![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image11.png)


相关说明：

| 函数              | 说明                                       |
| :-------------- | :--------------------------------------- |
| SystemInit()    | 平台相关的硬件初始化（非API，不同的平台名称可能不同）             |
| userInit()      | 用户相关的初始化，如：外设驱动初始化、打印串口初始化（非API，不同的平台名称可能不同） |
| gizwitsInit()   | 平台、协议处理初始化，如：用户定时器初始化、协议通信串口初始化（协议API）   |
| userHandle()    | 用户事件回调函数，用户可以自定义事件在该函数中完成相应的协议处理。（非API，不同的平台名称可能不同） |
| gizwitsHandle() | 协议相关的主函数（协议API）                          |

​

### 3.3 用户程序初始化

接下来看用户初始化相关代码（位置：**gizwits_product.c**中**userInit() 函数**）：


![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image12.png)


这部分完成了RGB LED、电机、温湿度、红外传感器的硬件驱动初始化以及电机初始状态，对应的驱动程序实现都在 **MCU_STM32xxx_source\Hal** 下。

这里主要完成了配置入网的功能，作为开发者可以按照自己的需求来实现这部分代码。
​		
下面是平台协议相关初始化 （位置：**gizwits_protocol.c中gizwitsInit() 函数**）：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image13.png)


其中完成了定时器、串口的初始化（详情查看2.3.4、2.3.5两节），以及一个环形缓冲区的初始化。

最后是一个通信处理模块结构体的变量的初始化，该变量为通信模块的全局变量：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image14.png)


其定义的位置：**Gizwits\gizwits_protocol.c**

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image15.png)


相关结构体内容，详情查看**“2.3.1 数据协议结构体的定义”**一节。

### 3.4 定时器使用

相关代码：

定时器初始化，代码位置：**MCU_STM32xxx_source\Gizwits\gizwits_product.c 中timerInit()函数**
![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image16.png)



注：这里我们定义了周期为1ms的定时器，其定时计算公式为：
![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image17.png)


定时器中断函数，代码位置：**MCU_STM32xxx_source\Gizwits\gizwits_product.c**
![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image18.png)


注：在该中断函数内我们完成了周期为1ms的定时累加计数。

定时器使用说明：
代码位置：**MCU_STM32xxx_source\Gizwits\gizwits_product.h**

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image19.png)


a.这里我们使用定时器TIM3(**#define TIMER TIM3**)；

b.TIM3的中断回调函数为**UTIM3_IRQHandler() (#define TIMER_IRQ_FUN TIM3_IRQHandler);**

特别说明（复用**TIMER2**的方式，修改对应宏即可）：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image20.png)

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image21.png)


### 3.5 串口的使用

相关代码：

串口初始化，位置：**MCU_STM32xxx_source\Gizwits\gizwits_product.c** 中的**uartInit()**
![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image22.png)


串口中断函数，位置：**MCU_STM32xxx_source\Gizwits\gizwits_product.c**
![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image23.png)


串口使用说明：

代码位置：**MCU_STM32xxx_source\Gizwits\gizwits_product.h**

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image24.png)


a.这里我们使用USART2**(#define UART USART2)**，作为数据通信的串口;

b.设置它的波特率为9600**(#define UART_BAUDRATE 9600)**

c.USART2的串口中断回调函数为**USART2_IRQHandler() (#define UART_IRQ_FUN USART2_IRQHandler)**，在该中断函数内我们完成了串口数据的接收。

特别说明（复用USART1的方式，修改对应宏即可）：
![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image25.png)


## 4 配置模式说明

设备需要进入配置模式才能进行联网，并与云端进行通信，在本示例工程中是通过按键触发进入相应的配置模式。

Wifi 配置接口说明：

/**
* @brief WiFi配置接口
* ​

* 用户可以调用该接口使WiFi模组进入相应的配置模式或者复位模组
* ​

* @param[in] mode 配置模式选择：0x0， 模组复位 ;0x01， SoftAp模式 ;0x02， AirLink模式
* ​
* @return 错误命令码
  */
  **·int32_t gizwitsSetMode(uint8_t mode)**

程序中触发逻辑位置：**MCU_STM32xxx_source\User\main.c**

A.进入Soft AP 模式：key2按键短按。
![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image26.png)



B.进入AirLink 模式：key2按键长按。
![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image27.png)



C.模组复位：key1按键长。
![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image28.png)



## 5 协议处理函数的实现

位置：**MCU_STM32xxx_source\Gizwits\gizwits_protocol.c中gizwitsHandle()** 函数：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image29.png)


以下是该协议处理函数的详细介绍：

● 首先是一些局部变量的初始化，比较重要的是：“**protocolHead_t *recvHead = NULL**;”它的作用是保存解析出来的协议包头。

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image30.png)


● 然后是协议的重发机制，它的作用是对发送后的协议数据进行超时判断，超时200ms进行重发，重发上限为三次：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image31.png)


● 接下来程序会从环形缓冲区中抓取一包的数据，例如协议4.9：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image32.png)

程序中对应如下：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image33.png)


● 当我们获得到一整包的数据，就会进入下面的if判断逻辑，进行协议的解析。

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image34.png)


这里保存了接收到的协议包头：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image35.png)


● 然后是各协议命令的处理流程：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image36.png)


其中完成了《机智云 - 设备串口通讯协议》中相关的协议处理，如下：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image37.png)


例如协议4.8：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image38.png)


其“cmd”值 为“0x03”，对应程序中的的case为**“CMD_ISSUED_P0”**

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image39.png)


同理其他协议cmd值对应的宏定义的位置在**Gizwits\gizwits_protocol.h**中:

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image40.png)


其中与P0协议有关的处理都在“**gizProtocolIssuedProcess**”中完成，详情请查看“2.6 控制型协议的实现”、“2.7 上报型协议的实现”两节。

其余协议处理函数功能如下所示：

| 函数                       | 说明                                       |
| :----------------------- | :--------------------------------------- |
| gizProtocolGetDeviceInfo | 完成“协议4.1 WiFi模组请求设备信息”                   |
| gizProtocolIssuedProcess | 完成“协议4.8 WiFi模组读取设备的当前状态”与“协议4.10 WiFi模组控制设备”。当Wifi模组接收来自云端或APP端下发的相关协议数据发送到MCU端，经过协议报文解析后将相关协议数据传入次函数，进行下一步的协议处理。 |
| gizProtocolCommonAck     | 发送通用协议报文数据                               |
| gizProtocolModuleStatus  | 完成“协议4.5 WiFi模组向设备MCU通知WiFi模组工作状态的变化”的处理 |
| gizProtocolWaitAckCheck  | 完成 “协议4.4 设备MCU重置WiFi模组 中 WiFi模组回复”后清除ACK协议报文 |
| gizProtocolReboot        | 完成“协议4.4 设备MCU重置WiFi模组” 的相关操作            |
| gizProtocolErrorCmd      | 完成“协议4.7 非法消息通知” 的处理                     |
| gizwitsEventProcess()    | 执行用户事件回调函数，用户可以自定义事件在该函数中完成相应的协议处理。      |


● 协议判断完成后是一个状态机的判断，用来完成对应协议命令的处理：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image41.png)


例如在P0协议处理函数（**gizProtocolIssuedProcess**）中，当我们完成了控制型协议的解析，会让 issuedFlag = 1，如下：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image42.png)


然后会执行如下的处理，执行**gizwitsEventProcess函数**：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image43.png)


在**gizwitsEventProcess** 中，完成了对应控制型事件的处理，其他状态的issuedFlag 同理。

● 之后是一个数据上报判断机制，主要执行了**gizCheckReport函数**。

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/20170918173602.png)


**gizCheckReport**函数的作用用来判断当前与上次上报数据的一致性，如果符合上报条件便上报，上报条件要符合协议“4.9 设备MCU向WiFi模组主动上报当前状态”中的描述：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image45.png)


符合上报之后会执行数据类型的转化函数**gizDataPoints2ReportData**（详情查看“**2.8 机智云协议数据处理**”一节），以及数据上报函数**gizReportData**。

● 最后一段代码是一个数据定时上报机制：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/20170918173614.png)


对应协议“4.9 设备MCU向WiFi模组主动上报当前状态”中的描述：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image47.png)


至此我们完成了协议处理函数的详解。

## 6 控制型协议的实现

与控制型协议相关的函数调用关系如下：
![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image48.png)



函数调用说明：

| 函数                       | 说明                                       |
| :----------------------- | :--------------------------------------- |
| gizProtocolIssuedProcess | 该函数被gizwitsHandle调用，接收来自云端或app端下发的相关协议数据 |
| ACTION_CONTROL_DEVICE    | 进行“控制型协议”的相关处理                           |
| gizDataPoint2Event       | 根据协议生成“控制型事件”，并完成相应数据类型的转换               |
| gizwitsEventProcess      | 根据已生成的“控制型事件”进行相应事件处理（即调用相应的驱动函数）        |


### 6.1 控制型事件处理

相关代码位置:  

**MCU_STM32xxx_source\Gizwits\gizwits_product.c** 中 **gizwitsEventProcess()** 函数：

功能说明：

完成写类型外设的事件处理。

相应代码：
![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image49.png)


### 6.2 可写型数据类型转换

接收到来自云端的数据后，由于原始数据经过特殊处理，所以要在**gizDataPoint2Event**中进行相应的数据的转换。

转换函数说明：

| 函数                    | 说明                                   |
| :-------------------- | :----------------------------------- |
| gizDecompressionValue | 完成传输数据的压缩处理，详情查看“2.8.2 数据解压与压缩处理”一节。 |
| gizX2Y                | 将用户区数据转化为传输数据，详情查看“2.8.1 数据点类型转换”一节。 |

程序中对应：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image50.png)

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image51.png)



## 7 上报型协议的实现

与上报型协议相关的函数调用关系如下：
![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image52.png)


函数调用说明：

| 函数                       | 说明                     |
| :----------------------- | :--------------------- |
| userHandle               | 获取用户区的上报型数据            |
| gizCheckReport           | 判断是否上报当前状态的数据          |
| gizDataPoints2ReportData | 完成用户区数据到上报型数据的转换       |
| gizReportData            | 将转换后的上报数据通过串口发送给WiFi模块 |


### 7.1 只读型数据的获取

相关代码位置:  

**MCU_STM32xxx_source\Gizwits\gizwits_product.c** 中 **userHandle()** 函数：

使用说明：

该函数中完成了用户区上报型数据的获取。用户只需将读到的数据赋值到**用户区当前设备状态结构体**即可：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image53.png)


注：赋值完的数据是通过**gizwitsHandle** （详情请查看“2.5 协议处理函数的实现”一节中：数据上报判断机制**gizCheckReport**部分）上报云端的，开发者不需要关注变化上报和定时上报。

### 7.2 上报状态判断

为了让API接口更简化，处理更简单，机智云把更多的判断放到协议模块来处理，达到了开发者只要把状态更新到协议处理模块，不需要关心何时上报，由协议处理模块自动完处理的目的。

相关代码:  

**MCU_STM32xxx_source\Gizwits\gizwits_protocol.c** 中 **checkReport()** 函数：

功能说明：

根据协议判断是否上报当前状态的数据，判断逻辑如下：

1. 控制型数据发生状态变化，立刻主动上报当前状态
2. 用户触发或环境变化所产生的, 其发送的频率不能快于6秒每次

协议中说明如下：(“4.9 设备MCU向WiFi模组主动上报当前状态”)



![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image54.png)



以红灯开关为例：
![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image55.png)



注：这部分用户可结合“2.5 协议处理函数的实现”一节中“数据上报判断机制”的内容来理解）。

### 7.3 只读型数据类型转换

获得到用户区的原始数据后，在传输到云端前要进行相应的数据转换，所以要在**gizDataPoints2ReportData**中进行相应的数据的转换。

转换函数说明：

| 函数               | 说明                                   |
| :--------------- | :----------------------------------- |
| gizCompressValue | 完成传输数据的压缩处理，详情查看“2.8.2 数据解压与压缩处理”一节。 |
|
gizY2X	  |   将用户区数据转化为传输数据，详情查看“2.8.1 数据点类型转换”一节。 |


## 8 机智云协议数据处理

### 8.1 数据点类型转换

机智云为使设备功能定义更加简单直接，使用户输入的数值转换成设备能够识别的uint类型，这套算法的核心公式是：y=kx+m （y：显示值；x：传输值；k：分辨率；m：增量）
​
以《微信宠物屋》的温湿度传感器温度数据点为例：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image56.png)


取值范围：-13（Ymin） ~ 187（Ymax），分辨率：1，增量：-13 ；

其分辨率、偏移量作为宏定义定义在**app\Gizwits\gizwits_product.h**中：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image57.png)


根据公式：y=kx＋m，k = 1 ; m = -13

实际传输的值：x = (y - m) / k

转换函数在程序中的说明：
A.X2Y的转换：
![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image58.png)


B. Y2X的转换：
![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image59.png)


### 8.2 数据解压与压缩处理

设备端与自云端的数据交互过程中，一些特殊类型（bool和enum类型）的数据点原始数据只有被特殊处理后才可被云端解析，所以设备端在接收云端数据时要进行数据的**解压处理**；在向云端发送数据时进行数据的**压缩处理**。

机智云已封装出了相应的处理接口：

| 处理名称               | 接口名称                      |
| :----------------- | :------------------------ |
| bool和enum类型数据点数据解压 | **gizDecompressionValue** |
| bool和enum类型数据点数据压缩 | **gizCompressValue**      |

以《微信宠物屋》的RGB LED控制为例，云端定义如下：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image60.png)


对应文档中数据存储格式如下：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image61.png)



字节序与bit序对应代码中宏定义如下：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image62.png)


对应的数据点在接收解压时处理如下(位于**gizDataPoint2Event**函数中)：位于

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image63.png)


对应的数据点在发送压缩时处理如下(位于**gizDataPoints2ReportData**函数中)：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image64.png)



# 相关支持

## 1) 如果您是开发者

GoKit是面向智能硬件开发者限量免费开放，注册我们的论坛或关注我们的官方微信均可发起申请即可。

开发者论坛： http://club.gizwits.com/forum.php

文档中心：http://docs.gizwits.com

## 2) 如果您是团体

GizWits针对团体有很多支持计划，您可以和GizWtis联系，快速得到GoKit以及技术支持；

网站地址：http://www.gizwits.com/about-us

官方二维码：

![Alt text](/assets/zh-cn/deviceDev/Gokit3-MCU/source/image65.png)
