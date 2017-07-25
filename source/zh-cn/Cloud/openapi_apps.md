title:  Gizwits Open API（新）
---
旧版文档可查看：[Open API旧版文档](/zh-cn/Cloud/OpenAPI.html)
# 简介

## 什么是机智云 Open API ?

机智云是一个开放的物联网设备平台，它为企业和个人开发者提供设备接入、用户账号管理、用户与设备绑定管理、设备远程监控、定时任务以及设备高级数据等服务。

这些数据都是存储在机智云的数据库中的。那么作为开发者，如何去访问这些数据呢？

Open API 就是机智云对外提供这些数据的访问接口！

## 机智云 Open API 能完成什么功能 ?

根据机智云提供的服务，Open API 提供如下功能:

- 用户管理，比如用户的注册、登录、密码重置等功能
- 消息中心，比如用户读取、删除系统消息等功
- 绑定管理，比如用户与设备的绑定、解绑等功能
- 设备分享，比如用户把自己的绑定设备分享给其他用户，解绑其他用户对自己设备的绑定等
- 设备远程监控，比如获取设备的当前状态、设备上报的原始数据、设备的上下线记录、设备的远程控制等功能
- 定时任务管理，设备定时任务的增删改查等
- 高级数据接口，比如对设备上报的数据按天取最大值、平均值等
- 系统信息，比如查看当前 Open API 版本，获取所有可能的错误列表等

## 如何调用机智云 Open API ?

机智云 Open API 是 RESTful 风格的 HTTP API，您可以使用任何标准的 HTTP 客户端访问机智云 Open API。

各种编程语言一般都有现成的 HTTP 客户端可以使用。

推荐 HTTP 客户端：

- [GUI 客户端 PostMan](https://www.getpostman.com/)
- 命令行客户端 curl

## 机智云 Open API 所需要的头部信息

### X-Gizwits-Application-Id

X-Gizwits-Application-Id 简称 AppID，是一个应用在机智云平台中的唯一标识，所有 OpenAPI 接口都需要传入这个头部参数。

在开发者中心的产品页面中，点击左边栏的"应用配置"菜单，创建一个应用即可获得一个 AppID:

![Get AppID](/assets/zh-cn/cloud/get-appid.png)

### X-Gizwits-User-token

X-Gizwits-User-token 简称 UserToken，它代表着接口调用中的用户上下文。

UserToken 具有有效期，默认为 7 天。

可以通过用户注册或者登录接口获取 UserToken，返回字段中的 token 就是 UserToken，expire_at 表示 UserToken 过期的时间戳：
```
{
  "uid": "29db4f0d806e451a84264ba3da64d9de",
  "token": "86a0ee91548f4971832e371811702316",
  "expire_at": 13894002020
}
```

每次登录可以获取一个新的 UserToken，新旧 UserToken 都可以使用。

因为机智云 Open API 大多数的接口都是与用户相关的，所以一般的接口调用顺序如下：

- 判断本地是否有 UserToken，以及 UserToken 是否过期
- 如果不存在 UserToken 或者 UserToken 过期，调用用户登录接口，获取并保存 UserToken
- 使用 UserToken 调用其它接口

## 如何在线调试机智云 Open API ?

我们提供了在线 API 调试工具，在每个接口描述中，都会给出对应的调试接口链接。

下面以用户登录为例，说明 API 调试工具的使用：

- 点击 [用户登录](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_login) 进入接口调试页面
- 接口右边有个红色叹号，点击后弹出对话框，提示需要输入的头部信息
- 该接口需要输入 X-Gizwits-Application-Id，根据前面的说明获取 AppID 并填入，点击 "Authorize" 进行授权
- 页面自动刷新，并且叹号变成蓝色，表示需要输入的头部信息已填写（已填写并不一定表示值是正确的，如果值错误，会反应在接口返回内容中）
- 在参数输入框中输入参数值（点击参数右边的 Example Value 黄色框框，可以快速输入示例 JSON）
- 点击 "试一下" 按钮，即可完成接口调用
- 接口调用完成，会显示本地调用等效的 curl 语句，请求 URL，响应体，响应码和响应头

# 机智云 Open API 指南

机智云所有接口定义可以在[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps)页面中查看。

下面对各分类接口的典型调用场景进行说明。

## 用户管理

### 用户注册

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_users)

