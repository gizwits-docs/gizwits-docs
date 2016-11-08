
title:  Gizwits Open API
---

# 概述

使用机智云提供的Open API（Http / WebSocket），可以快速开发网页或微信应用等基于html的轻应用，用于管理和控制智能设备。
机智云 Open API 主要帮助开发者通过 HTTP 的方式维护用户、用户与设备之间的绑定关系，以及获取设备数据、发送控制指令给设备。

# 访问地址

http://api.gizwits.com

# 协议约定

## 请求方式

本文档所定义接口基于HTTP/HTTPS协议进行传输，需要注意协议中标注的请求方式，通过GET、PUT、DELETE等进行不同的操作。

## 请求参数
HTTP请求参数的类型一般分为三种。Header表示该参数是在HTTP请求头中；URL表示是通过url传参；Body表示是Request Body，通常Body中都是JSON格式

## HTTP头部请求说明

调用 API 需要获取 appid，product_key 和 token。appid 和 product_key 可以在产品信息页面获取到，token 通过用户注册和登录获取到。
下文中的参数统一用 {appid} 来表示，请将你自己的 appid 整个替换掉 {appid} （包括大括号）。

### X-Gizwits-Application-Id

所有接口都需要设置该头部, 该头部信息的值通过在开发者中心的应用管理中创建应用获得

### X-Gizwits-User-token

App用户token值， 生存周期为1个星期有效，调用获取token接口返回的expired_at为失效日期时间戳。若现在时间戳 > expired_at时间戳，则需要重新获取token, 获取token接口请见“App用户token申请”

# App Token申请

## 获取 App Token
### 业务功能描述
该接口提供获取访问token访问权限的功能
### 接口地址
    http://api.gizwits.com/app/request_token
### 请求方式
    POST
### 说明
* 请使用 *https* 调用本接口
* signature 的算法: signature = MD5(appid+appsecret) 32位小写

### 请求报文
Header
```json
X-Gizwits-Application-Id: {appid}
X-Gizwits-Application-Auth: {signature}
```

### 应答报文
```json
{
    "token": "XxXXXxxxx",
    "expired_at": 123333333
}
```

# 用户管理

## 创建用户
### 1、创建匿名用户

如果您想让您的用户不需要显示注册和登录就能使用机智云的功能，就可以通过匿名注册的方式来为该用户创建一个匿名用户。phone_id 可以是手机的唯一识别码。

或者您已经有了自己的用户系统，不希望用户再次注册一次机智云帐号，您也可以使用该接口，为您的每一个用户创建一个对应的机智云匿名帐号。这时，phone_id 可以是用户在您的系统中的唯一识别码。如在与微信应用做对接时，phone_id 可以设置成微信用户的 openid。

### 接口地址
    http://api.gizwits.com/app/users
### 请求方式
    POST
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id  |String|是|header| | |
|phone_id|string|是|body|phone_id 可以是手机的唯一识别码| |

### 应答报文
```json
    { 
        "uid": "akkdlfeiow", 
        "token": "akdlfkad",
        "expire_at": 13894002020
    }
```

### 2、使用用户名和密码创建用户
### 接口地址
    http://api.gizwits.com/app/users
### 请求方式
    POST
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id  |String|是|header| | | 
|username|string|是|body|用户名| |
|password|string|是|body|密码| |

### 应答报文
```json
    { 
                "uid": "akkdlfeiow", 
                "token": "akdlfkad",
                "expire_at": 13894002020
    }
```


### 3、使用邮箱创建用户 
### 业务功能描述
用户通过邮箱注册机智云帐号，注册成功后会收到一封邮件通知。
### 接口地址
    http://api.gizwits.com/app/users
### 请求方式
    POST
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id  |String|是|header| | |
|email|string|是|body|用户邮箱| |
|password|string|是|body|密码| |

### 应答报文

```json
        { 
                "uid": "akkdlfeiow", 
                "token": "akdlfkad",
                "expire_at": 13894002020
        }
```

### 4、使用手机号创建用户
### 业务功能描述
如果希望用户使用手机号注册机智云帐号，机智云提供短信验证码接口，您需要先调用获取验证码接口获取验证码，然后再进行注册。

### 接口地址
    http://api.gizwits.com/app/users
### 请求方式
    POST
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id  |String|是|header| | | 
|phone|string|是|body|手机号码| |
|password|string|是|body|密码| |
|code|string|是|body|验证码| |

