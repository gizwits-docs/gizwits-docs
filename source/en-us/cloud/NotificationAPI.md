title: SNoti API
---
v2.1.9

# Overview

Enterprise users can ingest data from globally dispersed devices in real time through the secure data transmission channel provided by SNoti, which can be used to classify and organize device information, device status statistics, and device monitoring. SNoti enables you to send business instructions to control devices online in real time by remote control functions.

# Client Samples (Open Source Community Edition)

The user can choose any version of the following language-specific clients as appropriate for secondary development, or as a reference based on this.

1. Client sample for Java
    * Code repository: https://github.com/smallCC/noti-client

2. Client sample for Ruby
    * Code repository: https://github.com/AbelLai/gizwits_sac_rb

3. Client sample for Python
    * Code repository: https://github.com/wangzhenandy/snoti_client_python

# Request to access SNoti service

1. The enterprise developer signs in to the developer center and chooses “Add service”, as shown below

    ![Add service](../../../assets/en-us/cloud/添加SNoti服务.png)
 
2. Click “SNoti service” pointed by the arrow in the figure above to go to the next step and request to access the service

    ![SNoti service](../../../assets/en-us/cloud/开通SNoti服务.png)
 
3. After successfully adding the SNoti service, click “Create credentials on the service page. The auth_id has permission to obtain all device messages and control devices under the product.

    ![Create credentials](../../../assets/en-us/cloud/添加api.png)
 
# Terms

1. auth_id & auth_secret: Product authentication ID and secret. A product can have multiple auth_id. One auth_id corresponds to a unique product. When the SNoti client logs in, it verifies the validity of auth_id and auth_secret.
2. subkey: using message distribution mechanism, with ProductKey + subkey as the only primary key, messages among different primary keys do not affect each other (ie, the same ProductKey uses a different subkey, can generate a message copy); subkey (subscription key) is a custom character string, case sensitive, 1 to 32 characters in length, which can contain numbers, letters, and underscores (ie [a-zA-Z0-9]);
3. The 12 message types (event_type) of the product are:
    - device.online: device comes online 
    - device.offline: device goes offline
    - device.status.raw: device reports a custom transparent transmission business instruction
    - device.status.kv: device reports business instructions of data point type
    - device.attr_fault: device fault events
    - device.attr_alert: device alarm events
    - datapoints.changed: data point change events
    - center_control.sub_device_added: central controller adds child devices
    - center_control.sub_device_deleted: central controller deletes child devices
    - device.bind: device binding messages
    - device.unbind: device unbinding messages
    - device.reset: device reset messages
    - device.file.download: device file download messages

# Workflow

Events are pushed through SSL protocol. The communication process is as follows:

1. The client establishes an SSL connection with this API (Gizwits Platform). The client does not need to provide a certificate, just trust the server certificate;
2. The client sends a login instruction to complete the verification;
3. The server pushes messages to the client in several ways as following:
    * Multiple client login connections with the same product_key + subkey, messages are pushed to each client in turn; 
    * Clients with the same product_key but different subkeys can receive copies of the specified message type from devices under the product. Clients do not interfere with each other.
    * When the number of ack messages that the client has not sent out reaches the prefetch_count value of the client's login settings, messages will not be pushed to the client but will be sent to other clients.
    * For those messages without returned ack messages, the server will stop resending and wait. Only if the client is disconnected, they will be resent to connected clients.
    * After all clients are disconnected, subsequent device messages are retained on the server and wait for the clients to receive them next time.
4. Clients receive event messages in real time and sends ack messages to the server.
5. When the client does not send any message to the server within a certain time range, it needs to send a ping heartbeat request and the server responds to the pong heartbeat response.
6. The client can send remote control instructions to control the device. The SNoti service caches the M2M information corresponding to each product_key when the client logs in, which is used to send control instructions to the device. Note that when the product is officially released, it is necessary to restart SNoti clients to update the M2M information.

# API Specification

* Domain name: snoti.gizwits.com
* SSL service Port: 2017

The message payload is binary data, UTF-8 encoded. Please note that "\n" must be added as a message suffix after each message.

## 1. Connection and login

After the client establishes an SSL connection with the Gizwits platform, the client sends the following string for authentication (login to the Gizwits platform):

```
{
"cmd": "login_req",
"prefetch_count":<uint> (0 < prefetch_count <= 32767, indicates the maximum number of messages without ACKs. The default value is 50.)
"data": [{
“product_key": <key string>,
"auth_id": <auth_id string>,
"auth_secret": <auth_secret string>,
"subkey": <subkey string>,
"events":[<event string>,...] (One or more events)
},...] (One or more products)
}\n
```

