title: iOS App消息推送集成指南
---

# 概述
机智云APP开源框架集成了百度推送与极光推送功能，只需修改部分代码即可快速使用。本文档就如何基于机智云APP开源框架快速集成消息推送功能，如需了解开源框架，请参考快速入门的文档。

# 快速集成极光推送
## 1. 申请极光AppKey与Master Secret
### 1.1 创建极光应用
点击链接https://www.jiguang.cn/app/form创建极光应用

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478096715034.png)

如图，需要上传苹果开发者证书，包括开发证书和生产证书以及证书的密码。

### 1.2 申请苹果证书
登陆苹果开发者中心：https://developer.apple.com， 申请并下载cer证书，双击证书从钥匙串打开，选中证书，并选择《登陆》和《我的证书》，右击证书，导出P12证书。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478096770607.png)

点击《导出》会弹出以下弹框，设置证书名称及存储路径

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478096787227.png)

点击存储，弹出密码输入框，设置证书密码

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478096803162.png)

### 1.3 导入证书到极光
成功导入证书如下图，会显示《已验证》

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478096837633.png)

至此极光应用已经创建完成，应用生成的AppKey和Master Secret也可以正常使用

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478096855539.png)

## 2. 在云端绑定第三方推送
### 2.1 申请开通D3 Engine
![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478098383402.png)

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478098391047.png)

开通D3 Engine需要机智云审核通过，点击开通服务后需要联系机智云FAE协助审核开通。

### 2.2 云端绑定极光推送
通过审核后，可以在服务一栏看到D3 Engine，依次点击“配置”->” 编辑推送平台”
![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478096955108.png)

将从极光申请到的应用App Key和 Master Secret填写到下图，并选择测试环境。

注意：选择证书类型为《开发》时，只有在开发环境APP才能收到推送消息
      
![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478096987266.png)

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478096992652.png)

### 2.3 利用D3 Engine创建推送规则
![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097028282.png)

点击项目列表->新建项目，下面将演示创建一个设备上线后给APP推送消息的规则。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097041627.png)

拖动“设备数据”框到右边空白处，并双击该栏目。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097055586.png)

将触发方式设为“设备上线”，点击确定。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097067010.png)

双击“APP推送”，并设置推送的内容。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097082290.png)

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097088606.png)

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478098510132.png)

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478098518940.png)

## 3. 修改UIConfig.json代码
填写jpush_app_key，以及将push_type设为1，表示选择极光推送，并且填写绑定了该极光应用的机智云应用于app_id、app_secret、product_key的值中。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097137361.png)

## 4. XCode配置推送
打开项目，选择Targets –> Capabilities，开启Push Notifications的按钮，即开启了项目的远程推送功能。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097187315.png)

开启推送按钮后，会自动生成一个.entitlements文件，如下，其中的红框中的值表示推送环境，development表示开发环境，distribution表示生产环境。设置值为development时推送只在开发环境生效，distribution时推送只在生产环境生效。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097202019.png)

## 5. 启动虚拟设备

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478098602683.png)

## 6. 部署APP运行
通过以上步骤，该APP已具备了极光推送功能，部署到手机上后，申请帐号并登录，通过扫码即可绑定云端的虚拟设备。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097235631.png)

## 7. 测试推送功能
关闭虚拟设备后，再次开启，即可看到手机收到了推送消息。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097258793.png)

## 8. 极光自定义推送声音
 D3引擎支持向每条规则设置特定的推送声音，主要需要做两个地方的修改。
### 8.1 设置推送声音
  打开某条推送规则如下：
  ![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1504698885850.png)
  
选择APP推送方块（上图红框部分）：
![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1504698991318.png)

点击《显示json样例》:
![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1504699699583.png)

Example的具体内容如下：
```
{
  "baidu": {
    "aps": {
      "badge": 0,
      "sound": "default"
    },
    "notification_builder_id": 0,
    "notification_basic_style": 0
  },
  "jiguang": {
    "ios": {
      "sound": "sound.caf",
      "badge": 1
    },
    "android": {
      "builder_id": 0,
      "alert_type": 1,
      "style": 1
    }
  }
}
```

这里做的是iOS的极光推送，假如推送声音名称为《pushMusic.caf》，则高级参数需要填写的内容如下：
```
{
  "jiguang": {
    "ios": {
      "sound": "pushMusic.caf",
      "badge": 1
    }
  }
}
```

具体如图：
![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1504699964358.png)

点击《确定》保存设置即完成推送声音的设置

注意："badge"这个参数是设置推送后APP显示的角标内容，当设置为1时，APP收到推送显示的角标为1，不过按照正常的逻辑应该是APP收到多条推送会自动累加角标数，如果这里填1，那不管推送多少条通知，角标一直都为1。
如果要角标根据消息数量累加，即把"badge": 1去掉即可，没有设置的话，极光会默认做累加操作。

### 8.2 添加推送声音文件到项目
当在D3成功设置自定义推送声音之后，每当有推送消息推到APP中，系统会先去APP中查找是否有相关名称的声音文件，有：则播放该声音，没有：则播放系统默认的声音。
推送声音的音频格式包括aiff，wav，caf 文件，并且播放时间必须在30s内，文件也必须放到 app 的 mainBundle 目录中，有其中一个条件不满足，系统都会播放默认通知声音来替代。
添加音频文件到项目如下：
![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1504700519844.png)

