title:  SNoti API
---
v2.1.6

# 目的
企业客户可通过SNoti提供的安全数据传输通道，实时的接收设备的数据，用于设备信息归类整理，设备状态统计，设备监控等；也可以通过远程控制功能，实时发送业务指令控制在线设备。

# Demo
1.代码仓库：https://github.com/gizwits/noti-java-demo/tree/v2.0.0

2.登陆参数配置：请在src/main/resources/application.properties文件中，修改相应的参数，如：productKey, authId, authSecret

# SNoti申请流程

1.企业开发者登陆开发者中心，选择添加服务，如下图
![添加](/assets/zh-cn/cloud/添加SNoti服务.png)

2.点击上图箭头指向的SNoti服务，进入下一步，申请开通服务
![添加](/assets/zh-cn/cloud/开通SNoti服务.png)

3.成功添加SNoti服务后，在服务页面点击“新建授权”创建，该 auth_id 拥有获取该产品下所有设备消息和控制设备的权限；
![添加](/assets/zh-cn/cloud/添加api.png)

# 关键术语
1.auth_id & auth_secret: 产品授权ID和密钥，一个产品可创建多个auth_id，一个auth_id对应唯一的一个产品；SNoti客户端登陆时，会验证auth_id和auth_secret的正确性；

2.subkey：消息分发机制，以ProductKey + subkey作为唯一主键，不同主键之间，消息互不影响（即同一个ProductKey使用不同的subkey，可产生消息副本）；subkey(subscription key)为自定义字符串，大小写敏感，长度为 1 到 32 个字符，可包含数字，字母和下划线（即[a-zA-Z0-9]）；

3.产品的7种消息类型（event_type）分别为：
- device.online：设备上线消息
- device.offline：设备下线消息
- device.status.raw：设备上报自定义透传业务指令
- device.status.status.kv：设备上报数据点业务指令
- device.attr_fault：设备故障事件
- device.attr_alert：设备报警事件
- datapoints.changed：数据点编辑事件
- center_control.sub_device_added: 中控添加子设备事件
- center_control.sub_device_deleted: 中控删除子设备事件

# 过程描述
事件通过 SSL 接口推送。通讯过程如下：

1.客户端以 Client 的身份与本接口（Gizwits Platform）建立 SSL 连接。客户端无需提供证书，只需要信任服务器证书即可；

2.客户端发送登录指令完成验证；

3.服务端推送消息到客户端。推送工作方式：
- 相同 product_key + subkey 的多个客户端登录连接，消息轮流推送到各客户端；
- 相同 product_key，不同 subkey 的客户端都能接收该 product 下设备的指定类型的消息副本，客户端之间不会相互干扰；
- 当某客户端未返回的 ack 消息数达到该客户端登录设置的 prefetch_count 值后，消息将不在继续推送给该客户端，但会发送到其他客户端；
- 未返回 ack 的消息，服务端会一直等待不会重发，只有在该客户端断开的情况下，未 ack 的消息会重新发送到连接的客户端；
- 当所有客户端都断开连接后，后续设备的消息会保存在服务端，等待客户端下次接收。

4.客户端实时接受事件消息，并向服务器 ack 事件消息；

5.当客户端在一定时间范围内没有向服务器发送任何消息，需要发 ping 心跳请求，服务器回复 pong 心跳响应。

# 接口协议
- 域名：snoti.gizwits.com
- SSL 服务端口：2017

消息内容为二进制数据，UTF-8 编码。请注意每个消息后都必须添加"\n"作为消息结尾符。
## 1.  连接与登陆
客户端和 Gizwits Platform 建立 SSL 连接后，客户端发送以下字符串内容作身份验证(登陆Gizwits Platform)：

```json
{
"cmd": "login_req",
"prefetch_count":<uint> (0 < prefetch_count <= 32767, 表示推送没有 ACK 的消息
的最大个数，可不填，默认值是 50)
"data": [{
“product_key": <key string>,
"auth_id": <auth_id string>,
"auth_secret": <auth_secret string>,
"subkey": <subkey string>,
"events":[<event string>,...] (可一个或多个 event)
},...] (可一个或多个 product)
}\n
```

请求字段说明：


