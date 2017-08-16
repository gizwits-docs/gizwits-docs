title: Arduino Uno WiFi智能小夜灯
----


# 1. 前文需知
## 1.1 项目说明
智能灯作为一种最为常见的智能家居设备，在市场前景以及低门槛的驱动下，该产品已经成为开发者已经众多厂家青睐的大众化产品。你可以使用手机控制灯光开启或关闭、调节亮度及颜色甚至与音响系统同步闪烁，这种体验听上去就很有趣。

本作品希望通过将使用Arduino Uno WiFi板结合GoKit2上的功能板，配合WS2812 8段RGB灯珠板子，使用机智云云端服务器，改造成可用手机来控制的无线wifi小彩灯，还原这个受大众欢迎的炫彩智能灯神秘的本质。

## 1.2 彩灯功能说明
 - 开关
 - 多种模式自由切换，这些模式包括：自定义、呼吸灯、霹雳游侠、极光、温馨


附注：本例只实现彩灯的一些常用功能，更多的自定义和应用场景，用户可根据自己	的需求自定义完成

## 1.3 项目所使用的硬件清单
Arduino Uno WiFi  1片
GoKit2 扩展版 1片
8位 WS2812 5050 RGB LED 小板  1个
杜邦线若干

## 1.4 项目所用的开发环境
Arduino IDE（1.7.10以上版本）

## 1.5 项目所使用的源码
WS2812 5050 RGB LED Arduino 库文件
机智云云端自动生成源码（基于ArduinoUnoWiFi 平台）

## 1.6 其他
机智云开发者账号
智能小夜灯的数据点文件或者自己云端新建

# 2.项目制作
## 2.1 硬件部分
使用烙铁将杜邦线，按照下图把WS2812 RGB小灯板的接线线焊接起来。

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486547446724.png)

然后把小灯板的VCC、GND、DIN引脚分别按照下图图片所展示的效果图，将杜邦线的另一端接到GoKit2拓展版的扩展接口排针上。
 - DIN -> D9

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486547468263.png)


## 2.2 云端部分

### 2.2.1 注册GizWits账号

登陆 http://dev.gizwits.com/zh-cn/developer/ 进行注册账号


### 2.2.2 新建一个名为“智能小夜灯”的产品

新建产品方式参加以下链接图示部分：[新建产品教程](http://docs.gizwits.com/zh-cn/quickstart/%E8%AE%BE%E5%A4%87%E5%BF%AB%E9%80%9F%E6%8E%A5%E5%85%A5.html#在机智云官网创建设备产品)

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486546612165.png)

### 2.2.3 云端数据点
本次项目一共5个数据点，细节可以参考下图：

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486546625540.png)

新建项目的数据点可以通过两种方式来完成，一种是手动新建，新建方式可以点击下图右上角的“定义数据点教程”查看并建立本次项目的数据点；另一种是通过别人导出的数据点Excel表格完成数据点的新建，导入方式参考下图，这里不做重点描述，这次项目的数据点Excel表格通过下方链接获取。

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486546640454.png)

本次项目数据点Excel表格下载链接：
链接：https://pan.baidu.com/s/1bLznVw 密码: ustg

手动添加数据点参考一下链接：[手动添加数据点教程](http://docs.gizwits.com/zh-cn/quickstart/%E8%AE%BE%E5%A4%87%E5%BF%AB%E9%80%9F%E6%8E%A5%E5%85%A5.html#创建数据点)
![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486546762858.png)


注意：数据点环节很重要，如果没有数据点，则无法使用自动生成工具。

### 2.2.4 使用云端自动生成工具，生成项目源码
云端自动生成工具的详细介绍和使用方式，请参考“ArduinoUNOWiFi接入机智云介绍”文档的介绍和操作。



到这里整个工程项目的准备工作就完成了，下面是修改函数部分的指引。

## 2.3 获取源码
### 2.3.1 下载云端自动生成源码
ArduinoUNOWiFi 云端自动生成源码，创建之后在项目如图所示的地方获得，下载下来后跟据自己的习惯修改文件夹的名字，本次项目将文件修改为“GizLamp”

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486546933999.png)

### 2.3.2 下载WS2812驱动库文件

库文件链接：https://github.com/adafruit/Adafruit_NeoPixel
本次项目所需要的文件如下

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486546945687.png)

### 2.3.3 Arduino IDE安装
请参考“Arduino Uno WiFi接入机智云介绍”文档中，第“3.1 Arduino IDE的下载和安装”章节

### 2.3.4 工程文件和Libraries文件导入到
请参考“ArduinoUNOWiFi接入机智云介绍”文档中，第“3.2 自动生成接入库导入Arduino IDE”章节


## 2.4 修改源码
### 2.4.1 程序预览
首先，我们使用Arduino IDE打开云端自动生成工具生成的simpleTry.ino文件，并预览一下，如下图：

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486546964958.png)

然后，我们参见“ArduinoUnoWiFi SDK之API介绍”文档里的对“事件处理”这一部分的描述以及举例部分程序结构：

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486546979198.png)

之后，在继续看一下`myGizwits.hasBeenSet()`和`myGizwits.read(,)`这两条函数的解析：

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486547079925.png)

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486547086968.png)

