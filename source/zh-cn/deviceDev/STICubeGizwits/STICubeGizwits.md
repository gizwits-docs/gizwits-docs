title: ST I-CUBE-GizWits套件快速接入指南
---
# 产品介绍
基于ST和机智云的I-cube-gizwits软件包运行在基于ARM Cortex-M处理器的STM32微控制器上。

I-cube-gizwits软件包嵌入了机智云的GAgent，设备可以通过GAgent访问机智云云平台。GAgent主要的作用是数据转发，是设备数据、机智云、应用端（APP）的数据交互桥梁。GAgent提供了机智云云平台与单片机之间的通信协议，开发者可以根据该协议实现MCU与GAgent之间的通信。

用户可以通过手机连接到机智云云平台，并且可以随时随地获取设备的信息以及对设备进行控制。
I-cube-gizwits软件包是STM32 Cube的扩展软件包，基于STM32 Cube HAL库。

# 产品优势
1. 基于STM32 Cube，图形化操作，能够快速配置MCU外设，以及工程配置，提高开发效率。
2. 支持导出多个格式的工程：
   IAR Embedded Workbench for ARM ; 
   KEIL uVision;
   System Workbench for STM32;
3. 采用平台无关API，MCU/WIFI芯片平台切换成本低；
4. 嵌入式机智云GAgent联网服务，自动完成了联网功能，能够快速玩转机智云物联网云平台；

# 准备工作
### 1. 硬件：
1）B-L475E-IOT01A2开发板
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/1.jpg) ![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/2.jpg)

2）Micro USB线

### 2. 软件：
   下面三种开发工具任选其一：
1）	IAR Embedded Workbench for ARM 
2）	KEIL uVision5
3）	System Workbench for STM32

### 3. 其他：
1）机智云开发者账号
2）I-cube-gizwits固件包
3）I-cube-gizwits固件包文件夹结构简介：
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/3.jpg)

# 开始开发
### **1. 注册开发者账号**
机智云开发者账号，用于产品接入、设备管理、OTA服务、MCU开发等的功能使用。
注册链接：http://dev.gizwits.com/zh-cn/developer/
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/4.jpg)
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/5.jpg)

### **2. 新建产品**
注册完成后，登陆至机智云开发者中心后台后，点击开发者中心后台中间的“创建新产品”菜单，在跳转页面新建一个名为“GizTest”的产品(名称可自定)，选择“Wi-Fi/移动网络方案”方式接入，并完成产品创建。如下图：
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/6.jpg)
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/7.jpg)

### **3. 创建云端数据点（产品功能点）**

**数据点介绍：**
   
   即设备产品的功能的抽象，用于描述产品功能及其参数。创建数据点后，设备与云端通讯的数据格式即可确定，设备、机智云可以相互识别设备与机智云互联互通的数据。更多的解析和新建指引，可以在开发者中心数据点页面右上角“定义数据点教程”中查看找到帮助，以建立属于你自己产品的数据点，如下图：
   ![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/8.jpg)
   
**新建数据点：**

然后以本次的项目“GizTest”为例，简单描述一下云端数据点和产品的功能点的关系，本次的项目“GizTest”，它需要实现的功能是：

（1）	获取开发板陀螺仪X、Y、Z轴数值；
（2）	获取开发板相对湿度和温度传感器数值；
（3）	获取开发板LED的状态以及控制LED开关；

那我们需要在云端建立对应的数据点，如下图：
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/9.jpg)

下表是所有数据点的具体设置：
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/10.jpg)

添加数据点完成之后，点击下图的“应用”即可，完成整个产品的数据点的新建工作。
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/11.jpg)

### **4. GAgent API简介**
#### gagent_soc.h文件中API
（1）gagent_soc.h文件内容预览
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/12.jpg)

（2）API功能简介
    **1）gagentInit**
