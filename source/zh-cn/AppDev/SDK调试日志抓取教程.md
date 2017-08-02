
# 概述

本文档介绍了如何获取SDK的调试日志。

当在使用机智云SDK进行调试的时候，如果出现一些不可控的错误，可以按照如下步骤获取相应的日志信息提供给机智云技术团队分析定位问题。

# 如何获取手机APP SDK日志
## 1.获取安卓SDK日志

以下步骤以三星Galaxy Note3 Lite 4G为例

步骤一、

在安卓手机上集成我们的SDK，并参考机智云官网上集成文档之初始化流程：http://docs.gizwits.com/hc/kb/article/175453/ 正确启动我们的SDK后，SDK默认将所有日志信息输出到调试终端和日志文件中。如果手机有SD卡，则日志文件会保存在SD卡上，如果没有SD卡，就只保存在应用程序路径下。

步骤二、
用USB数据线将手机连接上电脑，并在我的电脑中打开手机SD卡目录

  ![name](/assets/zh-cn/AppDev/debug/Journal/1478087896447.png)

步骤三、找到GizWifiSDK文件并双击打开即可看到你开发的应用的包名，如果你同时在该手机上开发多个应用，则该目录下将会有多个包名文件夹。 
步骤四、根据出现问题的应用，找到该应用对应的包名的文件夹，并将此文件夹里面的全部内容提供给机智云FAE即可。

 ![name](/assets/zh-cn/AppDev/debug/Journal/1478087908649.png)

## 2.获取iOS SDK日志
获取iOS SDK日志要区分两种情况，iOS10以下的系统和iOS10系统

1）iOS10以下系统的日志获取

步骤一、
在iOS手机上集成我们的SDK，并参考机智云官网上集成文档之初始化流程：http://docs.gizwits.com/hc/kb/article/175851/ 正确启动我们的SDK后，SDK默认将所有日志信息输出到调试终端和日志文件中。

步骤二、
下载并安装同步助手：http://zs.tongbu.com/mac/ （其中包括了mac版和win版）

步骤三、
用USB数据线将手机连接到电脑上，打开同步助手，按下图操作，并将最终拷贝的文件夹交给机智云FAE即可。

 ![name](/assets/zh-cn/AppDev/debug/Journal/1478087955905.png)

2）iOS10系统的日志获取

步骤一、
在项目的info.plist中添加一个key值：Application supports iTunes file sharing，value值为YES,如下图所示：

 ![name](/assets/zh-cn/AppDev/debug/Journal/1480644269434.png)

步骤二、
将APP运行到手机上

步骤三、
在iTurns的文件共享中获取日志

   用USB数据线将手机连接到电脑上，打开iTurns，找到项目下的日志文件导出即可，如下图：
    
  ![name](/assets/zh-cn/AppDev/debug/Journal/1480644288613.png)
  
  ![name](/assets/zh-cn/AppDev/debug/Journal/1480644430368.png)
  
