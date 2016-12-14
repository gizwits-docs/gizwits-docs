 title:  D3 Engine使用教程
---

# D3 Engine简介
**申请条件**

机智云企业开发者，购买了GDCS服务包的企业客户。

 **功能介绍**
 
D3 Engine，全称 Dynamic Data Director Engine。

D3 Engine是机智云为开发者提供的傻瓜式的数据处理、开发引擎。D3 可以灵活定义数据的输入，能将设备、用户数据与外部第三方数据进行有机整合，还可以支持脚本解析与自定义数据输入，满足不同开发者的数据处理需要。主要特点如下：

1）多样的数据源：支持自定义多种数据源，第三方公共数据甚至您的ERP系统的数据输入。
2）强大的规则处理：基于决策树算法支持灵活多重条件组合。
3）灵活的输出：除了App推送、邮件、短信等服务，还可以支持回调服务以及存储服务；存储服务通过数据平台的计算与开放API服务对各类应用提供数据服务，降低各类应用的开发成本以及面对海量数据的性能处理风险

# D3 Engine申请流程

第一步：登录机智云【开发者中心】，打开需要申请开通D3 Engine的产品(仅限机智云企业开发者)；
第二步：点击【添加服务】，进入到【添加服务】页面，找到【D3 Engine】；

![Alt text](/assets/zh-cn/UserManual/D3/image5.png)

第三步：打开D3 Engine，点击【开通服务】按钮，等待机智云审核；

![Alt text](/assets/zh-cn/UserManual/D3/image6.png)

第四步：待机智云审核通过后，在服务列表即可看到D3 Engine；点击【D3 Engine】即可开始体验。

![Alt text](/assets/zh-cn/UserManual/D3/image7.png)


# D3 Engine使用说明
## 1.项目列表

进入D3 Engine，默认进入此产品的项目列表页面。

![Alt text](/assets/zh-cn/UserManual/D3/image8.png)

项目列表为空时，页面显示如上图。

【新建项目】：点击后跳转至新建项目页面。
【APP推送配置】：点击后跳转至APP推送配置页面。

![Alt text](/assets/zh-cn/UserManual/D3/image9.png)

项目列表不为空时，页面显示如上图。本页面显示该产品所创建的所有项目(不包含通过调用接口创建的项目)。显示字段为项目ID、项目名称、动作类型、备注、是否开启等。

【新建项目】：点击此按钮跳转至新建项目页面，可为该产品创建新项目；
【编辑】：点击后进入当前项目页面可进行修改；
【删除】：点击此按钮可将当前项目删除。
【是否开启】：项目是否开启按钮。项目创建成功后默认开启。点击关闭后该项目将不会被触发。

## 2.配置
进入D3 Engine，默认进入此产品的【项目列表】页面，点击【配置】进入APP推送配置页面。

![Alt text](/assets/zh-cn/UserManual/D3/image10.png)

当前产品无绑定的应用时，页面显示如上图。

【应用配置】：点击后跳转至应用配置页面，可创建新应用。

![Alt text](/assets/zh-cn/UserManual/D3/image11.png)

当前产品有绑定的应用时，页面显示如上图，列出该产品绑定的所有应用。
iOS和Android类型支持配置推送，微信暂不支持。

【编辑推送平台】：点击后跳转至APP绑定第三方推送的配置界面。

## 3.编辑推送平台
此页面可以为APP绑定百度推送或者极光推送。

应用平台：创建应用时所选的类型iOS、Android、微信(暂不支持配置推送)
推送平台：目前仅支持百度推送和极光推送两种方式
推送Key和Secret：从百度推送或极光推送平台申请的Key和Secret
证书类型：生产和开发两种证书类型。iOS应用须选择证书类型(且应根据所选证书类型上传对应证书至百度或极光推送平台上)，Android应用无需证书

![Alt text](/assets/zh-cn/UserManual/D3/image12.png)

输入百度推送API Key、Secret Key或者极光推送App Key、Master Key绑定成功后效果如下图：

![Alt text](/assets/zh-cn/UserManual/D3/image13.png)

再次点击编辑推送平台，可进行解绑及修改操作。

## 4.新建/编辑项目
【返回】：点击此按钮，返回至项目列表页；
【保存】：点击对当前所编辑的项目进行保存(无法保存时会有出错提示)；
【左侧节点】：项目组成部分，不同类型的节点，使用拖拽的方式拖至中间空白区域。分为三类：输入、处理方法、触发动作；
【中间区域】：项目编辑区域，可拖拽页面左侧节点至此部分进行项目创建和修改等操作；
【右下角三个图标】：可对页面进行缩小、恢复默认及放大的操作(仅针对项目编辑区域有效)；

![Alt text](/assets/zh-cn/UserManual/D3/image14.png)

## 5.输入节点
**设备数据**

使用接入机智云的设备的数据作为输入。当有报警或故障数据点时，设备报警或设备故障选项才会显示。

![Alt text](/assets/zh-cn/UserManual/D3/image15.png)

**自定义数据**
使用自定义的JSON格式的数据作为输入。

![Alt text](/assets/zh-cn/UserManual/D3/image16.png)

![Alt text](/assets/zh-cn/UserManual/D3/image17.png)

Schema：描述JSON字符串内部包含的字段结构。可以使用以下工具生成:http://jsonschema.net/#/
数据标识名：用于引用此请求返回的JSON标识。
更新间隔：不小于5s，请求的缓存过期时间。D3会将自定义数据缓存起来，每经过一个更新间隔会重新获取数据。

