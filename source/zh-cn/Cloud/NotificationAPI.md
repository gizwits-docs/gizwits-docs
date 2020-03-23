title:  SNoti API
---
v2.5.0

# 目的
企业客户可通过SNoti提供的安全数据传输通道，实时的接收设备的数据，用于设备信息归类整理，设备状态统计，设备监控等；也可以通过远程控制功能，实时发送业务指令控制在线设备。

# 客户端示例（开源社区版本）
用户可根据需要，适当选择以下任意一种开发语言的客户端版本，基于此做二次开发，或者作为参考。

1.Java版客户端

  代码仓库：https://github.com/smallCC/noti-client

2.Ruby版客户端

  代码仓库：https://github.com/AbelLai/gizwits_sac_rb

3.Python版客户端

  代码仓库：https://github.com/wangzhenandy/snoti_client_python

# SNoti申请流程

1.企业开发者登陆开发者中心，选择添加服务，如下图
![添加](/assets/zh-cn/cloud/添加SNoti服务.png)

2.点击上图箭头指向的SNoti服务，进入下一步，申请开通服务
![添加](/assets/zh-cn/cloud/开通SNoti服务.png)

3.成功添加SNoti服务后，在服务页面点击“新建授权”创建，该 auth_id 拥有获取该产品下所有设备消息和控制设备的权限；
![添加](/assets/zh-cn/cloud/添加api.png)

# 关键术语
1.auth_id & auth_secret: 产品授权ID和密钥，一款产品可创建多个auth_id，一个auth_id对应唯一的一款产品；SNoti客户端登陆时，会验证auth_id和auth_secret的正确性；

2.subkey：消息分发机制，以ProductKey + subkey作为唯一主键，不同主键之间，消息互不影响（即同一个ProductKey使用不同的subkey，可产生消息副本）；subkey(subscription key)为自定义字符串，大小写敏感，长度为 1 到 32 个字符，可包含数字，字母和下划线（即[a-zA-Z0-9]）；

3.产品的17种消息类型（event_type）分别为：

- device.online：设备上线消息
- device.offline：设备下线消息
- device.status.raw：设备上报自定义透传业务指令
- device.status.kv：设备上报数据点业务指令
- device.attr_fault：设备故障事件
- device.attr_alert：设备报警事件
- datapoints.changed：数据点编辑事件
- center_control.sub_device_added: 中控添加子设备事件
- center_control.sub_device_deleted: 中控删除子设备事件
- device.bind：设备绑定消息
- device.unbind: 设备解绑消息
- device.reset：设备重置消息
- device.file.download：设备文件下载消息
- device.app2dev.raw: 控制设备自定义透传业务指令
- device.app2dev.kv: 控制设备数据点业务指令
- device.gps.kv：设备的gps解析数据
- device.lbs.kv:：设备的lbs解析数据

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

6.客户端可发送远程控制指令，来控制设备。SNoti服务会在客户端登录时，缓存每一个product_key对应的M2M信息，用于给设备发送控制指令。特别注意的是，当产品正式发布后，需要重启SNoti客户端，以更新M2M的信息。
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


| 字段             | 是否必须 | 描述                                                         |
| ---------------- | :------: | ------------------------------------------------------------ |
| cmd              |   必须   | 登录类型，必须为login_req                                    |
| prefetch_count   |  非必须  | 默认值为50                                                   |
| data.product_key |   必须   | 产品ID                                                       |
| data.auth_id     |   必须   | 产品授权ID                                                   |
| data.auth_secret |   必须   | 产品授权密匙                                                 |
| data.subkey      |   必须   | subscription key，为客户端自定义标识，大小写敏感，长度为 1 到 32 个字符，可包含数字，字母和下划线 |
| data.events      |   必须   | 客户端接收消息类型，使用逗号隔开的字符串列表，目前支持类型 为device.attr_fault;device.attr_alert;device.online;device.offline;   device.status.raw;device.status.kv;datapoints.changed;   center_control.sub_device_added;center_control.sub_device_deleted;   device.bind;device.unbind;device.reset;device.file.download; device.app2dev.raw;device.app2dev.kv |


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
## 3. 订阅和取消订阅

