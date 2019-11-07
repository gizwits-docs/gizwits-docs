title: GoKit3 DEV SDK Common版移植说明
---


# 前文需知


## 1.什么是&quot;代码自动生成工具&quot;？


为了降低开发者的开发门槛，缩短开发周期，降低开发资源投入，机智云推出了代码自动生成服务。云端会根据产品定义的数据点生成对应产品的设备端代码。

自动生成的代码实现了机智云通信协议的解析与封包、传感器数据与通信数据的转换逻辑，并封装成了简单的API，且提供了多种平台的实例代码。当设备收到云端或APP端的数据后，程序会将数据转换成对应的事件并通知到应用层，开发者只需要在对应的事件处理逻辑中添加传感器的控制函数，就可以完成产品的开发。

MCU方案默认支持 **STM32F103C8x** 平台，如果是其他MCU芯片，可以将我们生成好的 **通用平台版代码** 移植到符合条件的平台，从而实现机智云所提供的各种功能。

本文将主要说明 **通用平台版** 的移植。

## 2.如何自动生成&quot;通用平台代码&quot;？

在机智云平台定义一个产品后，选择左侧服务中的&quot;MCU开发&quot;，选中硬件方案中的&quot;独立MCU方案&quot;，再选中&quot;硬件平台&quot;中的&quot;其他平台&quot;，最后点击&quot;生成代码包&quot;，等待生成完毕下载即可。

![Alt text](/assets/zh-cn/deviceDev/DevSDK/common/image3.png)


下载完成后解压如下：

 ![Alt text](/assets/zh-cn/deviceDev/DevSDK/common/image4.png)


## 3.通用平台移植需知

开发者在移植前要确保被移植平台的硬件参数满足以下的要求：

A. 平台支持两个串口接口（至少一个），一个负责与wifi模组间的数据收发（必须），一个用于调试信息打印（可复用数据收发串口）。

B.平台支持定时器功能（1ms精确定时）。

C.平台支持至少2K的RAM空间（可调整环形缓冲区大小来解决此问题，但易导致数据协议的处理异常）。

注：环形缓冲区修改位置: **Gizwits\gizwits\_protocol.h**

 ![Alt text](/assets/zh-cn/deviceDev/DevSDK/common/image5.png)


原代码中MAX\_PACKAGE\_LEN = 950，即环形缓冲区所占RAM空间大小为950\*2 = 1900 字节，开发者可以此来调整程序所占RAM空间的大小。


# 通用平台版代码移植说明

## 1.文件介绍

 ![Alt text](/assets/zh-cn/deviceDev/DevSDK/common/20170918122244.png)


重要文件解读:

1. gizwits_product.c
  该文件为产品相关处理函数，如gizwitsEventProcess()。

2. gizwits_product.h
  该文件为gizwits_product.c的头文件，如HARDWARE_VERSION、SOFTWARE_VERSION。

3. gizwits_protocol.c
  该文件为SDK API接口函数定义文件。

4. gizwits_protocol.h
  该文件为gizwits_protocol.c对应头文件，相关API的接口声明均在此文件中。

5. 其他文件
   a) User/main.c
   MCU程序入口函数所在文件，入口函数为main(void)。

## 2.API介绍


**· void gizwitsInit (void)**


gizwits协议初始化接口。

用户调用该接口可以完成Gizwits协议相关初始化（包括协议相关定时器、串口的初始化）。


**· void gizwitsSetMode (uint8_t mode)**


参数mode[in]：仅支持0,1和2,其他数据无效。

参数为0，恢复模组出厂配置接口，调用会清空所有配置参数，恢复到出厂默认配置。

参数为1或2，配置模式切换接口，支持SoftAP和AirLink模式。参数为1时配置模组进入SoftAp模式，参数为2配置模组进入AirLink模式。


**· void gizwitsHandle(dataPoint_t *dataPoint)**


