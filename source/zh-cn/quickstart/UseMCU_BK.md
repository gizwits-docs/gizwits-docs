title: "MCU+WiFi模组"方案接入机智云
---

# 微信宠物屋参考代码
附件：[微信宠物屋参考代码](http://docs.gizwits.com/assets/pdf/gokit_code.zip)

# 概述
机智云平台是致力于物联网、智能硬件云服务的开放平台。机智云专注于提供智能云服务及物联网的软硬件解决方案，帮助传统硬件厂商产品升级，快速实现硬件智能化。要实现硬件的智能化，除了硬件本身外，还需要实现：智能云平台、手机APP、联网模块，每一个领域都需要专业的团队来支撑。机智云提供完整的解决方案，让厂商或开发者只需要专注于自身产品硬件。以最小的成本和风险实现硬件智能化，获得产品最大的增值。本文主要介绍设备接入机智云基本流程

# 设备与机智云数据交互流程.

以一款空调为例。空调厂家开发者开发空调电控板的时候，使用移植机智云GAgent的WiFi/GPRS模组建立桥梁，使空调设备的数据与机智云互联互通。设备与机智云数据交互的基本数据流如下图。

![设备与机智云数据交互流程图](/assets/zh-cn/quickstart/dev/new1.png)

# 在机智云官网创建设备产品.

这里以Gokit“微信宠物屋”的例子介绍设备接入机智云的整个流程。

## 1.注册机智云开发者账号

[进入机智云官网开发者中心](http://dev.gizwits.com/zh-cn/developer/)， 根据界面指引注册开发者账号。

![](/assets/zh-cn/quickstart/dev/new2.png)

## 2.登录账号，选择对应项创建新产品

![创建新产品图](/assets/zh-cn/quickstart/dev/new3.png)

## 3.填写设备产品基本信息

![填写设备产品基本信息图](/assets/zh-cn/quickstart/dev/new5_5.png)

## 4.项目基本信息

在机智云官网上已成功创建“微信宠物屋”产品，机智云为该产品分配Product Key和Product Secret参数。Product Key参数由开发者写入设备MCU（设备主控板），并告知WiFi/GPRS模块，WiFi/GPRS模块登录机智云后，机智云将会识别该Product Key的产品。Product Secret参数是APP开发或服务器对接时所使用的参数。

![项目基本信息图](/assets/zh-cn/quickstart/dev/new4_4.png)
# 创建数据点
数据点即设备产品的功能的抽象，用于描述产品功能及其参数。创建数据点后，设备与云端通讯的数据格式即可确定，设备、机智云可以相互识别设备与机智云互联互通的数据。

![数据点概图](/assets/zh-cn/quickstart/dev/new6.png)

## 1.数据点详解

数据点定义基本内容可分为显示名称，标识名，读写类型，数据类型及备注。概图如下：

![](/assets/zh-cn/quickstart/dev/image7.png)

1.1 显示名称：自定义功能点名称。

1.2 标识名：用于应用层传输，客户端或业务云开发时需要使用。命名规则遵循标准的开发语言变量名命名规范，支持英文字母、数字和下划线，以英文字母开头。

1.3 读写类型：

①　只读：表示该数据点非控制，数据只支持从设备上报。

②　可写：表示该数据点可控制。设备端可上报该数据点数据；云端/客户端可对该数据点数据做出下发控制。

③　报警：表示该数据点非控制，数据只支持从设备上报，数据类型需为布尔值。

④　故障：表示该数据点非控制，数据只支持从设备上报，数据类型需为布尔值。云端会对设备上报的该数据点做统计，可在“运行状态”查看。

1.4 数据类型：

①　布尔值：表示两个状态：0，或1。如开关状态等，建议使用布尔数据类型。例如GoKit开发板的“微信宠物屋”，“开启/关闭红色灯”该数据点。

②　枚举类型：可定义一个有限的取值集合。当定义的某个功能（元器件）有固定的若干个值。例如GoKit开发板的“微信宠物屋”，“设定LED组合颜色”该数据点的枚举定义值：“自定义,黄色,紫色,粉色”。

③　数值：填写数值范围，数值可为负数/小数，机智云自动将数值转换为正数。例如GoKit开发板的“微信宠物屋”，“设定电机转速”该数据点：电机有正反转、调速功能，数据点值可定义为：-5～5。

④　扩展：填写数据长度，数据内容由用户自定义。对于上述功能点无法满足的复杂功能可采用。机智云不建议使用此类型数据，设备上报该数据点的数据，机智云无法识别。

1.5  备注：选填，用一段文本描述当前数据点的功能及定义方法，对字符格式不做限制。只用于提高数据点的易读性，如果需要团队协作开发，建议规范填写。

1.6 数据点数值型分辨率、增量换算实现原理

如以上提到，在定义数值型数据点的时候，取值范围可以使用包括小数、负数等非uint类型数值，熟悉嵌入式开发的开发者会知道，这些数值在设备端都是不被支持的。

机智云为了让设备功能定义更加简单直接、所见即所得，研究出来一套算法，用于将用户输入的数值转换成设备能够识别的uint类型，这套算法的核心公式是：y=kx+m。

y表示“显示值”，就是用户可见的最终数值，也是数据点定义时输入的值。包括Ymin(最小值) 和 Ymax(最大值)。

x表示“传输值”，就是实际指令间传输使用的数值，云端/客户端接收到的值。一定是uint格式。也包括 Xmin 和 Xmax。

k表示“分辨率”，就是用户输入的分辨率一值，确定了每个取值的步进。

m表示“取值偏移量”或“增量”，算法通过m值将y值偏移到满足x值uint格式的要求，m值默认等于Ymin，确保Xmin＝0 。

以下用一个电子温度计举例说明换算过程 数据点内容： 取值范围：-30（Ymin） ~ 50（Ymax），分辨率：0.1

根据公式：y=kx＋m，m默认等于Ymin = -30
Xmin = (-30+30) / 0.1 = 0
Xmax = (50+30) / 0.1 = 800

## 2.根据产品需求，分析硬件开发需求

Gokit板载了正反转可调电机马达，温湿度传感器，红外感应器、RGB全彩灯，“微信宠物屋”可以通过红外感应器及时了解您宠物是否在窝里和小窝的情况，可以通过温湿度传感器查看到一段时间内小窝的温湿度数据，可以通过电机马达模拟宠物喂食，还可以通过RGB全彩灯调节小窝灯光。

## 3.结合设备功能需求，分析设备数据点需求

![设备数据点需求](/assets/zh-cn/quickstart/dev/table41_1.png)

## 4.创建15个对应微信宠物屋需求的数据点

![创建数据点-1](/assets/zh-cn/quickstart/dev/new7_7.png)

![创建数据点-1](/assets/zh-cn/quickstart/dev/new8_8.png)

![创建数据点-3](/assets/zh-cn/quickstart/dev/new9_9.png)

或者也可以直接选择导入微信宠物屋的数据点，机智云已经创建好了微信宠物屋的数据点。

![创建数据点-3](/assets/zh-cn/quickstart/dev/new10_10.png)

![创建数据点-3](/assets/zh-cn/quickstart/dev/new11_11.png)

# 微信宠物屋MCU开发
## 1.自动生成MCU SDK

自动生成的MCU SDK代码实现了机智云通信协议的解析与封包、传感器数据与通信数据的转换逻辑，并封装成了简单的 API。当设备收到云端或 APP 端的数据后，程序会将数据转换成对应的事件并通知到应用层，开发者只需要在对应的事件处理逻辑中添加传感器的控制函数，便可完成产品的开发。这里选择独立MCU方案、硬件平台STM32f103c8x后，机智云直接生成适应STM32f103c8x的工程代码。

![自动生成MCU SDK-1](/assets/zh-cn/quickstart/dev/new12_12.png)

![自动生成MCU SDK-3](/assets/zh-cn/quickstart/dev/new14.png)

## 2.MCU SDK文件内容目录结构

如下图，其中黑色标注部分为STM32f103cx8硬件平台开发基本文件，绿色标注部分为机智云逻辑部分。gokit的串口驱动、定时器驱动、按键驱动等驱动机智云的自动生成mcu代码已实现完毕，开发者可直接在gizwits\_product.c&gizwits\_product.h文件编写硬件动作执行函数。

![MCU SDK文件内容目录结构](/assets/zh-cn/quickstart/dev/new16_16.png)

其中主要文件说明：

| 文件                 | 说明            |
|---------------------|-----------------------------|
| Gizwits\_product.c  | 该文件为产品相关处理函数，如gizwitsEventProcess()数据点事件处理函数。            |
| Gizwits\_product.h  | 该文件为gizwits\_product.c的头文件，存放产品相关宏定义如：HARDWARE\_VERSION、SOFTWARE\_VERSION |
| Gizwits\_protocol.c | 该文件为SDK API接口函数定义文件                                                                |
| Gizwits\_protocol.h | 该文件为gizwits\_protocol.c对应头文件，相关API的接口声明均在此文件中。                         |

协议API介绍

| API名称      | API功能               |   
|-------------|--------------------|                                                                                               
| Void gizwitsInit(void)    | gizwits 协议初始化接口。用户调用该接口可以完成 Gizwits 协议相关初始化（包括协议相关定时器、串口的初始化）。 |
| Void gizwitsSetMode(unit8\_t mode) | 参数mode\[in\]：支持0、1、2、3、4和5，其他数据无效。参数为 0，恢复模组出厂配置接口，调用会清空所有配置参数，恢复到出厂默认配置;  参数为 1 时配置模组进入 SoftAp 模式； 参数为 2 配置模组进入 AirLink 模式； 参数为 3 配置模组进入 产测 模式； 参数为 4 配置模组进入 可绑定 模式； 参数为 5 请求模组重启。 |
| Void gizwitsHandle(dataPoint\_t \*dataPoint)   | 参数 dataPoint\[in\]:用户设备数据点。该函数中完成了相应协议数据的处理即数据上报的等相关操作。|
| Int8\_t gizwitsEventProcess(eventInfo\_t \*info,uint8\_t \*data,uint32\_t len) |参数 info\[in\]:事件队列参数 ;  data\[in\]:数据;                                                                                                         参数 len \[in\]:数据长度。用户数据处理函数,包括 wifi 状态更新事件和控制事件。a) Wifi 状态更新事件WIFI\_开头的事件为 wifi 状态更新事件，data 参数仅在WIFI\_RSSI 有效，data 值为 RSSI 值,数据类型为 uint8\_t，取值范围 0~7。  b) 控制事件与数据点相关,本版本代码会打印相关事件信息，相关数值也一并打印输出，用户只需要做命令的具体执行即可。 |