客户端在成功登陆后，可以订阅想要接受的设备数据类型，需要经过安全校验。或者取消订阅接受的数据类型。

客户端订阅下发数据格式：

```json
	{
		"cmd":"subscribe_req",
		"data":[
	  		{"product_key": <str>,
   		"subkey": <str>,
   		"auth_id": <str>,
			"auth_secret": <str>,
   		"events": [<event string>]
  		},...
		]
}\n
```

服务端返回：

```json
{
		"cmd":"subscribe_res",
		"result": true|false,
		"msg":"ok"|<error msg>,
		"data": 同订阅内容
}\n
```

客户端取消订阅下发数据格式：

```json
{
		"cmd":"unsubscribe_req",
		"data":[
  		{"product_key": <str>,
   		"subkey": <str>,
   		"auth_id": <str>,
   		"events": [<event string>]
  		},...
		]
}\n
```

服务端返回：

```json
{
		"cmd":"unsubscribe_res",
		"result": true|false,
		"msg":"ok"|<error msg>,
		"data": 同取消订阅内容
}\n
```

## 4.  控制设备

客户端和 Gizwits Platform 建立 SSL 连接后，客户端可发送以下字符串内容，控制设备：
```json
{
"cmd": "remote_control_v2_req",
"msg_id": <msg id string>,
"data": [{
“cmd": "write_attrs" | "write" | "write_v1",
"data": {
"did": <did string>,
"mac": <mac string>,
"product_key": <product_key string>,
"binary_coding": <"hex" OR "base64", default is "hex">,
"attrs": {
"name1": <value1>,("name1"指数据点的标识名(name)，<value1>指数据点的值。)
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

| 字段                            | 是否必须 | 描述                                                         |
| ------------------------------- | :------: | ------------------------------------------------------------ |
| cmd                             |   必须   | 控制设备，必须为 remote_control_req                          |
| msg_id                          |   可选   | 可用于标识本消息，将会在回复指令中返回                       |
| data                            |   必须   | 控制指令，数组类型                                           |
| data.cmd                        |   必须   | V4 产品数据点协议格式，填写write_attrs；V4 产品自定义协议格式，填写 write；V1 产品协议格式，填写 write_v1 |
| data.source                     |   必须   | 固定填写 noti                                                |
| data.data.did                   |   必须   | 设备 ID                                                      |
| data.data.mac                   |   必须   | 设备 Mac 地址,长度为 12 的字符串，大小写敏感                 |
| data.data.product_key           |   必须   | 设备所属产品的标识码                                         |
| data.data.binary_coding         |   可选   | Raw数据或数据点扩展类型数据的编码格式                        |
| data.data.attrs / data.data.raw |   必须   | V4 产品数据点协议格式，选择data.data.attrs；V4 产品自定义协议格式（参考通用数据点协议之透传业务指令），选择data.data.raw；V1 产品协议格式，选择 data.data.raw |

数据类型说明：

| 协议类型         |  编码  | 值类型                                                  |
| ---------------- | :----: | ------------------------------------------------------- |
| 数据点：Bool     |        | true OR false; 1 OR 0                                   |
| 数据点：Enum     |        | 枚举Unicode字符串；枚举下标                             |
| 数据点：Int      |        | 整型数字                                                |
| 数据点：扩展类型 |  hex   | byte数组:[1,2,3],取值范围0-255; Hex字符串: "010203aaff" |
| 数据点：扩展类型 | base64 | 传输数据经过base64加密后的字符串                        |
| 透传：Raw        |  hex   | byte数组:[1,2,3],取值范围0-255; Hex字符串: "010203aaff" |
| 透传：Raw        | base64 | 传输数据经过base64加密后的字符串                        |

Gizwits Platform 回复：
```json
{
"cmd": "remote_control_v2_res”,
"msg_id": <msg id string>,
“result": {
"succeed": [
{"did": <did1 str>},
{"did": <did2 str>},
… …
],
"failed": [
{
"did": <did3 str>,
"reason": <reason str>
},
{
"did": did4 str>,
"reason": <reason str>
},
… …
]
}
}\n
```

其中msg_id的内容为请求消息中msg_id字段的内容，如请求消息中不存在该字段，回复消息中将不会出现该字段。
如协议自身引起的错误，Gizwits Platform 回复 错误响应消息，该消息格式参见下文。

## 5.  推送事件
### 数据点编辑事件
```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "datapoints_changed",
"product_key": <product_key string>,
"created_at"：<timestamp in seconds, float>
}\n
```
### 设备上线事件
```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "device_online",
"msg_id": <msg id string>,
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"group_id": <group_id string>,
"created_at"：<timestamp in seconds, float>，
"ip": <ip string>,
"latitude": <latitude float; Only for NB device>,
"longitude": <longitude float; Only for NB device>,
"country": <country string>,
"region": <region string>,
"city": <city string>
}\n
```
### 设备下线事件

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "device_offline",
"msg_id": <msg id string>,
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"group_id": <group_id string>,
"created_at"：<timestamp in seconds, float>
}\n
```
### 故障与报警事件
当有故障与报警事件发生，Gizwits Platform 会向客户端推送以下消息：

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "attr_fault" | "attr_alert",
"event_id": <uuid string>, (同一设备的同一故障或报警的发生事件与恢复事件共享同一事件 id)
"msg_id": <msg id string>,
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
### 设备状态事件

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "device_status_raw",
"msg_id": <msg id string>,
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
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "device_status_kv",
"msg_id": <msg id string>,
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
### 中控添加子设备事件

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
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

