

title: GoKit3(S)二次开发-程序详解
---

# 通信协议详解

## 1 协议阅读前需知

**A. SOC版与MCU版的区别：**

由于SoC方案是直接在WiFi模组上进行开发故没有MCU这一概念，无需进行串口协议传输，没有协议组包和协议解析这些步骤，所以**没有串口协议**，重点是“P0数据区”解析这部分。

**B. SOC版与MCU版的联系：**

云端生成的协议文档默认是MCU版的协议文档，其实SOC版完全可复用MCU版的协议，故在这里直接将《xxx-机智云接入串口通讯协议文档》中的MCU理解为SOC（后文同理）。

## 2.“p0 数据区约定”
**“p0 数据区约定”有如下功能：**

1) 模块向SOC发送控制命令时携带p0 命令和命令标志位以及可写数据区

2) SOC主动发送状态时或者回复模块的状态查询时携带p0命令和完整数据区

3) 数据区会自动合并布尔和枚举变量，且有严格的顺序，不可任意改变

**怎么来理解这三个功能呢？将前序中准备的**《XX-机智云接入串口通讯协议文档》**如打开，我们会看到如下命令：**

1）WiFi模组请求设备信息；

2）WiFi模组与设备SOC的心跳；

3）设备SOC通知WiFi模组进入配置模式；

4）设备SOC重置WiFi模组；

5）WiFi模组向设备SOC通知WiFi模组工作状态的变化；

6）WiFi模组请求重启SOC；

7）非法消息通知；

8）WiFi模组读取设备的当前状态；

9）设备SOC向WiFi模组主动上报当前状态；

10）WiFi模组控制设备；
（之后非重点省略）

大部分的基础通信协议代码机智云已经为大家实现了，所以我们特别关注**8、9、10**三条命令即可。

我们先关注**命令10**如下：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image3.png)

注：SOC版代码无需关注P0协议区以外的协议内容，后文同理。

对应上面“p0 数据区约定”中的**功能1**）“模块向SOC发送控制命令时携带**p0 命令**和**命令标志位**以及**可写数据区**”，可知：“action(1B)”代表p0 命令、“attr_flags(1B）”代表命令标志位、“attr_vals(6B)”代表可写数据区。

那程序中如何识别呢，往下看协议的注解：

1).命令标志位**(attr_flags)**表示相关的数据值是否为有效值，相关的标志位为“1”表示值有效，为“0”表示值无效，从右到左的标志位依次为：


| 标志位     |     功能        | 
| :-------- | :-------        | 
| bit0	    | 设置LED_OnOff   |  
| bit1      | 设置LED_Color   | 
| bit2      | 设置LED_R       |  
| bit3	    | 设置LED_G       | 
| bit4	    | 设置LED_B       |  
| bit5	    | 设置Motor_Speed |  

这里可以清楚的看到**attr_flags**占1B字节，其中bit0代表：设置LED_OnOff......bit5：设置Motor_Speed，那么对于我们的SOC接收到WIFI发来的控制命令后，我们通过识别**attr_flags**的每一位即可对应出需要控制的设备。

2).设置数据值**(attr_vals(6B))** 即可写数据区，定义如下：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image4.png)

这里可以清楚的看到，只有相关的设置标志位**（attr_flags）**为1时，数据值才是有效的，需要特别注意的是“p0 数据区约定”约定第三条，数据区会自动合并布尔和枚举变量，且有严格的顺序，不可任意改变。对应上面的“byte0”合并了“bool”和“enum”类型。

## 3 协议分析总结

**“p0 数据区约定”**主要作用是完成有效数据的上传(协议4.8、4.9)与下达(协议4.10)，其中**上传协议**的组成形式为：**action(1B) + dev_status(11B)** ; 下达协议的组成形式为：**action(1B) + attr_flags(1B) + attr_vals(6B)** ; 其中：

| p0 数据区内容     | 含义 | 
| :-------- | :-------- |
| action | 表示”p0 命令”的传输方向，即：WiFi -> MCU 或 MCU ->Wifi | 
| dev_status | 表示上报的所有数据点的设备状态 | 
| attr_flags | 表示有效的控制型数据点 | 
| attr_vals| 表示有效控制数据点的数据值 | 

至此**“p0 数据区约定”**的解析到此结束，之后我们还会分析SOC的程序实现。

# 程序详解

## 1 代码目录介绍

### 1.1 一级目录

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image5.png)

说明：

