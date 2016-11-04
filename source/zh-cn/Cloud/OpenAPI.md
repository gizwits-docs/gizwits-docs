
title:  Gizwits Open API
---

# 简介

机智云 Open API 主要帮助开发者通过 HTTP 的方式维护用户、用户与设备之间的绑定关系，以及获取设备数据、发送控制指令给设备。

调用 API 需要获取 appid，product_key 和 token。appid 和 product_key 可以在产品信息页面获取到，token 通过用户注册和登录获取到。

下文中的参数统一用 {appid} 来表示，请将你自己的 appid 整个替换掉 {appid} （包括大括号）。

# 访问地址

http://api.gizwits.com

# SDK

* python sdk: https://github.com/gizwits/gservice_sdk_py

# 用户信息 [/app/users]

## 创建匿名用户 [POST]

如果您想让您的用户不需要显示注册和登录就能使用机智云的功能，就可以通过匿名注册的方式来为该用户创建一个匿名用户。phone_id 可以是手机的唯一识别码。

或者您已经有了自己的用户系统，不希望用户再次注册一次机智云帐号，您也可以使用该接口，为您的每一个用户创建一个对应的机智云匿名帐号。这时，phone_id 可以是用户在您的系统中的唯一识别码。如在与微信应用做对接时，phone_id 可以设置成微信用户的 openid。

+ Request (application/json)

    + Header
    
            X-Gizwits-Application-Id: {appid}
            
    + Body
            
            {
                "phone_id": "apiary"
            }

+ Response 201 (application/json)

    + Body
    
            { 
                "uid": "akkdlfeiow", 
                "token": "akdlfkad",
                "expire_at": 13894002020
            }


+ 请求示例

        curl --include \
             --request POST \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --data-binary "{
            \"phone_id\": \"apiary\"
        }" \
        'http://api.gizwits.com/app/users'

## 使用用户名和密码创建用户 [POST]

+ Request (application/json)

    + Header
    
            X-Gizwits-Application-Id: {appid}
    
    + Body
    
            {
                "username": "bob",
                "password": "123456"
            }
            
+ Response 201 (application/json)

    + Body
    
            { 
                "uid": "akkdlfeiow", 
                "token": "akdlfkad",
                "expire_at": 13894002020
            }

+ 请求示例

        curl --include \
             --request POST \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --data-binary "{
            \"username\": \"bob\",
            \"password\": \"123456\"
        }" \
        'http://api.gizwits.com/app/users'

## 使用邮箱创建用户 [POST]

用户通过邮箱注册机智云帐号，注册成功后会收到一封邮件通知。

+ Request (application/json)

    + Header
    
            X-Gizwits-Application-Id: {appid}
    
    + Body
    
            {
                "email": "bob@bob.com",
                "password": "123456"
            }
            
+ Response 201 (application/json)

    + Body
    
            { 
                "uid": "akkdlfeiow", 
                "token": "akdlfkad",
                "expire_at": 13894002020
            }

+ 请求示例

        curl --include \
             --request POST \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --data-binary "{
            \"email\": \"bob@bob.com\",
            \"password\": \"123456\"
        }" \
        'http://api.gizwits.com/app/users'

## 使用手机号创建用户 [POST]

如果希望用户使用手机号注册机智云帐号，机智云提供短信验证码接口，您需要先调用获取验证码接口获取验证码，然后再进行注册。

+ Request (application/json)

    + Header
    
            X-Gizwits-Application-Id: {appid}
    
    + Body
    
            {
                "phone": "123456",
                "password": "123456",
                "code": "abc"
            }
            
+ Response 201 (application/json)

    + Body
    
            { 
                "uid": "akkdlfeiow", 
                "token": "akdlfkad",
                "expire_at": 13894002020
            }

+ 请求示例

        curl --include \
             --request POST \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --data-binary "{
            \"phone\": \"123456\",
            \"password\": \"123456\",
            \"code\": \"abc\"
        }" \
        'http://api.gizwits.com/app/users'

## 使用第三方账号（百度/新浪/QQ）创建用户 [POST]

