title: Gokit 2使用指南
---

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1.png)

#  GoKit的产品使命

如果用一句话描述 GoKit 的产品使命,那就是“智能产品开发要像写《hello world》一样简单”。

智能硬件,或者说大家所讲的物联网,纵向方向涉及到的行业知识很多,从下到上大概有传感器、 MCU、通讯模组(BLE、ZigBee、WiFi 等)、APP、M2M 服务、数据存储、报表分析、数据挖掘、云对接等,往往一个初创团队,没有办法迅速在每个点都投入资源。

此时,不妨借助一下机智云(GizWits),借助一下机智云提供的 GoKit 原型,这个原型已经打通了上 述的每一个环节,并且开源 GoKit 相关技术和资料,同时也提供了根据这个原型快速开发新产品的方法。

更重要的是,GizWits也是一个开源社区,创客、团体、厂商等圈内朋友可以一起改变智能硬件圈。

#  GoKit 能给您带来什么

## 1. 如果您是一个产品经理

如果您是一个产品经理,您肯定希望快速的完成两件事情,一是做出产品的原型,实现产品初步功能;二是将产品量产,并找到销售渠道;

第一件事情可以这样玩 GoKit:

在我们的网页上,参照 GoKit 的模版,用图形化的方式定义您的产品功能;

下载系统为您的产品生成的 DemoAPP,即可完成对您的产品原型;

第二件事情可以这样玩 GoKit:

使用系统按照您的产品定义生成的协议和源码,参考 GoKit 的工程,完成快速产品开发(1-2 天);

使用 GizWits 提供的开源 APP(含 UI、UE 设计),参考您的产品定义,快速完成 APP 开发(1-2 天);

通过 GizWits 的合作伙伴,找到合适的生产商,进行产品测试和生产;

利用 GizWits 提供的 N 种宣传和渠道机会,将您的产品一夜成名;

## 2. 如果您是一个APP开发者

如果您是一个APP开发者,您可能不太熟悉硬件的处理和云端处理，您可以使用GoKit提供的丰富资源,进行APP的开发：

您可以根据 GoKit 的电机控制功能,开发出电动窗帘的 APP；

您也可以根据温湿度传感器,开发出家庭的温湿度检测的 APP；

您也可以自定义 LED 的颜色和亮度,来开发出更多功能的 APP；

当然,如果您愿意,也可以和GizWits的合作伙伴一起,针对您想实现的产品定制GoKit,合作完成一款优秀的产品。

## 3. 如果您是一个嵌入式开发者

如果您是一个嵌入式开发者,您可能不太了解APP开发以及云端处理,您可以这样玩GoKit：

在我们的网页上,参照 GoKit 的模版,用图形化的方式定义您的产品功能;

参考系统生成的协议和源码,以及 GoKit 工程,二次开发 GoKit 并烧写 MCU;

下载系统为您的产品生成的DemoAPP,即可完成对您的产品发现、控制、远程控制;

如果您愿意,也可以研究您的产品是如何被APP发现的、如何连接云端的,因为这些基本上都开源;

## 4. 如果您就想讲一个故事

如果您有一个非常好的想法,能讲一个很好的故事,这个故事可以为您找到投资,可以这样玩GoKit：

您可以参照产品经理的做法快速做出产品原型;

然后利用 GizWits提供的N 种活动机会,以及 N 种投资、孵化渠道,用 GoKit 原型生动的讲述您的故事;

故事被认可后,您可以利用GizWits提供的N个生产合作伙伴实现您的故事;

#  GoKit 是如何做到的

## 1. GoKit背后是一个完整的产品体系

![Alt text](/assets/zh-cn/deviceDev/Gokit2/2.png)


这个体系包含设备、APP、M2M服务、业务服务、以及云对接等各种环节,详细说来,还有很多很多,如果您有兴趣,可以参考我们的论坛:http://club.gizwits.com/。

## 2. GoKit在系统中的位置

GoKit在系统逻辑上,位于右下角的MCU的位置,即：GoKit代表智能硬件。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/3.png)


 

#   GoKit 2 开箱

打开包装后，你可以看到一个黄色纸皮盒包裹着一个透明亚克力盒。里面的板子就是GoKit2代。

 ![Alt text](/assets/zh-cn/deviceDev/Gokit2/4.png)

![Alt text](/assets/zh-cn/deviceDev/Gokit2/5.png)


GoKit 2代，我们把应用板与主控板分离，使用了Arduino标准接口，你现在可以有两个选择，使用标准的STM32主控板或者兼容Arduino的Atmel主控板。如下图：



![Alt text](/assets/zh-cn/deviceDev/Gokit2/6.png)

![Alt text](/assets/zh-cn/deviceDev/Gokit2/7.png)


