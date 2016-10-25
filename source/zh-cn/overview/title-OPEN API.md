title:OPEN API
---
# 简介
机智云 Open API 主要帮助开发者通过 HTTP 的方式维护用户、用户与设备之间的绑定关系，以及获取设备数据、发送控制指令给设备。

调用 API 需要获取 appid，product_key 和 token。appid 和 product_key 可以在产品信息页面获取到，token 通过用户注册和登录获取到。

下文中的参数统一用 {appid} 来表示，请将你自己的 appid 整个替换掉 {appid} （包括大括号）。
# 访问地址
http://api.gizwits.com
# SDK
python sdk: https://github.com/gizwits/gservice_sdk_py
# 用户信息 [/app/users]
## 创建匿名用户 [POST]
如果您想让您的用户不需要显示注册和登录就能使用机智云的功能，就可以通过匿名注册的方式来为该用户创建一个匿名用户。phone_id 可以是手机的唯一识别码。

或者您已经有了自己的用户系统，不希望用户再次注册一次机智云帐号，您也可以使用该接口，为您的每一个用户创建一个对应的机智云匿名帐号。这时，phone_id 可以是用户在您的系统中的唯一识别码。如在与微信应用做对接时，phone_id 可以设置成微信用户的 openid。
### Request (application/json)
Header

    X-Gizwits-Application-Id: {appid}
Body

    {
    "phone_id": "apiary"
    }
### Response 201 (application/json)
Body

    { 
    "uid": "akkdlfeiow", 
    "token": "akdlfkad",
    "expire_at": 13894002020
    }
