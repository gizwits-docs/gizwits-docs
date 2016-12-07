title: 接入亚马逊Echo教程
---

# Alexa 简介

亚马逊推出的 Echo 音箱，可以让用户通过语音和音箱进行交互，可以完成获取天气、音乐播放、闹钟设定，控制其他智能设备等功能。

那么能够让用户通过 Echo 音箱控制你开发的基于机智云的产品吗？

答案是肯定的！

亚马逊 Echo 背后的大脑是 Alexa。Alexa 是亚马逊提供的一个语音服务平台，开发者可以在 Alexa 平台上开发出新的 Skill（可以理解为插件）。
这样只要用户启用了新的 Skill，那么 Echo 的功能就得到了增强。

我们要让 Echo 控制一款机智云的产品，就是要在 Alexa 上开发一个针对这个产品的 Skill。

# 接入步骤

## 1、创建 Alexa Skill

- 打开[亚马逊开发者平台](https://developer.amazon.com)并登录您的开发者账号
- 在菜单栏选择 "Alexa"
- 点击 "Alexa Skills Kit"
- 点击 "Add a New Skill"
- 请仔细阅读亚马逊的 Alexa Skill 开发文档，本文档对 Skill 的开发不做说明

## 2、账号连接

假设有一个用户下载了您的 App，并且已经绑定了您开发的基于机智云的智能产品，现在他要使用 Echo 控制您的产品。

那么第一步要做的，就是让用户的亚马逊账号关联机智云账号。

机智云提供 OAuth 2.0 接口，可以让第三方应用通过 OAuth 2.0 的方式获取用户的 token，然后通过用户的 token 调用 Open API 完成绑定设备列表查询、设备状态获取以及设备远程控制等功能。

- 在机智云开发者平台打开您要接入 Alexa 的产品页面
- 在左边 "服务" 菜单栏下，点击 "+添加服务" 按钮
- 选择 "产品互联"，提交申请
- 申请通过后，机智云将自动为您的产品生成一个 OAuth 2.0 客户端，再次进入 "产品互联" 页面，可以看到 client_id，client_secret 等信息，您可以稍后设置 "Client Name"，"Redirect URL" 等信息
- 打开您的 Alexa Skill 设置页面，选择 "Configuration"，参考下图进行设置
![Account Linking](/assets/zh-cn/UserManual/Alexa/account_linking.png)
- 将上面页面的 Redirect URLs 的其中任意一个，设置到机智云 "产品互联" 的 Redirect URL 中，"Client Name" 可以填写 "Alexa"
- 在 Alexa Skill 设置页面，选择 "Test"，选择 "Enabled"
- 这时，你在 Alexa App 中，选择 "Skills"，点击 "Your Skills"，就能看到你的 Skill 了，点击 "Link Account" 就能进入登录页面了
- 输入您在自己的 App 中注册的账号和密码，如果最终出现成功连接账号的页面，您就能在 Alexa Skill 的程序中收到 Alexa 发送的用户 token 了

## 3、使用 Open API 完成 Alexa Skill 开发

如何使用 Open API 不在本文范围内，您可以参考其他文档，完成您的 Alexa Skill 开发

## 4、提交 Skill 审核

如果您已经完成了所 Alexa Skill 开发，那么恭喜您，您可以在 Alexa Skill 设置页面提交发布申请了。

在这之前，有一点需要注意的是，亚马逊对启用了 "Account Linking" 的 Skill 有如下要求："Authorization URL" 的域名必须属于您，并且该链接必须是 https 链接。

这就需要您完成如下几点：

- 拥有一个自己品牌的域名
- 添加一个二级域名，并且 CNAME 到 "oauth.gizwits.com"
- 购买一个 https 证书，并将证书文件（包括证书文件和 key 文件）发送给我们，我们将您的证书配置在我们的服务器
- 在 "Account Linking" 页面，将 "Authorization URL" 和 "Access Token URI" 中的域名修改为您的二级域名