| 文件夹    |     说明 |
| :-------- | :--------|
| app	   |   用户目录**（开发者主要关注）** |
| bin	   |   固件生成目录 |
|include	   |   模组驱动相关库|
| ld	    |   动态链接库 |
| lib	   |   工程文件 |
| tools	    |   相关工具 |
| readme.txt	   |   Gokit3S文档介绍 |
| user guide V0.3.pdf	    |   Gokit3S二次开发导读 |


## 1.2 代码文件说明

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image6.png)


主要文件说明：

| 文件       | 说明       |
| :-------- | :--------| 
| libgagent.a | 该文件为机智云设备接入协议库文件,文件位于 lib 目录下 | 
| gagent_external.h	| 该文件为 libgagent.a 对应头文件,两个文件配合使用 | 
|gizwits_product.c	| 该文件为平台相关处理文件，存放事件处理API接口函数，即 gizwitsEventProcess() | 
|gizwits_product.h 	| 该文件为 gizwits_product.c 的头文件，存放产品相关宏定义如： HARDWARE_VERSION 、SOFTWARE_VERSION | 
|gizwits_protocol.c	 | 该文件为协议实现文件，存放 SDK API 接口函数 | 
|gizwits_protocol.h	 | 该文件为 gizwits_protocol.c 对应头文件，协议相关宏定义以及 API 接口声明均在此文件中。 | 


### 1.3 协议API介绍

|API 名称| 	API 功能 | 
| :-------- | :--------| 
|void gizwitsInit(void)| gizwits协议初始化接口。用户调用该接口可以完成Gizwits协议相关初始化（包括协议相关定时器、串口的初始化）。|
| void gizwitsSetMode(uint8_t mode) | 参数mode[in]：仅支持0,1和2,其他数据无效。参数为0，恢复模组出厂配置接口，调用会清空所有配置参数，恢复到出厂默认配置。参数为1时配置模组进入SoftAp模式；参数为2配置模组进入AirLink模式。|
| void gizwitsHandle(dataPoint_t *dataPoint)| 参数dataPoint[in]:用户设备数据点。该函数中完成了数据上报等相关操作。 |
|int8_t gizwitsEventProcess (eventInfo_t *info, uint8_t *data, uint32_t len) | 参数info[in]:事件队列 参数data[in]:数据 参数len [in]:数据长度 用户数据处理函数,包括wifi状态更新事件和控制事件。 a)Wifi状态更新事件 WIFI_开头的事件为wifi状态更新事件，data参数仅在WIFI_RSSI有效，data值为RSSI值,数据类型为uint8_t，取值范围0~7。 b)控制事件 与数据点相关,本版本代码会打印相关事件信息，相关数值也一并打印输出，用户只需要做命令的具体执行即可。|


## 2 程序实现原理

**协议实现机制：** 

协议解析后，将P0数据区的有效数据点生成对应的数据点事件，再按事件处理数据点。

**数据点转换事件的说明**： 

根据协议P0数据区的attr_flags位判断出有效数据点，并将其转化成对应的数据点事件，然后在事件处理函数中(gizEventProcess)完成事件的处理。 

## 3 程序初始化说明

### 3.1 数据协议结构体的定义

结构体**dataPoint_t**  ，代码位置: **gokit_mcu_stm32_xxx\Gizwits\gizwits_protocol.h** 

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image7.png)


说明：结构体**dataPoint_t**，作用是存储用户区的设备状态信息，用户根据云端定义的数据点向其对应的数据位赋值后便不需关心数据的转换，其数据位分别对应**“p0 数据区约定”**中的**“4.9 设备MCU向WiFi模组主动上报当前状态”**中的：dev_status(11B) 位：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image8.png)

**attrFlags_t、attrVals_t** ，代码位置: **gokit_mcu_stm32_xxx\Gizwits\gizwits_protocol.h** 

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image9.png)

结构体attrFlags_t、attrVals_t分别对应**“p0 数据区约定”**中的**“4.10 WiFi模组控制设备”**中的：attr_flags(1B) + attr_vals(6B)位：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image10.png)


**devStatus_t**，代码位置: **gokit_mcu_stm32_xxx\Gizwits\gizwits_protocol.h** 

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image11.png)


结构体**devStatus_t**对应“**p0 数据区约定”**中的**“4.9 设备MCU向WiFi模组主动上报当前状态”**中的：dev_status(11B) 位：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/12.png)

**特别说明：**

A. 数据结构说明