通过对比的我们应该了解到这套程序的思路是，如果需要在这套程序中读取一个云端下发的数据，首先需要通过`myGizwits.hasBeenSet()`这条函数判断这个数据点事件有是否发生，如果数据点事件发生了就通过`myGizwits.read(,)`这个函数去把发生的事件所产生的数据读取出来，然后再做相应的判断。

注意：read(,)在“ArduinoUnoWiFi SDK之API介绍”一共有四条，读取不同是据点事	件时，返回值的参数会有差异，使用之前参考“ArduinoUnoWiFi SDK之API介绍”文	档

应该大体有个理解啦吧！其实你会发现所有你要操作的事件都完成好了！！好，那我们开始修改程序，首先从“2.4.2引用部分开始”

### 2.4.2 引用部分
1）添加WS2812驱动H文件

`#include <Adafruit_NeoPixel.h>`
![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486547101769.png)

2）定义WS2812的数据通信引脚，以及RGB灯数量。
`#define PIN 9`         //使用arduino uno wifi的9号引脚
`#define NUM_LEDS 8`    //WS2812小板的数量是8个
![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486547108566.png)

3）初始化LED数量、通信引脚号和驱动模式

`Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUM_LEDS, PIN, NEO_GRB + NEO_KHZ800);`
![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486547114920.png)

1）该函数中NUM_LEDS，表示控制的点亮多少个全彩灯珠，如果你想改变灯珠点亮的个数你可以	在	这里进行修改。
2）PIN表示的是与开发板所连的第几个端口，我们这里使用的是第9个端口，你可根	据自己的需要	修改对应的端口。
3）关于NEO_GRB+NEO_KHZ800，这包括了与开发板所连的具体类型。具体的介绍可以参考文本最	后	Adafruit_NeoPixel库文件的解析，以及根据指导完成更多的案例。

引用部分完整修改参考如下

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486547121948.png)


接着修改“2.4.3 void setup(){}部分”

### 2.4.3 void setup(){}部分
将以下代码添加到“void setup（）{}”函数里面用于初始化

`strip.begin();`
`strip.show(); `// Initialize all pixels to 'off'
![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486547136712.png)

最后修改“2.4.4 void loop(){}部分”
### 2.4.4 void loop(){}部分
这一部份我们刚才已经熟悉过啦，那直接修改吧。首先，把所有自动生成工具，所定义的变量全部找出来，如下：
![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486547148889.png)

注：红色部分是从绿色部分复制出来的，绿色部分是自动工具自动生成的。
然后，移动操作事件，如下：
![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486547155513.png)

完成以上动作之后，只要在//user add这部分添加相应的驱动函数，就可以完成一个简单的彩灯，不过程序需要优化，才能有比较友好的用户体验。
需要注意地方是：

彩灯场景切换事件（EVENT_SCENE）
以及用户自定义事件（EVENT_RLAMP||EVENT_GLAMP||EVENT_BLAMP），均使用以下函数	读取云端下发的数值；只不过场景切换事件在云端创建的数据点类型是枚举型，使用	以下函数读取云端下的数值时，该函数返回的值为：0,1,2,3,4；而在用户自定义事件	下实用函数，返回的值为：0~255
![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486547163041.png)

## 2.5 编译烧录
请参考“ArduinoUNOWiFi接入机智云介绍”文档中，第“3.3.2上传simpleTry.ino（数据点示例）”章节

 - 注意：这里的案例修改是彩灯部分程序，不包含配置wifi入网环节，产品联网需要先更新“networkconfig.ino（配置网络示例）”工程到ArduinoUNOWiFi板子上，进行配网，然后在更新本次的工程文件“simpleTry.ino（数据点示例）”产品才能正常连接路由器登陆云端。更新“networkconfig.ino（配置网络示例）”工程请参考“ArduinoUNOWiFi接入机智云介绍”文档中，第“3.3.1上传networkconfig.ino（配置网络示例）”章节


# 3.项目调试
## 3.1 下载Demo App
前往机智云[下载中心](http://download.gizwits.com/zh-cn/p/98/99)，根据下图提示实用手机扫描下载调试产品的Demo App，调试产品体验产品。


![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486547212305.png)

## 3.2 产品体验
使用Demo App局域网内发现，并绑定彩灯之后，App的操作界面，一个完整的彩灯制作就完成了。
![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486547283768.png)

注意：
局域网发现为：ArduinoUnoWiFi板子和Demo App处于同一个WiFi热点下，Demo App才会发现这个设备，否则无法发现，从而无法就使用Demo App去绑定和操作这个设备。举个例子，ArduinoUnoWiFi板子被配置了链接到名字为“Gizwits”这个WiFi热点（确定已连接，并要确定Gizwits这个热点是可以链接外网），那么使用Demo App的那部手机也需要链接到名为“Gizwits”这个热点下，否则就无法发现设备。


 - 产品制作完成

最后附上本次项目的源码下载链接如下：
链接：http://pan.baidu.com/s/1c1BROha 密码：bzw5



# 4.相关支持
 - 1)如果您是开发者

GoKit是面向智能硬件开发者限量免费开放，注册我们的论坛或关注我们的官方微信均可发起申请即可。

开发者论坛： http://club.gizwits.com/forum.php

文档中心：http://docs.gizwits.com/hc/

 - 2)如果您是团体

GizWits针对团体有很多支持计划，您可以和GizWtis联系，快速得到GoKit以及技术支持；

网站地址：http://www.gizwits.com/about-us

官方二维码：

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/example/1486547295153.png)