机智云目前支持使用百度、新浪和QQ创建用户，但是需要您在客户端实现 OAuth 授权，获得用户的 uid 和 token，机智云会验证 uid 和 token 的合法性，验证通过就会创建一个机智云帐号。

## 关于 QQ 登录

使用 QQ 登录，需要提供您的机智云 APP ID 和 QQ 应用 APP ID 发送给我们的客服，我们客服将会在后台将二者进行关联。

手机客户端使用 QQ SDK 获取到用户的 openid 和 access_token，将 openid 和 access_token 作为 uid 和 token POST 到该接口:

    {
        "authData": {
            "src": "qq",
            "uid": opendid,
            "token": access_token
        }
    }

+ Request (application/json)

    + Header
    
            X-Gizwits-Application-Id: {appid}
    
    + Body
 
            {   
                "authData": {
                    "src": "baidu|sina|qq",
                    "uid": "2346677",
                    "token":"pnktnjyb996sj4p156gjtp4im"
                }
            }
            
+ Response 201 (application/json)

    + Body
    
            { 
                "uid": "akkdlfeiow", 
                "token": "akdlfkad",
                "expire_at": 13894002020
            }

+ 请求示例

        curl --include \
             --request POST \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --data-binary "{   
            \"authData\": {
                \"src\": \"baidu\",
                \"uid\": \"2346677\",
                \"token\":\"pnktnjyb996sj4p156gjtp4im\"
            }
        }" \
        'http://api.gizwits.com/app/users'

## 匿名用户设置用户名和密码 [PUT]

假设您的机智云应用帮用户创建了一个匿名用户，他不需要注册就可以体验您的应用，并且绑定了设备，他体验满意之后，希望有一个自己的机智云帐号，但是又不想重复绑定设备。这时您可以调用该接口，为匿名用户设置用户名和密码，这样他就不再是一个匿名用户了。

+ Request (application/json)

    + Header

            X-Gizwits-Application-Id: {appid}
            X-Gizwits-User-token: {token}

    + Body

            {
                "username": "bob",
                "password": "abda2"
            }

+ Response 200 (application/json)

    + Body

            {
                "updatedAt": "2011-11-07T21:25:10.623Z"
            }

+ 请求示例

        curl --include \
             --request PUT \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --header "X-Gizwits-User-token: {token}" \
             --data-binary "{
            \"username\": \"bob\",
            \"password\": \"abda2\"
        }" \
        'http://api.gizwits.com/app/users'

## 匿名用户设置手机号和密码 [PUT]

与匿名用户设置用户名和密码类似，该接口可以为匿名用户设置手机号和密码，但是需要先调用一次获取短信验证码的接口。

+ Request (application/json)

    + Header

            X-Gizwits-Application-Id: {appid}
            X-Gizwits-User-token: {token}

    + Body

            {
                "phone": "1328830223",
                "password": "123456",
                "code": "123"
            }

+ Response 200 (application/json)

    + Body

            {
                "updatedAt": "2011-11-07T21:25:10.623Z"
            }

+ 请求示例

        curl --include \
             --request PUT \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --header "X-Gizwits-User-token: {token}" \
             --data-binary "{
            \"phone\": \"1328830223\",
            \"password\": \"123456\",
            \"code\": \"123\"
        }" \
        'http://api.gizwits.com/app/users'

## 修改密码 [PUT]

+ Request (application/json)

    + Header
    
            X-Gizwits-Application-Id: {appid}
            X-Gizwits-User-token: {token}
    
    + Body
    
            {
                "old_pwd": "123456",
                "new_pwd": "123456"
            }
            
+ Response 200 (application/json)

    + Body
    
            { 
                "updatedAt": "2011-11-07T21:25:10.623Z"
            }

+ 请求示例

        curl --include \
             --request PUT \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --header "X-Gizwits-User-token: {token}" \
             --data-binary "{
            \"old_pwd\": \"123456\",
            \"new_pwd\": \"123456\"
        }" \
        'http://api.gizwits.com/app/users'

