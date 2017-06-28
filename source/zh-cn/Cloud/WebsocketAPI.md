title: Websocket API 指南
---
v1.0.7

# Demo
https://github.com/gizwits/gizwits-wechat-js-sdk

#  通讯模型 

浏览器（Javascript）可以通过Web Socket API与机智云云端直接通讯。浏览器（Javascript）通过 Web Socket API，可以控制设备和实时接收设备上报的数据。 

![通信模型](/assets/zh-cn/cloud/通信模型.jpg)

#  通讯流程 

浏览器（Javascript）通过Web Socket API与云端通讯主要包括以下的通讯过程。

* 用户登陆：用户通过从Http API获得的uid和token登陆云端。
* 接收设备上线下线消息：只有绑定设备后才能控制设备。 
* 发送和接收设备业务逻辑数据：
* 心跳：浏览器（Javascript）定期向云端发送心跳，云端回复心跳响应。


#  约定 


## 1. 协议阅读说明 

● &lt;str&gt;表示字符串占位符，&lt;int&gt;表示整型数据占位符。


## 2. 云端Web Socket服务地址 
```
ws://<host>:<ws_port>/ws/app/v1 (非加密连接)
wss://<host>:<wss_port>/ws/app/v1 (加密连接)
```
其中的&lt;host&gt;为绑定设备列表中的host字段的值，&lt;ws_port&gt;为绑定设备列表中的ws_port字段的值，&lt;wss_port&gt;为绑定设备列表中的wss_port字段的值，请参考获取绑定设备列表HTTP API。


## 3. 注意事项  

* 在与云端进行Web Socket交互前，用户必须已注册并已绑定了设备。 
* 与云端交互的数据均为JSON字符串,以UTF-8的方式编码。可以通过JSON.stringify(json)把Javascript对象转化为字符串再发送给云端，或通过var res = JSON.parse(evt.data)把接收到的字符串数据转化成Javascript对象。
* Web Socket的测试程序请使用http://&lt;m2m_host&gt;:8080/app (​&lt;m2m_host&gt;为绑定设备列表中的host字段的值)， 也可以查看这个网页的源代码作为示例代码参考。


#  通讯协议 

## 1. 用户登陆 

浏览器（Javascript）必须登陆后才能和云端作进一步的交互。 

浏览器 ⇒ 云端。浏览器向云端发送以下的JSON字符串。

```
{
    "cmd": "login_req",
    "data":
    {
        "appid": <str>, 
        "uid": <str>,
        "token": <str>,
        "p0_type": "attrs_v4"|"custom", ("attrs_v4" 指通过标准数据点协议的方式和云端交互，见下文“标准数据点操作”部分。"custom"表示使用自定义业务逻辑协议的方式与云端交互，见下文“浏览器与云端的数据交互”部分。) 
        "heartbeat_interval": <int>, (心跳的时间间隔，单位为秒，值必须小于等于180)
        "auto_subscribe": true | false (true表示登陆成功后，服务器自动订阅所有已绑定设备；false则需要通过下面的“用户定阅设备消息”协议选择订阅设备，默认值为true。推荐设为false，然后按需定阅设备以节省开销)
    }
}

```


<p>云端 ⇒ 浏览器。云端向浏览器回复以下的JSON字符串。</p>


```
{
    "cmd": "login_res",
    "data":
    {
        "success": true | false （true为登陆成功，false登陆失败）
    }
}
```
 
 
## 2. 用户定阅设备消息 

用户只有订阅了已绑定的设备消息，才可以接收与设备相关的消息。本指令只适用于登陆参数auto_subscribe: false的场景。

浏览器 ⇒ 云端。浏览器向云端发送以下的JSON字符串定阅设备消息。

```
{
    "cmd": "subscribe_req",
    "data": 
    [
        {"did": <str> },（需要定阅的设备did1）
        {"did": <str> },（需要定阅的设备did2）
        ……
    ]
}
```

云端 ⇒ 浏览器。云端向浏览器发送以下的JSON字符串返回定阅结果。

