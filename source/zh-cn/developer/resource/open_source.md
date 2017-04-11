title: 这里是标题
---
# GAgent
GAgent是运行在各种通讯模组上的一款应用程序（固件）,可以提供上层应用（手机APP等控制端、云端）到产品设备的双向数据通讯，此外，还提供对设备的配置入网、发现绑定、程序升级等功能。

产品开发者使用GAgent后，只需要关心产品的业务逻辑开发，不用关心数据的通讯功能开发，大大降低了开发的难度。

该固件遵循以下协议《机智云平台标准接入协议之MCU与WiFi模组通讯》、《机智云平台标准接入协议之设备与云端通讯》、《机智云平台标准接入协议之App与设备通讯》。


## ECE雾计算esp8266固件包 试用版
- [资源下载 :戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/ECE%E9%9B%BE%E8%AE%A1%E7%AE%978266%E5%9B%BA%E4%BB%B6%E5%8C%85.zip)
- 发布时间：2017.1.11 15:59 
- 更新信息  :该demo实现了下列功能：
   1. 当检测到上报温度大于27度时，通知MCU打开电机;
   2. 当红外对管检测到障碍物时，打开红灯;
- 旧版本下载(无)


## GAgent for ESP8266
- [资源下载 :戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/GAgent_00ESP826_04020023_17032418.rar)
- 发布时间：2017.3.29 11:02 
- 更新信息
   1. 更新软件版本号为04020023 
   2. 优化上电情况下概率绑定时间 
   3. 优化与MCU握手重发的串口数据包错误的问题 
   4. 特定情况下OTA升级优化

**旧版本下载**
- 版本号: 04020021   /  更新时间: 2016.12.28 18:37   /   [资源下载:戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/GAgent_00ESP826_04020021_16122717.tar) 
   - 更新信息
      1. 修改版本号为04020021 
      2. 支持使用安全注册接口,需MCU配套支持;
      3. 提供时区设置的精度,支持设置0.25等时区;
      4. OTA下载支持断点续传,提高ota成功率; 
      5. did在云端不存在时，重新注册did; 
      6. 新增上报MCU设备属性 
      7. 其它优化

