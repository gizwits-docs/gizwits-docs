title: ESP8266-SOC快速入门
----
附件：[微信宠物屋参考代码](/assets/pdf/Gokit.zip)
# 概述
微信宠物屋，是机智云一个简单常见的体验宠物屋真实场景的智能产品，硬件电路简单，程序本身也不复杂；下面我们使用gokit3（s）开发板和机智云云端，实现微信宠物屋。

**下面我们使用GoKit3（S）开发板，基于esp8266模块上的SoC方案，开发的微信宠物屋项目为例，示范一下如何将设备快速接入机智云，实现硬件智能化。**

# 步骤
## 1.准备工作 

**硬件：**

1）GoKit3（S）开发板

2）杜邦线若干

3）Usb转串口模块，如：ft232、cp2102、ch340均可

4）Micro USB线

**软件：**

1）Oracle VM VirtualBox

2）乐鑫官方的esp8266开发环境
[开发环境准备](/zh-cn/deviceDev/WiFiSOC/GoKit3S%E4%BA%8C%E6%AC%A1%E5%BC%80%E5%8F%91.html#GoKit3-S-开发环境准备)

**其他：**

1）机智云开发者账号

2）微信宠物屋 for GoKit3(S) ESP8266 V03000003源码（机智云下载中心可获得）

3）智能灯项目自动生成SoC源码（请继续查看下述操作，即可生成获得）


**补充说明：**

1）如果没有GoKit3的小伙伴也可以参考GoKit3的原理图基于esp8266模块（模块的Flash必须为4Mbyte，建议模块型号：安信可的esp-12f）自行搭建硬件，原理图链接如下：http://club.gizwits.com/thread-2889-1-1.html

2）GoKit3（S）购买链接：https://shop159680395.taobao.com/ （机智云官方店）

# 在机智云官网创建设备产品，创建数据点.

这里以Gokit“微信宠物屋”的例子介绍设备接入机智云的整个流程。

## 1.注册机智云开发者账号

[进入机智云官网开发者中心](http://dev.gizwits.com/zh-cn/developer/)， 根据界面指引注册开发者账号。

![](/assets/zh-cn/quickstart/dev/new2.png)

## 2.登录账号，选择对应项创建新产品

![创建新产品图](/assets/zh-cn/quickstart/dev/new3.png)

## 3.填写设备产品基本信息

![填写设备产品基本信息图](/assets/zh-cn/quickstart/dev/new5_5.png)

## 4.根据产品需求，分析硬件开发需求

Gokit板载了正反转可调电机马达，温湿度传感器，红外感应器、RGB全彩灯，“微信宠物屋”可以通过红外感应器及时了解您宠物是否在窝里和小窝的情况，可以通过温湿度传感器查看到一段时间内小窝的温湿度数据，可以通过电机马达模拟宠物喂食，还可以通过RGB全彩灯调节小窝灯光。

## 5.结合设备功能需求，分析设备数据点需求

![设备数据点需求](/assets/zh-cn/quickstart/dev/table41_1.png)

## 6.创建15个对应数据点

![创建数据点-1](/assets/zh-cn/quickstart/dev/new7_7.png)

![创建数据点-1](/assets/zh-cn/quickstart/dev/new8_8.png)

![创建数据点-3](/assets/zh-cn/quickstart/dev/new9_9.png)

# 下载云端自动生成代码及其介绍

## 1.自动生成工具介绍：

**自动生成代码工具：**是机智云为了降低开发者的开发门槛，缩短开发周期，降低开发资源投入，机智云推出了代码自动生成服务。云端会根据产品定义的数据点生成对应产品的设备端代码。自动生成的代码实现了机智云通信协议的解析与封包、传感器数据与通信数据的转换逻辑，并封装成了简单的API，且提供了多种平台的实例代码。当设备收到云端或APP端的数据后，程序会将数据转换成对应的事件并通知到应用层，开发者只需要在对应的事件处理逻辑中添加传感器的控制函数，就可以完成产品的开发。使用自动生成的代码开发产品，就不必再处理协议相关的部分了，开发者可以将节省出来的精力集中在产品的核心功能开发上。

- **关于“自动生成代码工具”的更多介绍和帮助，请点击以下链接：** [自动生成代码工具](/zh-cn/deviceDev/DevSDK/%E4%BB%A3%E7%A0%81%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%E5%B7%A5%E5%85%B7.html)


**获取本次（Gokit）项目，云端自动生成基于esp8266的SoC源码：**

完成产品的数据点新建之后，点击页面的左侧菜单栏的“MCU开发”根据页面提示选择“SOC方案”，目前SOC方案机智云云端默认的“硬件平台”为esp8266，选择完成之后下拉至页面底部，点击“生成代码包”，等待大概30秒左右即可生成基于esp8266的本次项目（Gokit）代码包，下载下来即可，由于下载下来的文件名过于长，并且在文件名里包含了产品的ProductKey，所以本次项目将下载下来的文件名修改为“Gokit”如下图：

![Alt text](/assets/zh-cn/deviceDev/UseSoc/new_soc_1.png)


**补充说明：SOC方案自动生成代码工具目前仅支持esp8266。**

## 2. 项目源码二次开发指引：

整个云端自动生成的SOC源码里面，用户只需要关心文件路径为“Gokit\app”下面的几个地方：

如果你需要添加8266的外设，只需要在
- **“Gokit\app\driver”**文件目录下添加相应外设的驱动的.c文件
- **“Gokit\app\include\driver”**文件目录下添加相应外设的驱动的.h文件

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410538947.png)

App通过云端下发控制事件处理，可以在
- **“Gokit\app\Gizwits”**文件目录下**“gizwits_product.c”**文件里面的**“gizwitsEventProcess（）**函数里添加驱动外设执行事件函数即可实现控制设备

上报云端状态事件处理，可以在
- **“Gokit\app\user”**文件目录下“user_main.c”文件里面的**“userHandle（）”**函数里添加数据状态上报函数即可以实现状态上报。

在这套SOC源码里面需要关心也就这几个主要的地方，模块联网以及底层驱动均不需要开发者去处理和修改。

## 3. 云端自动生成SOC源码的其他说明

·Key1和Key2这部分的程序是由机智云工程师基于GoKit3（S）完成的，如果用户自行搭建的8266硬件（非GoKit3），则需要修改这部分的程序去驱动用自己的按键GPIO口，用户按键这部分的程序是必需的，它用于使能wifi进入相应的配置模式，然后通过机智云的app（IOE Dome）给wifi模块推送路由器的ssid和password，从而使wifi联网网络，如果没有这个功能，就无法配置wifi模块，从而无法使wifi模块联网。

**-云端自动生成SoC源码里面的用户按键Key1、Key2**
 
**- Key1**

用于reset wifi和使模块进入产测模式
- reset wifi -> 长按key1

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410609968.png)

