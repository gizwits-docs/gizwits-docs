title: Gokit开发概述和试用申请
---

# Gokit3
Gokit3是GoKit产品系列的第三代，支持MCU、SoC、BLE、语音、模式切换等特性。目前支持的SoC方案模组有esp8266、Hi3518E模组、宇音天下模组等。

![Gokit3](https://static.oschina.net/uploads/img/201704/10123316_3zpC.png "在这里输入图片标题")

具备以下特性：
- 1、独创的双排模组接口，兼容MCU和SoC两种连接方式。
- 2、1路USB转TTL调试串口。可用于SoC方式开发的日志输出。
- 3、兼容arduino接口。
- 4、GoKit经典传感器组合，温湿度、红外感应、双向电机、RGB灯。
- 5、3个key。
- 6、增加2路MIC，1路Speaker。
- 7、丰富的扩展接口，如OLED等。

Gokit3 的三个版本：
- GoKit3(V) - 语音模组版   （GoKit3功能板+底板+宇音天下模组）
- GoKit3(S) - SoC版（乐鑫模组(GoKit3转接板)+底板+GoKit3功能板）
- GoKit3(H) - 高性能模组版



## Gokit 3S
GoKit3(S)采用一体式SOC解决方案，并具有一定的拓展性，图如下：

![GOkit3s](https://static.oschina.net/uploads/img/201704/12112821_aEB7.jpg "在这里输入图片标题")

Gokit3S支持两种开发模式：
- SoC开发模式：
   - 即功能板+wifi模组的连接方式，是GoKit3(S)的默认方式，发货固件即为MCU版本固件，可直接使用，用法与GoKit2相同。需要注意的是SoC方式不能接底板，否则不能正常运行。
   - 二次开发源码包及原理图已经开放，地址是：ESP8266 SoC源码包 http://site.gizwits.com/zh-cn/developer/resource/hardware?type=GoKit，选择“微信宠物屋 for GoKit3(S) ESP8266”进行下载。
   - 原理图 http://club.gizwits.com/thread-2889-1-1.html
   -[SOC开发快速入门](http://docs.gizwits.com/zh-cn/deviceDev/UseSOC.html)

- MCU开发模式：
   - MCU的方式可得到与GoKit2相同的开发方式，即底板+功能板+wifi模组的连接方式。使用MCU的连接方式需要开发者自更新wifi模组的固件。
   - STM32 MCU源码包 http://site.gizwits.com/zh-cn/developer/resource/hardware?type=GoKit，选择“微信宠物屋 for GoKit 2 STM”进行下载。
   - [MCU开发快速入门](http://docs.gizwits.com/zh-cn/quickstart/%E8%AE%BE%E5%A4%87%E5%BF%AB%E9%80%9F%E6%8E%A5%E5%85%A5.html)
    - [STM32代码自动生成](http://docs.gizwits.com/zh-cn/deviceDev/DevSDK/%E4%BB%A3%E7%A0%81%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%E5%B7%A5%E5%85%B7.html)

MCU和SOC开发模式对比：
- MCU版  :是分体式的设计方案。WiFi模组只负责信息的接收与发送，它通过串口等方式与MCU进行通信，需要在MCU上进行协议解析与外设相关的开发。
总结：这种方案的优点是不受限于WiFi SOC片上资源、应用扩展度高；缺点是开发难度大、生产成本高。

- SOC版   :是整体式的设计方案。它将WiFi模组与外设驱动模块直接连接起来，直接在WiFi SOC上进行开发，省去了一层通讯过程。
总结：这种方案的优点是能降低开发难度、降低生产成本；缺点是受限于WiFi SOC片上资源，应用有限。



## Gokit 3V
GoKit3(V)开发套件，此套件支持语音识别、语音控制传感器。使用Lark7618模组进行智能硬件产品开发时，有以下几点需要注意：
- Lark7618支持语音识别功能，且符合标准机智云接入协议。
- 使用Lark7618模组进行产品开发时需采用MCU方式进行开发，即模组插到功能板模组接口的MCU侧。
- Lark7618需配合底板使用，支持Arduino版和STM32版。
- 将Gokit3S的WiFi模块替换成Lark718模块，即可改造城Gokit3S
- 需注意的是：GoKit3(V)使用MCU的方式连接(天线朝向电机一方)，配合底板MCU进行产品开发。

## Gokit3开发指南

- [Gokit3 资料下载](http://club.gizwits.com/thread-2764-1-1.html)
- [GOKIT3系列开发套件简介](http://docs.gizwits.com/zh-cn/deviceDev/Gokit3/Gokit3%E5%BC%80%E5%8F%91%E5%A5%97%E4%BB%B6%E7%AE%80%E4%BB%8B.html)
- [GOKIT3硬件手册](http://docs.gizwits.com/zh-cn/deviceDev/Gokit3/GoKit3%E7%A1%AC%E4%BB%B6%E6%89%8B%E5%86%8C.html)
- [GOKIT3（S）使用说明书](http://docs.gizwits.com/zh-cn/deviceDev/WiFiSOC/GoKit3S%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E%E4%B9%A6.html)
- [GOKIT3（S）开发套件介绍](http://docs.gizwits.com/zh-cn/deviceDev/WiFiSOC/GoKit3S%E5%BC%80%E5%8F%91%E5%A5%97%E4%BB%B6%E4%BB%8B%E7%BB%8D.html)
- [GOKIT3（S）二次开发](http://docs.gizwits.com/zh-cn/deviceDev/WiFiSOC/GoKit3S%E4%BA%8C%E6%AC%A1%E5%BC%80%E5%8F%91.html)
- [GOKIT3（S）源码详解](http://docs.gizwits.com/zh-cn/deviceDev/WiFiSOC/GoKit3S%E7%A8%8B%E5%BA%8F%E8%AF%A6%E8%A7%A3.html)
- [GOKIT3（V）使用说明书](http://docs.gizwits.com/zh-cn/deviceDev/Gokit3Voice/GoKit3V%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E%E4%B9%A6.html)
- [GOKIT3（V）开发指南](http://docs.gizwits.com/zh-cn/deviceDev/Gokit3Voice/GoKit3V%E4%BA%8C%E6%AC%A1%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97.html)
- [GOKIT3（V）词条管理](http://docs.gizwits.com/zh-cn/deviceDev/Gokit3Voice/GoKit3V%E8%AF%8D%E6%9D%A1.html)
- [GOKIT3（V）源码详解](http://docs.gizwits.com/zh-cn/deviceDev/Gokit3Voice/GoKit3V%E7%A8%8B%E5%BA%8F%E8%AF%A6%E8%A7%A3.html)
- [GOKIT2使用指南](http://docs.gizwits.com/zh-cn/deviceDev/Gokit2%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.html)

## Gokit3教学视频

- 1-GoKit3介绍	http://v.qq.com/page/c/i/7/c0342fr44i7.html
- 2-自助开发平台介绍	http://v.qq.com/page/q/k/a/q0342olq9ka.html
- 3-GoKit3(S)开发套件介绍	http://v.qq.com/page/c/9/q/c03428fzm9q.html
- 4-GoKit3(S)配置入网及APP控制	http://v.qq.com/page/d/h/p/d034237oghp.html
- 5-GoKit3(V)开发套件介绍	http://v.qq.com/page/d/c/8/d0342cuq3c8.html
- 6-GoKit3(V)配置入网及APP控制	http://v.qq.com/page/n/6/d/n0342s3oc6d.html
- 7-GoKit3代码自动生成工具	http://v.qq.com/x/page/z0343uhrvis.html
- 8-GoKit3 DEV SDK Common版移植说明	http://v.qq.com/x/page/j0343youjqw.html
- 9-GoKit3(S)二次开发-程序详解	http://v.qq.com/x/page/f03438iug4b.html
- 10-GoKit3(S)源码详解	http://v.qq.com/x/page/a0344o3b9yt.html
- 11-GoKit3(V)二次开发-程序详解	http://v.qq.com/x/page/w03411dulvm.html
- 12-GoKit3(V)源码详解	http://v.qq.com/x/page/e03433vgpkj.html

# Gokit2
GoKit2代为机智云于2015年推出的一款面向智能家居场景的开发板。用于帮助开发者快速实现智能硬件的原型开发。GoKit支持开发者将产品接入目前行业中各大流行的模组方案，帮助他们与高通、庆科、博通、 汉枫等对接，开发者只需扫一下相应的二维码就可以连接机智云2.0，通过机智云后台定义产品，产品通过WiFi模块上的GAgent接入机智云M2M服务 器，扫描二维码直接控制设备。GoKit上还集成了马达、1600万色的LED、Wifi模块、红外光感、温湿度等传感器。

## Gokit2标准版（STM32）
针对企业开发者，GoKit为大家提供熟悉的ST开发平台。使用STM32底板打造智能硬件原型，可更快的实现量产时的代码移植和复用。

![Gokit2标准版](https://static.oschina.net/uploads/img/201704/10123255_wa58.png "在这里输入图片标题")

企业开发者也能获得机智云官方提供的基于STM32的智能硬件开源案例代码和参考实现。
- [学习Gokit STM32底板开发 >](http://club.gizwits.com/forum.php?mod=viewthread&tid=259&extra=page%3D1)

## Gokit2创客版（Arduino）
为了让更多物联网开发者能够快速开发出自己的产品，机智云与Arduino官方战略合作，面向所有智能硬件爱好者、创客和个人，免费提供开发板及相关技术支持。

![Gokit2创客版](https://static.oschina.net/uploads/img/201704/10123233_WVKh.png "在这里输入图片标题")

配合内置丰富传感器的应用板和机智云自助开发平台，让开发者可在最短30分钟内就能搭建自己的智能硬件。
- [学习Gokit Arduino底板开发 >](http://club.gizwits.com/forum.php?mod=viewthread&tid=258&extra=page%3D1)

## Gokit2开发指南
- [Gokit2历代资料整理（新）](http://club.gizwits.com/thread-3721-1-1.html)
- [GoKit 能给您带来什么](	http://docs.gizwits.com/zh-cn/deviceDev/Gokit2%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.html#GoKit-能给您带来什么)
- [GoKit 2 开箱	](http://docs.gizwits.com/zh-cn/deviceDev/Gokit2%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.html#GoKit-2-开箱)
- [使用Echo音箱控制GoKit2](http://docs.gizwits.com/zh-cn/deviceDev/Gokit2%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.html#使用Echo音箱控制GoKit2)
- [玩转Gokit 2](http://docs.gizwits.com/zh-cn/deviceDev/Gokit2%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.html#玩转Gokit-2)

## GOkit2 教学视频
- Gokit介绍	http://v.qq.com/x/page/l0151m0lmbn.html
- 机智云Gokit入门:《Demo MCU程序修改及烧录》	https://v.qq.com/x/page/s0151wvtsvu.html
- 客户端与机智云智能设备通信的实现原理	http://v.qq.com/x/page/b0151o7w1zc.html
- 机智云Gokit宠物屋Android客户端开发	http://v.qq.com/x/page/f0151z50adz.html
- 机智云Gokit高级篇：《使用Gokit扩展接口》	http://v.qq.com/x/page/i0151h0cl97.html
- 机智云Gokit宠物网 iOS开源代码详解	http://v.qq.com/x/page/z01518k3lbv.html
- 机智云GoKit MCU范例程序源码详解	http://v.qq.com/x/page/m0151hk7of1.html
- 机智云硬件接入服务功能介绍	http://v.qq.com/x/page/j0151tqnsbl.html
- 机智云开放平台功能介绍	http://v.qq.com/x/page/u01519wzbc0.html
- 物联网硬件基础框架及开发流程	http://v.qq.com/x/page/y0151e0rj5e.html
- 快速开始：利用机智云后台工具定义物联网硬件	http://v.qq.com/x/page/t0151u0kupl.html


# Gokit1

已停产。

# Gokit试用申请
 - Gokit试用申请：http://dev.gizwits.com/zh-cn/developer/activity/gokit/request/organization
 - 兑换GoKit开发板：http://dev.gizwits.com/zh-cn/developer/activity/gokit/gotcha
 
# 开源硬件项目

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

# 商用项目

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

# FAQ

- Gokit社区：http://club.gizwits.com/forum-133-1.html
- STM32社区：http://club.gizwits.com/forum-228-1.html
- Gokit试用申请：http://dev.gizwits.com/zh-cn/developer/activity/gokit/request/organization
- 兑换GoKit开发板：http://dev.gizwits.com/zh-cn/developer/activity/gokit/gotcha
- Gokit购买： 在淘宝搜索“机智云”  或者是点击此链接： https://shop159680395.taobao.com/
- 技术支持/项目接入咨询：400-6565-488


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