## 6.处理方法节点

**逻辑规则**

添加一个逻辑条件。比较参数可以是数据点值也可以是自定义的变量值。

![Alt text](/assets/zh-cn/UserManual/D3/image18.png)

**四则运算**

添加一个由四则运算表达式指定的中间变量。此处只能针对数值类型的数据点进行四则表达式运算。变量标识请不要使用中文。

![Alt text](/assets/zh-cn/UserManual/D3/image19.png)

## 7.触发动作节点
**APP推送**

规则触发成功时，与设备绑定的APP用户将收到一条推送消息。
此处可以编辑推送消息的标题、推送内容(可从参数中选择自动替换的变量)、选择推送应用及消息类型，可以自定义推送的时间段。

![Alt text](/assets/zh-cn/UserManual/D3/image20.png)

![Alt text](/assets/zh-cn/UserManual/D3/image21.png)

**HTTP请求**

规则触发成功时，向指定的API发送一个请求。在此节点中输入要请求API的详细参数。

![Alt text](/assets/zh-cn/UserManual/D3/image22.png)

**邮件**

规则触发成功时，指定的邮箱将收到一封推送邮件。此节点定义邮件主题、邮件内容及收件人信息。

![Alt text](/assets/zh-cn/UserManual/D3/image23.png)

**短信推送**

规则触发成功时，与设备绑定的APP用户的手机号码将收到一条短信消息。Apikey和短信模板ID可以从云片获取，此处会进行校验。展开属性可自定义消息接收时间。

![Alt text](/assets/zh-cn/UserManual/D3/image24.png)

![Alt text](/assets/zh-cn/UserManual/D3/image25.png)

**控制设备**

规则触发成功时，该设备改变自己的状态。控制内容中以JSON格式填入，支持Raw和KV两种格式。

![Alt text](/assets/zh-cn/UserManual/D3/image26.png)

## 8.举例说明
产品名称：空气净化器
数据点：
空气质量（air_quality）	枚举型	优秀,良好,一般,污染
温度（temperture）	数值型	-128~128
消耗品1（consumable1）	数值型	0~100
消耗品2（consumable2）	数值型	0~100

**例1：设备上线时，推送消息给app用户同时推送邮件给xxxx@126.com邮箱**

第一步：打开【空气净化器】产品的新建项目页面。
第二步：拖动【设备数据】节点到项目编辑区域。

![Alt text](/assets/zh-cn/UserManual/D3/image27.png)

第三步：双击【设备数据】节点进行编辑，点击【确定】即保存。

![Alt text](/assets/zh-cn/UserManual/D3/image28.png)

第四步：拖动【APP推送】节点到项目编辑区域。

![Alt text](/assets/zh-cn/UserManual/D3/image29.png)

第五步：双击【APP推送】节点进行编辑(定义推送标题、内容、时间段等参数，可参考触发动作节点_APP推送节点说明)，点击【确定】即保存。
第六步：拖动【邮件】节点到项目编辑区域，并双击进行编辑(定义推送人、推送内容、推送标题等参数，可参考触发动作节点_邮件推送节点说明)，点击【确定】即保存
第七步：将三个节点连结起来。

![Alt text](/assets/zh-cn/UserManual/D3/image30.png)

第八步：点击右上角【保存】按钮，项目创建成功。

**例2：空气质量等于一般且消耗品1和消耗品2的平均值小于30时，推送消息给app用户**

第一步：拖动【设备数据】节点到项目编辑区域。

![Alt text](/assets/zh-cn/UserManual/D3/image27.png)

第二步：双击进行编辑，选择设备上报状态，点击【确定】即保存。

![Alt text](/assets/zh-cn/UserManual/D3/image31.png)

第三步：拖动【逻辑规则】节点到项目编辑区域。
第四步：双击【逻辑规则】节点进行编辑，点击【确定】即保存。
进入【逻辑规则】编辑框，比较参数1选择数据点值(空气质量)，比较符号选择等于，比较参数2选择值且从下拉列表中选择具体值(一般)，点击【确定】保存。

![Alt text](/assets/zh-cn/UserManual/D3/image32.png)

第五步：拖动【四则运算】节点到项目编辑区域
第六步：双击【四则运算】节点进行编辑，点击【确定】即保存
此步骤定义一个中间变量Avg = (消耗品1+消耗品2)/2
【算述表达式】中公式输入步骤：点击运算符中的左括号(，从【参数】下拉列中选择“消耗品1”点击添加，点击运算符中的+，从【参数】下拉列表中选择“消耗品2”点击添加，点击运算符中的右括号)，点击运算符中的除号/，输入数字2
在【变量标识】中给变量起个名称(例如Avg)

![Alt text](/assets/zh-cn/UserManual/D3/image33.png)

第七步：再拖动一个【逻辑运算】节点到项目编辑区域，并双击进行编辑，点击【确定】即保存。
进入【逻辑规则】编辑框，比较参数1选择上一步定义的中间变量(Avg)，中间比较符号选择小于，比较参数2选择值且输入数字(30)，点击【确定】保存。

![Alt text](/assets/zh-cn/UserManual/D3/image34.png)

第八步：拖动【APP推送】节点到项目编辑区域，并双击进行编辑，点击【确定】保存。【APP推送】节点设置请参考触发动作节点_APP推送节点说明。
第九步：将五个节点连接起来。

![Alt text](/assets/zh-cn/UserManual/D3/image35.png)

第十步：点击右上角【保存】按钮，项目创建成功。