至此自定义推送声音设置结束，推送相关消息APP将播放设置的音频。

# 快速集成百度推送
## 1. 申请百度API KEY
### 1.1 创建百度应用
进入百度云推送平台：http://push.baidu.com，创建应用并配置证书

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097308724.png)

如上图，需要上传苹果pem格式的开发证书和生产证书。
### 1.2 申请苹果证书
申请cer证书并导出p12的过程见《快速集成极光推送》的1.2部分，下图示范如何从p12证书导出pem证书

进入《终端》，输入如下命令即可导出pem证书。

```
openssl pkcs12 -in  <p12证书名称>  -out  <pem证书名称>  -nodes
```
![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097404220.png)

### 1.3 导入证书到百度推送
上传pem证书到《1.1 创建百度应用》所示图中，上传证书成功，会显示《已验证》，并且生成百度推送的API KEY 和 SECRET KEY。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097436964.png)

## 2. 在云端绑定第三方登陆
### 2.1 申请开通D3 Engine
  该步骤可参考《快速集成极光推送》的2.1部分
### 2.2 云端绑定百度推送
![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097657192.png)

将从百度云推送平台申请到的应用API Key和Secret Key填写到下图，并选择测试环境。

注意：选择证书类型为《开发》时，只有在开发环境APP才能收到推送消息
      
![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097675429.png)

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097684073.png)

### 2.3 利用D3 Engine创建推送规则
该步骤可参考《快速集成极光推送》的2.3部分

## 3. 修改UIConfig.json代码
填写bpush_app_key，修改push_type为2，表示选择百度推送, 并且填写绑定了该百度应用的机智云应用于app_id、app_secret、product_key的值中。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097767158.png)

注意：这里也需要设置XCode推送，详情看《快速集成极光推送》的《4 XCode配置推送》
## 4. 修改百度推送的启动接口
百度推送的启动接口有一个pushMode参数，分别有两个值BPushModeDevelopment 和 BPushModeProduction。

BPushModeDevelopment：设置百度推送环境为开发环境


当设置的环境与当前APP的运行环境相符合是，推送才会生效。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097866605.png)

## 5. 启动虚拟设备
该步骤可参考《快速集成极光推送》的第5部分

## 6. 部署APP运行
通过以上步骤，该APP已具备了百度推送功能，部署到手机上后，申请帐号并登录，通过扫码即可绑定云端的虚拟设备。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097950943.png)

## 7. 测试推送功能
关闭虚拟设备后，再次开启，即可看到手机收到了推送消息。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478097977985.png)

## 8. 百度自定义推送声音
### 8.1 设置推送声音
  进入到推送声音设置界面如下，如何进入请参考极光的《极光自定义推送声音的8.1部分》
![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1504699699583.png)

获取Example的具体内容如下：
```
{
  "baidu": {
    "aps": {
      "badge": 0,
      "sound": "default"
    },
    "notification_builder_id": 0,
    "notification_basic_style": 0
  },
  "jiguang": {
    "ios": {
      "sound": "sound.caf",
      "badge": 1
    },
    "android": {
      "builder_id": 0,
      "alert_type": 1,
      "style": 1
    }
  }
}
```

这里做的是iOS的百度推送，假如推送声音名称为《pushMusic.caf》，则高级参数需要填写的内容如下：
```
{
  "baidu": {
    "aps": {
      "badge": 0,
      "sound": "pushMusic.caf"
    }
  }
}
```
设置完成如下：
![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1504700958335.png)

点击《确定》保存，即完成推送声音的设置

### 8.2 添加推送声音文件到项目
这部分请参考文档上方《极光自定义推送声音的8.2部分》


# 常见问题FAQ
**1、开发者一定要开通D3 Engine才能使用消息推送吗？**

解答：是的，目前D3 Engine只针对于企业开发者用户。所以，只有企业开发者才能申请开通使用。
   
**2、使用极光推送按照以上步骤完成代码修改，但是却无法收到推送消息。**

解答：

步骤一：查看XCode的推送开关是否被开启，详情看《2.4 XCode配置推送》。

步骤二：查看项目的.entitlements文件的key值是否与当前的测试环境相符合

distribution表示生产环境，
development表示开发环境

步骤三：确定项目的BundleID是否与证书的Bundle ID一致

注意：若是百度推送，还需要确定启动百度推送方法所设置的pushMode是否与当前的测试环境一致，详情查看《快速集成百度推送》的《4 修改百度推送的启动接口》
如经过以上三个步骤，还是无法推送，则需要通过推送平台推送来确认问题

步骤四：登陆极光/百度平台的应用，测试一下直接从推送平台上推送通知是否能够到达APP。

推送平台单推不可以推的情况：

1）确定证书是否已经失效，考虑更换证书。

推送平台单推可以推的情况：

1）	确认在机智云D3  Engine设置的推送环境是否与当前测试环境一致，如下图的《证书类型》

2）	确认机智云应用绑定的推送APPID和Secret是否与APP中所使用的相对应，如下图

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478098008981.png)

3）	若依然失败，则在如下图位置打断点，打印result的值，确定具体的错误码，根据错误码提示来确认问题并修正。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478098023653.png)

通常result有错，需要从下图所示代码来进一步确认。

![Alt text](/assets/zh-cn/AppDev/AppFrame/ios/push/1478098035760.png)

**3、极光推送如何设置角标的值**

解答：[JPUSHService setBadge:0]; 













   


