## 3.开发步骤

### 3.1 程序主函数
位置：main.c 中 main()函数

![main函数截图](/assets/zh-cn/quickstart/dev/new17_17.png)

相关说明：

| 函数            | 说明                                                               |
|-----------------|------|
| HAL_Init()    | 平台相关的硬件初始化 **（非 MCU SDK API，不同的平台名称可能不同）** |
| SystemClock_Config()      | 平台相关的硬件初始化 **（非 MCU SDK API，不同的平台名称可能不同）** |
| userInit()      | 用户相关的初始化，如：外设驱动初始化、打印串口初始化 **（非MCU SDK API，不同的平台名称可能不同）** |
| gizwitsInit()   | 平台、协议处理初始化 **（MCU SDK API）** |
| userHandle()    | 用户事件回调函数，用户可以自定义事件在该函数中完成相应的协议处理。**（非MCU SDK API，不同的平台名称可能不同）**|
| gizwitsHandle() | 协议相关的主函数 **（MCU SDK API）**|

### 3.2 下载微信宠物屋STM32CubeMX版的驱动库文件

从MCU SDK文件内容目录结构看到，自动生成MCU代码里面没有正反转可调电机马达，温湿度传感器，红外感应器、RGB全彩灯驱动。机智云下载中心提供STM32CubeMX版的驱动库文件。