应用板依然板载了正反转可调速电机马达、温湿度传感器、红外感应器、RGB全彩LED灯，另外增加了OLED扩展接口，你可以为GoKit配上一块显示屏。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/8.png)





WiFi模块方面，目前已经有二十几家国内厂商为机智云做了兼容。而且，现在所有开发者都可以拿到开发库自行开发适配。


# 玩转Gokit 2
##    第一步：下载 IoE Demo App

IoE Demo是机智云推出的智能硬件调试工具，通过IoE Demo App可以对GoKit进行绑定与远程控制等操作，也可以作为其他基于机智云开发的智能硬件项目的调试工具。

你可以通过扫描说明书上的黄色二维码下载并安装IoE Demo，也可以进入机智云开发者中心进行下载，[前往下载](http://dev.gizwits.com/zh-cn/developer/resource/demo_app?protoc=WIFI)

为了让开发者更好的掌握客户端开发的技巧，我们提供了IoE Demo的开源版本，[前往下载](http://dev.gizwits.com/zh-cn/developer/resource/open_source?type=demo_app)

##  第二步：将GoKit连接上网

GoKit通过WiFi通信模块以无线的方式连接路由器并接入互联网，这里我们需要做的就是把可用WiFi的路由器SSID和密码告诉GoKit（就像你新买的手机需要输入家里的WiFi密码一样）,但GoKit没有键盘和屏幕，如何做到呢？GoKit提供三种配置方式：AirLink 、WebConfig、 SoftAP。下面我们分别学习三种不同的配置方式，大家人选一种即可。

###   AirLink配置入网

AirLink配置就是说明书上介绍的方法，实现过程就是：通过按键触发开启设备“AirLink”模式，开启后设备会不断接收特定编码的WiFi广播包，手机连接可用的WiFi网络后，通过指定的App（如IoE Demo）发送编码后的WiFi网络的SSID和密码广播，设备接收到之后自动尝试连接此WiFi网络，连接成功即配置完成。下面一步步完成GoKit通过AirLink接入路由器连接网络吧。（注意：AirLink配置不支持5G的WiFi网络，请使用传统2.4G WiFi信号）

1）智能手机进入“系统设置”连接您附件可用的WiFi网络。

2）打开下载好的“IoE Demo” App，点击主屏幕右上角“菜单栏”中的“添加新设备”。如下图

![Alt text](/assets/zh-cn/deviceDev/Gokit2/9.png)


3）使用USB线为GoKit供电，开机后长按［KEY2］3~5秒直到［RGB LED］亮绿灯，表示设备AirLink模式已经开启。如下图

![Alt text](/assets/zh-cn/deviceDev/Gokit2/10.png)


4）IoE Demo APP上输入已连接WiFi的密码，点击配置按钮，等待30秒到一分钟，APP提示配置成功。在此期间，您可以看到GoKit的绿灯熄灭，WiFi模组两个指示灯瞬间熄灭，直到指示灯开始交叉闪烁，这表示GoKit已经连上路由器，配置完成。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/11.png)


###  SoftAP配置入网

由于AirLink配置方式有一定的技术限制，GoKit支持另一种配置方式——SoftAP，实现过程就是将GoKit上的WiFi模组切换到AP模式，手机直接与GoKit连接，并将可用的WiFi网络SSID和密码发送给GoKit，GoKit接收到配置信息后自动尝试连接路由器。具体步骤如下：

1）GoKit正常供电情况下，短按［KEY2］直到［RGB LED］亮红灯，表示GoKit已经初始化。而GoKit在初始状态下将自动进入“SoftAP”模式。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/12.png)


2）手机进入“系统设置”中的“WiFi设置”，找到“XPG-GAgent-XXXX”（XXXX是你的GoKit MAC地址后4位）并连接此WiFi网络，如需密码请输入：123456789 。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/13.png)


3）打开“IoE Demo” App，此时App会自动进入SoftAP配置模式，选择或手动输入你附近的可用WiFi网络SSIS及密码，点击“确定”。

 ![Alt text](/assets/zh-cn/deviceDev/Gokit2/14.png)


![Alt text](/assets/zh-cn/deviceDev/Gokit2/15.png)


4）等待30秒到一分钟，当GoKit上WiFi模组的指示灯交叉闪烁时，表示配置完成。

### Web Config配置模式

Web Config是SoftAP配置模式的一种升级，解决了智能硬件配置上网对独立专用App的依赖问题。实现原理与SoftAP类似，但直接使用手机自带的浏览器即可配置。具体步骤如下：

1）GoKit正常供电情况下，短按［KEY2］，［RGB LED］亮红灯，表示GoKit已经初始化，而GoKit在初始状态下将自动进入“SoftAP”模式。

2）手机进入“系统设置”中的“WiFi设置”，找到“XPG-GAgent-XXXX”（XXXX是你的GoKit MAC地址后4位）并连接此WiFi网络，如需密码请输入：123456789 。

