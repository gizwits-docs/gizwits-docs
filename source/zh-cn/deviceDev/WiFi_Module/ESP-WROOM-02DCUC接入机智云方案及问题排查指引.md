title: ESP-WROOM-02DC/UC接入机智云方案及问题排查指引
---
修订历史

| 版本 | 修订内容   | 修订人 | 修订日期   |
| ---- | ---------- | ------ | ---------- |
| V1.0 | 1. 起稿    | 钟汉烽 | 2019/06/25 |
| V1.1 | 1.修改排版 | Hayder | 2019/07/23 |

# 1.本文编写背景

本文主要介绍ESP-WROOM-02如何快速从零开始接入机智云，实现简单的透传功能，以及常见的配网失败问题排查，还提供了该模组的相关资料。

# 2. ESP-WROOM-02模组资料下载及获取

链接：https://eyun.baidu.com/s/3mjyaKnm 密码：w3Th

# 3. ESP-WROOM-02外围设计原理理图

请下载第2章内容，参考《ESP-WROOM-02DC_ESP-WROOM-02UC_Datasheet__CN.pdf》推荐的外围设计原理理图。

# 4. ESP-WROOM-02D串口烧写固件说明

1. 当拿到一片ESP-WROOM-02D模块的时候，第一件事是要给该模组烧写机智云的Gagent固件。机智云乐鑫8266，版本号为04020034的固件下载地址：http://goms-1251025085.cosgz.myqcloud.com/GAgent_00ESP826_04020034-1529147544607.rar

下载后解压压缩包，选定该文件作为要烧写的固件如下图所示.

> ***备注：更高版本的固件，请联系商务同事或FAE同事获取。***

![ESP-WROOM-02DC/UC-img](/assets/zh-cn/deviceDev/WiFi_Module/ESP-WROOM-02DCUC/ESP-WROOM-02DCUC-0.png)

2. 下载了模组固件后，还需要下载乐鑫提供的串口烧写软件，软件下载地址请见本文第2章“ESP-WROOM-02模组资料下载及获取”。

下载后解压压缩包，打开软件界面如下图所示

![ESP-WROOM-02DC/UC-img](/assets/zh-cn/deviceDev/WiFi_Module/ESP-WROOM-02DCUC/ESP-WROOM-02DCUC-1.png)



3.	上述步骤1，步骤2软件部分准备好以后，需要对ESP-WROOM-02D进行硬件处理。将 ESP-WROOM-02 的如下表所示的管脚引出。

![ESP-WROOM-02DC/UC-img](/assets/zh-cn/deviceDev/WiFi_Module/ESP-WROOM-02DCUC/ESP-WROOM-02DCUC-2.png)

4. 按照下图用杜邦线将 ESP-WROOM-02 和 USB 转 TTL 串⼝模块连接。

   ![ESP-WROOM-02DC/UC-img](/assets/zh-cn/deviceDev/WiFi_Module/ESP-WROOM-02DCUC/ESP-WROOM-02DCUC-3.png)

5. 通过下载⼯具 (ESP8266 Download Tool) 将固件下载到 Flash 中，烧写软件操作如下：

5.1. 请务必依次对照下图所选的地方进行相应的填写：

![ESP-WROOM-02DC/UC-img](/assets/zh-cn/deviceDev/WiFi_Module/ESP-WROOM-02DCUC/ESP-WROOM-02DCUC-4.png)



5.2. 选择串口和波特率（烧录固件波特率没有限制），点击”START”，然后设备上电，开始进行烧录。烧录进度条结束，界面提示“完成”表示烧录成功。

![ESP-WROOM-02DC/UC-img](/assets/zh-cn/deviceDev/WiFi_Module/ESP-WROOM-02DCUC/ESP-WROOM-02DCUC-5.png)



# 5.如何抓取ESP-WROOM-02模组日志

1. 按照下图ESP-WROOM-02的管脚定义图，将图中所示的IO2（UART1_TXD）（芯片调试日志信息输出口）通过USB转TTL工具连接到电脑，且USB转TTL工具的GND需接模组的18脚GND，波特率74880bps。

![ESP-WROOM-02DC/UC-img](/assets/zh-cn/deviceDev/WiFi_Module/ESP-WROOM-02DCUC/ESP-WROOM-02DCUC-6.png)

2. 机智云串口打印软件工具下载链接：链接：https://eyun.baidu.com/s/3oAbSruq 密码：pPsL

3. 机智云乐鑫8266 固件版本号为：04020036版本或更高级版本，模组串口日志打印为加密，需要使用对应版本号的.mapTab文件解码。对应的解码文件请参考本文第2章“ESP-WROOM-02模组资料下载及获取”。

![ESP-WROOM-02DC/UC-img](/assets/zh-cn/deviceDev/WiFi_Module/ESP-WROOM-02DCUC/ESP-WROOM-02DCUC-7.png)

# 6.搭配gokit接入机智云（包含创建数据点，下载代码，demoAPP配网绑定及控制设备等）

快速接入文档参考链接： http://docs.gizwits.com/zh-cn/quickstart/UseMCU_BK.html 

> ***备注：模组的UART0为与GoKit串口通讯串口，通讯波特率为9600bps。***

# 7.FAQ

1. Q: 如何排查AirLink配网失败问题？

​    A: 参考链接：http://docs.gizwits.com/zh-cn/deviceDev/Onboarding.html