### 中控删除子设备事件

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
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

### 设备绑定/解绑事件

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于ACK)
"event_type": "device_bind" | "device_unbind",
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"app_id": <app_id string>,
"uid": <uid string>,
"group_id": <group_id string>,
"created_at"：<timestamp in seconds, float>
}\n
```

### 设备重置事件

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于ACK)
"event_type": "device_reset",
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"created_at"：<timestamp in seconds, float>
}\n
```

### 设备大文件下载通知事件

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于ACK)
"event_type": "device_file_download",
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"download_url": <download_url string>,
"created_at"：<timestamp in seconds, float>
}\n
```

### 设备控制事件

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "app2dev_raw",
"msg_id": <msg id string>,
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"group_id": <group_id string>,
"created_at"：<timestamp in seconds, float>,
"source:": "client"|"open_api"|"scheduler"|"enterprise_api"|"gateway"
"appid": <appid string>, (missing if source="enterprise_api"|"gateway" or v1.0 devices)
"uid": <uid string>, (missing if source="enterprise_api"|"gateway" or v1.0 devices)
"enterprise_id": <enterprise_id string>, (only for source="enterprise_api")
"data": <base64 encoding string> (设备状态原始数据 base64 编码字符串)
}\n
```

如该产品支持数据点解释(机智云通用数据点协议或自定义数据点协议)，则消息格式为message format:

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "app2dev_kv",
"msg_id": <msg id string>,
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"group_id": <group_id string>,
"created_at"：<timestamp in seconds, float>,
"source: "client"|"open_api"|"scheduler"|"enterprise_api"|"gateway" 
"appid": <appid string>, (missing if source="enterprise_api"|"gateway" or v1.0 devices)
"uid": <uid string>, (missing if source="enterprise_api"|"gateway" or v1.0 devices)
"enterprise_id": <enterprise_id string>, (only for source="enterprise_api")
"data": {
<key1 string>: <value1>,
<key2 string>: <value2>,
...
}
}\n
```

### GPS数据

```json
{
		"cmd": "event_push",
		"msg_id": <msg_id string optional>, (如消息包含此字段，ACK时原样返回）
		"delivery_id": <delivery_id>，(用于ACK)
		"event_type": "device_gps_kv",
		"product_key": <product_key string>,
		"did": <did string>,
		"mac": <mac string>,
		"created_at"：<timestamp in seconds, float>,
		"data":  {
				"longitude": "float",
			  "latitude": "float",
  			"hdop": "float",
		    "num_satellites": “int”,
				"payload": “string”
			}
	}
```

### LBS数据

```json
{
		"cmd": "event_push",
		"msg_id": <msg_id string optional>, (如消息包含此字段，ACK时原样返回）
		"delivery_id": <delivery_id>，(用于ACK)
		"event_type": "device_lbs_kv",
		"product_key": <product_key string>,
		"did": <did string>,
		"mac": <mac string>,
		"created_at"：<timestamp in seconds, float>,
		"data":  {
				"longitude": <float>,
			  "latitude": <float>,
  			"country": <string>,
		    "province": <string>,
				“city”: <string>,
				“city”: <string>,
				“adcode”: <string>,
				“road”: <string>,
				“street”: <string>,
				“poi”: <string>,
				“imsi”: <string>,
				“signal”: <float>
			}
	}
```

### 事件 ACK

客户端每收到一事件消息都需要回复以下 ACK 消息：
```json
{
"cmd": "event_ack",
"msg_id": <msg id string> (按原数据类型填写),
"delivery_id": <delivery_id> (按原数据类型填写)
}\n
```
如 Gizwits Platform 没有收到客户端的回复，该事件会重复推送直至收到 ACK 或过期为止。一般情况下事件按发生时间顺序推送，当prefetch_count > 1 时，有可能因某事件没有 ACK而导致重发而表现为事件没有按时间顺序到达，例如先收到故障恢复或报警取消的事件，所以客户端开发者在处理时应比较 event_id 和 created_at 的值。

## 6.  错误响应
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

title:  SNoti API
---
v2.5.0

# 目的
企业客户可通过SNoti提供的安全数据传输通道，实时的接收设备的数据，用于设备信息归类整理，设备状态统计，设备监控等；也可以通过远程控制功能，实时发送业务指令控制在线设备。

# 客户端示例（开源社区版本）
用户可根据需要，适当选择以下任意一种开发语言的客户端版本，基于此做二次开发，或者作为参考。

1.Java版客户端

  代码仓库：https://github.com/smallCC/noti-client

2.Ruby版客户端

  代码仓库：https://github.com/AbelLai/gizwits_sac_rb

3.Python版客户端

  代码仓库：https://github.com/wangzhenandy/snoti_client_python

# SNoti申请流程

1.企业开发者登陆开发者中心，选择添加服务，如下图
![添加](/assets/zh-cn/cloud/添加SNoti服务.png)

2.点击上图箭头指向的SNoti服务，进入下一步，申请开通服务
![添加](/assets/zh-cn/cloud/开通SNoti服务.png)

3.成功添加SNoti服务后，在服务页面点击“新建授权”创建，该 auth_id 拥有获取该产品下所有设备消息和控制设备的权限；
![添加](/assets/zh-cn/cloud/添加api.png)

# 关键术语
1.auth_id & auth_secret: 产品授权ID和密钥，一款产品可创建多个auth_id，一个auth_id对应唯一的一款产品；SNoti客户端登陆时，会验证auth_id和auth_secret的正确性；

2.subkey：消息分发机制，以ProductKey + subkey作为唯一主键，不同主键之间，消息互不影响（即同一个ProductKey使用不同的subkey，可产生消息副本）；subkey(subscription key)为自定义字符串，大小写敏感，长度为 1 到 32 个字符，可包含数字，字母和下划线（即[a-zA-Z0-9]）；

3.产品的12种消息类型（event_type）分别为：
- device.online：设备上线消息
- device.offline：设备下线消息
- device.status.raw：设备上报自定义透传业务指令
- device.status.kv：设备上报数据点业务指令
- device.attr_fault：设备故障事件
- device.attr_alert：设备报警事件
- datapoints.changed：数据点编辑事件
- center_control.sub_device_added: 中控添加子设备事件
- center_control.sub_device_deleted: 中控删除子设备事件
- device.bind：设备绑定消息
- device.unbind: 设备解绑消息
- device.reset：设备重置消息
- device.file.download：设备文件下载消息
- device.app2dev.raw: 控制设备自定义透传业务指令
- device.app2dev.kv: 控制设备数据点业务指令

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

6.客户端可发送远程控制指令，来控制设备。SNoti服务会在客户端登录时，缓存每一个product_key对应的M2M信息，用于给设备发送控制指令。特别注意的是，当产品正式发布后，需要重启SNoti客户端，以更新M2M的信息。
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


| 字段             | 是否必须 | 描述                                                         |
| ---------------- | :------: | ------------------------------------------------------------ |
| cmd              |   必须   | 登录类型，必须为login_req                                    |
| prefetch_count   |  非必须  | 默认值为50                                                   |
| data.product_key |   必须   | 产品ID                                                       |
| data.auth_id     |   必须   | 产品授权ID                                                   |
| data.auth_secret |   必须   | 产品授权密匙                                                 |
| data.subkey      |   必须   | subscription key，为客户端自定义标识，大小写敏感，长度为 1 到 32 个字符，可包含数字，字母和下划线 |
| data.events      |   必须   | 客户端接收消息类型，使用逗号隔开的字符串列表，目前支持类型 为device.attr_fault;device.attr_alert;device.online;device.offline;   device.status.raw;device.status.kv;datapoints.changed;   center_control.sub_device_added;center_control.sub_device_deleted;   device.bind;device.unbind;device.reset;device.file.download; device.app2dev.raw;device.app2dev.kv |


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
"cmd": "remote_control_v2_req",
"msg_id": <msg id string>,
"data": [{
“cmd": "write_attrs" | "write" | "write_v1",
"data": {
"did": <did string>,
"mac": <mac string>,
"product_key": <product_key string>,
"binary_coding": <"hex" OR "base64", default is "hex">,
"attrs": {
"name1": <value1>,("name1"指数据点的标识名(name)，<value1>指数据点的值。)
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

| 字段                            | 是否必须 | 描述                                                         |
| ------------------------------- | :------: | ------------------------------------------------------------ |
| cmd                             |   必须   | 控制设备，必须为 remote_control_req                          |
| msg_id                          |   可选   | 可用于标识本消息，将会在回复指令中返回                       |
| data                            |   必须   | 控制指令，数组类型                                           |
| data.cmd                        |   必须   | V4 产品数据点协议格式，填写write_attrs；V4 产品自定义协议格式，填写 write；V1 产品协议格式，填写 write_v1 |
| data.source                     |   必须   | 固定填写 noti                                                |
| data.data.did                   |   必须   | 设备 ID                                                      |
| data.data.mac                   |   必须   | 设备 Mac 地址,长度为 12 的字符串，大小写敏感                 |
| data.data.product_key           |   必须   | 设备所属产品的标识码                                         |
| data.data.binary_coding         |   可选   | Raw数据或数据点扩展类型数据的编码格式                        |
| data.data.attrs / data.data.raw |   必须   | V4 产品数据点协议格式，选择data.data.attrs；V4 产品自定义协议格式（参考通用数据点协议之透传业务指令），选择data.data.raw；V1 产品协议格式，选择 data.data.raw |

数据类型说明：

| 协议类型         |  编码  | 值类型                                                  |
| ---------------- | :----: | ------------------------------------------------------- |
| 数据点：Bool     |        | true OR false; 1 OR 0                                   |
| 数据点：Enum     |        | 枚举Unicode字符串；枚举下标                             |
| 数据点：Int      |        | 整型数字                                                |
| 数据点：扩展类型 |  hex   | byte数组:[1,2,3],取值范围0-255; Hex字符串: "010203aaff" |
| 数据点：扩展类型 | base64 | 传输数据经过base64加密后的字符串                        |
| 透传：Raw        |  hex   | byte数组:[1,2,3],取值范围0-255; Hex字符串: "010203aaff" |
| 透传：Raw        | base64 | 传输数据经过base64加密后的字符串                        |

Gizwits Platform 回复：
```json
{
"cmd": "remote_control_v2_res”,
"msg_id": <msg id string>,
“result": {
"succeed": [
{"did": <did1 str>},
{"did": <did2 str>},
… …
],
"failed": [
{
"did": <did3 str>,
"reason": <reason str>
},
{
"did": did4 str>,
"reason": <reason str>
},
… …
]
}
}\n
```

其中msg_id的内容为请求消息中msg_id字段的内容，如请求消息中不存在该字段，回复消息中将不会出现该字段。
如协议自身引起的错误，Gizwits Platform 回复 错误响应消息，该消息格式参见下文。

## 4.  推送事件
### 数据点编辑事件
```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "datapoints_changed",
"product_key": <product_key string>,
"created_at"：<timestamp in seconds, float>
}\n
```
### 设备上线事件
```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "device_online",
"msg_id": <msg id string>,
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"group_id": <group_id string>,
"created_at"：<timestamp in seconds, float>，
"ip": <ip string>,
"latitude": <latitude float; Only for NB device>,
"longitude": <longitude float; Only for NB device>,
"country": <country string>,
"region": <region string>,
"city": <city string>
}\n
```
### 设备下线事件

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "device_offline",
"msg_id": <msg id string>,
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"group_id": <group_id string>,
"created_at"：<timestamp in seconds, float>
}\n
```
### 故障与报警事件
当有故障与报警事件发生，Gizwits Platform 会向客户端推送以下消息：

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "attr_fault" | "attr_alert",
"event_id": <uuid string>, (同一设备的同一故障或报警的发生事件与恢复事件共享同一事件 id)
"msg_id": <msg id string>,
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
### 设备状态事件

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "device_status_raw",
"msg_id": <msg id string>,
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
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "device_status_kv",
"msg_id": <msg id string>,
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
### 中控添加子设备事件

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
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

