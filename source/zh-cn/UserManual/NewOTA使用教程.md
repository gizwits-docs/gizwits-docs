title:  新版OTA使用教程
---

# OTA功能概述

OTA 英文全称是Over-the-Air Technology，即空间下载技术。当设备连上云端时会收到OTA升级通知，再通过HTTP完成固件升级。机智云的OTA服务主要提供以下功能：



- OTA通知服务，即离线升级。当设备的固件程序有新版本发布，OTA 通知服务会推送升级通知到设备。
- OTA透传服务，即在线升级。设备固件程序通过M2M 消息服务透传到设备端。
- 支持一个产品同时有多个推送。
- 支持Wi-Fi/MCU升级。
- 支持推送全部设备。
- 支持定向升级设备。可指定设备mac地址、区域、旧固件版本进行推送。
- 支持定时推送。可自定义推送周期及推送时段。
- OTA版本推送记录。
- OTA进度统计分析。



**升级新版OTA注意事项：切换到新版OTA后，将不能返回到旧版OTA，并且原来设置的推送规则，切换到新版OTA将不再生效。**



# 如何升级OTA

 方式一：登录新版开发者中心，选择产品，点击【产品开发】，在【服务】-【OTA】-【升级版本】页面，点击【升级版本】。

![OTA1](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/1%E5%8D%87%E7%BA%A7%E7%89%88%E6%9C%AC.png)

方式二：在旧版开发者中心页面，点击右上角【切换到新版OTA】，点击【确认切换到新版OTA】后， 会跳转到新版开发者中心进行升级。

![OTA2](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/2%E5%88%87%E6%8D%A2%E6%96%B0%E7%89%88ota.png)

# OTA推送流程

OTA推送流程由5部分组成：分别是添加推送固件及规则、验证固件、开始推送、推送完成、查询结果。