dataPoint_t 为应用层数据结构，开发者需要了解并会使用（具体使用方式请查看：**“2.7.1 只读型数据的获取”**一节）。

**attrFlags_t、attrVals_t、devStatus_t**为通信层数据结构，开发者需要结合通讯协议进行理解。

B. 位段举例说明：

**uint8_t motor_switch:1;** 是一种位段的使用方式。因为 uint8_t型数据占用 8bit（8位）的空间，协议中**motor_switch占用**字段bit0（第一位）所以uint8_t motor_switch:1表示使用**1位**的空间。

**uint8_t reserve:7;** 因为程序中申请内存时的最小单位是byte(字节)，而这里我们是按bit(位，8bit = 1byte)进行了使用，故需补齐不足1byte的剩余bit(使用n bit后需补齐剩余的8-n bit)。

**注：位段不能跨字节操作，否则会造成数据读写错误。**

### 3.2 程序主函数

位置：**gokit-soc-esp8266\app\user\user_main.c**中user_init() 函数：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image12.png)


说明：该函数作为整个系统的程序入口初始化了Gagent模块和Gizwits协议模块这两个主要的部分，其中跟开发者有关的是函数是**gizwitsInit()**、**userTimerFunc()**、**gizwitsUserTask()**，相关说明：

| 函数     |     说明 |
| :-------- | :--------|
| gizwitsInit()   | 协议解析处理模块初始化函数（协议API）|
| userTimerFunc()   |定时器回调函数（100ms定时周期，与时间相关的开发逻辑可以在这里实现）|
| gizwitsUserTask()	 |用户事件回调函数，用户可在该函数中完成相应任务的处理|


### 3.3 用户程序初始化
位置：**user_main.c**中 **“//user_init 相关程序”**

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image13.png)


这部分完成了RGB LED、按键、电机、温湿度、红外传感器的硬件驱动调用，对应的驱动程序实现都在**gokit-soc-esp8266\app\driver**下。

其中完成了定时器初始化（详情查看2.3.4节）：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image14.png)


以及系统任务初始化（详情查看2.3.5节）：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image15.png)


### 3.4 定时器使用

代码位置：app\user\user_main.c 中的user_init()函数

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/16.png)

相关宏定义：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image16.png)

API说明：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image17.png)

回调函数说明：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image18.png)

在userTimerFunc() 中完成了周期100ms的定时执行，开发者可以在user_handle()中实现定时读取外设数据的操作，将读取到的数据赋值到用户区的全局结构体变量：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image19.png)


### 3.5 系统任务的使用

代码位置：**app\user\user_main.c** 中的**user_init()**函数

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/20.png)

API使用说明：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image20.png)

回调函数说明：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image21.png)

开发者可以自定义系统任务(**system_os_post**中的消息类型)，然后在系统任务回调函数中(gizwitsUserTask)添加对应的任务处理(即switch中对应的消息类型)。

需要注意的是：任务优先级不可随意修改（共有三个优先级，提供给开发者的是**优先级0**）：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image22.png)


## 4 配置模式说明

开发者只有先调用“WiFi配置接口”API才能使WiFi模组进入相应的配置模式，进而完成联网、云端通信的等功能。

**“WiFi配置接口”API 位置：gokit_mcu_stm32_xxx\Gizwits\gizwits_protocol.h**

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image23.png)


在本示例工程中是通过**按键触**发进入相应的配置模式，程序中触发逻辑位置：**gokit_mcu_stm32_xxx\User\main.c** 

A.进入Soft AP 模式：key2按键短按。

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image24.png)

B.进入AirLink 模式：key2按键长按。

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image25.png)

C.模组复位：key1按键长。

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image26.png)

**注：开发者可以按照自己的需求来实现配置模式。**


## 5 协议处理函数的实现

位置**：Gizwits\gizwits_protocol.c中gizIssuedProcess()** 函数：

该函数被Gagent模块调用，处理来自云端或APP端的相关p0数据协议。

以下是该协议处理函数的详细介绍：

● 首先是一些局部变量的初始化，比较重要的是**“gizwitsIssued_t *gizIssuedData”**它的作用是保存解析出来的协议包头：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image27.png)

协议格式对应协议“4.10 WiFi模组控制设备”中“P0协议区”的标志位"attr_flags" + 数据值"attr_vals"

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image28.png)

● 然后是各协议命令的处理流程：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image29.png)

由于SOC版相对MCU版去掉了串口协议等概念，故开发者在只需了解《xxx机智云接入串口通信协议文档》中的8、10三条指令：



