title: 实时大数据使用说明
---

# 实时大数据简介及申请流程

## 1.功能介绍
通过拖放的方式生成API， 用于对产品数据点进行实时大数据统计分析。
## 2.申请流程[#](http://docs.gizwits.com/zh-cn/UserManual/rtbd.html#2-申请流程)

第一步：登录机智云新版开发者中心，在组织层面开通【基础数据统计分析】（实时大数据）服务后，全部产品均可使用该服务。(仅限机智云企业开发者)；

https://developer.gizwits.com/#/login

第二步：点击【账号】，选择【企业信息】页面，选择左侧组织，点击【服务中心】；

![15](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/15_1610349249900.png)

第三步：选择【基础数据统计分析】，点击【立即开通】按钮，等待机智云审核；

![16](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/16_1610349249800.png)

第四步：待审核通过后，点击【返回旧版】，需返回旧版开发者中心使用此功能。（由于新版功能还在开发完善中，部分功能仍会在旧版使用中）。
![17](https://xbgroup-1251025085.cos.ap-guangzhou.myqcloud.com/cybertron/users/409949/media/17_1610349249913.png)

第五步：选择产品，在服务列表即可看到实时大数据；点击【实时大数据】即可开始体验。

![Alt text](/assets/zh-cn/UserManual/RTBD/image3.png)

# 实时大数据API构建
## 1.API列表
进入实时大数据，默认进入此产品的API列表页面。

![Alt text](/assets/zh-cn/UserManual/RTBD/image4.png)
API列表为空时，页面显示如上图。【+新建API】/【创建】：点击后跳转至构建API页面。

![Alt text](/assets/zh-cn/UserManual/RTBD/image5.png)
API列表不为空时，页面显示如上图。本页面显示该产品所创建的所有API。显示字段为API标识符、名称、是否开启、操作等。
【+新建API】：点击后跳转至构建API页面；
【是否开启】：API是否开启按钮。API创建成功后默认开启。点击关闭后该API将不能被调用(调用时提示{"err_msg":"the viewid requested is disabled.","err_code":1006})。
【详细】：点击后进入当前API构建及测试页面，可对其进行修改，保存后生效。
【删除】：点击此按钮可将当前API删除，删除后不可恢复。

## 2.数据点
* 数据点支持四种类型，分别为D（时间戳），S（字符型），N（整型/浮点型），B（布尔型）
* created_at，did，mac是固定字段，所有产品都存在，其他的字段是该产品定义的数据点。
![Alt text](/assets/zh-cn/UserManual/RTBD/image6.png)

当产品下无设备上报数据时，除固定字段外无法加载出产品定义的数据点。
![Alt text](/assets/zh-cn/UserManual/RTBD/image7.png)

## 3.构建API
**(1)聚合**
拖动需要进行聚合计算的数据点到聚合框中，可对其进行求平均值、最小值、最大值、总和。
* 每个API只支持对一个数据点进行聚合；
* 每个API聚合数据点不能为空；
* 聚合计算只支持N（整型/浮点型），B（布尔型）。
![Alt text](/assets/zh-cn/UserManual/RTBD/image8.png)

**(2)分组**
拖动需要进行分组的数据点到分组框中。
* 只支持一个分组字段，可为空；
* 分组字段支持全部数据点；
* 分组字段类型对应相应的分组类型。时间戳只支持*时间区域(每小时、每天、每周、每月)*，整型只支持*数值区域(间距值最小为1)*，字符和布尔只支持*字段值*；
* 只有选择了分组后，测试API时才能展示图表。

**(3)过滤**
拖动过滤的数据点到过滤框中。
* 支持多条件，可为空；
* 过滤字段支持全部数据点；
* 根据过滤字段类型，支持相应的操作符。其中字符型和布尔型只支持 =；
* 过滤值可支持值或者表达式。值可为空；表达式为${}，括号内的值为参数，供API调用时传入。

## 4.测试API
**(1)运行测试&&图表**
设置好聚合数据点、分组数据点、过滤条件后，选择【图标类型】，点击【测试查询】按钮
![Alt text](/assets/zh-cn/UserManual/RTBD/image9.png)
无图：分组字段为空时，无图表展示。

线图：分组字段不能为空，才能选择线图，图形如下：
![Alt text](/assets/zh-cn/UserManual/RTBD/image10.png)
柱图：分组字段不能为空，才能选择柱图，图形如下：
![Alt text](/assets/zh-cn/UserManual/RTBD/image11.png)

**(2)运行测试&&展示数据**
设置好聚合数据点、分组数据点、过滤条件后，点击【测试查询】按钮，再点击【显示数据】按钮(【隐藏数据】按钮)。
备注：更新API条件后，要先点【测试查询】，再点【显示数据】，才能展示最新数据。【显示数据】按钮作用仅仅是决定是否显示数据，无查询功能。
![Alt text](/assets/zh-cn/UserManual/RTBD/image12.png)

显示数据：
![Alt text](/assets/zh-cn/UserManual/RTBD/image13.png)

隐藏数据：点击隐藏数据后，展示数据整个模块不显示。

**(3)保存**
构建完API，经测试符合自己的需求后，可将此API进行保存，以备下次直接调用。
输入API名称(1到32字符长度限制)，点击创建API，即可生成API URL及API参数。此时API创建成功，在API列表即可查看此API并可对其再进行编辑、开关或删除等操作。
![Alt text](/assets/zh-cn/UserManual/RTBD/image14.png)

API生成成功后调用方法请参考”实时大数据API使用”。

# 实时大数据API使用
## 1.调用方式
采用HTTP GET的方式调用接口。
调用的URL为 'http://119.29.123.105:8081/dataapi/view/product/kv/{api_id}'。
其中{api_id}为API标识符，请见API列表中的“API标识符”一列。每个不同的API对应不同的api_id。当查询需要参数输入时，把参数封装成JSON格式，并以'URL?data=JSON'的形式调用。
![Alt text](/assets/zh-cn/UserManual/RTBD/image15.png)

## 2.安全授权(Header)
| 名称  | 值 |  说明   |
| :-------- | :--------| :-------- |
| X-Gizwits-ProductKey  | {product_key} |  产品的product_key   |
| X-Gizwits-Timestamp  | {timestamp_in_seconds} |  当前的Unix Epoch时间戳，单位为秒，但请注意提交的时间戳与标准时间的误差必须在10分钟以内，否则授权失败   |
| X-Gizwits-Signature  | {lower(MD5({product_secret} + X-Gizwits-Timestamp))} |  此值为通过计算出来的签名，计算方法如下：把小写的{product_secret}与{timestamp_in_seconds}按字符串的方式拼接在一起，然后计算其MD5值，再把MD5值转换成小写十六进制字符串的形式，如“71a78a1dd33df9e77d23a7f1171ab40”。其中{product_secret}为产品秘钥   |

## 3.调用频率
每个产品每分钟最多可调用10次（即10 req/m）。

## 4.调用举例
如调用API的参数如下
* API 标识符：AVi-5CkZNrnIcV85KPNd
* 产品标识符：08f3e460b05b4500b9c3e698c6f241b8
* 产品秘钥：2862c8c599fc47b2869aaf4c3efaf35e
* 当前时间为：2016年8月8日10时05分07秒（北京时间）
* 有一查询参数mac，值为c8934046a16d
![Alt text](/assets/zh-cn/UserManual/RTBD/image16.png)