## 修改 email [PUT]

+ Request (application/json)

    + Header

            X-Gizwits-Application-Id: {appid}
            X-Gizwits-User-token: {token}

    + Body

            {
                "email": "bob@bob.com",
            }

+ Response 200 (application/json)

    + Body

            {
                "updatedAt": "2011-11-07T21:25:10.623Z"
            }

+ 请求示例

        curl --include \
             --request PUT \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --header "X-Gizwits-User-token: {token}" \
             --data-binary "{
            \"email\": \"bob@bob.com\"
        }" \
        'http://api.gizwits.com/app/users'

## 修改手机号 [PUT]

修改手机号需要先调用一次获取短信验证码的接口，给新手机号发送一条短信验证码。

+ Request (application/json)

    + Header

            X-Gizwits-Application-Id: {appid}
            X-Gizwits-User-token: {token}

    + Body

            {
                "phone": "1328830223",
                "code": "abc"
            }

+ Response 200 (application/json)

    + Body

            {
                "updatedAt": "2011-11-07T21:25:10.623Z"
            }

+ 请求示例

        curl --include \
             --request PUT \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --header "X-Gizwits-User-token: {token}" \
             --data-binary "{
            \"phone\": \"1328830223\",
            \"code\": \"abc\"
        }" \
        'http://api.gizwits.com/app/users'

# 用户登录 [/app/login]

可以使用用户名/邮箱/手机号登录，一律填写到 username 字段。

## 用户登录 [POST]

+ Request (application/json)

    + Header
    
            X-Gizwits-Application-Id: {appid}
    
    + Body
    
            {
                "username": "bob",
                "password": "123456"
            }
            
+ Response 200 (application/json)

    + Body
    
            { 
                "uid": "akkdlfeiow", 
                "token": "akdlfkad",
                "expire_at": 13894002020
            }

+ 请求示例

        curl --include \
             --request POST \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --data-binary "{
            \"username\": \"bob\",
            \"password\": \"123456\"
        }" \
        'http://api.gizwits.com/app/login'


# 获取 App Token [/app/request_token]

## 获取 App Token [POST]

* 请使用 *https* 调用本接口
* signature 的算法: signature = MD5(appid+appsecret) 32位小写

+ Request (application/json)

    + Header

            X-Gizwits-Application-Id: {appid}
            X-Gizwits-Application-Auth: {signature}


+ Response 200 (application/json)

    + Body

            {
                "token": "XxXXXxxxx",
                "expired_at": 123333333,
            }

+ 请求示例

        curl --include \
             --insecure \
             --request POST \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --header "X-Gizwits-Application-Auth: {signature}" \
          'https://api.gizwits.com/app/request_token'

# 图片验证码 [/app/verify/codes]

## 获取图片验证码 [GET]

+ Request (application/json)

    + Header

            X-Gizwits-Application-Id: {appid}
            X-Gizwits-Application-Token: {token}


+ Response 200 (application/json)

    + Body

            {
                "captcha_url": "http://xxxxx",
                "captcha_id": "XXXXXXXxxxxxxx",
            }

+ 请求示例

        curl --include \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --header "X-Gizwits-Application-Token: {token}" \
          'http://api.gizwits.com/app/verify/codes'

## 发送手机短信验证码 [POST]

+ Request (application/json)

    + Header

            X-Gizwits-Application-Id: {appid}
            X-Gizwits-Application-Token: {token}

    + Body

            {
                "captcha_id": "XXXXXXXxxxxxxx",
                "captcha_code": "123123",
                "phone": "123123123"
            }

+ Response 201 (application/json)

+ 请求示例

        Try curl --include \
             --request POST \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --header "X-Gizwits-Application-Token: {token}" \
             --data-binary "{
            \"captcha_id\": \"XXXXXXXxxxxxxx\",
            \"captcha_code\": \"123123\",
            \"phone\": \"123123123\"
        }" \
        'http://api.gizwits.com/app/verify/codes'

## 校验短信验证码 [PUT]