参数dataPoint[in]:用户设备数据点。

该函数中完成了相应协议数据的处理即数据上报的等相关操作。


**· int8_t gizwitsEventProcess(eventInfo_t *info, uint8_t *data, uint32_t len)**


参数info[in]:事件队列

参数data[in]:数据

参数len [in]:数据长度

用户数据处理函数,包括wifi状态更新事件和控制事件。

 a). Wifi状态更新事件

WIFI\_开头的事件为wifi状态更新事件，data参数仅在WIFI\_RSSI有效，data值为RSSI值,数据类型为uint8\_t，取值范围0~7。

 b). 控制事件

与数据点相关,本版本代码会打印相关事件信息，相关数值也一并打印输出，用户只需要做命令的具体执行即可。

## 3.代码结构说明

自动化代码生成工具已经根据用户定义的产品数据点信息，生成了对应的机智云串口协议层代码，用户需要移植代码到自己的工程中，完成设备的接入工作。如图如下：

 ![Alt text](/assets/zh-cn/deviceDev/DevSDK/common/image7.png)


代码绿色部分的协议逻辑和程序主流程已经帮用户实现，图中用黄色字体注标的部分待用户实现并完成代码的移植。用户的移植分以下几步进行：

a.搭建最小平台工程（必要）。

b.实现串口驱动（必要）：包括通信与打印功能。

c.实现定时器驱动（必要）。

d.实现芯片复位函数（可选）。

e.实现应用层逻辑开发（必要）：包括数据上下行、入网配置等。



# 移植步骤介绍

下面我们以 **MSP430平台的移植** 为例来介绍移植步骤。

## 1.搭建最小平台工程（必要）

首先完成目标平台的最小工程搭建，以MSP430为例，我们将通信协议处理的源码文件(Gizwits目录下所有文件)导入到工程中，并将 **User目录** 下的示例 **main.c** 文件整合到工程中的主文件中，如下所示：

```c
/** 用户区当前设备状态结构体*/
dataPoint_t currentDataPoint;

void Sys_Init(void)
{
    //关软件看门狗Stop WDT

    WDTCTL = WDTPW + WDTHOLD;

    //设置时钟

    InitClock();
}

/*************************************************************

** 函数名称: main(void)

** 函数功能: 主函数

*************************************************************/
void main(void)
{
    //System space init

    Sys_Init();

    //Gizwits protocol init

    userInit();

    gizwitsInit();

    while (1)
    {
        userHandle();

        gizwitsHandle((dataPoint_t *)&currentDataPoint);
    }
}
```

## 2.实现串口驱动（必要）

MCU方案需要用户实现一个串口，用于设备MCU与WIFI模组之间数据通信。用户首先需要实现串口接收中断服务函数接口UART_IRQ_FUN（MSP430平台函数接口为：USCI0RX_ISR），该接口调用**gizPutData()**函数实现串口数据的接收并且写入协议层数据缓冲区。

下面以MSP430平台为例，本例使用USCI0与模组通信，串口初始化实现如下：

```c
void Sys_Init(void)
{
	//关软件看门狗Stop WDT

    WDTCTL = WDTPW + WDTHOLD;

	//设置时钟

    InitClock();

	//串口设置-9600bps

    serial_init(9600);

    cio_printf(" Start system \n"; );
}
```

中断服务函数和串口发送报文函数实现如下：

```c
/*******************************************************************

** 函数名称：void USCI0RX_ISR(void)

** 函数功能：Echo back RXed character, confirm TX buffer is ready first

** 入口参数：无

** 出口参数: 无

********************************************************************/

#pragma vector=USCIAB0RX_VECTOR

__interruptvoid USCI0RX_ISR(void)
{
    while (!(IFG2&UCA0TXIFG));   // USCI_A0 TX buffer ready?

    gizPutData((uint8_t *)&UCA0RXBUF,1);

    return;
}

```

