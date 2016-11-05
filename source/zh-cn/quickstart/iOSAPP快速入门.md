# 概述

本文主要介绍了如何快速使用机智云iOS APP开源框架来进行APP的开发与测试，在阅读本文档之前，请先完成[APP开发准备工作](/zh-cn/quickstart/准备工作.html)

# 10分钟部署调试机智云APP开源框架 
## 1. 下载iOS APP开源框架
APP开源框架编译环境：XCode

iOS APP开源框架下载地址：
https://git.oschina.net/dantang/GizOpenSource_AppKit_iOS

![Alt text](/assets/zh-cn/quickstart/iOS/1478079010564.png)
## 2. 导入工程到XCode
下载的开源框架如下图所示，双击红色框部分打开

![Alt text](/assets/zh-cn/quickstart/iOS/1478079062215.png)

框架目录如下：

![Alt text](/assets/zh-cn/quickstart/iOS/1478079123727.png)

## 3. 开源框架包结构说明
开源框架的整体目录结构如下图所示，其中开源代码存储在路径《GOpenSourceModules》下，根据框架的功能划分，将框架划分为五大模块，各个模块之间具有极低的耦合度，除了公共模块《CommonModule》的文件不可随意删减之外，其他模块用户可以根据自己的需要删减相应模块，比如：不需要推送功能，则可以直接删除掉《PushModule》，并注释掉相关属性和方法在其它类中的调用即可。

![Alt text](/assets/zh-cn/quickstart/iOS/1478079298177.png)

## 4. 修改UIConfig.json文件
![Alt text](/assets/zh-cn/quickstart/iOS/1478079317474.png)

如上图所示，UIConfig.json文件是一个全局配置文件，在这里可以设置工程的配置信息，逐一介绍：

- **app_id：机智云app id**
- **app_secret：机智云app secret**
- **product_key：机智云 product key**
- **wifi_type_select：默认配置模块wifi模组选择功能是否开启**
- **tencent_app_id：qq登录 app id**
- **wechat_app_id：微信登录 app id**
- **wechat_app_secret：微信登录 app secret**
- **push_type：推送类型 【0：关闭，1：极光，2：百度】**
- **jpush_app_key：极光推送app key**
- **bpush_app_key：百度推送 app key**
- **openAPIDomain：域名及端口，格式：“api.gizwits.com:80”，不写端口默认80**
- **siteDomain 域名及端口，格式：“site.gizwits.com:80”，不写端口默认80**
- **pushDomain：推送绑定服务器 域名及端口，格式：“push.gizwits.com:80”，不写端口默认80**
- **buttonColor：按钮颜色**
- **buttonTextColor：按钮文字颜色**
- **navigationBarColor：导航栏颜色**
- **navigationBarTextColor：导航栏文字颜色**
- **configProgressViewColor：配置中界面 progress view颜色**
- **statusBarStyle：状态栏样子【0：默认的黑色样式， 1：白色样式]**
- **addDeviceTitle：添加设备界面 导航栏标题文字**
- **qq：登陆界面的QQ登陆按钮【true：显示， false：隐藏】**
- **wechat：登陆界面的微信登陆按钮【true：显示, flase：隐藏】**
- **anonymousLogin：登陆界面的跳过按钮【true：显示, flase：隐藏】**

在机智云官网上分别找到产品的Product Key（如《1. 创建产品并定义数据点》中的图），App ID（如《2. 为产品创建安卓和iOS应用》的第二个图）与App Secret分别填入json文件中对应的位置，如下图所示：

![Alt text](/assets/zh-cn/quickstart/iOS/1478080815360.png)

## 5. 控制界面入口
在框架中若要将控制界面切换为用户自定义的控制界面，而非框架自带的界面，则可以将下图的《GosDeviceController》切换为自定义控制界面即可，即删除图右边红框中的代码，做两步操作：

1)初始化自定义的控制界面

2)从deviceListController（设备列表界面）跳转到自定义控制界面

![Alt text](/assets/zh-cn/quickstart/iOS/1478080869239.png)

## 6. APP部署运行
正确填写Product Key、App ID与App Secret后，工程就可以部署运行了

![Alt text](/assets/zh-cn/quickstart/iOS/1478080908799.png)

![Alt text](/assets/zh-cn/quickstart/iOS/1478080914847.png)

## 7. 注册新用户

![Alt text](/assets/zh-cn/quickstart/iOS/1478081206628.png)

## 8. 登陆用户
注册成功后，APP会自动登录，此时将跳转到“我的设备”界面

![Alt text](/assets/zh-cn/quickstart/iOS/1478081232915.png)

## 9. 启动虚拟设备并显示二维码

打开开发者中心对应产品的“虚拟设备”栏目。

   虚拟设备：云端自动生成一个仿真设备，可模拟真实设备上报数据的行为。在实体设备还未开发完成的情况下，开发者可以利用机智云提供的虚拟设备工具进行APP开发调
    
![Alt text](/assets/zh-cn/quickstart/iOS/1478081272502.png)

![Alt text](/assets/zh-cn/quickstart/iOS/1478081278254.png)

## 10. 扫描绑定设备

打开左上角菜单，点击扫描绑定设备

![Alt text](/assets/zh-cn/quickstart/iOS/1478081306770.png)

