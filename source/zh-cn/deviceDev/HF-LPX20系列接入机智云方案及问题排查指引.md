title: HF-LPX20系列接入机智云方案及问题排查指引
---

修订历史

| 版本        | 修订内容    |  修订人  | 修订日期|
| :------:   | :-----:   | :----: |:----:|
| V1.0        |起稿      |   Bobo    |2019/08/14|


# 1.本文编写背景
本文主要介绍汉枫HF-LPX20系列何快速从零开始接入机智云，实现简单的透传功能，以及常见的配网失败问题排查，还提供了该模组的相关资料。
本文描述的模组型号有：
1、HF-LPB120；
2、HF-LPB125；
3、HF-LPT120；
4、HF-LPT220；

# 2. HF-LPX20模组资料下载及获取
链接：https://eyun.baidu.com/s/3i5SYLk5 密码：SgtN

# 3. HF-LPX20外围设计原理图

请下载第2章内容，确认手上的模组型号，查找手上模组对应的用户手册，查看用户手册，使用手册内推荐的外围设计原理图。

![HFLPX20_1](/assets/zh-cn/deviceDev/HFLPX20/HFLPX20_1.png)

# 4. HF-LPX20串口烧写固件说明

## 4.1、HF-LPX20固件获取与确认
当拿到一片HF-LPX20系列的模块的时候，若确认固件未烧写，请下载第2章内容，打开模组固件的文件夹，拿到之后解压固件压缩包。

解压之后会发现有多个文件，其中一个文件名为“00HFT120_04020035_20180904_UART.bin”的bin文件用于串口烧录，是串口烧录所需要的固件

>备注：文件名带有“WEB”的bin文件为OTA的固件，例如：00HFT120_04020035_20180904_WEB.bin。
>备注：本文固件名称以HF-LPB120这款模块的固件为例，其他HF-LPX20系列的模组的固件名称的软硬件版本有差异，具体以手上的模组型号为准。

![HFLPX20_1](/assets/zh-cn/deviceDev/HFLPX20/HFLPX20_2.png)


## 4.2、HF-LPX20系列硬件设备连接
将HF-LPX20模块按照如下原理图进行接线，注意nReload需要输入低电平，通过按键S2控制nReload的低电平输入。S1实现外部复位功能。
![HFLPT-230硬件设备连接](/assets/zh-cn/deviceDev/HFLPX20/HFLPX20_12.png)


## 4.3、HF-LPX20确认串口参数
将上述串口连接电脑后，通过“我的电脑”->“管理”-> “设备管理器”->“端口（COM 和LPT）”选项中可以看到相应增加的COM口。

![确认串口参数](/assets/zh-cn/deviceDev/HFLPX20/HFLPX20_13.png)

## 4.4、HF-LPX20烧写软件获取与使用（SecureCRT）


从文中第2章，下载资料后打开烧录工具文件夹，解压工具并安装后双击打开SecureCRT，点击快速连接后会弹出串口配置对话框，点击快速链接。

![串口工具SecureCRT](/assets/zh-cn/deviceDev/HFLPX20/HFLPX20_11.png)

串口配置协议为Serial，端口为上述4.3中的COM口，波特率设置为230400（关键），数据位为8位，停止位为1位，无奇偶校验，最后点击连接。

![串口工具SecureCRT](/assets/zh-cn/deviceDev/HFLPX20/HFLPX20_14.png)

连接成功后，在SecureCRT工作区间会有光标闪烁。

![串口工具SecureCRT](/assets/zh-cn/deviceDev/HFLPX20/HFLPX20_15.png)


## 4.5、HF-LPX20的烧写
### 4.5.1、进入烧写模式
当串口连接成功之后，将模块的nReload接入低电平（按下第3节原理图所示的S2），然后进行复位（按下第3节原理图所示的S1后松开）或者给模块重新上电后迅速连续单击键盘空格键，
将会出现如下信息表示模块进入烧写模式，松开S2。

![串口工具SecureCRT](/assets/zh-cn/deviceDev/HFLPX20/HFLPX20_3.png)

