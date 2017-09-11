title:  使用Google Home音箱控制GoKit
---
# 1.概述

* 本教程说明了用户使用Gokit除App和微信两种控制方式外第三种控制方式使用说明：Google Home音箱控制。

* Google Home音箱：Google Home音箱是一款结合Google Assistant语音助理的音箱，我们可以通过这位助理获得大多数的帮助，比如计时器、播放音乐或者回答简单的问题，同时也可以控制我们的智能家居。
* Google Assistant：Google Assistant是一款语音助手，它并不是一种单独的程序，这款新的技术会和谷歌不同的设备以及操作系统机密结合，旨在让用户通过“流畅”的语音和设备相互沟通。它也能够使用在第三方的应用和服务中，例如流媒体音乐服务、打车服务等。
* Action and Google：Action是在Google Assistant上建立应用程序，你的程序可以让用户通过Google Home，支持Google的安卓手机，iphone去唤Action的名字，然后与你的程序进行交互。

* 机智云在Google Assistant上发布了一款用来控制Gokit的Action，名字为“Gokit”

| Action名称 |  可控制的功能 |
|:---:|----|
| GoKit |  	Gokit上的RGB灯的开关与红绿蓝三种颜色 |
| GoKit |  	Gokit上的电机的开关 |




# 2.准备工作