### 应答报文

```json
        { 
            "uid": "akkdlfeiow", 
            "token": "akdlfkad",
            "expire_at": 13894002020
        }
```

### 使用第三方账号（百度/新浪/QQ）创建用户 

### 业务功能描述

机智云目前支持使用百度、新浪和QQ创建用户，但是需要您在客户端实现 OAuth 授权，获得用户的 uid 和 token，机智云会验证 uid 和 token 的合法性，验证通过就会创建一个机智云帐号。

#### 关于 QQ 登录

使用 QQ 登录，需要提供您的机智云 APP ID 和 QQ 应用 APP ID 发送给我们的客服，我们客服将会在后台将二者进行关联。

手机客户端使用 QQ SDK 获取到用户的 openid 和 access_token，将 openid 和 access_token 作为 uid 和 token POST 到该接口:

    {
        "authData": {
            "src": "qq",
            "uid": opendid,
            "token": access_token
        }
    }

### 接口地址
    http://api.gizwits.com/app/users
### 请求方式
    POST
### 请求报文
Header
```json
    X-Gizwits-Application-Id: {appid}
```

Body
```json
    {   
                "authData": {
                    "src": "baidu|sina|qq",
                    "uid": "2346677",
                    "token":"pnktnjyb996sj4p156gjtp4im"
                }
            }
```

### 应答报文
```json
        { 
            "uid": "akkdlfeiow", 
            "token": "akdlfkad",
            "expire_at": 13894002020
        }
```

### 匿名用户设置用户名和密码 

### 业务功能描述
假设您的机智云应用帮用户创建了一个匿名用户，他不需要注册就可以体验您的应用，并且绑定了设备，他体验满意之后，希望有一个自己的机智云帐号，但是又不想重复绑定设备。这时您可以调用该接口，为匿名用户设置用户名和密码，这样他就不再是一个匿名用户了。

### 接口地址
    http://api.gizwits.com/app/users
### 请求方式
    POST
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id  |String|是|header| | |
|X-Gizwits-User-token  |String|是|header| | | 
|username|string|是|body|用户名| |
|password|string|是|body|密码| |

### 应答报文
```json
{
    "updatedAt": "2011-11-07T21:25:10.623Z",
}
```

### 匿名用户设置手机号和密码 
### 业务描述
与匿名用户设置用户名和密码类似，该接口可以为匿名用户设置手机号和密码，但是需要先调用一次获取短信验证码的接口。

### 接口地址
    http://api.gizwits.com/app/users
### 请求方式
    POST
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id  |String|是|header| | |
|X-Gizwits-User-token  |String|是|header| | |
|phone|string|是|body|手机号码| |
|password|string|是|body|密码| |
|code|string|是|body|验证码| |

### 应答报文
```json
{
    "updatedAt": "2011-11-07T21:25:10.623Z",
}
```

## 修改用户信息

### 业务功能描述
该接口分别提供修改用户密码、修改用户邮箱、修改用户手机的功能
### 接口地址
    http://api.gizwits.com/app/users
### 请求方式
    PUT

### 修改密码Example
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id  |String|是|header| | |
|X-Gizwits-User-token  |String|是|header| | | 
|old_pwd|string|是|body|旧密码| |
|new_pwd|string|是|body|新密码| |

### 应答报文
```json
{
    "updatedAt": "2011-11-07T21:25:10.623Z",
}
```

### 修改 email Example
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id  |String|是|header| | |
|X-Gizwits-User-token  |String|是|header| | | 
|email|string|是|body|邮箱地址| |
### 应答报文
```json
{
    "updatedAt": "2011-11-07T21:25:10.623Z",
}
```


### 修改手机号 Example

修改手机号需要先调用一次获取短信验证码的接口，给新手机号发送一条短信验证码。

### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id  |String|是|header| | |
|X-Gizwits-User-token  |String|是|header| | |
|phone|string|是|body|手机号码| |
|code|string|是|body|验证码| |
### 应答报文
```json
{
    "updatedAt": "2011-11-07T21:25:10.623Z",
}
```

## 用户登录

可以使用用户名/邮箱/手机号登录，一律填写到 username 字段。

### 接口地址
    api.gizwits.com/app/login
### 请求方式
    POST
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id  |String|是|header| | |
|username|string|是|body|用户名| |
|password|string|是|body|密码| |
### 应答报文
```json
{ 
                "uid": "akkdlfeiow", 
                "token": "akdlfkad",
                "expire_at": 13894002020
}
```

