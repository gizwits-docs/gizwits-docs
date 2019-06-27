title: WIFI 接入方案
---

# 一、概述

本文主要介绍如何使用Gokit开发板和WIFI模块快速接入机智云

# 二、在机智云官网创建设备产品，定义数据点，添加设备

**这里以“智能灯”的例子介绍设备接入机智云的整个流程。**

## 1. 创建新产品

![name](/assets/zh-cn/deviceDev/debug/NB_project/NBproject_2.png)

![name](/assets/zh-cn/deviceDev/debug/NB_project/NBproject_3.png)

## 2. 定义数据点

![name](/assets/zh-cn/deviceDev/debug/NB_project/NBproject_4.png)

![name](/assets/zh-cn/deviceDev/debug/NB_project/NBproject_5.png)

![name](/assets/zh-cn/deviceDev/debug/NB_project/NBproject_6.png)

# 三、下载自动生成mcu代码，烧写程序到Gokit的mcu中

![name](/assets/zh-cn/deviceDev/debug/NB_project/NBproject_10.png)

# 四、修改mcu程序，使得mcu可以控制LED灯

程序修改步骤，略，本文最后有参考代码

# 五、WIFI模块与mcu接线，通电让设备运行

![name](/assets/zh-cn/deviceDev/debug/NB_project/NBproject_11.png)

# 六、机智云IOE DEMO APP配网让设备连上路由器和机智云服务器，然后绑定设备

![name](/assets/zh-cn/deviceDev/debug/NB_project/NBproject_13.png)

# 七、控制设备，点亮/熄灭LED灯成功，机智云接入完毕

![name](/assets/zh-cn/deviceDev/debug/NB_project/NBproject_14.png)

![name](/assets/zh-cn/deviceDev/debug/NB_project/NBproject_15.png)

# 爸、参考资料下载

参考代码下载链接：

http://docs.gizwits.com/assets/pdf/mcu%E5%BF%AB%E9%80%9F%E5%BC%80%E5%8F%91RGB_LED%E7%81%AF%E5%8F%82%E8%80%83%E4%BB%A3%E7%A0%811.rar
