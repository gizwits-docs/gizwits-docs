title:  使用Echo音箱控制GoKit
---
# 1.概述

* 本教程说明了用户使用Gokit除App和微信两种控制方式外第三种控制方式使用说明：Echo音箱控制。

* 亚马逊Echo音箱：Amazon Echo是一款结合智能人工助理Alexa的音箱。
* Alexa：Alexa是Amazon Echo的语音服务提供了功能或技能，使客户能够使用语音以更直观的方式与设备进行交互。 技能的例子包括播放音乐，回答一般问题，设置闹钟或计时器等的能力。
* Alexa Skill：Alexa技能工具包是自助服务API，工具，文档和代码示例的集合，使您能够快速，轻松地向Alexa添加技能。所有代码在云中运行，在任何用户设备上都没有。

* 机智云在Alexa上发布了两款用来控制Gokit的Skill，名字为“GoKit Light”和“Gokit”

| Skill名称 | Skill类型	| 特点以及局限性	| 可控制的功能 | 
|:---:|:----:|----|----|
| GoKit Light	|  SmartHomeSkill	| 控制时省略了进入Skill的语句，唤醒音箱即可控制，可以设置设备的分组和别名，但只能控制数值和布尔型的数据点 |	Gokit上的RGB灯的开关与亮度 | 
| Gokit	|  CustomSkill	|  控制时需要进入Skill的语句，没有分组和别名的概念，但是可扩展性大，可以实现较为复杂的交互功能	| Gokit上的RGB灯的开关，灯的颜色（红绿蓝），马达的开关，马达的转速，温度的获取，湿度的获取 | 



# 2.准备工作

硬件：
* Gokit2 或 Gokit3  
（可以到官方商城购买，链接：[https://59680395.taobao.com/](https://shop159680395.taobao.com/)）
* 亚马逊Echo音箱

软件：
* 机智云Gokit APP

|![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490348483102.png)| ![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490348487655.png)|
|:-:|:-:|
|IOS|Android|

* Alexa APP

  ![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350236195.png)
  
Android客户端下载链接：[http://pan.baidu.com/s/1c2iT2W4](http://pan.baidu.com/s/1c2iT2W4)

IOS客户端（需要在美国地区登陆app store搜索alexa下载）

账号：
* 机智云账号（在机智云Gokit APP里通过手机注册）
* 亚马逊Alexa账号（登陆注册页面：[http://alexa.amazon.com/spa/index.html](http://alexa.amazon.com/spa/index.html)）


# 3.机智云Gokit配置绑定
* 打开机智云Gokit app，通过手机注册，并登陆，跳转到“我的设备”页面，并点击“暂无设备，请添加”。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350664992.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350668220.png)

* 选择你Gokit上wifi模组的类型，并选择你要配置的网络，输入wi-fi密码，点击“下一步”，长按Gokit上key2，使RGB亮绿灯，则点击“下一步”。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350675375.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350680950.png)

* 进入“设备链接网络”的页面，稍等片刻之后，连接成功并跳转到“我的设备”页面，在“发现新设备”一栏中，有一个未绑定的设备，“微信宠物屋”可以通过设置别名来修改，“ACCF2378C44A”为该设备的MAC，点击该设备。
* 注：若配置超时则检查路由器是否是在2.4GHz的频段下，路由器是否能连入外网，若配置成功却没有发现到新设备，请检查你Gokit的MCU程序中的product key，是否为出厂自带的product key。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350704587.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350709259.png)

* 进入该设备的控制页面，当点击开启红色灯，Gokit的灯能够成功点亮，则说明配置成功了，点击返回到“我的设备”，发现该设备已经在“已绑定设备”一栏，则说明Gokit绑定成功。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350716640.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350721813.png)


# 4.Alexa Echo音箱配置和Skill账号关联

## 4.1配置Echo音箱入网
* Echo音响配置和AlexaSkill账号关联有通过Alexa App和网页两种方式来实现
### 4.1.1 用AlexaApp来配置Echo音箱
* 打开AlexaApp，登陆账号，跳转到welcome页面，点击“Begin Setup”，跳转到“Setup”页面，选择你的音响设备，该教程选择Echo Dot。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350829958.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350841981.png)



* 选择你的语言，Echo音箱仅支持英语（美式发音），英语（英式发音），德语，点击“Continue”，跳转到下一页面，点击“Connect to Wi-Fi”。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350848704.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350853579.png)