## 验证码

### 获取图片验证码
### 业务功能描述
该接口提供获取图片验证码
### 请求地址
http://api.gizwits.com/app/verify/codes
### 请求方式
    POST

### 请求内容
获取图片验证码
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id  |String|是|header| | |
|X-Gizwits-User-token  |String|是|header| | |
|captcha_url|string|是|body| | |
|captcha_id|string|是|body| | |

### 应答报文

Response 201

### 发送手机短信验证码
### 业务功能描述
发送手机短信验证码
### 请求地址
http://api.gizwits.com/app/verify/codes
### 请求方式
    POST
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id  |String|是|header| | | 
|X-Gizwits-User-token  |String|是|header| | |
|captcha_url|string|是|body| | |
|captcha_id|string|是|body| | |
|phone|string|是|body| | |

### 应答报文

Response 201

### 校验短信验证码
### 业务功能描述
该接口校验短信验证码功能
### 请求方式
    PUT
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id  |String|是|header| | |
|X-Gizwits-User-token  |String|是|header| | | 
|sms_code|string|是|body| | |
|phone|string|是|body| | |
### 应答报文
Response 200

## 重置密码

### 邮箱重置密码
### 业务功能描述
请求成功后用户会收到一封重置密码的邮件, 用户根据邮件的链接进行密码重置。
### 接口地址
    http://api.gizwits.com/app/reset_password
### 请求方式
     POST
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id  |String|是|header| | | 
|email|string|是|body| | |

### 应答报文
Response 200 (application/json)

### 使用手机号重置密码
### 业务功能描述
使用手机号重置密码需要先调用一次获取短信验证码的接口。

### 接口地址
    http://api.gizwits.com/app/reset_password
### 请求方式
     POST
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id  |String|是|header| | |
|phone|string|是|body|手机号码| |
|code|string|是|body|验证码| |
|new_pwd|string|是|body|新密码| |
### 应答报文
Response 200 (application/json)

# 绑定管理

## 绑定设备

### 业务功能描述
X-Gizwits-Timestamp 与服务器相差不能超过 5 分钟
X-Gizwits-Signature = MD5(product_secret + X-Gizwits-Timestamp).lower()
### 接口地址
     http://api.gizwits.com/app/bind_mac
### 请求方式
     POST

### 请求报文
1、 Header
```json
    X-Gizwits-Application-Id: {appid}
    X-Gizwits-User-token: {token}
    X-Gizwits-Timestamp: {req_ts}
    X-Gizwits-Signature: {sig}
```
2、 Body
```json
    {
        "product_key": "xxx",
        "mac": "xxx",
        "remark": "xxx",
        "dev_alias": "xxx"
    }
```

### 应答报文
Response 201 (application/json)

## 获取绑定列表

### 业务功能描述
该接口提供绑定列表
### 接口地址
     http://api.gizwits.com/app/bindings
### 请求方式
     GET

### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id|String|是|header| | | 
|X-Gizwits-User-token|String|是|header| | | 
|limit|String|是|url| | |
|skip|String|是|url| | | 

### limit & skip参数说明
limit 和 skip 表示分页参数。limit 为一次性返回的最多条数，skip 为跳过多少条数据。
如每页 10 条数据，获取第一页数据：limit=10, skip=0；获取第二页数据：limit=10, skip=10.

### 应答报文
```json    
            {
                "devices": [{
                    "product_key": "akdlfkad",
                    "did": "abcada",
                    "mac": "1122334455667788",
                    "is_online": false,
                    "passcode": "123456",
                    "host": "m2m.gizwits.com",
                    "port": 3128,
                    "remark": "",
                    "is_disabled": false,
                    "type": "normal",
                    "dev_alias": "dev1"
                },{
                    "product_key": "akdlfkad",
                    "did": "abcada",
                    "mac": "1122334455667788",
                    "is_online": false,
                    "passcode": "123456",
                    "host": "m2m.gizwits.com",
                    "port": 3128,
                    "remark": "",
                    "is_disabled": false,
                    "type": "center_control",
                    "dev_alias": "dev2"
                }]
            }
```

## 修改绑定信息
### 业务功能描述
修改绑定信息
### 接口地址
     http://api.gizwits.com/app/bindings/{did}
### 请求方式
     PUT

### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|did|String|是|url| | |
|X-Gizwits-Application-Id|String|是|header| | | 
|X-Gizwits-User-token|String|是|header| | |  
|remark|String|是|body| | | 
|dev_alias|String|是|body| | | 

### 应答报文
```json
    {
        "remark": "string",
        "dev_alias": "string"
    }
```

## 解除绑定
### 业务功能描述
提供解除绑定功能
### 接口地址
     http://api.gizwits.com/app/bindings
### 请求方式
     DELETE

### 请求报文
Header
X-Gizwits-Application-Id: {appid}
X-Gizwits-User-token: {token}

Body
```json
    {
                "devices": [{
                    "did": "gdGn7PzAYf4VrhnVag5x8D"
                }]
    }
```

### 应答报文
```json
{
    "success": ['abc', 'add'],
    "failed": ['adad', 'ee']
}
```

           


# 设备管理

## 远程控制设备

### 接口地址
     http://api.gizwits.com/app/control/{did}
### 请求方式
     POST

### 详情描述
远程控制设备可以通过两种方式，一种是设置数据点，一种是发送原始控制指令。
推荐使用设置数据点的方式，通过这种方式控制设备，系统内部自动会生成原始控制指令发送给设备，使用起来更简单。

+ 参数列表
    + did (required, string, `did`)

### 设置数据点 [POST]

* 只能设置可写类型的数据点
* bool 类型的数据点设置为 true/false
* enum 类型的数据点设置为枚举的字符串
* uint8/uint16/uint32 类型的数据点设置为数字
* binary 类型的数据设置为 hex 类型字符串，如发送一串十六进制数据 0x01, 0x02, 0x03, 就写成 "010203";
  如果 binary 类型本身为字符串，如 "hello world!"，需将字符串每个字符的 ASCII 转成十六进制再发送，本例为 "68656c6c6f20776f726c6421";
  **注意 binary 类型定义了多少长度，就需要发多少长度的数据**。

### 请求报文
Header
X-Gizwits-Application-Id: {appid}
X-Gizwits-User-token: {token}
Body
```json
{
    "attrs": {
      "temp": 10
    }
}
```
### 应答报文
```json
{}
```

### 发送原始控制指令 

### 请求报文
Header
X-Gizwits-Application-Id: {appid}
X-Gizwits-User-token: {token}
Body
```json
{
    "raw": [<byte>, <byte>, ...]
}
```
### 应答报文
```json
{}
```

# 定时功能

## 定时任务

### 业务详情描述
定时任务分为一次性定时任务和可重复执行定时任务。一次性定时任务在设定好的日期和时间执行；可重复执行定时任务可以设置按星期重复，如每周一执行，工作日执行等，在重复的星期的设定时间执行。

执行日期通过 date 参数进行设置，格式为："2015-01-01"。

执行时间通过 time 参数进行设置，格式为："10:10", *注意：该时间为 UTC 时间！*

重复类型通过 repeat 参数进行设置，不重复设置为 "none"；重复设置为 "mon", "tue", "wed", "thu", "fri", "sat", "sun" 的组合，组合之间用逗号分隔，如每周一和周二重复为 "mon,tue"。

一次定时任务可以给多个已绑定的设备发送控制指令，只有设定的所有控制指令都发送成功，本次定时任务才算执行成功。任务内容通过 task 设定，为一个列表，列表内的内容为每个具体的任务。具体的任务需要提供设备 did, product_key 和要设置的数据点键值对 attrs。如：

```json
    {
      "did": "did1",
      "product_key": "xxx",
      "attrs": {
        "attr1": val,
        "attr2": val
      }
    }
```
对于执行失败的定时任务，可以设置重复次数和重复策略。重复次数的范围为 0 ～ 60 次。置重复策略分为全部重试和部分重试。全部重试，将在重试的时候发送所有设定的控制指令；部分重试，只对还未发送成功指令进行发送。

重复次数通过 retry_count 来设置。

重复策略通过 retry_task 来设置，全部重试为 "all"，部分重试为 "failed"。

## 创建定时任务 
### 业务功能描述
该接口提供定时任务创建功能
### 请求地址
    http://api.gizwits.com/app/scheduler
### 请求方式
    POST
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id  |String|是|header| | | 
|X-Gizwits-User-token  |String|是|header| | | 
|limit  |String|是|url| | | 
|skip  |String|是|url| |跳过条数| 