- 进入产测模式 -> 短按key1

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410698977.png)

**- Key2**

用于触发模块进入airlink和softap的配置模式
- airlink配置模式 -> 长按key2

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410739993.png)

- softap配置模式 -> 短按key2

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410747091.png)

# 微信宠物屋开发

## 1. 前往机智云下载中心，下载“微信宠物屋 for GoKit3(S) ESP8266 V03000003”SoC源码库

**“微信宠物屋 for GoKit3(S) ESP8266 V03000003”**这个是机智云工程师使用GoKit3（S）板，基于esp8266硬件平台写的案例，案例里面包含了红外传感器，温湿度传感器，小电机，RGB灯，用户按键等几个外设的驱动，可以直接复制到任何一个GoKit3（S）的板子上使用，也可以移植至其他的8266板子上去使用，获取源码方式如下图：

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410520403.png)

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410527525.png)


**备注：如需深入了解这个“微信宠物屋”这个实例源码的解析可以参考以下链接：**
[微信宠物屋实例源码的解析](/zh-cn/deviceDev/WiFiSOC/GoKit3S%E7%A8%8B%E5%BA%8F%E8%AF%A6%E8%A7%A3.html)


## 2. 从“微信宠物屋 for GoKit3(S) ESP8266 V03000003”案例中移植“Gokit”项目所需要的led驱动的.c和.h文件。