![下载1](/assets/zh-cn/quickstart/dev/new18.png)

![下载2](/assets/zh-cn/quickstart/dev/new19.png)

![下载2](/assets/zh-cn/quickstart/dev/new19_20.png)

### 3.3 导入微信宠物屋工程配置文件

> 建议开发者提前阅读文档中心的《STM32CubeMX移植机智云自动生成代码详解》一文，了解STM32CubeMX的相关使用方法，本文不做过多叙述。

将下载中心得到的微信宠物屋CubeMX配置文件，替换掉自动生成代码中的原配置文件：

![移植1](/assets/zh-cn/quickstart/dev/new20_20.png)

然后重新生成对应配置的STM32代码（并不会影响到原有的机智云协议处理代码）：

![移植2](/assets/zh-cn/quickstart/dev/new21_21.png)

### 3.4 移植微信宠物屋驱动代码

1)将下载中心得到的驱动库代码文件拷贝到自动生成代码工程中的 MCU_STM32F103C8x_source\Hal 文件夹中

![移植3](/assets/zh-cn/quickstart/dev/new22_22.png)

![移植4](/assets/zh-cn/quickstart/dev/new23_23.png)

2)在工程项目中国添加驱动代码的“.c”文件

![移植5](/assets/zh-cn/quickstart/dev/new24_24.png)

