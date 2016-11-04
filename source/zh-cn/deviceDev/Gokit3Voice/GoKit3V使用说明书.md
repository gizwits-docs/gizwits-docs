title:  GoKit3(V)使用说明书
---


#  初见GoKit3(V)

![](/assets/zh-cn/deviceDev/Gokit3Voice/Instructions/image1.jpeg)

首先您需要弄清楚的有这些：

##### 1.  初步了解GoKit3(V)，没有看的同学请查看《Gokit3系列开发套件简介》。

##### 2.  了解按钮的功能，定义如下表：

|      |          |                 |
|------|----------|-----------------|
| 按键 | 触发     | 功能            |
| Key1 | 短按     | 自定义          |
| Key1 | 长按(3s) | 复位WiFi模组    |
| Key2 | 短按     | 进入Soft AP模式 |
| Key2 | 长按(3s) | 进入AirLink模式 |
| Key3 | 自定义   | 自定义          |

##### **注意：**

功能板支持MCU/SoC两种方式，GoKit3(V)使用MCU的方式连接(天线朝向电机一方)，配合底板MCU进行产品开发。


#  下载官方应用

#### 1.  下载GoKit的官方APP （分IOS、安卓两个版本）

##### 方式一：用微信扫说明书上的二维码（首选推荐方式）

首先，使用手机上具有“扫一扫”功能的APP（如微信或扫一扫），扫描说明书上的二维码。

![](/assets/zh-cn/deviceDev/Gokit3Voice/Instructions/image2.png)

**注：说明书上含有两个二维码，印刷在说明书上的二维码才是GoKit对应的APP的下载链接，如上图。**

接下来，点击右上角选择在浏览器中打开，并点击安装。

![](/assets/zh-cn/deviceDev/Gokit3Voice/Instructions/image3.png) ![](/assets/zh-cn/deviceDev/Gokit3Voice/Instructions/image4.png)

最后，待APP下载成功后点击安装IOE Demo，等待安装成功后点击完成。

![](/assets/zh-cn/deviceDev/Gokit3Voice/Instructions/image5.png) ![](/assets/zh-cn/deviceDev/Gokit3Voice/Instructions/image6.png)

##### 方式二：在**机智云下载中心**中下载

 在手机浏览器中登录机智云下载中心：

 [*http://site.gizwits.com/zh-cn/developer/resource/demo\_app?protoc=WIFI*](http://site.gizwits.com/zh-cn/developer/resource/demo_app?protoc=WIFI)

根据您手机系统选择对应的下载，将鼠标放到下图二维码位置，即可放大二维码。打开手机的“扫一扫”功能app软件，对准二维码进行扫描，按照提示进行下载并安装即可。（**安装过程与方式一相同**）

![](/assets/zh-cn/deviceDev/Gokit3Voice/Instructions/image7.png)

安装成功后可以在桌面看到IOE Demo的图标。

![](/assets/zh-cn/deviceDev/Gokit3Voice/Instructions/image8.png)

##### 将GoKit和微信账号绑定：

> 打开微信软件，使用“扫一扫”功能扫描说明书上的二维码，关注“机智云智能宠物屋”公众号。

![](/assets/zh-cn/deviceDev/Gokit3Voice/Instructions/image9.png)

**注：贴在说明书上的二维码为绑定微信用的二维码，不要与上面的APP二维码弄混，效果如上图。**


# 连接到路由器

现在您已经拿到了GoKit，已经下载了APP，那么接下来的一步，就是将您的GoKit连接到您的路由器上去，如何做到呢？

#### 3.1 配置入网

给GoKit供电

注意：确认手机已连接可用的路由器，可以上外网，最重要的一点：你要知道自己登陆的WiFi密码哦（后面马上要用到）。

打开机智云APP (IOE Demo)，如果您的APP未使用过，您的APP应该不会显示任何设备（如下图）

![](/assets/zh-cn/deviceDev/Gokit3Voice/Instructions/image10.png)

点击此界面的右上菜单(1)，点击添加设备(2)（如下图），模组类型选择“宇音天下(3)”，然后输入您的路由器SSID(4)、密码(5)。填完后点击下一步(6).

![](/assets/zh-cn/deviceDev/Gokit3Voice/Instructions/image11.png) ![](/assets/zh-cn/deviceDev/Gokit3Voice/Instructions/image12.png)

按照下图(7)所示配置开发套件进入配置模式，点击“已完成上述操作(8)”后，点击“下一步(9)”,您可以听到较高频率的声音.

![](/assets/zh-cn/deviceDev/Gokit3Voice/Instructions/image13.png)![](/assets/zh-cn/deviceDev/Gokit3Voice/Instructions/image14.png)

![](/assets/zh-cn/deviceDev/Gokit3Voice/Instructions/image15.jpeg)

当听到喇叭提示“**接收成功正在联网**”后表示配置成功，待语音提示“**联网成功**”就可以是进行控制了。

注：在此期间，您可以看到GoKit的绿灯**熄灭**，说明GoKit 3已连接到您的路由器。


#  让GoKit亮起来

##### 使用唤醒词“玛莉玛莉”唤醒GoKit

对着GoKit说“玛莉玛莉”，听到喇叭“嘀”的提醒音说明GoKit已经被唤醒，可以接收控制指令了。

##### 语音控制

GoKit唤醒之后，对她说“打开红色灯光”，GoKit就会将RGB灯点亮，并显示为红色。

其他控制传感器同理。

**注意：**

除语音控制外，还支持APP控制，使用方法与其他模组一样。

##### 即使GoKit不在身边依然近在咫尺

GoKit天生支持远程连接，您可以将您的手机切换成2G、3G、4G，然后打开软件，您的GoKit依然存在，点击设备后就如同本地操作一样，唯一不同的就是目前的连接方式是远程连接。

#  总结

看完此篇相信你已对机智云的智能硬件开放平台有了一定深入的了解，想要开发真正属于自己的智能硬件吗？那么请继续看下面的文档说明，你会对Gokit3的硬件、程序会有个更加深入的了解：

《GoKit3硬件手册》
《GoKit3系列开发套件简介》

若想了解整个机智云的开发框架请查看开发者**文档中心**：

> [*http://docs.gizwits.com/hc/*](http://docs.gizwits.com/hc/)