- 版本号: 04020020      /  更新时间: 2016.11.09 11:58   /    [资源下载](http://gizwits.oss.aliyuncs.com/hardware_resource/GAgent_00ESP826_04020020_16110718.tar)
   - 更新信息
      1. 修改版本号为04020020 
      2. 更新乐鑫NONOS SDK到2.0.0及20160809patch 
      3. boot从1.5更新到1.6,更新esp_init_data_default文件 
      4. 支持全球域名统一固件 
      5. 获取网络时间可以返回当地时区的时间 

- 版本号: 04020019     /  更新时间: 2016.10.19 14:13      /  [资源下载:戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/GAgent_00ESP826_04020019_16101715_combine.zip)
  - 更新信息
      1. 版本号更新为04020019 
      2. 增加flash断电保护机制 
      3. 域名信息同步给APP 
      4. 配置成功包增加设备属性成员 
      5. 取消大数据上传不能超过64K的限制 
      6. 修改连接路由的策略 
      7. 增加路由断连恢复策略 
      8. 增加DNS解析异常重试处理 
      9. 修改云端DNS缓存策略，减小连接云端的时间 
      11. 修改路由上电默认配置模式为airlink模式 
      12. 其它优化，增加通道的独立性，预留通道扩展能力等

- 版本号: 04020014   /  更新时间: 2016.8.09 16:55    /  [资源下载:戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/GAgent_00ESP826_04020014_16080510.bin)
  - 更新信息
      1. 版本号更新为04020014； 
      2. 增加tcp和串口收发队列，增强数据缓存处理能力； 
      3. 取消Nagle算法，提高TCP传输时效； 
      4. 增加http协议对Chunked/Content-Length两种传输方式的支持； 
      5. 增加大循环/小循环连包处理； 
      6. 增强异常数据情况下，恢复解析正常包的能力； 

- 版本号: 04020013  / 更新时间: 2016.6.15 15:44  / [资源下载:戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/GAgent_00ESP826_04020013_16061509.bin)
   - 更新信息
     1. 版本号更新为04020013 
     2. 支持机智云微信宠物屋公众号进行airkiss配置和发现 
     3. 支持MCU大数据上传功能 
     4. 提高注销did的成功率 



## GAgent for HFLPT120/LPB120
- [资源下载 :戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/GAGENT_00HFT120_04020021_17011015.zip)
- 发布时间：2017.1.11 
- 更新信息：版本号更新为04020021 
       1. 添加路由断连恢复策略 
       2. 添加DNS解析异常重试处理  
       3. 添加支持全球域名统一固件 
       4. 修改云端连接策略及异常处理 
       5. 修改云端DNS缓存策略，减小连接云端的时间 
       6. 优化串口通信处理，提高速度 
       7. 增加OTA成功率，支持断点续传下载。 
       8. 支持上报MCU设备属性 
       9. 支持使用加密的云端注册接口 
       10. 其它优化

**旧版本下载**

- 版本号: 04020014  / 更新时间: 2016.11.09 18:29    /   [资源下载:戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/GAgent_00HFT120_04020014_16110719.tar)
  - 更新信息：版本号更新为04020014 
     1. 优化结构,提高数据接收的响应速度 
     2. 增加tcp和串口收发队列，增强数据缓存处理能力 
     3. 增加http协议对Chunked/Content-Length两种传输方式的支持 
     4. 增强异常数据情况下，恢复解析正常包的能力 
     5. 提高OTA成功率 
     6. 支持airlink配置级联路由环境 
     7. 完善对产测模式的支持 
     8. 支持大文件上传长度超过64KB 
     9. 其它优化

- 版本号: 04020011  / 更新时间: 2016.8.17 10:45    /   [资源下载:戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/GAgent_00HFT120_04020011_16081622.tar)
  - 更新信息
     1. 版本号修改为04020011; 
     2. 支持MCU OTA功能; 
     3. 支持大文件上传功能; 

- 版本号: 04020010  /  更新时间: 2016.7.25 15:21    /   [资源下载:戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/GAgent_00HFT120_04020010_16072014.tar)
  - 更新信息
     1. 第一次对外发布，版本号04020010； 
     2. 配置入网支持softAP、AirKiss、SmartLink三种配置方式； 
     3. 支持WiFi OTA； 
     4.支持大小循环控制； 
     5.支持云端掉线重连； 
     4. 支持路由掉线重连； 
     5. 暂不支持MCU OTA； 
     6. 暂不支持MCU 大数据上传


## GAgent for HF LPB100
- [资源下载 :戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/GAgent_00HFLPB1_04020018_16122717.tar)
- 发布时间：2016.12.28 18:49 
- 更新信息：软件版本号更新为04020018 
    1. 支持全球统一固件 
    2. 支持设置显示当地时区时间 
    3. 提高ntp时间精度 
    4. 新增dns联系2小时失败后重启的策略 
    6. 优化重连m2m策略,主动检测通道断开事件 
    7. 优化大文件上传策略 
    8. 增加上电时通知MCU当前模组状态 
    9. 其它优化

**旧版本下载**
- 版本号: 04020017  / 更新时间: 2016.11.24 17:21  /   [资源下载:戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/GAgent_00HFLPB1_04020017_16112118.tar)
   - 更新信息
     1. 软件版本号更新为04020017 
     2. 支持连接隐藏ssid路由器 
     3. 优化内存和日志信息

- 版本号: 04020016  / 更新时间: 2016.10.18 11:37  /   [资源下载:戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/GAgent_LPB100_04020016_16100917.tar)
   - 更新信息
     1. 版本更新为04020016 
     2. 修复新出厂模组无法进入softAP配置模式的问题; 
     3. 修复reset时没有清除系统参数区中保存的ssid等信息的问题; 
     4. 解除大文件上传数据不能超过64KB的限制; 
     5. 修复某些情况下无法退出产测模式的问题;

- 版本号: 04020013  / 更新时间: 2016.7.29 11:00  /   [资源下载:戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/GAgent_00HFLPB1_04020013_16072610.zip)
  - 更新信息
     1. 版本号更新为04020013； 
     2. 增加接收softAP配置时，回复ACK包； 
     3. 增加同app通信数据连包的处理； 
     3. 增加同云端通信数据连包的处理； 
     4. 增加对http回复不带结束符字符串的支持； 
     5. 优化NTP策略，减小误差； 

- 版本号: 04020009  /  更新时间: 2016.3.01 17:13  /   [资源下载:戳我>>](http://gizwits.oss-cn-hangzhou.aliyuncs.com/GAgent_00HFLPB1_04020009_16030114.zip)
  - 更新信息
     1. 版本号更新为04020009。  
     2. 功能增加：增加日志系统。  
     3. 优化路由连接策略：模组有ssid 链接不上路由时，120s 超时重启。  
     4. 修改 mcu ota 策略，增加成功率。  
     5. 修改 webconfig 策略， 减少内存开支。  
     6. 优化连接云端dns解析IP时间点。  


## GAgent for MXCHIP 
- [资源下载 :戳我>>](http://gizwits.oss-cn-hangzhou.aliyuncs.com/GAgent%2FGAgent_00MX3162_04020011_16030216.bin)
- 发布时间：2016.3.04 10:11
- 更新信息
   1. 版本号更新为04020011。 
   2. 功能增加:增加日志系统。  
   3. 优化GAgent 接收在线OTA的功能。   
   4. 修复从GAgent1.0 架构升级到到 04020007 以及之上的版本配置数据丢失问题。


## GAgent for QCA4004 
- [资源下载 :戳我>>](http://gizwits.oss-cn-hangzhou.aliyuncs.com/GAgent%2FGAgent_00QC4004_04020007_15120914_UART.bin)
- 发布时间：2015.12.16 11:13
- 更新信息
   1. 版本号04020007
   1. SmartConfig配置支持（不支持中文SSID）。  
   2. 优化DNS解析定时器。  
   3. 优化云端MQTT心跳策略。  
   4. 删除周期性的日志输出。

## GAgent for RealTek 8711AM 
- [资源下载 :戳我>>](http://gizwits.oss-cn-hangzhou.aliyuncs.com/GAgent%2FGAgent_1DRTL001_04020001_15120910_UART.bin)
- 发布时间：2015.12.16 11:16 
- 更新信息
   1. 版本号04020001
   1. Simple config配置优化，提高配置成功率。


## GAgent for 联盛德 TLN13SP01
- [资源下载 :戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/GAgent_1H010001_04020010.bin)
- 发布时间：2017.2.21 14:36 
- 更新信息
   1. 版本号04020010 
   1. 首次发布，支持接入机智云

## GAgent for 锐凌微 TinyCon3350-M26
- [资源下载 :戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/GAgent_0GRLWM26_04020018_2017022011.bin)
- 发布时间：2017.3.29 11:09  
- 更新信息
   1. 版本号04020018 
   1. 首次发布，支持接入机智云

# GoKit MCU示例工程

微信宠物屋是用GoKit开发板开发出的一款智能硬件产品，这款产品可以采集温湿度，开关风机，检测红外遮挡，开关彩色LED灯；并可在手机APP或者微信服务号上实时监测与调节宠物屋环境、掌握宠物活动动向。通过微信宠物屋这个产品，可以帮助开发者了解机智云的智能硬件体系，更快的完成智能硬件产品的开发。

以下的资源为针对不同Gokit开发底板的宠物屋的MCU代码实现。

## GoKit3(S) ESP8266
微信宠物屋 for GoKit3(S) ESP8266 V03000003
- [资源下载 :戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/gokit3_SoC_ESP8266_03000003_2016120711.zip)
- 发布时间：2016.12.01 19:46 
- 更新信息
   1. 更新GAgent库为04020320版本(对应ESP8266固件版本号为04020020)  
   2. 增加产测支持(短按Key1进入产测模式)  
   3. 增加获取时间API  
   5. OTA硬件版本号为00ESP826，软件版本号为040203xx 
   6. 其他优化 

** 旧版本下载 **
- 版本号: V03000002  / 更新时间: 2016.7.23 18:03  /   [资源下载:戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/gokit3_SoC_ESP8266_03000002_2016071817.zip)
   - 更新信息:  
     - 对应gagent版本号为04020013

## GoKit 2/3 STM32
微信宠物屋 for GoKit 2/3 STM32 V03010101
- [资源下载 :戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/gokit_mcu_stm32_V03010101_2016120118.zip)
- 发布时间：2016.12.01 19:10
- 更新信息
   1. 增加产测支持(短按Key1进入产测模式)  
   2. 增加获取时间API  
   3. 其他优化

**旧版本下载**
- 版本号: V03010100  / 更新时间: 2016.7.19 15:58  /   [资源下载:戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/gokit_mcu_stm32_V03010100_2016071910.zip)
   - 更新信息:  
     1. 采用新的源码框架，封装协议处理，简化API，数据点转换为对应事件处理。 
     2. 去掉智能宠物屋product key，需用户添加自定义产品product key。

- 版本号: 2.3.2  / 更新时间: 2016.1.04 12:20   /   [资源下载:戳我>>](http://gizwits.oss-cn-hangzhou.aliyuncs.com/hardwareres%2Fgokit_mcu_stm32_V2.3.2.zip)
   - 更新信息:  
     1. v2.3.2 1、修复STV2.1底板温湿度不规则报0的问题；


## GoKit 2 Arduino
微信宠物屋 for GoKit 2 Arduino 2.3.1
- [资源下载 :戳我>>](http://gizwits.oss-cn-hangzhou.aliyuncs.com/hardwareres%2Fgokit_mcu_arduino_V2.3.1.zip)
- 发布时间：2016.1.04 12:19
- 更新信息
   1. V2.3.1 
   2. 修改进入AirLink模式时，RGB灯为绿色. 
   3. 取消key1键的RGB灯指示.


## GoKit 1.0
微信宠物屋 for GoKit 1.0.20141116
- [资源下载 :戳我>>](http://gizwits.oss-cn-hangzhou.aliyuncs.com/hardwareres/%E6%99%BA%E8%83%BD%E5%AE%A0%E7%89%A9%E5%B1%8B_GoKit.zip)
- 发布时间：2015.4.22 17:38
- 暂无更新信息


# GoKit MCU示例工程
微信宠物屋
微信宠物屋是用GoKit开发板开发出的一款智能硬件产品，这款产品可以采集温湿度，开关风机，检测红外遮挡，开关彩色LED灯；并可在手机APP或者微信服务号上实时监测与调节宠物屋环境、掌握宠物活动动向。通过微信宠物屋这个产品，可以帮助开发者了解机智云的智能硬件体系，更快的完成智能硬件产品的开发。

以下的资源为针对不同Gokit开发底板的宠物屋的MCU代码实现。

## GoKit3(S) ESP8266
微信宠物屋 for GoKit3(S) ESP8266 V03000003
- [资源下载 :戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/gokit3_SoC_ESP8266_03000003_2016120711.zip)
- 发布时间：2016.12.01 19:46 
- 更新信息
   1. 更新GAgent库为04020320版本(对应ESP8266固件版本号为04020020)  
   2. 增加产测支持(短按Key1进入产测模式)  
   3. 增加获取时间API  
   5. OTA硬件版本号为00ESP826，软件版本号为040203xx 
   6. 其他优化 

**旧版本下载**
- 版本号: V03000002  / 更新时间: 2016.7.23 18:03  /   [资源下载:戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/gokit3_SoC_ESP8266_03000002_2016071817.zip)
- 更新信息:  对应gagent版本号为04020013

## GoKit 2/3 STM32
微信宠物屋 for GoKit 2/3 STM32 V03010101
- [资源下载 :戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/gokit_mcu_stm32_V03010101_2016120118.zip)
- 发布时间：2016.12.01 19:10
- 更新信息
   1. 增加产测支持(短按Key1进入产测模式)  
   1. 增加获取时间API  
   1. 其他优化

**旧版本下载**
- 版本号: V03010100  / 更新时间: 2016.7.19 15:58  /   [资源下载:戳我>>](http://gizwits.oss.aliyuncs.com/hardware_resource/gokit_mcu_stm32_V03010100_2016071910.zip)
   - 更新信息:  
     1. 采用新的源码框架，封装协议处理，简化API，数据点转换为对应事件处理。 
     1. 去掉智能宠物屋product key，需用户添加自定义产品product key。

- 版本号: 2.3.2  / 更新时间: 2016.1.04 12:20   /   [资源下载:戳我>>](http://gizwits.oss-cn-hangzhou.aliyuncs.com/hardwareres%2Fgokit_mcu_stm32_V2.3.2.zip)
   - 更新信息:  
     1. 版本号v2.3.2 1
     2. 修复STV2.1底板温湿度不规则报0的问题；


## GoKit 2 Arduino
微信宠物屋 for GoKit 2 Arduino 2.3.1
- [资源下载 :戳我>>](http://gizwits.oss-cn-hangzhou.aliyuncs.com/hardwareres%2Fgokit_mcu_arduino_V2.3.1.zip)
- 发布时间：2016.1.04 12:19
- 更新信息
   1. 版本号 V2.3.1 
   1. 修改进入AirLink模式时，RGB灯为绿色. 
   1. 取消key1键的RGB灯指示.


## GoKit 1.0
微信宠物屋 for GoKit 1.0.20141116
- [资源下载 :戳我>>](http://gizwits.oss-cn-hangzhou.aliyuncs.com/hardwareres/%E6%99%BA%E8%83%BD%E5%AE%A0%E7%89%A9%E5%B1%8B_GoKit.zip)
- 发布时间：2015.4.22 17:38
- 暂无更新信息


# 客户端开发资源

## 开源框架

开源框架是机智云出品的，包含Wi-Fi类智能硬件app通用功能的一套源码。只要是使用机智云协议的产品，开发者开发配套的app时都可以直接使用该框架的源码实现快速开发，从而也满足app的开发周期短、成本低的要求。

开源框架包括智能硬件app通用的5个模块，分别是：初始化模块、用户模块、配置模块、设备列表模块、控制模块。

#### 开源框架 for iOS V2.5.0    
- [框架下载>>](https://git.oschina.net/dantang/GizOpenSource_AppKit_iOS)
- 发布时间：2016.11.07 16:01    
- 更新信息 
    1. 包括智能硬件app通用的5个模块，分别是：初始化模块、用户模块、配置模块、设备列表模块、控制模块。

** 开源框架 for Android V2.5.0 **
- [框架下载>>](https://git.oschina.net/dantang/GizOpenSource_AppKit_Android)
- 发布时间：2017.3.17 18:37      
- 更新信息 
   - 版本号：2.5.0 
   - 除Eclipse外，还提供Android Studio版本： https://git.oschina.net/dantang/GOpenSource_AppKit_Android_AS  
   - 在使用时请注意以下问题：
      - 为避免工程加载出错，工程绝对路径不要太长； 
      - JDK请使用1.7以上版本； 
      - 此AS工程需要使用最新AS环境编译，如果AS版本过低将会遇到编译错误。开发者请对照以下说明，修改为符合自己编译环境的版本： 
        - 1、在gradle-wrapper.properties中，找到以下内容，修改为自己的AS环境支持的版本：distributionUrl=https\://services.gradle.org/distributions/gradle-3.3-all.zip 
        - 2、在build.gradle（Moudle : app）中，找到以下内容，修改为自己AS环境支持的版本号： compileSdkVersion 25 buildToolsVersion '25.0.2' targetSdkVersion 25 compile 'com.android.support:appcompat-v7:25.1.0' 
        - 3、在build.gradle（project）中，找到以下内容，修改为自己的AS环境支持的版本号： classpath 'com.android.tools.build:gradle:2.5.0' 此外，请初学的小伙伴注意AS编译器给出的错误信息提示，依据错误信息调整自己的AS开发环境。
        - 4、举个例子：如果在build.gradle（Moudle : app）中指定了buildToolsVersion是25.0.2，但小伙伴的AS环境中没有这个版本，编译器会提示如下信息： Error: Failed to find Build Tools revision 25.0.2, Install Build Tools 25.0.2 and sync project 意思是小伙伴需要安装25.0.2版本的Build Tools。 特在此友情提示初学开发者，希望可以帮助您更轻松的解决编译环境问题。


## 设备接入SDK

设备接入SDK封装了手机（包括PAD等设备）与机智云智能硬件的通讯过程，以及手机与云端的通讯过程。这些过程包括配置入网、发现、连接、控制、心跳、状态上报、报警通知等。

使用SDK，可以使得开发者快速完成APP开发，开发者仅需关注APP的UI和UE设计即可，而相对复杂的协议与错误处理等事项可忽略。另外还提供了APICloud版本的wifi设备接入SDK，可以使用JS语言更加快速完成APP开发。


#### Wi-Fi/移动通信产品SDK for iOS 2.06.06.1

- 集成文档  http://dev.gizwits.com/zh-cn/document/openplatform/i_01_iossdk/	
- SDK下载   http://gizwits.oss.aliyuncs.com/sdk/GizWifiSDK-iOS-2.06.06.1.zip
- 发布时间：2017.2.22 19:32
- 更新信息
   - 版本号：2.06.06.1  
   - 更新日志： 
     - 优化手机流量消耗 
     - 纠正数据点浮点数值精度损失 
     - 延长云端访问的超时时间，提高访问成功率  
     - 其他优化

**旧版本下载**

- 版本号: 2.06.06  /   更新时间: 2017.1.25 15:35  /  [SDK下载>>](http://gizwits.oss.aliyuncs.com/sdk/GizWifiSDK-iOS-2.06.06.zip)
  - 更新信息
    - 版本号：2.06.06  
    - 更新日志： 
       - 支持新的设备定时任务功能 
       - 新增设备分享功能
       - 支持变长数据点控制和上报 
       - 支持bitcode开启  
       - 优化设备时区的精确校准
       - 优化App在后台回前台时的设备搜索速度

- 版本号: 2.05.05.21618  /  更新时间: 2016.12.16 19:51  /  [SDK下载>>](http://gizwits.oss.aliyuncs.com/sdk/GizWifiSDK-iOS-2.05.05.21618.zip)
  - 更新信息
     - 版本号：2.05.05.21618  
     - 更新日志： 	
       - 支持ATS开启 
       - 优化日志上传 
       - 保持旧的SDK启动接口功能兼容

- 版本号: 2.05.05.2916  /   更新时间: 2016.11.30 10:59   /  [SDK下载>>](http://gizwits.oss.aliyuncs.com/sdk/GizWifiSDK-iOS-2.05.05.2916.zip)
  - 更新信息
    - 版本号：2.05.05.2916  
    - 功能更新： 
      - 支持设备服务域名的自动设置功能 
      - 支持设备解除订阅后仍可收到设备在线状态变化通知 
      - 增加私有部署某些功能的兼容  
    - 接口变更： 
      - startWithAppId：新增开启设备服务域名自动设置参数 
      - setDeviceServerInfo：参数mac使用变更。mac传空时可设置当前可设置的所有小循环设备域名 

- 版本号: 2.05.05  /   更新时间: 2016.11.10 10:50   /  [SDK下载>>](http://gizwits.oss.aliyuncs.com/sdk/GizWifiSDK-iOS-2.05.05.zip)
  - 更新信息
    - 版本号：2.05.05  
    - 功能更新： 
      - 1、可为设备或者手机App设置机智云统一部署的服务域名 
      - 2、可为设备更新时区信息 
      - 3、支持私有云用户切换  
    - 接口变更： 
      - 1、getDevicesToSetServerInfo：新增接口。为设备设置域名之前先查看哪些设备支持域名设置
      - 2、setDeviceServerInfo：新增接口。接口调用时，若不传域名参数，则为指定的设备设置机智云统一部署的服务域名 
      - 3、startWithAppId：接口参数（cloudServiceInfo）使用变更。若cloudServiceInfo不传参，则为App设置机智云统一部署的服务域名 
      - 4、新的定时任务接口变更至下个版本推出  
     - 其他改进和修复： 
      - 1、优化获取绑定设备列表请求 

- 版本号: 2.04.04  /  更新时间: 2016.10.26 14:12   /  [SDK下载>>](http://gizwits.oss.aliyuncs.com/sdk/GizWifiSDK-iOS-2.04.04.zip)
   - 更新信息
      - 版本号：2.04.04  
      - 发布日志： 
         - 1、发布了SDK动态库，便于排查崩溃堆栈，准确定位崩溃原因。发布包中同时发布了SDK的动态库和静态库，发布包目录结构有变更，请开发者注意阅读发布包中的readme文档，注意使用正确的库文件进行开发。 
         - 2、为满足用户的定时任务需求，我们将在2.05.05版本中提供新接口，现有的定时任务接口已不推荐使用了 
         - 3、SDK启动接口有新增参数的变更，开发者在启动SDK时可以设置域名、指定产品过滤。原有启动接口保持兼容 
         - 4、设备配置接口的模组类型参数，增加GizGAgentOther枚举值，允许开发者使用自己的配置库            - 5、改进SDK遇到运行错误时的自动恢复能力
         - 6、提高SDK域名解析成功率 
         - 7、优化云端访问请求超时时间，20秒无应答则请求超时
         - 8、提高手机与设备之间的连接稳定性和可靠性 
         - 9、改善设备Softap配置发包的成功率


#### Wi-Fi/移动通信产品SDK for Android 2.06.06.1 
- 集成文档  http://dev.gizwits.com/zh-cn/document/openplatform/i_02_androidsdk/	
- SDK下载   http://gizwits.oss.aliyuncs.com/sdk/GizWifiSDK-Android-2.06.06.1.zip
- 发布时间：2017.2.22 19:32
- 更新信息
   - 版本号：2.06.06.1  
   - 更新日志： 
     - 优化手机流量消耗 
     - 纠正数据点浮点数值精度损失 
     - 延长云端访问的超时时间，提高访问成功率  
     - 其他优化
**旧版本下载**
- 版本号: 2.06.06  /   更新时间: 2017.1.25 15:35  /  [SDK下载](http://gizwits.oss.aliyuncs.com/sdk/GizWifiSDK-Android-2.06.06.zip)
   - 更新信息
     - 版本号：2.06.06  
     - 更新日志： 
       - 支持新的设备定时任务功能 
       - 新增设备分享功能
       - 支持变长数据点控制和上报 
       - 优化设备时区的精确校准
       - 优化App在后台回前台时的设备搜索速度
 
- 版本号: 2.05.05.21618  /  更新时间: 2016.12.16 19:51  /  [SDK下载](http://gizwits.oss.aliyuncs.com/sdk/GizWifiSDK-Android-2.05.05.21618.zip)
   - 更新信息
     - 版本号：2.05.05.21618  
     - 更新日志： 	
       - 支持ATS开启 
       - 优化日志上传 
       - 保持旧的SDK启动接口功能兼容

- 版本号: 2.05.05.2916  /   更新时间: 2016.11.30 10:59   /  [SDK下载](http://gizwits.oss.aliyuncs.com/sdk/GizWifiSDK-Android-2.05.05.2916.zip)
   - 更新信息
     - 版本号：2.05.05.2916  
     - 功能更新： 
       - 支持设备服务域名的自动设置功能 
       - 支持设备解除订阅后仍可收到设备在线状态变化通知 
       - 增加私有部署某些功能的兼容  
     - 接口变更： 
       - startWithAppId：新增开启设备服务域名自动设置参数 
       - setDeviceServerInfo：参数mac使用变更。mac传空时可设置当前可设置的所有小循环设备域名 

- 版本号: 2.05.05  /   更新时间: 2016.11.10 10:50   /  [SDK下载](http://gizwits.oss.aliyuncs.com/sdk/GizWifiSDK-Android-2.05.05.zip)
   - 更新信息
     - 版本号：2.05.05  
     - 功能更新： 
       - 1、可为设备或者手机App设置机智云统一部署的服务域名 
       - 2、可为设备更新时区信息 
       - 3、支持私有云用户切换  
     - 接口变更： 
       - 1、getDevicesToSetServerInfo：新增接口。为设备设置域名之前先查看哪些设备支持域名设置
       - 2、setDeviceServerInfo：新增接口。接口调用时，若不传域名参数，则为指定的设备设置机智云统一部署的服务域名 
       - 3、startWithAppId：接口参数（cloudServiceInfo）使用变更。若cloudServiceInfo不传参，则为App设置机智云统一部署的服务域名 
       - 4、新的定时任务接口变更至下个版本推出  
     - 其他改进和修复： 
       - 1、优化获取绑定设备列表请求 

- 版本号: 2.04.04  /  更新时间: 2016.10.26 14:12   /  [SDK下载](http://gizwits.oss.aliyuncs.com/sdk/GizWifiSDK-Android-2.04.04.zip)
   - 更新信息
     - 版本号：2.04.04  
     - 发布日志： 
       - 1、发布了SDK动态库，便于排查崩溃堆栈，准确定位崩溃原因。发布包中同时发布了SDK的动态库和静态库，发布包目录结构有变更，请开发者注意阅读发布包中的readme文档，注意使用正确的库文件进行开发。 
       - 2、为满足用户的定时任务需求，我们将在2.05.05版本中提供新接口，现有的定时任务接口已不推荐使用了 
       - 3、SDK启动接口有新增参数的变更，开发者在启动SDK时可以设置域名、指定产品过滤。原有启动接口保持兼容 
       - 4、设备配置接口的模组类型参数，增加GizGAgentOther枚举值，允许开发者使用自己的配置库            
       - 5、改进SDK遇到运行错误时的自动恢复能力
       - 6、提高SDK域名解析成功率 
       - 7、优化云端访问请求超时时间，20秒无应答则请求超时
       - 8、提高手机与设备之间的连接稳定性和可靠性 
       - 9、改善设备Softap配置发包的成功率





#### Wi-Fi/移动通信产品APICloud SDK for iOS & Android 1.3.1 
- 集成文档   http://dev.gizwits.com/zh-cn/document/openplatform/i_07_APICloud/	 
- SDK下载   http://gizwits.oss.aliyuncs.com/sdk/APICloudModule-1.3.1_2.06.06.1.zip
- 发布时间：2017.3.07 14:05
- 更新信息
   - 版本号：1.3.1  
   - 更新日志： 
     - 1、SDK启动接口：startWithAppID，新增自动设置设备域名参数（autoSetDeviceDomain） 
     - 2、新增接口：setDeviceServerInfo，手动设置设备域名 
     - 3、新增接口：getDevicesToSetServerInfo，获取可以设置域名的设备

#### BT/BLE设备接入SDK for iOS 1.3.1.170103 
- 集成文档  http://dev.gizwits.com/zh-cn/document/openplatform/i_03_iosblesdk/ 
- SDK下载   http://gizwits.oss.aliyuncs.com/sdk/GizDataAccess.framework-1.3.1.170103.zip
- 发布时间：2017.1.05 11:55
- 更新信息
   - 版本号： 1.3.1.170103 
   - 更新日志： （1）支持iOS10 ；（2）支持bitcode

#### BT/BLE设备接入SDK for Android 1.1.0.150427  
- 集成文档  http://dev.gizwits.com/zh-cn/document/openplatform/i_04_androidblesdk/
- SDK下载  http://gizwits.oss-cn-hangzhou.aliyuncs.com/sdk/GizDataAccessSdk-1.1.0.150427.jar
- 发布时间：2015.4.29 17:03
- 暂无更新信息


## 统计分析SDK

统计分析SDK用于将数据进行云存储、云获取和云计算，蓝牙产品是主要使用对象。产生的数据会通过手机传输到云存储器中，如需数据调用，则通过接口获取即可。

目前提供的基本数据运算有：数据求和、数据平均、数据最大值及最小值查找等。

#### BT/BLE统计分析SDK for iOS 
- 集成文档  http://dev.gizwits.com/zh-cn/document/analytics/i_01_bleiossdk/ 
- SDK下载   http://dev.gizwits.com/generated/sdk/GizAnalytics.framework-20140829.zip
- 发布时间：2015.4.10 00:00
- 暂无更新信息


####  BT/BLE统计分析SDK for Android  
- 集成文档  http://dev.gizwits.com/zh-cn/document/analytics/i_03_androidsdk/ 
- SDK下载   http://dev.gizwits.com/generated/sdk/GizAnalytics_0.9-20140829.jar
- 发布时间：2015.4.10 00:00
- 暂无更新信息


# 开发与调试工具

## 机智云Wi-Fi/移动通信产品调试APP

机智云App是全球首款IoT设备通用调试工具，根据开发者自定义的产品功能，自动生成可响应的控制页面。开发者在机智云平台开发智能硬件时，可以很方便地使用该App对硬件设备进行调试和验证。此APP有完整的用户注册、登陆和注销流程，并且可以完成机智云智能硬件的配置入网、设备搜索、设备绑定、设备登录、设备控制、远程控制、状态更新、本地远程切换等基本设备操作。

####  机智云Wi-Fi/移动通信产品调试App for iOS 1.9.1
- [机智云 App下载>>>]( http://gizwits.oss.aliyuncs.com/demo_app/IOEDemo_iOS_Release_20170222.ipa)
- 发布时间：2017.2.22 19:21 
- 更新信息
   - 版本号：1.9.1  
   - 更新日志： 
     - 1、SDK版本更新为2.06.06.1 
     - 2、修改一键配置时模组类型选择方式

- **旧版本下载**
- 版本号: 1.9.0   /   更新时间: 2017.1.25 16:10   /   [机智云 App下载>>> ](http://gizwits.oss.aliyuncs.com/demo_app/IOEDemo_iOS_Release_20170124.ipa)
   - 更新日志： 
     - 版本号：1.9.0  
     -  1、SDK版本更新为2.06.06 
     -  2、增加消息中心 
     -  3、增加个人中心 
     -  4、支持设备分享 
     -  5、支持模组商城 
     -  6、优化设备配置用户体验 
     -  7、优化设备列表刷新
	
 - 版本号: 1.8.2  /   更新时间: 2016.12.16 19:44  /   [机智云 App下载>>>](http://gizwits.oss.aliyuncs.com/demo_app/IOEDemo_iOS_Release_20161216.ipa)
   - 更新信息
     - 版本号：1.8.2  
     - 更新日志： 1、SDK版本更新为2.05.05.21618

 - 版本号: 1.8.1  /   更新时间: 2016.11.30 11:04  /   [机智云 App下载>>>](http://gizwits.oss.aliyuncs.com/demo_app/IOEDemo_iOS_20161129.ipa)
   - 更新信息
     - 版本号：1.8.1  
     - 更新内容： 1、SDK版本更新为2.05.05.2916 2、修复友盟消息推送问题

  - 版本号: 1.8.0  /   更新时间: 2016.11.15 17:08  /   [机智云 App下载>>>](http://gizwits.oss.aliyuncs.com/demo_app/IOEDemo_iOS_20161115.ipa)
   - 更新信息
     - 版本号：1.8.0  
     -  更新日志：  
     - 1、SDK版本更新为2.05.05  
     - 2、增加友盟事件统计功能  
     - 3、优化独立部署页面用户体验

 - 版本号: 1.7.0  /   更新时间: 2016.10.20 09:36  /   [机智云 App下载>>>](http://gizwits.oss.aliyuncs.com/demo_app/IOEDemo_iOS_20161019.ipa)
   - 更新信息
     - 版本号：1.7.0  
     - 发布日志： 
       - 1、SDK版本更新为2.04.04 
       - 2、修复某些情况下不会自动登录的问题 
       - 3、修复设备断开时，断开提示不消失的问题 
       - 4、改进设备配置退出时的用户体验 
       - 5、改进独立部署设置的用户交互 
       - 6、设备一键配置方式增加了“其他”选项，便于开发者调试设备的配置上线功能 
       - 7、适配iOS10系统。iOS从这个版本开始，将只支持iOS8.0及以上系统。支持iOS7.0系统的版本仍然可以下载，但不再维护。


####  机智云Wi-Fi/移动通信产品调试App for Android 1.9.1
- [机智云 App下载>>>](http://gizwits.oss.aliyuncs.com/demo_app/IOEDemo_Android_20170222.apk)
- 发布时间：2017.2.22 19:21 
- 更新信息
   - 版本号：1.9.1  
   - 更新日志： 
     - 1、SDK版本更新为2.06.06.1 
     - 2、修改一键配置时模组类型选择方式

**旧版本下载**
- 版本号: 1.9.0   /   更新时间: 2017.1.25 16:10   /   [机智云 App下载>>>](http://gizwits.oss.aliyuncs.com/demo_app/IOEDemo_Android_20170125.apk) 
   - 更新日志： 
     - 版本号：1.9.0  
     - 1、SDK版本更新为2.06.06 
     - 2、增加消息中心 
     - 3、增加个人中心 
     - 4、支持设备分享 
     - 5、支持模组商城 
     - 6、优化设备配置用户体验 
     - 7、优化设备列表刷新
	
- 版本号: 1.8.2  /   更新时间: 2016.12.16 19:44  /   [机智云 App下载>>>](http://gizwits.oss.aliyuncs.com/demo_app/IOEDemo_Android_20161216.apk)
   - 更新信息
     - 版本号：1.8.2  
     - 更新日志： 1、SDK版本更新为2.05.05.21618

- 版本号: 1.8.1  /   更新时间: 2016.11.30 11:04  /   [机智云 App下载>>>](http://gizwits.oss.aliyuncs.com/demo_app/IOEDemo_Android_20161129.apk)
   - 更新信息
     - 版本号：1.8.1  
     - 更新内容： 1、SDK版本更新为2.05.05.2916 2、修复友盟消息推送问题

- 版本号: 1.8.0  /   更新时间: 2016.11.15 17:08  /   [机智云 App下载>>>](http://gizwits.oss.aliyuncs.com/demo_app/IOEDemo_Android_20161115.apk)
   - 更新信息
     - 版本号：1.8.0  
     - 更新日志：  
       - 1、SDK版本更新为2.05.05  
       - 3、优化独立部署页面用户体验

- 版本号: 1.7.0  /   更新时间: 2016.10.20 09:36  /   [机智云 App下载>>>](http://gizwits.oss.aliyuncs.com/demo_app/IOEDemo_Android_20161019.apk)
   - 更新信息
     - 版本号：1.7.0  
     - 发布日志： 
       - 1、SDK版本更新为2.04.04 
       - 2、修复部分Android手机（如：三星）获取热点会崩溃 
       - 3、修复6.0系统的机型上，softap设备热点连不上的问题 
       - 4、修复某些特定情况下进入设备列表页面转圈不消失的问题 
       - 5、改进独立部署设置的用户交互 
       - 6、设备一键配置方式增加了“Other”选项，便于开发者调试设备的配置上线功能

## 产测工具

使用产测工具，可以快速检验工厂生产线上的成品或者半成品。产测工具是一个简单的手机APP，可以在用户产品中定义产测的测试项，再对工厂的设备进行相关定义项的自动测试。设备针对测试项测试通过后，表示产品合格。

产测工具可以将设备并行处理，平均5～10秒可以完成一个设备的测试，从而大大提高测试的速度。

####  Wi-Fi产测应用 for Android 2.1
- [App下载>>>](http://gizwits.oss.aliyuncs.com/phone_app/V4ProductionTesting_V2.1.apk)
- 发布时间：2016.12.28 11:57
- 更新信息
   - 1、增加了只读数据点产测功能 
   - 2、其他优化  
   - 说明：只读数据点如果是数值型的，上报的数据如果在0.9-1.1倍之间也认为测试成功。比如自读数据产测设定值为100，那么设备上报数据在90-110之间都认为成功。
**旧版本下载**
- 版本号: 2.0  /   更新时间: 2016.10.25 16:09   /   [App 下载](http://gizwits.oss.aliyuncs.com/phone_app/V4ProductionTesting_V2.0.apk)
  - 更新信息
     - V2.0  
     - 1、更新界面UI，改善用户体验 
     - 2、添加了“重测”功能 
     - 3、添加了扫码下载配置文件的同时自动切换服务器域名 
     - 4、使用2.04.04版本的SDK重新编写测试流程，保证测试稳定性
- 版本号: 1.0  /   更新时间: 2015.7.22 18:58   /   [App 下载](http://gizwits.oss-cn-hangzhou.aliyuncs.com/DemoApp/V4ProductionTesting_V1.0.apk)
- 暂无更新信息


# 开放源码
## 开源App
####  机智云智能灯
这是一款可以帮助开发者快速使用GizWifiSDK，连接到机智云的开源物联示例APP。该APP针对的是智能家电中的灯泡类产品，此款产品已满足用户基本功能需求，其中包括：1.用户登录；2.配置入网；3. 搜索设备列表；4.绑定或解绑设备；5.灯开关；6.色彩和色温切换；7.色彩和色温连续调节；8.亮度调节；9.修改设备别名；10.倒计时开关；11.云端定时预约，不限次数等等。

- 源码链接 for iOS     https://git.oschina.net/dantang/Gizwits-SmartBuld_iOS
- 源码链接 for Androi  https://git.oschina.net/dantang/Gizwits-SmartBuld_Android

### 公版App开源计划
#### Demo Gokit App for iOS & Android
Gokit App是与Gokit硬件配套的App。开发者可以通过该App源码学习到物联网硬件相关的App实现方法。
Gokit App是使用开源框架开发出来的App，功能包含：用户注册登录、配置入网、搜索设备列表、绑定或解绑设备、设备状态查询、设备远程控制等。

- 源码链接 for iOS     https://git.oschina.net/dantang/GoKit_Demo_iOS
- 源码链接 for Androi  https://git.oschina.net/dantang/GoKit_Demo_Android

#### APICloud GoKit App for iOS & Android
APICloud GoKit是使用机智云针对APICloud发布的SDK而开发的HTML5版本的GoKit APP，其包含iOS版本和Android版本。与原生的iOS和Android APP不一样的是，APICloud GoKit用JS写成，大大降低了手机APP开发的门槛，并且通过APICloud，可以一次开发出两个版本。APICloud GoKit的功能与原生的APP的功能相同，包含配置入网、设备搜索、设备绑定、设备登陆、设备控制、远程控制、状态更新、本地远程切换等。所用的APICloud SDK可以在APICloud官网上下载。（搜索“Gizwits”或“机智云”）

- 源码链接 for APICloud      https://github.com/gizwits/gokit_demo_in_apicloud

## 开源硬件

### 桌上足球
可以将普通桌上足球改造成可社交化的智能产品。通过微信邀约好友参加比赛，实时显示比分，微信分享比赛结果，还可以实时拍摄赛况。
  - MCU      https://git.oschina.net/dantang/Smart_Foosball-MCU
  - 业务云   https://git.oschina.net/dantang/Smart_Foosball-Cloud
  - 网站展示  http://smartfoosball.com/

### 智能宠物屋
30分钟开发智能硬件，通过机智云的开发平台定义了一款通过WiFi自动报告宠物动向和自动优化宠物居住环境的宠物屋。通过自动生成的App，立即可以直接控制用GoKit开发板实现的宠物屋。

  - MCU for GoKit STM   https://git.oschina.net/dantang/GoKit_1_MCU
  - MCU for GoKit 2代 STM  https://git.oschina.net/dantang/GoKit_2_MCU_STM
  - MCU for GoKit 2代 Arduino  https://git.oschina.net/dantang/GoKit_2_MCU_Arduino

### 植物宝
植物宝可根据植物当前所处环境对自身的生长状况做出检测和判断，然后通过语音播放，告诉人类，自己是否需要浇灌。以后即便你一个人在家，也不会只有你一个声音啦！
  - 源码链接  http://pan.baidu.com/s/1mgxcvjE

### 闪键
闪键是一个物理快捷键。可放置家中或是办公室。具有一键通话、一键短信、一键遥控家里灯、家电等···实现自定义绑定，轻松开启真正的便捷生活。
  - 源码链接  http://pan.baidu.com/s/1dD3wpPZ

### 更多开源硬件方案：
- [智能家居应用模型One](http://gizwits.com/article/320/)
- [智能药盒](http://club.gizwits.com/thread-2685-1-1.html)	
- [智能婴儿摇篮](http://club.gizwits.com/thread-2794-1-1.html)
- [智能灯](http://club.gizwits.com/thread-2830-1-1.html)
- [智能温控器](http://club.gizwits.com/thread-3332-1-1.html)
- [智能鞋柜](http://club.gizwits.com/thread-3381-1-1.html)
- [智能家居云控制套件](http://club.gizwits.com/thread-3308-1-1.html)
- [智能健康计](http://club.gizwits.com/thread-2865-1-1.html)
- [智能插座](http://club.gizwits.com/thread-3029-1-1.html)
- [智慧宿舍](http://club.gizwits.com/thread-2997-1-1.html)
- [智能仓鼠管家（语音版）](http://club.gizwits.com/thread-3016-1-1.html)
- [无线工业粉尘监测仪](http://club.gizwits.com/thread-3242-1-1.html)

## 开源范例

### BT/BLE设备接入参考实现App for Android源码

BT/BLE设备接入机智云Android客户端示例源码，包含蓝牙设备数据上传云端，云端下载同步数据等功能的参考实现，开发者可通过此开源程序学习物联网硬件相关的App实现方法。

  - 源码链接：https://github.com/gizwits/GizDataAccessDemo-Android

### BT/BLE设备接入参考实现App for iOS源码

BT/BLE设备接入机智云iOS客户端示例源码，包含蓝牙设备数据上传云端，云端下载同步数据等功能的参考实现，开发者可通过此开源程序学习物联网硬件相关的App实现方法。

  - 源码链接：https://github.com/gizwits/GizDataAccessDemo-iOS