- 功能：gagent相关参数初始化
- 函数定义：void gagentInit(struct devAttrs attrs)
- 参数：struct devAttrs attrs ：对应初始化参数的结构体
```
struct devAttrs{
    unsigned short mBindEnableTime;
    unsigned char mstrProtocolVer[MCU_PROTOCOLVER_LEN];
    unsigned char mstrP0Ver[MCU_P0VER_LEN];
    unsigned char mstrDevHV[MCU_HARDVER_LEN];
    unsigned char mstrDevSV[MCU_SOFTVER_LEN];
    unsigned char mstrProductKey[PK_LEN];
    unsigned char mstrPKSecret[PKS_LEN];
    unsigned char mDevAttr[MCUATTR_LEN];
    unsigned char mstrSdkVerLow[SDK_USER_VER_LEN];
       //gagent 微信公众号ID,默认为机智云微信宠物屋ID
            uint8 *szWechatDeviceType;
       //gagent 默认连接服务器域名
            uint8 *szGAgentSever;
       //gagent 默认连接服务器端口，默认为80
            uint32 *gagentSeverPort;
       //gagent softap Name ,默认值:XPG-GAgent-xxxx(后面4位为MAC后4位)
            uint8 *szGAgentSoftApName;
       //gagent softap 密码 ,默认值:123456789，若内容为空则热点不加密;
            uint8 *szGAgentSoftApPwd;
       //m2m keepalive 默认值 120s
            uint32 *m2mKeepAliveS;
       //m2m 心跳间隔 默认值为 50s
            uint32 *m2mHeartbeatIntervalS;
       //gagent 时区秒，默认为东八区:8*(60*60)
            int32 *timeZoneS;
       //串口心跳间隔S，默认值 55秒
            uint32 *localHeartbeatIntervalS;
       //串口数据传送ACK时间，默认值600ms+数据长度耗时
            uint32 *localTransferIntervalMS;
};
```
- 返回：无
   
**2）gagentUploadData**
- 功能：上传数据到客户端
- 函数定义：
  int32 gagentUploadData(uint8 *szDID, uint8 *src, uint32 len,uint8 flag, void *arg,gagentUploadDataCb fun )
- 参数：
```
      uint8 *szDID	：要上传的数据对应的设备DID
                     （本平台[B-L475E-IOT01A2]szDID参数请设置为NULL）
      uint8 *src    ：要上传数据的内容指针
      uint32 len    ：上传数据的大小
      uint8 flag   	：1:数据大小循环通道都需要上传
           		      0:数据只上传小循环
                     （本平台[B-L475E-IOT01A2]flag参数请设置为1）
      void *arg 	：上传数据回调函数的参数，不能为NULL
     gagentUploadDataCb fun ：上传数据的结果回调函数
```
- 返回：
  GAT_OK           0      成功
GAT_ERR_FAIL    -1      失败

 **3）gagentGetNTP**
 - 功能：获取NTP时间
 - 函数定义：void gagentGetNTP(_tm *time)
 - 参数：
```
_tm *time       ：保存获取的NTP时间的结构体指针
typedef struct
{
    uint16 year;
    uint8 month;
    uint8 day;
    uint8 hour;
    uint8 minute;
    uint8 second;
    uint32 ntp;
}_tm;
```
- 返回：无

**4）gagentReset**
- 功能：重置模组，会清除配置信息和解除用户与之间的关系，该函数会导致模组重启
- 函数定义：void gagentReset(void)
- 参数：无
- 返回：无

### **5. 项目源码修改**
#### 5.1 打开工程文件(下面以IAR Embedded Workbench for ARM为例)
（1）安装好IAR Embedded Workbench for ARM 软件
（2）解压I-cube-gizwits固件包，打开路径 Gizwits_V1.1.1_Lib\Projects\B-L475E-IOT01\Applications\Cloud\Gizwits\EWARM 下的  Project.eww 文件

#### 5.2 基本信息修改
**（1）基本信息介绍：**
Product Key ：
定义：产品标识码，开发者通过机智云后台创建新产品后，自动生成的一个32位字符串。在机智云的数据库中是一个唯一的号码，开发者将ProductKey写入设备主控MCU后，机智云通过此标识码对设备进行识别并自动完成注册。

