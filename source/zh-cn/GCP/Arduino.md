title: Arduino开发指南（IoT）
---
# Arduino开发指南

Arduino是一款便捷灵活、方便上手的开源电子原型平台，包含硬件（各种型号开发板）和软件（arduino IDE）,它适合爱好者，艺术家，和设计师的快速开发，把你的灵感快速实现。

作为国内第一个智能硬件自助开发(PaaS)及云服务(SaaS)平台和Arduino战略合作伙伴,机智云率先开发出了基**于Arduino的物联网开源套件 Gokit 和 Arduino代码自动生成工具**，帮助创客快速实现智能化产品开发。

## Gokit_Arduino开源套件

GizWits Open Kit（缩写：GoKit），是机智云推出的一款开源WiFi智能硬件开发板，内置了温/湿度传感器、红外控测器、电机马达、全彩LED灯等常用传感器和元器件，配有一个WiFi时间模块和一颗MCU，并预留了扩展接口和开关键，可根据开发者的实际需求搭配使用。另外增加了OLED扩展接口，你可以为GoKit配上一块显示屏。
WiFi模块方面，目前已经有二十几家国内厂商为机智云做了兼容。而且，现在所有开发者都可以拿到开发库自行开发适配。

借助机智云的 Gokit套件，开发者可快速开发新产品。

#### GoKit背后是一个完整的产品体系
![输入图片说明](https://static.oschina.net/uploads/img/201704/07181948_VgIS.png "在这里输入图片标题")
这个体系包含设备、APP、M2M服务、业务服务、以及云对接等各种环节,详细说来,还有很多很多,如果您有兴趣,可以参考我们的论坛 [club.gizwits.com](http://club.gizwits.com/)。

#### GoKit在系统中的位置
GoKit在系统逻辑上,位于右下角的MCU的位置,即：GoKit代表智能硬件。

![输入图片说明](https://static.oschina.net/uploads/img/201704/07182036_VDft.png "在这里输入图片标题")


#### 历代Gokit

现有的Gokit版本
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

#联网说明

为方便硬件快速联网，机智云自研串口通信协议GAgent，兼容市面上70多种GRPS、WiFi模块， Arduino爱好者只需购买支持接入机智云的模组，烧写相应的GAgent固件，即可让Arduino设备具备联网能力。

什么是GAent? GAent是机智云开发用于快速搭建物联网框架的固件，主要的作用是数据转发，是设备数据、机智云、应用端（APP）的数据交互桥梁。目前机智云提供由机智云移植的WiFi模组对应固件有：汉枫LPB100、乐鑫8266、汉枫LPT120、高通4004 、RealTek 8711AM 、庆科3162等。以上设备只需刷入GAgent，即可快速接入机智云。可应用在智能家居 \ 智能家电 \ 智慧公寓 \ 智慧安防 \ 物联网M2M \ 单品类解决方案（净水器、空气净化器、照明、卫浴、厨电等） \ 商用租赁 \ 智能充电桩 \ 工业控制 \ 农业大棚 \ 资产管理等领域 。


![输入图片说明](https://static.oschina.net/uploads/img/201704/11153242_gA0a.png "在这里输入图片标题")

GAgent模组固件烧写教程：
 - [汉枫 LPB100串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/HF-LPB100%E4%B8%B2%E5%8F%A3%E7%83%A7%E5%86%99%E8%AF%B4%E6%98%8E.html)
 - [乐鑫 ESP8266串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/ESP8266%E4%B8%B2%E5%8F%A3%E7%83%A7%E5%86%99%E8%AF%B4%E6%98%8E.html)
 - [汉枫 LPT120串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/debug/HF-LPT120.html)
 - [庆科 3162串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/MXCHIP%E4%B8%B2%E5%8F%A3%E7%83%A7%E5%86%99%E8%AF%B4%E6%98%8E.html)
 - [广和通 G510串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/debug/G510.html)
 - [串口工具使用文档](http://docs.gizwits.com/zh-cn/deviceDev/%E4%B8%B2%E5%8F%A3%E5%B7%A5%E5%85%B7%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3.html)
 - [日志抓取教程文档](http://docs.gizwits.com/zh-cn/deviceDev/%E6%97%A5%E5%BF%97%E6%8A%93%E5%8F%96%E6%95%99%E7%A8%8B%E6%96%87%E6%A1%A3.html)  


# Arduino代码自动生成
机智云官方提供Arduino UNO WIFI和Arduino UNO R3的代码自动生成。用户只需完成所需的逻辑功能即可。
代码生成分为两个步骤:  
1.设置数据点  
  - [数据点的设置](http://site.gizwits.com/zh-cn/document/m2m/i_021_editdp/)  

2.使用MCU代码自动生成工具生成目标代码  
  - [具体移植步骤，巨细](http://club.gizwits.com/thread-5393-1-1.html)  

其他信息：
  - [Arduino Uno WIFI接入机智云介绍](http://docs.gizwits.com/zh-cn/deviceDev/ArduinoUNO/intro.html)
  - [Arduino Uno WIFI之ESP8266固件烧写教程](http://docs.gizwits.com/zh-cn/deviceDev/ArduinoUNO/Tutorial.html)
  - [Arduino Uno WIFISDK之API介绍](http://docs.gizwits.com/zh-cn/deviceDev/ArduinoUNO/sdk.html)
  - [Arduino Uno WIFI智能小夜灯](http://docs.gizwits.com/zh-cn/AppDev/Android%E7%AC%AC%E4%B8%89%E6%96%B9%E7%99%BB%E5%BD%95%E4%B8%8E%E6%8D%A2%E8%82%A4.html)


  
# Arduino应用案例

## 开源项目
- [小夜灯](http://club.gizwits.com/thread-4679-1-1.html)  
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


# 关于机智云
机智云，Giz(mo)Wits（设备智慧）是广州机智云物联网科技有限公司旗下品牌，全球领先的物联网开发和云服务商，全栈物联网平台服务领导者，国内第一个智能硬件自助开发(PaaS)及云服务(SaaS)平台

公司拥有完整的技术研发团队、安全团队和人工智能团队，为有志于进军物联网开发者和企业提供安全、可靠的一站式物联网开发工具和云端运维服务，涵盖终端管理、连接管理、应用支持和业务分析等主要功能，已服务车联网、新能源、工业互联、医疗健康、消费类电子产品等众多行业。

模块化开发工具含：

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

解决方案含：
- 信息家电/大家电智能化/小家电智能化/
- 厨电信息化解决方案
- 智能净水器/智能空气净化器/
- 汽车电子/车联网/智能充电桩
- 公寓/楼宇/家居/酒店智能化解决方案
- 安防 / 消防
- 电机控制
- 智能电网
- 医疗/保健/卫生


联系我们：

地址: 广州天河区天平架陶庄路5号众创空间8-9层 研发中心

电话: 020-6224-0080

邮箱: service@gizwits.com

NewYork   646.201.9357