| 字段      | 是否必须         |             描述           | 
| ------------- |:-------------:|    -------------    |  
| cmd     | 必须   | 登录类型，必须为login_req| 
| prefetch_count  | 	非必须     | 默认值为50| 
| data.product_key| 必须 	| 产品ID| 
| data.auth_id	| 必须 	| 产品授权ID| 
| data.auth_secret 	| 必须 	| 产品授权密匙| 
| data.subkey | 必须 	| subscription key，为客户端自定义标识，大小写敏感，长度为 1 到 32 个字符，可包含数字，字母和下划线| 
| data.events	| 必须 	|客户端接收消息类型，使用逗号隔开的字符串列表，目前支持类型 为device.attr_fault;device.attr_alert;device.online;device.offline   device.status.raw;device.status.kv;datapoints.changed   center_control.sub_device_added;center_control.sub_device_deleted|


Gizwits Platform 回复：
```json
{
"cmd": "login_res",
"data": {
"result": true | false,
"msg": "ok" | <error msg>
}
}\n
```
如 result 为 false 表示登陆失败，该连接会被关闭。

## 2.  心跳

客户端和 Gizwits Platform 建立 SSL 连接后，需定期向 Gizwits Platform 发送数据以保持连接的有效性，如 5 分钟内没有向 Gizwits Platform 发送任何数据，应向 Gizwits Platform 发送以下的心跳数据：
```json
{
"cmd": "ping"
}\n
```
Gizwits Platform 回复：
```json
{
"cmd": "pong"
}\n
```
如没有及时收到 Gizwits Platform 的回复，可以认为与 Gizwits Platform 的连接已关闭，需重连。
## 3.  控制设备
客户端和 Gizwits Platform 建立 SSL 连接后，客户端可发送以下字符串内容，控制设备：
```json
{
"cmd": "remote_control_req",
"msg_id": <msg id string>,
"data": [{
“cmd": "write_attrs" | "write" | "write_v1",
"data": {
"did": <did string>,
"mac": <mac string>,
"product_key": <product_key string>,
"attrs": {
"name1": <value1>,("name1"指数据点的标识名(name)，<value1>指数据点的值。值可以为true/false(bool)，Unicode编码的字符串如\u62bd(enum)，数字或byte数组(如 [23,2,3]，用于扩展类型))
"name2": <value2>,
… …
}(Only used with cmd "write_attrs")
OR
"raw": [<byte>, <byte>, <byte>, … ...](Only used with cmd "write" or "write_v1")
}
},...] (可一个或多个控制指令)
}\n
```
请求字段说明：

| 字段      | 是否必须         |             描述           | 
| ------------- |:-------------:|    -------------    |  
| cmd     | 必须   | 控制设备，必须为 remote_control_req| 
| msg_id  | 可选  | 可用于标识本消息，将会在回复指令中返回|
| data  | 必须 	| 控制指令，数组类型| 
| data.cmd| 必须 	| V4 产品数据点协议格式，填写write_attrs；V4 产品自定义协议格式，填写 write；V1 产品协议格式，填写 write_v1| 
| data.source	| 必须 	| 固定填写 noti| 
| data.data.did 	| 必须 	| 设备 ID| 
| data.data.mac	| 必须 	| 设备 Mac 地址,长度为 12 的字符串，大小写敏感| 
| data.data.product_key	| 必须 	|设备所属产品的标识码| 
| data.data.attrs / data.data.raw	| 必须 	| V4 产品数据点协议格式，选择data.data.attrs；V4 产品自定义协议格式（参考通用数据点协议之透传业务指令），选择data.data.raw；V1 产品协议格式，选择 data.data.raw| 


Gizwits Platform 回复：
```json
{
"cmd": "remote_control_res”,
"msg_id": <msg id string>,
“result": {
"succeed": ["did1", "did2", … …]
"failed": [
{"did3": <reason str>}
{"did4": <reason str>}
… …
]
}
}\n
```

其中msg_id的内容为请求消息中msg_id字段的内容，如请求消息中不存在该字段，回复消息中将不会出现该字段。
如协议自身引起的错误，Gizwits Platform 回复 错误响应消息，该消息格式参见下文。