3)在驱动代码的delay.c、hal_infrared.c、hal_motor.c、hal_rgb_led.c、hal_temp_hum.c文件加入"main.h"头文件

```C
#include "main.h"
```

4)在代码中添加相应的函数调用

在 MCU_STM32F103C8x_source\Src\main.c 和 MCU_STM32F103C8x_source\Gizwits\gizwits_product.c 文件中添加驱动库的头文件

```C
#include "delay.h"
#include "hal_motor.h"
#include "hal_rgb_led.h"
#include "hal_temp_hum.h"
#include "hal_infrared.h"
```

在 MCU_STM32F103C8x_source\Gizwits\gizwits_product.c 文件的 userInit( ) 函数中添加各sensor的初始化

```C
void userInit(void)
{
    memset((uint8_t *)&currentDataPoint, 0, sizeof(dataPoint_t));
    
    delay_init(72); // 延时 初始化
    rgbLedInit(); // RGB LED 初始化
    dht11Init(); // 温湿度初始化
    irInit(); // 红外初始化
    motorInit(); // 电机初始化
    motorStatus(0); // 电机转速初始化
}
```

在 MCU_STM32F103C8x_source\Gizwits\gizwits_product.c 文件的 userHandle( ) 函数中添加只读型传感器数据点相关的代码

```C
void userHandle(void)
{
    uint8_t ret = 0;
    static uint32_t thLastTimer = 0;
    
    ///< 新添加代码: 红外传感器数据获取
    currentDataPoint.valueInfrared = irHandle();
    
    ///< 新添加代码: 温湿度传感器数据获取
    if((gizGetTimerCount() - thLastTimer) > 2000) //上报间隔2S
    {
        ret = dht11Read((uint8_t *)&currentDataPoint.valueTemperature,
                        (uint8_t *)&currentDataPoint.valueHumidity);
        if(ret != 0)
        {
            printf("Failed to read DHT11 [%d] \n", ret);
        }
        
        thLastTimer = gizGetTimerCount();
    }
}
```

在 MCU_STM32F103C8x_source\User\main.c 文件的 key2ShortPress( ) 函数与 key2LongPress( ) 函数中添加长/短按key2时的LED点亮代码
```C
void key2ShortPress(void)
{
    GIZWITS_LOG("KEY2 PRESS ,Soft AP mode\n");
    #if !MODULE_TYPE
    gizwitsSetMode(WIFI_SOFTAP_MODE);
    #endif
    //Soft AP mode, RGB red
    ledRgbControl(250, 0, 0);
}
```
```C
void key2LongPress(void)
{
    //AirLink mode
    GIZWITS_LOG("KEY2 PRESS LONG ,AirLink mode\n");
    #if !MODULE_TYPE
    gizwitsSetMode(WIFI_AIRLINK_MODE);
    #endif
    //AirLink mode, RGB Green
    ledRgbControl(0, 250, 0);
}
```

