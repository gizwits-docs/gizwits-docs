title: SOC快速入门
---
# 概述
智能灯，是一个简单常见的智能产品，硬件电路简单，程序本身也不复杂；下面我们使用gokit3（s）开发板和机智云云端，实现如何将一个传统的灯泡，低成本改造成可以远控开关的智能灯。

**下面我们使用GoKit3（S）开发板，基于esp8266模块上的SoC方案，开发的智能灯项目为例，示范一下如何将设备快速接入机智云，实现硬件智能化。**

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

**其他：**

1）机智云开发者账号
2）微信宠物屋 for GoKit3(S) ESP8266 V03000003源码（机智云下载中心可获得）
3）智能灯项目自动生成SoC源码（请继续查看下述操作，即可生成获得）


**补充说明：**

1）如果没有GoKit3的小伙伴也可以参考GoKit3的原理图基于esp8266模块（模块的Flash必须为4Mbyte，建议模块型号：安信可的esp-12f）自行搭建硬件，原理图链接如下：http://club.gizwits.com/thread-2889-1-1.html
2）GoKit3（S）购买链接：https://shop159680395.taobao.com/ （机智云官方店）



## 2.开始开发

### 2.1 注册开发者账号

机智云开发者账号，用于产品接入、设备管理、OTA服务、MCU开发等的功能使用。
注册链接：http://dev.gizwits.com/zh-cn/developer/


### 2.2新建产品

注册完成后，登陆至机智云开发者中心后台后，点击开发者中心后台右上角的**“创建新产品”**菜单，在跳转页面新建一个名为**“GizLamp”**的产品，选择**“Wi-Fi/移动网络方案”**方式接入，并完成产品创建。如下图：

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410297895.png)

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410303591.png)


### 2.3云端数据点（产品功能点）

**数据点介绍：**

**数据点：**即设备产品的功能的抽象，用于描述产品功能及其参数。创建数据点后，设备与云端通讯的数据格式即可确定，设备、机智云可以相互识别设备与机智云互联互通的数据。更多的解析和新建指引，可以在开发者中心数据点页面右上角“定义数据点教程”中查看找到帮助，以建立属于你自己产品的数据点，如下图：

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410323764.png)

**新建数据点：**

然后以本次的项目“GizLamp”为例，简单描述一下云端数据点和产品的功能点的关系，本次的项目“GizLamp”，它需要实现的功能是远程开灯和关灯，那我们只需在云端建立一个“布尔值”的数据点即可完成这件事，如下图：

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410463103.png)


添加数据点完成之后，点击下图的“应用”即可，完成整个产品的数据点的新建工作。

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410483137.png)

### 2.4 云端自动生成源码

#### 2.4.1自动生成工具介绍：

**自动生成代码工具：**是机智云为了降低开发者的开发门槛，缩短开发周期，降低开发资源投入，机智云推出了代码自动生成服务。云端会根据产品定义的数据点生成对应产品的设备端代码。自动生成的代码实现了机智云通信协议的解析与封包、传感器数据与通信数据的转换逻辑，并封装成了简单的API，且提供了多种平台的实例代码。当设备收到云端或APP端的数据后，程序会将数据转换成对应的事件并通知到应用层，开发者只需要在对应的事件处理逻辑中添加传感器的控制函数，就可以完成产品的开发。使用自动生成的代码开发产品，就不必再处理协议相关的部分了，开发者可以将节省出来的精力集中在产品的核心功能开发上。

- **关于“自动生成代码工具”的更多介绍和帮助，请点击以下链接：** [自动生成代码工具](/zh-cn/deviceDev/DevSDK/%E4%BB%A3%E7%A0%81%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%E5%B7%A5%E5%85%B7.html)


**获取本次（GizLamp）项目，云端自动生成基于esp8266的SoC源码：**

完成产品的数据点新建之后，点击页面的左侧菜单栏的“MCU开发”根据页面提示选择“SOC方案”，目前SOC方案机智云云端默认的“硬件平台”为esp8266，选择完成之后下拉至页面底部，点击“生成代码包”，等待大概30秒左右即可生成基于esp8266的本次项目（GizLamp）代码包，下载下来即可，由于下载下来的文件名过于长，并且在文件名里包含了产品的ProductKey，所以本次项目将下载下来的文件名修改为“GizLamp”如下图：

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410499518.png)


**补充说明：SOC方案自动生成代码工具目前仅支持esp8266。**

#### 2.4.2 项目源码二次开发指引：

整个云端自动生成的SOC源码里面，用户只需要关心文件路径为“GizLamp\app”下面的几个地方：

如果你需要添加8266的外设，只需要在
- **“GizLamp\app\driver”**文件目录下添加相应外设的驱动的.c文件
- **“GizLamp\app\include\driver”**文件目录下添加相应外设的驱动的.h文件

App通过云端下发控制事件处理，可以在
- **“GizLamp\app\Gizwits”**文件目录下**“gizwits_product.c”**文件里面的
- **“gizwitsEventProcess（）**函数里添加驱动外设执行事件函数即可实现控制设备

上报云端状态事件处理，可以在
- **“GizLamp\app\user”**文件目录下“user_main.c”文件里面的**“userTimerFunc（）”**函数里添加数据状态上报函数即可以实现状态上报。

在这套SOC源码里面需要关心也就这几个主要的地方，模块联网以及底层驱动均不需要开发者去处理和修改。

#### 2.4.3 前往机智云下载中心，下载“微信宠物屋 for GoKit3(S) ESP8266 V03000003”SoC源码库

