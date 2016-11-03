title:  快速集成消息推送
---

# 概述

机智云APP开源框架集成了百度推送与极光推送功能，只需修改部分代码即可快速使用。本文档就如何基于机智云APP开源框架快速集成消息推送功能，如需了解开源框架，请参考快速入门的文档。

# 快速集成极光推送

## 1、申请极光AppKey与Master Secret

开发者需要根据框架包名在极光官网上创建应用并填写相应信息，如下所示：

1.1、查看框架包名

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage001.png)

1.2、在极光平台创建应用

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage002.png)


1.3、查看对应的AppKey和Master Secret

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage003.png)


## 2、在云端绑定第三方推送

### 2.1 申请开通D3 Engine

1、查看D3 Engine

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage004.png)


2、开通服务

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage005.png)

开通D3 Engine需要机智云审核通过，点击开通服务后需要联系机智云FAE协助审核开通。

### 2.2	云端绑定极光推送

通过审核后，可以在服务一栏看到D3 Engine，依次点击“配置”->” 编辑推送平台”

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage006.png)

将在极光申请的对应信息填写到下图所示的位置，并点击绑定。

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage007.png)

下图所示表示成功绑定了极光推送

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage008.png)

### 2.3	利用D3 Engine创建推送规则

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage009.png)

点击项目列表->新建项目，下面将演示创建一个设备上线后给APP推送消息的规则。

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage010.png)

拖动“设备数据”框到右边空白处，并双击该栏目。

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage011.png)

将触发方式设为“设备上线”，点击确定。

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage012.png)

双击“APP推送”，并设置推送的内容。

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage013.png)

点击“保存”，保存推送规则
![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage014.png)

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage015.png)

下图表示成功保存推送规则

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage016.png)

## 2.4修改UIConfig.json代码

1、填写机智云app_id与product_key并修改push_type

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage017.png)

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage018.png)


## 2.5	修改AndroidManifest.xml

将图3中的APP KEY填写到AndroidManifest.xml中的对应的代码中。

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage019.png)

## 2.6启动虚拟设备

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage020.png)

## 2.7	部署APP运行

通过以上步骤，该APP已具备了极光推送功能，部署到手机上后，申请帐号并登录，通过扫码即可绑定云端的虚拟设备。

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage021.png)

## 2.8测试推送功能

关闭虚拟设备后，再次开启，即可看到手机收到了推送消息。

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage022.png)

# 快速集成百度推送

## 1、申请百度API KEY

根据框架包名在百度官网上创建应用并填写相应信息，如下图：

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage001.png)

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage023.png)

查看对应的API KEY和SECRET KEY

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage024.png)

## 2、在云端绑定第三方登录

### 2.1申请开通D3 Engine

该步骤可以参考2.2.2

### 2.2云端绑定百度推送

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage006.png)

将百度申请的对应信息填写到下图所示的位置，并点击绑定。

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage025.png)

下图表示成功绑定了百度推送。

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage026.png)

### 2.3	利用D3 Engine创建推送规则

该步骤可以参考2.3

## 2.4修改UIConfig.json代码
填写app_id、app_secret、product_key，修改push_type为2，并将图24对应的key填入到对应的位置

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage027.png)

## 2.5启动虚拟设备

该步骤可以参考2.5

## 2.6部署APP运行

通过以上步骤，该APP已具备了百度推送功能，部署到手机上后，申请帐号并登录，通过扫码即可绑定云端的虚拟设备。

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage021.png)

## 2.7测试推送功能

关闭虚拟设备后，再次开启，即可看到手机收到了推送消息。
 
![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage022.png)

# 常见问题FAQ

## 1、开发者一定要开通D3 Engine才能使用消息推送吗？
解答：是的，目前D3 Engine只针对于企业开发者用户。所以，只有企业开发者才能申请开通使用。

## 2、使用极光推送按照以上步骤完成代码修改，但是却无法收到推送消息。

解答：可按照以下步骤进行排查

i.	APP包名是否已修改，默认包名为“com.gizwits.opensource.appkit”。如果包名已被修改，则需要在AndroidManifest.xml中修改对应位置的信息。可参考极光文档：

http://docs.jiguang.cn/jpush/client/Android/android_guide/

修改了相应信息后，需要测试利用极光平台给APP单独推送消息是否成功，只有极光单推成功才能收到机智云推送消息。

ii.	极光单推成功，但是APP还是无法收到消息。

第一、	确认云端成功绑定了极光的App Key和Master Secret

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage007.png)

第二、	确认云端成功创建了规则。
 
![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage016.png)

第三、	以上两步都确认无误后，还是无法收到消息，则查看如下代码：
 
![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage028.png)

查看下JPushInterface.setAlias方法回调的Result值是否为0，不为0则表示设置极光别名失败，需要重新调用该方法设置别名。

![name](\assets\zh-cn\AppDev\AppFrame\android\pushimage029.png)
查看didChannelIDBind回调接口中Result的值是否为GIZ_SDK_SUCCESS，根据提示的代码重新调试代码。

