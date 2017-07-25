title: STM32开发指南（IoT）
---

# 概述
STM32是ST(意法半导体)推出的基于ARM® Cortex® M 处理器内核的 32位闪存微控制器产品，融高性能、实时性、数字信号处理、低功耗、低电压于一身，同时保持高集成度和开发简易的特点。拥有业内最强大的产品阵容，基于工业标准的处理器，大量的软硬件开发工具，让STM32单片机成为各类中小项目和完整平台解决方案的理想选择。

作为国内第一个智能硬件自助开发(PaaS)及云服务(SaaS)平台和意法半导体战略合作伙伴,机智云率先开发出了**基于STM32的物联网开源套件 Gokit 和STM32代码自动生成工具**，帮助物联网智能硬件开发者快速打造产品原型。[STM32论坛](http://club.gizwits.com/forum-228-1.html)

应用范围:
智能家居 \ 智能家电 \ 智慧公寓 \ 智慧安防 \ 物联网M2M \ 单品类解决方案（净水器、空气净化器、照明、卫浴、厨电等） \ 商用租赁 \ 智能充电桩 \ 工业控制 \ 农业大棚 \ 资产管理 。

## 基于STM32的开源套件Gokit

GizWits Open Kit（缩写：GoKit），是机智云推出的一款开源WiFi智能硬件开发板，内置了温/湿度传感器、红外控测器、电机马达、全彩LED灯等常用传感器和元器件，配有一个WiFi时间模块和一颗MCU，并预留了扩展接口和开关键，可根据开发者的实际需求搭配使用。另外增加了OLED扩展接口，你可以为GoKit配上一块显示屏。
WiFi模块方面，目前已经有二十几家国内厂商为机智云做了兼容。而且，现在所有开发者都可以拿到开发库自行开发适配。

借助机智云的 Gokit套件，开发者可快速开发新产品。

#### GoKit背后是一个完整的产品体系
![GoKit背后是一个完整的产品体系](http://club.gizwits.com/EDMimages/github/STM32-1.png "GoKit背后是一个完整的产品体系")
这个体系包含设备、APP、M2M服务、业务服务、以及云对接等各种环节,详细说来,还有很多很多,如果您有兴趣,可以参考我们的论坛 [club.gizwits.com](http://club.gizwits.com/)。

#### GoKit在系统中的位置
GoKit在系统逻辑上,位于右下角的MCU的位置,即：GoKit代表智能硬件。

![GoKit在系统中的位置](http://club.gizwits.com/EDMimages/github/STM32-2.png "GoKit在系统中的位置")


####  历代Gokit

现有的Gokit版本：
- Gokit 2 标准板（STM32）:基于STM32平台，可更快的实现量产时的代码移植和复用。支持数据通过Wifi上传至到云平台
- Gokit 2 创客板（arduino）:基于Arduino平台，简单、易入门，能够通过串口接收到MCU或传感器的数据。支持数据通过Wifi上传至到云平台
- Gokit 3S（SOC）:支持MCU、SoC、BLE、语音、模式切换等特性，支持代码自动生成工具，节省空间和成本。
支持GPRS数据透传。
- Gokit 3V（语音板）:支持语音通信。

#### GoKit 能给您带来什么？
1. 如果您是一个产品经理
如果您是一个产品经理,您肯定希望快速的完成两件事情,一是做出产品的原型,实现产品初步功能;二是将产品量产,并找到销售渠道;
第一件事情可以这样玩 GoKit:
在我们的网页上,参照 GoKit 的模版,用图形化的方式定义您的产品功能;
下载系统为您的产品生成的 DemoAPP,即可完成对您的产品原型;
第二件事情可以这样玩 GoKit:
使用系统按照您的产品定义生成的协议和源码,参考 GoKit 的工程,完成快速产品开发(1-2 天);
使用 GizWits 提供的开源 APP(含 UI、UE 设计),参考您的产品定义,快速完成 APP 开发(1-2 天);
通过 GizWits 的合作伙伴,找到合适的生产商,进行产品测试和生产;
利用 GizWits 提供的 N 种宣传和渠道机会,将您的产品一夜成名;

2. 如果您是一个APP开发者
如果您是一个APP开发者,您可能不太熟悉硬件的处理和云端处理，您可以使用GoKit提供的丰富资源,进行APP的开发：
您可以根据 GoKit 的电机控制功能,开发出电动窗帘的 APP；
您也可以根据温湿度传感器,开发出家庭的温湿度检测的 APP；
您也可以自定义 LED 的颜色和亮度,来开发出更多功能的 APP；
当然,如果您愿意,也可以和GizWits的合作伙伴一起,针对您想实现的产品定制GoKit,合作完成一款优秀的产品。
3. 如果您是一个嵌入式开发者
如果您是一个嵌入式开发者,您可能不太了解APP开发以及云端处理,您可以这样玩GoKit：
在我们的网页上,参照 GoKit 的模版,用图形化的方式定义您的产品功能;
参考系统生成的协议和源码,以及 GoKit 工程,二次开发 GoKit 并烧写 MCU;
下载系统为您的产品生成的DemoAPP,即可完成对您的产品发现、控制、远程控制;
如果您愿意,也可以研究您的产品是如何被APP发现的、如何连接云端的,因为这些基本上都开源;

4. 如果您就想讲一个故事
如果您有一个非常好的想法,能讲一个很好的故事,这个故事可以为您找到投资,可以这样玩GoKit：
您可以参照产品经理的做法快速做出产品原型;
然后利用 GizWits提供的N 种活动机会,以及 N 种投资、孵化渠道,用 GoKit 原型生动的讲述您的故事;
故事被认可后,您可以利用GizWits提供的N个生产合作伙伴实现您的故事;

#  联网说明

智能设备之所以智能，一个重要的原因在于其具备联网能力，常见的智能设备多是由单片机/微处理器/微控制器等构成的嵌入式系统，主流的联网方式是嵌入GPRS、WIFI、蓝牙等无线通信模块。

机智云提供了一款兼容国内主流Wi-Fi模块、GSM模块的模组系统——GAgent。可以提供上层应用（手机APP等控制端、云端）到产品设备的双向数据通讯，此外，还提供对设备的配置入网、发现绑定、程序升级等功能。
**产品开发者使用GAgent后，只需要关心产品的业务逻辑开发**，不用关心数据的通讯功能开发，大大降低了开发的难度。

目前机智云提供由机智云移植的WiFi模组对应固件有：汉枫LPB100、乐鑫8266、汉枫LPT120、高通4004 、RealTek 8711AM 、庆科3162、广和通G510等。购买机智云支持的无线通信模组后，烧录GAgent固件，模组对MCU就是串口透传，开发者无需任何二次开发，只需按照官方给出的参考设计搭建最小系统，连接到MCU的串口即可。

部分模组固件烧写教程：

 - [汉枫 LPB100串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/HF-LPB100%E4%B8%B2%E5%8F%A3%E7%83%A7%E5%86%99%E8%AF%B4%E6%98%8E.html)
 - [乐鑫 ESP8266串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/ESP8266%E4%B8%B2%E5%8F%A3%E7%83%A7%E5%86%99%E8%AF%B4%E6%98%8E.html)
 - [汉枫 LPT120串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/debug/HF-LPT120.html)
 - [庆科 3162串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/MXCHIP%E4%B8%B2%E5%8F%A3%E7%83%A7%E5%86%99%E8%AF%B4%E6%98%8E.html)
 - [广和通 G510串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/debug/G510.html)
 - [串口工具使用文档](http://docs.gizwits.com/zh-cn/deviceDev/%E4%B8%B2%E5%8F%A3%E5%B7%A5%E5%85%B7%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3.html)
 - [日志抓取教程文档](http://docs.gizwits.com/zh-cn/deviceDev/%E6%97%A5%E5%BF%97%E6%8A%93%E5%8F%96%E6%95%99%E7%A8%8B%E6%96%87%E6%A1%A3.html)

![输入图片说明](http://club.gizwits.com/EDMimages/github/STM32-3.png "在这里输入图片标题")

#  STM32代码自动生成
为了降低开发者的开发门槛，缩短开发周期，降低开发资源投入，机智云推出了代码自动生成服务。云端会根据产品定义的数据点生成对应产品的设备端代码。使用自动生成的代码开发产品，就不必再处理协议相关的部分了，开发者可以将节省出来的精力集中在产品的核心功能开发上

自动生成的代码实现了机智云通信协议的解析与封包、传感器数据与通信数据的转换逻辑，并封装成了简单的API，且提供了多种平台的实例代码。当设备收到云端或APP端的数据后，程序会将数据转换成对应的事件并通知到应用层，开发者只需要在对应的事件处理逻辑中添加传感器的控制函数，就可以完成产品的开发。

![STM32代码自动生成](http://club.gizwits.com/EDMimages/github/STM32-4.png "STM32代码自动生成")

#### 代码自动生成工具文档：
  - [MCU（STM32）代码自动生成工具介绍](http://docs.gizwits.com/zh-cn/deviceDev/DevSDK/%E4%BB%A3%E7%A0%81%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%E5%B7%A5%E5%85%B7.html)

## MCU和SOC方案

自动生成服务支持的硬件方案有：独立MCU方案、SOC方案。

- 独立MCU方案支持的硬件平台有：stm32f103c8x、STM32F407X、STM32F429X、STM32767X、Arduinounowifi、ArduinounoR3、通用平台（即“其他平台”）；
- SOC方案支持的硬件平台有：[ESP8266平台](http://docs.gizwits.com/zh-cn/deviceDev/UseSOC.html)

快速入门：
   - [独立MCU方案](http://docs.gizwits.com/zh-cn/quickstart/%E8%AE%BE%E5%A4%87%E5%BF%AB%E9%80%9F%E6%8E%A5%E5%85%A5.html)
   - [SOC 方案](http://docs.gizwits.com/zh-cn/deviceDev/UseSOC.html)


#### MCU方案与SOC方案区别

MCU方案：模组负责与云端信息的交互，通过串口与主控板（即MCU）进行通信，需要在MCU上进行协议解析与外设控制的开发。
SoC方案：节省一颗MCU芯片，利用模组内部资源完成传感器操作和产品逻辑。

MCU方案中除了支持STM32平台，还可以将我们生成好的通用平台版代码移植到符合条件的任意平台，从而实现机智云所提供的各种功能。移植参考：[DEV SDK Common版移植说明（通用平台）](http://docs.gizwits.com/zh-cn/deviceDev/GoKit3%20DEV%20SDK%20Common%E7%89%88%E7%A7%BB%E6%A4%8D%E8%AF%B4%E6%98%8E.html)

# STM32开发应用

## 常见案例

- [STM32 NucleoL496ZG智能灯案例](http://club.gizwits.com/thread-5426-1-1.html)
- [STM32L432 Nucleo-32案例-3分钟打造手机APP远程空气质量监测应用](http://club.gizwits.com/thread-3876-1-1.html)
- [史上最详细UCOS-II移植教程，基于Gokit STM32F103C8T6](http://club.gizwits.com/thread-5355-1-1.html)
- [亲测WS2812 RGB彩灯MCU和SOC方案实现](http://club.gizwits.com/thread-5436-1-1.html)
- [用 ESP8266 做一个网络插座 (SOC方案)](http://club.gizwits.com/thread-4519-1-1.html)
- [ 基于ESP8266 SOC 车库照明系统](http://club.gizwits.com/thread-4703-1-1.html)

## 开源项目
- [智能家居应用模型One](http://gizwits.com/article/320/)
- [智能药盒](http://club.gizwits.com/thread-2685-1-1.html)
- [智能婴儿摇篮](http://club.gizwits.com/thread-2794-1-1.html)
- [智能灯](http://club.gizwits.com/thread-2830-1-1.html)
- [智能温控器](http://club.gizwits.com/thread-3332-1-1.html)
- [智能鞋柜](http://club.gizwits.com/thread-3381-1-1.html)
- [智能家居云控制套件](http://club.gizwits.com/thread-3308-1-1.html)
- [智能健康计](http://club.gizwits.com/thread-2865-1-1.html)
- [智能插座](http://club.gizwits.com/thread-3029-1-1.html)
- [智慧宿舍](http://club.gizwits.com/thread-2997-1-1.html)
- [智能仓鼠管家（语音版）](http://club.gizwits.com/thread-3016-1-1.html)
- [无线工业粉尘监测仪](http://club.gizwits.com/thread-3242-1-1.html)

## 商用项目

部分商用项目：

- [伊莱特智能电饭煲](http://club.gizwits.com/article-50-1.html)
- [全球客服 A.O.史密斯](http://club.gizwits.com/article-51-1.html)
- [华商三优电动车智能充电应用平台](http://club.gizwits.com/article-47-1.html)
- [西默智能路由器](http://club.gizwits.com/article-48-1.html)
- [艾沃净水机：连接微信，智慧饮水](http://club.gizwits.com/article-49-1.html)
- 戴勒姆Care2Share
- 酷蛙智能净水器
- 诸葛小明床头灯，语音控制 wifi音响自动感应
- 新科微信操控空调
- 希澈智能声波牙刷
- 巴比立方智能果蔬种植机
- 幸福森林空气净化器
- C1智能鱼缸温控器
- Onread智能插座
- 无源智能墙壁开关


# 常见问题
1. [STM32如何快速接入机智云](http://docs.gizwits.com/zh-cn/quickstart/%E8%AE%BE%E5%A4%87%E5%BF%AB%E9%80%9F%E6%8E%A5%E5%85%A5.html)

1. [5分钟了解机智云](http://docs.gizwits.com/zh-cn/quickstart/5%E5%88%86%E9%92%9F%E4%BA%86%E8%A7%A3%E6%9C%BA%E6%99%BA%E4%BA%91.html)

1. 机智云支持哪些WiFi模块、GSM模块？
   - 汉枫 HF-LPB100、HF-LPB120、LPT120
   - 乐鑫/安信可	esp-8266
   - Realtek8711am、联盛德TLN13SP01、广州致远AW54101WFX、高通QCA4004
   - TI	CC3200、NXP QFN-1、上海移远M26
   - 广和通G510、 中兴ME3610 、中兴ME3630

1. [GAgent for 汉枫LPB100、乐鑫ESP8266固件下载地址](http://download.gizwits.com)

1. [HF-LPB100串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/HF-LPB100%E4%B8%B2%E5%8F%A3%E7%83%A7%E5%86%99%E8%AF%B4%E6%98%8E.html)

1. [HF-LPT120串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/debug/HF-LPT120.html)

1. [在哪可以购买已烧写好GAgent固件的汉枫模块](https://shop159680395.taobao.com/)

1. 了解更多STM32信息：http://www.stmcu.com.cn/

# 关于机智云
机智云，Giz(mo)Wits（设备智慧）是广州机智云物联网科技有限公司旗下品牌，全球领先的物联网开发和云服务商，全栈物联网平台服务领导者，国内第一个智能硬件自助开发(PaaS)及云服务(SaaS)平台

公司拥有完整的技术研发团队、安全团队和人工智能团队，为有志于进军物联网开发者和企业提供安全、可靠的一站式物联网开发工具和云端运维服务，涵盖终端管理、连接管理、应用支持和业务分析等主要功能，已服务车联网、新能源、工业互联、医疗健康、消费类电子产品等众多行业。

## 模块化开发工具

以下是机智云提供的模块化开发工具：
- 标准GAgent串口通讯协议
- MCU代码自动生成工具
- APP代码自动生成工具
- 自动化产测工具
- OTA固件升级
- 国际版应用邮件模板
- 产品互联（Echo接入等）
- Snoti服务
- 企业API、OPEN API
- RTDB实时大数据统计

## 解决方案

以下是机智云提供的解决方案：
- 信息家电/大家电智能化/小家电智能化/
- 厨电信息化解决方案
- 智能净水器/智能空气净化器/
- 汽车电子/车联网/智能充电桩
- 公寓/楼宇/家居/酒店智能化解决方案
- 安防 / 消防
- 电机控制
- 智能电网
- 医疗/保健/卫生



## 官方技术交流群

- G1机智云物联网云服务 104975951
- G2机智云物联网云服务 491509598
- G3机智云物联网云服务 287087942
- G4机智云-STM32 iot开发 289447077
- G5-APP代码自动生成公测 599735135
- G6机智云-Arduino iot开发 378683984

## 联系我们

- 地址: 广州天河区天平架陶庄路5号众创空间8-9层 研发中心
- 电话: 020-6224-0080
- 邮箱: service@gizwits.com
- NewYork   646.201.9357

[![马上注册成为机智云开发者，创建您的智能产品吧！](http://club.gizwits.com/EDMimages/marstest/E1.jpg "马上注册成为机智云开发者，创建您的智能产品吧！")](https://accounts.gizwits.com/zh-cn/register/)