## 4.  推送事件
#### 数据点编辑事件
```json
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "datapoints_changed",
"product_key": <product_key string>,
"created_at"：<timestamp in seconds, float>
}\n
```
#### 设备上线事件
```json
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(用于 ACK)
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
#### 设备下线事件

```json
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "device_offline",
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"group_id": <group_id string>,
"created_at"：<timestamp in seconds, float>
}\n
```
#### 故障与报警事件
当有故障与报警事件发生，Gizwits Platform 会向客户端推送以下消息：

```json
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "attr_fault" | "attr_alert",
"event_id": <uuid string>, (同一设备的同一故障或报警的发生事件与恢复事件共享同一事件 id)
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"group_id": <group_id string>,
"created_at"：<timestamp in seconds, float>,
"data": {
"attr_name": <故障或报警数据点标识名>,
"attr_displayname": <故障或报警数据点显示名称>
"value": 0 | 1 (0 表示从故障恢复或报警取消，1 表示发生了故障或报警)
}
}\n
```
#### 设备状态事件

```json
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "device_status_raw",
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"group_id": <group_id string>,
"created_at"：<timestamp in seconds, float>,
"data": <base64 encoding string> (设备状态原始数据 base64 编码字符串)
}\n
```

如该产品支持数据点解释(机智云通用数据点协议或自定义数据点协议)，则消息格式为message format:

```json
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "device_status_kv",
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"group_id": <group_id string>,
"created_at"：<timestamp in seconds, float>,
"data": {
<key1 string>: <value1>,
<key2 string>: <value2>,
...
}
}
```
#### 中控添加子设备事件

```json
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(用于ACK)
"event_type": "sub_device_added",
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"child_product_key": <product_key string>,
"child_did": <did string>,
"child_mac": <mac string>,
"child_passcode": <str, AES encrypted, see below>,
"created_at"：<timestamp in seconds, float>
}\n
```
其中child_passcode采用AES加密，
AES补码方式为pcks7padding
AES key为中控passcode的md5值（16 bytes）
AES mode为AES.MODE_ECB

#### 中控删除子设备事件

```json
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(用于ACK)
"event_type": “sub_device_deleted”,
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
            "child_product_key": <product_key string>,
"child_did": <did string>,
"child_mac": <mac string>,
"created_at"：<timestamp in seconds, float>
}\n
```
#### 事件 ACK

客户端每收到一事件消息都需要回复以下 ACK 消息：
```json
{
"cmd": "event_ack",
"delivery_id": <delivery_id> (按原数据类型填写)
}\n
```
如 Gizwits Platform 没有收到客户端的回复，该事件会重复推送直至收到 ACK 或过期为止。一般情况下事件按发生时间顺序推送，当prefetch_count > 1 时，有可能因某事件没有 ACK而导致重发而表现为事件没有按时间顺序到达，例如先收到故障恢复或报警取消的事件，所以客户端开发者在处理时应比较 event_id 和 created_at 的值。

## 5.  错误响应
当客户端发送的消息 Gizwits Platform 不能识别时，Gizwits Platform 返回以下的消息：
```json
{
"cmd": "invalid_msg"
“error_code”: <code int>
"msg": <msg string>
}\n
```
客户端开发者应检查客户端发出的消息内容是否正确（注意：如果客户端没有在消息结尾添加"\n"，服务器端会认为还没有收到完整的消息而继续等待更多的消息内容）。

# subkey管理
用户使用过程中，需要关注当前使用到的subkey有哪些，并且对不再使用的subkey，要尽快清理，避免不必要的资源浪费。subkey的获取和删除，采用Http API的方式请求。
- 域名：snoti.gizwits.com
- Http API端口：2018

## 1. 获取subkey
http://swagger.gizwits.com/doc/index/snoti_api_operator#!/product/get_v1_products_product_key_subkey
## 2. 删除subkey
http://swagger.gizwits.com/doc/index/snoti_api_operator#!/product/delete_v1_products_product_key_subkey

# FAQ

## 1. SNoti客户端接收的设备数据，需要遵循怎样的格式？
a.未使用数据点协议的设备，协议命令字为0x0091、0x0093、0x0094均可透传到SNoti；

b.使用通用数据点协议的设备，协议命令字在满足0x0091、0x0093、0x0094外，业务指令的首位命令字需要满足以下之一：
- 0x04，业务指令需满足数据点格式定义
- 0x06，业务指令透传

## 2. SNoti客户端控制设备时，发送的Raw指令，对应机智云协议的哪一部分？
Raw指令指的是，协议命令字0x0090之后的所有指令，不包括0x0090。值得注意的是，当使用通用数据点透传指令时，Raw指令以0x05开头。

## 3. 设备离线后，SNoti客户端控制设备，当设备再次上线，是否可以接收到控制指令？
不可以。

## 4. Raw指令的[0-255]是什么意思？必须是十进制？如果是负数，怎么处理？
协议中一个字节（1B）能表示的整数范围是：无符号整数0\~255或带符号整数-128\~127。在SNoti协议中，使用无符号整数表示单个字节内容。部分程序语言将带符号正数转换无符号整数方法：result = bytes & 0xff。

## 5. 中控项目是否可以使用SNoti？
a. SNoti不区分产品类型是否为中控产品，只需要对产品申请auth_id即可；

b. 需要接收中控网关的数据，就使用中控网关产品对应的auth_id；

c. 需要接收子设备的数据，就使用子设备产品对应的auth_id。