### 中控删除子设备事件

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
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

### 设备绑定/解绑事件

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于ACK)
"event_type": "device_bind" | "device_unbind",
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"app_id": <app_id string>,
"uid": <uid string>,
"group_id": <group_id string>,
"created_at"：<timestamp in seconds, float>
}\n
```

### 设备重置事件

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于ACK)
"event_type": "device_reset",
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"created_at"：<timestamp in seconds, float>
}\n
```

### 设备大文件下载通知事件

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于ACK)
"event_type": "device_file_download",
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"download_url": <download_url string>,
"created_at"：<timestamp in seconds, float>
}\n
```

### 设备控制事件

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "app2dev_raw",
"msg_id": <msg id string>,
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"group_id": <group_id string>,
"created_at"：<timestamp in seconds, float>,
"source:": "client"|"open_api"|"scheduler"|"enterprise_api"|"gateway"
"appid": <appid string>, (missing if source="enterprise_api"|"gateway" or v1.0 devices)
"uid": <uid string>, (missing if source="enterprise_api"|"gateway" or v1.0 devices)
"enterprise_id": <enterprise_id string>, (only for source="enterprise_api")
"data": <base64 encoding string> (设备状态原始数据 base64 编码字符串)
}\n
```

如该产品支持数据点解释(机智云通用数据点协议或自定义数据点协议)，则消息格式为message format:

