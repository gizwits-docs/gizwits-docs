title: ESP8266-SOC方案UART0教程
---

### [教程代码](http://docs.gizwits.com/assets/pdf/GizwitsSoCESP8266_32M201709251109038981ae6a2c.zip)

### [esp8266-technical_reference_cn.pdf](http://docs.gizwits.com/assets/pdf/esp8266-technical_reference_cn.pdf)

# 一、概述

#### 本文主要介绍如何在soc方案下使用esp8266的UART0，让开发者可以在soc方案下的使用esp8266串口通信。本文主要实现两种方式：

##### UART0收发相同数据

##### UART0_tx发送指定数据

# 二、UART0收发相同数据

#### 1、在uart.c代码中，复制教程代码uart0_rx_intr_handler函数如下图，下图同时是UART0的中断处理过程（教程代码中有两个uart0_rx_intr_handler函数是因为用了"#if 0"、"#else"、"#endif"重新写一个uart0_rx_intr_handler函数）

![图1](http://docs.gizwits.com/assets/zh-cn/deviceDev/SOC_UART0/1.png)

#### 2、修改完源码，我们就可以尝试往esp8266的UART0_rx写数据，看下UART0_tx会不会将该数据发送出来

![图2](http://docs.gizwits.com/assets/zh-cn/deviceDev/SOC_UART0/2.png)

#### 3、可以看到，esp8266的UART0_rx接收到什么，UART0_tx就发送什么。

##### 注：关于串口的FIFO接收与发送数据，可下载本教程附件esp8266-technical_reference_cn.pdf，阅读第11章关于UART的介绍与接口

# 二、UART0_tx发送指定数据

#### 我们可以像控制灯的开关一样，用App去控制UART0_tx分别发送“Hello,Gizwits!\n”和“Goodbye,Gizwits!\n”。

#### 1、在uart.c找到uart1_sendStr_no_wait函数，复制修改成UART0专用，在uart.h做同样的操作，如下图

![图3](http://docs.gizwits.com/assets/zh-cn/deviceDev/SOC_UART0/3.png)

![图4](http://docs.gizwits.com/assets/zh-cn/deviceDev/SOC_UART0/4.png)

#### 2、在gizwits_product.c添加代码如图（前提是已经定义了一个可写布尔数据点）

![图5](http://docs.gizwits.com/assets/zh-cn/deviceDev/SOC_UART0/5.png)

#### 3、UART0_tx发送数据如图

![图6](http://docs.gizwits.com/assets/zh-cn/deviceDev/SOC_UART0/6.png)

#### 4、这样，我们就可以让UART0_tx发送我们特定的数据