有以下几种方式可以注册用户：

- 匿名注册，通过唯一的 phone_id 创建用户
- 普通用户，通过 username 和 passowrd 创建用户
- 手机用户，通过 phone, password 和 code（短信验证码）创建用户，短信验证码的获取参考下面章节
- 邮箱用户，通过 email 和 password 创建用户
- 第三方登录用户，目前支持 QQ、百度、新浪微博，如使用 QQ 第三方登录，请查阅下面章节

### 使用 QQ 登录

TODO

### 短信验证码

短信验证码的主要用途有：

- 手机号用户注册
- 手机号用户重置密码
- 其他您认为需要短信验证码的敏感操作

获取短信验证码有两种方式，一种不需要图片验证码，一种需要图片验证码，您可以根据实际的应用场景选择两种不同的方法。

#### 不需要图片验证码

- 调用[获取 App Token](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_request_token)接口获取 App Token
- 调用[获取短信验证码](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_sms_code)接口发送短信验证码

#### 需要图片验证码

- 调用[获取 App Token](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_request_token)接口获取 App Token
- 调用[获取图片验证码](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/get_app_verify_codes)接口，返回的 captcha_url 就是图片验证码的 URL，将图片显示给用户
- 调用[校验图片验证码并发送短信](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_verify_codes)接口，发送短信验证码

#### 校验短信验证码

手机号用户注册和重置密码时，您不需要也不能去验证短信验证码，只需要将用户输入的短信验证码传入对应接口，机智云会自动进行校验。

当您将短信验证码用于其他敏感操作校验时，才需要手动校验。调用 [校验短信验证码](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_sms_code) 接口即可完成校验。

短信验证码正确校验后立即失效，默认有效期为 24 小时。

### 用户登录

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_login)

注意：匿名用户和第三方登录用户调用用户注册接口进行登录。

### 修改用户信息

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/put_app_users)

您可以修改以下用户信息：

- 匿名用户转普通/手机/邮箱用户
- 修改密码
- 修改手机号
- 设置用户昵称、性别、生日、地址、备注等信息

### 获取用户信息

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/get_app_users)

该接口可以获取用户详细信息。

### 重置密码

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_reset_password)

手机号用户重置密码需要先获取短信验证码。

## 消息中心

### 获取消息列表

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/消息中心/get_app_messages)

### 标记已读和删除

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/消息中心/put_app_messages_id)

## 绑定管理

### 绑定设备

可以通过一下两种方式绑定设备：

- 通过 product_key 和 MAC 地址绑定设备
- 通过二维码绑定设备，二维码内容为 product_key 和 MAC 加密后的内容，所以本质上和上面一种方式一样

#### 通过 product_key 和 MAC 地址绑定设备

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/绑定管理/post_app_bind_mac)

#### 通过二维码绑定设备

##### 二维码生成

TODO

##### 绑定设备

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/绑定管理/post_app_bind_latest)

把扫描到的二维码内容作为 qr_content 的值入。

### 获取绑定列表

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/绑定管理/get_app_bindings)

### 修改绑定信息

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/绑定管理/put_app_bindings_did)

用户可以对绑定的设备修改别名和备注。

同一个设备被多个用户绑定，每个用户都可以对该设备设置别名和备注，互不冲突。

### 解除绑定

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/绑定管理/delete_app_bindings)

### Owner 查询与设备绑定的所有 Guest 用户

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/绑定管理/get_app_did_bindings)

### Owner 解除 Guest 用户对设备的绑定

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/绑定管理/delete_app_did_bindings)

## 设备分享

第一个绑定设备的用户对设备具有控制权，称为设备 Owner，Owner 可以将设备分享给其他设备。被分享的用户称为 Guest。

Owner 分享设备之后，可以随时取消分享，或者解绑 Guest 对设备的绑定。

Guest 也可以主动解绑设备。

设备分享的主要有两种方式：

