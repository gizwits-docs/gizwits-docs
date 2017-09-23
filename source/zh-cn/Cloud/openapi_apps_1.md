title:  Gizwits Open API（新）
---

旧版文档可查看：[Open API旧版文档](/zh-cn/Cloud/OpenAPI.html)

# 概述


机智云是一个开放的物联网设备平台，它为企业和个人开发者提供设备接入、用户账号管理、用户与设备绑定管理、设备远程监控、定时任务以及设备高级数据等服务。

这些数据都是存储在机智云的数据库中的。那么作为开发者，如何去访问这些数据呢？

Open API 就是机智云对外提供这些数据的访问接口！


# 接口列表

根据机智云提供的服务，Open API 提供如下功能:

* [用户管理](#用户管理)：用户的注册、登录、密码重置等功能

| API列表                                  | 描述               |
| ---------------------------------------- | ------------------ |
| [get_app_users](#获取用户信息)           | 获取用户信息       |
| [post_app_users](#创建用户)              | 创建新用户         |
| [put_app_users](#修改用户信息)           | 修改用户信息       |
| [post_app_login](#用户登录)              | 用户登录           |
| [post_app_request_token](#获取APP-Token) | 获取APP Token      |
| [post_app_reset_password](#请求重置密码) | 请求重置密码       |
| [post_app_sms_code](#验证码的获取和校验) | 验证码的获取和校验 |
| [get_app_verify_codes](#获取图片验证码)  | 获取图片验证码     |
| [post_app_verify_codes](#校验图片验证码) | 校验图片验证码     |
| [put_app_verify_codes](#校验短信验证码)  | 校验短信验证码     |

* [消息中心](#消息中心)：用户查看消息、标记已读和删除系统消息等功能

| API列表                                  | 描述               |
| ---------------------------------------- | ------------------ |
| [get_app_messages](#查询消息列表)    | 查询消息列表       |
| [put_app_messages](#标记消息已读和删除) | 标记消息已读和删除 |


* [绑定管理](#绑定管理)：用户与设备的绑定、解绑等功能

| API列表                                       | 描述                 |
| --------------------------------------------- | -------------------- |
| [post_app_bind_mac](#通过-MAC-地址绑定设备)       | 通过 MAC 地址绑定设备    |
| [delete_app_bindings](#解除设备)              | 解除设备             |
| [get_app_bindings](#获取绑定列表)             | 获取绑定列表         |
| [post_app_bind_latest](#通过二维码绑定设备) | 通过二维码绑定设备 |
| [put_app_bindings_did](#修改绑定信息)         | 修改绑定信息         |
| [get_app_did_bindings](#解绑-Guest-用户 )     | 解绑 Guest 用户      |

* [设备远程监控](#设备远程监控):获取设备的当前状态、设备上报的原始数据、设备的上下线记录、设备的远程控制等功能

| API列表                                                         | 描述                           |
| --------------------------------------------------------------- | ------------------------------ |
| [get_app_devdata_did_latest](#获取设备最新状态)                 | 获取设备最新状态               |
| [get_app_datapoint](#获取产品数据点定义)                        | 获取产品数据点定义             |
| [get_app_devices_did](#获取设备详情)                            | 获取设备详情                   |
| [get_app_devices_did_raw_data](#获取设备的通信日志和上下线记录) | 获取设备的通信日志和上下线记录 |
| [post_app_control_did](#远程控制设备)                           | 远程控制设备                   |

* [设备分享](#设备分享):比如用户把自己的绑定设备分享给其他用户，解绑其他用户对自己设备的绑定等

| API列表                                          | 描述               |
| ------------------------------------------------ | ------------------ |
| [get_app_sharing](#查询分享邀请)                 | 查询分享邀请       |
| [post_app_sharing](#创建分享邀请)                | 创建分享邀请       |
| [delete_app_sharing_id](#取消-收回分享)          | 取消/收回分享      |
| [put_app_sharing_id](#接受/拒绝分享)             | 接受/拒绝分享      |
| [get_app_sharing_code](#获取二维码分享信息)      | 获取二维码分享信息 |
| [post_app_sharing_code](#接受二维码分享邀请)     | 接受二维码分享邀请 |
| [put_app_sharing_idalias](#修改用户备注信息)     | 修改用户备注信息   |
| [post_app_sharing_did_transfer](#owner-权限转移) | owner 权限转移     |

* [设备分组](#设备分组):对多个设备进行分组，发送一次指令就能控制分组下的多个设备

| API列表                                                  | 描述                       |
| -------------------------------------------------------- | -------------------------- |
| [get_app_group](#查询用户所有的分组)                     | 查询用户所有的分组         |
| [post_app_group](#创建分组)                              | 创建分组                   |
| [delete_app_group_id](#删除设备分组)                     | 删除设备分组               |
| [put_app_group_id](#修改分组信息)                        | 修改分组信息               |
| [get_app_group_id_devices](#查询分组的设备信息)          | 查询分组的设备信息         |
| [post_app_group_id_devices](#将设备列表添加到分组)       | 将设备列表添加到分组       |
| [delete_app_group_id_devices](#将设备列表从分组移除)     | 将设备列表从分组移除       |
| [post_app_group_id_control](#对设备分组内的设备统一控制) | 对设备分组内的设备统一控制 |



* [设备联动](#设备联动):通过创建设备间联动规则，当设备触发规则后，联动控制其他设备。

| API列表                                   | 描述             |
| ----------------------------------------- | ---------------- |
| [get_app_rules_params](#查询规则可用变量) | 查询规则可用变量 |
| [get_app_rules](#查询联动规则列表)        | 查询联动规则列表 |
| [post_app_rules](#创建联动规则)           | 创建联动规则     |
| [delete_app_rules](#删除联动规则)         | 删除联动规则     |
| [put_app_rules](#修改联动规则)            | 修改联动规则     |




* [用户场景](#用户场景):用户可通过场景功能预设的一系列设备动作并在需要时触发。

* [定时任务管理](#定时任务管理):设备定时任务的增删改查等
* [通用定时任务](#通用定时任务):可对单个设备、设备分组和场景设置定时任务。
* [高级数据接口](#高级数据接口):比如对设备上报的数据按天取最大值、平均值等
* [系统信息](#系统信息):比如查看当前 Open API 版本，获取所有可能的错误列表等

| API列表                   | 描述             |
| ------------------------- | ---------------- |
| [get_status](#get_status) | 查询服务状态信息 |
| [get_errors](#get_errors) | 错误状态码列表   |



# 协议约定

## 请求方式

机智云 Open API 是 RESTful 风格的 HTTP API，您可以使用任何标准的 HTTP 客户端访问机智云 Open API。

推荐 HTTP 客户端：

- [GUI 客户端 PostMan](https://www.getpostman.com/)
- 命令行客户端 curl

## HTTP头部请求说明

### X-Gizwits-Application-Id

X-Gizwits-Application-Id 简称 AppID，是一个应用在机智云平台中的唯一标识，所有 OpenAPI 接口都需要传入这个头部参数。

在开发者中心的产品页面中，点击左边栏的"应用配置"菜单，创建一个应用即可获得一个 AppID:

![Get AppID](/assets/zh-cn/cloud/get-appid.png)

### X-Gizwits-User-token

X-Gizwits-User-token 简称 UserToken，它代表着接口调用中的用户上下文。

UserToken 具有有效期，默认为 7 天。

可以通过用户注册或者登录接口获取 UserToken，返回字段中的 token 就是 UserToken，expire_at 表示 UserToken 过期的时间戳：
```json
{
  "uid": "29db4f0d806e451a84264ba3da64d9de",
  "token": "86a0ee91548f4971832e371811702316",
  "expire_at": 13894002020
}
```

每次登录可以获取一个新的 UserToken，新旧 UserToken 都可以使用。

因为机智云 Open API 大多数的接口都是与用户相关的，所以一般的接口调用顺序如下：

1. 判断本地是否有 UserToken，以及 UserToken 是否过期
2. 如果不存在 UserToken 或者 UserToken 过期，调用用户登录接口，获取并保存 UserToken
3. 使用 UserToken 调用其它接口

## 加密参数

统一使用32位加密

lower：小写

UPPER：大写


示例：
lower(md5(product_secret + X-Gizwits-Timestamp ))

选择md5，32位[小]进行加密，填入product_secret和X-Gizwits-Timestamp，无需“+”号




# 在线调试 Open API

我们提供了在线 API 调试工具，在每个接口描述中，都会给出对应的调试接口链接。

下面以用户登录为例，说明 API 调试工具的使用：

- 点击 [用户登录](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_login) 进入接口调试页面
- 接口右边有个红色叹号，点击后弹出对话框，提示需要输入的头部信息
- 该接口需要输入 X-Gizwits-Application-Id，根据前面的说明获取 AppID 并填入，点击 "Authorize" 进行授权
- 页面自动刷新，并且叹号变成蓝色，表示需要输入的头部信息已填写（已填写并不一定表示值是正确的，如果值错误，会反应在接口返回内容中）
- 在参数输入框中输入参数值（点击参数右边的 Example Value 黄色框框，可以快速输入示例 JSON）
- 点击 "试一下" 按钮，即可完成接口调用
- 接口调用完成，会显示本地调用等效的 curl 语句，请求 URL，响应体，响应码和响应头


<!--
# 机智云 Open API 指南

机智云所有接口定义可以在[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps)页面中查看。

下面对各分类接口的典型调用场景进行说明。
-->
# 用户管理

## <span id = "post_app_users">创建用户</span>

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_users)

有以下几种方式可以创建新用户：

- 匿名注册，通过唯一的 phone_id 创建用户
- 用户名密码注册，通过 username 和 passowrd 创建用户
- 手机注册，通过 phone, password 和 code（短信验证码）创建用户，短信验证码的获取参考下面章节
- 邮箱注册，通过 email 和 password 创建用户
- 第三方登录用户创建，通过authData内的 src、 uid 和 token 创建用户。目前支持 QQ、百度、新浪微博

请求地址及地址

      POST
      http://api.gizwits.com/app/users

请求参数

| 参数                     | 类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| X-Gizwits-Application-Id | string |  是  | header   | appid                                         |
| phone_id                 | string |  否  | body     | 匿名标识,匿名注册的请求参数                       |
| username                 | string |  否  | body     | 用户名,用户名密码注册的请求参数                   |
| password                 | string |  否  | body     | 密码,用户名密码注册、手机注册、邮箱注册的请求参数 |
| email                    | string |  否  | body     | 邮件地址,邮箱注册的请求参数                       |
| phone                    | string |  否  | body     | 手机号码,手机号码，手机注册的请求参数             |
| code                     | string |  否  | body     | 验证码,短信验证码，手机注册的请求参数             |
| lang                     | string |  否  | body     | 语言:en，zh-cn                                |
| src                      | string |  否  | body     | 平台类型:qq, sina, baidu, wechat              |
| uid                      | string |  否  | body     | 第三方登录平台返回的uid                       |
| token                    | string |  否  | body     | 第三方登录平台返回的token                     |

响应参数

|   参数    |  类型   |     描述      |
|:--------- |:------- |:------------- |  
| uid       | string  | 用户唯一id    |   
| token     | string  | 用户token     |   
| expire_at | integer | token过期时间（时间戳） |   

返回例子
```json
{
  "token": "f8324047f20144f6914e7be19304f943",
  "uid": "f082f4e235974cfeb6a1b40a6024f47e",
  "expire_at": 1504772734
}
```
<span id="get_app_users"></span>

## <span id="get_app_users1">获取用户信息</span>

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/get_app_users)

请求地址及地址

      GET
      http://api.gizwits.com/app/users

请求参数

|           参数           |  类型  | 必填 | 参数类型 | 描述 |
|:------------------------ |:------ |:----:|:-------- |:----- |
| X-Gizwits-Application-Id | string |  是  | header   | appid |
| X-Gizwits-User-token     | string |  是  | header   | 用户token |

响应参数

|     参数     |  类型   |                描述                 |
|:------------ |:------- |:----------------------------------- |
| username     | string  | 用户名                              |
| phone        | string  | 手机号码                            |
| email        | string  | 注册邮箱                            |
| name         | string  | 姓名                                |
| gender       | string  | 性别，M：男, F：女, N：未知         |
| birthday     | string  | 生日，日期格式：YYYY-MM-DD or MM-DD |
| address      | string  | 地址                                |
| lang         | string  | 语言版本en, zh-cn                   |
| remar        | string  | 备注                                |
| uid          | string  | 用户唯一id                          |
| is_anonymous | boolean | 是否匿名用户                        |

返回例子
```json
{
    "username": "gizwits",
    "uid": "f082f4e235974cfeb6a1b40a6024f47e",
    "phone": "18888888888",
    "birthday": "2017-01-01",
    "address": "guangzhou",
    "lang": "zh-cn",
    "remark": "remark",
    "name": "gizwits",
    "is_anonymous": false,
    "gender": "M",
    "email": "club@gizwits.com"
}
```

## <span id= "put_app_users">修改用户信息</span>

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/put_app_users)

有以下几种不同注册对应的修改方式
* 匿名注册的用户转普通用户: 输入 username, password
* 匿名注册的用户转手机用户: 输入 phone, password, code (通过获取验证码接口获取)
* 修改密码: 输入 old_pwd, new_pwd
* 修改手机号: 输入 phone, code (通过获取验证码接口获取)
* 修改基本信息：姓名、性别、生日、地址、语言版本、备注

请求地址及方式

      PUT
      http://api.gizwits.com/app/users

请求参数

|           参数           |  类型  | 必填 | 参数类型 |                描述                 |
|:------------------------ |:------ |:----:|:-------- |:----------------------------------- |
| X-Gizwits-Application-Id | string |  是  | header   | appid                               |
| X-Gizwits-User-token     | string |  是  | header   | 用户token                           |
| username                 | string |  否  | body     | 用户名，用于匿名转普通用户          |
| password                 | string |  否  | body     | 密码，用于匿名转普通用户            |
| phone                    | string |  否  | body     | 手机号码，用于匿名转手机注册用户    |
| code                     | string |  否  | body     | 验证码，用于匿名转手机注册用户      |
| old_pwd                  | string |  否  | body     | 旧密码，用于修改密码                |
| new_pwd                  | string |  否  | body     | 新密码，用于修改密码                |
| email                    | string |  否  | body     | 注册邮箱，用于匿名转邮箱注册用户    |
| name                     | string |  否  | body     | 姓名                                |
| gender                   | string |  否  | body     | 性别，M：男, F：女, N：未知         |
| birthday                 | string |  否  | body     | 生日，日期格式：YYYY-MM-DD or MM-DD |
| address                  | string |  否  | body     | 地址                                |
| lang                     | string |  否  | body     | 语言版本en, zh-cn                   |
| remar                    | string |  否  | body     | 备注                                |





响应参数

|   参数    |  类型  |   描述   |
|:--------- |:------ |:-------- |
| updatedAt | string | 修改时间(UTC时间) |


返回例子
```json
{
  "updatedAt": "2017-01-01T08:32:56.996638"
}
```

## <span id ="post_app_login">用户登录</span>

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_login)

匿名用户和第三方登录用户调用用户创建用户接口进行登录。

请求地址及方式

      POST
      http://api.gizwits.com/app/login

请求参数

|           参数           |  类型  | 必填 | 参数类型 |                   描述                    |
|:------------------------ |:------ |:----:|:-------- |:----------------------------------------- |
| X-Gizwits-Application-Id | string |  是  | header   | appid                                     |
| X-Gizwits-User-token     | string |  是  | header   | 用户token                                 |
| username                 | string |  是  | body     | 用户名，可以是用户的 username/email/phone |
| password                 | string |  是  | body     | 密码                                      |
| lang                     | string |  否  | body     | 语言版本                                  |


响应参数

|   参数    |  类型   |     描述      |
|:--------- |:------- |:------------- |  
| uid       | string  | 用户唯一id    |   
| token     | string  | 用户token     |   
| expire_at | integer | token过期时间（时间戳） |   

返回例子
```json
{
  "token": "f8324047f20144f6914e7be19304f943",
  "uid": "f082f4e235974cfeb6a1b40a6024f47e",
  "expire_at": 1504772734
}
```

## <span id= "post_app_request_token">获取APP Token</span>

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_request_token)

该接口获取的token参数主要用于调用[获取短信验证码](#post_app_sms_code)和[获取图片验证码](#get_app_verify_codes)接口时作为请求参数使用。

请求地址及方式

    POST  
    http://api.gizwits.com/app/request_token

请求参数

|            参数            |  类型  | 必填 | 参数类型 |   描述    |
|:-------------------------- |:------ |:----:|:-------- |:--------- |
| X-Gizwits-Application-Id   | string |  是  | header   | appid     |
| X-Gizwits-Application-Auth | string |  是  | header   | MD5_32位加密(appid + appsecret) |

响应参数

|   参数    |  类型   |     描述      |
|:--------- |:------- |:------------- |  
| uid       | string  | 用户唯一id    |   
| expire_at | integer | token过期时间（时间戳） |   

返回例子
```json
{
  "token": "f8324047f20144f6914e7be19304f943",
  "expire_at": 1504772734
}
```



## <span id="post_app_reset_password">请求重置密码</span>

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_reset_password)

只有设置了 email 或者 phone 的用户才可以重置密码。
* 通过 email 重置密码，只需传入 email ，通过邮件发送重置密码链接
* 通过 phone 重置密码，传入 phone, new_pwd, code (通过调用获取短信验证码接口获取)


请求地址及方式

    POST
    http://api.gizwits.com/app/reset_password

请求参数

|           参数           |  类型  | 必填 | 参数类型 |     描述     |
|:------------------------ |:------ |:----:|:-------- |:------------ |
| X-Gizwits-Application-Id | string |  是  | header   | appid        |
| email                    | string |  否  | body     | 注册邮箱     |
| phone                    | string |  否  | body     | 注册手机号码 |
| new_pwd                  | string |  否  | body     | 新密码       |
| code                     | string |  否  | body     | 验证码       |


响应参数

    无



## <span id = "post_app_sms_code">验证码的获取和校验</span>
[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_sms_code)

短信验证码的主要用途有：

* 手机号用户注册
* 手机号用户重置密码
* 其他您认为需要短信验证码的敏感操作

接口能实现获取和校验验证码：
* 获取短信验证码只需要传入 phone
* 验证短信验证码需要传入 phone 和 code

关于国外手机号
* 发送短信验证码到国外手机号，需要遵循如下格式：+{国家码}{手机号}。假设一个美国（国家码为 1）的手机号为 4246531234，那么 phone 就应该填写为 "+14246531234"
* 国家码列表可以通过[这里](https://www.itu.int/dms_pub/itu-t/opb/sp/T-SP-E.164D-11-2011-PDF-E.pdf)获取。

短信验证码正确校验后立即失效，默认有效期为 24 小时。


请求地址及方式

      POST
      http://api.gizwits.com/app/sms_code

请求参数

|           参数           |  类型  | 必填 | 参数类型 |   描述    |
|:------------------------ |:------ |:----:|:-------- |:--------- |
| X-Gizwits-Application-Id | string |  是  | header   | appid     |
| X-Gizwits-User-token     | string |  是  | header   | 用户token,通过[获取APP Token](#post_app_request_token)接口取得 |
| phone                    | string |  是  | body     | 手机号码  |
| code                     | string |  是  | body     | 验证码    |


响应参数

    无


## <span id = "get_app_verify_codes">获取图片验证码</span>
[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/get_app_verify_codes)

返回的 captcha_url 就是图片验证码的 URL，将图片显示给用户

请求地址及方式

      GET
      http://api.gizwits.com/app/verify/codes

请求参数

|           参数           |  类型  | 必填 | 参数类型 |   描述    |
|:------------------------ |:------ |:----:|:-------- |:--------- |
| X-Gizwits-Application-Id | string |  是  | header   | appid     |
| X-Gizwits-User-token     | string |  是  | header   | 用户token,通过[获取APP Token](#post_app_request_token)接口取得 |

响应参数

|    参数     |  类型   |       描述        |
|:----------- |:------- |:----------------- |
| captcha_url | string  | 图片验证码URL地址 |
| captcha_id  | string | 图片验证码id      |

返回例子

```json
{
  "captcha_url": "http://api.gizwits.com/captcha/image/22d9cdc8edb13fd19f770afbed45351831403b5d/",
  "captcha_id": "22d9cdc8edb13fd19f770afbed45351831403b5d"
}
```


## 校验图片验证码并发送验证码
[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_verify_codes)

对[获取图片验证码](#get_app_verify_codes)接口的图片验证码进行校验，校验通过将发送短信验证码

请求地址及方式

      POST
      http://api.gizwits.com/app/verify/codes

请求参数

|           参数           |  类型  | 必填 | 参数类型 |                  描述                   |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------- |
| X-Gizwits-Application-Id | string |  是  | header   | appid                                   |
| X-Gizwits-User-token     | string |  是  | header   | 用户token,通过[获取APP Token](#post_app_request_token)接口取得 |
| captcha_id               | string |  是  | body     | 图片验证码id                            |
| captcha_code             | string |  是  | body     | 图片验证码的值                          |
| phone                    | string |  是  | body     | 手机号码                                        |

响应参数

    无




## <span id = "put_app_verify_codes">校验短信验证码</span>

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/put_app_verify_codes)

请求地址及方式

      GET
      https://api.gizwits.com/app/verify/codes

请求参数

| 参数                     | 类型   | 必填 | 参数类型 | 描述                                                           |
|:------------------------ |:------ |:----:|:-------- |:-------------------------------------------------------------- |
| X-Gizwits-Application-Id | string |  是  | header   | appid                                                          |
| X-Gizwits-User-token     | string |  是  | header   | 用户token,通过[获取APP Token](#post_app_request_token)接口取得 |
| phone                    | string |  是  | body     | 手机号码                                                       |
| sms_code                 | string |  是  | body     | 验证码                                                         |

响应参数

    无





# 消息中心

## <span id = "post_app_users">查询消息列表</span>

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/消息中心/get_app_messages)

获取用户的消息，如分享信息、D3规则推送的消息

请求地址及方式

      GET
      https://api.gizwits.com/app/messages?type=1&limit=20&skip=0

请求参数

| 参数                     | 类型    | 必填 | 参数类型 | 描述                           |
|:------------------------ |:------- |:----:|:-------- |:------------------------------ |
| X-Gizwits-Application-Id | string  |  是  | header   | appid                          |
| X-Gizwits-User-token     | string  |  是  | header   | 用户token                      |
| type                     | integer |  是  | query    | 消息类型，1：设备分享消息      |
| limit                    | integer |  否  | query    | 返回的结果条数                 |
| skip                     | integer |  否  | query    | 表示跳过的条数，间接表示页数。 |

响应参数

| 参数       | 类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| total      | integer | 消息总数                  |
| limit      | integer | 返回的结果条数            |
| skip       | integer | 跳过的条数                |
| previous   | string  | 上一页的请求地址          |
| next       | string  | 下一页的请求地址          |
| id         | string  | 消息id编号                |
| created_at | string  | 消息创建时间（UTC时间）             |
| updated_at | string  | 消息更新时间（UTC时间）              |
| type       | integer | 消息类型，1：设备分享消息 |
| status     | integer | 消息状态，0 未读，1 已读，2 删除    |
| content    | string  | 信息内容                  |


返回例子

```json
{
  "meta": {
    "total": 50,
    "limit": 1,
    "skip": 0,
    "previous": "/app/messages?skip=5&type=1&limit=1",
    "next": "/app/messages?skip=7&type=1&limit=1"
  },
  "objects": [
    {
        "status": 0,
        "created_at": "2017-09-11T11:41:23Z",
        "updated_at": "2017-09-11T11:41:23Z",
        "content": "您给 188****888 共享了设备 微信宠物屋!",
        "type": 1,
        "id": "59b676638c7d500018a9ed98"
     },
  ]
}

```


## <span id = "put_app_messages_id">标记已读和删除消息</span>

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/消息中心/put_app_messages_id)

将用户信息标记为已读和删除消息

请求地址及方式

      PUT
      https://api.gizwits.com/app/messages/{id}?status=1

请求参数

| 参数                     | 类型    | 必填 | 参数类型 | 描述                       |
|:------------------------ |:------- |:----:|:-------- |:-------------------------- |
| X-Gizwits-Application-Id | string  |  是  | header   | appid                      |
| X-Gizwits-User-token     | string  |  是  | header   | 用户token                  |
| id                       | integer |  是  | path     | 消息id编号                 |
| status                   | integer |  是  | query    | 消息状态：1：已读，2：删除 |

响应参数

    无


# 绑定管理

当设备与用户之间绑定后，设备与用户之间就会存在对应的“绑定角色”关系。

绑定角色分为4种类，首绑用户: special ；拥有者: owner ；访客: guest ；普通用户: normal

#### 角色场景说明：
* 当设备没有分享过且设备没有任何用户绑定过。A用户绑定该设备，A用户成为 special ， B用户再绑定该设备，B用户成为normal 。
* 设当前A用户为 special ，B用户为 normal 。当A用户解除绑定，B用户成为 special ，A用户与该设备之间没有“绑定角色”关系。
* 设当前A用户为 special ，B用户为 normal 。产品开启了[设备分享](#设备分享)，A用户将设备分享给C用户，无论C用户是否接受，A用户成为 owner，B用户变成 guest。
* 当开启分享功能且设备没有任何用户绑定。A用户绑定该设备，A用户成为 owner ，其他用户无法再绑定该设备。
* 设当前A用户为 owner ，C用户未绑定过该设备 。A用户将设备分享给C用户，且C用户接受分享。A用户成仍是 owner，C用户为 guest。
* 设当前A用户为 owner ，B用户为 guest 。A用户将设备解除绑定，A用户和B用户与该设备之间没有“绑定角色”关系。
* 除 owner 用户，其他用户无法分享设备，一个设备只有一个owner

## 绑定设备

可以通过一下两种方式绑定设备：

- 通过 product_key 和 MAC 地址绑定设备
- 通过二维码绑定设备，二维码内容为 product_key 和 MAC 加密后的内容，所以本质上和上面一种方式一样


## <span id = "post_app_bind_mac">通过 MAC 地址绑定设备</span>

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#!/绑定管理/post_app_bind_mac)

将用户与设备进行绑定

请求地址及方式

      POST
      http://api.gizwits.com/app/bind_mac

请求参数

| 参数                     | 类型    | 必填 | 参数类型 | 描述                                                                                           |
|:------------------------ |:------- |:----:|:-------- |:---------------------------------------------------------------------------------------------- |
| X-Gizwits-Application-Id | string  |  是  | header   | appid                                                                                          |
| X-Gizwits-User-token     | string  |  是  | header   | 用户token                                                                                      |
| X-Gizwits-Timestamp      | string  |  是  | header   | 请求时间戳，与服务器相差不能超过 5 分钟                                                        |
| X-Gizwits-Signature      | string  |  是  | header   | 签名，计算方法为 lower(md5(product_secret + X-Gizwits-Timestamp ))                             |
| product_key              | string  |  是  | body     | 产品product_key                                                                                |
| mac                      | string  |  是  | body     | 设备mac地址                                                                                    |
| remark                   | string  |  否  | body     | 备注                                                                                           |
| dev_alias                | string  |  否  | body     | 设备别名                                                                                       |
| set_owner                | integer |  否  | body     | 是否设置成 owner，只对开启了设备分享功能的产品有效；0（默认值）：不设置成owner，1：设置成owner |


响应参数

| 参数        | 类型          | 描述                                                                 |
| ----------- | ------------- | -------------------------------------------------------------------- |
| product_key | string        | 产品product_key                                                      |
| did         | string        | 设备id                                                               |
| mac         | string        | 设备mac地址                                                          |
| is_online   | boolean       | 是否在线                                                             |
| passcode    | string        | 设备  passcode                                                       |
| host        | string        | 连接服务器的域名                                                     |
| port        | integer       | M2M 的 mqtt 端口号                                                   |
| port_s      | integer       | M2M 的 mqtt SSL 端口号                                               |
| ws_port     | integer       | websocket 端口号                                                     |
| wss_port    | integer       | websocket SSL 端口号                                                 |
| remark      | string        | 设备备注                                                             |
| is_disabled | boolean       | 是否注销                                                             |
| type        | string        | 设备类型，单品设备:normal,中控设备:center_control,中控子设备:sub_dev |
| dev_alias   | string        | 设备别名                                                             |
| dev_label   | Array[string] | 设备标签列表，目前用于语音 API 批量设备控制                          |
| role        | string        | 绑定角色， 特殊用户:special,拥有者:owner,访客:guest,普通用户:normal  |


返回例子

```json
{
    "product_key": "4214bf2d79694a259232431b6f2ef46b",
    "did": "gKufzxZwYeyd3Skbsb6mza",
    "mac": "accf2350d446",
    "is_online": false,
    "passcode": "JHHOOIWJBA",
    "host": "m2m.gizwits.com",
    "port": 1883,
    "port_s": 8883,
    "ws_port": 8080,
    "wss_port": 8880,
    "remark": "备注信息",
    "is_disabled": false,
    "type": "normal",
    "dev_alias": "设备别名",
    "dev_label": [],
    "role": "special"

}
```

## <span id = "delete_app_bindings">解绑设备</span>

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#!/绑定管理/delete_app_bindings)

用户已绑定的设备进行解绑

请求地址及方式

      DELETE
      https://api.gizwits.com/app/bindings

请求参数

| 参数                     | 类型   | 必填 | 参数类型 | 描述               |
|:------------------------ |:------ |:----:|:-------- |:------------------ |
| X-Gizwits-Application-Id | string |  是  | header   | appid              |
| X-Gizwits-User-token     | string |  是  | header   | 用户token          |
| devices                  | Array  |  是  | body     | 需要解绑的设备数组 |
| did                      | string |  是  | body     | 设备ID             |


响应参数

| 参数    | 类型          | 描述           |
| ------- | ------------- | -------------- |
| success | Array[string] | 解绑成功的设备 |
| failed  | Array[string] | 解绑失败的设备 |


返回例子

```json
{
    "failed": [],
    "success": [
        "xAAcCYawLFD9JfMysqYf7d",
        "WCWGkbS4Ttynzwx9brzpEa"
    ]
}
```

## <span id = "get_app_bindings">获取绑定列表</span>

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#!/绑定管理/delete_app_bindings)



请求地址及方式

      GET
      https://api.gizwits.com/app/bindings

请求参数

| 参数                     | 类型    | 必填 | 参数类型 | 描述                                       |
|:------------------------ |:------- |:----:|:-------- |:------------------------------------------ |
| X-Gizwits-Application-Id | string  |  是  | header   | appid                                      |
| X-Gizwits-User-token     | string  |  是  | header   | 用户token                                  |
| limit                    | integer |  否  | query    | 返回的结果条数                             |
| skip                     | integer |  否  | query    | 表示跳过的条数，间接表示页数               |
| show_disabled            | integer |  否  | query    | 是否显示已注销的设备，1:显示，0:不显示     |
| show_proto_ver           | integer |  否  | query    | 是否显示设备通信协议版本，1:显示，0:不显示 |


响应参数

| 参数              | 类型          | 描述                                                                 |
| ----------------- | ------------- | -------------------------------------------------------------------- |
| devices           | Array         | 绑定的设备组                                                         |
| product_key       | string        | 产品product_key                                                      |
| did               | string        | 设备id                                                               |
| mac               | string        | 设备mac地址                                                          |
| is_online         | boolean       | 是否在线                                                             |
| passcode          | string        | 设备  passcode                                                       |
| host              | string        | 连接服务器的域名                                                     |
| port              | integer       | M2M 的 mqtt 端口号                                                   |
| port_s            | integer       | M2M 的 mqtt SSL 端口号                                               |
| ws_port           | integer       | websocket 端口号                                                     |
| wss_port          | integer       | websocket SSL 端口号                                                 |
| remark            | string        | 设备备注                                                             |
| is_disabled       | boolean       | 是否注销                                                             |
| type              | string        | 设备类型，单品设备:normal,中控设备:center_control,中控子设备:sub_dev |
| dev_alias         | string        | 设备别名                                                             |
| dev_label         | Array[string] | 设备标签列表，目前用于语音 API 批量设备控制                          |
| proto_ver         | string        | 协议版本号，'01', '01_01', '03', '04'                                |
| wifi_soft_version | string        | wifi版本号                                                           |
| is_sandbox        | boolean       | 是否连接sandbox环境                                                  |
| role              | string        | 绑定角色， 首绑用户:special,拥有者:owner,访客:guest,普通用户:normal  |


返回例子

```json
{
    "devices": [
      {
          "product_key": "55af63815cc34788aeeb9451a2454412",
          "did": "7r7u8XPkCRLGVYTYrtjoCB",
          "mac": "virtual:site",
          "is_online": false,
          "passcode": "123456",
          "host": "sandbox.gizwits.com",
          "port": 1883,
          "port_s": 8883,
          "ws_port": 8080,
          "wss_port": 8880,
          "remark": "备注信息",
          "is_disabled": false,
          "type": "normal",
          "dev_alias": "设备别名",
          "dev_label": [],
          "proto_ver": "04",
          "wifi_soft_version": null,
          "is_sandbox": true,
          "role": "special"
      },
      {
          "product_key": "4214bf2d79694a259232431b6f22f46b",
          "did": "gKufzxZwYeyd3Skbsb6mza",
          "mac": "accf2350d447",
          "is_online": false,
          "passcode": "JHHOOIWJBA",
          "host": "m2m.gizwits.com",
          "port": 1883,
          "port_s": 8883,
          "ws_port": 8080,
          "wss_port": 8880,
          "remark": "备注信息",
          "is_disabled": false,
          "type": "normal",
          "dev_alias": "设备别名",
          "dev_label": [],
          "proto_ver": "04",
          "wifi_soft_version": "04000006",
          "is_sandbox": true,
          "role": "special"
      }
    ]
}
```

## <span id = "post_app_bind_latest">通过二维码绑定设备</span>

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/绑定管理/post_app_bind_latest)

必须是通过机智云的二维码生成服务([查看教程](http://docs.gizwits.com/zh-cn/UserManual/UseQRCode.html))生成的二维码才可以调用本接口。

请求地址及方式

      POST
      https://api.gizwits.com/app/bind_latest

请求参数

| 参数                     | 类型    | 必填 | 参数类型 | 描述                                                                                           |
|:------------------------ |:------- |:----:|:-------- |:---------------------------------------------------------------------------------------------- |
| X-Gizwits-Application-Id | string  |  是  | header   | appid                                                                                          |
| X-Gizwits-User-token     | string  |  是  | header   | 用户token                                                                                      |
| qr_content               | string  |  是  | body     | 通过扫描二维码得出的字符串                                                                     |
| set_owner                | integer |  否  | body     | 是否设置成 owner，只对开启了设备分享功能的产品有效；0（默认值）：不设置成owner，1：设置成owner |

响应参数

    无


## 修改绑定信息

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/绑定管理/put_app_bindings_did)

用户可以对绑定的设备修改别名和备注。

同一个设备被多个用户绑定，每个用户都可以对该设备设置别名和备注，互不冲突。

请求地址及方式

      PUT
      https://api.gizwits.com/app/bindings/{did}

请求参数

| 参数                     | 类型          | 必填 | 参数类型 | 描述                                        |
|:------------------------ |:------------- |:----:|:-------- |:------------------------------------------- |
| X-Gizwits-Application-Id | string        |  是  | header   | appid                                       |
| X-Gizwits-User-token     | string        |  是  | header   | 用户token                                   |
| did                      | integer       |  是  | path     | 设备ID                                      |
| remark                   | string        |  否  | body     | 设备备注                                    |
| dev_alias                | string        |  否  | body     | 设备别名                                    |
| dev_label                | Array[string] |  否  | body     | 设备标签列表，目前用于语音 API 批量设备控制 |

注：body的参数最少填写输入一个

响应参数

| 参数      | 类型          | 描述                                        |
| --------- | ------------- | ------------------------------------------- |
| remark    | string        | 设备备注                                    |
| dev_label | Array[string] | 设备标签列表，目前用于语音 API 批量设备控制 |
| dev_alias | string        | 设备别名                                    |


返回例子

```json
{
    "remark": "备注",
    "dev_label": [
        "标签1",
        "标签2"
    ],
    "dev_alias": "设备别名"
}
```




## 查询设备绑定的Guest用户

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/绑定管理/get_app_did_bindings)

查看接受设备分享邀请的用户信息

请求地址及方式

      GET
      https://api.gizwits.com/app/{did}/bindings

请求参数

| 参数                     | 类型   | 必填 | 参数类型 | 描述                     |
|:------------------------ |:------ |:----:|:-------- |:------------------------ |
| X-Gizwits-Application-Id | string |  是  | header   | appid                    |
| X-Gizwits-User-token     | string |  是  | header   | 用户token                |
| did                      | string |  是  | path     | 设备ID                   |


响应参数

| 参数       | 类型   | 描述                          |
| ---------- | ------ | ----------------------------- |
| username   | string | 账号username,中间4个字母*替代 |
| phone      | string | 账号phone,中间4个数字*替代    |
| created_at | string | Guest 用户接受分享的时间（UTC时间）  |
| uid        | string | Guest用户的UID                |
| email      | string | 账号email,@前面4个字符*替代   |

返回例子

```json
[
    {
        "username": "2****2",
        "phone": null,
        "created_at": "2017-09-19T07:12:32Z",
        "uid": "c0a85d0773e24f15a6853f3148c82313",
        "email": null
    }
]
```




## 解绑 Guest 用户

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/绑定管理/delete_app_did_bindings)

Owner 解除 Guest 用户对设备的绑定关系

请求地址及方式

      DELETE
      https://api.gizwits.com/app/{did}/bindings

请求参数

| 参数                     | 类型   | 必填 | 参数类型 | 描述                     |
|:------------------------ |:------ |:----:|:-------- |:------------------------ |
| X-Gizwits-Application-Id | string |  是  | header   | appid                    |
| X-Gizwits-User-token     | string |  是  | header   | 用户token                |
| did                      | string |  是  | path     | 设备ID                   |
| uid                      | string |  否  | query    | guest 的 uid，不能是自己 |


响应参数

    无


# 设备远程监控

## 获取设备最新状态

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备远程监控/get_app_devdata_did_latest)

该接口获取的是 24 小时内，设备最近一次上报的数据点值。

请求地址及方式

      GET
      https://api.gizwits.com/app/devdata/{did}/latest

请求参数

| 参数                     | 类型   | 必填 | 参数类型 | 描述                     |
|:------------------------ |:------ |:----:|:-------- |:------------------------ |
| X-Gizwits-Application-Id | string |  是  | header   | appid                    |
| did                      | string |  是  | path     | 设备ID                   |


响应参数

| 参数       | 类型   | 描述         |
| ---------- | ------ | ------------ |
| did        | string | 设备ID       |
| updated_at | string | 最后更新时间 |
| attr       | object | 数据点及其值 |

返回例子

```json
{
  "did": "WCWGkbS42tynzwx9brzpEa",
  "updated_at": 1505809000,
  "attr": {
    "alert_full": 0,
    "alert_shutdown": 0,
    "mode": "制冷",
    "fan_swing": 0,
    "switch": 0,
    "fan_speed": "低风",
    "fault_roomtemp": 0,
    "room_temp": -10,
    "set_temp": 16,
    "off_timing": 0,
    "on_timing": 0
  }
}
```




## 获取产品数据点定义
[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备远程监控/get_app_datapoint)

API 调用限制
* AppID 和 product_key 关联
* AppID 为超级 AppID

请求地址及方式

      GET
      https://api.gizwits.com/app/datapoint?product_key={product_key}

请求参数

| 参数                     | 类型   | 必填 | 参数类型 | 描述   |
|:------------------------ |:------ |:----:|:-------- |:------ |
| X-Gizwits-Application-Id | string |  是  | header   | appid  |
| product_key              | string |  是  | path     | 产品product_key |


响应参数

| 参数           | 类型           | 描述                                                                                      |
| -------------- | -------------- | ----------------------------------------------------------------------------------------- |
| name           | string         | 产品名称                                                                                  |
| entities       | Array          | [EntityItem]                                                                              |
| protocolType   | string         | 固定值：standard                                                                          |
| product_key    | string         | 产品product_key                                                                           |
| packetVersion  | string         | 固定值：4                                                                                 |
| ui             | inline_model_7 | 手机客户端 UI 定义                                                                                          |
| EntityItem     | -------------- | -------------------------------------------------------                                   |
| id             | integer        | 固定值：0                                                                                 |
| name           | string         | 固定值：entity0                                                                           |
| display_name   | string         | 固定值：机智云开发套件                                                                    |
| attrs          | Array          | [AttrItem]                                                                                |
| inline_model_7 | -------------- | -------------------------------------------------------                                   |
| object         | inline_model_1 |                                                                                           |
| sections       | Array          | UI 片段列表:[SectionItem]                                                                 |
| AttrItem       | -------------- | -------------------------------------------------------                                   |
| id             | integer        | 数据点顺序                                                                                |
| name           | string         | 数据点标示名                                                                              |
| display_name   | string         | 数据点显示名                                                                              |
| desc           | string         | 固定值：.....                                                                             |
| type           | string         | 读写类型，W: 读写,R: 只读,N: 报警,E: 故障                                                 |
| data_type      | string         | 数据类型，bool：布尔;'uint8','uint16','uint32'：数值型;enum：枚举;binary:扩展型]          |
| uint_spec      | inline_model_4 | 当 data_type 为 uint8/uint16/uint32 时，有该字段                                          |
| enum           | Array          | 当 data_type 为 enum 时，有该字段                                                         |
| position       | inline_model_5 | 字节与比特位描述                                                                                          |
| inline_model_1 | -------------- | -------------------------------------------------------                                   |
| version        | integer        | 固定值：4                                                                                 |
| showEditButton | boolean        | 固定值：false                                                                             |
| SectionItem    | -------------- | -------------------------------------------------------                                   |
| elements       | Array          | [ElementItem]                                                                             |
| inline_model_4 | -------------- | -------------------------------------------------------                                   |
| min            | integer        | 最少值                                                                                    |
| max            | integer        | 最大值                                                                                    |
| ratio          | number         | 分辨率k                                                                                   |
| addition       | integer        | 增量                                                                                          |
| inline_model_5 | -------------- | -------------------------------------------------------                                   |
| bit_offset     | integer        | 位索引，如果为变长协议，固定为 0                                                          |
| len            | integer        | 长度                                                                                      |
| unit           | string         | 单位，'bit', 'byte'                                                                       |
| byte_offset    | integer        | 字节索引，如果为变长协议，固定为 0                                                        |
| ElementItem    | -------------- | -------------------------------------------------------                                   |
| title          | string         | 数据点显示名                                                                              |
| key            | string         | entity0.{数据点标示名}                                                                    |
| type           | string         | 'QBooleanElement', 'QFloatElement', 'QRadioElement', 'QMultilineElement', 'QLabelElement' |
| keyboardType   | string         | 键盘类型，固定值，"NumbersAndPunctuation"                                                 |
| maxLength      | integer        | type 为 QMultilineElement 才有该字段，最大长度，为数据点定义长度的 2 倍                   |
| items          | Array          | type 为 QRadioElement 才有该字段，枚举值列表                                              |
| boolValue      | boolean        | type 为 QBooleanElement 才有该字段，固定值：false                                         |
| bind           | string         | type 为 QFloatElement 才有该字段，固定值：floatValue:float                                |
| maximumValue   | number         | type 为 QFloatElement 才有该字段，最大值                                                  |
| minimumValue   | number         | type 为 QFloatElement 才有该字段，最少值                                                  |
| value          | integer        | type 为 QFloatElement 才有该字段，固定值：0                                               |
| object         | inline_model_6 |                                                                                           |
| inline_model_6 | -------------- | -------------------------------------------------------                                   |
| action         | string         | 固定值:entity0                                                                            |
| bind           | Array[string]  | 固定值:entity0.{数据点标示名}                                                             |
| perm           | string         | 读写类型：W: 读写,R: 只读,N: 报警,E: 故障                                                 |
| unit_spec      | inline_model_2 | type 为 QFloatElement 才有该字段                                                          |
| inline_model_2 | -------------- | -------------------------------------------------------                                   |
| max            | integer        | 最大值                                                                                    |
| step           | integer        | 步进                                                                                         |
| min            | integer        | 最小值                                                                                    |



返回例子

```json
{
  "name": "Huiking_OTA_宠物屋",
  "entities": [
    {
      "id": 0,
      "display_name": "机智云开发套件",
      "attrs": [
        {
          "display_name": "开启/关闭红色灯",
          "name": "LED_OnOff",
          "data_type": "bool",
          "position": {
            "bit_offset": 0,
            "len": 1,
            "unit": "bit",
            "byte_offset": 0
          },
          "type": "status_writable",
          "id": 0,
          "desc": "....."
        }
      ],
      "name": "entity0"
    }
  ],
  "protocolType": "standard",
  "product_key": "268162799f764b999f834b5a02eb894d",
  "packetVersion": "0x00000004",
  "ui": {
    "object": {
      "version": 4,
      "showEditButton": false
    },
    "sections": [
      {
        "elements": [
          {
            "boolValue": false,
            "object": {
              "action": "entity0",
              "bind": [
                "entity0.LED_OnOff"
              ],
              "perm": "W"
            },
            "type": "QBooleanElement",
            "key": "entity0.LED_OnOff",
            "title": "开启/关闭红色灯"
          }
        ]
      }
    ]
  }
}
```




## 获取设备详情

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备远程监控/get_app_devices_did)


请求地址及方式

      GET
      https://api.gizwits.com/app/devices/{did}

请求参数

| 参数                     | 类型   | 必填 | 参数类型 | 描述                     |
|:------------------------ |:------ |:----:|:-------- |:------------------------ |
| X-Gizwits-Application-Id | string |  是  | header   | appid                    |
| did                      | string |  是  | path     | 设备ID                   |


响应参数

| 参数        | 类型          | 描述                                                                 |
| ----------- | ------------- | -------------------------------------------------------------------- |
| product_key | string        | 产品product_key                                                      |
| did         | string        | 设备id                                                               |
| mac         | string        | 设备mac地址                                                          |
| is_online   | boolean       | 是否在线                                                             |
| passcode    | string        | 设备  passcode                                                       |
| host        | string        | 连接服务器的域名                                                     |
| port        | integer       | M2M 的 mqtt 端口号                                                   |
| port_s      | integer       | M2M 的 mqtt SSL 端口号                                               |
| ws_port     | integer       | websocket 端口号                                                     |
| wss_port    | integer       | websocket SSL 端口号                                                 |
| remark      | string        | 设备备注                                                             |
| is_disabled | boolean       | 是否注销                                                             |
| type        | string        | 设备类型，单品设备:normal,中控设备:center_control,中控子设备:sub_dev |
| dev_alias   | string        | 设备别名                                                             |
| dev_label   | Array[string] | 设备标签列表，目前用于语音 API 批量设备控制                          |
| role        | string        | 绑定角色， 首绑用户:special,拥有者:owner,访客:guest,普通用户:normal  |

返回例子

```json
{
  "remark": "",
  "ws_port": 8080,
  "did": "gKufzxZwYeyd3Skbsb6mzz",
  "port_s": 8883,
  "is_disabled": false,
  "host": "m2m.gizwits.com",
  "product_key": "4214bf2d79694a259232431b6f2ef46a",
  "port": 1883,
  "mac": "accf2350d446",
  "role": "guest",
  "is_online": false,
  "passcode": "JHHOOIWJBY",
  "wss_port": 8880
}
```



## 获取设备的通信日志和上下线记录

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备远程监控/get_app_devices_did_raw_data)

入参的类型（type）
1. 通信日志查询, type 字段为 cmd
2. 上下线记录查询, type 字段为 online

返回结果（type）
meta:
1. 通信日志查询, type 字段为 cmd
2. 上下线记录查询, type 字段为 online

objects:
1. 通信数据查询返回数据字段的 type 字段为 app2dev(app 到设备的通信), dev2app(设备到 app 的通信)
2. 上下线查询返回数据的 type 字段为 dev_online(上线), dev_re_online(完成离线流程前再次登陆), dev_offline(离线)

结束时间戳end_time
1. 必须小于等于当前系统时间戳
2. 必须大于开始时间戳.
3. 终止时间戳与开始时间戳之差必须小于48小时

请求地址及方式

      GET
      https://api.gizwits.com/app/devices/{did}/raw_data?type={type}&start_time={start_time}&end_time={end_time}

请求参数

| 参数                     | 类型    | 必填 | 参数类型 | 描述                                                 |
|:------------------------ |:------- |:----:|:-------- |:---------------------------------------------------- |
| X-Gizwits-Application-Id | string  |  是  | header   | appid                                                |
| X-Gizwits-User-token     | string  |  是  | header   | 用户token                                            |
| did                      | string  |  是  | path     | 设备ID                                               |
| type                     | string  |  是  | query    | 类型，cmd:通信日志；online：上下线记录               |
| start_time               | integer |  是  | query    | 开始时间戳，单位秒                                   |
| end_time                 | integer |  是  | query    | 结束时间戳，单位秒                                   |
| skip                     | integer |  否  | query    | 跳过的条数，跳过条目数+返回条目数必须<=5000, 默认为0 |
| limit query              | integer |  否  | query    | 返回的条数，需<=1000,默认为20                        |
| sort                     | string  |  否  | query    | 排序方式，dese：降序；ase：升序。默认降序            |


响应参数

| 参数        | 类型    | 描述                                                                        |
| ----------- | ------- | --------------------------------------------------------------------------- |
| sort        | string  | 排序方式，dese：降序；ase：升序                                             |
| limit       | integer | 返回的条数                                                                  |
| end_time    | integer | 结束时间戳                                                                  |
| did         | string  | 设备ID                                                                      |
| skip        | integer | 跳过的条数                                                                  |
| start_time  | integer | 开始时间戳                                                                  |
| total       | integer | 查询结果的条数                                                              |
| type        | string  | meta的type。查询类型，cmd:通信日志；online：上下线记录                      |
| type        | string  | objects的type。 类型：app2dev：app 到设备的通信；dev2app：设备到 app 的通信；dev_online：上线；dev_re_online：完成离线流程前再次登陆；dev_offline：离线|
| ip          | string  | 上报数据端的IP地址                                                                            |
| payload_bin | string  | 通讯数据                                                                            |
| timestamp   | integer | 上报数据的时间                                                                            |
| source      | string  | app2dev时，才有此字段触发端的类型，d3：有D3规则引擎触发；client：客户端上报数据|
| uid         | string  | app2dev时，才有此字段。用户的User ID                                                                            |
| appid       | string  | app2dev时，才有此字段。APP ID                                                                              |

返回例子

```json
{
  "meta": {
    "sort": "desc",
    "limit": 20,
    "end_time": 1505871861,
    "did": "WCWGkbS4Ttynzwx9brzpEa",
    "skip": 0,
    "start_time": 1505750399,
    "total": 17,
    "type": "cmd"
  },
  "objects": [
    {
    "ip": "10.104.109.219",
    "payload_bin": "000000030b0000910400000010000000",
    "type": "dev2app",
    "timestamp": 1505871342.875
    },
    {
      "ip": "127.0.0.1",
      "payload_bin": "0000000309000090010200000010",
      "type": "app2dev",
      "timestamp": 1505871743.564,
      "source": "d3"
    },
    {
      "uid": "c0a85d0773e24f15a6853f3148c80a33",
      "timestamp": 1505871743.2,
      "ip": "183.233.131.216",
      "payload_bin": "000000030400009002",
      "source": "client",
      "appid": "17f5eabb5782434da65fffdc87e605bf",
      "type": "app2dev"
    }
  ]
}
```

## 远程控制设备

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备远程监控/post_app_control_did)

通过云端对设备进行控制

#### 原始指令(raw):
发送 0090 命令，只需要包括 payload 即可;格式为二进制转 byte 数组，如要发送 payload 为 010203，就是
```json
{
  "raw": [1, 2, 3]
}
```

#### 数据点方式(attrs):
设备产品必须定义了数据点，比如要设置扩展类型的字段 binary 为1234567，需要补齐扩展型长度：
```json
{
  "attrs": {
    "binary": "1234567000"
  }
}
```


请求地址及方式

      POST
      https://api.gizwits.com/app/control/{did}

请求参数

| 参数                     | 类型           | 必填 | 参数类型 | 描述      |
|:------------------------ |:-------------- |:----:|:-------- |:--------- |
| X-Gizwits-Application-Id | string         |  是  | header   | appid     |
| X-Gizwits-User-token     | string         |  是  | header   | 用户token |
| did                      | string         |  是  | path     | 设备ID    |
| raw                      | Array[integer] |  否  | body     |           |
| attrs                    | object         |  否  | body     |           |

注：body的参数最少填写输入一个

响应参数

    无

# 设备分享

开启设备分享功能后，[“绑定角色”](#绑定管理)就会有 Owner 和 Guest。

#### 设备分享的主要有两种方式：
- 普通设备分享
- 通过二维码分享设备

#### 分享使用场景
#### 普通设备分享
- Owner 选择一个要分享的设备，调用[创建分享邀请](#创建分享邀请)接口创建分享邀请
- Owner 和 Guest 都将收到一条设备分享消息
- 被分享的用户调用[查询分享邀请](#查询分享列表)接口，查询分享给自己的邀请
- 被分享的用户调用[接受分享邀请](#接受/拒绝分享)接口接受邀请，被分享的用户成为 Guest
- Owner 和 Guest 都将收到一条设备接受分享消息

#### 通过二维码分享设备
- Owner 选择一个要分享的设备，调用[创建分享邀请](#创建分享邀请)接口创建分享邀请
- 接口返回字段中的 qr_content 生成二维码信息，Owner 将二维码图片展示给需要分享的用户
- 用户扫描二维码，获取邀请码，调用[查询二维码分享信息](#查询二维码分享信息)接口，查看分享内容
- 再调用[接受二维码分享邀请](#接受二维码分享邀请)接口，接受分享邀请，被分享的用户成为 Guest
- Owner 和 Guest 都将收到一条设备分享消息

#### 取消设备分享
- Owner 调用[取消/收回分享](#取消/收回分享)接口，取消分享出去的邀请取消，及收回已经接受的邀请
- Guest 用户若还没有接受，Owner 将收到一条设备取消分享消息
- Guest 用户对设备的绑定被取消，同时，Owner 和 Guest 都将收到一条设备取消分享消息

#### Owner 权限转移
- Owner 调用[权限转移](#Owner 权限转移)接口，填写需要转移的设备和需要成为owner用户的ID
- 原 Owner 用户解绑设备，原 Guest 用户成为新的 Owner


## 创建分享邀请

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分享/post_app_sharing)

此接口只有设备主账号可以调用

* 如果 type 为普通分享，uid/username/email/phone 四选一，为是被分享者的用户信息；
* 如果 type 为二维码分享，uid、username、email、phone 设置为空，若设置不会生效；
* 普通分享24小时过期，二维码分享15分钟过期；
* 针对二维码分享，客户端收到返回的二维码内容之后，本地生成二维码图片；


请求地址及方式

      POST
      https://api.gizwits.com/app/sharing

请求参数

| 参数                     | 类型    | 必填 | 参数类型 | 描述                                                                                              |
|:------------------------ |:------- |:----:|:-------- |:------------------------------------------------------------------------------------------------- |
| X-Gizwits-Application-Id | string  |  是  | header   | appid                                                                                             |
| X-Gizwits-User-token     | string  |  是  | header   | 用户token                                                                                         |
| type                     | integer |  是  | body     | 分享类型，0：普通分享，1：二维码分享                                               |
| did                      | string  |  否  | body     | 设备ID                                                                                            |
| uid                      | string  |  否  | body     | 普通分享类型，被分享的用户ID                                                                      |
| username                 | string  |  否  | body     | 普通分享类型，被分享的用户名                                                                      |
| email                    | string  |  否  | body     | 普通分享类型，被分享的用户邮箱地址                                                                |
| phone                    | string  |  否  | body     | 普通分享类型，被分享的用户手机号码                                                                |
| duration                 | integer |  否  | body     | 持续分享时间，guest 接受分享之后可使用设备的时长，单位：分钟。最小时长 1 分钟，最大时长 1440 分钟 |


响应参数

| 参数       | 类型    | 描述                               |
| ---------- | ------- | ---------------------------------- |
| id         | string  | 分享记录id，针对普通分享才有       |
| qr_content | integer | 二维码图片内容，针对二维码分享才有 |


返回例子

```json
{
    "qr_content": "type=share&code=60a6cacabe4046f4aa25ac1f79d81a4f",
    "id": null
}
```


## 查询分享邀请

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分享/get_app_sharing)

请求地址及方式

      GET
      https://api.gizwits.com/app/sharing?sharing_type={sharing_type}

请求参数

| 参数                     | 类型    | 必填 | 参数类型 | 描述                                                                       |
|:------------------------ |:------- |:----:|:-------- |:-------------------------------------------------------------------------- |
| X-Gizwits-Application-Id | string  |  是  | header   | appid                                                                      |
| X-Gizwits-User-token     | string  |  是  | header   | 用户token                                                                  |
| sharing_type             | integer |  是  | query    | 分享类型，0：我分享的设备，1：分享给我的设备                               |
| status                   | string  |  否  | query    | 分享状态，0：未接受分享，1：已接受分享，2：拒绝分享，3：取消分享 |
| did                      | string  |  否  | query    | 指定的设备did，只有owner用户可查询指定did的分享信息                        |
| limit                    | integer |  否  | query    | 返回的条数，默认20                                                                 |
| skip                     | integer |  否  | query    | 跳过的条数，默认0                                                                 |


响应参数

| 参数         | 类型    | 描述                                                                |
| ------------ | ------- | ------------------------------------------------------------------- |
| total        | integer | 总条数                                                              |
| limit        | integer | 返回的条数                                                          |
| skip         | integer | 跳过的条数                                                          |
| previous     | string  | 上一页的请求地址                                                    |
| next         | string  | 下一页的请求地址                                                    |
| id           | integer | 分享记录id                                                          |
| type         | integer | 分享类型，0：普通分享，1：二维码分享                                |
| uid          | string  | 用户ID                                                              |
| username     | string  | 用户名,中间4个字母*替代                                             |
| user_alias   | string  | 用户别名                                                            |
| email        | string  | 用户邮箱地址,@前面4个字符*替代                                      |
| phone        | string  | 用户手机号码,中间4个数字*替代                                       |
| did          | string  | 设备id                                                              |
| product_name | string  | 产品名称                                                            |
| dev_alias    | string  | 设备别名                                                            |
| status       | integer | 当前分享状态 0：未接受分享，1：已接受分享，2：拒绝分享，3：取消分享 |
| created_at   | string  | 创建分享时间 （UTC时间）                                            |
| updated_at   | string  | 分享状态更新时间 （UTC时间）                                        |
| expired_at   | string  | 分享超时时间 （UTC时间）                                            |

注：
* 若 sharing_type 为 0，表示以 Owner 身份查询自己发出的分享邀请，返回结果中用户信息为 Guest 的信息
* 若 sharing_type 为 1，表示以 Guest 身份查询收到的分享邀请，返回结果中的用户信息为 Owner 的信息

返回例子

```json
{
  "meta": {
    "previous": null,
    "skip": 0,
    "total": 1,
    "limit": 20,
    "next": null
  },
  "objects": [
    {
      "status": 0,
      "username": "G****s",
      "uid": "f082f4e235974cfeb6a1b2346024f47e",
      "did": "gKufzxZwYeyd3Skbsb6mza",
      "created_at": "2017-07-21T09:46:56Z",
      "updated_at": "2017-07-21T09:46:56Z",
      "email": "G****s@gizwits.com",
      "phone": null,
      "dev_alias": "设备别名",
      "id": 10411,
      "user_alias": "gizwits",
      "type": 0,
      "product_name": "微信宠物屋",
      "expired_at": "2017-07-22T09:46:56Z"
    }
  ]
}
```

## 取消/收回分享

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分享/delete_app_sharing_id)

二维码分享的设备无法收回

请求地址及方式

      DELETE
      https://api.gizwits.com/app/sharing/{id}

请求参数

| 参数                     | 类型    | 必填 | 参数类型 | 描述       |
|:------------------------ |:------- |:----:|:-------- |:---------- |
| X-Gizwits-Application-Id | string  |  是  | header   | appid      |
| X-Gizwits-User-token     | string  |  是  | header   | 用户token  |
| id                       | integer |  是  | path         | 分享记录id |


响应参数

| 参数 | 类型    | 描述       |
| ---- | ------- | ---------- |
| id   | integer | 分享记录id |


返回例子

```json
{
    "id": 10471
}
```

## 接受/拒绝分享

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分享/put_app_sharing_id)

二维码分享的设备无法收回

请求地址及方式

      PUT
      https://api.gizwits.com/app/sharing/{id}

请求参数

| 参数                     | 类型    | 必填 | 参数类型 | 描述                                    |
|:------------------------ |:------- |:----:|:-------- |:--------------------------------------- |
| X-Gizwits-Application-Id | string  |  是  | header   | appid                                   |
| X-Gizwits-User-token     | string  |  是  | header   | 用户token                               |
| id                       | integer |  是  | path     | 分享记录id                              |
| status                   | integer |  是  | query    | 接受/拒绝分享，1：接受分享，2：拒绝分享 |


响应参数

| 参数 | 类型    | 描述       |
| ---- | ------- | ---------- |
| id   | integer | 分享记录id |


返回例子

```json
{
    "id": 10471
}
```

## 获取二维码分享信息

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分享/get_app_sharing)

设备拥有者 owner 无法使用此接口

请求地址及方式

      GET
      https://api.gizwits.com/app/sharing/code/{code}

请求参数

| 参数                     | 类型    | 必填 | 参数类型 | 描述                   |
|:------------------------ |:------- |:----:|:-------- |:---------------------- |
| X-Gizwits-Application-Id | string  |  是  | header   | appid                  |
| X-Gizwits-User-token     | string  |  是  | header   | 用户token              |
| code                     | integer |  是  | path     | 二维码分享的qr_content |


响应参数

| 参数         | 类型   | 描述                                   |
| ------------ | ------ | -------------------------------------- |
| owner        | string | 设备拥有者信息，手机号/邮箱/用户名/uid |
| product_name | string | 产品名称                               |
| dev_alias    | string | 设备别名                               |
| expired_at   | string | 分享超时时间（UTC时间）                |


返回例子

```json
{
  "owner": "G****s",
  "product_name": "微信宠物屋",
  "dev_alias": "设备别名",
  "expired_at": "2017-08-21T12:22:58Z"
}
```


## 接受二维码分享邀请

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分享/post_app_sharing_code_code)

设备拥有者 owner 无法使用此接口

请求地址及方式

      POST
      https://api.gizwits.com/app/sharing/code/{code}

请求参数

| 参数                     | 类型    | 必填 | 参数类型 | 描述                   |
|:------------------------ |:------- |:----:|:-------- |:---------------------- |
| X-Gizwits-Application-Id | string  |  是  | header   | appid                  |
| X-Gizwits-User-token     | string  |  是  | header   | 用户token              |
| code                     | integer |  是  | path     | 二维码分享的qr_content |


响应参数

    无



## 修改用户备注信息

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分享/put_app_sharing_id_alias)


请求地址及方式

      PUT
      https://api.gizwits.com/app/sharing/{id}/alias?user_alias={user_alias}

请求参数

| 参数                     | 类型    | 必填 | 参数类型 | 描述       |
|:------------------------ |:------- |:----:|:-------- |:---------- |
| X-Gizwits-Application-Id | string  |  是  | header   | appid      |
| X-Gizwits-User-token     | string  |  是  | header   | 用户token  |
| id                       | integer |  是  | path     | 分享记录id |
| user_alias               | string  |  是  | query    |            |


响应参数

    无


## owner 权限转移

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分享/post_app_sharing_did_transfer)


请求地址及方式

      POST
      https://api.gizwits.com/app/sharing/1/transfer?uid=1

请求参数

| 参数                     | 类型   | 必填 | 参数类型 | 描述                  |
|:------------------------ |:------ |:----:|:-------- |:--------------------- |
| X-Gizwits-Application-Id | string |  是  | header   | appid                 |
| X-Gizwits-User-token     | string |  是  | header   | 用户token             |
| did                      | string |  是  |          | 设备ID                |
| uid                      | string |  是  | query    | 需要成为owner用户的ID |


响应参数

    无




# 设备分组

#### 设备分组常用场景：
1、将多个设备归类到某一个物理空间，如：房间、客厅。方便管理
* 首先调用[创建分组](#创建分组)接口创建分组，输入分组名称
* 创建成功后对分组内的设备进行批量添加/删除，调用[将设备列表添加到分组](#将设备列表添加到分组)接口和[将设备列表从分组移除](#将设备列表从分组移除)接口
* 通过[查询分组的设备信息](#查询分组的设备信息)接口可以查看分组下的全部设备

2、对相同产品的多个设备进行统一控制，如：走廊的全部灯开关
* 首先调用[创建分组](#创建分组)接口创建分组，输入分组名称和产品PK
* 创建成功后对分组内的设备进行批量添加/删除，调用[将设备列表添加到分组](#将设备列表添加到分组)接口和[将设备列表从分组移除](#将设备列表从分组移除)接口
* 通过[对设备分组内的设备统一控制](#对设备分组内的设备统一控制)接口对设备发送统一的控制指令，从而进行对设备的批量控制



## 查询用户所有的分组

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分组/get_app_group)

请求地址及方式

      GET
      https://api.gizwits.com/app/group

请求参数

| 参数                     | 类型    | 必填 | 参数类型 | 描述                   |
|:------------------------ |:------- |:----:|:-------- |:---------------------- |
| X-Gizwits-Application-Id | string  |  是  | header   | appid                  |
| X-Gizwits-User-token     | string  |  是  | header   | 用户token              |

响应参数

| 参数         | 类型   | 描述                                 |
| ------------ | ------ | ------------------------------------ |
| created_at   | string | 设备分组创建时间（UTC 时间）         |
| updated_at   | string | 设备分组更新时间（UTC 时间）         |
| product_key  | string | 产品 product_key，单PK的分组才会有值 |
| group_name   | string | 设备分组名称                         |
| verbose_name | string | 产品名称，单PK的分组才会有值         |
| id           | string | 设备分组 id                          |

返回例子

```json
[
  {
    "created_at": "2017-09-22T09:57:44Z",
    "updated_at": "2017-09-22T09:57:44Z",
    "product_key": "4214b12d79694a259232431b6f2ef46a",
    "group_name": "分组名称1",
    "verbose_name": "微信宠物屋",
    "id": "59c4de98dc348f001a08feba"
  },
  {
    "created_at": "2017-09-22T09:58:18Z",
    "updated_at": "2017-09-22T09:58:18Z",
    "product_key": "",
    "group_name": "分组名称2",
    "verbose_name": "",
    "id": "59c4deba8c7d50001ba06df3"
  }
]
```

## 创建分组

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分组/post_app_group)

请求地址及方式

      POST
      https://api.gizwits.com/app/group

请求参数

| 参数                     | 类型   | 必填 | 参数类型 | 描述                               |
|:------------------------ |:------ |:----:|:-------- |:---------------------------------- |
| X-Gizwits-Application-Id | string |  是  | header   | appid                              |
| X-Gizwits-User-token     | string |  是  | header   | 用户token                          |
| product_key              | string |  否  | body     | 产品PK，对单个pk分组需要输入此参数 |
| group_name               | string |  是  | body     | 设备分组名称                       |

响应参数

| 参数 | 类型   | 描述        |
| ---- | ------ | ----------- |
| id   | string | 设备分组 id |

返回例子

```json
{
  "id": "59c4deba8c7d50001ba06df3"
}
```

## 删除设备分组
[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分组/delete_app_group_id)

请求地址及方式

      DELETE
      https://api.gizwits.com/app/group/{id}

请求参数

| 参数                     | 类型   | 必填 | 参数类型 | 描述        |
|:------------------------ |:------ |:----:|:-------- |:----------- |
| X-Gizwits-Application-Id | string |  是  | header   | appid       |
| X-Gizwits-User-token     | string |  是  | header   | 用户token   |
| id                       | string |  是  | path     | 设备分组 id |

响应参数

    无

## 修改分组信息

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分组/delete_app_group_id)

请求地址及方式

      PUT
      https://api.gizwits.com/app/group/{id}

请求参数

| 参数                     | 类型   | 必填 | 参数类型 | 描述         |
|:------------------------ |:------ |:----:|:-------- |:------------ |
| X-Gizwits-Application-Id | string |  是  | header   | appid        |
| X-Gizwits-User-token     | string |  是  | header   | 用户token    |
| id                       | string |  是  | path     | 设备分组 id  |
| group_name               | string |  是  | body     | 设备分组名称 |

响应参数

    无



## 查询分组的设备信息

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分组/get_app_group_id_devices)

请求地址及方式

      GET
      https://api.gizwits.com/app/group/{id}/devices

请求参数

| 参数                     | 类型   | 必填 | 参数类型 | 描述        |
|:------------------------ |:------ |:----:|:-------- |:----------- |
| X-Gizwits-Application-Id | string |  是  | header   | appid       |
| X-Gizwits-User-token     | string |  是  | header   | 用户token   |
| id                       | string |  是  | path     | 设备分组 ID |


响应参数

| 参数         | 类型   | 描述                                                                       |
| ------------ | ------ | -------------------------------------------------------------------------- |
| did          | string | 该分组下的设备ID                                                           |
| type         | string | 设备类型：普通设备：noramal；中控设备：center_control；中控子设备：sub_dev |
| verbose_name | string | 产品名称，单PK的分组才会有值                                               |
| dev_alias    | string | 设备别名                                                                   |
| product_key  | string | 产品 product_key，单PK的分组才会有值                                       |

返回例子

```json
[
  {
    "did": "WCWGkbS4Ttynzwx9brzpEa",
    "type": "normal",
    "verbose_name": "微信宠物屋",
    "dev_alias": "设备别名",
    "product_key": "4234bf2d79694a259232431b6f2ef46a"
  }
]
```


## 将设备列表添加到分组

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分组/post_app_group)

请求地址及方式

      POST
      https://api.gizwits.com/app/group/{id}/devices?show_detail={show_detail}

请求参数

| 参数                     | 类型    | 必填 | 参数类型 | 描述                                                                                         |
|:------------------------ |:------- |:----:|:-------- |:-------------------------------------------------------------------------------------------- |
| X-Gizwits-Application-Id | string  |  是  | header   | appid                                                                                        |
| X-Gizwits-User-token     | string  |  是  | header   | 用户token                                                                                    |
| id                       | string  |  是  | path     | 设备分组 ID                                                                                  |
| show_detail              | integer |  否  | query    | 返回错误信息，1：添加失败的did返回详细错误信息，0(默认值)：添加失败的did，不返回详细错误信息 |
| dids                     | Array   |  是  | body     | 需要添加到分组的设备ID数组                                                                     |


响应参数

| 参数          | 类型    | 描述                                           |
| ------------- | ------- | ---------------------------------------------- |
| failed        | Array   | 添加成功的设备ID 数组                          |
| detail        | Array   | 添加失败原因，show_detail为1时候才会返回此信息 |
| success       | Array   | 添加失败的设备ID 数组                          |
| did           | string  | 添加的失败的设备ID                             |
| error_message | string  | 失败错误信息                                   |
| error_code    | integer | 失败错误码                                     |
| detail_msg    | string  | 详细错误信息                                   |

返回例子

```json
{
  "failed": [
      "WCWGkbS4Ttynz123czpEa"
    ],
  "detail": [
      {
        "did": "WCWGkbS123cynzwxrzpEa",
        "error_message": "device not found!",
        "error_code": 9014,
        "detail_msg": null
      }
    ],
  "success": [
    "XD3GkbS21tynzwx9brzpEa"
  ]
}
```



## 将设备列表从分组移除

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分组/delete_app_group_id_devices)

请求地址及方式

      DELETE
      https://api.gizwits.com/app/group/{id}/devices

请求参数

| 参数                     | 类型   | 必填 | 参数类型 | 描述                     |
|:------------------------ |:------ |:----:|:-------- |:------------------------ |
| X-Gizwits-Application-Id | string |  是  | header   | appid                    |
| X-Gizwits-User-token     | string |  是  | header   | 用户token                |
| id                       | string |  是  | path     | 设备分组 ID              |
| dids                     | Array  |  是  | body     | 需要移出分组的设备ID数组 |


响应参数

| 参数    | 类型   | 描述                  |
| ------- | ------ | --------------------- |
| failed  | Array  | 添加成功的设备ID 数组 |
| success | Array  | 添加失败的设备ID 数组 |
| did     | string | 添加的失败的设备ID    |

返回例子

```json
{
  "failed": [],
  "success": [
    "WCWGkb234tynzwx9brzpEa"
  ]
}
```


## 对设备分组内的设备统一控制

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分组/post_app_group_id_control)

通过云端对分组内的所有设备进行控制，该接口只能统一控制单PK分组的设备。

#### 原始指令(raw):
发送 0090 命令，只需要包括 payload 即可;格式为二进制转 byte 数组，如要发送 payload 为 010203，就是
```json
{
  "raw": [1, 2, 3]
}
```

#### 数据点方式(attrs):
设备产品必须定义了数据点，比如要设置扩展类型的字段 binary 为1234567，需要补齐扩展型长度：
```json
{
  "attrs": {
    "binary": "1234567000"
  }
}
```

请求地址及方式

      POST
      https://api.gizwits.com/app/group/{id}/control

请求参数

| 参数                     | 类型           | 必填 | 参数类型 | 描述        |
|:------------------------ |:-------------- |:----:|:-------- |:----------- |
| X-Gizwits-Application-Id | string         |  是  | header   | appid       |
| X-Gizwits-User-token     | string         |  是  | header   | 用户token   |
| id                       | string         |  是  | path     | 设备分组 ID |
| raw                      | Array[integer] |  否  | body     |             |
| attrs                    | object         |  否  | body     |             |

响应参数

| 参数   | 类型    | 描述                                  |
| ------ | ------- | ------------------------------------- |
| did    | string  | 分组下的设备ID                        |
| result | boolean | 是否控制成功，true：成功；false：失败 |

返回例子

```json
[
  {
    "did": "WCWGkbS4Tty123x9brzpEa",
    "result": true
  },
  {
    "did": "gKufzxZw43dd3Skbsb6mzz",
    "result": false
  }
]
```









# 设备联动

创建设备联动的规则，实现一个或多个设备的状态变化时，自动控制一个或多个设备的状态改变。

联动的设备需要绑定同一个用户，不同产品下的设备需要先进行产品关联。

联动规则创建后，可以随时进行修改，或者删除。

## 创建联动规则

- 用户与参加联动的设备进行绑定
- 用户调用[获取可用数据点信息](http://swagger.gizwits.com/doc/index/openapi_apps#!/设备联动/get_app_rules_params)接口查询可用的数据点标识名
- 用户选择一个设备作为触发规则的设备，调用[创建设备联动规则](http://swagger.gizwits.com/doc/index/openapi_apps#!/设备联动/post_app_rules)接口创建联动规则
- 当满足联动规则设定的条件时，规则中设定的触发动作便会被触发

## 查询联动规则
- 用户调用[查询设备联动规则](http://swagger.gizwits.com/doc/index/openapi_apps#!/设备联动/get_app_rules)查询自己创建的联动规则

## 修改联动规则
- 用户调用[查询设备联动规则](http://swagger.gizwits.com/doc/index/openapi_apps#!/设备联动/get_app_rules)查询自己创建的联动规则
- 用户选择一个需要修改的规则id，调用[修改设备联动规则](http://swagger.gizwits.com/doc/index/openapi_apps#!/设备联动/put_app_rules_rule_id)接口修改联动规则
- 当满足修改后的联动规则设定的条件时，规则中设定的触发动作便会被触发

## 删除联动规则
- 用户调用[查询设备联动规则](http://swagger.gizwits.com/doc/index/openapi_apps#!/设备联动/get_app_rules)查询自己创建的联动规则
- 用户选择一个需要删除的规则id，调用[删除设备联动规则](http://swagger.gizwits.com/doc/index/openapi_apps#!/设备联动/delete_app_rules_rule_id)接口删除联动规则




| [get_app_rules_params](#查询规则可用变量) | 查询规则可用变量 |
| ----------------------------------------- | ---------------- |
| [get_app_rules](#查询联动规则列表)        | 查询联动规则列表 |
| [post_app_rules](#创建联动规则)           | 创建联动规则     |
| [delete_app_rules](#删除联动规则)         | 删除联动规则     |
| [put_app_rules](#修改联动规则)            | 修改联动规则     |
|                                           |                  |
|                                           |                  |
|                                           |                  |

# 定时任务接口

## 创建定时任务

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/定时任务管理/post_app_devices_did_scheduler)

定时任务分为如下几类：

- 一次性定时任务
- 按星期重复定时任务
- 按天重复定时任务

每个定时任务都可以设置使能状态，只有开启状态的定时任务才会被执行。

重复执行的定时任务需要设置开始和结束日志。

一个定时任务可以一次性设置多个数据点。

## 获取定时任务

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/定时任务管理/get_app_devices_did_scheduler)

## 修改定时任务

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/定时任务管理/put_app_devices_did_scheduler_id)

## 删除定时任务

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/定时任务管理/delete_app_devices_did_scheduler_id)

# 高级数据接口

## 获取设备聚合数据

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/高级数据接口//get_app_devdata_did_agg_data)

该接口可以对设备上报的数值型数据点数据进行聚合，可以按小时/天/周/月对数据点数据进行求和/平均值/最大值/最小值进行聚合。

一次可以获取多个数据点的聚合数据。

要使用该接口，必须先请求开通该接口。请求通过的之后上报的数据才会进行聚合运算。


# 系统信息

## <span id = "get_status">查询 Open API 版本</span>

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/系统信息/get_status)

请求地址及方式

      GET
      https://api.gizwits.com/status

请求参数

| 参数                     | 类型    | 必填 | 参数类型 | 描述                           |
|:------------------------ |:------- |:----:|:-------- |:------------------------------ |
| X-Gizwits-Application-Id | string  |  是  | header   | appid                          |


响应参数

| 参数    | 类型   | 描述            |
|:------- |:------ |:--------------- |
| version | string | open API 版本号 |


返回例子

```json
{
  "status": {
    "version": "2.15.1"
  }
}

```


## <span id = "get_errors">获取 Open API 所有的错误码</span>

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/系统信息/get_errors)


请求地址及方式

      GET
      https://api.gizwits.com/errors


请求参数

| 参数                     | 类型   | 必填 | 参数类型 | 描述  |
|:------------------------ |:------ |:----:|:-------- |:----- |
| X-Gizwits-Application-Id | string |  是  | header   | appid |


响应参数

| 参数          | 类型   | 描述     |
|:------------- |:------ |:-------- |
| status        | string | 响应码   |
| error_code    | string | 错误码   |
| error_message | string | 错误信息 |


返回例子

```json
[
  {
    "status": 404,
    "error_message": "scene not found!",
    "error_code": 9220
  },
  {
    "status": 400,
    "error_message": "the scene does not belong to you!",
    "error_code": 9221
  }
]

```
详细错误信息可查看下表[Open API 错误码表](#error_message)


## <span id = "error_message">附录：Open API 错误码表</span>

| 错误码 | 错误类别                                      | 描述                                                    |
|:------ |:--------------------------------------------- | ------------------------------------------------------- |
| 9001   | GIZ_OPENAPI_MAC_ALREADY_REGISTERED            | mac already registered!                                 |
| 9002   | GIZ_OPENAPI_PRODUCT_KEY_INVALID               | product_key invalid                                     |
| 9003   | GIZ_OPENAPI_APPID_INVALID                     | appid invalid                                           |
| 9004   | GIZ_OPENAPI_TOKEN_INVALID                     | token invalid                                           |
| 9005   | GIZ_OPENAPI_USER_NOT_EXIST                    | user not exist                                          |
| 9006   | GIZ_OPENAPI_TOKEN_EXPIRED                     | token expired                                           |
| 9007   | GIZ_OPENAPI_M2M_ID_INVALID                    | m2m_id invalid                                          |
| 9008   | GIZ_OPENAPI_SERVER_ERROR                      | server error                                            |
| 9009   | GIZ_OPENAPI_CODE_EXPIRED                      | code expired                                            |
| 9010   | GIZ_OPENAPI_CODE_INVALID                      | code invalid                                            |
| 9011   | GIZ_OPENAPI_SANDBOX_SCALE_QUOTA_EXHAUSTED     | sandbox scale quota exhausted!                          |
| 9012   | GIZ_OPENAPI_PRODUCTION_SCALE_QUOTA_EXHAUSTED  | production scale quota exhausted!                       |
| 9013   | GIZ_OPENAPI_PRODUCT_HAS_NO_REQUEST_SCALE      | product has no request scale!                           |
| 9014   | GIZ_OPENAPI_DEVICE_NOT_FOUND                  | device not found!                                       |
| 9015   | GIZ_OPENAPI_FORM_INVALID                      | form invalid!                                           |
| 9016   | GIZ_OPENAPI_DID_PASSCODE_INVALID              | did or passcode invalid!                                |
| 9017   | GIZ_OPENAPI_DEVICE_NOT_BOUND                  | device not bound!                                       |
| 9018   | GIZ_OPENAPI_PHONE_UNAVALIABLE                 | phone unavailable!                                      |
| 9019   | GIZ_OPENAPI_USERNAME_UNAVALIABLE              | username unavailable!                                   |
| 9020   | GIZ_OPENAPI_USERNAME_PASSWORD_ERROR           | username or password error!                             |
| 9021   | GIZ_OPENAPI_SEND_COMMAND_FAILED               | send command failed!                                    |
| 9022   | GIZ_OPENAPI_EMAIL_UNAVALIABLE                 | email unavailable!                                      |
| 9023   | GIZ_OPENAPI_DEVICE_DISABLED                   | device is disabled!                                     |
| 9024   | GIZ_OPENAPI_FAILED_NOTIFY_M2M                 | fail to notify m2m!                                     |
| 9025   | GIZ_OPENAPI_ATTR_INVALID                      | attr invalid!                                           |
| 9026   | GIZ_OPENAPI_USER_INVALID                      | user invalid!                                           |
| 9027   | GIZ_OPENAPI_FIRMWARE_NOT_FOUND                | firmware not found!                                     |
| 9028   | GIZ_OPENAPI_JD_PRODUCT_NOT_FOUND              | JD product info not found!                              |
| 9029   | GIZ_OPENAPI_DATAPOINT_DATA_NOT_FOUND          | datapoint data not found!                               |
| 9030   | GIZ_OPENAPI_SCHEDULER_NOT_FOUND               | scheduler not found!                                    |
| 9031   | GIZ_OPENAPI_QQ_OAUTH_KEY_INVALID              | qq oauth key invalid!                                   |
| 9032   | GIZ_OPENAPI_OTA_SERVICE_OK_BUT_IN_IDLE        | ota upgrade service OK, but in idle or disable!         |
| 9033   | GIZ_OPENAPI_BT_FIRMWARE_UNVERIFIED            | bt firmware unverified,except verify device!            |
| 9034   | GIZ_OPENAPI_BT_FIRMWARE_NOTHING_TO_UPGRADE    | bt firmware is OK, but nothing to upgrade!              |
| 9035   | GIZ_OPENAPI_SAVE_KAIROSDB_ERROR               | Save kairosdb error!                                    |
| 9036   | GIZ_OPENAPI_EVENT_NOT_DEFINED                 | event not defined!                                      |
| 9037   | GIZ_OPENAPI_SEND_SMS_FAILED                   | send sms failed!                                        |
| 9038   | GIZ_OPENAPI_APPLICATION_AUTH_INVALID          | X-Gizwits-Application-Auth invalid!                     |
| 9039   | GIZ_OPENAPI_NOT_ALLOWED_CALL_API              | Not allowed to call deprecated API!                     |
| 9040   | GIZ_OPENAPI_BAD_QRCODE_CONTENT                | bad qrcode content!                                     |
| 9041   | GIZ_OPENAPI_REQUEST_THROTTLED                 | request was throttled                                   |
| 9042   | GIZ_OPENAPI_DEVICE_OFFLINE                    | device offline!                                         |
| 9043   | GIZ_OPENAPI_TIMESTAMP_INVALID                 | X-Gizwits-Timestamp invalid!                            |
| 9044   | GIZ_OPENAPI_SIGNATURE_INVALID                 | X-Gizwits-Signature invalid!                            |
| 9045   | GIZ_OPENAPI_DEPRECATED_API                    | API deprecated!                                         |
| 9046   | GIZ_OPENAPI_REGISTER_IS_BUSY                  | Register already in progress!                           |
| 9080   | GIZ_OPENAPI_CANNOT_SHARE_TO_SELF              | can not share device to self!                           |
| 9081   | GIZ_OPENAPI_ONLY_OWNER_CAN_SHARE              | guest or normal user can not share device!              |
| 9082   | GIZ_OPENAPI_NOT_FOUND_GUEST                   | guest user not found!                                   |
| 9083   | GIZ_OPENAPI_GUEST_ALREADY_BOUND               | guest user alread bound!                                |
| 9084   | GIZ_OPENAPI_NOT_FOUND_SHARING_INFO            | sharing record not found!                               |
| 9085   | GIZ_OPENAPI_NOT_FOUND_THE_MESSAGE             | message record not found!                               |
| 9087   | GIZ_OPENAPI_SHARING_IS_WAITING_FOR_ACCEPT     | sharing alread created,waiting for the guest to accept! |
| 9088   | GIZ_OPENAPI_SHARING_IS_EXPIRED                | sharing record expired!                                 |
| 9089   | GIZ_OPENAPI_SHARING_IS_COMPLETED              | sharing record status is not unaccept!                  |
| 9090   | GIZ_OPENAPI_INVALID_SHARING_BECAUSE_UNBINDING | owner binding disabled!                                 |
| 9092   | GIZ_OPENAPI_ONLY_OWNER_CAN_BIND               | owner exist, guest can not bind!                        |
| 9093   | GIZ_OPENAPI_ONLY_OWNER_CAN_OPERATE            | permission denied, you are not owner!                   |
| 9094   | GIZ_OPENAPI_SHARING_ALREADY_CANCELLED         | sharing already canceled!                               |
| 9095   | GIZ_OPENAPI_OWNER_CANNOT_UNBIND_SELF          | can not unbind self!                                    |
| 9096   | GIZ_OPENAPI_ONLY_GUEST_CAN_CHECK_QRCODE       | permission denied, you are not guest!                   |
| 9098   | GIZ_OPENAPI_MESSAGE_ALREADY_DELETED           | notify delele binding failed!                           |
| 9099   | GIZ_OPENAPI_BINDING_NOTIFY_FAILED             | notify delele binding failed!                           |
| 9100   | GIZ_OPENAPI_ONLY_SELF_CAN_MODIFY_ALIAS        | permission denied, you are not owner or guest!          |
| 9101   | GIZ_OPENAPI_ONLY_RECEIVER_CAN_MARK_MESSAGE    | permission denied, you are not the receiver!            |
| 9999   | GIZ_OPENAPI_RESERVED                          | reserved                                                |
