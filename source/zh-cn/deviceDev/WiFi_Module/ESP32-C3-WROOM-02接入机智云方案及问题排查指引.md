title: ESP32-C3-WROOM-02接入机智云方案及问题排查指引
---

# 修订历史

| 版本 | 修订内容 | 修订人 |  修订日期  |
| :--: | :------: | :----: | :--------: |
| V1.0 |   起稿   |  楚源  | 2021/09/01 |

# 1.本文编写背景

本文主要介绍乐鑫ESP32-C3-WROOM-02（以下简略C3）快速从零开始接入机智云，实现简单的透传功能，以及常见的配网失败问题排查，还提供了该模组的相关资料。

# 2. C3模组资料下载及获取

ESP32-C3-WROOM-02模组资料下载 ====> [点击下载](https://gizwits-doc-1251025085.cos.ap-guangzhou.myqcloud.com/ModuleData/WIFI-Module/ESP-ESP32-C3/ESP32-C3-WROOM-02%E6%A8%A1%E7%BB%84%E8%B5%84%E6%96%99.zip)

机智云GE211-02转接板资料下载 ====>[点击下载](https://gizwits-doc-1251025085.cos.ap-guangzhou.myqcloud.com/GizwitsDTUData/GE211/GE211%E6%8E%A5%E5%85%A5%E6%96%87%E6%A1%A3/%E6%9C%BA%E6%99%BA%E4%BA%91GE211-02%E8%BD%AC%E6%8E%A5%E6%9D%BF%E6%8E%A5%E5%85%A5%E6%9C%BA%E6%99%BA%E4%BA%91%E6%96%B9%E6%A1%88%E5%8F%8A%E9%97%AE%E9%A2%98%E6%8E%92%E6%9F%A5%E6%8C%87%E5%BC%95V1.0.0.pdf)

# 3. C3外围设计原理图

请下载第2章内容，下载模组规格说明书与模组参考设计，使用说明书内推荐的外围设计原理图。

![压缩文件目录](/assets/zh-cn/deviceDev/ESP32-C3/1.png)

# 4. C3串口烧写固件说明

## 4.1、C3固件获取与确认

当拿到一片C3模块的时候，若确认固件未烧写，请联系商务同事或FAE同事获取。拿到之后解压固件压缩包。

解压之后会发现有六个文件，“bootloader.bin”为底层文件，其他为GAgent应用层文件。（注意：解压路径不能含有中文）

![固件文件](/assets/zh-cn/deviceDev/ESP32-C3/2.png)

## 4.2、C3硬件设备连接

查看C3模块的规格说明书，按照说明书内的管脚图与管脚定义，注意EN使能脚需要输入高电平，IO9在下载固件的时候需要输入低电平。

| 管脚名称 |                     管脚描述                     |        管脚状态        |
| :------: | :----------------------------------------------: | :--------------------: |
|    EN    |                   模组使能引脚                   |          上拉          |
|   3V3    |                   模组电源引脚                   |        3.3V供电        |
|   IO9    | UART下载模式：下拉<br />FLASH启动模式：悬空/上拉 |                        |
|   GND    |                       GND                        |                        |
|   RXD0   |                   串口0接收端                    | 与MCU或串口工具TXD相连 |
|   TXD0   |                   串口0发送端                    | 与MCU或串口工具RXD相连 |

![Strapping](/assets/zh-cn/deviceDev/ESP32-C3/3.png)



## 4.3、C3烧写说明

**C3烧写有两种烧写方式，第一种是使用应用层+底层固件分开烧写，第二种是直接烧写合并固件。**

准备好串口工具之后，解压章节2下载的压缩包，解压烧录工具文件夹中的压缩包，双击“flash_download_tool_3.8.8.exe”文件，CHipType选择“ESP32C3”WorkMode选择“develop”。

- **分开固件烧写：按照下图的选项，选中对应的bin文件，填写对应的地址，选择对应的SPI Flash选项，选择好串口与波特率，点击START**。

![确认串口参数](/assets/zh-cn/deviceDev/ESP32-C3/4.png)

- **合并固件烧写：若固件名称带有combine字眼，则从0地址烧写，不需要烧写其他三个文件，并且勾选DoNotChgBin选项，详细看下图**

![确认串口参数](/assets/zh-cn/deviceDev/ESP32-C3/5.png)

点击开始后，重启/复位模组（注意：下载固件IO0必须接地，下载完必须上拉为高电平），进度条开始运行，等待一段时间，显示完成便是成功。

![确认串口参数](/assets/zh-cn/deviceDev/ESP32-C3/6.png)

![确认串口参数](/assets/zh-cn/deviceDev/ESP32-C3/7.png)

# 5.C3模组日志抓取

## 5.1、C3模组日志接线方法

按照下图C3的管脚定义图，将图中所示的IO8引脚（芯片调试日志信息输出口）连接USB转TTL工具的RXD上，且USB转TTL工具的GND需接模组的GND，然后将USB转TTL工具连接到电脑，波特率460800bps。

![确认串口参数](/assets/zh-cn/deviceDev/ESP32-C3/8.png)

## 5.2、机智云串口打印软件工具的获取与使用

1、解压章节2下载的压缩包，进入机智云串口工具文件夹，双击“Gagent_Log.exe”

2、选择对应的端口和460800波特率，点击打开串口，复位模组，右侧有日志显示则为正常。

![确认串口参数](/assets/zh-cn/deviceDev/ESP32-C3/9.png)


# 6.搭配gokit接入机智云（包含创建数据点，下载代码，demoAPP配网绑定及控制设备等等）

快速接入文档参考链接：http://docs.gizwits.com/zh-cn/deviceDev/debug/WIF_Project.html

> 备注：模组的RXD与TXD为与Gokit通讯的通讯串口，通讯波特率为9600bps，具体可参考文章5.1的模组接线方法图

# 7.FAQ

1. Q: 如何排查AirLink配网失败问题？
   A: 参考链接：http://docs.gizwits.com/zh-cn/deviceDev/Onboarding.html