**“微信宠物屋 for GoKit3(S) ESP8266 V03000003”**这个是机智云工程师使用GoKit3（S）板，基于esp8266硬件平台写的案例，案例里面包含了红外传感器，温湿度传感器，小电机，RGB灯，用户按键等几个外设的驱动，可以直接复制到任何一个GoKit3（S）的板子上使用，也可以移植至其他的8266板子上去使用，获取源码方式如下图：

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410520403.png)

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410527525.png)


**备注：如需深入了解这个“微信宠物屋”这个实例源码的解析可以参考以下链接：**
[微信宠物屋实例源码的解析](/zh-cn/deviceDev/WiFiSOC/GoKit3S%E7%A8%8B%E5%BA%8F%E8%AF%A6%E8%A7%A3.html)


#### 2.4.4 从“微信宠物屋 for GoKit3(S) ESP8266 V03000003”案例中移植“GizLamp”项目所需要的led驱动的.c和.h文件。

- 将**“gokit3_SoC_ESP8266_03000003_2016120711\app\driver”**文件目录下的
   **“hal_rgb_led.c”**的c文件复制至**“gizlamp\app\driver”**下
   
![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410538947.png)


- 将**“gokit3_SoC_ESP8266_03000003_2016120711\app\include\driver”**文件目录下的   **“hal_rgb_led.h”**的h文件复制至**“gizlamp\app\include\driver”**下

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410551854.png)

完成以上动作之后就完成SOC文件的准备工作，下面进行修改相应的c文件。


#### 2.4.5 修改“GizLamp”的SOC源码文件

这里我使用Sublime软件打开整个工程的，然后需要修改的两个文件，如下：

- **“GizLamp\app\user”**文件目录下**“user_main.c”**文件
  外设的驱动初始化，在这个c文件里面的**“user_init（）**函数中完成

- **“GizLamp\app\Gizwits”**文件目录下**“gizwits_product.c”**文件
  云端下发的数据，在这个c文件里面的**“gizwitsEventProcess（）”**函数中处理


- 程序修改部分说明如下图：

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410564904.png)



**云端自动生成SOC源码的其他说明**

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


首先在**“user_main.c”**文件里面添加以下头文件

 - **#include "driver/hal_rgb_led.h"**

接着在**“user init（）”**函数里面的**“//user init”**部分添加以下两条函数，用于初始化GoKit3上面的RGB灯，这两条函数可以在**“hal_rgb_led.c”**文件里找到。

- **//LED初始化函数**
- **rgbGpioInit（）**
- **rgbLedInit（）;**
@

- 添加**“#include "driver/hal_rgb_led.h"”**头文件

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410801710.png)

- 在**“user_main（）”**函数里添加rgb灯的驱动函数

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410831716.png)

然后在**“gizwits_product.c”**文件里面添加以下头文件

  - **#include "driver/hal_rgb_led.h"**  
  
接着在**“gizwitsEventProcess()”**函数里面的**“//user handle”**部分添加以下函数用于驱动GoKit3上面的RGB灯，使RGB灯开和关的动作；也可以修改**rgbControl（）**这条函数的参数控制rgb灯的组合色，每一个参数输入范围在“0~254”之间，这条函数可以  在**“hal_rgb_led.c”**文件里找到。


- **//LED 控制函数**
- **rgbControl（0，0，0）;//关灯**
- **rgbControl（254，254，254）;//开灯**
@

-  添加**“#include "driver/hal_rgb_led.h"”**头文件

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410953054.png)

- 在**“gizwitsEventProcess（）”**函数添加灯的开关事件

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410973316.png)

完成以上动作之后，进行SoC编译开发环境的搭建，请参考 >> 第6）点

#### 2.4.6 搭建SoC源码编译开发环境

- 请参考这里：[开发环境准备](/zh-cn/deviceDev/WiFiSOC/GoKit3S%E4%BA%8C%E6%AC%A1%E5%BC%80%E5%8F%91.html#GoKit3-S-开发环境准备)
	
![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483410993024.png)


**补充说明：新手入门建议使用virtualbox+乐鑫官方的开发环境，进行二次开发**


#### 2.4.7 SOC源码编译

- 请参考这里：[源码编译](/zh-cn/deviceDev/WiFiSOC/GoKit3S%E4%BA%8C%E6%AC%A1%E5%BC%80%E5%8F%91.html#GoKit3-S-源码编译)

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483411008805.png)

#### 2.4.8 固件烧写

- 请参考这里：[固件下载](/zh-cn/deviceDev/WiFiSOC/GoKit3S%E4%BA%8C%E6%AC%A1%E5%BC%80%E5%8F%91.html#GoKit3-S-固件下载)

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483411027642.png)



## 3. 调试与发布

- 产品调试请参考这里：[调试](/zh-cn/quickstart/%E8%AE%BE%E5%A4%87%E5%BF%AB%E9%80%9F%E6%8E%A5%E5%85%A5.html#调试)

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483411043890.png)


- 产品发布请参考这里：[发布产品](/zh-cn/quickstart/%E8%AE%BE%E5%A4%87%E5%BF%AB%E9%80%9F%E6%8E%A5%E5%85%A5.html#发布产品)

![Alt text](/assets/zh-cn/deviceDev/UseSoc/1483411051018.png)



## 4. 项目完成
- 完成以上步骤，整个项目开发就完成了,如果需要关注更多的开源项目以及和其他开发者深度交流，可以到我们公司的官方论坛进行学习：http://club.gizwits.com/forum.php