注：以下是GAgent固件OTA教程，要看[MCU OTA教程](http://docs.gizwits.com/zh-cn/UserManual/MCUOTA.html)请点击跳转

1、点击【添加】创建OTA推送规则及固件。

![OTA3](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/3%E6%B7%BB%E5%8A%A0%E5%9B%BA%E4%BB%B6%E6%8E%A8%E9%80%81.png)



2、编辑推送内容，支持的【固件类型】有：整包和差分包，填写【固件系列】和【版本号】，点击【上传固件】，可选Wi-Fi或MCU类型的固件。上传完成后点击【生成固件】。

![OTA4](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/4%E6%B7%BB%E5%8A%A0%E5%9B%BA%E4%BB%B6.png)



可点击此处[下载GAgent OTA固件](http://download.gizwits.com/zh-cn/p/92/94)，如设备的模组烧写的固件为：GAgent_00ESP826_04020019_16101715.bin，则可填写固件系列为：00ESP826，版本号为：04020019

![OTA5](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/5%E4%B8%8B%E8%BD%BD%E5%9B%BA%E4%BB%B6.png)

**备注：**所有**汉枫WiFi模组** OTA固件必须选择web版本，**ESP 8266 WiFi模组**OTA固件为“非combine文件”。如下图：

![OTA6](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/6%E5%9B%BA%E4%BB%B6%E6%A0%BC%E5%BC%8F.png)

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



3、生成固件后，此时固件为未验证状态。可以先返回固件推送列表验证固件，在固件状态未验证一栏点击【去验证】。

验证固件是为了确保固件批量升级后设备能正常工作，请在批量升级前选择单台设备进行验证测试，防止将错误的固件升级到大量设备造成损失。

![OTA7](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/7%E5%8E%BB%E9%AA%8C%E8%AF%81.png)

4、输入用于验证固件的设备【Mac】地址，点击【下一步】；

![OTA8](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/8%E9%AA%8C%E8%AF%81Mac.png)

5、等待验证固件，验证完成后会自动跳转下一步。

![OTA9](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/9%E9%AA%8C%E8%AF%81%E4%B8%AD.png)

6、固件验证通过后，点击【确认】。

![OTA10](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/10%E9%80%9A%E8%BF%87%E9%AA%8C%E8%AF%81.png)

7、验证固件后，点击【编辑】去新建推送规则。
![OTA11](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/11%E7%BC%96%E8%BE%91%E8%A7%84%E5%88%99.png)

8、点击【+添加规则】设置推送规则。

![OTA12](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/12%E6%B7%BB%E5%8A%A0%E8%A7%84%E5%88%99.png)

9、选择推送方式。推送方式分为“用户手动升级（APP内确认升级）”和“云端下发升级”。

名称解释

- 用户手动升级：需要用户在App上确认后才会进行设备升级，例如功能升级；
- 云端下发推送：创建推送规则后，云端根据规则内容主动下发推送，不需要用户确认的静默升级，例如bug修复。 
- 所有：支持推送到所有设备 
- 按Mac：指定MAC地址：填入目标推送设备地址，如有多个空格隔开 
- 按地区：填入目标推送设备区域，如“广东省-广州市” 
- 推送周期（UTC）：设置推送规则有效日期 
- 推送时段（UTC）：设置每日推送时段。 
- 本地OTA推送时间：根据设置的UTC时间换算的本地时间。

云端下发升级可以选择推送全部设备或指定设备Mac地址/设备所在地区，同时支持设置推送周期及推送时段，设置完成点击【保存】即可成功创建一条推送规则。

![OTA13](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/13%E6%8E%A8%E9%80%81%E6%96%B9%E5%BC%8F.png)

按Mac推送：指定设备MAC，填入目标推送设备的Mac信息，如有多个空格隔开

![OTA14](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/14%E6%8C%89Mac.png)

按地区推送：选择目标推送设备区域，如“China-Guangdong-Guangzhou”

![OTA15](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/15%E6%8C%89%E5%9C%B0%E5%8C%BA.png)

按旧固件推送：有旧固件的时候，也支持推送根据旧固件设置推送规则。

![OTA16](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/16%E6%97%A7%E5%9B%BA%E4%BB%B6.png)

备注（重要）:
（1）设备在推送周期内&推送时段内，且在线状态下，机智云将发送OTA推送通知。每日发送OTA推送通知次数为一次。设备收到通知后，主动下载OTA推送固件。
（2）设备重新上电，设备都将主动询问机智云是否有推送任务。若符合推送周期&推送时段&目标设备，等推送条件，设备主动下载OTA推送固件。
（3）同一固件支持创建多条不同的推送规则。每创建一条新规则会生成新的流水号，根据流水号可以查询到推送的详情。
（4）有推送的目标设备才能创建成功规则。
（5）UTC ：协调世界时（英：Coordinated Universal Time ，法：Temps Universel Coordonné），又称世界统一时间，世界标准时间，国际协调时间。推送页面中，机智云自动将UTC时间映射为本地（北京）推送时间。

10、保存成功后会生成一条推送流水号，目标设备指的是推送成功数/设备总数，点击【开始推送】即可推送规则。
自行阅读并勾选「已经自行验证固件稳定性」和「机智云平台服务条款」协议后，点击【确定】。

![OTA17](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/17%E5%BC%80%E5%A7%8B%E6%8E%A8%E9%80%81.png)

注意：如果先创建规则后再去验证固件，在验证固件的过程中，若当前验证的Mac地址的设备包含在已创建的规则中，则验证成功固件后，该规则的目标设备总数会减1。

11、推送完成后，可以刷新状态查看推送成功的目标设备。相同固件相同规则只能推送一次，若有编辑的内容时，可再次推送。

![OTA18](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/18%E6%8E%A8%E9%80%81%E6%B5%81%E6%B0%B4%E5%8F%B7.png)

12、推送完成后，可在固件推送列表中查看到状态更新。

![OTA19](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/19%E5%9B%BA%E4%BB%B6%E6%8E%A8%E9%80%81%E5%88%97%E8%A1%A8.png)



# 查看推送记录

1、选择OTA-【推送记录】，查看所有规则的推送记录，可以根据流水号查看推送详情。点击【详情】可查看推送结果明细。

![OTA20](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/20%E6%8E%A8%E9%80%81%E8%AE%B0%E5%BD%95.png)

2、查看推送结果明细，可查看Mac、did、推送状态、更新时间、操作人和操作时间等。点击【展开/收起】可查看相同did的不同状态。点击下载图标可下载任意7天内的推送历史记录。

![OTA21](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/21%E6%8E%A8%E9%80%81%E8%AF%A6%E6%83%85.png)

# 版本分布

选择OTA-【版本分布】，可查看版本分布详情。

![OTA22](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/DocumentCenterImage/OTA/22%E7%89%88%E6%9C%AC%E5%88%86%E5%B8%83.png)