* 进入如图下页面，若Echo之前未配过网，则将你的Echo Dot电源插座插上，若Echo之前配过网，则将你的Echo Dot电源插座插上，并长按唤醒键（如该符号所示“⊙”），将会有橙色的光圈在转动，则进入了配网模式，点击“Continue”，跳转到Manually connect to Echo页面。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350859063.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350864456.png)

* 打开手机的WiF界面，找到名字为“Amazon-XXX”的WiFi，点击链接，切回AlexaApp，显示已经链接上你的Echo，点击“Continue”。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350871060.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350875898.png)

* 在这个页面选择你要将Echo音箱配置到哪个网路，这里选择将Echo音箱配置到“Giziwits”这个局域网内，输入密码，点击“Connect”。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350882778.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350889709.png)

* 稍等片刻之后，跳转到Setup Complete，则说明配置成功，点击“Continue”。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350895095.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350898553.png)

* 若你的音箱为Echo Dot，则会让你选择如何使用你的Echo Dot，这里选择“No speakers”，就会有个短的宣传视频。若你的音箱为Echo，则直接跳转到宣传视频。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350904421.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350909551.png)

### 4.1.2 用网页来配置Echo音箱
* 点击进入登陆链接：[http://alexa.amazon.com/spa/index.html](http://alexa.amazon.com/spa/index.html)，输入已注册好的账号和密码。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350964062.png)

* 进入Alexa配置页面，点击Begin Setup，选择Echo音箱

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350972497.png)
![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350977623.png)

* 选择你使用的语言

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350987136.png)
* 点击Connect to Wi-Fi

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350992247.png)
* 当你的音箱旋转橙色光环，即进入配置模式，点击continue

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490350997315.png)

* 将你的电脑链接Echo音箱，当Echo音箱进入配置模式时，会发出一个Amazon-XXX的wifi，用电脑进行链接

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351002203.png)

* 链接之后，网页自动切换成该页面，点击Continue

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351006700.png)

* 选择你所要配置的wifi路由器，点击则进入配置，输入密码点击Connet

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351012175.png)

* 稍等片刻后，便配置成功，点击continue。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351018055.png)
![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351022256.png)


## 4.2		Enable Skill和账号关联
* Gokit现支持两种skill，一种是名为“GoKit Light”的SmartHomeSkill，另一种是名为“Gokit”的CustomSkill，“GoKit Light”只能控制
* 点击左上角菜单栏，左边弹出菜单，点击Skill进入All Skill页面，在搜索栏中搜索“Gokit”或者“gizwits”，点击搜索。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351196308.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351200275.png)

* 搜索结果有两个Skill，一个是Smart Home Skill名字为“GoKit Light”，一个Csutom Skill名字为“Gokit”

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351207107.png)

###4.2.1 	Gokit Smart home skill使用

* 点击名为“GoKit Light”的Skill，点击ENABLE，跳转到“Please sign in”的页面，输入在Gokit App下注册的账户，点击“Sign in”。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351212784.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351216044.png)

* 之后跳转到一个是否链接你账号的询问，点击yes，跳转至成功页面，显示Alexa已经成功的和“GoKit Light”连上了。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351220490.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351224008.png)

* 返回该Skill页面，则弹出“Discover Devices”提示框，保证Gokit在线的情况下，点击DISCOVER DEVICES，弹出正在搜索，稍等片刻。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351229694.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351233191.png)

* 进度条结束后，搜索到一个设备，该设备的名字为一串十六进制的MAC地址，切回Gokit App的控制页面，点击右上角菜单，点击设置设备信息。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351241523.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351245166.png)

* 在这里可以输入设备的别名和备注，这里输入别名为“Light”，备注也为“Light”，点击“确定”。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351252109.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351255637.png)

* 显示设置成功之后，返回上一级页面，进入到设备列表页面，发现设备的名字已经修改成了“Light”。
![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351261919.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351265274.png)

* 切回Alexa App，重新点击Discover devices，稍等片刻之后，发现Your Devices显示的不是MAC了，显示的是刚刚修改的别名和备注，然后就可以通过附录中的SmartHomeSkill的控制指令表格，来控制Gokit了。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351269739.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351273120.png)