- 普通设备分享
- 通过二维码分享设备

### 普通设备分享

- Owner 选择一个要分享的设备，调用[创建分享邀请](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分享/post_app_sharing)接口创建分享邀请
- Guest 将会收到一条设备分享消息
- Guest 调用[查询分享邀请](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分享/get_app_sharing)接口，查询分享给自己的邀请
- Guest 调用[接受分享邀请](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分享/put_app_sharing_id)接口接受邀请
- Owner 和 Guest 都将收到一条设备分享消息

### 通过二维码分享设备

- Owner 选择一个要分享的设备，调用[创建分享邀请](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分享/post_app_sharing)接口创建分享邀请
- 接口返回字段中的 qr_url 表示二维码图片的链接，二维码包含邀请码内容，Owner 将二维码图片展示给 Guest
- Guest 扫描二维码，获取邀请码，调用[根据邀请码查询分享邀请接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分享/get_app_sharing_code_code)接口，查看分享内容
- Guest 调用[扫码接受分享邀请](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分享/post_app_sharing_code_code)接口，接受分享邀请
- Owner 和 Guest 都将收到一条设备分享消息

### Owner 取消设备分享

- Owner 调用[查询分享邀请](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分享/get_app_sharing)接口，查询分享出去的邀请
- Owner 选择一个要取消的分享邀请，调用[取消分享邀请](http://swagger.gizwits.com/doc/index/openapi_apps#/设备分享/delete_app_sharing_id)接口，取消分享
- Guest 用户对设备的绑定被取消，同时，Owner 和 Guest 都将收到一条设备分享消息

## 设备联动

创建设备联动的规则，实现一个或多个设备的状态变化时，自动控制一个或多个设备的状态改变。

联动的设备需要绑定同一个用户，不同产品下的设备需要先进行产品关联。

联动规则创建后，可以随时进行修改，或者删除。

### 创建联动规则

- 用户与参加联动的设备进行绑定
- 用户调用[获取可用数据点信息](http://swagger.gizwits.com/doc/index/openapi_apps#!/设备联动/get_app_rules_params)接口查询可用的数据点标识名
- 用户选择一个设备作为触发规则的设备，调用[创建设备联动规则](http://swagger.gizwits.com/doc/index/openapi_apps#!/设备联动/post_app_rules)接口创建联动规则
- 当满足联动规则设定的条件时，规则中设定的触发动作便会被触发

### 查询联动规则
- 用户调用[查询设备联动规则](http://swagger.gizwits.com/doc/index/openapi_apps#!/设备联动/get_app_rules)查询自己创建的联动规则

### 修改联动规则
- 用户调用[查询设备联动规则](http://swagger.gizwits.com/doc/index/openapi_apps#!/设备联动/get_app_rules)查询自己创建的联动规则
- 用户选择一个需要修改的规则id，调用[修改设备联动规则](http://swagger.gizwits.com/doc/index/openapi_apps#!/设备联动/put_app_rules_rule_id)接口修改联动规则
- 当满足修改后的联动规则设定的条件时，规则中设定的触发动作便会被触发

### 删除联动规则
- 用户调用[查询设备联动规则](http://swagger.gizwits.com/doc/index/openapi_apps#!/设备联动/get_app_rules)查询自己创建的联动规则
- 用户选择一个需要删除的规则id，调用[删除设备联动规则](http://swagger.gizwits.com/doc/index/openapi_apps#!/设备联动/delete_app_rules_rule_id)接口删除联动规则

## 设备远程监控

### 获取设备详情

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备远程监控/get_app_devices_did)

### 获取设备最近一次上报的数据

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备远程监控/get_app_devdata_did_latest)

该接口获取的是 24 小时内，设备最近一次上报的数据点值。

### 获取设备的通信日志和上下线记录

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备远程监控/get_app_devices_did_raw_data)

### 远程控制设备

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/设备远程监控/post_app_control_did)

## 定时任务接口

### 创建定时任务

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/定时任务管理/post_app_devices_did_scheduler)

定时任务分为如下几类：

- 一次性定时任务
- 按星期重复定时任务
- 按天重复定时任务

每个定时任务都可以设置使能状态，只有开启状态的定时任务才会被执行。

重复执行的定时任务需要设置开始和结束日志。

一个定时任务可以一次性设置多个数据点。

### 获取定时任务

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/定时任务管理/get_app_devices_did_scheduler)

### 修改定时任务

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/定时任务管理/put_app_devices_did_scheduler_id)

### 删除定时任务

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/定时任务管理/delete_app_devices_did_scheduler_id)

