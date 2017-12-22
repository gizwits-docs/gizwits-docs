title: STM32CubeMX移植机智云自动生成代码详解
---

# **前言**

本文介绍如何使用STM32CubeMX将机智云自动生成的stm32源码程序移植到其他的MCU平台。

 **STM32CubeMX**工具请在[STM官网](http://www.st.com/en/development-tools/stm32cubemx.html)注册账号后自行下载安装，本文不做详细说明。

 本示例使用在机智云自助开发中心生成的STM32F103源码工程，通过STM32Cube 移植到 **STM32L496ZGT6 **平台（其他STM32平台的移植也与此相似），我们选择的开发板为**NUCLEO-L496ZG**：

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N01.png) 

(NUCLEO-L496ZG是ST官方推出的Nucleo系列开发板NUCLEO144系列家族的新品，L4系列综合了低功耗与高性能的优势，其上集成了ST-LINK/V2-1，使用的是**STM32L496ZGT6**作为主控，具有超低功耗、丰富外设等特性。)

我们可以通过机智云自动生成工具生成STM32F103平台的工程源码(详情查看文档：[GoKit3二次开发-代码自动生成工具介绍](http://docs.gizwits.com/zh-cn/deviceDev/DevSDK/%E4%BB%A3%E7%A0%81%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%E5%B7%A5%E5%85%B7.html))，下面是生成的源码目录结构说明：

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N02.png) 



|       文件名       | 说明                                  |
| :-------------: | :---------------------------------- |
|     Driver      | 其中包含了所有的库文件                         |
|     Gizwits     | 机智云协议处理文件                           |
|       Hal       | 外设驱动文件                              |
|     MDK-ARM     | MDK 的工程文件                           |
|       Inc       | STM32源文件的头文件                        |
|       Src       | STM32源文件的 C 文件                      |
|      Utils      | 公用工具库文件                             |
|   .mxproject    | STM32Cube 的配置文件                     |
| STM32F103C8.ioc | STM32CubeMX 的工程文件(已STM32F103C8平台为例) |

> 注：需要移植的目录为Gizwits、Hal、Utils三个文件。
>

 

#**移植到其他STM32平台**

 移植分为以下几步：

1.创建STM32CubeMX 工程文件

在STM32CubeMX中直接选择您所使用的 MCU（比如这里我们选择STM32L496ZGTx） ，如下：

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N03.png) 

点击“Project → Setting”设置工程目录位置以及相应参数如下所示：

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N04.png) 

> 注：这里编译器选择为Keil 5
>

2.导入机智云模板配置文件

因为机智云自动生成的源码中已经包含了对应平台的STM32CubeMX工程配置文件，相关驱动参数已经是配置过的，为方便开发者将STM32的源码移植到其他的平台，我们可以使用STM32CubeMX的配置文件导入功能，将STM32F103平台的配置参数导入到STM32L496ZGT6平台，如下：

选择File > Import Project 

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N05.png) 

 

选择在“前言”中介绍过的STM32F103C8.ioc配置文件，如下图所示：

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N06.png) 

 

点击“OK”之后可以看到，在STM32L496ZGT6的工程中已经导入的机智云预先完成的配置文件了。

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N07.png) 

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N08.png) 



***3.特殊处理（只针对STM32 L系类的低功耗平台，其他平台的开发可跳过此步）***

由于NUCLEO-L496ZG开发板的USB串口默认连接的是MCU上的低功耗串口(LPUART1)，而不是我们在F103平台上的UART1，故将配置中的UART1换为LPUART1，如下图：

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N09.png) 

> 注：需手动将管脚PG8/PG7设置为LPUART_RX/LPUART_TX类型

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N10.png) 

 

4.生成工程代码

点击Project > Generate Code或者点击快捷图标生成工程代码。

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N11.png) 

 

5.编译并配置工程

点击“rebuild”编译工程

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N12.png) 

点击下载到STM32L496ZGT开发板。如果提示错误，可以点击图标对Option for Target 的Dubug选项进行修改。

> 注：图上选的是ST-LINK

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N13.png) 

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N14.png) 

点击Settings->Flash Download勾选 Reset and Run选项。这样程序下载后自动启动运行，不用再按一下复位或者重新上电才能运行。

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N15.png) 

点击“DownLoad”烧录按钮如图所示证明烧录成功：

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N16.png) 

 

6.移植代码

此时的工程中只有STM32L496ZGT相关的驱动代码，若要使用机智云的联网能力就需要移植相关的协议源码（即前文介绍的已自动生成的STM32F103工程中的**三个文件：Gizwits、Hal、Utils**）

移植前的STM32L496ZGT工程目录如下：

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N17.png) 

移植后（即从**STM32F103中复制Gizwits、Hal、Utils到STM32L496ZGT**下）如下：

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N18.png) 

接下来我们在STM32L496ZGT的keill5工程中添加如下的目录结构：

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N19.png) 

同理加入相应的编译路径：

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N20.png) 



7.添加、修改代码

首先，为了适配对应的平台应在**gizwits_product.h / hal_key.h** 中替换为对应平台的头文件，例如：

将原来F103C8平台的头文件 **#include "stm32f1xx_hal.h"**** **替换为L496ZGT平台的** ****#include "stm32l4xx_it.h"**

> 注：可以在根目录下的 **Drivers\STM32F1xx_HAL_Driver\Inc** 中找到对应平台的头文件。



接下来在**main.c**中添加与机智云协议处理相关的代码：

- **首先是引用的相关头文件：**

```c
/* USER CODE BEGIN Includes */

#include "hal_key.h"
#include "gizwits_product.h"
#include "common.h"

/* USER CODE END Includes */
```