+ Request (application/json)

    + Header

            X-Gizwits-Application-Id: {appid}
            X-Gizwits-Application-Token: {token}

    + Body

            {
                "sms_code": "123xx",
                "phone": "123123123"
            }

+ Response 200 (application/json)

+ 请求示例

        curl --include \
             --request PUT \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --header "X-Gizwits-Application-Token: {token}" \
             --data-binary "{
            \"sms_code\": \"123xx\",
            \"phone\": \"123123123\"
        }" \
        'http://api.gizwits.com/app/verify/codes'

# 重置密码 [/app/reset_password]

## 使用邮箱重置密码 [POST]

请求成功后用户会收到一封重置密码的邮件, 用户根据邮件的链接进行密码重置。

+ Request (application/json)

    + Header

            X-Gizwits-Application-Id: {appid}

    + Body

            {
                "email": "bob@bob.com"
            }

+ Response 200 (application/json)

+ 请求示例

        curl --include \
             --request POST \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --data-binary "{
            \"email\": \"bob@bob.com\"
        }" \
        'http://api.gizwits.com/app/reset_password'

## 使用手机号重置密码 [POST]

使用手机号重置密码需要先调用一次获取短信验证码的接口。

+ Request (application/json)

    + Header

            X-Gizwits-Application-Id: {appid}

    + Body

            {
                "phone": "13232433",
                "code": "13232',
                "new_pwd": "1323200"
            }

+ Response 200 (application/json)

+ 请求示例

        curl --include \
             --request POST \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --data-binary "{
            \"phone\": \"13232433\",
            \"code\": \"13232\',
            \"new_pwd\": \"1323200\"
        }" \
        'http://api.gizwits.com/app/reset_password'

# 获取设备最近上传数据 [/app/devdata/{did}/latest]

## 获取设备最近上传数据点 [GET]

获取设备最近一次上传的数据，包含所有数据点的键值对。

+ 参数列表
    + did (required, string, `gdGn7PzAYf4VrhnVag5x8D`)

+ Request (application/json)

    + Header

            X-Gizwits-Application-Id: {appid}

+ Response 200 (application/json)

    + Body

            {
                "did": "gdGn7PzAYf4VrhnVag5x8D",
                "updated_at": 148293984328,
                "attr": {
                  "temp": 10,
                  "humi": 20
                }
            }

+ 请求示例

        curl --include \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
          'http://api.gizwits.com/app/devdata/gdGn7PzAYf4VrhnVag5x8D/latest'


# 绑定设备 [/app/bind_mac]

## 绑定设备 [POST]

X-Gizwits-Timestamp 与服务器相差不能超过 5 分钟
X-Gizwits-Signature = MD5(product_secret + X-Gizwits-Timestamp).lower()

+ Request (application/json)

    + Header

            X-Gizwits-Application-Id: {appid}
            X-Gizwits-User-token: {token}
            X-Gizwits-Timestamp: {req_ts}
            X-Gizwits-Signature: {sig}

    + Body

            {
               "product_key": "xxx",
               "mac": "xxx",
               "remark": "xxx",
               "dev_alias": "xxx"
            }


+ Response 201 (application/json)

+ 请求示例

        curl --include \
             --request POST \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --header "X-Gizwits-User-token: {token}" \
             --header "X-Gizwits-Timestamp: {req_ts}" \
             --header "X-Gizwits-Signature: {sig}" \
             --data-binary "{
           \"product_key\": \"xxx\",
           \"mac\": \"xxx\",
           \"remark\": \"xxx\",
           \"dev_alias\": \"xxx\"
        }" \
        'http://api.gizwits.com/app/bind_mac'

# 绑定关系 [/app/bindings]

## 获取绑定列表 [GET]

+ 参数列表
    + limit (optional, number, `20`)
    + skip (optional, number, `0`)

limit 和 skip 表示分页参数。limit 为一次性返回的最多条数，skip 为跳过多少条数据。

如每页 10 条数据，获取第一页数据：limit=10, skip=0；获取第二页数据：limit=10, skip=10.