```json
{
"cmd": "event_push",
"msg_id", <msg_id string optional>, (如消息包含此字段， ACK时原样返回)
"delivery_id": <delivery_id>，(用于 ACK)
"event_type": "app2dev_kv",
"msg_id": <msg id string>,
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"group_id": <group_id string>,
"created_at"：<timestamp in seconds, float>,
"source: "client"|"open_api"|"scheduler"|"enterprise_api"|"gateway" 
"appid": <appid string>, (missing if source="enterprise_api"|"gateway" or v1.0 devices)
"uid": <uid string>, (missing if source="enterprise_api"|"gateway" or v1.0 devices)
"enterprise_id": <enterprise_id string>, (only for source="enterprise_api")
"data": {
<key1 string>: <value1>,
<key2 string>: <value2>,
...
}
}\n
```

### 事件 ACK

客户端每收到一事件消息都需要回复以下 ACK 消息：
```json
{
"cmd": "event_ack",
"msg_id": <msg id string> (按原数据类型填写),
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

## 6. 相同product_key下不同subkey的客户端都能接收到来自SNoti的消息推送吗？
是的，不同的subkey就会创建不同的队列，彼此数据独立。所以当有数据需要向客户端推送的时候，所有不同subkey的客户端都可以接收到该推送消息，前提是该subkey的客户端在登陆时有设置该推送事件的监听。  

## 7. subkey最多可以创建多少个？
最多5个。c. 需要接收子设备的数据，就使用子设备产品对应的auth_id。

## 6. 相同product_key下不同subkey的客户端都能接收到来自SNoti的消息推送吗？
是的，不同的subkey就会创建不同的队列，彼此数据独立。所以当有数据需要向客户端推送的时候，所有不同subkey的客户端都可以接收到该推送消息，前提是该subkey的客户端在登陆时有设置该推送事件的监听。  

## 7. subkey最多可以创建多少个？
最多5个。