### 3.5 处理云端/APP发送过来的控制事件。

与控制型协议相关的函数调用关系如下：

![处理云端/APP发送过来的控制事件](/assets/zh-cn/quickstart/dev/image25.png)

函数调用说明：

| 函数                    | 说明      |
|-------------------------|--------------------|
| protocolIssuedProcess   | 该函数被 gizwitsHandle 调用，接收来自云端或 app端下发的相关协议数据，==**MCU SDK自处理，开发者可不关注**==    |
| ACTION\_CONTROL\_DEVICE | 进行“控制型协议”的相关处理，==**MCU SDK自处理，开发者可参考协议进一步理**解== |
| gizDataPoint2Event      | 根据协议生成“控制型事件”，并进行相应数据类型的转化转换，==**MCU SDK自处理，开发者可参考协议进一步理解**==                |
| gizwitsEventProcess     | 根据已生成的“控制型事件”进行相应处理（包括相应的驱动函数），==**需开发者处理控制事件**==                                |

相关代码位置：...\Gizwits\gizwits\_product.c 中 gizwitsEventProcess() 函数：

功能说明：完成写类型外设的事件处理。

相应代码（代码中的注释//user handle的下一行即可加入开发者的应用代码）：

```C
int8_t gizwitsEventProcess(eventInfo_t *info, uint8_t *gizdata, uint32_t len)
{
  uint8_t i = 0;
  dataPoint_t *dataPointPtr = (dataPoint_t *)gizdata;
  moduleStatusInfo_t *wifiData = (moduleStatusInfo_t *)gizdata;
  protocolTime_t *ptime = (protocolTime_t *)gizdata;
  
#if MODULE_TYPE
  gprsInfo_t *gprsInfoData = (gprsInfo_t *)gizdata;
#else
  moduleInfo_t *ptModuleInfo = (moduleInfo_t *)gizdata;
#endif

  if((NULL == info) || (NULL == gizdata))
  {
    return -1;
  }

  for(i=0; i<info->num; i++)
  {
    switch(info->event[i])
    {
      case EVENT_LED_OnOff:
        currentDataPoint.valueLED_OnOff = dataPointPtr->valueLED_OnOff;
        GIZWITS_LOG("Evt: EVENT_LED_OnOff %d \n", currentDataPoint.valueLED_OnOff);
        if(0x01 == currentDataPoint.valueLED_OnOff)
        {
          //user handle
          ledRgbControl(254, 0, 0);
        }
        else
        {
          //user handle    
	  ledRgbControl(0, 0, 0);
        }
        break;

      case EVENT_LED_Color:
        currentDataPoint.valueLED_Color = dataPointPtr->valueLED_Color;
        GIZWITS_LOG("Evt: EVENT_LED_Color %d\n", currentDataPoint.valueLED_Color);
        switch(currentDataPoint.valueLED_Color)
        {
          case LED_Color_VALUE0:
            //user handle
	    ledRgbControl(currentDataPoint.valueLED_R, currentDataPoint.valueLED_G, 
                          currentDataPoint.valueLED_B);
            break;
          case LED_Color_VALUE1:
            //user handle
	    ledRgbControl(254, 254, 0);
            break;
          case LED_Color_VALUE2:
            //user handle
	    ledRgbControl(254, 0, 70);
            break;
          case LED_Color_VALUE3:
            //user handle
	    ledRgbControl(238, 30, 30);
            break;
          default:
            break;
        }
        break;

      case EVENT_LED_R:
        currentDataPoint.valueLED_R = dataPointPtr->valueLED_R;
        GIZWITS_LOG("Evt:EVENT_LED_R %d\n",currentDataPoint.valueLED_R);
        //user handle
	ledRgbControl(currentDataPoint.valueLED_R, currentDataPoint.valueLED_G, 
		      currentDataPoint.valueLED_B);
        break;
      case EVENT_LED_G:
        currentDataPoint.valueLED_G = dataPointPtr->valueLED_G;
        GIZWITS_LOG("Evt:EVENT_LED_G %d\n",currentDataPoint.valueLED_G);
        //user handle
	ledRgbControl(currentDataPoint.valueLED_R, currentDataPoint.valueLED_G, 
		      currentDataPoint.valueLED_B);
        break;
      case EVENT_LED_B:
        currentDataPoint.valueLED_B = dataPointPtr->valueLED_B;
        GIZWITS_LOG("Evt:EVENT_LED_B %d\n",currentDataPoint.valueLED_B);
        //user handle
	ledRgbControl(currentDataPoint.valueLED_R, currentDataPoint.valueLED_G, 
		      currentDataPoint.valueLED_B);
        break;
      case EVENT_Motor_Speed:
        currentDataPoint.valueMotor_Speed = dataPointPtr->valueMotor_Speed;
        GIZWITS_LOG("Evt:EVENT_Motor_Speed %d\n",currentDataPoint.valueMotor_Speed);
        //user handle
	motorStatus(currentDataPoint.valueMotor_Speed);
        break;


      case WIFI_SOFTAP:
        break;
      case WIFI_AIRLINK:
        break;
      case WIFI_STATION:
        break;
      case WIFI_CON_ROUTER:
	ledRgbControl(0, 0, 0);
        break;
      case WIFI_DISCON_ROUTER:
 
        break;
      case WIFI_CON_M2M:
 
        break;
      case WIFI_DISCON_M2M:
        break;
      case WIFI_RSSI:
        GIZWITS_LOG("RSSI %d\n", wifiData->rssi);
        break;
      case TRANSPARENT_DATA:
        GIZWITS_LOG("TRANSPARENT_DATA \n");
        //user handle , Fetch data from [data] , size is [len]
        break;
      case WIFI_NTP:
        GIZWITS_LOG("WIFI_NTP : [%d-%d-%d %02d:%02d:%02d][%d] \n",ptime->year,ptime->month,
                    ptime->day,ptime->hour,ptime->minute,ptime->second,ptime->ntp);
        break;
      case MODULE_INFO:
            GIZWITS_LOG("MODULE INFO ...\n");
      #if MODULE_TYPE
            GIZWITS_LOG("GPRS MODULE ...\n");
            //Format By gprsInfo_t
      #else
            GIZWITS_LOG("WIF MODULE ...\n");
            //Format By moduleInfo_t
            GIZWITS_LOG("moduleType : [%d] \n",ptModuleInfo->moduleType);
      #endif
    break;
      default:
        break;
    }
  }

  return 0;
}
```

