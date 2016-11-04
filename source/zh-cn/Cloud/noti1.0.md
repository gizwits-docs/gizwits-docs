title:   消息代理1.0
---

# 服务地址
- 域名：noti.gizwitsapi.com
- 端口：2015

# 业务流程
 事件通过SSL接口推送。通讯过程如下：
1.客户端以Client的身份与本接口（Gizwits Platform）建立SSL连接。客户端无需提供证书，只需要信任服务器证书即可；
2.客户端发送登陆指令完成身份验证；
3.客户端实时接受事件消息，并向服务器ack事件消息；
4.当客户端在一定时间范围内没有向服务器发送任何消息，需要发ping心跳请求，服务器回复pong心跳响应。

# 接口协议

## 连接与登陆
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


## 心跳
客户端和Gizwits Platform建立SSL连接后，需定期向Gizwits Platform发送数据以保持连接的有效性，如5分钟内没有向Gizwits Platform发送任何数据，应向Gizwits Platform发送以下的心跳数据：如没有及时收到Gizwits Platform的回复，可以认为与Gizwits Platform的连接已关闭，需重连。

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



## 事件推送
客户端和Gizwits Platform建立SSL连接后，需定期向Gizwits Platform发送数据以保持连接的有效性，如5分钟内没有向Gizwits Platform发送任何数据，应向Gizwits Platform发送以下的心跳数据：如没有及时收到Gizwits Platform的回复，可以认为与Gizwits Platform的连接已关闭，需重连。

### 设备上线事件
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

### 设备下线事件
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

### 故障与报警事件
当有故障与报警事件发生，Gizwits Platform会向客户端推送以下消息：
```json
{
"cmd": "enterprise_event_push",
"delivery_id": <delivery_id>，(用于ACK)
"event_type": "attr_fault" | "attr_alert",
"event_id": <uuid string>, (同一设备的同一故障或报警的发生事件与恢复事件共享同一事件id)
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

### 设备状态事件
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
如该产品支持数据点解释(机智云通用数据点协议或自定义数据点协议)，则消息格式为
message format: 
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

### 事件ACK

客户端每收到一事件消息都需要回复以下ACK消息：
```json
{
"cmd": "enterprise_event_ack",
"delivery_id": <delivery_id> (按原数据类型填写)
}\n
```

4.错误响应
当客户端发送的消息Gizwits Platform不能识别时，Gizwits Platform返回以下的信息：
```json
{
"cmd": "invalid_msg"
"msg": <msg string>
}\n
```
客户端开发者应检查客户端发出的消息内容是否正确（注意：如果客户端没有在消息结尾添加"\n"，服务器端会认为还没有收到完整的消息而继续等待更多的消息内容）。