Product Secret :
定义：产品密钥，在生成Productkey的时候云端会对应生成一个Product Secret，该参数为关键性机密参数，不应向第三方泄露。

版本号：用来区分不同版本代码。

**（2）获取项目基本信息**
在机智云开发者平台中打开项目，点击左侧基本信息，从中可获得本项目的Product Key和Product Secret(需要输入登录密码获得)；版本号由用户决定。
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/13.jpg)

**（3）源码相应修改位置**
打开工程路径 Application\Common下文件gagent_iot_test_basic_connectivity.c 修改文件中的STR_PK和STR_PS相关参数，将从机智云平台获取的Product Key和Product Secret填入相应位置：
```
#define STR_PK     "plese replace your product PK" 
                   //find it on your Gizwits Platform Project
#define STR_PS    "plese replace your product PS" 
                   //find it on your Gizwits Platform Project

程序提供了1byte用于版本号，版本号范围是1-255，程序中值是用十六进制表示的，所以填写时请按十六进制格式填写（01-FF）：
#define GIZ_VER        "01" //is your project version,you can change it.
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/14.jpg)

```
#### **5.3 外设的驱动初始化代码添加**
请在工程路径Application\Common下文件gagent_iot_test_basic_connectivity.c文件中
的userInit()函数中添加外设的驱动初始化相关代码
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/15.jpg)

#### **5.4 云端下发数据处理**
（1）设备和云端通信协议
请在机智云开发者平台项目页面中点击开发向导，在MCU开发资源中下载《GizTest - 机智云WiFi类设备接入协议文档-SoC方案.pdf》
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/16.jpg)

在文档中查看控制设备的相应指令协议格式，定义的数据点不同，生成的文档内容会不同，请以你生成的文档为准。
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/17.jpg)
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/18.jpg)

举例：例如收到的控制设备数据是：01 01 00
则action为01，是控制设备指令（不同指令action不同）
attr_flags为01，bit0为1，表示设置LED
attr_vals为00，bit0为0，表示设置LED的值为0，关闭LED

（2）源码相应修改位置
打开工程路径Application\Common下文件gagent_iot_test_basic_connectivity.c
在gizIssuedProcess ()函数中处理云端下发的数据，传入的数据格式跟协议中对应，请参照协议文档在函数中对action进行判断得到指令类型，然后进行相应处理。
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/19.jpg)

#### **5.5 上报云端状态事件处理**
**（1）设备主动上报当前状态**

1)设备和云端通信协议

请在机智云开发者平台项目页面中点击开发向导，在MCU开发资源中下载《GizTest - 机智云WiFi类设备接入协议文档-SoC方案.pdf》,在文档中查看控制设备的相应指令协议格式，定义的数据点不同，生成的文档内容会不同，请以你生成的文档为准。

设备主动上报当前状态相关协议：
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/20.jpg)
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/21.jpg)

2）源代码修改位置

打开工程路径Application\Common下文件sensors_data.c，在PrepareMqttPayload ()函数中根据协议指令格式对当前状态的数据进行组包。

下图中按照前面的协议对数据进行了组包：
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/22.jpg)

同时还需要根据组完包后PayloadBuffer数组的大小修改对应的初始化。
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/23.jpg)

需要触发主动上报的情况：
- 设备定时上报当前状态
- 设备状态发生变化时主动上报（包括云端下发控制指令后设备状态变化）

a.设备定时上报代码相应修改位置：
打开工程路径Application\gagent_wrapper下文件ioftime.c，在timerEventHandler ()函数中可修改定时上报的周期，单位是ms
if(tick_count >= 10000)   //修改后面的数值
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/24.jpg)

b.设备状态发生变化时主动上报代码相应修改位置：
在需要触发主动上报的位置添加如下代码：
```
if(osThreadIsSuspended(SensorThreadHandler) == osOK)
{
osThreadResume(SensorThreadHandler);
}
```