### 3.6 上报设备状态

与上报型协议相关的函数调用关系如下：

![上报设备状态函数调用逻辑](/assets/zh-cn/quickstart/dev/image27.png)

函数调用说明：

| 函数                     | 说明                                                                      |
|--------------------------|---------------------------------------|
| userHandle               | 获取用户区的上报型数据，需开发者关注  |
| gizCheckReport           | 判断是否上报当前状态的数据，MCU SDK自处理，开发者可不关注                 |
| gizDataPoints2ReportData | 完成用户区数据到上报型数据的转换，MCU SDK自处理，开发者可不关注           |
| gizReportData            | 将转换后的上报数据通过串口发送给 WiFi 模块，MCU SDK自处理，开发者可不关注 |

相关代码位置: ...\User\\main.c 中 userHandle() 函数：
使用说明：该函数中完成了用户区上报型数据的获取。用户只需将读到的数据赋值到用户区当前设备状态的全局变量结构体成员currentDataPoint.valueXXXXX即可，赋值完的数据是通过 gizwitsHandle 上报云端的，开发者不需要关注变化上报和定时上报。

```C
void userHandle(void)
{
    uint8_t ret = 0;
    static uint32_t thLastTimer = 0;
    
    ///< 新添加代码: 红外传感器数据获取
    currentDataPoint.valueInfrared = irHandle();
    
    ///< 新添加代码: 温湿度传感器数据获取
    if((gizGetTimerCount() ‐ thLastTimer) > 2000) //上报间隔2S
    {
        ret = dht11Read((uint8_t *)&currentDataPoint.valueTemperature,
                        (uint8_t *)&currentDataPoint.valueHumidity);
        if(ret != 0)
        {
            printf("Failed to read DHT11 [%d] \n", ret);
        }
        
        thLastTimer = gizGetTimerCount();
    }
}
```