另外，用户需要实现串口的发送接口，uartWrite()函数调用该接口实现设备数据的发送。需要特别注意的是 **gizwits\_product.c** 文件中uartWrite()函数是伪函数，用户需根据自己实现的串口发送接口完善**uartWrite()**，请注意相关注释信息，以防出错。实现如下：

```c
/**

* @brief 串口写操作，发送数据到WiFi模组

*

* @param buf      : 数据地址

* @param len       : 数据长度

*

* @return : 正确返回有效数据长度;-1，错误返回

*/

int32_t uartWrite(uint8_t * buf, uint32_t len)
{
    uint32_t i = 0;

    if (NULL == buf)
    {
        return -1;
    }

    for (i = 0; i < len; i++)
    {
        serial_send_blocking(buf[i]);

        //实现串口发送函数,将buf[i]发送到模组

        if (i >= 2 && buf[i] == 0xFF)
        {

            //实现串口发送函数,将0x55发送到模组

            serial_send_blocking(0x55);
        }
    }

    return len;
}
```

注：注意示例中的0x55条件处理，即出现0xFF的数据时后面要加0x55，这个操作一定要保留。

如果用户需要打印日志调试信息，用户需实现GIZWITS_LOG函数，只需修改 **gizwits_protocol.h** 中对应的宏定义即可，如下：

```c
#define GIZWITS_LOG cio_printf  //<运行日志打印
```

## 3.实现定时器驱动（必要）

协议层使用到了一个系统时间，该事件单位为毫秒，所以要求用户实现一个毫秒定时器（必须是1ms精确定时，若不准确，会影响到超时重发、定时上报等处理），并且实现中断服务函数TIMER_IRQ_FUN（MSP430平台函数接口为：Timer_A），该函数调用**gizTimerMs()**实现协议层系统时间的维护。

下面以MSP430平台为例，本例使用Timer\_A实现时间维护，定时器初始化如下：

```c
void Sys_Init(void)
{
    //关软件看门狗Stop WDT

    WDTCTL = WDTPW + WDTHOLD;

    //设置时钟

    InitClock();

    //定时器

    BCSCTL3 |= LFXT1S_2; // Set LFXT1为vol时钟即12kHZ

    CCTL0 |= CCIE;  //设置捕获/比较控制寄存器，CCIE=0x0010，使能捕获比较中断

    CCR0 = 12;  //设置捕获/比较寄存器，初始值为12000，对于ACLK时钟频率为12khz的频率，相当于1s 120相当于1ms

    TA0CTL = TASSEL_1 + TACLR + MC_1; // 设置定时器A控制寄存器，

    //串口设置-9600bps

    serial _init(9600);

    cio_printf("Start system \n");
}
```

中断服务函数实现如下：

```c
#pragma vector=TIMER0_A0_VECTOR//固定的格式

__interruptvoid Timer_A (void) //定时器A的CC0中断处理程序必须是没有返回值的
{
 	gizTimerMs();
}
```

## 4.实现芯片复位（可选）

根据串口协议文档规定，模组可以发送命令复位设备MCU，所以用户需要实现 **gizwits\_product.c** 中的**mcuRestart()**接口即可。下面以MSP430平台为例，实现如下：

```c
/**

* @brief MCU复位函数

* @param none

* @return none

*/

void mcuRestart(void)
{
    ((void (*)(void))0xFFFE)();
}
```

至此便完成了平台的移植，后续的配置入网、上下行操作属于应用逻辑开发。

## 5.应用逻辑开发

### 5.1.数据下行控制

数据点方式将转换成数据点事件，开发者只需要在 **gizwits\_product. c** 文件的 **gizwitsEventProcess ()**相应事件下作具体处理即可。

下面使用MSP430平台，以APP实现控制LED为例，如下：

