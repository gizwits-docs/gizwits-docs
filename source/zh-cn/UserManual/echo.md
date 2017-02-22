title: 接入亚马逊Echo音箱教程
---

# 1、概述

本文介绍了亚马逊Echo音箱如何接入机智云并且控制机智云下的GOKIT设备

## 1.1 接入流程

**关系图：**

![Alt text](/assets/zh-cn/UserManual/Echo/1484625601810.png)

机智云云端：即机智云云端数据库，云端对外提供OpenApi，即访问数据的接口，企业和个人开发者想要得到设备接入、用户账号管理、用户与设备绑定管理、设备远程监控、定时任务以及设备高级数据等服务，可以调用Open Api来实现这些功能。（详情使用方法点击此处跳转）

Alexa：Alexa是Amazon Echo的语音服务提供了功能或技能，使客户能够使用语音以更直观的方式与设备进行交互。 技能的例子包括播放音乐，回答一般问题，设置闹钟或计时器等的能力。

Alexa Skill：Alexa技能工具包是自助服务API，工具，文档和代码示例的集合，使您能够快速，轻松地向Alexa添加技能。所有代码在云中运行，在任何用户设备上都没有。

AWS Lambda：AWS Lambda是Amazon提供的计算服务, 它目前提供的程式语言有Node.js, Python, 以及java, 使用者可以撰写程式码, 并且使用AWS其它服务 (Ex. AWS IoT, logger)。 Lambda让使用者设定计算所需要的资源, 像是记忆体, 运算时间等等，Lambda会处理运算的部份。

控制原理：控制机智云设备可以调用机智云的OpenAPI，OpenAPI控制设备的调用接口需要用到注册机智云用户时候返回的User Token，机智云对亚马逊授权开放该接口，与亚马逊账号进行互联互通，使得亚马逊可在Alexa里填入接口的相应的URL绑定机智云账号，从而调用到Access Token，传到Lambda里去再通过OpenAPI调用控制设备的接口进行控制。

**流程图：**

![Alt text](/assets/zh-cn/UserManual/Echo/1484625616584.png)

## 1.2 接入须知
1、具备产品互联的服务功能（申请条件：机智云企业开发者，购买了GDCS服务包的企业客户）

2、熟悉《设备快速接入机智云文档》《App快速接入机智云文档》并且能够完成整个接入

## 1.3 准备工作
硬件设备：亚马逊Echo音箱、机智云GOKIT设备
软件：机智云APP
其他：机智云开发者账号、亚马逊开发者账号、亚马逊AWS Lambda账号

# 2、机智云配置
本节要点：申请机智云产品互联服务，配置机智云的产品互联，配置Alexa定向URL来绑定机智云。