### 3.7 编译并将固件烧写到GoKit3代MCU主控板

# 调试
## 1. 手机安装机智云APP

下载地址：https://download.gizwits.com/zh-cn/p/98/99

![安装机智云APP](/assets/zh-cn/quickstart/dev/new33.png)

## 2. 打开机智云APP，注册登录APP账号（或者跳过登录）

![注册登录APP账号](/assets/zh-cn/quickstart/dev/new34.png)

## 3. 短按gokit中间的key2按键，使WiFi模块进入softap配网模式，此时RGB全彩灯变红

![配置WiFi模块入网-1](/assets/zh-cn/quickstart/dev/new35_35.png)

## 4. App将gokit配置入网

![配置WiFi模块入网-2](/assets/zh-cn/quickstart/dev/new36_36.png)![配置WiFi模块入网-2](/assets/zh-cn/quickstart/dev/new36_37.png)![配置WiFi模块入网-2](/assets/zh-cn/quickstart/dev/new36_38.png)![配置WiFi模块入网-2](/assets/zh-cn/quickstart/dev/new36_39.png)![配置WiFi模块入网-2](/assets/zh-cn/quickstart/dev/new36_40.png)![配置WiFi模块入网-2](/assets/zh-cn/quickstart/dev/new36_41.png)![配置WiFi模块入网-2](/assets/zh-cn/quickstart/dev/new36_42.png)

## 5. APP控制/读取设备数据

![APP收发设备数据](/assets/zh-cn/quickstart/dev/new39_39.png)

## 6. 机智云后台查看设备交互数据

![机智云后台查看设备交互数据1](/assets/zh-cn/quickstart/dev/new40_40.png)

![机智云后台查看设备交互数据2](/assets/zh-cn/quickstart/dev/new41_41.png)

<font color=#FF0000 >特别说明：当APP与设备处于同一局域网，APP的控制指令会走小循环，因此设备日志上面看不到APP to Dev；如果想看到APP to Dev，可以将手机切换到4G流量或者连接别的路由器，再来控制设备，就能看到APP to Dev</font>

# 发布产品

产品发布到正式生产环境后，机智云将为你的设备免费分配独立的云端运行环境，确保你的设备24小时不间断在线以供用户使用，将享受更多机智云为您提供的增值服务，包括：智能设备统计分析，开放平台展示以及各种无微不至的技术支持服务。

产品如何申请发布上线，具体步骤如下：

1.进入产品详细信息页面，在产品名称旁边显示【申请发布】按。

![申请发布](/assets/zh-cn/quickstart/dev/new42.png)

2.点击【马上申请】按钮，按照界面提示填写及上传产品相关申请信息审核。

![马上申请](/assets/zh-cn/quickstart/dev/new43.png)

3.点击【提交申请】按钮，跳转提交成功页面。机智云将免费为你提供人工审核以及严谨的测试，审核通过后，会根据你提交的量产计划免费提供后台服务器支持。

![提交申请](/assets/zh-cn/quickstart/dev/new44.png)

注：如果该项目是有跟机智云商务订单合作的，请把设备或者板卡（带电源线）寄给相关的技术人员或者商务。

# 产测简介

产测是生产环节中重要的部分，保证了产品的质量，提升自身产品形象。机智云产测工具为批量生产的产品提供了方便快捷的模块与MCU产测方式。在大型生产时，保证模块与MCU可正常使用。使用产测工具，必须让产品先上架。由产品创建者向机智云申请发布。机智云将免费为你提供人工审核以及严谨的测试。[详情请点击浏览。](http://docs.gizwits.com/zh-cn/deviceDev/%E4%BA%A7%E6%B5%8B%E5%B7%A5%E5%85%B7%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3.html)
