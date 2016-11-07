title: Websocket API 指南
---

# 1. 通讯模型 

浏览器（Javascript）可以通过Web Socket API与机智云云端直接通讯。浏览器（Javascript）通过 Web Socket API，可以控制设备和实时接收设备上报的数据。 

![通信模型](/assets/zh-cn/cloud/通信模型.jpg)

# 2. 通讯流程 

浏览器（Javascript）通过Web Socket API与云端通讯主要包括以下的通讯过程。

* 用户登陆：用户通过从Http API获得的uid和token登陆云端。
* 接收设备上线下线消息：只有绑定设备后才能控制设备。 
* 发送和接收设备业务逻辑数据：
* 心跳：浏览器（Javascript）定期向云端发送心跳，云端回复心跳响应。


# 3. 约定 


## 3.1. 协议阅读说明 

● &lt;str&gt;表示字符串占位符，&lt;int&gt;表示整型数据占位符。


## 3.2. 云端Web Socket服务地址 
```
ws://&lt;m2m_host&gt;:8080/ws/app/v1 
```
其中的&lt;m2m_host&gt;为绑定设备列表中的host字段的值，如”m2m.gizwits.com”或”sandbox.gizwits.com”，请参考获取绑定设备列表HTTP API。


## 3.3. 注意事项  

* 在与云端进行Web Socket交互前，用户必须已注册并已绑定了设备。 
* 与云端交互的数据均为JSON字符串,以UTF-8的方式编码。可以通过JSON.stringify(json)把Javascript对象转化为字符串再发送给云端，或通过var res = JSON.parse(evt.data)把接收到的字符串数据转化成Javascript对象。
* Web Socket的测试程序请使用http://&lt;m2m_host&gt;:8080/app (​&lt;m2m_host&gt;为绑定设备列表中的host字段的值)， 也可以查看这个网页的源代码作为示例代码参考。


# 4. 通讯协议 

## 4.1. 用户登陆 

浏览器（Javascript）必须登陆后才能和云端作进一步的交互。 

浏览器 ⇒ 云端。浏览器向云端发送以下的JSON字符串。

```
{
    "cmd": "login_req",
    "data":
    {
        "appid": &lt;str&gt;, 
        "uid": &lt;str&gt;,
        "token": &lt;str&gt;,
        "p0_type": "attrs_v4"|"custom", ("attrs_v4" 指通过标准数据点协议的方式和云端交互，见下文“标准数据点操作”部分。"custom"表示使用自定义业务逻辑协议的方式与云端交互，见下文“浏览器与云端的数据交互”部分。) 
        "heartbeat_interval": &lt;int&gt; (心跳的时间间隔，单位为秒，值必须小于等于180)
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
 
 
## 4.2. 设备上线下线通知 

当设备上线或下线时，云端会主动发送通知到浏览器。

云端 ⇒ 浏览器。云端向浏览器发送以下的JSON字符串通知设备上线或下线。


```
{
    "cmd": "s2c_online_status",
    "data": 
    {
        "did": &lt;str&gt;,（上下线设备的did）
        "passcode": &lt;str&gt;,（上下线设备的passcode）
        "mac": &lt;str&gt;,（上下线设备的mac）
        "online": true | false （true表示设备上线，false表示设备下线）
    }
}