## 2.1 设备接入
按照文档中心的《设备快速接入机智云》绑定设备，获取设备did （[点击此处跳转](http://docs.gizwits.com/zh-cn/quickstart/%E8%AE%BE%E5%A4%87%E5%BF%AB%E9%80%9F%E6%8E%A5%E5%85%A5.html)）

## 2.1 APP开发
按照文档中心的《App快速接入机智云》注册登陆机智云账号获取User Token和AppId进行绑定  （[点击此处跳转](http://docs.gizwits.com/zh-cn/quickstart/%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C.html)）

## 2.3 申请产品互联并配置

![Alt text](/assets/zh-cn/UserManual/Echo/1484625737500.png)

点击个人项目-服务-添加服务，找到产品互联，点击进去开通服务（必须是购买了GDCS服务包的企业客户）

申请完成后，点开产品互联，点击亚马逊Echo，配置你App开发中所填入的AppID，点击配置。

![Alt text](/assets/zh-cn/UserManual/Echo/1484625881833.png)

配置Client Nname和AlexaSkill上面的Redirect URL。

![Alt text](/assets/zh-cn/UserManual/Echo/1484637706571.png)


# 3、AlexaSkill配置

本节要点：配置AlexaSkill的语音控制逻辑，配置AlexaSkill和Lambda关联，配置AlexaSkill和机智云账号互联。

## 3.1 创建Skill以及配置interaction model页面
1）打开亚马逊开发者中心（[点击此处跳转](https://developer.amazon.com/home.html)），登陆之前所注册好的亚马逊开发者账号。

![Alt text](/assets/zh-cn/UserManual/Echo/1484626095613.png)
![Alt text](/assets/zh-cn/UserManual/Echo/1484626099372.png)

2）登陆成功后。跳转到developer console，点击ALEXA，点击Alexa Skills Kit的Get Started。

![Alt text](/assets/zh-cn/UserManual/Echo/1484626108141.png)

3）点击Add a New Skill

![Alt text](/assets/zh-cn/UserManual/Echo/1484626115654.png)

4）
1. Skill Information: 这里要填入一些基本资讯
2. Interaction Model: 这里要填入互动模型
3. Configuration: 这里要设定Alexa收到语音命令之后, 该往哪里提交request
4. Test: 这里可以对已经建制好的模型做测试, 这个阶段里, 使用者已经可以使用自己创建的服务
5. Publishing: Alexa的服务流程里, 最后会将使用者设计的服务上架, 所以需要填写相关的资讯
6. Privacy & Compliance: 设定一些隐私相关的设定

![Alt text](/assets/zh-cn/UserManual/Echo/1484626123280.png)


5）我们首先填Skill Information
1. Skill type: 选择 “Custom Interaction Model”
2. Name: 这个地方填的是要显示给一般使用者的名称, 我们填入 “Control Light of Ameba”
3. Invocation Name: 这里填的是让Alexa识别要启动session的名称。一般来说, Alexa启动session的方式有两种, 第一种是讲出完整的内容, 让Alexa分析互动模型来决定要启动哪个session, 第二种是使用者只讲Invocation Name, 让Alexa启动特定的session。这里我们填入 “Ameba Controller”
Invocation Name的取名有一些限制, 要避开Alexa设定的关键字, 以及会造成误判语意的名称, 详细的限制说明可以参考这里:
https://developer.amazon.com/appsandservices/solutions/alexa/alexa-skills-kit/docs/choosing-the-invocation-name-for-an-alexa-skill

设定好之后, 我们点选Next

![Alt text](/assets/zh-cn/UserManual/Echo/1484626142791.png)

## 3.1.1 intent Schema（语音控制逻辑）
Intent Schema设定了这个Skill会用到的intent, 它使用JSON格式如下

![Alt text](/assets/zh-cn/UserManual/Echo/1484626212536.png)

一个skill里面可以填多个intent, 每个intent触发的的情况不同。 Intent里面可以填slot（也可以不填），slot就像是程式里的列举变数, 它分成两种

Custom slot type: 使用者需要为slot列举可能的值
Built-in slot type: Amazon定义了一些常用的slot, 像是日期, 数字, 城市名……, 这类的slot会以AMAZON为前缀字

详细的schema写法可以参考Amazon官网文章:
https://developer.amazon.com/appsandservices/solutions/alexa/alexa-skills-kit/docs/defining-the-voice-interface
这里我们将schema填入底下的值:

![Alt text](/assets/zh-cn/UserManual/Echo/1484626226815.png)

其中intent的名称是 “ControlLight”, 它有一个slot名称是 “LightState”, 型态是custom slot type “LIGHT_STATE”

其中LIGHT_STATE是custom slot type, 所以我们点选 “Add Slot Type”来设定

接着会跳出一个视窗让我们填slot的名字, 以及列举的值,
这里 “Enter Type” 的地方我们填 “LIGHT_STATE”, 接着 “Enter Values​​”的地方填入 “on”, “off”, 填完之后按 “Save”

![Alt text](/assets/zh-cn/UserManual/Echo/1484626236165.png)

## 3.1.2 Sample Utterances（语音命令配置）
Sample Utterances, 这里要填的是当使用者说了什么句子时, 可以触发哪些intent, 我们填入以下的值
ControlLight Turn {LightState} the light
ControlLight Turn the light {LightState}

它的格式里, 前面带的是intent名称, 接着是空白或tab, 后面跟着是使用者说的句子, 以第一行来说, 代表当使用者说了 “Turn on the light”会触发ControlLight intent
填完之后我们按 “Next”

![Alt text](/assets/zh-cn/UserManual/Echo/1484626251575.png)

## 3.2 configuration的配置

这个页面里需要填写与Alexa衔接的Endpoint。当使用者触发Alexa的intent之后, Alexa会将这个intent传递给其它service处理, 使用者可以自己架构这样的server, 或是使用Amazon AWS Lambda, 这里我们将暂停设定Alexa, 并且设定AWS Lambda, 稍后再将这部份完成

![Alt text](/assets/zh-cn/UserManual/Echo/1484626328760.png)

**Account Linking的配置方法：**

将下图页面的 Redirect URLs 设置到机智云 “产品互联” 的 Redirect URL 中，”Client Name” 可以填写 “Alexa”，填入机智云“产品互联”的Client ID和Client Secret作为请求身份验证的公共字符串。

Authorization URL(https://oauth.gizwits.com/oauth/authorize)获取权限
Access Token URL(https://oauth.gizwits.com/oauth/token)获取access_token

![Alt text](/assets/zh-cn/UserManual/Echo/图片1.png)
![Alt text](/assets/zh-cn/UserManual/Echo/图片2.png)

有需要的用户可以填入隐私权限链接保护你的Alexa Skill，本教程选择不填，点击Next下一步。

![Alt text](/assets/zh-cn/UserManual/Echo/1484706885988.png)

# 4、Lambda配置

本节要点：配置Lambda绑定AWS IOT ，配置Lambda绑定Alexa，编写Lambda逻辑代码解析AlexaSkill接收和返回的语音指令，编写OpenApi代码接入机智云云端并控制设备

进入AWS Lambda的首页 https://aws.amazon.com/cn/lambda/
点选右边 “创建免费用户”

![Alt text](/assets/zh-cn/UserManual/Echo/1484626447125.png)

登陆成功后，选择美国东部。

![Alt text](/assets/zh-cn/UserManual/Echo/1484626456752.png)

点击服务-Lambda

![Alt text](/assets/zh-cn/UserManual/Echo/1484626463861.png)

## 4.1  创建和配置AlexaFuntion

Lambda预先设计了一些使用情境, 这些情境提供了一些sample code与default setting。要使用Alexa与Lambda衔接, 我们在Filter的地方填入Alexa

填完之后会筛选出与Alexa相关的blueprint, 其中“alexa-skills-kit-color-expert”与“alexa-skills-kit-color-export-python”是相似的blueprint, 差别只在于“alexa-skills -kit-color-expert”使用的程式语言是JavaScript, 而“alexa-skills-kit-color-export-python”使用python, 这里我们选择“alexa-skills-kit-color-expert”

![Alt text](/assets/zh-cn/UserManual/Echo/1484626476761.png)

点击Configure triggers，这个页面里可以设定触发Lambda开始运算的event从哪里来, 我们点中间的虚线方框, 底下会出现预先设定好的服务列表, 这里我们选择 “Alexa Skills Kit”并且点击Next。

![Alt text](/assets/zh-cn/UserManual/Echo/1484626497999.png)

点击Configure function页面，这个页面里, 我们要填入与程式相关的内容
在Configure function里面, 有三个栏位:
“Name”的栏位用来识别这个Lambda function, 这里我们填 “ControlLight”
“Description”的栏位用来说明这个Lambda function的用途, 我们目前先使用预设值
“Runtime”的栏位设定要使用的程式语言, 根据之前设定的blueprint, 这边出现的值是 “python2.7”, 使用者也可以在这里或之后切换使用的程式语言

![Alt text](/assets/zh-cn/UserManual/Echo/1484626528967.png)

在Lambda function code里面, 可以设定 Code entry type, 使用者可以选择直接线上写code, 或是上传程式码, 这里我们选择线上写code
这里我们先保留sample code, 之后再回来改code

![Alt text](/assets/zh-cn/UserManual/Echo/1484626535714.png)

接下来设定Lambda function handler and role
“Handler”的部份, 我们保留预设值
“Role”的设定关系到Lambda的权限, 为了避免Lambda function使用了不该使用的服务, 我们可以设定Lambda function的权限, 这部份的服务来自于AWS IAM, 不过我们可以在这里直接设定, 在“Role”的下拉选单里, 点选“Create a custom role”

![Alt text](/assets/zh-cn/UserManual/Echo/1484626547521.png)

此时将弹出新的浏览器页面, 并将你带至AWS IAM的服务

在Lambda带出的AWS IAM的设定页面里, 我们设定 “Role Name”为 “control_light”
然后点选 “View Policy Document”
会出现这个role的权限, 我们点选 “Edit”
会跳出视窗, 要你读过Execution Role的说明, 这里点选 “OK”
然后我们可以编辑这个role的权限, 可以看到预设值里, 这个Role的权限只有log的权限, 因为我们需要使用AWS IoT的权限, 所以我们修改它如下

![Alt text](/assets/zh-cn/UserManual/Echo/1484626554792.png)

然后点击“允许”。

![Alt text](/assets/zh-cn/UserManual/Echo/1484626561234.png)

接着页面会关闭, 我们会跳回前一个Lambda设定的页面

设定新的Role并且从AWS IAM返回之后, 可以看到 “Role”以及 “Existing Role”的栏位已经有值

![Alt text](/assets/zh-cn/UserManual/Echo/1484626620482.png)

接着我们设定 Advanced settings
这里可以设定 Lambda需要使用的memory与执行的时间,
这里我们保留预设值, 接着点选 “Next”

![Alt text](/assets/zh-cn/UserManual/Echo/1484626627416.png)

最后会让你review相关的设定, 不过这些设定都可以之后再改变, 这里我们点选 “Create function”

![Alt text](/assets/zh-cn/UserManual/Echo/1484626643685.png)

会出现恭喜你已完成设定的讯息, 请注意, 右上角的字串“ARN - arn:aws:lambda:us-east-1:xxxxxxxxxx”, 就是这个Lambda function的end point, 这个会用来填入Alexa的设定页面

![Alt text](/assets/zh-cn/UserManual/Echo/1484626655908.png)

这里我们暂停AWS Lambda的设定, 并且设定好AWS IoT相关的设定

请参考之前的文章将Ameba与AWS IoT Shadow的设定完成:
http://www.amebaiot.com/ameba-arduino-amazon-aws-iot/
example的部份, 我们使用 "File" -> "Examples" -> "AmebaMQTTClient" -> "amazon_awsiot_with_ack"
因为Alexa的限制需要将region改成us-east-1, 这部份需要特别注意:

![Alt text](/assets/zh-cn/UserManual/Echo/1484626676552.png)

完成之后, 我们点选ameba的thing, 让右边的资讯栏出现, 其中REST API endpoint里, 这个字串“xxxxxxxxx.iot.us-east-1.amazonaws.com”是AWS IoT提供给其它服务使用的endpoint, 这个endpoint我们会拿来填入Lambda所需的资讯里

![Alt text](/assets/zh-cn/UserManual/Echo/1484626686257.png)

## 4.2  Lambda中所对应skill的代码
回到Lambda的设定页面, 点选 “code”页签

![Alt text](/assets/zh-cn/UserManual/Echo/1484626694113.png)

### 4.2.1  event部分代码解析（Echo音箱逻辑处理）
在onIntent函式里, 会比对intent的名字, 这边我们会比对我们设定的intent名字 “ControlLight”, 并且返回 light_control的处理函数

![Alt text](/assets/zh-cn/UserManual/Echo/1484626706311.png)

在light_control里面, 我们可以取得intent的slots资讯, 这边我们要取得的slot是 “LightState”
获取在skill上语音说话所传过来的value并传给switch_action，之后判断switch_action等于on时，则传Ture到switch_action_fun这个函数里。

![Alt text](/assets/zh-cn/UserManual/Echo/1484626714763.png)

### 4.2.2  调用机智云openAPI控制设备
在swtich_action_fun里面，调用机智云的OpenApi进行控制设备

![Alt text](/assets/zh-cn/UserManual/Echo/1484626727043.png)

# 5、Alexa应用端配置
本节要点：Echo音箱配置入网，AlexaSkill与亚马逊账号绑定，Alexa与机智云账号绑定。

## 5.1  配置Echo音箱入网

用笔记本电脑点击链接http://alexa.amazon.com/spa/index.html配置
或用手机App来进行配置：下载链接
（https://www.amazon.com/gp/help/customer/display.html?nodeId=201602060）
登陆亚马逊账号，进入Alexa配置页面，选择Echo音箱

![Alt text](/assets/zh-cn/UserManual/Echo/1484626746300.png)

选择你使用的语言

![Alt text](/assets/zh-cn/UserManual/Echo/1484626759759.png)

点击Connect to Wi-Fi

![Alt text](/assets/zh-cn/UserManual/Echo/1484626780464.png)

当你的音箱旋转橙色光环，即进入配置模式，点击continue

![Alt text](/assets/zh-cn/UserManual/Echo/1484626784962.png)

将你的电脑链接Echo音箱，当Echo音箱进入配置模式时，会发出一个Amazon-XXX的wifi，用电脑进行链接

![Alt text](/assets/zh-cn/UserManual/Echo/1484626791766.png)

链接之后，网页自动切换成该页面，点击Continue

![Alt text](/assets/zh-cn/UserManual/Echo/1484626799437.png)
![Alt text](/assets/zh-cn/UserManual/Echo/1484626824252.png)

选择你所要配置的wifi路由器，点击则进入配置。

![Alt text](/assets/zh-cn/UserManual/Echo/1484626808465.png)

稍等片刻后，便配置成功，点击continue。

![Alt text](/assets/zh-cn/UserManual/Echo/1484626813128.png)

## 5.2  绑定机智云所注册的账号
进入点击进入Skills，点右上角切换到Your Skills，点击Control GOKIT。

![Alt text](/assets/zh-cn/UserManual/Echo/1484626833289.png)

进入之后点击Enable

![Alt text](/assets/zh-cn/UserManual/Echo/1484626838409.png)

进入之后点击Link Account

![Alt text](/assets/zh-cn/UserManual/Echo/1484626843445.png)

之后跳转到登陆页面，这里登陆的是机智云APP所注册的用户名账号和密码，点击Sign in。

![Alt text](/assets/zh-cn/UserManual/Echo/1484626853101.png)

点击yes，弹出链接成功的窗口

![Alt text](/assets/zh-cn/UserManual/Echo/1484626865727.png)
![Alt text](/assets/zh-cn/UserManual/Echo/1484626870181.png)

回到Control GOKIT页面，发现Link Account按钮消失了，则说明关联绑定机智云账号成功

![Alt text](/assets/zh-cn/UserManual/Echo/1484626875505.png)

# 6、AlexaSkill调试与发布

本节要点：调试AlexaSkill是否成功与Lambda和机智云通讯，语音控制逻辑是否正确，如何发布Skill。


## 6.1  AlexaSkill和Lambda的绑定
回到Alexa页面，点击configuration，North America的框里输入AWS Lambda ARN，Lambda ARN在Lambda的Function右上角可以查看到

![Alt text](/assets/zh-cn/UserManual/Echo/1484626891354.png)
![Alt text](/assets/zh-cn/UserManual/Echo/1484626904720.png)

## 6.2  发送控制指令进行测试
在Test页面, 我们可以做一些基本测试
在Voice Simulator里, 我们可以测试Alexa收到的语音资料里, 它会如何发音
它使用SSML tags让Alexa发出特定的语音像是拼出hello, 点选Listen就可以听看看语音的结果

![Alt text](/assets/zh-cn/UserManual/Echo/1484626919082.png)

这边的文字也就是Lambda回传的outputSpeech内容, 所以我们可以在Lambda的回传语音讯息里有更多弹性
在 “Service Simulator”, 我们可以填入使用者发出的语音讯息, 并且让Alexa假装听到这个讯息做对应的处理, 这里我们填入 “Turn on the light”, 然后点选 “Ask Control Gokit”
这段语音讯息会被Alexa处理, 送至Lambda function, Lambda function处理完之后再回传结果, 若正常返回结果，我们就可以对自己的Echo音响说话来语音控制Gokit了。
我们可以点选右下角的 “Listen” 可以聆听这段结果。

![Alt text](/assets/zh-cn/UserManual/Echo/1484626954374.png)

## 6.3  AlexaSkill发布

测试成功后，可以将自己编写的AlexaSkill发布提供给其他的Alexa用户使用，在Publishing information里可以填入自己Skill的一些基础信息，并点击Submit for Certification提交。

**注：当Skill发布成功后，Skill的信息和参数等不可二次修改，请谨慎发布。**

**注意事项：**
亚马逊对启用了 “Account Linking” 的 Skill 有如下要求：”Authorization URL” 的域名必须属于您，并且该链接必须是 https 链接。

**这就需要您完成如下几点：**
    1）拥有一个自己品牌的域名
   2）添加一个二级域名，并且 CNAME 到 “oauth.gizwits.com”
    3）购买一个 https 证书，并将证书文件（包括证书文件和 key 文件）发送给我们，我们将您的证书配置在我们的服务器
    4）在 “Account Linking” 页面，将 “Authorization URL” 和 “Access Token URI” 中的域名修改为您的二级域名

![Alt text](/assets/zh-cn/UserManual/Echo/1484626992489.png)
![Alt text](/assets/zh-cn/UserManual/Echo/1484626997903.png)

若发布成功后，其他用户就可以在Alexa应用端的Skills-All Skills里搜索到

![Alt text](/assets/zh-cn/UserManual/Echo/1484627004661.png)

# 7、相关支持

7.1 如果您是开发者

GoKit是面向智能硬件开发者限量免费开放，注册我们的论坛或关注我们的官方微信均可发起申请即可。

开发者论坛： http://club.gizwits.com/forum.php

文档中心：http://docs.gizwits.com/hc/

7.2 如果您是团体

GizWits针对团体有很多支持计划，您可以和GizWtis联系，快速得到GoKit以及技术支持；

网站地址：http://www.gizwits.com/about-us

官方二维码：



![Alt te	xt](/assets/zh-cn/UserManual/Echo/1484704804104.png)