**（2）收到读取设备当前状态的指令后上报当前状态**
1)设备和云端通信协议

请在机智云开发者平台项目页面中点击开发向导，在MCU开发资源中下载《GizTest - 机智云WiFi类设备接入协议文档-SoC方案.pdf》，在文档中查看控制设备的相应指令协议格式，定义的数据点不同，生成的文档内容会不同，请以你生成的文档为准。

读取设备当前状态相关协议：
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/25.jpg)
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/26.jpg)

2）源代码修改位置

打开工程路径Application\Common下文件gagent_iot_test_basic_connectivity.c，在gizIssuedProcess ()函数中需要对云端下发的数据进行判断，判断action是否为02，是则添加相应的代码触发数据上报：
```
if(osThreadIsSuspended(SensorThreadHandler) == osOK)
{
Device_Passive_Report = 1;
osThreadResume(SensorThreadHandler);
}

![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/27.jpg)

```
#### **5.6 程序编译和加载**
**（1）程序编译(下面以IAR Embedded Workbench for ARM为例)**
可选择菜单栏 ProjectMake ，或者点击工具栏对应图标开始编译
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/28.jpg)

**（2）程序加载**
1）程序编译完成后，在路径
Gizwits_V1.1.1_Lib\Projects\B-L475E-IOT01\Applications\Cloud\Gizwits\EWARM \B-L475E-IOT01\Exe下会生成 Project.bin 文件，复制该文件；

 2）将Micro USB线插入开发板的USB STLINK接口（如图），另一端连接电脑。
 ![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/29.jpg)
 
插入电脑后，在我的电脑会出现一个名为DIS_L4IOT的盘，进入DIS_L4IOT，将前面复制的Project.bin文件粘贴到里面，复制完成后会自动退出DIS_L4IOT盘，表示文件加载完成。
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/30.jpg)
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/31.jpg)

#### **5.7 WIFI信息配置**
**（1）设置波特率**
使用串口工具（可以用SecureCRT）打开设备串口（串口号在设备管理器中查看），波特率为115200

**（2）进入WIFI信息配置模式方式：**
1）按下开发板上的RESET按键，如果没有配置过WIFI信息，则自动进入配置模式
2）按下开发板上的RESET按键，如果配置过WIFI信息，则在按下RESET按键后的5s内按下开发板上的USER按键进入配置模式
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/32.jpg)

**（3）信息配置**
进入配置模式后开发板会打印如下信息
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/33.jpg)

1）输入： y ，会请求输入SSID（WIFI名称）
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/34.jpg)

2）输入SSID，按回车键（注意：这里输入SSID的时候是没有显示的，输入完成回车后才会显示SSID信息）
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/35.jpg)

3）输入WIFI模式，根据路由器的配置来选择，如果WIFI没有密码，则输入0，如果WIFI有密码但不知道是哪一种模式，则输入3（如果后面无法连接上则要去查看路由器的配置）
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/36.jpg)

4)输入WIFI密码，按回车键，WIFI信息配置完成，开发板会尝试连接WIFI
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/37.jpg)

5）如果连接上WIFI，开发板会正常运行打印其它信息，如果无法连接上WIFI，请检查输入的WIFI信息是否有错误
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/38.jpg)

#### **5.8 上线情况以及日志查看**

设备运行后，可在机智云开发者平台对应项目中设备日志中查看，点击查看可浏览通信日志、上下线记录、运行记录
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/39.jpg)
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/40.jpg)

#### **5.9 APP控制设备**

从机智云下载中心下载机智云串口调试助手绑定设备
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/41.jpg)
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/42.jpg)
 
 打开机智云串口调试助手，点击下方“小工具”，然后选择上方的”二维码生成”，输入项目的Product Key和设备的MAC，点击“获取二维码”。
 ![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/43.jpg)
 ![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/44.jpg)
 ![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/45.jpg)
 
 从下载中心下载机智云调试APP，安装，打开APP
 ![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/46.jpg)
 
 
 点击左上角“我的设备”，扫描生成的二维码，扫描完成列表会显示相应的设备，点击设备就可以进入设备控制界面
 ![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/47.jpg) ![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/48.jpg)
 
 ### **6. OTA升级流程**
 
