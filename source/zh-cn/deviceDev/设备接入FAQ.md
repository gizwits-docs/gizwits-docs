title:  设备接入FAQ
---


# 1、概述
本文列举了开发者在使用设备接入、MCU自动生成或者使用机智云开发板（Gokit）的时候所遇到的一些问题以及解答方案。

# 2、FAQ

**Q：AirLink是什么意思，如何解释**
A： 机智云推出的实现 Onboarding 的一套技术名称，兼容了多个 Wi-Fi 模块厂商的 Smart-Config 协议以及一套良好用户体验的标准 Onboarding 操作流程，机智云的 Wi-Fi设备接入SDK 已经内置 AirLink 技术。

**Q：微信的AirKiss跟你们的AirLink有什么区别**
A：AirKiss是微信硬件平台提供的WIFI设备快速入网配置技术，AirLink是机智云提供的WIFI设备快速入网配置技术。从技术的角度上说，两者都是通过包含特定信息的UDP广播的方式使Wi-Fi模块配置连	上路由器，但二者支持的Wi-Fi模块有所差别。目前来说，机智云可提供支持AirKiss或AirLink的GAgent给开发者使用。

**Q：WIFI设备可以配置多个路由器么**
A：可以，不过GAgent里面只能保存一组SSID和Password，如果再次配置则会覆盖之前所配置的路由器

**Q：SoftAp配网的时候，模块的Ap密码是什么**
A：烧写了GAgent固件的模块，或者使用机智云协议的模块，AP模式的SSID均为”XPG-GAgent-xxxx”，其中”xxxx”为Wi-Fi模块的物理地址后四位，初始密码为”123456789”。

**Q：机智云现在支持什么模块？**
A：支持市面上LoRa/GPRS/WiFi/NB-IoT等主流模块。
所需要的GAgent固件可以在下载中心（http://site.gizwits.com/zhcn/developer/resource/hardware?type=GAgent）上下载，烧写固件后则可正常接入机智云。
目前提供以下种类的标准固件可供下载：
Wifi类有：乐鑫ESP8266、汉枫 LPB100/ LPB120/LPT120/ LPT220、高通QCA4004、瑞昱RealTek8711AM、联盛德 TLN13SP01、锐凌微 TinyCon3350-M26、庆科3162。
GPRS类有：广和通G510。
NB-IoT类有：高通MDM9206（BG60）。
联系官方客服，签署相关协议后，可获得通信协议，源代码等资源，开发属于自己模块的GAgent。

**Q：机智云硬件与云端通信协议是什么**
A：机智云通过 M2M 服务器使用 MQTT 协议，把 APP 的设备控制命令转发到设备上，把设备数据转发到 APP 上。

**Q： 如何 下载程序到 GoKit上**
A：需要根据不同底板选择不同的下载方式，ST 底板有串口下载和 Jlink 下载 2 种方式；Arduino 底板是通过串口下载的。详细操作链接如下：
ST 底板：http://club.gizwits.com/forum.php?mod=viewthread&tid=259
Arduino 底板：http://club.gizwits.com/forum.php?mod=viewthread&tid=258

**Q：虚拟设备调试成功后，怎样开发自己的mcu？**
A：
- 1.mcu通过串口连接已烧写机智云GAgent固件的Wi-Fi模块。
- 2.根据机智云官网生成的自己产品的《XXX机智云接入串口通信协议文档》实现与Wi-Fi模块的通信。
- 3.使用机智云App测试自己的MCU。

**Q：产品生成的MCU串口协议文档在哪里？**
A：《XXX机智云接入串口通信协议文档》是根据该产品数据点生成的，生成之前请创建数据点之后再进行生成：
- 1.左侧产品管理页面
- 2.点击产品开发资源，页面中间MCU 开发资源
- 3.点击产品的《机智云接入串口通信协议文档》下载
- 4.按文档要求开发MCU，则可与Wi-Fi模块及云端进行通信了。

**Q：如何使用自有电路板与WiFi模块连接**
A：WiFi 模块是通过串口与底板 MCU 通信的，所以只需要找到 WiFi 模块的串口引脚就可以连接到任意板子上

**Q： gokit2 代上 stm32 软件是基于 mdk 哪个版本开发的**
A：基于 Keil uVision5，目前使用 5.12 和 5.14 没有问题。

**Q：设备如何无按键配网？**
A：目前Gagent如果没有连接过路由器，或者重置过，打印Gagent日志就会发现，WiFi模块上电以后会自动进入airlink，无超时；如果想要进入softap，可以创建定时器，例如Airlink持续一分钟无配网，就进入softap。只要知道模组处于什么配网模式，就可以做到无按键配网

**Q：gokit烧写自动生成mcu代码，按key2不亮绿/红灯，不能配网？**
A：没有添加RGB灯驱动程序，所以RGB灯不会亮，但是可以通过抓取模组日志看到，实际上模组已经进入配网模式，并不影响正常配网。