```c
/**

* @brief 事件处理接口

* 说明：

* 1.用户可以对WiFi模组状态的变化进行自定义的处理

* 2.用户可以在该函数内添加数据点事件处理逻辑，如调用相关硬件外设的操作接口

* @param[in] info : 事件队列

* @param[in] data : 协议数据

* @param[in] len : 协议数据长度

* @return NULL

* @ref gizwits_protocol.h

*/

int8_t gizwitsEventProcess(eventInfo_t * info, uint8_t * data, uint32_t len)
{
    uint8_t i = 0;
    dataPoint_t * dataPointPtr = (dataPoint_t *)data;
    moduleStatusInfo_t * wifiData = (moduleStatusInfo_t *)data;

    if ((NULL == info) || (NULL == data))
    {
        return -1;
    }

    for (i = 0; i<info>num; i++)
    {
        switch (info > event[i])
        {
        caseEVENT_LED_ONOFF:

            currentDataPoint.valueLED_ONOFF = dataPointPtr->valueLED_ONOFF;

            if (0x01 == currentDataPoint.valueLED_ONOFF)
            {
                //user handle

                P1OUT |= BIT6;
            }
            else
            {
                //user handle

                P1OUT &= ~BIT6;
            }

            break;

		//省略期间代码

        default:
            break;
        }
    }

    return 0;
}
```

### 5.2.数据上行控制

该工程源码在 **Gizwits\gizwits_product.c** 文件的 **userHandle()** 函数中实现传感器数据采集，并且该函数在while中循环执行，原则上用户只需要关心如何采集数据。

特别提醒，默认while循环执行速度较快，需要针对不同的需求，用户可调整数据点数据的采集周期和接口实现位置，预防由于传感器数据采集过快引发的不必要的问题（具体可查看STM32 的详解篇）。

下面使用MSP430平台，以灯的状态赋值为例（ **只读型数据点** 的操作会被云端自动生成），如下：

```c
/**

* 用户数据获取

* 此处需要用户实现除可写数据点之外所有传感器数据的采集,可自行定义采集频率和设计数据过滤算法

* @param none

* @return none

*/

void userHandle(void)
{
    currentDataPoint.valueLED_ONOFF = 0x01;
}
```

### 5.3.配置入网功能（必要）

根据串口协议文档规定，MCU可以向模组发送命令使其进入相应的配置模式，所以用户可以调用**gizwitsSetMode**接口（在 **gizwits\_protocol.c** 中）完成相应的操作（例如按键控制），接口调用说明如下：

```c
/**

* @brief WiFi配置接口

* 用户可以调用该接口使WiFi模组进入相应的配置模式或者复位模组

* @param[in] mode 配置模式选择：0x0，模组复位;0x01，SoftAp模式;0x02，AirLink模式

* @return 错误命令码

*/

int32_t gizwitsSetMode(uint8_t mode);
```

### 5.4.实现模组状态处理功能（可选）

开发者可以在 **gizwits_product. c** 文件的 **gizwitsEventProcess()**函数内获得WIFI状态，并做相应的逻辑处理。

下面使用MSP430平台为例，添加一个逻辑：当WiFi模块成功连接路由后关闭LED灯，代码中示例如下：

```c
  case WIFI_CON_ROUTER:
  		P1OUT &= ~BIT6;
  break;
```


# 相关支持

1)   如果您是开发者

GoKit是面向智能硬件开发者限量免费开放，注册我们的论坛或关注我们的官方微信均可发起申请即可。

开发者论坛： [http://club.gizwits.com/forum.php](http://club.gizwits.com/forum.php)

文档中心： [http://docs.gizwits.com/hc/](http://docs.gizwits.com/)

2)    如果您是团体

Gizwits针对团体有很多支持计划，您可以和Gizwits联系，快速得到GoKit以及技术支持；

网站地址： [http://www.gizwits.com/about-us](http://www.gizwits.com/about-us)

官方二维码：

 ![Alt text](/assets/zh-cn/deviceDev/DevSDK/common/image8.png)
