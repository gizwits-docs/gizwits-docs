title: APP绑定设备二维码生成教程
----
#	概述

机智云APP SDK中预留了一个扫描二维码绑定接口，APP可以通过扫描设备二位码直接绑定设备。本文主要介绍如何通过机智云接口生成设备对应的二维码。

# 步骤过程

## 1.进入二维码生成网址
在浏览器打开 http://qrcode.gizwitsapi.com:1800/doc/

## 2.输入授权码

点击右上角 Authorize，在弹出对话框输入"G"，并点击 "Authorize" 按钮

![Alt text](/assets/zh-cn/UserManual/qrcode/1495599463163.png)

## 3.输入PK和MAC地址

打开 "创建二维码生成任务" 接口

![Alt text](/assets/zh-cn/UserManual/qrcode/1495599495117.png)

输入 product_key，和要生成的 mac 序列

![Alt text](/assets/zh-cn/UserManual/qrcode/1495599791606.png)

## 4.生成二维码

点击 "Try it out!"，创建生成任务，如果返回 201，说明二维码生成成功

![Alt text](/assets/zh-cn/UserManual/qrcode/1495600076903.png)

## 5.查询生成的二维码

打开 "查询所有二维码生成任务" 接口

![Alt text](/assets/zh-cn/UserManual/qrcode/1495600122162.png)

输入 product_key，点击"Try it out!"，查询生成任务

![Alt text](/assets/zh-cn/UserManual/qrcode/1495600160651.png)

生成的任务包括文件下载URL的相对路径

![Alt text](/assets/zh-cn/UserManual/qrcode/1495600196798.png)

## 6.下载二维码

在浏览器输入完整 URL（http://qrcode.gizwitsapi.com:1800/+上图中的URL）下载生成的二维码图片，本次下载的URL组合起来是：http://qrcode.gizwitsapi.com:1800/static/zipfiles/1474.zip

![Alt text](/assets/zh-cn/UserManual/qrcode/1495600383938.png)

下载好的二维码打包在zip文件中，如下图

![Alt text](/assets/zh-cn/UserManual/qrcode/1495600438830.png)

## 7.APP调用接口绑定设备

下载解压后的二维码可以用机智云APP调试工具直接扫码后绑定设备。

![Alt text](/assets/zh-cn/UserManual/qrcode/1495607384670.png)

在APP开发中需要调用机智云APP SDK中通过二维码绑定设备的接口绑定设备，扫描二维码需要通过第三方框架(比如zxing)来实现，可以参考机智云开源框架代码来实现，SKD中具体绑定设备接口调用如下，以安卓为例：

```java
	//绑定接口
	GizWifiSDK.sharedInstance().bindDeviceByQRCode(用户id,用户token,二维码内容);
	//绑定回调接口
	GizWifiSDKListener sdkListener=new GizWifiSDKListener() {
	    @Override
	    public void didBindDevice(GizWifiErrorCode result, String did) {
	        super.didBindDevice(result, did);
		//绑定成功回调
	    }
	}
```
