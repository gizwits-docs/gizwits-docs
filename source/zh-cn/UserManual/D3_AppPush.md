title: D3 APP 推送使用文档
---
# 概述
D3 推送功能目前支持四个推送平台，分别是极光、百度、信鸽、亚马逊SNS。对不同的平台我们提供统一的功能支持。

# 高级参数使用说明
## 亚马逊
在使用亚马逊的高级参数功能之间建议先阅读一下亚马逊SNS的官方文档[在消息中将自定义平台特定负载发送到移动设备](conhttps://docs.aws.amazon.com/sns/latest/dg/mobile-push-send-custommessage.html)，会对 D3 发送到亚马逊的原始消息有初步印象。
D3 亚马逊高级参数的格式是和亚马逊接受的数据格式一致的，不同的是亚马逊接受的数据格式中平台字段（如GCM, <span data-type="color" style="color:rgb(56, 58, 66)"><span data-type="background" style="background-color:rgb(250, 250, 250)">APNS</span></span>）对应的值是序列化后的 JSON 字符串，这样的格式不方便手写，而 D3 的高级参数只需要整体是个遵循 JSON 格式的字符串即可，无需将平台字段对应的值内容进行序列化，具体示例在下方。
高级参数中每个属性字段都是非必填的，但是需要遵循指定的格式。
### Android
以下是一个基本的高级参数示例：
```json
{
    "AWS": {
        "GCM": {
            "notification": {
                "title": "标题",
                "body": "主体内容",
                "sound": "default",
                "color": "#EE1289",
                "tag": "tag1"
            },
            "collapse_key": "collapse",
            "priority": "HIGH",
            "data": {
                       "test": "test field"
            }
        }
    }
}
```

亚马逊推送安卓的高级参数的 JSON 格式层级关系必须是 `AWS->GCM` ，任何 GCM/FCM 支持的参数都是在 `GCM` 键的值中进行配置。具体的可配置字段和含义请参看[安卓推送字段描述](https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages#AndroidConfig)。
#### 注意
1. 当使用高级参数功能的时候假如需要传递一些比较自定义的数据（例如数据点数据），建议将字段配置在 `data` 字段内。因为当消息类型是自定义消息的时候会清空 `notification` 字段的内容，自定义的数据如果放在此字段内将会丢失；
### iOS
iOS 有两种推送环境，一种是开发环境，一种是生产环境。不同的推送环境高级参数的 JSON 格式层级关系不相同，开发环境的层级关系是 `AWS->APNS_SANDBOX` ，生产环境的层级关系是 `AWS->APNS` 。以下是 iOS 推送高级参数的示例：
__开发环境__
```json
{
    "AWS": {
        "APNS_SANDBOX": {
            "aps": {
                "alert": {
                    "title": "This is title",
                    "body": "This is body"
                },
                "sound": "default",
                "badge": 99
            },
            "data": {
                "test": "some string"
            }
        }
    }
}
```
__生产环境__
```json
{
    "AWS": {
        "APNS": {
            "aps": {
                "alert": {
                    "title": "This is title",
                    "body": "This is body"
                },
                "sound": "default",
                "badge": 99
            },
            "data": {
                "test": "some string"
            }
        }
    }
}
```
具体的可配置字段和含义请参看[APNS文档](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html#//apple_ref/doc/uid/TP40008194-CH17-SW1)。
#### 注意
1. 当使用高级参数功能的时候假如需要传递一些比较自定义的数据（例如数据点数据），建议将字段配置在 `data` 字段内。因为当消息类型是自定义消息的时候会清空 `alert` 字段的内容，自定义的数据如果放在此字段内将会丢失；
