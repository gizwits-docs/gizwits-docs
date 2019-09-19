title: G510接入机智云方案及问题排查指引
---

# 一、本文编写背景

本文主要介绍G510模组如何快速从零开始接入机智云，实现简单的控制设备功能，以及常见的联网失败问题排查，还提供了该模组的相关资料。

# 二、G510模组资料下载及获取

链接：https://eyun.baidu.com/s/3c3aA4us 密码：ZINH

# 三、G510模组串口烧写固件说明

G510模组管脚图

![name](/assets/zh-cn/deviceDev/debug/G510/000000.png)

1.当拿到一片G510 DTU RS485 1911的时候，第一件事是要给该DTU烧写机智云的Gagent固件。机智云G510 DTU，版本号为04020040的固件[下载链接](http://goms-1251025085.cosgz.myqcloud.com/GAgent_00FBG510_04020040_201811071942-1542166609513.bin)

`备注：固件版本的更高版本，请联系商务同事或FAE同事获取。`

![name](/assets/zh-cn/deviceDev/debug/G510_DTU_RS485_1911/2.png)

2.下载了模组固件后，还需要下载广和通提供的串口烧写软件，软件下载链接：

链接：https://eyun.baidu.com/s/3dGdWptJ 密码：96nB

打开软件界面如下图所示

![name](/assets/zh-cn/deviceDev/debug/G510_DTU_RS485_1911/3.png)

3.上述步骤1，步骤2软件部分准备好以后，需要对ESP-WROOM-02D进行硬件处理。将 ESP-WROOM-02 的如下表所示的管脚引出。

| 管脚  | 参数 |
| ------------- | ------------- |
| 1  | GND |
| 10  | VBAT  |
| 19  | UART1_TXD  |
| 18  | UART1_RXD  |
| 14  | POWER_ON  |

使用杜邦线将USB转TTL串口模块与焊接好的G510模组连接。

![name](/assets/zh-cn/deviceDev/debug/G510/000000.png)

4.使用串口工具烧写G510，先将G510断电，USB转TTL串口模块连接G510，打开Fibocom_upgrade

![name](/assets/zh-cn/deviceDev/debug/G510_DTU_RS485_1911/4.png)

![name](/assets/zh-cn/deviceDev/debug/G510_DTU_RS485_1911/5.png)

点击升级程序按钮后给G510上电即可开始烧写程序（G510在上电的时候才会检测是否有固件升级）

# 四、如何抓取G510日志

G510的日志串口与程序烧写串口是同一串口，波特率115200bps，下载机智云串口打印软件工具下即可抓取模组日志，下载链接：https://eyun.baidu.com/s/3smYywot 密码：1Jd3

![name](/assets/zh-cn/deviceDev/debug/G510_DTU_RS485_1911/6.png)

`备注：映射文件请联系机智云FAE同事获取。`

# 五、G510搭配gokit接入机智云（包含创建数据点，下载代码，demoAPP绑定及控制设备等等）

快速接入文档参考链接：http://docs.gizwits.com/zh-cn/deviceDev/debug/G510_Project.html

# 六、FAQ

1.	Q: G510 DTU RS485 1911支持什么运营商的流量卡？
    	A: 支持移动、联调；不支持电信
    
2.	Q: GPRS模组流量的基本要求（月最低流量要求）
A:设备与机智云数据交互主要采用MQTT协议。设备与机智云数据交互的最小数据量是设备与机智云通讯的心跳。mqtt心跳是2个字节，tcp协议头是40字节，50秒一次，需要包括心跳和心跳回复。所以每50秒流量是：（40+2）*2=84 Bytes。一个月按30天算流量大概是：4252K。所以GPRS模组至少需要每个月有4252K流量，以保证GPRS可以正常上网。

（还有定时的provision和DNS耗流量补充）
