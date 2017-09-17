# 简述 STM32 启动

#### ARM7/ARM9 内核的控制器在复位后，CPU 会从存储空间的绝对地址 0x000000 取出第一条指令执行复位中断服务程序的方式启动，即固定了复位后的起始地址为 0x000000（PC = 0x000000）同时中断向量表的位置并不是固定的。然而，Cortex-M3 内核启动有 3 种情况：

##### 1、 通过 boot 引脚设置可以将中断向量表定位于 SRAM 区，即起始地址为 0x2000000，同时复位后 PC 指针位于 0x2000000 处;

##### 2、 通过 boot 引脚设置可以将中断向量表定位于 FLASH 区，即起始地址为 0x8000000，同时复位后 PC 指针位于 0x8000000 处;

##### 3、 通过 boot 引脚设置可以将中断向量表定位于内置 Bootloader 区;

#### Cortex-M3 内核规定，起始地址必须存放堆顶指针，而第二个地址则必须存放复位中断入口向量地址，这样在 Cortex-M3 内核复位后，会自动从起始地址的下一个 32 位空间取出复位中断入口向量，跳转执行复位中断服务程序。对比 ARM7/ARM9 内核，Cortex-M3 内核则是固定了中断向量表的位置而起始地址是可变化的。

#### 总结一下 STM32 的启动文件和启动过程。首先对栈和堆的大小进行定义，并在代码区的起始处建立中断向量表，其第一个表项是栈顶地址，第二个表项是复位中断服务入口地址。然后在复位中断服务程序中跳转 C/C++标准实时库的 main 函数，完成用户堆栈等的初始化后，跳转.c 文件中的 main 函数开始执行 C 程序。假设 STM32 被设置为从内部 FLASH 启动（这也是最常见的一种情况），中断向量表起始地位为 0x8000000，则栈顶地址存放于 0x8000000处，而复位中断服务入口地址存放于 0x8000004 处。当 STM32 遇到复位信号后，则从0x80000004 处取出复位中断服务入口地址，继而执行复位中断服务程序，然后跳转 main 函数，最后进入 mian 函数。

#### 分析下 GOKIT_OTA 需求，我们将建立两个工程，分别是 Bootloader 还有 APP，我们将Bootloader 下载到 FLASH 空间 0x8000000 地址处，那么 STM32 启动后会首先执行我们的Bootloader 程序，然后就可以按照我们意愿实现 OTA 了。

# FLASH 区间划分

#### 根据需求，我们将 STM32F103C8T6 这个芯片（GOKIT2 代）Flash 空间划分出 4 个区域：Bootloader、FLAG、APP、APPBAK。四个区间作用描述如下：

##### Bootloader:存储 Bootloader 固件，MCU 上电后首先运行该固件。

##### FLAG:存储有关升级的相关标志位，Bootloader 和 APP 都需要操作该区域。

##### APP：存储用户程序固件。

##### APPBAK:临时存储云端下发的新固件，升级固件的一个过渡存储区。

#### Gokit 分区方案如下图所示：

![图1](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/1.png)

###### 图1

GOKIT_OTA 方案

![图2](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/2.png)

###### 图2

#### 正常启动流程：

##### 1、上电进入 Bootloader 区域运行,检测 FLAG 区域标识选择是否需要进行升级，若无升级任务,则运行 2

##### 2、跳转到 APP 区域运行应用程序

#### 有升级任务执行流程

##### 3、APP 区域运行应用程序时接收到模组升级命令,接收固件分片数据,写数据到APP_BAK 区域，接收完成，执行 4

##### 4、写入 FLAG 区域升级标识，并写入 MD5 加密数据,执行 5

##### 5、MCU 重启，开始执行 1

##### 1、检测到 FLAG 区域有升级任务,读出 APP_BAK 区域数据，验证固件有效性，若固件有效，执行 6

##### 6、读出 APP_BAK 区域数据，写入 APP 区域，检验新固件 MD5，若校验成功则执行 7，若校验失败，则 MCU 重启

##### 7、擦除 FLAG 区域有效升级标志，执行 8

##### 8、MCU 重启，进入 Bootloader 区域,未检测到升级任务，执行 2

##### 2、执行新固件，OTA 完成

## 开始 Bootloader

### Bootloader 程序流程

