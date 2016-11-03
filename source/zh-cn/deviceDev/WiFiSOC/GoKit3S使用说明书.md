title:  GoKit3(S)使用说明书
---


# 初见GoKit3(S)

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image1.png)

首先您需要弄清楚的有这些：

初步了解GoKit3(S)，没有看的同学请查看 《GoKit3(S)开发套件介绍》

**了解按钮的功能，定义如下表：**

| 按键  | 触发     | 功能            |
|-------|----------|-----------------|
| Reset | 短按     | 复位WiFi模组    |
| Key1  | 短按     | 自定义          |
| Key1  | 长按(3s) | 复位WiFi模组    |
| Key2  | 短按     | 进入Soft AP模式 |
| Key2  | 长按(3s) | 进入AirLink模式 |
| Key3  | 自定义   | 自定义          |


# 下载官方应用

#### 下载GoKit的官方APP （分IOS、安卓两个版本）

##### 方式一：用微信扫说明书上的二维码（首选推荐方式）

首先，使用手机上具有“扫一扫”功能的APP（如微信或扫一扫），扫描说明书上的二维码。

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image2.png)

 **注：说明书上含有两个二维码，印刷在说明书上的二维码才是GoKit对应的APP的下载链接，如上图。**

接下来，点击右上角选择在浏览器中打开，并点击安装。

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image3.png) 

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image4.png)

最后，待APP下载成功后点击安装IOE Demo，等待安装成功后点击完成。

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image5.png) ![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image6.png)

##### 方式二：在**机智云下载中心**中下载

在手机浏览器中登录机智云下载中心：

[*http://site.gizwits.com/zh-cn/developer/resource/demo\_app?protoc=WIFI*](http://site.gizwits.com/zh-cn/developer/resource/demo_app?protoc=WIFI)

根据您手机系统选择对应的下载，将鼠标放到下图二维码位置，即可放大二维码。打开手机的“扫一扫”功能app软件，对准二维码进行扫描，按照提示进行下载并安装即可。（**安装过程与方式一相同**）

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image7.png)

安装成功后可以在桌面看到IOE Demo的图标。

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image8.png)

##### 将GoKit和微信账号绑定：

打开微信软件，使用“扫一扫”功能扫描说明书上的二维码，关注“机智云智能宠物屋”公众号。

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image9.png)

**注：贴在说明书上的二维码为绑定微信用的二维码，不要与上面的APP二维码弄混，效果如上图。**

# 连接到路由器

现在您已经拿到了GoKit，已经下载了APP，那么接下来的一步，就是将您的GoKit连接到您的路由器上去，如何做到呢？GoKit提供两种配置入网方式：AirLink 、 SoftAP。

## 1 AirLink配置入网

##### 给GoKit供电（如下图）

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image10.png)

注意：确认手机已连接可用的路由器，可以上外网，最重要的一点：你要知道自己登陆的WiFi密码哦（后面马上要用到）。

打开机智云APP (IOE Demo)，如果您的APP未使用过，您的APP应该不会显示任何设备（如下图）

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image11.png)

##### 启动GoKit的AirLink配置模式

##### 长按Key2键3秒，待扩展板上常亮绿灯后，说明WiFi模块进入AirLink配置状态（如下图）

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image12.png)

##### 返回APP界面（），点击此界面的右上菜单，点击添加设备（如下图），选择“乐鑫”的WiFi模块后输入您的路由器密码。

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image13.png)

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image14.png) 

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image15.png)

##### 在APP上点击**配置**按钮，等待不超过一分钟，APP就可以提示配置成功（下图）

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image16.png) 

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image17.png)

注：在此期间，您可以看到GoKit的绿灯**熄灭**，说明GoKit 3已连接到您的路由器。

## 2. SoftAP配置入网

##### 打开GoKit的 SoftAP配置模式

##### 短按Key2键，待扩展板上常亮红灯后，说明WiFi模块进入SoftAP配置状态（如下图）。

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image18.png)

##### 打开手机WiFi管理界面（一般在“设置”&gt;“WiFi”中）

> 选择形如“XPG-GAgent-XXXX”的WiFi热点**密码：123456789**（如下图）

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image19.png) 

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image20.png)