#### 6.1 生成OTA升级固件

请将新版本程序编译（记得修改版本号，修改方式请查看前文，需大于待升级设备的版本号），生成Project.bin文件（以IAR Embedded Workbench for ARM为例，文件在Gizwits_V1.1.1_Lib\Projects\B-L475E-IOT01\Applications\Cloud\Gizwits\EWARM \B-L475E-IOT01\Exe目录下）

#### 6.2 固件命名规则
GAgent命名是有固定标准的，名称由GAgent、硬件版本名称、软件版本、发布日期、特殊标记信息三部分组成。

举例：
GAgent_00BL01A2_04030002_18090510.bin
GAgent：固定的字段，不用修改;
00BL01A2：硬件版本名称，B-L475E-IOT01A2开发板统一使用00BL01A2，不用修改;
04030002：软件版本，用户需要根据程序中的版本号修改最后两位，前面040300不用修改;
18090510：发布日期，18年09月05日10点，用户根据实际时间修改;

如果需要对估计做特殊标记，可以添加在最后，举例：
GAgent_00BL01A2_04030002_18090510_UART.bin
请用户对Project.bin文件按命名规则修改名称

#### 6.3 上传固件到开发者平台
登录机智云开发者平台，进入对应项目，点击左侧“固件升级(OTA)”，然后点击中间的创建新固件
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/49.jpg)

填写固件信息，下图中的版本名称用户可以自定，可以方便用户区别不同版本就行，硬件版本号和软件版本号按实际填写，其它信息按默认的就行，然后上传固件，然后点击“完成 ”。如果想了解关于固件升级的一些事项，可以点击下图中右上角的“查看固件升级FAQ”
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/50.jpg)

完成固件上传和信息填写后，会进入固件验证界面，请用户核对固件信息是否填写有误，如需修改或删除，可以点击右侧选项，核对信息无误后，需进行固件验证。（需使用一台设备用户固件验证，设备要能够正常上线）
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/51.jpg)

点击“验证固件”，会出现如下界面，请填写用于验证的设备对应的MAC地址（可在设备日志中查看，如果填写错误会导致最后验证失败），然后点击“推送”。
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/52.jpg)

进入验证固件界面，请用户耐心等待。
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/53.jpg)

如果固件验证成功，会出现如下界面，请打勾后点击“完成”
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/54.jpg)

如果固件验证失败，会出现如下界面
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/55.jpg)

固件验证成功后，可以进行正式推送，推送前需要设置推送的规则
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/56.jpg)

推送可按指定地区推送或指定MAC推送，设置好推送方式后，请设置推送的周期，然后点击“保存”
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/57.jpg)

保存后在相应的规则会出现在固件推送页面下方，点击“开始推送”，开始推送固件给指定的地区或指定的MAC
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/58.jpg)
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/59.jpg)

如果需要在推送过程中停止推送，请点击“停止推送”
可以点击“手动刷新”来查看目前已推送成功的设备数量
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/60.jpg)

# FAQ
**问题：加载新的程序，上电后运行的还是之前的程序**
解决步骤：
（1）下载安装STM32 ST-LINK Utility软件
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/61.jpg)

（2）将开发板用Micro USB线接入电脑，点击下图红框中的图标，连接设备
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/62.jpg)
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/63.jpg)

（3）点击菜单栏 Target Option Bytes，打开Option Bytes设置页面，查看BFB2一项后面是否有打勾，如果有打勾，则把勾去掉，然后点击 Apply。
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/64.jpg)

（4）点击下图红框中的图标，断开STM32 ST-LINK Utility软件与设备的连接，然后重启开发板
![@ST-I-CUBE-GIZWITS](/assets/zh-cn/deviceDev/STCUBEGIZWITS/65.jpg)