+ Request (application/json)

    + Header
    
            X-Gizwits-Application-Id: {appid}
            X-Gizwits-User-token: {token}
            
+ Response 200 (application/json)

    + Body
    
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

+ 请求示例

        curl --include \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --header "X-Gizwits-User-token: {token}" \
          'http://api.gizwits.com/app/bindings?show_disabled=1&limit=20&skip=0'

## 绑定设备: 通过 did + passcode [POST]

使用该接口适合知道 did 和 passcode 的情况。

dev_alias 设备别名，用于当前用户对该设备起一个别名，仅该用户可见。
remark 用于设置备注信息。

+ Request (application/json)

    + Header
    
            X-Gizwits-Application-Id: {appid}
            X-Gizwits-User-token: {token}
            
    + Body
    
            {
                "devices": [{
                    "did": "gdGn7PzAYf4VrhnVag5x8D",
                    "passcode": "gokit",
                    "remark": ""，      
                    "dev_alias": "my_dev"
                }]
            }
    
+ Response 200 (application/json)

           {
                "success": ['abc', 'add'],
                "failed": ['adad', 'ee']
           }

+ 请求示例

        curl --include \
             --request POST \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --header "X-Gizwits-User-token: {token}" \
             --data-binary "{
            \"devices\": [{
                \"did\": \"gdGn7PzAYf4VrhnVag5x8D\",
                \"passcode\": \"gokit\",
                \"remark\": \"\",
                \"dev_alias\": \"\"
            }]
        }" \
        'http://api.gizwits.com/app/bindings'

## 解除绑定 [DELETE]

+ Request (application/json)

    + Header
    
            X-Gizwits-Application-Id: {appid}
            X-Gizwits-User-token: {token}
            
    + Body
    
            {
                "devices": [{
                    "did": "gdGn7PzAYf4VrhnVag5x8D"
                }]
            }
    
+ Response 200 (application/json)

           {
                "success": ['abc', 'add'],
                "failed": ['adad', 'ee']
           }

+ 请求示例

        curl --include \
             --request DELETE \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --header "X-Gizwits-User-token: {token}" \
             --data-binary "{
            \"devices\": [{
                \"did\": \"gdGn7PzAYf4VrhnVag5x8D\"
            }]
        }" \
        'http://api.gizwits.com/app/bindings'

# 远程控制设备 [/app/control/{did}]

远程控制设备可以通过两种方式，一种是设置数据点，一种是发送原始控制指令。
推荐使用设置数据点的方式，通过这种方式控制设备，系统内部自动会生成原始控制指令发送给设备，使用起来更简单。

+ 参数列表
    + did (required, string, `did`)

## 设置数据点 [POST]

* 只能设置可写类型的数据点
* bool 类型的数据点设置为 true/false
* enum 类型的数据点设置为枚举的字符串
* uint8/uint16/uint32 类型的数据点设置为数字
* binary 类型的数据设置为 hex 类型字符串，如发送一串十六进制数据 0x01, 0x02, 0x03, 就写成 "010203";
  如果 binary 类型本身为字符串，如 "hello world!"，需将字符串每个字符的 ASCII 转成十六进制再发送，本例为 "68656c6c6f20776f726c6421";
  **注意 binary 类型定义了多少长度，就需要发多少长度的数据**。

+ Request (application/json)

    + Header

            X-Gizwits-Application-Id: {appid}
            X-Gizwits-User-token: {token}

    + Body

            {
                "attrs": {
                  "temp": 10
                }
            }

+ Response 200 (application/json)

    + Body

            {}

+ Request (application/json)

    + Header

            X-Gizwits-Application-Id: {appid}
            X-Gizwits-User-token: {token}

    + Body

            {
                "attrs": {
                  "temp": 10,
                  "humi": 50
                }
            }

+ Response 200 (application/json)

    + Body

            {}

+ 请求示例

        curl --include \
             --request POST \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --header "X-Gizwits-User-token: {token}" \
             --data-binary "{
            \"attrs\": {
                \"temp\": 10
            }
        }" \
        'http://api.gizwits.com/app/control/did'


