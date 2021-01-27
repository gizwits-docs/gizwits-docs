title:  新版OTA使用教程
---

# OTA功能概述

OTA 英文全称是Over-the-Air Technology，即空间下载技术。当设备连上云端时会收到OTA升级通知，再通过HTTP完成固件升级。机智云的OTA服务主要提供以下功能：



- OTA通知服务，即离线升级。当设备的固件程序有新版本发布，OTA 通知服务会推送升级通知到设备。
- OTA透传服务，即在线升级。设备固件程序通过M2M 消息服务透传到设备端。
- 支持一个产品同时有多个推送。
- 支持Wi-Fi/MCU升级。
- 支持全部推送。
- 支持定向升级。可指定设备mac地址、区域、旧固件版本进行推送。
- 支持定时推送。可自定义推送周期及推送时段。
- OTA版本推送记录。
- OTA进度统计分析。



**升级新版OTA注意事项：切换到新版OTA后，将不能返回到旧版OTA，并且原来设置的推送规则，切换到新版OTA将不再生效。**



# 如何升级OTA

 方式一：登录新版开发者中心，选择产品，点击【产品开发】，在【服务】-【OTA】-【升级版本】页面，点击【升级版本】。

![OTA1](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/OTA1_1611655991106.png)

方式二：在旧版开发者中心页面，点击右上角【切换到新版OTA】，点击【确认切换到新版OTA】后， 会跳转到新版开发者中心进行升级。

![OTA1.1](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/OTA1_1611655991097.1_1611655991097.png)



# OTA推送流程

OTA推送流程由5部分组成：分别是添加推送固件及规则、验证固件、开始推送、推送完成、查询结果。

