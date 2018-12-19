title: ESP-WROOM-02D_datasheet_cn
---

# 1.	概述 
#### 乐鑫为客户提供集成 ESP8266EX 的贴⽚片式模组 ESP-WROOM-02D 和 ESP-WROOM-02U。在 ESP-WROOM-02 基础上，乐鑫优化了了这两个模组的射频性能。ESP- WROOM-02U 集成了了 U.FL 座⼦子，需搭配 IPEX 天线使⽤用。U.FL 座⼦子信息详⻅见章节 8. U.FL 座⼦子尺⼨寸。

![主要技术参数 ](http://docs.gizwits.com/assets/zh-cn/module_source/ESP-WROOM-02D/datasheet_1.png)

![主要技术参数 ](http://docs.gizwits.com/assets/zh-cn/module_source/ESP-WROOM-02D/datasheet_2.png)

# 2.管脚定义

#### 管脚布局如图 2-1 所示。

![管脚布局 ](http://docs.gizwits.com/assets/zh-cn/module_source/ESP-WROOM-02D/datasheet_3.png)

#### 管脚定义如表 2-1 所示。

![管脚定义 ](http://docs.gizwits.com/assets/zh-cn/module_source/ESP-WROOM-02D/datasheet_4.png)

![管脚定义 ](http://docs.gizwits.com/assets/zh-cn/module_source/ESP-WROOM-02D/datasheet_5.png)

![管脚定义 ](http://docs.gizwits.com/assets/zh-cn/module_source/ESP-WROOM-02D/datasheet_6.png)

# 3.功能描述
## 3.1. CPU、存储和 Flash

### 3.1.1. CPU

#### ESP8266EX 内置超低功耗 Tensilica L106 32-bit RISC 处理理器器，CPU 时钟速度最⾼高可达160 MHz，⽀支持实时操作系统 (RTOS) 和 Wi-Fi 协议栈，可将⾼高达 80% 的处理理能⼒力力留留给应⽤用编程和开发。CPU 包括以下接⼝口：

##### • 可连接片内存储控制器和外部 Flash 的可配置 RAM/ROM 接口 (iBus)

##### • 连接存储控制器的数据 RAM 接口 (dBus)

##### • 访问寄存器的 AHB 接口

## 3.2 存储描述
### 3.2.1. 内置SRAM和RAM

#### ESP8266EX 芯⽚片⾃自身内置了了存储控制器器和存储单元，包括 ROM 和 SRAM。MCU 可以通过 iBus、dBus 和 AHB 接⼝口访问存储单元。这些接⼝口都可以根据要求访问存储单元。存储仲裁器器以到达顺序确定运⾏行行顺序。
#### 基于⽬目前我司 Demo SDK 的使⽤用 SRAM 情况，⽤用户可⽤用剩余 SRAM 空间为：
#### •RAM < 50 kB（Station 模式下，连上路路由后，Heap + Data 区⼤大致可⽤用 50 kB 左右）。
#### •⽬目前 ESP8266EX ⽚片上没有可编程 ROM，⽤用户程序存放在 SPI flash 中。

### 3.2.2. SPI Flash

#### ESP8266EX ⽀支持使⽤用 SPI 接⼝口的外置 Flash，理理论上最⼤大⽀支持 16 MB 的 SPI Flash。ESP-WROOM-02D 和 ESP-WROOM-02U 配置了了 2 MB 的 SPI Flash，⽀支持的 SPI 模式包括：Standard SPI、DIO (Dual I/O)、DOUT (Dual Output)、QIO (Quad I/O) 以及 QOUT (Quad Output)。

## 3.3. 晶振
#### ESP-WROOM-02D 和 ESP-WROOM-02U 使⽤用 26 MHz 晶振。选⽤用的晶振⾃自身精度需在±10  PPM。使⽤用时请注意在下载⼯工具中选择对应晶体类型。晶振输⼊入输出所加的对地调节电容 C1、C2 可不不设为固定值，该值范围在 6 pF ~ 22 pF，具体值需要通过对系统测试后进⾏行行调节确定。基于⽬目前市场中主流晶振的情况，⼀一般 26 MHz 晶振的输⼊入输出所加电容C1、C2 在 10 pF 以内。

## 3.4. 接口说明
#### 接口说面如表3-1所示

![接口说明 ](http://docs.gizwits.com/assets/zh-cn/module_source/ESP-WROOM-02D/datasheet_7.png)

![接口说明 ](http://docs.gizwits.com/assets/zh-cn/module_source/ESP-WROOM-02D/datasheet_8.png)

# 4. 电气参数
#### 说明：如⽆无特殊说明，测试条件为：VDD = 3.3V，温度为 25°C。

## 4.1. 电气特性

![电气特性 ](http://docs.gizwits.com/assets/zh-cn/module_source/ESP-WROOM-02D/datasheet_9.png)

## 4.2. WI-FI射频

![射频参数 ](http://docs.gizwits.com/assets/zh-cn/module_source/ESP-WROOM-02D/datasheet_10.png)

![射频参数 ](http://docs.gizwits.com/assets/zh-cn/module_source/ESP-WROOM-02D/datasheet_11.png)

## 4.3. 功耗
#### 下列列功耗数据是基于 3.3V 的电源、25°C 的周围温度，并使⽤用内部稳压器器测得。所有发射数据是基于 50% 的占空⽐比，在持续发射的模式下测得的。

![功耗 ](http://docs.gizwits.com/assets/zh-cn/module_source/ESP-WROOM-02D/datasheet_12.png)

![功耗 ](http://docs.gizwits.com/assets/zh-cn/module_source/ESP-WROOM-02D/datasheet_13.png)

## 4.4. 回流焊温度曲线

![温度曲线 ](http://docs.gizwits.com/assets/zh-cn/module_source/ESP-WROOM-02D/datasheet_14.png)

## 4.5. 静电释放电压

![静电释放参数 ](http://docs.gizwits.com/assets/zh-cn/module_source/ESP-WROOM-02D/datasheet_15.png)

# 5. 外围设计原理图

![外围设计原理图 ](http://docs.gizwits.com/assets/zh-cn/module_source/ESP-WROOM-02D/datasheet_16.png)

#### 说明：ESP-WROOM-02D 和 ESP-WROOM-02U 的管脚 19，可以不不焊接到底板。若⽤用户将该管脚焊接到底板，请确保使⽤用适量量的焊锡膏。

# 6. 封装信息

![封装图形 ](http://docs.gizwits.com/assets/zh-cn/module_source/ESP-WROOM-02D/datasheet_17.png)

# I. 附录 - 资源

##### • [ESP-WROOM-02D串口烧写说明](http://docs.gizwits.com/zh-cn/deviceDev/debug/ESP-WROOM-02Duart.html)

##### • [获取乐鑫ESP-WROOM-02D日志（教程中“2.获取乐鑫ESP-WROOM-02D Gagent日志”）](http://docs.gizwits.com/zh-cn/deviceDev/%E9%80%9A%E8%AE%AF%E6%A8%A1%E7%BB%84%E8%B0%83%E8%AF%95%E6%97%A5%E5%BF%97%E6%8A%93%E5%8F%96%E6%95%99%E7%A8%8B.html)

##### • [GAgent for ESP8266 04020034下载](http://goms-1251025085.cosgz.myqcloud.com/GAgent_00ESP826_04020034-1529147544607.rar)

##### • [esp-wroom-02d_esp-wroom-02u_datasheet_cn](http://docs.gizwits.com/assets/pdf/ESP-WROOM-02D/esp-wroom-02d_esp-wroom-02u_datasheet_cn.pdf)