Request parameters:

Param |  Required  |  Description
----|----|----
cmd | Yes |Login type, must be login_req
prefetch_count|  No | The default value is 50
data.product_key |   Yes| Product ID
data.auth_id   | Yes| Product authentication ID
data.auth_secret   | Yes |Product authentication secret
data.subkey |Yes |Subscription key, a custom identifier for the client. It is case-sensitive with a length of 1 to 32 characters. It can contain numbers, letters, and underscores.
data.events |Yes| The message types received by clients, using a comma-separated list of strings, currently supporting device.attr_fault;device.attr_alert;device.online;device.offline device.status.raw;device.status.kv;datapoints.changed center_control .sub_device_added;center_control.sub_device_deleted device.bind;device.unbind;device.reset;device.file.download

Response from Gizwits platform：

```
{
"cmd": "login_res",
"data": {
"result": true | false,
"msg": "ok" | <error msg>
}
}\n
```

If result is false, the login failed and the connection will be closed.

## 2. Heartbeat

After an SSL connection is established between the client and the Gizwits platform, it is necessary to periodically send data to the Gizwits platform to maintain the validity of the connection. If no data is sent to the Gizwits platform within 5 minutes, the following heartbeat data should be sent to the Gizwits platform:

```
{
"cmd": "ping"
}\n
Response from Gizwits platform：
{
"cmd": "pong"
}\n
```

If you do not receive the reply of Gizwits platform in time, you can assume that the connection with Gizwits platform is closed and you need to reconnect.

## 3. Device control

After the client establishes an SSL connection with the Gizwits platform, the client can send the following string to control the device:

```
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
"name1": <value1>,("name1" refers to the name of the data point, and <value1> refers to the value of the data point. The value can be true/false (bool), Unicode-encoded string such as \u62bd(enum), numbers, or byte arrays (eg [23,2,3] for extended types))
"name2": <value2>,
… …
}(Only used with cmd "write_attrs")
OR
"raw": [<byte>, <byte>, <byte>, … ...](Only used with cmd "write" or "write_v1")
}
},...] (One or more instructions)
}\n
```

Request paramters:

Param |  Required  |  Description
----|----|----
cmd |Yes |Used to control device, must be remote_control_req
msg_id | No | Identify this message and will be returned in response message
data  |  Yes| Control instruction, array type
data.cmd   | Yes| For V4 product data point protocol format, fill in write_attrs; For V4 product custom protocol format, fill in write; For V1 product protocol format, fill in write_v1
data.source |Yes| Fixed value: noti
data.data.did |  Yes| Device ID
data.data.mac  | Yes |Device MAC address, length of 12 characters, case sensitive
data.data.product_key  | Yes |ID of the product to which the device belongs
data.data.attrs / data.data.raw| Yes| For V4 product data point protocol format, choose data.data.attrs; For V4 product custom protocol format (refer to the business instructions transparent transmission of common data point protocol), choose data.data.raw; For V1 product protocol format, choose data.data. Raw 

Response from Gizwits platform：

```
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

The value of msg_id is from the content of the msg_id field in the request message. If the field does not exist in the request message, this field will not appear in the reply message.

If the protocol itself incurs an error, Gizwits platform gives out an error response message. The message format is described below.

## 4. Push events

### Data point change event

```
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(For ACK)
"event_type": "datapoints_changed",
"product_key": <product_key string>,
"created_at"：<timestamp in seconds, float>
}\n
```

### Device online event 

```
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(For ACK)
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

### Device offline event

```
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(For ACK)
"event_type": "device_offline",
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"group_id": <group_id string>,
"created_at"：<timestamp in seconds, float>
}\n
```

### Fault and alarm event

When there are fault and alarm events, Gizwits platform will push the following message to the client:

```
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(For ACK)
"event_type": "attr_fault" | "attr_alert",
"event_id": <uuid string>, (The occurrence event and the recovery event of the fault or alarm of the same device share the same event id)
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"group_id": <group_id string>,
"created_at"：<timestamp in seconds, float>,
"data": {
"attr_name": <data point identification of the fault or alarm>,
"attr_displayname": <data point display name of the fault or alarm>
"value": 0 | 1 (0 means fault recovery or alarm cancellation, 1 means a fault or alarm occurred)
}
}\n
```

### Device state event

```
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(For ACK)
"event_type": "device_status_raw",
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"group_id": <group_id string>,
"created_at"：<timestamp in seconds, float>,
"data": <base64 encoding string> (base64 encoded string of raw data for device state)
}\n
```