## 发送原始控制指令 [POST]

+ Request (application/json)

    + Header
    
            X-Gizwits-Application-Id: {appid}
            X-Gizwits-User-token: {token}

    + Body
    
            {
                "raw": [<byte>, <byte>, ...]
            }
            
+ Response 200 (application/json)

    + Body
    
            {}

+ 请求示例

        curl --include \
             --request POST \
             --header "Content-Type: application/json" \
             --header "X-Gizwits-Application-Id: {appid}" \
             --header "X-Gizwits-User-token: {token}" \
             --data-binary "{
            \"raw\": [0, 1, 2, 3]
        }" \
        'http://api.gizwits.com/app/control/did'

# 定时任务 [/app/scheduler{?limit,skip}]

定时任务分为一次性定时任务和可重复执行定时任务。一次性定时任务在设定好的日期和时间执行；可重复执行定时任务可以设置按星期重复，如每周一执行，工作日执行等，在重复的星期的设定时间执行。

执行日期通过 date 参数进行设置，格式为："2015-01-01"。

执行时间通过 time 参数进行设置，格式为："10:10", *注意：该时间为 UTC 时间！*

重复类型通过 repeat 参数进行设置，不重复设置为 "none"；重复设置为 "mon", "tue", "wed", "thu", "fri", "sat", "sun" 的组合，组合之间用逗号分隔，如每周一和周二重复为 "mon,tue"。

一次定时任务可以给多个已绑定的设备发送控制指令，只有设定的所有控制指令都发送成功，本次定时任务才算执行成功。任务内容通过 task 设定，为一个列表，列表内的内容为每个具体的任务。具体的任务需要提供设备 did, product_key 和要设置的数据点键值对 attrs。如：

    {
      "did": "did1",
      "product_key": "xxx",
      "attrs": {
        "attr1": val,
        "attr2": val
      }
    }

对于执行失败的定时任务，可以设置重复次数和重复策略。重复次数的范围为 0 ～ 60 次。置重复策略分为全部重试和部分重试。全部重试，将在重试的时候发送所有设定的控制指令；部分重试，只对还未发送成功指令进行发送。

重复次数通过 retry_count 来设置。

重复策略通过 retry_task 来设置，全部重试为 "all"，部分重试为 "failed"。

## 创建定时任务 [POST]

+ Request (application/json)

    + Header

            X-Gizwits-Application-Id: {appid}
            X-Gizwits-User-token: {token}

    + Body

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

+ Response 201 (application/json)

    + Body

            {
              "id": "adkle"
            }

## 获取定时任务 [GET]

+ 参数列表
    + limit (optional, number, `20`)
    + skip (optional, number, `0`)

+ Request (application/text)

    + Header

            X-Gizwits-Application-Id: {appid}
            X-Gizwits-User-token: {token}

+ Response 200 (application/json)

    + Body

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

# 删除定时任务 [/app/scheduler/{id}]

+ 参数列表
  + id (required, string, `sid1`)

## 删除定时任务 [DELETE]

+ Request (application/text)

    + Header

            X-Gizwits-Application-Id: {appid}
            X-Gizwits-User-token: {token}

+ Response 200 (application/json)

# 定时任务执行日志 [/app/scheduler/{id}/logs]

+ 参数列表
  + id (required, string, `sid1`)

## 获取最近一次定时任务执行日志 [GET]

+ Request (application/text)

    + Header

            X-Gizwits-Application-Id: {appid}
            X-Gizwits-User-token: {token}

+ Response 200 (application/json)

    + Body

            {
              "datetime": "2015-01-02T12:00:00",
              "status": "succeed|failed",
              "detail": {
                "did1": true,
                "did2": false
              }
            }

# 错误代码

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
|    400 | 9043 | 'X-Gizwits-Timestamp invalid!                   |
|    400 | 9044 | X-Gizwits-Signature invalid!                    |
|    400 | 9045 | API deprecated!                                 |
|    xxx | 9999 | reserved                                        |