备注：此步骤不易操作实现，需要多次进行试验，当进行进入烧写模式操作始终无法显示上述信息的时候要注意检查串口设置是否正确，待确保串口设置无误后再次进行连接操作。

上述窗体显示信息中，各命令解释如下： 

| Item      |    Value |
| :-------- |:--------|
|命令‘B’  |清除所有设置参数，包括出厂参数等。|
|命令‘S’  |升级应用程序；SDK等编译出来文件（需使用串口方式的升级文件）的用此选项升级。|
|命令‘G’| 执行应用程序。|

### 4.5.2、进行烧写

输入“S”升级应用程序，再输入“Y”进入接收固件状态。

![进行烧写](/assets/zh-cn/deviceDev/HFLPX20/HFLPX20_4.png)

当窗体连续打印出“CC”后选择”菜单栏” 中“传输”->”发送Xmode(N)”， 选择4.1节中所示的固件文件，点击发送。

![进行烧写](/assets/zh-cn/deviceDev/HFLPX20/HFLPX20_5.png)

等待一段时候后，出现如上述信息表示烧写成功。


# 5、HF-LPX20模组日志抓取

## 5.1、HF-LPX20模组日志接线方法
### 5.1.1、HF-LPB120模组日志接线方法
按照下图HF-LPB120的管脚定义图，将图中所示的26引脚（UART1_TX）（芯片调试日志信息输出口）连接USB转TTL工具的RXD上，且USB转TTL工具的GND需接模组的18脚GND，然后将USB转TTL工具连接到电脑，波特率115200bps。
​​![模组日志抓取](/assets/zh-cn/deviceDev/HFLPX20/HFLPX20_6.png)

#### 5.1.2、HF-LPB125模组日志接线方法
按照下图HF-LPB125的管脚定义图，将图中所示的7引脚（芯片调试日志信息输出口）连接USB转TTL工具的RXD上，且USB转TTL工具的GND需接模组的2脚GND，然后将USB转TTL工具连接到电脑，波特率115200bps。
​​![模组日志抓取](/assets/zh-cn/deviceDev/HFLPX20/HFLPX20_7.png)



### 5.1.3、HF-LPT120模组日志接线方法
按照下图HF-LPT120的管脚定义图，将图中所示的7引脚（芯片调试日志信息输出口）连接USB转TTL工具的RXD上，且USB转TTL工具的GND需接模组的1脚GND，然后将USB转TTL工具连接到电脑，波特率115200bps。
​​![模组日志抓取](/assets/zh-cn/deviceDev/HFLPX20/HFLPX20_8.png)

#### 5.1.4、HF-LPT220模组日志接线方法
按照下图HF-LPT330的管脚定义图，将图中所示的8引脚（芯片调试日志信息输出口）连接USB转TTL工具的RXD上，且USB转TTL工具的GND需接模组的16脚GND，然后将USB转TTL工具连接到电脑，波特率115200bps。



![模组日志抓取](/assets/zh-cn/deviceDev/HFLPX20/HFLPX20_9.png)


## 5.2、机智云串口打印软件工具的获取与使用
机智云串口打印软件工具下载链接：https://eyun.baidu.com/s/3oAbSruq 密码：pPsL

下载解压之后，选择对应的端口和115200波特率，点击打开串口，右侧有日志显示则为正常。

![机智云串口打印软件工具使用](/assets/zh-cn/deviceDev/HFLPX20/HFLPX20_10.png)

# 6.搭配gokit接入机智云（包含创建数据点，下载代码，demoAPP配网绑定及控制设备等等）
快速接入文档参考链接：http://docs.gizwits.com/zh-cn/deviceDev/debug/WIF_Project.html

>备注：模组uart0为与Gokit通讯的通讯串口，通讯波特率为9600bps，具体可参考文章5.1的模组接线方法图


# 7.FAQ
1. Q: 如何排查AirLink配网失败问题？
    A: 参考链接：http://docs.gizwits.com/zh-cn/deviceDev/Onboarding.html