If the product supports data point interpretation (Gizwits common data point protocol or custom data point protocol), the message format is:

```
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(For ACK)
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

### Event for central controller adding child devices

```
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(For ACK)
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

* child_passcode uses AES encryption,
* AES complement mode is pcks7padding
* AES key is the md5 value of the central controller passcode (16 bytes)
* AES mode is AES.MODE_ECB

### Event for central controller deleting child devices

```
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(For ACK)
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

### Device binding/unbinding event

```
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(For ACK)
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

### Device reset event 

```
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(For ACK)
"event_type": "device_reset",
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"created_at"：<timestamp in seconds, float>
}\n
```

### Device file downloading event

```
{
"cmd": "event_push",
"delivery_id": <delivery_id>，(For ACK)
"event_type": "device_file_download",
"product_key": <product_key string>,
"did": <did string>,
"mac": <mac string>,
"download_url": <download_url string>,
"created_at"：<timestamp in seconds, float>
}\n
```

### Event ACK

Every time the client receives an event message, it needs to reply with the following ACK message:

```
{
"cmd": "event_ack",
"delivery_id": <delivery_id> (According to the original data type)
}\n
```

If the Gizwits platform does not receive a response from the client, the event is repeatedly pushed until the Gizwits platform receives an ACK or it expires. In general, events are pushed in order of occurrence time. When prefetch_count > 1, there may be retransmission due to an event without ACK and therefore the event does not arrive in chronological order. For example, the event of failure recovery or alarm cancellation is received first. Hence, client developers should compare the value of event_id and created_at when processing.

## 5. Error response

Gizwits platform returns the following message when the message sent by the client is not recognized by Gizwits platform:

```
{
"cmd": "invalid_msg"
“error_code”: <code int>
"msg": <msg string>
}\n
```

The client developer should check whether the message sent by the client is correct (Note: If the client does not add "\n" at the end of the message, the server will consider that it has not received the complete message and continue to wait for more) .

# subkey Management

When in use, it is necessary to pay attention to what subkeys are currently used, and to clean up the subkeys that are no longer used as soon as possible to avoid unnecessary waste of resources. Acquisition and deletion of subkey are accomplished using HTTP API request.

* Domain name: snoti.gizwits.com
* HTTP API port: 2018

## 1. Get subkey

http://swagger.gizwits.com/doc/index/snoti_api_operator#!/product/get_v1_products_product_key_subkey

## 2. Delete subkey

http://swagger.gizwits.com/doc/index/snoti_api_operator#!/product/delete_v1_products_product_key_subkey

# FAQ

## 1. What format need the device data to be received by SNoti client follow? 

a. For devices not using data point protocol, the data with protocol command words 0x0091, 0x0093, 0x0094 can be transparently transmitted to SNoti client;

b. For devices using common data point protocol, the protocol command word shall accommodate 0x0091, 0x0093, and 0x0094. Besides, the first command word of business instructions shall accommodate one of the following:

* 0x04, business instructions need to follow data point format
* 0x06, transparent transmission of business instructions

## 2. When the SNoti client controls the device, which part of the Gizwits protocol does the raw instruction sent out reside in?

The Raw instruction refers to all instructions following the protocol command word 0x0090, excluding 0x0090. It is worth noting that the Raw instruction begins with 0x05 when using common data point transparent transmission.

## 3. After the device is offline, the SNoti client sends instructions to the device. When the device comes online again, can it receive those instructions?

No.

## 4. What does the [0-255] of the Raw instruction mean? Must it be decimal? If it is negative, how to deal with?

The integer range that a byte (1B) in the protocol can represent is: unsigned integer 0~255 or signed integer -128~127. In the SNoti protocol, an unsigned integer is used to represent a single byte. Some programming languages convert signed positive integer to unsigned integer with: result = bytes & 0xff.

## 5. Can SNoti be used in the project with a central controller?

a. SNoti does not distinguish whether the product type is a central controller, but only needs to apply for the product auth_id;

b. When you need to receive data of the central control gateway, use the auth_id corresponding to the central control gateway product;

c. When you need to receive data of the child device, use the auth_id corresponding to the child device product.

## 6. Are clients with different subkeys under the same product_key able to receive message pushed by SNoti?
Yes, different queues will be created for different subkeys which are independent of each other. Therefore, when data needs to be pushed to the clients, all clients of different subkeys can receive the push message, provided that the clients of the subkeys have set event listeners for the message when logging in. 
