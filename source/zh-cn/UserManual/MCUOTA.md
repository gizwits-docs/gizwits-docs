title: MCU OTA教程（3.0）
---

[GAgent OTA教程](http://docs.gizwits.com/zh-cn/UserManual/OTA%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.html)

[MCU OTA教程（2.0）](http://docs.gizwits.com/zh-cn/UserManual/MCUOTA2.html)

[源文档及源参考代码下载](http://docs.gizwits.com/assets/pdf/GOKIT-OTA.zip)

# 1.概述

#### MCU OTA可以对MCU程序进行无线远程升级。本文以STM32F103C8T6实现OTA作为例子。原本MCU程序软件版本号是01，想升级到02，但是设备已经量产了不可能再去一个一个设备重新烧录新的程序，这时候就需要用到MCU OTA。

#### STM32F103C8T6 芯片（GOKIT2 代）Flash 空间划分出 4 个区域：Bootloader、FLAG、APP 分区、APPBAK 分区。

![图1](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/1.png)

#### Bootloader:存储 Bootloader 固件，MCU 上电后首先运行该固件。

#### FLAG:存储有关升级的相关标志位，Bootloader 和 APP 分区都需要操作该区域。

#### APP 分区:存储用户程序固件。

#### APPBAK 分区:临时存储云端下发的新固件，升级固件的一个过渡存储区。

#### 源代码中有BootLoader和APP 分区两部分。BootLoader稍作编译设置，不需要改动代码，就可以编译烧写到MCU中；APP 分区的OTA功能相关代码复制到mcu方案自动生成代码中，再编译烧写到MCU中，mcu程序就具有OTA功能。

#### 下文分别是BootLoader和APP 分区的详细移植步骤。

# 2.Bootloader 分区部分

## 2.1.Bootloader 程序流程

#### Bootloader 的主要职能是在有升级任务的时候将 APPBAK 分区里面的固件拷贝到 APP 区域。当然，这期间需要做很多的工作，比如升级失败的容错等等。具体的流程可以参考图示。需要注意的是，在校验 MD5 正确后开始搬运固件数据期间，MCU 出现故障（包括突然断电），MCU 应发生复位操作（FLAG 区域数据未破坏），复位后重新开始执行 Bootloader，从而避免 MCU 刷成板砖。

![图3](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/3.png)

## 2.2.Bootloader 编译设置

#### 按照 Bootloader 流程编写好代码，需要我们对 KEIL 工程做相应配置，需要注意的是编译的 Bootloader 固件大小不超过最大可允许的 11KB。Keil 编译器需要设置如下：

#### 2.2.1按照 FLASH 分区方案，设置 FLASH 固件下载地址，如下图所示：

![图4](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/4.png)

#### 2.2.2Flash 烧写地址设置生效

![图5](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/5.png)

#### 2.2.3设置ST-LINK 按块擦除 FLASH 区间和烧写程序

![图6](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/6.png)

![图6-1](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/6-1.png)

![图7](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/7.png)

# 3.APP 分区部分

## 3.1.固件接收流程

#### 做好 BOOTLOADER 工作后，我们开始写 APP 分区的代码。APP 分区固件的编写要注意硬件版本号和软件版本号，软件版号作为升级迭代很重要的标志。APP 分区代码我们只需要在 GOKIT 微信宠物屋代码基础上增加大数据接受即接受云端新固件功能即可。需要注意的是，中断向量地址偏移的定义，这个地方需要我们尤其注意，我在开发过程中在这个地方排查了好长时间。STM32 标准库默认中断向量地址偏移为 0x0,但是我们 APP 分区实际的偏移是 0x3000。如果不修改，APP 分区也可以正常加载运行，但是不会相应中断。所以，我们需要根据实际 APP 分区下载的起始地址，对中断向量地址偏移做定义。按照协议规定，我们去实现大数据整个流程，具体如下：

![图8](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/8.png)

## 3.2.App 分区编译器设置

#### 同样，因为硬件 FLASH 空间限定，我们需要对 APP 分区的固件大小做严格的限制。本方案，针对 GOKIT 我们可允许的最大固件为 26KB。需要升级的新固件同样最大可支持 26KB。

#### 3.2.1.设置 FLASH 固件下载地址

![图9](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/9.png)

![图10](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/10.png)

### 3.2.2.设置keil烧写方式为st-link

![图23](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/23.png)

### 3.2.3.通过编译优化等级控制APP 分区固件大小

![图24](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/24.png)

### 3.2.4.设置编译的时候生成.bin文件（OTA的时候需要选择把.bin文件上传到机智云）

![图25](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/25.png)

### 3.2.5.设置按区域擦除

![图26](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/26.png)

### 3.2.6.往工程目录添加Flash.c和gagent_md5.c，单击keil的build按钮展开工程目录，可以看到Flash.h和gagent_md5.h

![图12](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/100.png)

## 3.3.App 分区OTA功能代码移植

### 3.3.1.中断向量偏移地址

![图11](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/11.png)

### 3.3.2.接下来是代码移植步骤，只需把图片内红框相应代码复制到开发者自动生成mcu代码，即可实现mcuOTA功能。

![图13](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/101.PNG)

![图14](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/102.png)

![图16](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/103.png)

![图17](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/109.png)

![图18](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/105.PNG)

![图19](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/106.PNG)

![图20](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/107.png)

![图21](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/108.png)

![图22](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/22.png)

### 3.3.3.编译和烧程序

![图27](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/27.png)

# 4.MCU OTA验证

## 4.1.第一次用stlink烧录mcu代码后，mcu日志如图

![图28](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/28.png)

## 4.2.准备OTA，先让设备连上机智云。

![图29](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/29.png)

## 4.3.改mcu代码里面的软件版本号，要比原来的高，选择编译出来的.bin文件。（注意：如果图中有手动/静默，请选择静默，没有则忽略注意）

![图30](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/30.png)

## 4.4.OTA成功

![图31](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/31.png)

#### 本文档主要写移植OTA功能移植过程，想要了解MCU OTA详细过程（例如mcu启动流程检查有无OTA任务，OTA flash分区等等），请看源文档。