### 4.2.2 Gokit Custom skill使用
* 点击名为“Gokit”的Skill，点击ENABLE，跳转到“Please sign in”的页面，输入在Gokit App下注册的账户，点击“Sign in”。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351278438.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351281746.png)

* 之后跳转到一个是否链接你账号的询问，点击yes，跳转至成功页面，显示Alexa已经成功的和“Gokit”连上了。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351296881.png)![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351316847.png)

* 回到该Skill的页面，如图下所示，则关联完成，然后就可以通过附录中的CustomSkill的控制指令表格，来控制Gokit了。

![Alt text](/assets/zh-cn/deviceDev/Gokit2/1490351322896.png)


# 5.附录
## 5.1		“GoKit Light”Skill控制语音指令与结果返回语音
* 控制例句示范：Alexa,Turn on the light
* Alexa ->用于唤醒Echo
* Trun on the ->打开的控制指令
* Light ->设备别名或者组名

|用户控制语音指令|Echo音箱回复语音|实际操作效果|
|---|:----:|----|
|Alexa,Turn on the <设备别名>	|Ok|Gokit上的RGB灯亮|
|Alexa,Turn off the <设备别名>|Ok|Gokit上的RGB灯灭|
|Alexa,Set <设备别名> to xx percent|Ok|Gokit上的RGB灯亮度设置为xx％|
|Alexa,Decrease <设备别名> to xx percent|Ok|Gokit上的RGB灯亮度减少xx％|
|Alexa,Increase <设备别名> to xx percent|Ok|Gokit上的RGB灯亮度增加xx％|

## 5.2		“Gokit”Skill控制语音指令与结果返回语音
* 控制例句示范：Alexa,start Gokit turn on the light
* Alexa ->用于唤醒Echo
* start Gokit ->用于进入skill，“Gokit”为skill名称
* Turn on the light ->控制指令

|用户控制语音指令|关键词|音箱回复语音|实际操作效果|
|:---|---|---|---|
|Alexa,Gokit Alexa,start Gokit  Alexa,open Gokit|-|Welcome to gokit. I will now receive commands for your device.If you need more help, say help.For a full list of commands, visit the About this Skill page|进入skill并保持会议模式，提示用户如何控制Gokit，在会议模式中可以直接说控制指令，不用唤醒|
|Alexa,Gokit,turn <关键词> the light  Alexa,Gokit,turn the light <关键词>  Alexa,Gokit,switch <关键词> the light|On / off|The light is <关键词>|打开（关闭）Gokit上的RGB灯|
|Alexa,Gokit,<关键词> motor	Alexa,Gokit,make the Gokit motor <关键词>	Alexa,Gokit,turn <关键词> the motor	Alexa,Gokit,fan <关键词>	/ Alexa,Gokit,motor <关键词>|Start / stop / on / off / run / work|The motor is now running / The motor has stopped|运行（停止）Gokit上的马达|
|Alexa,Gokit,<关键词> motor  Alexa,Gokit,motor speed <关键词>  Alexa,Gokit,speed  <关键词> / Alexa,Gokit,<关键词>|Accelerate / decelerate / down / up / faster / slower|The motor speed has increased(decreased) / The motor is already running at top speed(达到最高速度时对其加速) / The motor has stopped and its speed cannot be decreased anymore.(马达停止时对其减速) / Please turn on the motor first before changing the speed.(马达停止时对其加减速)|加速（减速）Gokit上的马达|
|Alexa,Gokit,<关键词> light Alexa,Gokit,change the <关键词> light|Red / green / blue|the light is <关键词>|改变Gokit上RGB灯的颜色为红、绿、蓝|
|Alexa,Gokit, <关键词> Alexa,Gokit, tell me the <关键词> Alexa,Gokit, tell me what is the <关键词>|Temperature / humidity|The temperature is xx degree / The humidity is xx percent|通过Gokit获取当前环境下的温度和湿度|
|Alexa,start Gokit and help|-|You can command your GoKit to turn on the light or motor. You may also ask your GoKit to tell you the humidity and temperature.For a full list of commands, please refer to the Skill card details in the alexa application program.|帮助用户如何使用该skill并保持会议模式|
|<关键词>|see you later / bye-bye / thank bye / goodbye / see you / bye|Thank you for using gizwits skill,Have a nice day!|需在会议模式中使用，用于结束会议模式|