- 将**“GoKit_SoC_ESP8266_V03000003测试固件及开发资源2017072815\驱动库代码”**文件目录下的
   **“hal_rgb_led.c”、“hal_infrared.c”、“hal_motor.c”、“hal_temp_hum.c”**的c文件复制至**“Gokit\app\driver”**下

![Alt text](/assets/zh-cn/deviceDev/UseSoc/new_soc_2_1.png)

- 将**“GoKit_SoC_ESP8266_V03000003测试固件及开发资源2017072815\驱动库代码”**文件目录下的   **“hal_rgb_led.h”、“hal_infrared.h”、“hal_motor.h”、“hal_temp_hum.h”**的h文件复制至**“Gokit\app\include\driver”**下

![Alt text](/assets/zh-cn/deviceDev/UseSoc/new_soc_2_2.png)

完成以上动作之后就完成SOC文件的准备工作，下面进行修改相应的c文件。

## 3. 修改“Gokit”的SOC源码文件

这里我使用Sublime软件打开整个工程的，然后需要修改的两个文件，如下：

- **“Gokit\app\user”**文件目录下**“user_main.c”**文件

  外设的驱动初始化，在这个c文件里面的**“user_init（）**函数中完成

- **“Gokit\app\Gizwits”**文件目录下**“gizwits_product.c”**文件

  云端下发的数据，在这个c文件里面的**“gizwitsEventProcess（）”**函数中处理

- 程序修改部分说明如下图：

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410564904.png)

首先在gizwits_product.c文件 和 user_main.c文件里面添加以下头文件

```C
#include "delay.h"
#include "hal_motor.h"
#include "hal_rgb_led.h"
#include "hal_temp_hum.h"
#include "hal_infrared.h"
```

在 gizwits_product.c文件添加只读型传感器数据点相关的代码

```C
#define USER_TIME_MS 1000                ///< 新添加代码: 更改定时器间隔为100ms
#define TH_TIMEOUT (1000 / USER_TIME_MS) ///< 新添加代码: 温湿度采集间隔为1S（1000ms）
#define INF_TIMEOUT (500 / USER_TIME_MS) ///< 新添加代码: 红外采集间隔为500ms
```

在 gizwits_product.c 文件的 userHandle( ) 函数中添加只读型传感器数据点相关的代码

```C
void ICACHE_FLASH_ATTR userHandle(void)
{
	uint8_t ret = 0;
	uint8_t curTemperature = 0;
	uint8_t curHumidity = 0;
	uint8_t curIr = 0;
	static uint8_t thCtime = 0;
	static uint8_t irCtime = 0;
	thCtime++;
	irCtime++;
	
	///< 新添加代码: 红外传感器数据获取
	if(INF_TIMEOUT < irCtime)
	{
		irCtime = 0;
		curIr = irUpdateStatus();
		currentDataPoint.valueInfrared = curIr;
	}
	
	///< 新添加代码: 温湿度传感器数据获取
	if(TH_TIMEOUT < thCtime)
	{
		thCtime = 0;
		ret = dh11Read(&curTemperature, &curHumidity);
		if(0 == ret)
		{
			currentDataPoint.valueTemperature = curTemperature;
			currentDataPoint.valueHumidity = curHumidity;
		}
		else
		{
			os_printf("@@@@ dh11Read error ! \n");
		}
	}
	
    system_os_post(USER_TASK_PRIO_2, SIG_UPGRADE_DATA, 0);
}
```

在 gizwits_product.c 文件的 userInit( ) 函数中添加各sensor的初始化

```C
void ICACHE_FLASH_ATTR userInit(void)
{
	gizMemset((uint8_t *)&currentDataPoint, 0, sizeof(dataPoint_t));

	rgbGpioInit();     ///< 新添加代码: RGB LED初始化
	rgbLedInit();

	motorInit();       ///< 新添加代码: 电机初始化
	motorControl(0);

	dh11Init();        ///< 新添加代码: 温湿度初始化

	irInit();          ///< 新添加代码: 红外初始化
}
```

接着在**“gizwitsEventProcess()”**函数里面的**“//user handle”**部分添加完成写类型外设的事件处理的代码，例如控制微信宠物屋的灯光，驱动电机马达。