#### Bootloader 的主要职能是在有升级任务的时候将 APPBAK 里面的固件拷贝到 APP 区域。当然，这期间需要做很多的工作，比如升级失败的容错等等。具体的流程可以参考图示。需要注意的是，在校验 MD5 正确后开始搬运固件数据期间，MCU 出现故障（包括突然断电），MCU 应发生复位操作（FLAG 区域数据未破坏），复位后重新开始执行 Bootloader，从而避免 MCU 刷成板砖。

![图3](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/3.png)

###### 图3

### Bootloader 编译设置

#### 按照 Bootloader 流程编写好代码，需要我们对 KEIL 工程做相应配置，需要注意的是编译的 Bootloader 固件大小不超过最大可允许的 11KB。Keil 编译器需要设置如下：

#### 1、按照 FLASH 分区方案，设置 FLASH 固件下载地址，如下图所示：

![图4](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/4.png)

###### 图4

#### 2、Flash 烧写地址设置生效

![图5](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/5.png)

###### 图5

#### 3、设置STMLINK 按块擦除 FLASH 区间和烧写程序

![图6](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/6.png)

###### 图6

![图6-1](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/6-1.png)

###### 图6-1

![图7](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/7.png)

###### 图7

## 开始写 （移植）APP 关于固件升级部分

### 固件接收流程

#### 做好 BOOTLOADER 工作后，我们开始写 APP 的代码。APP 固件的编写要注意硬件版本号和软件版本号，软件版号作为升级迭代很重要的标志。APP 代码我们只需要在 GOKIT 微信宠物屋代码基础上增加大数据接受即接受云端新固件功能即可。需要注意的是，中断向量地址偏移的定义，这个地方需要我们尤其注意，我在开发过程中在这个地方排查了好长时间。STM32 标准库默认中断向量地址偏移为 0x0,但是我们 APP 实际的偏移是 0x3000。如果不修改，APP 也可以正常加载运行，但是不会相应中断。所以，我们需要根据实际 APP 下载的起始地址，对中断向量地址偏移做定义。按照协议规定，我们去实现大数据整个流程，具体如下：

![图8](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/8.png)

###### 图8

### 编译器设置

#### 同样，因为硬件 FLASH 空间限定，我们需要对 APP 的固件大小做严格的限制。本方案，针对 GOKIT 我们可允许的最大固件为 26KB。需要升级的新固件同样最大可支持 26KB。

#### 1、设置 FLASH 固件下载地址

![图9](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/9.png)

###### 图9

![图10](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/10.png)

###### 图10

#### 2、设置STMLINK 按块擦除 FLASH 区间和烧写程序

#### 2、中断向量偏移地址

![图11](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/11.png)

###### 图11

#### 3、往工程目录添加Flash.c和gagent_md5.c，单击keil的build按钮展开工程目录，可以看到Flash.h和gagent_md5.h

![图12](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/12.png)

###### 图12

#### 4、接下来是代码移植步骤，只需把图片内红框相应代码复制到开发者自动生成mcu代码，即可实现mcuOTA功能。

![图13](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/13.png)

###### 图13

![图14](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/14.png)

###### 14

![图](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/15.png)

###### 图15

![图16](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/16.png)

###### 图16

![图17](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/17.png)

###### 图17

![图18](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/9.png)

###### 图18

![图19](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/19.png)

###### 图19

![图20](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/20.png)

###### 图20

![图21](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/21.png)

###### 图21

![图22](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/22.png)

###### 图22

![图23](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/23.png)

###### 图23

![图24](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/24.png)

###### 图24

![图25](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/25.png)

###### 图25

![图26](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/26.png)

###### 图26

![图27](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/27.png)

###### 图27

#### 4、第一次用stmlimk烧录mcu代码后，mcu日志

![图28](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/28.png)

###### 图28

#### 5、准备OTA，先让设备连上机智云。

![图29](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/29.png)

###### 图29

#### 6、改mcu代码里面的软件版本号，要比原来的高，选择编译出来的.bin文件。（注意：如果图中有手动/静默，请选择静默，没有则忽略注意）

![图30](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/30.png)

###### 图30

#### 7、OTA成功

![图31](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/MCUOTA/31.png)

###### 图31

[源文档及源参考代码下载](http://docs.gizwits.com/assets/pdf/GOKIT-OTA-V2.0.1.zip)

注：将源参考代码中部分代码如上述步骤移植到自动生成代码中，就可以实现OTA