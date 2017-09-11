title: APP代码自动生成服务介绍
----
# 概述

为了降低开发智能硬件APP开发门槛，降低开发资源的投入，机智云在《APP开源框架》基础上进一步推出了实现项目完整控制功能的APP开源代码。当开发者在产品项目上创建对应的数据点后，云端会根据产品定义的数据点生成对应产品的APP参考代码。

自动生成的APP代码模块化集成了一个智能硬件APP必备功能，主要包括：
+ 1.用户部分：用户注册，找回密码、第三方登录（微信登录、QQ登录）
+ 2.配置设备入网（Arilink+SoftAP）
+ 3.设备发现，列表展示
+ 4.设备控制
+ 5.消息推送：设备报警后给APP推送报警信息，主要合作推送平台是极光推送和百度推送。

开发者下载源码后，只需要优化UI和设计设备控制界面控制逻辑，源码的控制页面编写了机智云SDK控制设备的标准流程，APP源码二次开发过程中只需按照该流程进行相关代码的优化即可快速完成针对自身产品的智能控制APP。

目前APP生成的源码支持 Andriod、iOS、APICloud平台。

# 工具使用指南

## 1.创建应用

1.1.开发者在机智云开发者中心创建产品和产品数据点后点击应用配置。

![Alt text](/assets/zh-cn/UserManual/App/1490684715654.png)

**注意数据点的命名不能为程序的常用关键字，比如switch、static、enum、native等等，否则生成的代码会有错误！**

1.2.在应用配置界面中添加新应用

![Alt text](/assets/zh-cn/UserManual/App/1490684847946.png)

1.3.分别创建一个安卓和iOS应用。

![Alt text](/assets/zh-cn/UserManual/App/1490684969060.png)

![Alt text](/assets/zh-cn/UserManual/App/1490685005707.png)

![Alt text](/assets/zh-cn/UserManual/App/1490685371464.png)

## 2.生成代码

2.1.查看产品的Product Secret，并复制到剪切板。

![Alt text](/assets/zh-cn/UserManual/App/1490685455353.png)

2.2.点击应用开发，选择刚才创建的安卓应用，粘贴刚才复制的Product Secret，点击生成代码包

![Alt text](/assets/zh-cn/UserManual/App/1490685798872.png)

2.3.等待一段时间后，即可下载源码。

![Alt text](/assets/zh-cn/UserManual/App/1490686247685.png)

2.4.下载的源码是一个压缩包，解压后即可看到相关源码。

![Alt text](/assets/zh-cn/UserManual/App/1490686384224.png)

2.5.关于源码的使用说明，请参考文档解压后的附带文件《源码说明》！

![Alt text](/assets/zh-cn/UserManual/App/1490686450533.png)