注：以下是GAgent固件OTA教程，要看[MCU OTA教程](http://docs.gizwits.com/zh-cn/UserManual/MCUOTA.html)请点击跳转

1、点击【添加】创建OTA推送规则及固件。

![OTA2](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/OTA2_1611655991102.png)



2、编辑推送内容，支持的【固件类型】有：整包和差分包，填写【固件系列】和【版本号】，点击【上传固件】，可选Wi-Fi或MCU类型的固件。上传完成后点击【生成固件】。

![OTA3](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/OTA3_1611655991161.png)



可点击此处[下载GAgent OTA固件](http://download.gizwits.com/zh-cn/p/92/94)，如设备的模组烧写的固件为：GAgent_00ESP826_04020019_16101715.bin，则可填写固件系列为：00ESP826，版本号为：04020019

![OTA3](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/1479451464257.png)

**备注：**所有**汉枫WiFi模组** OTA固件必须选择web版本，**ESP 8266 WiFi模组**OTA固件为“非combine文件”。如下图：

![OTA3](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/1479452492027.png)

![OTA3](http://docs.gizwits.com/assets/zh-cn/UserManual/OTA/1479452504123.png)



名称解释

- 整包：创建整包时不需要旧包和旧版本号，可以直接进行全部版本的升级，因此整包一般用来升级整个固件【∞ -> 版本B】。

- 差分包：差分包一般用于两个特定的版本之间的升级【版本A->版本B】。

- 差分版本号：需要进行差分升级的旧版本号。

- 固件系列：必须为8 字节，可自定义输入，每个字节可使用的字符为: 0-9、a-z、A-Z。

  **「固件系列」等同于旧版OTA的「硬件版本号」，硬件版本号规则：*

  *（1） 硬件版本号用于区分硬件平台, 需要为每一个硬件型号进行严格区分, 合作伙伴的硬件信息也需要在此做统一管理;*

   *（2） 8 字节字符串描述, 前两个字节表示厂商信息, 由机智云统一分配, 后 6 个字节用于区分厂商内部版本, 由各厂商自由分配;*

  *（3）机智云开发的各硬件的版本前两字节是“00”;*

- 版本号：必须为8 字节，可自定义输入，每个字节可使用的字符为: 0-9、a-z、A-Z。

  **「版本号」等同于旧版OTA的「软件版本号」。软件版本号规则：*

  *（1）软件版本号使用大中小版本格式,为:XXYYZZZZ;*

  *（2）XX: 大版本, 与协议版本一致, 比如 V3 协 议大版本号为 03, V4 协议大版本号为 04；*

  *（3） YY: 中版本, 与驱动 lib 等相关, 从 00 递增;*

  *（4）ZZZZ: 小版本, 与各种兼容性需求相关;*

- 上传固件类型：Wi-Fi是指对通讯模块GAgent进行远程升级，MCU是指对设备硬件部分进行远程升级

- 固件格式：Wi-Fi为bin文件，MCU为bin/hex文件



3、生成固件后，选择推送方式，支持【手动推送】和【静默推送】，手动推送需要用户在App上确认手动升级，静默推送是不需要用户确认的静默升级。

静默推送支持设置推送全部设备或指定设备Mac地址、设备所在地区。同时设置推送周期及推送时段，设置完成点击【更新】。

![OTA4](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/OTA4_1611655991216.png)

![OTA4.1](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/OTA4_1611655991146.1_1611655991146.png)



 名称解释

- 手动推送：需要用户在App上确认的“手动升级”，例如功能升级

- 静默推送：不需要用户确认的“静默升级”，例如BUG修复

- 所有：支持推送到所有设备

- 按Mac：指定MAC地址：填入目标推送设备地址，**如有多个空格隔开**

- 按地区：填入目标推送设备区域，如“广东省-广州市”

- 推送周期（UTC）：设置推送规则有效日期

- 推送时段（UTC）：设置每日推送时段。

- 本地OTA推送时间：根据设置的UTC时间换算的本地时间。



  **备注（重要）:**

（1）设备在推送周期内&推送时段内，且在线状态下，机智云将发送OTA推送通知。每日发送OTA推送通知次数为一次。设备收到通知后，主动下载OTA推送固件。

（2）设备重新上电，设备都将主动询问机智云是否有推送任务。若符合推送周期&推送时段&目标设备，等推送条件，设备主动下载OTA推送固件。

（3）UTC ：协调世界时（英：Coordinated Universal Time ，法：Temps Universel Coordonné），又称世界统一时间，世界标准时间，国际协调时间。推送页面中，机智云自动将UTC时间映射为本地（北京）推送时间。



4、 创建完成后，此时固件为未验证状态。返回固件推送列表，在固件状态未验证一栏点击【去验证】。

*验证固件是为了确保固件批量升级后设备能正常工作，请在批量升级前选择单台设备进行验证测试，防止将错误的固件升级到大量设备造成损失。*

![OTA5](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/OTA5_1611655991309.png)



5、输入用于验证固件的设备【Mac】地址，点击【下一步】；

![OTA6](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/OTA6_1611655991368.png)



6、等待验证固件，验证完成后会自动跳转下一步。

![OTA7](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/OTA7_1611655991459.png)



7、验证通过后，点击【确认】。

![OTA8](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/OTA8_1611655991878.png)



8、完成固件验证后，就可以进行固件推送了，点击【去推送】。

![OTA9](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/OTA9_1611655991949.png)



9、自行阅读协议后勾选「已经自行验证固件稳定性」和「机智云平台服务条款」，点击【确定】。

![OTA10](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/OTA10_1611655992019.png)



10、推送完成后，会有推送成功提示。若中途要停止推送，可点击【停止推送】进行中止操作。

![OTA11](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/OTA11_1611655993009.png)

![OTA11.1](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/OTA11_1611655991913.1_1611655991913.png)



# 查看推送记录

选择OTA-【推送记录】，点击【详情】可查看推送结果明细。

![OTA12](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/OTA12_1611655992529.png)

![OTA13](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/OTA13_1611655992972.png)



# 版本分布

选择OTA-【版本分布】，可查看版本分布详情。

![OTA14](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/OTA14_1611655992540.png)