## 高级数据接口

### 获取设备聚合数据

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/高级数据接口//get_app_devdata_did_agg_data)

该接口可以对设备上报的数值型数据点数据进行聚合，可以按小时/天/周/月对数据点数据进行求和/平均值/最大值/最小值进行聚合。

一次可以获取多个数据点的聚合数据。

要使用该接口，必须先请求开通该接口。请求通过的之后上报的数据才会进行聚合运算。


## 系统信息

### 查询 Open API 版本

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/系统信息/get_status)

### 获取 Open API 所有的错误码

[调试接口](http://swagger.gizwits.com/doc/index/openapi_apps#/系统信息/get_errors)

# 附录：openapi错误码表

|枚举ID|枚举定义|描述
|:--|:--|
|9001|GIZ_OPENAPI_MAC_ALREADY_REGISTERED|mac already registered!
|9002|GIZ_OPENAPI_PRODUCT_KEY_INVALID|product_key invalid
|9003|GIZ_OPENAPI_APPID_INVALID|appid invalid
|9004|GIZ_OPENAPI_TOKEN_INVALID|token invalid
|9005|GIZ_OPENAPI_USER_NOT_EXIST|user not exist
|9006|GIZ_OPENAPI_TOKEN_EXPIRED|token expired
|9007|GIZ_OPENAPI_M2M_ID_INVALID|m2m_id invalid
|9008|GIZ_OPENAPI_SERVER_ERROR|server error
|9009|GIZ_OPENAPI_CODE_EXPIRED|code expired
|9010|GIZ_OPENAPI_CODE_INVALID|code invalid
|9011|GIZ_OPENAPI_SANDBOX_SCALE_QUOTA_EXHAUSTED|sandbox scale quota exhausted!
|9012|GIZ_OPENAPI_PRODUCTION_SCALE_QUOTA_EXHAUSTED|production scale quota exhausted!
|9013|GIZ_OPENAPI_PRODUCT_HAS_NO_REQUEST_SCALE|product has no request scale!
|9014|GIZ_OPENAPI_DEVICE_NOT_FOUND|device not found!
|9015|GIZ_OPENAPI_FORM_INVALID|form invalid!
|9016|GIZ_OPENAPI_DID_PASSCODE_INVALID|did or passcode invalid!
|9017|GIZ_OPENAPI_DEVICE_NOT_BOUND|device not bound!
|9018|GIZ_OPENAPI_PHONE_UNAVALIABLE|phone unavailable!
|9019|GIZ_OPENAPI_USERNAME_UNAVALIABLE|username unavailable!
|9020|GIZ_OPENAPI_USERNAME_PASSWORD_ERROR|username or password error!
|9021|GIZ_OPENAPI_SEND_COMMAND_FAILED|send command failed!
|9022|GIZ_OPENAPI_EMAIL_UNAVALIABLE|email unavailable!
|9023|GIZ_OPENAPI_DEVICE_DISABLED|device is disabled!
|9024|GIZ_OPENAPI_FAILED_NOTIFY_M2M|fail to notify m2m!
|9025|GIZ_OPENAPI_ATTR_INVALID|attr invalid!
|9026|GIZ_OPENAPI_USER_INVALID|user invalid!
|9027|GIZ_OPENAPI_FIRMWARE_NOT_FOUND|firmware not found!
|9028|GIZ_OPENAPI_JD_PRODUCT_NOT_FOUND|JD product info not found!
|9029|GIZ_OPENAPI_DATAPOINT_DATA_NOT_FOUND|datapoint data not found!
|9030|GIZ_OPENAPI_SCHEDULER_NOT_FOUND|scheduler not found!
|9031|GIZ_OPENAPI_QQ_OAUTH_KEY_INVALID|qq oauth key invalid!
|9032|GIZ_OPENAPI_OTA_SERVICE_OK_BUT_IN_IDLE|ota upgrade service OK, but in idle or disable!
|9033|GIZ_OPENAPI_BT_FIRMWARE_UNVERIFIED|bt firmware unverified,except verify device!
|9034|GIZ_OPENAPI_BT_FIRMWARE_NOTHING_TO_UPGRADE|bt firmware is OK, but nothing to upgrade!
|9035|GIZ_OPENAPI_SAVE_KAIROSDB_ERROR|Save kairosdb error!
|9036|GIZ_OPENAPI_EVENT_NOT_DEFINED|event not defined!
|9037|GIZ_OPENAPI_SEND_SMS_FAILED|send sms failed!
|9038|GIZ_OPENAPI_APPLICATION_AUTH_INVALID|X-Gizwits-Application-Auth invalid!
|9039|GIZ_OPENAPI_NOT_ALLOWED_CALL_API|Not allowed to call deprecated API!
|9040|GIZ_OPENAPI_BAD_QRCODE_CONTENT|bad qrcode content!
|9041|GIZ_OPENAPI_REQUEST_THROTTLED|request was throttled
|9042|GIZ_OPENAPI_DEVICE_OFFLINE|device offline!
|9043|GIZ_OPENAPI_TIMESTAMP_INVALID|X-Gizwits-Timestamp invalid!
|9044|GIZ_OPENAPI_SIGNATURE_INVALID|X-Gizwits-Signature invalid!
|9045|GIZ_OPENAPI_DEPRECATED_API|API deprecated!
|9046|GIZ_OPENAPI_REGISTER_IS_BUSY|Register already in progress!
|9080|GIZ_OPENAPI_CANNOT_SHARE_TO_SELF|can not share device to self!
|9081|GIZ_OPENAPI_ONLY_OWNER_CAN_SHARE|guest or normal user can not share device!
|9082|GIZ_OPENAPI_NOT_FOUND_GUEST|guest user not found!
|9083|GIZ_OPENAPI_GUEST_ALREADY_BOUND|guest user alread bound!
|9084|GIZ_OPENAPI_NOT_FOUND_SHARING_INFO|sharing record not found!
|9085|GIZ_OPENAPI_NOT_FOUND_THE_MESSAGE|message record not found!
|9087|GIZ_OPENAPI_SHARING_IS_WAITING_FOR_ACCEPT|sharing alread created,waiting for the guest to accept!
|9088|GIZ_OPENAPI_SHARING_IS_EXPIRED|sharing record expired!
|9089|GIZ_OPENAPI_SHARING_IS_COMPLETED|sharing record status is not unaccept!
|9090|GIZ_OPENAPI_INVALID_SHARING_BECAUSE_UNBINDING|owner binding disabled!
|9092|GIZ_OPENAPI_ONLY_OWNER_CAN_BIND|owner exist, guest can not bind!
|9093|GIZ_OPENAPI_ONLY_OWNER_CAN_OPERATE|permission denied, you are not owner!
|9094|GIZ_OPENAPI_SHARING_ALREADY_CANCELLED|sharing already canceled!
|9095|GIZ_OPENAPI_OWNER_CANNOT_UNBIND_SELF|can not unbind self!
|9096|GIZ_OPENAPI_ONLY_GUEST_CAN_CHECK_QRCODE|permission denied, you are not guest!
|9098|GIZ_OPENAPI_MESSAGE_ALREADY_DELETED|notify delele binding failed!
|9099|GIZ_OPENAPI_BINDING_NOTIFY_FAILED|notify delele binding failed!
|9100|GIZ_OPENAPI_ONLY_SELF_CAN_MODIFY_ALIAS|permission denied, you are not owner or guest!
|9101|GIZ_OPENAPI_ONLY_RECEIVER_CAN_MARK_MESSAGE|permission denied, you are not the receiver!
|9999|GIZ_OPENAPI_RESERVED|reserved