- **接下来是相关全局变量：**

```c
/* USER CODE BEGIN PV */

/* Private variables ---------------------------------------------------------*/
#define GPIO_KEY_NUM 2 ///< Defines the total number of key member
keyTypedef_t singleKey[GPIO_KEY_NUM]; ///< Defines a single key member array pointer
keysTypedef_t keys;   

/* USER CODE END PV */
```

 

- **下面是长短按按键回调函数的定义：**


```c
/* USER CODE BEGIN 0 */

/**
* key1 short press handle
* @param none
* @return none
*/
void key1ShortPress(void)
{
    GIZWITS_LOG("KEY1 PRESS ,Production Mode\n");
    gizwitsSetMode(WIFI_PRODUCTION_TEST);
}

/**
* key1 long press handle
* @param none
* @return none
*/
void key1LongPress(void)
{
    GIZWITS_LOG("KEY1 PRESS LONG ,Wifi Reset\n");
    gizwitsSetMode(WIFI_RESET_MODE);

}

/**
* key2 short press handle
* @param none
* @return none
*/
void key2ShortPress(void)
{
    GIZWITS_LOG("KEY2 PRESS ,Soft AP mode\n");
    #if !MODULE_TYPE
    gizwitsSetMode(WIFI_SOFTAP_MODE);
    #endif
}

/**
* key2 long press handle
* @param none
* @return none
*/
void key2LongPress(void)
{
    //AirLink mode
    GIZWITS_LOG("KEY2 PRESS LONG ,AirLink mode\n");
    #if !MODULE_TYPE
    gizwitsSetMode(WIFI_AIRLINK_MODE);
    #endif
}

/**
* Key init function
* @param none
* @return none
*/
void keyInit(void)
{
    singleKey[0] = keyInitOne(NULL, KEY1_GPIO_Port, KEY1_Pin, key1ShortPress, key1LongPress);
    singleKey[1] = keyInitOne(NULL, KEY2_GPIO_Port, KEY2_Pin, key2ShortPress, key2LongPress);
    keys.singleKey = (keyTypedef_t *)&singleKey;
    keyParaInit(&keys); 
}

/* USER CODE END 0 */
```

 

- **接下来是对相关驱动模块以及机智云协议模块的初始化：****

```c
  /* USER CODE BEGIN 2 */

    timerInit();
    uartInit();

    userInit();
    gizwitsInit();
    keyInit();
    GIZWITS_LOG("MCU Init Success \n");

  /* USER CODE END 2 */
```



- **最后是在main函数中的循环处理函数调用：**

```c
  /* USER CODE BEGIN 3 */

        userHandle();
        gizwitsHandle((dataPoint_t *)¤tDataPoint);
  }

  /* USER CODE END 3 */
```

 

***以下是针对L496ZGT平台的特殊修改，其他非低功耗STM32平台可跳过以下内容***

由于NUCLEO-L496ZG 串口使用了LPUART1，而不是我们在F103平台上的UART1，故需在部分代码。

将“Gizwits/gizwits_product.c”中的两处 ”huart1” 改为main.c中已自动生成的 ”hlpuart1”

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N21.png) 

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N22.png) 

 

7.编译源码烧录测试

移植完毕相关代码后我们运行编译，编译无错后烧录到NUCLEO-L496ZG开发板。根据CubeMX工程配置文件可知串口波特率为:**115200**。

进而我们可以连接日志输出管脚来进一步调试我们的源码。

** **



#**进阶开发**

 

##**应用相关开发**

完成STM32相关平台的移植后，我们可以使用机智云提供的各种工具来开发自己的项目，相关介绍请查看[机智云文档中心](http://docs.gizwits.com/zh-cn/deviceDev/GoKit3%20DEV%20SDK%20Common%E7%89%88%E7%A7%BB%E6%A4%8D%E8%AF%B4%E6%98%8E.html)中的**Gokit-MCU**发开教程等相关章节。



##**驱动相关开发**

当硬件配置需要更改时，可以使用**STM32CubeMX**进行相关硬件驱动的配置开发，进而最大限度的减少源码上的重复开发，提高开发效率，这里以按键IO配置为例：

在源码根目录打开对应平台的STM32CubeMX工程文件

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N23.png)  

在管脚配置（Pinout）界面修改管脚IO配置，例如将原先的KEY1(PB10)改为PE3，类型为**GPIO_Input**。

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N24.png)  

进入配置选项（Configuration），将新配置的管脚名称与之前的名称保持一致（这样就不需要更改源码中的宏定义），再选择OK

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N25.png)  

最后点击源码生成按钮，更新源码中的IO驱动（并不会影响到之前添加的代码）

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N26.png)  

由于NUCLEO-L496ZG硬件连接的方式与F103中的方式不同（下拉），要修改部分按键驱动中的程序，在 ” Hal/hal_key.c ”中，将：

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N27.png)  

改为：

```c
if(HAL_GPIO_ReadPin((GPIO_TypeDef\*)keyS->singleKey[i].keyPort,keyS->singleKey[i].keyGpio))
```

编译烧录后，测试按键效果。



#**相关支持**

1) 如果您是创客

GoKit是面向智能硬件开发者限量免费开放，注册我们的论坛或关注我们的官方微信均可发起申请即可。

官方网站地址：<http://site.gizwits.com/developer/activity/gokit/request>

官方二维码：

![name](/assets/zh-cn/deviceDev/DevSDK/CubeMX/20171025N28.png)  

 

2) 如果您是团体

GizWits针对团体有很多支持计划，您可以和GizWtis联系，快速得到GoKit以及技术支持；

网站地址：<http://www.gizwits.com/about-us>