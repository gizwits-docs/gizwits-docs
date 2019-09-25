

title: HF-LPX30系列接入机智云方案及问题排查指引

修订历史

| 版本        | 修订内容    |  修订人  | 修订日期|
| --------   | :-----:   | :----: |:----:|
| V1.0        |起稿      |   Bobo    |2019/07/29|


# 1.本文编写背景
本文主要介绍汉枫HF-LPX30系列何快速从零开始接入机智云，实现简单的透传功能，以及常见的配网失败问题排查，还提供了该模组的相关资料。
本文描述的模组型号有：
1、HF-LPB130；
2、HF-LPB135；
3、HF-LPT130A&B；
4、HF-LPT230；
5、HF-LPT330；

# 2. HF-LPX30模组资料下载及获取
链接：https://eyun.baidu.com/s/3eTv5jyy 密码：a2pQ

# 3. HF-LPX30外围设计原理图

请下载第2章内容，参考《HF-LPX30系列Wi-Fi模块用户手册V2.0(20190412).pdf》推荐的外围设计原理图。

# 4. HF-LPX30串口烧写固件说明

## 4.1、HF-LPX30固件获取与确认
当拿到一片HF-LPX30系列的模块的时候，若确认固件未烧写，请联系商务同事或FAE同事获取。拿到之后解压固件压缩包。

解压之后会发现有两个文件，其中一个文件名为“GAgent_00HFT230_0403000A_1M_201904292027.bin”的bin文件用于串口烧录，是串口烧录所需要的固件

>备注：文件名带有“upgrade”的bin文件为OTA的固件，例如：GAgent_00HFT230_0403000A_1M_upgrade_201904292027.bin。
>备注：本文固件名称以HFLPT230这款模块的固件为例，其他HF-LPX30系列的模组的固件名称的软硬件版本有差异

![HFLPT-230固件获取与确认](/assets/zh-cn/deviceDev/HFLPX30/HFLPX30_1.png)


## 4.2、HF-LPX30系列硬件设备连接
将HF-LPX30模块按照如下原理图进行接线，注意nReload需要输入低电平，通过按键S2控制nReload的低电平输入。S1实现外部复位功能。
![HFLPT-230硬件设备连接](/assets/zh-cn/deviceDev/HFLPX30/HFLPX30_2.png)


## 4.3、HF-LPX30确认串口参数
将上述串口连接电脑后，通过“我的电脑”->“管理”-> “设备管理器”->“端口（COM 和LPT）”选项中可以看到相应增加的COM口。

![确认串口参数](/assets/zh-cn/deviceDev/HFLPX30/HFLPX30_3.png)

## 4.4、HF-LPX30烧写软件获取与使用（SecureCRT）

