title: 利用openapi（postman）控制虚拟设备
---
# 概述
本文档介绍了机智云云端提供api接口（openapi），应用端（PC）利用工具（postman）发送HTTP请求实现用户登陆，设备绑定，设备远程控制等功能。

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202039422.png)

# 准备工作
设备：开发者中心-个人项目-虚拟设备
软件：postman
其他：机智云开发者账号
参考文档：openapi指南
辅助工具链接：
[Unix时间戳](http://tool.chinaz.com/Tools/unixtime.aspx)
[MD5加密](http://tool.chinaz.com/Tools/unixtime.aspx)

# 云端创建产品

## 1.新建产品

注册完成后，登陆至机智云开发者中心后台后，点击开发者中心后台右上角的“创建新产品”菜单，在跳转页面新建一个名为“Openapi”的产品，选择“Wi-Fi/移动网络方案”方式接入，并完成产品创建。如下图：

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202107571.png)

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202114252.png)

## 2.新建云端数据点（产品功能点）

### 2.1 数据点介绍

数据点：即设备产品的功能的抽象，用于描述产品功能及其参数。创建数据点后，设备与云端通讯的数据格式即可确定，设备、机智云可以相互识别设备与机智云互联互通的数据。更多的解析和新建指引，可以在开发者中心数据点页面右上角“定义数据点教程”中查看找到帮助，以建立属于你自己产品的数据点，如下图：

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202149343.png)

### 2.2 新建数据点

然后以本次的项目“Openapi”为例，简单描述一下云端数据点和产品的功能点的关系，本次的项目“Openapi”，它需要实现的功能是远程开灯和关灯，那我们只需在云端建立一个“布尔值”的可写数据点即可完成这件事，如下图：

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202154955.png)

添加数据点完成之后，点击下图的“应用”即可，完成整个产品的数据点的新建工作。

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202160359.png)

### 2.3 新建应用配置

以“openapi”的个人项目为例，点击服务-应用配置-添加新应用，如下图

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202178157.png)

之后填入应用名称，名称自定义，平台这里我们选择Android平台，点击添加，如下图

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202184575.png)

点击添加后会出现一个新应用，这里注意App id就是之后HTTP请求所用到的重要参数，如下图

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202189219.png)

## 3. Postman安装和导入
1)去官网下载最新的postman客户端：postman官网:https://www.getpostman.com

2)下载完注册后是注册进入之后是collections是只有postman自带的echo。需要点击左上角import导入，或者按照文档中心的openapi文档。根据请求类型，来填url，header，body的key和value。

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484204845865.png)


3)下面我们选择导入已经收集好的请求，如下图：

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484204941259.png)

Import From Link填入：
https://www.getpostman.com/collections/c76186e38f06e3f4a46a
然后点击import，就会出现如下图所示的文件夹

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202208479.png)



## 4. 使用Postman进行HTTP请求
步骤流程：

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202220532.png)

### 4.1 通过匿名登陆POST请求获取User_token

首先我们使用匿名登陆的POST请求获得Token，Appid在3.2）步骤新建的应用配置可以获取到，在Headers的页面上填入Appid，在Body页面填入phone_id之后点击send发送请求，下面会弹出一个返回框，在body一栏，获取到User_token，则说明请求成功，如下图

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202234913.png)

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202257125.png)


### 4.2 打开虚拟设备获取did和passcode

之后我们回到个人项目-虚拟设备，点击启动虚拟设备，获取该虚拟设备的did和passcode如下图

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202268352.png)

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202273760.png)

### 4.3 通过did+passcode的POST请求绑定设备

我们这里选择用did+passcode的绑定方式的POST请求来绑定设备，在Headers填入之前获取的Appid和User_token，在Body填入从虚拟设备上获取的did和passcode，然后返回success则表示绑定成功，如下图

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202319341.png)

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202323986.png)

### 4.4 通过MAC的POST请求绑定设备（注：第4步成功后，这步骤可跳过）
我们这里选择用MAC的绑定方式的POST请求来绑定设备，在Headers填入之前获取的Appid和User_token，Timestamp为Unix时间戳（有效时间为五分钟），Signature的算法利用MD5加密的方法{MD5(product_secret+X-Gizwits-Timestamp).lower()}，Body填入product_key和设备的mac，点击send，发现设备在线则成功，如下图

注：Timestamp和Signature获取的链接为：Unix时间戳 SignatureMD5加密

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202337484.png)

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202344923.png)

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202354309.png)

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202366432.png)

### 4.5 通过获取绑定设备列表GET请求来查看设备是否在在线

点击获取绑定设备列表的GET请求，在Headers一栏填入Appid和User_token，点击send，然后返回一串JSON格式的信息，“is_online”的值是true表示设备在线，如下图

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202391470.png)

### 4.6 通过远程控制设备的POST请求来控制设备

点击远程控制设备的POST请求，先在Headers填入AppID和User_token，在Url后填入自己的设备ID（did），在body根据自己的数据点的标识名和要发送的数据的值按照JSON格式填入并点击send发送，返回为空则表示成功，如下图

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202399547.png)

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202404343.png)

### 4.7 验证设备是否已被控制

回到个人项目中，发现虚拟设备的值已改变，根据通讯日志，我们将标识名为Led_onoff的布尔型数据点修改成了true，如下图

![Alt text](/assets/zh-cn/UserManual/OpenAPI/1484202412119.png)









