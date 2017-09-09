title:  第三方登录平台申请流程
---

# 一、 国内平台

## 微信

APP要实现微信登陆，必须前往微信开放平台申请一个应用，获取应用的AppID和AppSecret并且配置到开源框架中即可。

### 注册开发者账号

已有开发者账号可以直接跳过此步骤

点击进入[微信开放平台](https://open.weixin.qq.com)
![name](/assets/zh-cn/AppDev/third-party/第三方登录微信注册1.png)

点击《注册》进入以下界面，填写开发者基本信息
![name](/assets/zh-cn/AppDev/third-party/第三方登录微信注册2.png)

点击 **下一步**，微信开放平台将会往你的注册邮箱发送一份激活邮件
![name](/assets/zh-cn/AppDev/third-party/第三方登录微信激活.png)

点击激活链接，跳转到完善资料界面，填写资料，点击完成即成功创建了微信开放平台开发者账号。
![name](/assets/zh-cn/AppDev/third-party/第三方登录微信注册3.png)


### 创建应用

注册成功后登陆微信开放平台，选中 **管理中心** 跳转到应用创建界面

![name](/assets/zh-cn/AppDev/third-party/第三方登录微信创建应用.png)

点击 **创建移动应用** 按钮，进入以下界面，填写应用的基本信息。

![name](/assets/zh-cn/AppDev/third-party/第三方登录微信创建应用1.png)

填写完成，点击 **下一步**，进入《填写平台信息界面》

![name](/assets/zh-cn/AppDev/third-party/第三方登录微信创建应用2.png)

选择需要的应用平台（一般iOS和Android都要），iOS应用需要填写Bundle ID，安卓应用需要填写应用签名和应用包名，

![name](/assets/zh-cn/AppDev/third-party/第三方微信ios.png)

![name](/assets/zh-cn/AppDev/third-party/第三方微信Android.png)

填写完毕后，点击 **提交审核**，提交审核成功，7天内微信会给出审核结果。审核通过后，应用的APPID和APPKey就可以使用了。

### 获取 AppID 和 AppSecret
审核通过后在移动应用列表点击 **查看**
![name](/assets/zh-cn/AppDev/third-party/第三方微信查看.png)

打开应用详情后可以看到AppID和AppSecret
![name](/assets/zh-cn/AppDev/third-party/第三方微信获取.png)

### 配置开源框架

点击查看[iOS SDK 配置微信登录教程](http://docs.gizwits.com/zh-cn/AppDev/iOS第三方登陆与换肤.html#3-开源框架配置)

点击查看[Android SDK 配置微信登录教程](http://docs.gizwits.com/zh-cn/AppDev/Android第三方登录与换肤.html#3-开源框架配置)




## 腾讯QQ
APP要支持QQ登录，需要先到腾讯开放平台创建一个应用，获取应用的APPID，并设置到开源框架中即可。

### 注册开发者账号
点击进入[腾讯开放平台](http://open.qq.com)

![name](/assets/zh-cn/AppDev/third-party/第三方登录qq注册.png)

点击 **登录** ，填写账号密码登录
 
![name](/assets/zh-cn/AppDev/third-party/第三方登录qq登录.png)

登录成功后跳转到注册界面，开发者可根据自己的需要选择个人或者公司类型。

![name](/assets/zh-cn/AppDev/third-party/第三方登录qq身份.png)

下图是选择个人注册的跳转界面，需填写完整的资料，并完成邮箱验证，即成功创建腾讯开发者账号。

![name](/assets/zh-cn/AppDev/third-party/第三方登录qq身份2.png)

### 创建应用
进入腾讯开放平台，点击 **应用接入**

![name](/assets/zh-cn/AppDev/third-party/第三方登录qq创建.png)


#### 安卓应用

选择 **移动应用 安卓**，点击 **创建应用**
 ![name](/assets/zh-cn/AppDev/third-party/第三方登录qq创建1.png)

完善应用信息，并提交审核
![name](/assets/zh-cn/AppDev/third-party/第三方登录qq创建3.png)

#### iOS应用

选择 **移动应用 iOS**，点击 **创建应用**
![Alt text](/assets/zh-cn/AppDev/third-party/第三方登录qq创建2.png)

完善应用信息，并提交审核
![name](/assets/zh-cn/AppDev/third-party/第三方登录qq创建4.png)


### 获取 APP ID 和 APP KEY

#### 安卓应用
审核通过后，即可获取下图的APP ID 和 APP KEY来创建QQ登录登录。
![name](/assets/zh-cn/AppDev/third-party/第三方登录qq获取.png)

#### iOS应用
审核通过后，即可获取下图的APP ID 和 APP KEY来创建QQ登录登录。
![Alt text](/assets/zh-cn/AppDev/third-party/第三方登录qq获取2.png)


### 绑定应用
登录机智云[开发者中心](http://dev.gizwits.com/zh-cn/developer/product/)，选中需要绑定第三方登录的产品
![name](/assets/zh-cn/AppDev/third-party/配置1.png)

进入产品设置界面，选择需要关联QQ登录的应用，如下图：
![name](/assets/zh-cn/AppDev/third-party/配置2.png)

点击 **关联第三方登录** 进入关联界面，填写从腾讯开放平台申请到的APPID，并点击确定，即完成了机智云应用于QQ应用的绑定。
![name](/assets/zh-cn/AppDev/third-party/配置qq.png)

### 配置开源框架
点击查看[ios应用配置QQ登录教程](docs.gizwits.com/zh-cn/AppDev/iOS第三方登陆与换肤.html#3-开源框架配置)

点击查看[Android 应用配置QQ登录教程](docs.gizwits.com/zh-cn/AppDev/Android第三方登录与换肤.html#3-开源框架配置)


## 新浪微博

APP要支持新浪微博登录，需要先到微博开放平台创建一个应用，通过新浪sdk获得token和uid后，调用OpenAPI创建用户。

### 注册开发者账号
点击进入[微博开放平台](http://open.weibo.com)
![name](/assets/zh-cn/AppDev/third-party/微博登录1.png)

点击 **登录** ，填写账号密码登录
![name](/assets/zh-cn/AppDev/third-party/微博注册1.png)

登录成功点击 **编辑开发者信息** 完善开发者信息和完成身份认证。
![name](/assets/zh-cn/AppDev/third-party/微博完善开发者信息.png)

开发者可根据自己的需要选择个人或者公司类型
![name](/assets/zh-cn/AppDev/third-party/微博完善信息2.png)

完成身份认证
![name](/assets/zh-cn/AppDev/third-party/微博完善信息3.png)

### 创建应用
进入微博开放平台，点击 **微连接** >> **移动应用**
![name](/assets/zh-cn/AppDev/third-party/微博创建应用.png)


点击 **立即接入**
![name](/assets/zh-cn/AppDev/third-party/微博创建应用2.png)

选择需要的应用平台（一般iOS和Android都需要）
![name](/assets/zh-cn/AppDev/third-party/微博创建应用3.png)

填写应用信息后提交审核。iOS应用需要填写Apple ID和Bundle ID，安卓应用需要填写一套签名信息和下载地址。
![name](/assets/zh-cn/AppDev/third-party/微博创建应用4.png)

### 获取 AppID 和 AppSecret
点击**应用信息**，如下图所示位置查看AppID 和 AppSecret
![name](/assets/zh-cn/AppDev/third-party/微博获取.png)

### 调用接口
开发者根据微博提供的 SDK 完成微博登录，通过返回的 user_id 和 access_token 调用机智云[OpenAPI的创建用户](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_users)接口完成登录。



## 百度
APP要支持百度登录，需要先到百度开发者中心创建一个应用，通过？？？？？？获得token和uid后，调用OpenAPI创建用户。

### 注册开发者账号
点击进入[百度开放平台](http://developer.baidu.com/)
![name](/assets/zh-cn/AppDev/third-party/baidu登录.png)

登录成功后完善开发者信息，开发者可根据自己的需要选择个人或者公司类型。并完成邮箱验证，即成功创建百度开发者账号
![name](/assets/zh-cn/AppDev/third-party/baidu注册.png)

### 创建应用
完成邮箱验证后，通过邮箱链接进入百度开发者中心，然后点击**去创建应用**。
![name](/assets/zh-cn/AppDev/third-party/baidu创建.png)

进入开发者服务管理，点击**创建工程**
![name](/assets/zh-cn/AppDev/third-party/baidu创建2.png)

填写应用名称
![name](/assets/zh-cn/AppDev/third-party/baidu创建3.png)


### 获取 API Key 和 Secret Key
点击**基本信息**，如下图所示位置查看API Key 和 Secret Key
![name](/assets/zh-cn/AppDev/third-party/baidu获取.png)

### 调用接口
开发者根据百度提供的 SDK 完成百度登录后获取 access_token ，然后通过百度的 REST API 获取 UID，再调用机智云[OpenAPI的创建用户](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_users)接口完成登录。

# 二、国外平台

## Facebook
APP要支持Facebook登录，需要先到腾讯开放平台创建一个应用，获取应用的APPID，并设置到开源框架中即可。

### 登录developers
点击进入[Facebook for developers](https://developers.facebook.com/),登录Facebook账号
![name](/assets/zh-cn/AppDev/third-party/fb登录.png)


### 创建应用
完成身份认证后创建应用

新用户创建界面，点击 **创建应用**
![name](/assets/zh-cn/AppDev/third-party/fb创建应用.png)

老用户创建应用，点击 **添加新应用**
![name](/assets/zh-cn/AppDev/third-party/fb创建应用2.png)

填写应用名称和联系邮箱，点击 **创建应用编号**
![name](/assets/zh-cn/AppDev/third-party/fb创建应用3.png)

创建成功后自动打开应用详情，选择 **设置** >> **基本**，点击 **添加平台**
![name](/assets/zh-cn/AppDev/third-party/fb创建应用4.png)

选择需要的应用平台（一般iOS和Android都需要）
![name](/assets/zh-cn/AppDev/third-party/fb创建应用5.png)

填写应用信息，
![name](/assets/zh-cn/AppDev/third-party/fb应用信息.png)

### 获取 App ID 和 App Secret
点击**控制面板**即可查看 App ID，点击下图**显示**按钮查看 App Secret
![name](/assets/zh-cn/AppDev/third-party/fb获取.png)

### 调用接口
开发者根据 Facebook 提供的sdk完成第三方登录，通过返回的user_id和access_token调用机智云[OpenAPI的创建用户](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_users)接口完成登录。

## Twitter
APP要支持 Twitter 登录，需要先到Twitter Developers创建一个应用，获取应用的APPID。

### 登录Developers
打开[Twitter Developers](https://dev.twitter.com)，点击 **My apps**
![name](/assets/zh-cn/AppDev/third-party/tw登录1.png)

如果还没有注册Twitter账号的，需要先注册账号，已经注册账号的，请直接登录：
![name](/assets/zh-cn/AppDev/third-party/tw登录2.png)


### 创建应用
点击**Create New App**
![name](/assets/zh-cn/AppDev/third-party/tw创建应用1.png)

填写APP名称、说明和网站地址
![name](/assets/zh-cn/AppDev/third-party/tw创建应用2.png)
注:1）现在Twitter创建新的应用时，必须将的手机号添加到Twitter账号上。2）使用在iOS和Android应用中使用twitter登录必需填写CallBack URL。

### 获取 API KEY 和 API Secret
点击**Keys and Access Tokens**，将得到下图中的API KEY 和 API Secret。
![name](/assets/zh-cn/AppDev/third-party/tw获取.png)

### 绑定并应用
登录机智云[开发者中心](http://dev.gizwits.com/zh-cn/developer/product/)，选中需要绑定第三方登录的产品
![name](/assets/zh-cn/AppDev/third-party/配置1.png)

进入产品设置界面，选择需要关联QQ登录的应用，如下图：
![name](/assets/zh-cn/AppDev/third-party/配置2.png)

点击 **关联第三方登录** 进入关联界面，填写从Twitter Developers申请到的API KEY 和 API Secret，并点击确定，即完成了机智云应用于twitter应用的绑定。
![name](/assets/zh-cn/AppDev/third-party/配置tw.png)

### 调用接口
开发者根据 Twitter 提供的sdk完成第三方登录，通过返回的user_id和access_token调用机智云[OpenAPI的创建用户](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_users)接口完成登录。

## Google+
### 登录APIs
打开[Google APIs](https://console.developers.google.com
)，如果还没有注册google账号的，需要先注册账号，已经注册账号的，请直接登录：
![name](/assets/zh-cn/AppDev/third-party/google登录.png)

### 创建应用
登录成功后点击 **选择项目**
![name](/assets/zh-cn/AppDev/third-party/google创建.png)

弹出选择项目弹窗，点击 **+号** 创建项目
![name](/assets/zh-cn/AppDev/third-party/google创建2.png)

填写项目名称，同意服务条款并点击**创建**按钮
![name](/assets/zh-cn/AppDev/third-party/google创建3.png)

在新创建的项目下，点击 **凭据** >> **OAuth 同意屏幕**，将APP名称填入“向使用者展示的产品名称”，和填写其他app的信息。
![name](/assets/zh-cn/AppDev/third-party/google完善.png)

返回 **凭据** 标签，点击 **创建凭据** >> **OAuth 客户端ID**
![name](/assets/zh-cn/AppDev/third-party/google创建5.png)

填写应用软件包ID(bundle id)，可选择填写App Store ID 和团队ID
![name](/assets/zh-cn/AppDev/third-party/google创建6.png)

### 获取Client ID
点击 **凭据** 标签，即可在下图所示位置查看客户端ID（Client ID）
![name](/assets/zh-cn/AppDev/third-party/google获取.png)

### 调用接口
开发者根据google提供的sdk完成第三方登录，通过返回的user_id和access_token调用机智云[OpenAPI的创建用户](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_users)接口完成登录。

注：接口中token入参数需要Bearer开头，以空格连接。格式：Bearer access_token


## Amazon
APP要支持 Amazon 登录，需要先到 Login with Amazon 创建一个应用，获取应用的APPID。

### 登录Developers Center
打开Amazon Developers Center 的[Login with Amazon](https://login.amazon.com)，点击 **Sign Up**
![name](/assets/zh-cn/AppDev/third-party/amz登录.png)

如果还没有注册Twitter账号的，需要先注册账号，已经注册账号的，请直接登录：
![name](/assets/zh-cn/AppDev/third-party/amz登录2.png)

### 创建应用
点击**Register new application**创建新应用
![name](/assets/zh-cn/AppDev/third-party/amz创建应用.png)

填写应用名称、说明和网站地址
![name](/assets/zh-cn/AppDev/third-party/amz创建应用2.png)

添加所需要的应用平台（一般iOS和Android都需要，Android）
![name](/assets/zh-cn/AppDev/third-party/amz创建应用3.png)

填写应用基本信
![name](/assets/zh-cn/AppDev/third-party/amz创建应用4.png)

### 获取 APP ID 和 API Key
在应用信息中即可看到APP ID
![name](/assets/zh-cn/AppDev/third-party/amz获取.png)

API Key需要在**iOS或Android设置**中点击**API Key Value**查看
![name](/assets/zh-cn/AppDev/third-party/amz获取2.png)

### 调用接口
开发者根据Amazon提供的sdk完成第三方登录，通过返回的user_id和access_token调用机智云[OpenAPI的创建用户](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_users)接口完成登录。

注：接口中token入参数需要Bearer开头，以空格连接。格式：Bearer access_token
