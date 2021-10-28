title: ESP32-WROOM-32D接入机智云方案及问题排查指引
---

# 修订历史

| 版本 | 修订内容 | 修订人 |  修订日期  |
| :--: | :------: | :----: | :--------: |
| V1.0 |   起稿   |  Bobo  | 2019/10/29 |

# 1.本文编写背景

本文主要介绍乐鑫ESP32-WROOM-32D（以下简略ESP32）快速从零开始接入机智云，实现简单的透传功能，以及常见的配网失败问题排查，还提供了该模组的相关资料。

# 2. ESP32模组资料下载及获取

ESP32-WROOM-32D模组资料下载 ====> [点击下载](https://gizwits-doc-1251025085.cos.ap-guangzhou.myqcloud.com/ModuleData/WIFI-Module/ESP-ESP32/ESP32-WROOM-32D-ModuleData.zip)

# 3. ESP32外围设计原理图

请下载第2章内容，下载模组规格说明书与模组参考设计，使用说明书内推荐的外围设计原理图。

![AI_ESP32_1](/assets/zh-cn/deviceDev/ESP32/ESP32_1.png)

# 4. ESP32串口烧写固件说明

## 4.1、ESP32固件获取与确认

当拿到一片ESP32模块的时候，若确认固件未烧写，请联系商务同事或FAE同事获取。拿到之后解压固件压缩包。

解压之后会发现有三个文件，“bootloader.bin”为底层文件，其他为GAgent应用层文件。

![AI_ESP32_1](/assets/zh-cn/deviceDev/ESP32/ESP32_2.png)

## 4.2、ESP32硬件设备连接

查看ESP32模块的规格说明书，按照说明书内的管脚图与管脚定义，注意EN使能脚需要输入高电平，GPIO0在下载固件的时候需要输入低电平。

| 管脚名称 |                     管脚描述                     |        管脚状态        |
| :------: | :----------------------------------------------: | :--------------------: |
|    EN    |                   模组使能引脚                   |          上拉          |
|   3V3    |                   模组电源引脚                   |        3.3V供电        |
|   IO0    | UART下载模式：下拉<br />FLASH启动模式：悬空/上拉 |                        |
|   GND    |                       GND                        |                        |
|   RXD0   |                   串口0接收端                    | 与MCU或串口工具TXD相连 |
|   TXD0   |                   串口0发送端                    | 与MCU或串口工具RXD相连 |

![AI_ESP32_1](/assets/zh-cn/deviceDev/ESP32/ESP32_4.png)



## 4.3、ESP32烧写说明

**ESP32烧写有两种烧写方式，第一种是使用应用层+底层固件分开烧写，第二种是直接烧写合并固件。**

准备好串口工具之后，解压章节2下载的压缩包，解压烧录工具文件夹中的压缩包，双击ESPFlashDownloadTool_v3.6.1.0.exe文件，选择ESP32 DownloadTool。

- **分开固件烧写：按照下图的选项，选中对应的bin文件，填写对应的地址，选择对应的SPI Flash选项，选择好串口与波特率，点击START**。

![确认串口参数](/assets/zh-cn/deviceDev/ESP32/ESP32_5.png)

- **合并固件烧写：若固件名称带有combine字眼，则从0地址烧写，不需要烧写其他三个文件，并且勾选DoNotChgBin选项，详细看下图**

![确认串口参数](/assets/zh-cn/deviceDev/ESP32/ESP32_10.png)

点击开始后，进度条开始运行，等待一段时间，显示完成便是成功。

![确认串口参数](/assets/zh-cn/deviceDev/ESP32/ESP32_6.png)

# 5.ESP32模组日志抓取

## 5.1、ESP32模组日志接线方法

按照下图ESP32的管脚定义图，将图中所示的TXD0引脚（芯片调试日志信息输出口与模组烧录口）连接USB转TTL工具的RXD上，且USB转TTL工具的GND需接模组的GND，然后将USB转TTL工具连接到电脑，波特率115200bps。

![确认串口参数](/assets/zh-cn/deviceDev/ESP32/ESP32_7.png)

## 5.2、机智云串口打印软件工具的获取与使用

1、机智云串口打印软件工具下载链接：https://eyun.baidu.com/s/3oAbSruq 密码：pPsL

2、由于模组串口日志打印为加密，需要使用对应版本号的.mapTab文件解码，对应的解码文件可以从本文第2章节ESP32模组资料中获取，工具下载解压之后，通过左下角的"导入映射表"导入对应版本的映射表文件。

![确认串口参数](/assets/zh-cn/deviceDev/ESP32/ESP32_9.png)

3、选择对应的端口和115200波特率，点击打开串口，右侧有日志显示则为正常。

![确认串口参数](/assets/zh-cn/deviceDev/ESP32/ESP32_8.png)

# 6.搭配gokit接入机智云（包含创建数据点，下载代码，demoAPP配网绑定及控制设备等等）

快速接入文档参考链接：http://docs.gizwits.com/zh-cn/deviceDev/debug/WIF_Project.html

> 备注：模组的IO5(RXD)与IO4(TXD)为与Gokit通讯的通讯串口，通讯波特率为9600bps，具体可参考文章5.1的模组接线方法图

# 7.FAQ

1. Q: 如何排查AirLink配网失败问题？
   A: 参考链接：http://docs.gizwits.com/zh-cn/deviceDev/Onboarding.html