```C
int8_t ICACHE_FLASH_ATTR gizwitsEventProcess(eventInfo_t *info, uint8_t *data, uint32_t len)
{
    uint8_t i = 0;
    dataPoint_t * dataPointPtr = (dataPoint_t *)data;
    moduleStatusInfo_t * wifiData = (moduleStatusInfo_t *)data;

    if((NULL == info) || (NULL == data))
    {
        GIZWITS_LOG("!!! gizwitsEventProcess Error \n");
        return -1;
    }

    for(i = 0; i < info->num; i++)
    {
        switch(info->event[i])
        {
        case EVENT_LED_OnOff :
            currentDataPoint.valueLED_OnOff = dataPointPtr->valueLED_OnOff;
            GIZWITS_LOG("Evt: EVENT_LED_OnOff %d \n", currentDataPoint.valueLED_OnOff);
            if(0x01 == currentDataPoint.valueLED_OnOff)
            {
                //user handle
                rgbControl(254, 0, 0); ///< 新添加代码: 对应开启红灯
            }
            else
            {
                //user handle
                rgbControl(0, 0, 0); ///< 新添加代码: 对应关闭红灯
            }
            break;

        case EVENT_LED_Color:
            currentDataPoint.valueLED_Color = dataPointPtr->valueLED_Color;
            GIZWITS_LOG("Evt: EVENT_LED_Color %d\n", currentDataPoint.valueLED_Color);
            switch(currentDataPoint.valueLED_Color)
            {
            case LED_Color_VALUE0:
                //user handle
            	rgbControl(currentDataPoint.valueLED_R,currentDataPoint.valueLED_G,
		currentDataPoint.valueLED_B);
                break;
            case LED_Color_VALUE1:
                //user handle
                rgbControl(254, 254, 0); ///< 新添加代码: 对应LED组合颜色‐黄色
                break;
            case LED_Color_VALUE2:
                //user handle
                rgbControl(254, 0, 70); ///< 新添加代码: 对应LED组合颜色‐紫色
                break;
            case LED_Color_VALUE3:
                //user handle
                rgbControl(238, 30, 30); ///< 新添加代码: 对应LED组合颜色‐粉色
                break;
            default:
                break;
            }
            break;

        case EVENT_LED_R:
            currentDataPoint.valueLED_R= dataPointPtr->valueLED_R;
            GIZWITS_LOG("Evt:EVENT_LED_R %d\n",currentDataPoint.valueLED_R);
            //user handle
			rgbControl(currentDataPoint.valueLED_R,currentDataPoint.valueLED_G,
			currentDataPoint.valueLED_B);
            break;
        case EVENT_LED_G:
            currentDataPoint.valueLED_G= dataPointPtr->valueLED_G;
            GIZWITS_LOG("Evt:EVENT_LED_G %d\n",currentDataPoint.valueLED_G);
            //user handle
			rgbControl(currentDataPoint.valueLED_R,currentDataPoint.valueLED_G,
			currentDataPoint.valueLED_B);
            break;
        case EVENT_LED_B:
            currentDataPoint.valueLED_B= dataPointPtr->valueLED_B;
            GIZWITS_LOG("Evt:EVENT_LED_B %d\n",currentDataPoint.valueLED_B);
            //user handle
			rgbControl(currentDataPoint.valueLED_R,currentDataPoint.valueLED_G,
			currentDataPoint.valueLED_B);
			break;
        case EVENT_Motor_Speed:
            currentDataPoint.valueMotor_Speed= dataPointPtr->valueMotor_Speed;
            GIZWITS_LOG("Evt:EVENT_Motor_Speed %d\n",currentDataPoint.valueMotor_Speed);
            //user handle
			motorControl(currentDataPoint.valueMotor_Speed);
			break;

        case WIFI_SOFTAP:
            break;
        case WIFI_AIRLINK:
            break;
        case WIFI_STATION:
            break;
        case WIFI_CON_ROUTER:
            GIZWITS_LOG("@@@@ connected router\n");
 			rgbControl(0, 0, 0); ///< 新添加代码: 连接路由后关闭LED灯
            break;
        case WIFI_DISCON_ROUTER:
            GIZWITS_LOG("@@@@ disconnected router\n");
 
            break;
        case WIFI_CON_M2M:
            GIZWITS_LOG("@@@@ connected m2m\n");
			setConnectM2MStatus(0x01);
 
            break;
        case WIFI_DISCON_M2M:
            GIZWITS_LOG("@@@@ disconnected m2m\n");
			setConnectM2MStatus(0x00);
 
            break;
        case WIFI_RSSI:
            GIZWITS_LOG("@@@@ RSSI %d\n", wifiData->rssi);
            break;
        case TRANSPARENT_DATA:
            GIZWITS_LOG("TRANSPARENT_DATA \n");
            //user handle , Fetch data from [data] , size is [len]
            break;
        case MODULE_INFO:
            GIZWITS_LOG("MODULE INFO ...\n");
            break;
            
        default:
            break;
        }
    }
    system_os_post(USER_TASK_PRIO_2, SIG_UPGRADE_DATA, 0);
    
    return 0; 
}
```