下载地址：[http://pan.baidu.com/s/1dECLxYD](http://pan.baidu.com/s/1dECLxYD)
​
下载解压后双击打开SecureCRT，点击快速连接后会弹出串口配置对话框。

![串口工具SecureCRT](/assets/zh-cn/deviceDev/HFLPX30/HFLPX30_4.png)

![串口工具SecureCRT](/assets/zh-cn/deviceDev/HFLPX30/HFLPX30_5.png)

串口配置协议为Serial，端口为上述4.3中的COM口，波特率设置为230400（关键），数据位为8位，停止位为1位，无奇偶校验，最后点击连接。

连接成功后，在SecureCRT工作区间会有光标闪烁。

![串口工具SecureCRT](/assets/zh-cn/deviceDev/HFLPX30/HFLPX30_6.png)


## 4.5、HF-LPX30的烧写
### 4.5.1 进入烧写模式
当串口连接成功之后，将HF-LPT230的nReload接入低电平（按下第3节原理图所示的S2），然后进行复位（按下第3节原理图所示的S1后松开）或者给模块重新上电后迅速连续单击键盘空格键，
将会出现如下信息表示模块进入烧写模式，松开S2。

![串口工具SecureCRT](/assets/zh-cn/deviceDev/HFLPX30/HFLPX30_7.png)

备注：此步骤不易操作实现，需要多次进行试验，当进行进入烧写模式操作始终无法显示上述信息的时候要注意检查串口设置是否正确，待确保串口设置无误后再次进行连接操作。

上述窗体显示信息中，各命令解释如下： 

| Item      |    Value |
| :-------- |:--------|
|命令‘B’  |清除所有设置参数，包括出厂参数等。|
|命令‘S’  |升级应用程序；SDK等编译出来文件（需使用串口方式的升级文件）的用此选项升级。|
|命令‘G’| 执行应用程序。|

### 4.5.2、进行烧写

输入“S”升级应用程序，再输入“Y”进入接收固件状态。

![进行烧写](/assets/zh-cn/deviceDev/HFLPX30/HFLPX30_8.png)

当窗体连续打印出“CC”后选择”菜单栏” 中“传输”->”发送Xmode(N)”， 选择4.1节中所示的固件文件，点击发送。

![进行烧写](/assets/zh-cn/deviceDev/HFLPX30/HFLPX30_9.png)

等待一段时候后，出现如上述信息表示烧写成功。
​​
>若烧写过慢，可以按照下图设置，提高烧写速度

![进行烧写](/assets/zh-cn/deviceDev/HFLPX30/HFLPX30_10.png)

# 5、HF-LPX30模组日志抓取

## 5.1、HF-LPX30模组日志接线方法
### 5.1.1、HF-LPB130模组日志接线方法
按照下图HF-LPB130的管脚定义图，将图中所示的21引脚（UART1_TX）（芯片调试日志信息输出口）连接USB转TTL工具的RXD上，且USB转TTL工具的GND需接模组的18脚GND，然后将USB转TTL工具连接到电脑，波特率921600bps。

>备注：因固件版本差异问题，若波特率选择921600bps出现乱码的现象，则更改串口波特率为115200bps

​​![模组日志抓取](/assets/zh-cn/deviceDev/HFLPX30/HFLPX30_13.png)

### 5.1.2、HF-LPB135模组日志接线方法
按照下图HF-LPB135的管脚定义图，将图中所示的Debug TX引脚（芯片调试日志信息输出口）连接USB转TTL工具的RXD上，且USB转TTL工具的GND需接模组的2脚GND，然后将USB转TTL工具连接到电脑，波特率921600bps。

>备注：因固件版本差异问题，若波特率选择921600bps出现乱码的现象，则更改串口波特率为115200bps

![模组日志抓取](/assets/zh-cn/deviceDev/HFLPX30/HFLPX30_14.png)

### 5.1.3、HF-LPT130A&B模组日志接线方法
按照下图HF-LPT130A&B的管脚定义图，将图中所示的Debug TX引脚（芯片调试日志信息输出口）连接USB转TTL工具的RXD上，且USB转TTL工具的GND需接模组的1脚GND，然后将USB转TTL工具连接到电脑，波特率921600bps。

>备注：因固件版本差异问题，若波特率选择921600bps出现乱码的现象，则更改串口波特率为115200bps

​​![模组日志抓取](/assets/zh-cn/deviceDev/HFLPX30/HFLPX30_15.png)

### 5.1.4、HF-LPT230模组日志接线方法
按照下图HF-LPT230的管脚定义图，将图中所示的Debug TX引脚（芯片调试日志信息输出口）连接USB转TTL工具的RXD上，且USB转TTL工具的GND需接模组的16脚GND，然后将USB转TTL工具连接到电脑，波特率921600bps。

>备注：因固件版本差异问题，若波特率选择921600bps出现乱码的现象，则更改串口波特率为115200bps

​​![模组日志抓取](/assets/zh-cn/deviceDev/HFLPX30/HFLPX30_16.png)

### 5.1.5、HF-LPT330模组日志接线方法
按照下图HF-LPT330的管脚定义图，将图中所示的17引脚（UART1_TX）（芯片调试日志信息输出口）连接USB转TTL工具的RXD上，且USB转TTL工具的GND需接模组的15脚GND，然后将USB转TTL工具连接到电脑，波特率115200bps。

>备注：因固件版本差异问题，若波特率选择115200bps出现乱码的现象，则更改串口波特率为921600bps

![模组日志抓取](/assets/zh-cn/deviceDev/HFLPX30/HFLPX30_11.png)


## 5.2、机智云串口打印软件工具的获取与使用
机智云串口打印软件工具下载链接：https://eyun.baidu.com/s/3oAbSruq 密码：pPsL

下载解压之后，选择对应的端口和921600波特率，点击打开串口，右侧有日志显示则为正常。

>备注：因固件版本差异问题，若波特率选择921600bps出现乱码的现象，则更改串口波特率为115200bps

![机智云串口打印软件工具使用](/assets/zh-cn/deviceDev/HFLPX30/HFLPX30_12.png)

# 6.搭配gokit接入机智云（包含创建数据点，下载代码，demoAPP配网绑定及控制设备等等）
快速接入文档参考链接：http://docs.gizwits.com/zh-cn/deviceDev/debug/WIF_Project.html

>备注：模组uart0为与Gokit通讯的通讯串口，通讯波特率为9600bps，具体可参考文章5.1的模组接线方法图


# 7.FAQ
1. Q: 如何排查AirLink配网失败问题？
    A: 参考链接：http://docs.gizwits.com/zh-cn/deviceDev/Onboarding.html