| 8）WiFi模组读取设备的当前状态； 10）WiFi模组控制设备；    |  
| :-------- |  


● 下面以以协议4.8的处理为例：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image30.png)

其“action”值 为“0x02”，对应程序中的的case为**“ACTION_READ_DEV_STATUS”**

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image31.png)

之后完成了上报数据的数据类型转化（转化后的数据存储在**gizwitsReport_t**中的devStatus数据位中）：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image32.png)

最后将待上报的数据以指针拷贝的方式进行输出：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image33.png)

● 同理其他协议action值对应的宏定义的位置在Gizwits\gizwits_protocol.h中:

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image34.png)

以上便是p0协议处理函数的详解。

## 6 控制型协议的实现

与控制型协议相关的函数调用关系如下：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image35.png)

函数调用说明：

| 函数	     |     说明 |
| :-------- | :--------|
| giziIssuedProcess    |  该函数被gagent调用，接收来自云端或app端下发的相关协议数据 | 
| ACTION_CONTROL_DEVICE    | 进行“控制型协议”的相关处理 | 
| gizDataPoint2Event    |根据协议生成“控制型事件”，并完成相应数据类型的转换 |
| gizwitsEventProcess    | 根据已生成的“控制型事件”进行相应事件处理（即调用相应的驱动函数）|
	

### 6.1 控制型事件的生成
相关代码位置：
**app\Gizwits\gizwits_protocol.c** 中 gizDataPoint2Event() 函数：

功能说明：
在该函数中完成了写类型外设事件的生成，以“红灯开关数据点”为例：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image36.png)


这里对应协议**“4.10 WiFi模组控制设备”**：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/37.png)

前面我们已经知道程序里的 **“issuedData->attr_flags”**就对应《微信宠物屋-机智云接入串口通信协议文档.pdf》中的**“4.10 WiFi模组控制设备”**中的**attr_flags(1B)**，作用是用来控制所选位的设备，在文档中我们可以看到attr_flags的第0位是用来选择控制LED灯开关的，即只要设置了第0位为1就表示要控制LED等开关了，代码中对应如下：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image37.png)

接下来便是控制型事件的生成：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image38.png)


以及完成数据的解压（详情请查看**“2.8.2 数据解压与压缩处理”**一节）：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image39.png)


注意：枚举（如**EVENT_LED_ONOFF**）用来直观的表示事件的含义，用户自行添加、更改（位置：**app\Gizwits\gizwits_protocol.h**）
![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image40.png)


### 6.2 控制型事件处理

代码位置:  
**app\Gizwits\gizwits_product.c** 中 **gizwitsEventProcess()** 函数：

功能说明：

完成写类型外设事件的处理。

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image41.png)


这段程序功能的控制LED灯的开关：LED开关控制位 **“issued->attr_vals.led_onoff”** 的值若是LED_On（0x01）表示灯开，为LED_Off（0x01）表示灯关。这对应《微信宠物屋-机智云接入串口通信协议文档.pdf》中的**“4.10 WiFi模组控制设备”**中的attr_vals(6B)，即“数据位”，如下所示：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image42.png)


第0位用来控制红灯亮灭，对应到在云端定义的数据点含义为：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image43.png)    = 0x00 = 红灯灭

 ![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image44.png)   = 0x01 = 红灯亮

下面的程序基本和上面一样，只要大家看懂了《xxx-机智云接入串口通信协议文档.pdf》中的**“4.10 WiFi模组控制设备”**中的attr_flags(1B) 、attr_vals(6B)这两位就能编写控制型协议的程序了。

### 6.3 可写型数据类型转换

接收到来自云端的数据后，由于原始数据经过特殊处理，所以要在**gizDataPoint2Event**中进行相应的数据的转换。

转换函数说明：

| 函数 |  说明 | 
| :-------- | :-------|
|gizDecompressionValue| 完成传输数据的压缩处理，详情查看“2.8.2 数据解压与压缩处理”一节。| 
| gizX2Y |将用户区数据转化为传输数据，详情查看“2.8.1 数据点类型转换”一节。|  

程序中对应：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image45.png)

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image46.png)

特别说明：

网络字节序转化

数据点为uint16、uint32型的数据要考虑**网络字节序转化**（uint16即使用**exchangeBytes()**函数），以电机控制为例：
![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image47.png)


## 7 上报型协议的实现

与上报型协议相关的函数调用关系如下：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image48.png)

函数调用说明：