![Alt text](/assets/zh-cn/quickstart/iOS/1478081312569.png)

扫码成功后，会跳转回到“我的设备”界面，此时界面中会出现刚才扫描的“虚拟设备”

![Alt text](/assets/zh-cn/quickstart/iOS/1478081334043.png)

## 11. 点击“智能灯”，进入控制界面

![Alt text](/assets/zh-cn/quickstart/iOS/1478081360685.png)

进入控制页面，可以发现，控制页面为一个空白的页面。机智云开源框架为了让开发者快速开发APP，已将用户登录，设备发现，设备配网等功能做成了各个标准模块，仅保留控制页面让开发者自行开发设计，节省了开发者的时间。下章节，将示例如何快速开发一个简单好看的控制页面。

# 控制页面快速开发设计
## 1. 控制页面代码预览

依次打开DeviceModule -> GosDeviceController，可以看到，整个控制页面非常简单，只有一个UILabel将设备的mac地址显示出来

![Alt text](/assets/zh-cn/quickstart/iOS/1478081655756.png)

## 2. 页面UI设计
根据创建的产品“智能灯”，想实现的UI效果如下：

![Alt text](/assets/zh-cn/quickstart/iOS/5-2-1.png)

点击页面中间灯的控件，APP下发命令，控制灯的开关，并将灯的图片显示为开启状态。关闭的时候显示为关闭。

## 3. 页面布局代码开发
### 3.1 导入图片文件

![Alt text](/assets/zh-cn/quickstart/iOS/5-3-1.png)

将表示智能灯开关状态的图片拷贝到CommonModule/Images目录下，如下图所示：

![Alt text](/assets/zh-cn/quickstart/iOS/1478081924503.png)

### 3.2 添加Button控件
1)打开控制器的xib文件 – GosDeviceController.xib，删除Label控件，并到GosDeviceController.m文件中删除所有相关代码

![Alt text](/assets/zh-cn/quickstart/iOS/1478081956383.png)

2)添加Button控件
如图所示，往xib中拖一个Button控件，布局控件于xib中央，设置Button的State Config属性为Default时，Image即按钮图片为关灯图light_off.png；Button的State Config属性为Selected时，Image为light_on.png。

![Alt text](/assets/zh-cn/quickstart/iOS/1478081970594.png)

3)关联xib的Button到GosDeviceController.m文件中

![Alt text](/assets/zh-cn/quickstart/iOS/1478081988598.png)

此时整个页面布局就做好了。

## 4. 控制逻辑代码开发
### 4.1 定义数据点宏

根据数据点的名称定义宏：DataPointSwitch

![Alt text](/assets/zh-cn/quickstart/iOS/1478082064834.png)

![Alt text](/assets/zh-cn/quickstart/iOS/1478082068729.png)

### 4.2 实现控制逻辑
实现控制逻辑需要以下三个步骤：

1)	指定设备的代理

2)	遵守设备协议

3)	下发控制指令

![Alt text](/assets/zh-cn/quickstart/iOS/1478082098231.png)

```objectivec
// 点击界面按钮的控制逻辑
- (void)switchBtnDidClick:(UIButton *)btn
{
    if (btn.isSelected)
    {
        // 关灯
        btn.selected = NO;
        // 下发控制指令到设备端
        [self.device write:@{DataPointSwitch:@NO} withSN:5];
    }
    else
    {
        // 开灯
        btn.selected = YES;
        // 下发控制指令到设备端
        [self.device write:@{DataPointSwitch:@YES} withSN:5];
    }
}
```

### 4.3 实际接收数据逻辑
如图所示，在设备代理方法中实现回调逻辑，并控制开关图片的切换。

![Alt text](/assets/zh-cn/quickstart/iOS/1478082381449.png)

```objectivec
// 接收到设备状态回调
- (void)device:(GizWifiDevice *)device didReceiveData:(NSError *)result data:(NSDictionary *)dataMap withSN:(NSNumber *)sn
{
    NSDictionary *data = dataMap[@"data"];
    if (data != nil && data.count != 0)
    {
        NSNumber *switchNum = data[DataPointSwitch];
        self.switchBtn.selected = switchNum.boolValue;
    }
}
```
### 4.4 部署测试
完成上述代码编写之后，就可以部署到手机中测试控制结果了。

**1)下发命令**

如图所示，APP部署到手机上后，进入到控制页面，如下图所示：

![Alt text](/assets/zh-cn/quickstart/iOS/1478082433113.png)

点击app中灯的图标，APP将下发控制命令，此时APP的按钮图标将变为开灯状态。

![Alt text](/assets/zh-cn/quickstart/iOS/1478082447847.png)

此时可以在云端虚拟设备的通信日志中看到app下发的控制命令，如下图：

![Alt text](/assets/zh-cn/quickstart/iOS/1478082463735.png)

**2)设备主动上报数据**

如图所示，在虚拟设备中，将开关的值改为“0”，点击下面的推送，此时可以看到通信日志中会有一条记录“虚拟设备上报数据”，表示设备上报数据成功了。

![Alt text](/assets/zh-cn/quickstart/iOS/1478082477420.png)

此时APP的控制页面中，灯的按钮马上变成了关灯状态，表示APP成功收到了设备的上报数据。

![Alt text](/assets/zh-cn/quickstart/iOS/1478082493040.png)