硬件：
* Gokit2 或 Gokit3  
（可以到官方商城购买，链接：[https://59680395.taobao.com/](https://shop159680395.taobao.com/)）
* GoogleHome音箱、支持Google的Android6.0+手机、美国地区账号的iphone （中国大陆的用户需要VPN或可以翻墙的路由器）

软件：
* 机智云Gokit APP

|IOS|Android|
|:-:|:-:|
|![Alt text](/assets/zh-cn/UserManual/GoogleHome/iOS Gokit.png)| ![Alt text](/assets/zh-cn/UserManual/GoogleHome/安卓Gokit.png)|

* Google Home App （版本为1.26.93937以上） 或  Google App （版本为7.7以上）

![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504518981949.png)
![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504519038270.png)

Android客户端（需在Google Play Store进行下载）
IOS客户端（需要在美国地区注册的账号登陆App Store进行下载）

账号：
* 机智云账号（在机智云Gokit APP里通过手机注册）
* Google账号


# 3.机智云Gokit配置绑定
* 打开机智云Gokit app，通过手机注册，并登陆，跳转到“我的设备”页面，并点击“暂无设备，请添加”。

![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504519121740.png)![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504519125671.png)



* 选择你Gokit上wifi模组的类型，并选择你要配置的网络，输入wi-fi密码，点击“下一步”，长按Gokit上key2，使RGB亮绿灯，则点击“下一步”。

![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504519134772.png)![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504519149650.png)




* 进入“设备链接网络”的页面，稍等片刻之后，连接成功并跳转到“我的设备”页面，在“发现新设备”一栏中，有一个未绑定的设备，“微信宠物屋”可以通过设置别名来修改，“ACCF2378C44A”为该设备的MAC，点击该设备。
* 注：若配置超时则检查路由器是否是在2.4GHz的频段下，路由器是否能连入外网，若配置成功却没有发现到新设备，请检查你Gokit的MCU程序中的product key，是否为出厂自带的product key。

![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504519160171.png)![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504519164056.png)



* 进入该设备的控制页面，当点击开启红色灯，Gokit的灯能够成功点亮，则说明配置成功了，点击返回到“我的设备”，发现该设备已经在“已绑定设备”一栏，则说明Gokit绑定成功。

![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504519173799.png)![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504519178119.png)



# 4.Google Home音箱配置和Action账号关联

## 4.1配置Google Home音箱入网
### 4.1.1 用Google Home App来配置Google Home音箱（Android系统手机）
* 给音响插上电源，让Google Home处于白色呼吸灯状态（若不是呼吸灯状态，请长按背后的禁麦克风按钮至橙圈完整）打开Google Home App，登陆账号，进入到Home 页面，点击右上角设备的按钮，跳转到“Devices”页面，这个页面会发现到你的google home，点击SET UP进入下一个界面
* ps：若Google Home并未处于呼吸灯状态，此页面将不会发现Google Home设备，请长按背后的禁麦克风按钮至重置


![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504581881622.png)![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504581902333.png)


* 进入Google Home setup 页面，点击CONTINUE，等待手机自动链接Google Home的Ap热点。

![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504581922894.png)![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504581938403.png)


* 稍等片刻之后，手机连上了GoogleHome3232.k的热点，点击PLAY TEST SOUND，音箱发出声响即处于正常配网流程

![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504582023933.png)![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504582040335.png)

* 如果听见音响发出声响则点击I HEARD IT，如果没有则点击TRY AGAIN，进入下一界面选择你音箱的名字，点击CONTINUE。

![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504582065156.png)![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504582083221.png)

* 在这个页面选择你要将Google Home配置到哪个网路，这里可以选择通过手机获取密码，或者手动输入密码，输好密码之后，点击"CONTINUE"，然后显示配置成功的提示

![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504582138265.png)![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504582155606.png)


* 配置一些Google Home的基本参数以及使用向导之后，回到Home主界面，就可以看到自己的Google Home设备了

![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504582272616.png)

### 4.1.2 用Google Home App来配置Google Home音箱（IOS系统手机）

* 采用蓝牙的方式配网，具体请参考该链接（[https://support.google.com/googlehome/answer/7029485?hl=en&ref_topic=7196250&co=GENIE.Platform%3DiOS&oco=0](https://support.google.com/googlehome/answer/7029485?hl=en&ref_topic=7196250&co=GENIE.Platform=iOS&oco=0)）

## 4.2		唤醒Action和账户关联

### 4.2.1 用Google Home唤醒Action
* 保持Google Home处于麦克风打开状态，对Google Home说"Ok,Google.Talk to gokit"，之后DISCOVER页面会弹出GOKIT的用户条款还有账户链接，滑动到账户链接，点击"LINK"进入账户关联页面

![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504585109265.png)![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504585089779.png)

### 4.2.2 用手机唤醒Action

* 进入Google页面，长按Home键，弹出Google Assistantd的对话框，在对话框文字或者语音输入"Talk to gokit"，就会弹出Link Gokit to Google的一个对话框，点击进入账户关联页面

![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504592818018.png)![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504592886416.png)

### 4.2.3 账户关联
* 进入账户关联页面，登陆刚刚通过GOKIT App注册的机智云账号，然后点击yes，之后回到Home页面之后，就可以开始说控制指令了

![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504682852526.png)![Alt text](/assets/zh-cn/UserManual/GoogleHome/1504585196188.png)

# 5.附录
## 5.1		“GoKit”Action控制语音指令与结果返回语音
* 控制例句示范：Ok Google,talk to gokit and turn on the light
* Ok Google ->用于唤醒Google Home （用手机控制不需要此句，Ok Google的唤醒词也可用Hey Google）
* talk to gokit ->用于唤醒Action
* turn on the light->控制命令语句

|用户控制语音指令|Google Home音箱回复语音|实际操作效果|
|:---:|:----:|:----:|
|Ok Google,talk to gokit |Welcome to gokit.I will now receive commands for your device.If you need more help,say help|唤醒Google Home并进入会话模式|
|Ok Google,talk to gokit and help	|You can say turn on the light or motor to control the sensor on gokit|音箱回复帮助指令，提示用户更多信息，并保持会话模式|
|Ok Google,talk to gokit and turn on the light	|the light is on|Gokit上的RGB灯亮|
|Ok Google,talk to gokit and turn off the light	|the light is off|Gokit上的RGB灯灭|
|Ok Google,talk to gokit and turn the light	to red|the light is red|Gokit上的RGB变红|
|Ok Google,talk to gokit and turn the light	to green|the light is green|Gokit上的RGB变绿|
|Ok Google,talk to gokit and turn the light to blue|the light is blue|Gokit上的RGB变蓝|
|Ok Google,talk to gokit and turn on the motor	|the motor is on|Gokit上的电机开始转动|
|Ok Google,talk to gokit and shut down the motor |the motor is off|Gokit上的电机停止转动|