| 函数	   |   说明 |
| :-------- |:--------|
| **userTimerFunc**	  |  获取用户区的上报型数据 |
| **gizwitsHandle**	 |   用户调用该接口可以完成设备数据的变化上报 |
| **gizCheckReport**	 |  判断是否上报当前状态的数据 |
| **gizDataPoints2ReportData**	 |  完成用户区数据到上报型数据的转换 |
| **gagentUploadData**	 |   将上报数据发送给WiFi模块|


### 7.1 只读型数据的获取

相关代码:  
**app\user\user_main.c** 中 userTimerFunc() 函数：

使用说明：

该函数中完成了用户区上报型数据的获取。**用户只需将读到的数据赋值到用户区当前设备状态结构体**即可：
![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image49.png)


### 7.2 上报状态判断

为了让API接口更简化，处理更简单，机智云把更多的判断放到协议模块来处理，达到了开发者只要把状态更新到协议处理模块，不需要关心何时上报，由协议处理模块自动完处理的目的。

相关代码:  

**Gizwits\gizwits_protocol.c** 中 **gizCheckReport()** 函数：

功能说明：

根据协议判断是否上报当前状态的数据，判断逻辑如下：

1. 控制型数据发生状态变化，立刻主动上报当前状态

2. 用户触发或环境变化所产生的, 其发送的频率不能快于6秒每次

协议中说明如下：(“4.9 设备MCU向WiFi模组主动上报当前状态”)

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image50.png)

以“逻辑1：控制型数据主动上报当前状态”为例：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image51.png)

以“逻辑2：控制型数据主动上报当前状态”为例：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image52.png)

### 7.3 只读型数据类型转换

获得到用户区的原始数据后，在传输到云端前要进行相应的数据转换，所以要在**gizDataPoints2ReportData**中完成相应的数据的转换。

转换函数说明：

| 函数 |   说明 |
| :-------- | :--------|
| gizDataPoints2ReportData   |完成传输数据的压缩处理，详情查看“2.8.2 数据解压与压缩处理”一节。|
|gizY2X | 将用户区数据转化为传输数据，详情查看“2.8.1 数据点类型转换”一节。 |

	

## 8 机智云协议数据处理

### 8.1 数据点类型转换

机智云为使设备功能定义更加简单直接，使用户输入的数值转换成设备能够识别的uint类型，这套算法的核心公式是：y=kx+m （**y：显示值；x：传输值；k：分辨率；m：增量**）

以微信宠物屋的温湿度传感器温度检测为例： 

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image53.png)


取值范围：-13（Ymin） ~ 187（Ymax），分辨率：1，增量：-13 ；

其分辨率、偏移量作为宏定义定义在app\Gizwits\gizwits_product.h中：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image54.png)

根据公式：y=kx＋m，k = 1 ; m = -13

实际传输的值：x = (y - m) / k

转换函数在程序中的说明：

A.X2Y的转换：
![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image55.png)


B. Y2X的转换：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image56.png)

功能定义更加

### 8.2 数据解压与压缩处理

设备端与自云端的数据交互过程中，一些特殊类型（bool和enum类型）的数据点原始数据只有被特殊处理后才可被云端解析，所以设备端在接收云端数据时要进行数据的解压处理；在向云端发送数据时进行数据的**压缩处理**。

机智云已封装出了相应的处理接口：

| 处理名称	 |  接口名称|
| :-------- | :--------|
| bool和enum类型数据点数据解压	   |   gizDecompressionValue |
| bool和enum类型数据点数据压缩	   |  gizCompressValue|

以《微信宠物屋》的RGB LED控制为例，云端定义如下：

 ![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/57.png)

对应文档中数据存储格式如下：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image57.png)

字节序与bit序对应代码中宏定义如下：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image58.png)

对应的数据点在接收解压时处理如下(位于gizDataPoint2Event函数中)：位于

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image59.png)

对应的数据点在发送压缩时处理如下(位于gizDataPoints2ReportData函数中)：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image60.png)

# 相关支持

## 1) 如果您是开发者

GoKit是面向智能硬件开发者限量免费开放，注册我们的论坛或关注我们的官方微信均可发起申请即可。

开发者论坛： http://club.gizwits.com/forum.php

文档中心：http://docs.gizwits.com/hc/

## 2) 如果您是团体

GizWits针对团体有很多支持计划，您可以和GizWtis联系，快速得到GoKit以及技术支持；

网站地址：http://www.gizwits.com/about-us

官方二维码：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/Source/image61.png)

