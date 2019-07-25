title: G510 接入方案
---

# 一、概述

本文主要介绍如何使用Gokit开发板和G510模块快速接入机智云。

# 二、在机智云官网创建设备产品，定义数据点，添加设备

**这里以“智能灯”的例子介绍设备接入机智云的整个流程。**

## 1. 创建新产品

![name](/assets/zh-cn/deviceDev/debug/NB_project/NBproject_2.png)

![name](/assets/zh-cn/deviceDev/debug/G510/G510project_3.png)

## 2. 定义数据点

![name](/assets/zh-cn/deviceDev/debug/G510/G510project_4.png)

![name](/assets/zh-cn/deviceDev/debug/G510/G510project_5.png)

![name](/assets/zh-cn/deviceDev/debug/G510/G510project_6.png)

# 四、下载自动生成mcu代码，烧写程序到Gokit的mcu中

![name](/assets/zh-cn/deviceDev/debug/NB_project/NBproject_10.png)

# 五、修改mcu程序，使得mcu可以控制LED灯

程序修改步骤，略，本文最后有参考代码

# 六、G510与mcu接线，通电让设备上线

![name](/assets/zh-cn/deviceDev/debug/G510/G510project_14.png)

# 七、设备上线，机智云IOE DEMO APP绑定设备

当模组正常开机十多秒以后，模组会自动连接上机智云平台，此时我们可以使用机智云APP扫描二维码的方式绑定G510，使用机智云串口助手的小工具生成设备绑定二维码（串口助手下载地址https://download.gizwits.com/zh-cn/p/98/119）

![name](/assets/zh-cn/deviceDev/debug/G510/G510project_12.png)

生成设备绑定二维码后，我们可以下载机智云IOE DEMO APP扫码绑定设备

（APP下载地址https://download.gizwits.com/zh-cn/p/98/99）

![name](/assets/zh-cn/deviceDev/debug/G510/G510project_13.png)

# 八、控制设备，点亮/熄灭LED灯成功，机智云接入完毕

![name](/assets/zh-cn/deviceDev/debug/G510/G510project_11.png)

![name](/assets/zh-cn/deviceDev/debug/G510/G510project_15.png)

# 九、参考资料下载

参考代码下载链接：

http://docs.gizwits.com/assets/pdf/mcu%E5%BF%AB%E9%80%9F%E5%BC%80%E5%8F%91RGB_LED%E7%81%AF%E5%8F%82%E8%80%83%E4%BB%A3%E7%A0%811.rar