```  


## 4.3. 浏览器与云端的数据交互（数据透传）

浏览器可以和云端交互任意符合协议的数据。协议的格式为请参考其它协议文档。
当用户在登 陆时参数"p0_type"的值等于"custom"时，只能以这种方式和云端交互数据。

浏览器 ⇒ 云端。浏览器向云端发送以下的JSON字符串。 


```
{
    "cmd": "c2s_raw",
    "data": 
    {
        "did": &lt;str&gt;, （目标设备的did）
        "raw": [&lt;byte&gt;, &lt;byte&gt;, ...] （自定义业务逻辑指令的内容，以byte数组方式传送，每个byte的范围必须为 0~255。该内容必须要以[0, 0, 0, 3, varLen(1~4B), 0, 0, 144]开头）
    }  
}
``` 


若想云端往设备转发数据，raw的值需要加上以下的协议前缀再接上发往设备的数据，即[0, 0, 0, 3, varLen(1~4B), 0, 0, 144] + 发往设备的数据，其中的varLen为可变长度，由1~4个字节(B)表示本可变长度字段后一直到数据包结尾的字节数 ，如长度小于128B，直接用一个字节(B)表示长度即可，长度大于等于128B的编码解码方式请参考MQTT V3.1协议的可变长度（Remaining Length）定义。  


云端 ⇒ 浏览器。当云端收到设备上传的数据后，云端向浏览器转发以下的JSON字符串，数据放在raw字段中。登陆参数​"p0_type"​的值等于​"attrs_v4"​时,设备以“透传业务指令”上报的数据会以本指令发往浏览器。
```
{
    "cmd": "s2c_raw", 
    "data":
    {
        "did": &lt;str&gt;,（数据来源设备的did）
        "raw": [&lt;byte&gt;, &lt;byte&gt;, ...]（自定义业务逻辑指令的内容，以byte数组方式传送，每个byte的范围必须为 0~255）
    }
}
``` 

若该数据为设备上报的数据，raw的值会带上一个协议前缀，即[0, 0, 0, 3, varLen(1~4B), 0, 0, 145] + 设备数据，其中的varLen为可变长度，定义请参考上文。 

## 4.4. 标准数据点操作（读、写、通知）

当用户在登陆时参数"p0_type"的值等于"attrs_v4"时，云端会以标准数据点协议的方式和浏览器交互。   

浏览器 ⇒ 云端。浏览器向云端发送以下的JSON字符串，读取目标设备当前的状态。陆参数"p0_type"​的值等于​"custom"​时不允许使用本指令。


```
{
    "cmd": "c2s_read",
    "data":
    {
        "did": &lt;str&gt;（目标设备的did）
    }
}
```   

浏览器 ⇒ 云端。浏览器向云端发送以下的JSON字符串，控制目标设备（更改目标设备的状态）。登陆参数​"p0_type"​的值等于​"custom"​时不允许使用本指令。


```
{
    "cmd": "c2s_write",
    "data":
    {
        "did": &lt;str&gt;,（目标设备的did）
        "attrs": 
        {
            "name1": &lt;value1&gt;, (“name1”指数据点的标识名(name)，&lt;value1&gt;指数据点的值。值可以为true/false(bool)，Unicode编码的字符串如\u62bd(enum)，数字或byte数组(如 [23,2,3]，用于扩展类型))
            "name2": &lt;value2&gt;,
            ...
        }
    }
}
```   

云端 ⇒ 浏览器。设备收到读取指令或状态发生变化后，会主动发送当前状态到云端，云端向浏览器转发以下的JSON字符串。 登陆参数​"p0_type"​的值等于​"custom"​时不会收到本指令。

```
{
    "cmd": "s2c_noti",     
    "data": 
    { 
        "did": &lt;str&gt;,（数据来源设备的did）         
        "attrs": 
        {
            "name1": &lt;value1&gt;, (“name1”指数据点的标识名(name)，&lt;value1&gt;指数据点的值。值可以为true/false(bool)，Unicode编码的字符串如\u62bd(enum)，数字或byte数组(如 [23,2,3]，用于扩展类型))
            "name2": &lt;value2&gt;,
             ...          
        }
    } 
} 
```


## 4.5. 心跳
  
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

## 4.6. 非法消息通知

当浏览器向云端发送的消息不合法或收到设备上报的数据不合法时,云端会下发此消息通知浏览器。

云端 ⇒ 浏览器。云端向浏览器发送以下的JSON字符串通知有非法消息。


```
{
    "cmd": "s2c_invalid_msg", 
    "data": &lt;str&gt; ​(描述文本)
}

```