2. request body
```json
            {
              "date": "2015-01-01",
              "time": "12:00",
              "repeat": "none",
              "task": [
                {
                  "did": "did1",
                  "product_key": "xxx",
                  "attrs": {
                    "attr1": val,
                    "attr2": val
                  }
                },
                {
                  "did": "did2",
                  "product_key": "xxx",
                  "attrs": {
                    "attr1": val,
                    "attr2": val
                  }
                }
              ],
              "retry_count": 3,
              "retry_task": "all"
            }
```

### 应答报文

```json
            {
              "id": "adkle"
            }
```

## 获取定时任务 
### 业务功能描述
该接口提供定时任务获取功能
### 请求地址
    http://api.gizwits.com/app/scheduler
### 请求方式
    GET
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|X-Gizwits-Application-Id  |String|是|header| |                  |
|X-Gizwits-User-token  |String|是|header| |                      | 
|limit  |String|是|url| |                                        | 
|skip  |String|是|url| |                                         | 
### 应答报文

```json
            [
              {
                "id": "abckaldkl",
                "created_at": "2015-01-01T12:00:00",
                "date": "2015-01-01",
                "time": "12:00",
                "repeat": "none",
                "task": [
                  {
                    "did": "did1",
                    "product_key": "xxx",
                    "attrs": {
                      "attr1": 1,
                      "attr2": 1
                    }
                  },
                  {
                    "did": "did2",
                    "product_key": "xxx",
                    "attrs": {
                      "attr1": 1,
                      "attr2": 2
                    }
                  }
                ],
                "retry_count": 3,
                "retry_task": "all"
              },
              {
                "id": "abckaldkl",
                "created_at": "2015-01-01T12:00:00",
                "date": "2015-01-01",
                "time": "12:00",
                "repeat": "none",
                "task": [
                  {
                    "did": "did1",
                    "product_key": "xxx",
                    "attrs": {
                      "attr1": "val",
                      "attr2": "val"
                    }
                  },
                  {
                    "did": "did2",
                    "product_key": "xxx",
                    "attrs": {
                      "attr1": "val",
                      "attr2": "val"
                    }
                  }
                ],
                "retry_count": 3,
                "retry_task": "all"
              }
            ]
```

## 删除定时任务
### 业务功能描述
该接口提供定时任务删除功能
### 请求地址
    http://api.gizwits.com/app/scheduler/{id}
### 请求方式
    DELETE
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|id  |String|是|url| | |
|X-Gizwits-Application-Id  |String|是|header| | |
|X-Gizwits-User-token  |String|是|header| | | 
### 应答报文
Response 200 (application/json)

## 获取设备定时任务 
### 请求地址
    http://api.gizwits.com/app/devices/{did}/scheduler
### 请求方式
    GET
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注    |
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|did  |String|是|url| | |
|X-Gizwits-Application-Id  |String|是|header| | |
|X-Gizwits-User-token  |String|是|header| | | 
|limit  |String|是|url| default:20| | 
|skip  |String|是|url| default:0| |

### 应答报文
```json
            [
              {
                "attrs": {"attr": 1},
                "date": "2016-11-07",
                "time": "12:00",
                "repeat": "none",
                "days": [
                  0
                ],
                "start_date": "2016-11-07",
                "end_date": "2016-11-07",
                "enabled": true,
                "remark": "",
                "id": "",
                "created_at": "2016-11-07"
              }
            ]
```

## 创建设备定时任务
### 业务功能描述
该接口提供设备定时任务创建功能
### 请求地址
    http://api.gizwits.com/app/devices/{did}/scheduler
### 请求方式
    POST
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注    |
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|did  |String|是|url| | |
|X-Gizwits-Application-Id  |String|是|header| | |
|X-Gizwits-User-token  |String|是|header| | |
Body request
```body
            {
              "attrs": {},
              "date": "2016-11-07",
              "time": "12:00",
              "repeat": "none",
              "days": [
                0
              ],
              "start_date": "2016-11-07",
              "end_date": "2016-11-07",
              "enabled": true,
              "remark": ""
            }
```
### 应答报文
```json
            {
              "id": "adkle"
            }
```

## 修改设备定时任务
### 业务功能描述
该接口提供设备定时任务修改功能
### 请求地址
    http://api.gizwits.com/app/devices/{did}/scheduler
### 请求方式
    PUT
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注    |
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|did  |String|是|url| | |
|X-Gizwits-Application-Id  |String|是|header| | |
|X-Gizwits-User-token  |String|是|header| | |