> **注意：XXXX是WiFi模组的MAC后四位（如上图的1FDC）。**

##### 打开机智云APP （**注意要从后台彻底关闭APP后再重新再打开一次**）

##### 在弹出的界面中（如下）选择可用的WiFi热点并输入对应的密码

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image21.png)

##### 等待不超过一分钟，APP就可以提示配置成功（下图）

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image22.png)

##### 注：如果看到GoKit的红灯熄灭，说明GoKit 3已连成功接入您的路由器。


# 让GoKit亮起来

##### 设备配置成功后，默认在发现新设备列表，并且未绑定（如下图）

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image23.png)

##### 点击**未绑定**的设备，会自动绑定成功，此时设备进入**可操作**设备列表（如下图）

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image24.png)

##### 点击设备，进入设备的操作页面（如下图），在此页面，您可以对GoKit进行各种控制，也可以收到GoKit跟您返回的各种状态。

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image25.png)

需要注意的几点：

> i. 如果您在设定LED组合颜色中，选择了自定义，您可以分别设定R、G、B的颜色；
> 
> ii. 如果您在设定LED组合颜色中，选择了具体的颜色，您就不可以再对R、G、B进行设置；
> 
> iii. 红外探测和温湿度上报都属于用户触发行为，都是在GoKit上进行触发，在APP上显示；

即使GoKit不在身边依然近在咫尺

GoKit天生支持远程连接，您可以将您的手机切换成2G、3G、4G，然后打开软件，您的GoKit依然存在，点击设备后就如同本地操作一样，唯一不同的就是目前的连接方式是远程连接。


# GoKit3(S)的MCU模式

GoKit3(S)除了支持SOC模式同时支持MCU模式，两者区别请查看《GoKit3(S) 开发套件介绍》中的“2. 了解SOC版与MCU版的区别”一节，以下介绍如何使用MCU模式。

## 1 先确认GoKit3(S)处于SOC模式

因为只有在SOC模式下才能正常烧写固件，所以先确定ESP 8266 WiFi处于模组接口的SOC模式（靠下位置），如下图：

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image26.png)

## 2 烧写ESP8266对应的Gagent程序

使用MCU模式时，ESP8266(WiFi模组)只负责信息的接收与发送，所以WiFi模组需要烧写Gagent源码固件。**Gagent**是机智云开发的可运行在各种通讯模组上的一款应用程序，开发者使用**Gagent**后，只需要关心产品的业务逻辑开发，不用关心数据的通讯功能开发，大大降低了开发的难度。

 新版Gagent程序下载地址：

 [*http://site.gizwits.com/zh-cn/developer/resource/hardware?type=GAgent*](http://site.gizwits.com/zh-cn/developer/resource/hardware?type=GAgent)

 注：要下载ESP8266对应的最新版本，如下图：

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image27.png)

烧写方式：

MCU模式的固件烧写与SOC模式下的固件烧写方式相似，详细方式请查看[*《GoKit3(S) 开发环境搭建、源码编译及固件下载》*](3_GoKit-SoC-ESP8266%20开发环境搭建、源码编译及固件下载.doc)中“3. GoKit3(S)固件下载”中的“3.2 设置烧写选项”一节。

## 3 将模组切换到MCU模式

将GoKit3(S)**断电后**再将ESP8266 WiFi模组从“SOC模式位置”（靠下位置）拔起，重插到“MCU模式位置”（靠上位置），如下图：

![](/assets/zh-cn/deviceDev/WiFiSOC/Instructions/image26.png)

## 4 MCU模式下的GoKit3(S)使用方法

> MCU模式下的GoKit3(S)操作方法与SOC模式下相同，配置入网方式请参照上文“**3. 连接到路由器**”一节。

# 总结

看完此篇相信你已对机智云的智能硬件开放平台有了一定深入的了解，想要开发真正属于自己的智能硬件吗？那么请继续看下面的文档说明，你会对Gokit3的硬件、程序会有个更加深入的了解：

《GoKit3(S)开发环境搭建、源码编译及固件下载》

《GoKit3(S)硬件手册》

《GoKit3(S)程序开发手册》

若想了解整个机智云的开发框架请查看开发者**文档中心**：

[*http://docs.gizwits.com/hc/*](http://docs.gizwits.com/hc/)