接着在 user_main.c 文件的key2ShortPress()和key2LongPress()添加配网按键指示灯

```C
LOCAL void ICACHE_FLASH_ATTR key2ShortPress(void)
{
	GIZWITS_LOG("#### key2 short press, soft ap mode \n");
	rgbControl(250, 0, 0); ///< 新添加代码: Soft AP mode, RGB red
	gizwitsSetMode(WIFI_SOFTAP_MODE);
}
```

```C
LOCAL void ICACHE_FLASH_ATTR key2LongPress(void)
{
	GIZWITS_LOG("#### key2 long press, airlink mode\n");
	rgbControl(0, 250, 0); ///< 新添加代码: AirLink mode, RGB Green
	gizwitsSetMode(WIFI_AIRLINK_MODE);
}
```

完成以上动作之后，进行SoC编译开发环境的搭建，请参考[开发环境准备](/zh-cn/deviceDev/WiFiSOC/GoKit3S%E4%BA%8C%E6%AC%A1%E5%BC%80%E5%8F%91.html#GoKit3-S-开发环境准备)

**补充说明：新手入门建议使用virtualbox+乐鑫官方的开发环境，进行二次开发**

#### 2.4.8 固件烧写

- 请参考这里：[固件下载](/zh-cn/deviceDev/WiFiSOC/GoKit3S%E4%BA%8C%E6%AC%A1%E5%BC%80%E5%8F%91.html#GoKit3-S-固件下载)

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483411027642.png)
# 调试
## 1. 手机安装机智云APP

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

1.进入产品详细信息页面，在产品名称旁边显示【申请发布】按钮

![申请发布](/assets/zh-cn/quickstart/dev/new42.png)

2.点击【马上申请】按钮，如实填写申请信息审核

![马上申请](/assets/zh-cn/quickstart/dev/new43.png)

3.点击【提交申请】按钮，跳转提交成功页面。机智云将免费为你提供人工审核以及严谨的测试，审核通过后，会根据你提交的量产计划免费提供后台服务器支持。

![提交申请](/assets/zh-cn/quickstart/dev/new44.png)

# 产测简介

产测是生产环节中重要的部分，保证了产品的质量，提升自身产品形象。机智云产测工具为批量生产的产品提供了方便快捷的模块与MCU产测方式。在大型生产时，保证模块与MCU可正常使用。使用产测工具，必须让产品先上架。由产品创建者向机智云申请发布。机智云将免费为你提供人工审核以及严谨的测试。[详情请点击浏览。](http://docs.gizwits.com/zh-cn/deviceDev/%E4%BA%A7%E6%B5%8B%E5%B7%A5%E5%85%B7%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3.html)

## 4. 项目完成
- 完成以上步骤，整个项目开发就完成了,如果需要关注更多的开源项目以及和其他开发者深度交流，可以到我们公司的官方论坛进行学习：http://club.gizwits.com/forum.php

## [附加篇：ESP8266-SOC方案UART0教程](http://docs.gizwits.com/zh-cn/deviceDev/ESP8266-SOC_UART0.html)