```
{
    "cmd": "subscribe_res",
    "data": 
    {
        "success": 
        [
            {
                "did": <str>,（对应请求的设备did1）
                "error_code": 0,（0表示成功）
                "msg": <str>（描述文本）
            },
            {
                "did": <str>,（对应请求的设备did2）
                "error_code": 0,（0表示成功）
                "msg": <str>（描述文本）
            },
            ……
         ],
         “failed”: 
         [
            {
                "did": <str>,（对应请求的设备did1）
                "error_code": <int>,（订阅失败的错误码）
                "msg": <str>（描述文本）
            },
            {
                "did": <str>,（对应请求的设备did2）
                "error_code": <int>,（订阅失败的错误码）
                "msg": <str>（描述文本）
            },
            ……
         ]
    }
}
```

## 3. 设备上线下线通知 

当设备上线或下线时，云端会主动发送通知到浏览器。

云端 ⇒ 浏览器。云端向浏览器发送以下的JSON字符串通知设备上线或下线。


```
{
    "cmd": "s2c_online_status",
    "data": 
    {
        "did": <str>,（上下线设备的did）
        "passcode": <str>,（上下线设备的passcode）
        "mac": <str>,（上下线设备的mac）
        "online": true | false （true表示设备上线，false表示设备下线）
    }
}

```

## 4. 设备绑定解绑状态变更通知

当设备被用户绑定或者解绑后,云端会下发此消息通知浏览器。

云端 ⇒ 浏览器。云端向浏览器发送以下的JSON字符串通知有绑定或解绑事件发生。

```
{
    "cmd": "s2c_binding_changed",
    ￼"data":
    {
        "did": <str>, (设备的did)
        "bind": true | false (true表示绑定,false表示解绑)
￼    }
}
￼
```

## 5. 浏览器与云端的数据交互（数据透传）

浏览器可以和云端交互任意符合协议的数据。协议的格式为请参考其它协议文档。
当用户在登 陆时参数"p0_type"的值等于"custom"时，只能以这种方式和云端交互数据。

浏览器 ⇒ 云端。浏览器向云端发送以下的JSON字符串。 


```
{
    "cmd": "c2s_raw",
    "data": 
    {
        "did": <str>, （目标设备的did）
        "raw": [<byte>, <byte>, ...] （自定义业务逻辑指令的内容，以byte数组方式传送，每个byte的范围必须为 0~255。该内容必须要以[0, 0, 0, 3, varLen(1~4B), 0, 0, 144]开头）
    }

}
```


若想云端往设备转发数据，raw的值需要加上以下的协议前缀再接上发往设备的数据，即[0, 0, 0, 3, varLen(1 ~ 4B), 0, 0, 144] + 发往设备的数据，其中的varLen为可变长度，由1 ~ 4个字节(B)表示本可变长度字段后一直到数据包结尾的字节数 ，如长度小于128B，直接用一个字节(B)表示长度即可，长度大于等于128B的编码解码方式请参考MQTT V3.1协议的可变长度（Remaining Length）定义。cmd为0x90/0x93/0x94等。  


云端 ⇒ 浏览器。当云端收到设备上传的数据后，云端向浏览器转发以下的JSON字符串，数据放在raw字段中。注意，即使是登陆参数​"p0_type"​的值等于​"attrs_v4"​时，设备以“透传业务指令”上报的数据指令或中控相关的操作指令也会以本指令发往浏览器。
```
{
    "cmd": "s2c_raw", 
    "data":
    {
        "did": <str>,（数据来源设备的did）
        "raw": [<byte>, <byte>, ...]（自定义业务逻辑指令的内容，以byte数组方式传送，每个byte的范围必须为 0~255）
    }
}
```

若该数据为设备上报的数据，raw的值会带上一个协议前缀，即[0, 0, 0, 3, varLen(1~4B), 0, 0, 145] + 设备数据，其中的varLen为可变长度，定义请参考上文。 cmd为0x91/0x93/0x94等。

## 6. 标准数据点操作（读、写、通知、ACK)

当用户在登陆时参数"p0_type"的值等于"attrs_v4"时，云端会以标准数据点协议的方式和浏览器交互。   

浏览器 ⇒ 云端。浏览器向云端发送以下的JSON字符串，读取目标设备当前的状态。陆参数"p0_type"​的值等于​"custom"​时不允许使用本指令。