3）打开手机浏览器，并在地址栏输入“10.10.100.254”即可访问GoKit配置页面，根据提示输入可用WiFi网络SSID及密码，点击配置。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/16.png)


4）等待30秒到一分钟，当GoKit上WiFi模组的指示灯交叉闪烁时，表示配置完成。

##  第三步：使用IoE Demo控制GoKit

完成GoKit的网络配置后，GoKit已经通过路由器连接互联网，你可以使用“IoE Demo”对GoKit进行状态的查询以及控制（包括局域网和远程）。

### 绑定设备

确保手机与GoKit连接同一个WiFi网络，打开IoE Demo，刷新设备列表你将可以发现一台未绑定的新设备“微信宠物屋”，如图

![Alt text](/assets/zh-cn/deviceDev/Gokit2/17.png)


点击设备将自动进行绑定，如果你从未注册、登录IoE Demo，GoKit将绑定当前手机，在不更换手机的情况下，你可以对设备进行所有的状态查询与远程控制等功能，更换手机后需要重新在局域网下进行绑定。如果你希望在不同的手机下对GoKit进行控制，可以先注册账号并登录后进行绑定操作，绑定完成后只需使用账号登录，在不同手机都可以对GoKit进行远程控制。

### 局域网控制设备

绑定完成后，设备显示“局域网在线”，点击进入设备界面，即可查看GoKit最新状态以及进行控制操作。

###  远程控制设备

保持GoKit连接，手机关闭WiFi或切换到其他WiFi网络，此时”IoE Demo” App将自动识别网络环境并切换到远程连接模式。

##   第四步：使用微信控制GoKit

微信从5.x版本开始，支持服务号设备功能。通过微信扫描设备二维码关注设备公众号后即可以实现对设备的控制。机智云作为微信设备号首批技术合作伙伴，在GoKit上也加入微信控制的功能，而GoKit也是目前世界上唯一一款开通了服务好设备功能的智能硬件开发板。使用微信控制GoKit具体步骤如下：

1）打开GoKit附带的说明书，找到一张白色二维码（此二维码每台设备唯一，请注意保管）。如图：

![Alt text](/assets/zh-cn/deviceDev/Gokit2/18.png)


2）打开微信扫描说明书上的二维码，点击“关注”并进入公众号。

3）点击“窝窝”，公众号将返回你绑定的设备列表。点击进入设备主界面，如图

![Alt text](/assets/zh-cn/deviceDev/Gokit2/19.png)


4）在此界面上你可以看到宠物屋（GoKit）当前的状态，并可以通过点击“送风”或“抽湿”对GoKit上的电机进行控制。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/20.png)


## 第五步：二次开发

新版本的DEV SDK同样支持GoKit2，二次开发可参考如下文档：
    
- 代码自动生成及二次开发请参考 [GoKit3代码自动生成工具](./DevSDK/代码自动生成工具.html)
- STM32版GoKit2代码介绍请参考 [GoKit3(V)源码详解](./Gokit3Voice/GoKit3V程序详解.html)
- 暂不支持Arduino版GoKit2。
    
##  第六步：开始您的智能硬件开发之旅

到这里，你已经基本上体验了一款基于GoKit开发的智能硬件原型“微信宠物屋”。这仅仅是机智云团队基于GoKit开发的一款Demo产品，而GoKit本身就是一块功能强大的智能硬件开发板，你可以完全根据自己的想法，利用GoKit做出更好玩的产品，这就是你智能硬件创业的第一步。

机智云提供“微信宠物屋”整套Demo的开源代码：

[智能宠物屋”MCU源码 for GoKit（1代、2代STM、2代Arduino）](http://dev.gizwits.com/zh-cn/developer/resource/hardware?type=GoKit)

[智能宠物屋”Demo App （iOS、Android）](http://dev.gizwits.com/zh-cn/developer/resource/open_source?type=demo_app)

为了让你更快掌握GoKit的开发，我们提供了一系列的教学视频：

[进入视频教学](http://dev.gizwits.com/zh-cn/developer/learn)

在你开发过程中，会使用到的一系列开发文档：

[进入文档中心](http://docs.gizwits.com)

如果你需要更多机智云的开发工具及其他资源，请前往下载中心：

[进入下载中心](http://dev.gizwits.com/zh-cn/developer/resource/hardware?type=GoKit)

与全国各地智能硬件开发者交流，请前往机智云开发者社区：

[加入开发者社区](http://club.gizwits.com/forum.php)

更多的开发教程请查看社区**GoKit开源套件**板块

> [*GoKit开源套件*](http://club.gizwits.com/forum-133-1.html)

**有任何疑问或技术支持，请联系我们：**

机智云众创联盟QQ群：104975951

机智云客服QQ：800099639

机智云客服热线：400-6525-488

