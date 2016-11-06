title:   消息代理1.0
---

# 消息代理服务端地址
- 域名：noti.gizwitsapi.com
- 端口：2015

# 接入流程
 
1.客户端以请求服务端地址建立SSL连接。客户端无需提供证书，只需要信任服务器证书即可；
2.客户端发送登录请求完成身份验证；
3.客户端实时接受事件消息，并向服务器ack事件消息；事件实时推送到客户端；
4.当客户端在一定时间范围内没有向服务器发送任何消息，需要发ping心跳请求，服务器回复pong心跳响应。

# 接口协议

## 1、登录接口
客户端和消息代理服务建立SSL连接后，客户端发送以下报文内容进行身份验证

### 发送报文
```json
{
"cmd": "enterprise_login_req", 
"data": {
       "enterprise_id": <enterprise_id string>, 
       "enterprise_secret": <enterprise_secret string>,
       "prefetch_count": <uint> //0 < prefetch_count <= 32767, 表示推送没有ACK的消息的最大个数，建议值为5)
    }
}\n
```

### 返回报文：
```json
{
    "cmd": "enterprise_login_res", 
    "data": {
        "result": true | false, 
        "msg": "ok" | <error msg>
    }
}\n
```
如result为false表示登陆失败，该连接会被关闭。


## 2、心跳
客户端和消息代理服务端建立SSL连接后，需定期向消息代理服务端发送数据以保持连接的有效性，如5分钟内没有向消息代理服务端发送任何数据，应向消息代理服务端发送以下的心跳数据：如没有及时收到消息代理服务端的回复，可以认为与消息代理服务端的连接已关闭，必须要重新连接服务端。

### 发送报文
```json
{
   "cmd": "enterprise_ping"
}\n
```

### 返回报文：
```json
{
   "cmd": "enterprise_pong"
}\n
```



## 3、事件推送
客户端成功连接消息代理服务端后，当设备数据传输到机智云端，消息代理服务会迅速将设备相关数据实时推送给客户端。我们统称设备数据为事件，事件可以分为设备上线、下线、设备故障与告警、设备状态数据。根据这几种类型客户端可以根据业务需求去解析数据，做后续的业务处理。

### 3.1 设备上线事件
```json
{
  "cmd": "enterprise_event_push",
  "delivery_id": <delivery_id>，(用于ACK)
  "event_type": "device_online",
  "product_key": <product_key string>,
  "did": <did string>,
  "mac": <mac string>,
  "group_id": <group_id string>,
  "created_at"：<timestamp in seconds, float>，
  "ip": <ip string>,
  "country": <country string>,
  "region": <region string>,
  "city": <city string>
}\n
```

### 3.2 设备下线事件
```json
{
   "cmd": "enterprise_event_push",
   "delivery_id": <delivery_id>，(用于ACK)
   "event_type": "device_offline",
   "product_key": <product_key string>,
   "did": <did string>,
   "mac": <mac string>,
   "group_id": <group_id string>,
   "created_at"：<timestamp in seconds, float>
}\n
```

### 3.3 故障与报警事件
当设备发生故障与报警时，消息代理服务会向客户端推送以下消息：

```json
{
  "cmd": "enterprise_event_push",
  "delivery_id": <delivery_id>，(用于ACK)
  "event_type": "attr_fault" | "attr_alert",
  "event_id": <uuid string>, (同一设备的同一故障或报警的发生事件与恢复事件共  享同一事件id)
  "product_key": <product_key string>,
  "did": <did string>,
  "mac": <mac string>,
  "group_id": <group_id string>,
  "created_at"：<timestamp in seconds, float>, 
  "data": {
     "attr_name":  <故障或报警数据点标识名>,
     "attr_displayname":  <故障或报警数据点显示名称>
     "value": 0 | 1 (0表示从故障恢复或报警取消，1表示发生了故障或报警)
   }
}\n
```

### 3.4 设备状态事件
当设备主动将设备数据上报到云平台时，消息代理服务会向客户端推送设备的数据点数据或者自定义协议的数据 ：
```json
{
  "cmd": "enterprise_event_push",
  "delivery_id": <delivery_id>，(用于ACK)
  "event_type": "device_status_raw",
  "product_key": <product_key string>,
  "did": <did string>,
  "mac": <mac string>,
  "group_id": <group_id string>,
  "created_at"：<timestamp in seconds, float>, 
  "data": <base64 encoding string> (设备状态原始数据base64编码字符串)
}\n
```

如该产品支持数据点协议(机智云通用数据点协议或自定义数据点协议)，则设备数据的消息将以JSON格式展示：
```json 
{
  "cmd": "enterprise_event_push",
  "delivery_id": <delivery_id>，(用于ACK)
  "event_type": "device_status_kv",
  "product_key": <product_key string>,
  "did": <did string>,
  "mac": <mac string>,
  "group_id": <group_id string>,
  "created_at"：<timestamp in seconds, float>,
  "data":  {
     <key1 string>: <value1>,
     <key2 string>: <value2>,
     ...
   }
}
```

## 4、事件ACK
客户端每收到一事件消息都需要回复以下ACK消息：
```json
{
  "cmd": "enterprise_event_ack",
  "delivery_id": <delivery_id> (按原数据类型填写)
}\n
```

## 5、错误响应
当消息代理服务无法识别客户端发送的消息时，消息代理服务返回以下的信息：
```json
{
  "cmd": "invalid_msg"
  "msg": <msg string>
}\n
```
客户端开发者应检查客户端发出的消息内容是否正确（注意：如果客户端没有在消息结尾添加"\n"，服务器端会认为还没有收到完整的消息而继续等待更多的消息内容）。

## 6、客户端Demo
该Demo代码已实现了如何接入消息代理服务，已封装好了登录鉴权、心跳、消息ACK等基本功能，企业只需将main函数中的eid,esecret修改为企业自己的即可运行。Demo代码请点击 [Demo code](https://github.com/gizwits/noti-java-demo/tree/master) 下载
```java
public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
        
        String enterpriseId = "8fb23e6dbf06438b8200cf4588e";  //修改为您的企业的eid参数
        String enterpriseSecret = "c7c9e01549004b96a8612a0ed6";//同上
        new GizwitsNoti(enterpriseId, enterpriseSecret, 
                        new CallBack() {
                            public void call(JSONObject msg)    
                            {
                                System.out.println( msg.toString() );  
                            }
                        }).connect();
    }

```


## 7、FAQ
### 7.1 IP白名单
客户端需要将请求消息代理服务端的请求IP设置到IP白名单中，具体的设置方法请参考：
[@设置IP白名单](/zh-cn/Cloud/ent_dev.html)


### 7.1 心跳与重连机制
客户端要实现心跳机制，包括连接中断后的重连机制，如果断开连接后，没有及时检测并重连，会导致设备数据的堆积。建议使用Demo Code进行开发