```
{
    "cmd": "c2s_read",
    "req_sn": <int>, (可选参数,若有值下发指令为带ACK的业务透传指令 [0x0093],若无则为不带ACK的业务
￼透传指令 [0x0090])
    "data":
    {
        "did": <str>,（目标设备的did）
        "names": [<str>, <str>, …] （变长数据点可选参数：传入需要读取的数据点名称，参数省略表示读取全部数据点；定长数据点读操作忽略该参数）
    }
}
```

浏览器 ⇒ 云端。浏览器向云端发送以下的JSON字符串，控制目标设备（更改目标设备的状态）。登陆参数​"p0_type"​的值等于​"custom"​时不允许使用本指令。


```
{
    "cmd": "c2s_write",
    "req_sn": <int>, (可选参数,若有值下发指令为带ACK的业务透传指令 [0x0093],若无则为不带ACK的业务
透传指令 [0x0090])
    "data":
    {
        "did": <str>,（目标设备的did）
        "attrs": 
        {
            "name1": <value1>, (“name1”指数据点的标识名(name)，<value1>指数据点的值。值可以为true/false(bool)，Unicode编码的字符串如\u62bd(enum)，数字或byte数组(如 [23,2,3]，用于扩展类型))
            "name2": <value2>,
            ...
        }
    }
}
```

云端 ⇒ 浏览器。设备收到读取指令或状态发生变化后，会主动发送当前状态到云端，云端向浏览器转发以下的JSON字符串。 登陆参数​"p0_type"​的值等于​"custom"​时不会收到本指令。

```
{
    "cmd": "s2c_noti",
    "req_sn": <int>, (非必须参数,若设备发送带ACK透传业务指令 [0x0093],则包含本字段,浏览器须带上本
字段的值回复c2s_ack。res_sn与req_sn参数不能同时并存)
    "res_sn": <int>, (非必须参数,若浏览器发送的c2s_read或c2s_write请求指令带有req_sn参数,则对应响应
指令s2c_noti包含res_sn字段且值与req_sn一致。res_sn与req_sn参数不能同时并存)
    "data": 
    { 
        "did": <str>,（数据来源设备的did）         
        "attrs": 
        {
            "name1": <value1>, (“name1”指数据点的标识名(name)，<value1>指数据点的值。值可以为true/false(bool)，Unicode编码的字符串如\u62bd(enum)，数字或byte数组(如 [23,2,3]，用于扩展类型))
            "name2": <value2>,
             ...          
        }
    } 
} 
```

云端 ⇒ 浏览器。浏览器发送带有req_sn的读取或写指令后 [0x0093],可能会收到设备对透传指 令的ACK [0x0094](另一种可能是收到带有响应内容和res_sn的s2c_noti指令),云端向浏览器 转发以下的JSON字符串。登陆参数​"p0_type"​的值等于​"custom"​时不使用本指令。

```
{
    ￼"cmd": "s2c_ack",
    "res_sn": <int>, (对应浏览器读取或写指令的req_sn)
    ￼"did": <str>(设备did)
￼
}
```

浏览器 ⇒ 云端。浏览器收到带有req_sn的s2c_noti消息后 [0x0093],需要浏览器向云端发送以下 的JSON字符串[0x0094]。登陆参数​"p0_type"​的值等于​"custom"​时不允许使用本指令。

```
{
    ￼"cmd": "c2s_ack",
    "res_sn": <int>, (对应浏览器接收到s2c_noti指令的req_sn)
    ￼"did": <str>(目标设备did)
￼
}
```

## 7. 心跳
  
浏览器和云端建立Web Socket连接后，需要在登陆参数"heartbeat_interval"指定的时间间隔内，定期向云端发送心跳。云端收到后会回复心跳。
    
浏览器 ⇒ 云端。浏览器向云端发送以下的JSON字符串。


```
{
    "cmd": "ping"
}
```
  
云端 ⇒ 浏览器。云端向浏览器回复以下的JSON字符串。
```
{
    "cmd": "pong"
}
```

## 8. 非法消息通知

当浏览器向云端发送的消息不合法或收到设备上报的数据不合法时,云端会下发此消息通知浏览器。

云端 ⇒ 浏览器。云端向浏览器发送以下的JSON字符串通知有非法消息。


```
{
    "cmd": "s2c_invalid_msg", 
    "data": 
    {
        "error_code": <int> ​(错误码)
        "msg": <str> ​(描述文本)
    }
}
```