Body request
```json
            {
              "attrs": {},
              "date": "2016-11-07",
              "time": "12:00",
              "repeat": "none",
              "days": [
                0
              ],
              "start_date": "2016-11-07",
              "end_date": "2016-11-07",
              "enabled": true,
              "remark": ""
            }
```

### 应答报文
```json
            {
              "id": "adkle"
            }
```



## 删除设备定时任务

### 业务功能描述
该接口提供设备定时任务删除功能
### 请求地址
    http://api.gizwits.com/app/devices/{did}/scheduler/{id}
### 请求方式
    DELETE
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|id  |String|是|url| | |
|X-Gizwits-Application-Id  |String|是|header| | |
|X-Gizwits-User-token  |String|是|header| | |
### 应答报文
Response 200 (application/json)

## 定时任务执行日志
### 业务功能描述
该接口提供定时任务执行日志功能
### 请求地址
    http://api.gizwits.com/app/scheduler/{id}/logs
### 请求方式
    GET
### 请求报文
|参数    |类型  |必填    |参数类型     |描述   |备注|
| :-------- | --------:| :--: |:-------- | :-------- | :-------- | 
|id  |String|是|url| | |
|X-Gizwits-Application-Id  |String|是|header| | |
|X-Gizwits-User-token  |String|是|header| | |

### 应答报文

```json
            {
              "datetime": "2015-01-02T12:00:00",
              "status": "succeed|failed",
              "detail": {
                "did1": true,
                "did2": false
              }
            }
```

# 接口错误

## 错误信息格式
```json
{
      "error_code": "9015",
      "error_message": "form invalid!",
      "detail": ""
}
```

## 错误信息表

| status | code | message                                         |
|--------|:----:|-------------------------------------------------|
|    400 | 9001 | mac already registered!                         |
|    400 | 9002 | product_key invalid                             |
|    400 | 9003 | appid invalid                                   |
|    400 | 9004 | token invalid                                   |
|    400 | 9005 | user not exist                                  |
|    400 | 9006 | token expired                                   |
|    400 | 9007 | m2m_id invalid                                  |
|    500 | 9008 | server error                                    |
|    400 | 9009 | code expired                                    |
|    400 | 9010 | code invalid                                    |
|    400 | 9011 | sandbox scale quota exhausted!                  |
|    400 | 9012 | production scale quota exhausted!               |
|    400 | 9013 | product has no request scale!                   |
|    404 | 9014 | device not found!                               |
|    400 | 9015 | form invalid!                                   |
|    400 | 9016 | did or passcode invalid!                        |
|    401 | 9017 | device not bound!                               |
|    400 | 9018 | phone unavailable!                              |
|    400 | 9019 | username unavailable!                           |
|    400 | 9020 | username or password error!                     |
|    400 | 9021 | send command failed!                            |
|    400 | 9022 | email unavailable!                              |
|    400 | 9023 | device is disabled!                             |
|    400 | 9024 | fail to notify m2m!                             |
|    400 | 9025 | attr invalid!                                   |
|    400 | 9026 | user invalid!                                   |
|    404 | 9027 | firmware not found!                             |
|    404 | 9028 | JD product info not found!                      |
|    400 | 9029 | datapoint data not found!                       |
|    404 | 9030 | scheduler not found!                            |
|    400 | 9031 | qq oauth key invalid!                           |
|    400 | 9032 | ota upgrade service OK, but in idle or disable! |
|    400 | 9033 | bt firmware unverified, except verify device!   |
|    404 | 9034 | bt firmware is OK, but nothing to upgrade!      |
|    500 | 9035 | Save kairosdb error!                            |
|    400 | 9036 | event not defined!                              |
|    400 | 9037 | send sms failed!                                |
|    400 | 9038 | X-Gizwits-Application-Auth invalid!                              |
|    403 | 9039 | Not allowed to call deprecated API!             |
|    400 | 9040 | bad qrcode content!                             |
|    429 | 9041 | request was throttled                           |
|    400 | 9042 | device offline!                                 |
|    400 | 9043 | X-Gizwits-Timestamp invalid!                    |
|    400 | 9044 | X-Gizwits-Signature invalid!                    |
|    400 | 9045 | API deprecated!                                 |
|    400 | 9046 | Register already in progress!                   |
|    400 | 9047 | device encrypt disabled!                        |
|    400 | 9048 | device encrypt enabled, does not support this api!|
|    xxx | 9999 | reserved                                        |
