title: 域格CLM920_NC3接入机智云方案及问题排查指引
---

修订历史

| 版本        | 修订内容    |  修订人  | 修订日期|
| :------:   | :-----:   | :----: |:----:|
| V1.0        |起稿      |   Bobo    |2019/08/13|


# 1.本文编写背景
本文主要介绍域格CLM920_NC3（以下略称域格NC3）如何快速从零开始接入机智云，实现简单的透传功能，以及常见的问题排查，还提供了该模组的相关资料。

# 2. 域格NC3模组资料下载及获取
链接：https://eyun.baidu.com/s/3i6VWNzv 密码：1Zvv

# 3. 域格NC3外围设计原理图

请下载第2章内容，参考《CLM920_NC3_LTE模块硬件使用指南V2.0.pdf》推荐的外围设计原理图。

# 4. 域格NC3串口烧写固件说明

## 4.1、域格NC3固件获取与确认
当拿到一片域格NC3的模块的时候，若确认固件未烧写，请联系商务同事或FAE同事获取。拿到之后解压固件压缩包。

解压之后，会得到一个文件夹，点击打开文件夹，里面的GAgent_00YGNC03_04030003_512MB_201811281136.ubi就是我们烧写所要的文件

>备注：本文固件名称以域格NC3_04030003版本固件为例，其他版本的模组固件名称的软硬件版本名字会有差异。

![域格NC3](/assets/zh-cn/deviceDev/yugeNC3/yuge1.png)


## 4.2、域格NC3硬件设备连接
域格NC3模块烧写需要按照手册正常接出电源，USB引脚，开机引脚，具体详细的接线方法可以参考文章第2章内容，参考《CLM920_NC3_LTE模块硬件使用指南V2.0.pdf》

### 4.2.1、域格NC3 USB引脚接线

域格NC3 模块的 USB 接口提供一路 USB2.0 High-Speed 接口。接口支持从设备模式，不支持 USB 充电模式。USB 接口引脚定义如下：

![Alt text](/assets/zh-cn/deviceDev/yugeNC3/yuge2.png)

模块作为 USB 从设备,支持 USB 休眠及唤醒机制。USB 接口应用参考电路如下：

![Alt text](/assets/zh-cn/deviceDev/yugeNC3/yuge3.png)

- USB 接口支持高速(480Mbps)和全速(12Mbps)模式，因此走线设计需要严格遵循USB2.0 协议要求，注意对数据线的保护，差分走线，控制阻抗为 90Ω。

- 为提高 USB 接口的抗静电性能，建议数据线上增加 ESD 保护器件，保护器件的等效电容值小于 2pF。

- USB 接口总线供电电压由模块内部提供，不需外部提供。同时由于模块的 USB 接口对外不提供 USB 总线电源，模块只能作为 USB 总线设备的从设备。

- USB 接口可支持的功能有：软件下载升级、数据通讯、AT Command、GNSS NMEA输出等功能。

### 4.2.2、域格NC3 电源接线

实际设计电源电路可使用开关 DC 电源或线性 LDO 电源来设计 VBAT 电源,两种设计电路都需要提供足够电流。具体参考以下电路设计：
![Alt text](/assets/zh-cn/deviceDev/yugeNC3/yuge4.png)

![Alt text](/assets/zh-cn/deviceDev/yugeNC3/yuge5.png)

![Alt text](/assets/zh-cn/deviceDev/yugeNC3/yuge6.png)

- 为防止浪涌及过压对模块的损坏，建议在模块 VBAT 引脚上并联一个 5.1V/500mW的齐纳二极管。

- 建议在 VBAT 管脚增加 3 个陶瓷电容(33pF,10pF,100nF)且靠近 VBAT 管脚放置。

- 模块最低工作电压为 3.3V，由于传输数据或 GSM 通话会产生 2A 以上电流，导致电源电压上产生纹波压降，因此实际供电电压不得低于 3.3V。

### 4.2.3、域格NC3 开机引脚接线

域格NC3 模块的 21 脚是开机脚，模块开机是低电平有效，PWRKEY 拉低至少500ms，模块开机，用户可通过查询 VDD_EXT 管脚的高低电平来判断模块是否开机

![Alt text](/assets/zh-cn/deviceDev/yugeNC3/yuge7.png)

## 4.3、域格NC3 确认串口参数
将上述USB口连接电脑后，通过“我的电脑”->“管理”-> “设备管理器”->“端口（COM 和LPT）”选项中可以看到相应增加的COM口。

>备注：若出现未识别的端口，请打开本文章节二下载的文件，安装模组驱动文件夹内的驱动。

![Alt text](/assets/zh-cn/deviceDev/yugeNC3/yuge8.png)

## 4.4、域格NC3的烧写

当USB正常连接成功之后，解压烧录工具目录内的CLM920_NC3_Tools.zip文件，将固件放入与其同一个目录下，如下图

![域格NC3](/assets/zh-cn/deviceDev/yugeNC3/yuge1.png)

之后双击update_SDK.bat批处理文件，将会弹出命令提示符窗口，短暂等待，烧写成功之后，窗口将会关闭。

![Alt text](/assets/zh-cn/deviceDev/yugeNC3/yuge9.png)


# 5、域格NC3模组日志抓取

## 5.1、域格NC3模组日志接线方法
按照域格NC3的管脚定义图，将图中所示的63引脚（芯片调试日志信息输出口）连接USB转TTL工具的RXD上，且USB转TTL工具的GND需接模组的GND，然后将USB转TTL工具连接到电脑，确认端口。

![Alt text](/assets/zh-cn/deviceDev/yugeNC3/yuge10.png)

- **通信串口：**

| 管脚号 | 管脚名 | 描述 |
| :-: | :-: | :-: |
| 67 | TXD | UART 发送数据 |
| 68 | RSD | UART 接收数据 |

- **日志串口：**

| 管脚号 | 管脚名 | 描述 |
| :-: | :-: | :-: |
| 63 | DCD | UART1 发送数据 |
| 66 | DRT | UART1 接收数据 |

- **串口设计图：**

![Alt text](/assets/zh-cn/deviceDev/yugeNC3/yuge11.png)


## 5.2、机智云串口打印软件工具的获取与使用
机智云串口打印软件工具下载链接：https://eyun.baidu.com/s/3oAbSruq 密码：pPsL

下载解压之后，选择对应的端口和115200波特率，点击打开串口，右侧有日志显示则为正常。

![Alt text](/assets/zh-cn/deviceDev/yugeNC3/yuge12.png)

# 6.搭配gokit接入机智云（包含创建数据点，下载代码，demoAPP扫码绑定及控制设备等等）
快速接入文档参考链接：http://docs.gizwits.com/zh-cn/deviceDev/debug/WIF_Project.html

>备注：模组uart为与Gokit通讯的通讯串口，通讯波特率为9600bps，具体可参考文章5.1的模组接线方法图


# 7.FAQ

1、Q:若烧写出现error: device not found的提示如何处理

![Alt text](/assets/zh-cn/deviceDev/yugeNC3/yuge13.png)

 A:确认文章4.2.1的USB引脚是否正常接入，确认4.2.3，设备是否正常开机。
