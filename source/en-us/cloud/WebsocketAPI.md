title: Web Socket API
---
# Demo

https://github.com/gizwits/gizwits-wechat-js-sdk

# Communication Model

Browsers (JavaScript) can communicate directly with Gizwits cloud via the Web Socket API. Thus browser (JavaScript) can control the device and receive device reported data through the Web Socket API.

![Communication Model](../../../assets/en-us/cloud/通信模型.jpg)

# Communication process

The communication between JavaScript and the cloud with Web Socket API mainly includes the following steps.

* User login: The user logs in to the cloud through the uid and token obtained from the HTTP API.
* Receiving device online and offline state messages: The device can be controlled only after the device is bound.
* Send and receive device data.
* Heartbeat: The browser (JavaScript) periodically sends heartbeats to the cloud, and the cloud responds to heartbeat.

# Agreement

## 1. Tips

`<str> represents a string placeholder, and <int> represents an integer placeholder`.


## 2. Web Socket service address


`ws://<host>:<ws_port>/ws/app/v1 (unencrypted connection)`

`wss://<host>:<wss_port>/ws/app/v1 (encrypted connection)`


Of which <host> is the value of the host field in the bound device list, <ws_port> is the value of the ws_port field in the bound device list, and <wss_port> is the value of the wss_port field in the bound device list. See the HTTP API of Get bound device list.

## 3. Notes

* Before the Web Socket interaction with the cloud, the user must be registered and have already bound the device.
* The data that interacts with the cloud follows JSON format and is encoded in UTF-8. You can use JSON.stringify(json) to convert JavaScript objects into strings and send them to the cloud, or convert the received string data into JavaScript objects via var res = JSON.parse(evt.data).
* The Web Socket test program should use `http://<m2m_host>:8080/app (<m2m_host> is the value of the host field in the bound device list)`. You can also view the source code of this web page as an example for reference.

# Specification

## 1. User login

Browsers (JavaScript) must log in for further interaction with the cloud.

Browser ⇒ Cloud. The browser sends the following JSON string to the cloud.

```
{
    "cmd": "login_req",
    "data":
    {
        "appid": <str>,
        "uid": <str>,
        "token": <str>,
        "p0_type": "attrs_v4"|"custom", ("attrs_v4" refers to the interaction with the cloud through standard data point protocol, see the "Standard data point operations" section below. "custom" means to use a custom business logic protocol to interact with the cloud. See the "Browser and cloud data exchange" section below.)
        "heartbeat_interval": <int>, (Heartbeat interval in seconds. The value must be less than or equal to 180)
        "auto_subscribe": true | false (True means that after the login is successful, the server automatically subscribes to all the bound devices; if false, you need to select the devices to be subscribed to through the following "User subscribes to device messages" API. The default value is true. Recommend to set to false, then subscribe the devices as needed to save costs)
    }
}
```

Cloud ⇒ Browser. The cloud responds to the browser with the following JSON string.

```
{
    "cmd": "login_res",
    "data":
    {
        "success": true | false （True for successful login, false for failed login）
    }
}
```

## 2. User subscribes to device messages

Users can receive device-related messages only if they have subscribed to the bound device messages. This API only applies to scenarios where the login parameter auto_subscribe is set to false.

Browser ⇒ Cloud. The browser sends the following JSON string to the cloud so as to subscribe device messages.

```
{
    "cmd": "subscribe_req",
    "data":
    [
        {"did": <str> },（did of the first device to be subscribed to）
        {"did": <str> },（did of the second device to be subscribed to）
        ……
    ]
}
```

Cloud ⇒ Browser. The cloud sends the following JSON string to the browser to return the results.

```
{
    "cmd": "subscribe_res",
    "data":
    {
        "success":
        [
            {
                "did": <str>,（corresponding to the first device did）
                "error_code": 0,（0 for success）
                "msg": <str>（description）
            },
            {
                "did": <str>,（corresponding to the second device did）
                "error_code": 0,（0 for success）
                "msg": <str>（description）
            },
            ……
         ],
         “failed”:
         [
            {
                "did": <str>,（corresponding to the first device did）
                "error_code": <int>,（error code of failed subscription）
                "msg": <str>（description）
            },
            {
                "did": <str>,（corresponding to the second device did）
                "error_code": <int>,（error code of failed subscription）
                "msg": <str>（description）
            },
            ……
         ]
    }
}
```

## 3. Get notified when device goes offline or comes online

When the device goes online or offline, the cloud will send a notification to the browser.

Cloud ⇒ Browser. The cloud sends the following JSON string to the browser to notify the browser that the device goes online or offline.

```
{
    "cmd": "s2c_online_status",
    "data":
    {
        "did": <str>,（did of the device goes offline or comes online）
        "passcode": <str>,（passcode of the device goes offline or comes online）
        "mac": <str>,（mac of the device goes offline or comes online）
        "online": true | false （true for online，false for offline）
    }
}
```

## 4. device state change notification for binding/unbinding 

After the device is bound or unbound by the user, the cloud sends this message to notify the browser.

Cloud ⇒ Browser. The cloud sends the following JSON string to the browser to notify that a binding or unbinding event has occurred.

```
{
    "cmd": "s2c_binding_changed",
    "data":
    {
        "did": <str>, (device did)
        "bind": true | false (true for binding, false for unbinding)
    }
}
```

## 5. Data exchange between browser and cloud (data transparent transmission)

The browser can exchange with the cloud any data that conforms to the protocol. Be sure to refer to the API documentation for full details about the protocol format.

Please note that when the user logs in with the parameter "p0_type" set to "custom", data can only be exchanged with the cloud in this way.

Browser ⇒ Cloud. The browser sends the following JSON string to the cloud.

```
{
    "cmd": "c2s_raw",
    "data":
    {
        "did": <str>, （target device did）
        "raw": [<byte>, <byte>, ...] (The contents of custom business logic instructions, which are transmitted in byte arrays. The range of each byte must be 0~255. The content must begin with [0, 0, 0, 3, varLen(1~4B), 0, 0, 144])
    }

}
```

If you want the cloud to forward data to the device, the raw value needs to add the following protocol prefix and then concatenate the data sent to the device, i.e., [0, 0, 0, 3, varLen(1 ~ 4B), 0, 0, 144] + Data sent to the device, where varLen is a variable length, and represents the number of bytes with 1~4 bytes (B) after the variable length field until the end of the packet. If the length is less than 128B, directly with one byte (B) to indicate the length. For the encoding and decoding method with the length of 128B or more, refer to the definition of the Remaining Length of the MQTT V3.1 protocol. cmd can be 0x90/0x93/0x94 and so on.

Cloud ⇒ Browser. After the cloud receives the data uploaded by the device, the cloud forwards the following JSON string to the browser. The data is passed in the raw field. Note that even if the value of the login parameter "p0_type" is set to "attrs_v4", the data command reported by the device with the “business instruction via transparent transmission” or the operation command related to central control will also be sent to the browser with this command.

```
{
    "cmd": "s2c_raw",
    "data":
    {
        "did": <str>,（source device did）
        "raw": [<byte>, <byte>, ...] (The contents of custom business logic instructions, which are transmitted in byte array. The range of each byte must be 0~255)
    }
}
```

If the data is reported by the device, the raw value will have a prefix, i.e., [0, 0, 0, 3, varLen(1~4B), 0, 0, 145] + device data, where varLen is a variable length. For its definition, please refer to above. cmd can be 0x91/0x93/0x94 and so on.

## 6. Standard data point operations (read, write, notification, ACK)

When the user logs in with the parameter "p0_type" set to "attrs_v4", the cloud will interact with the browser in the way of the standard data point protocol.

Browser ⇒ Cloud. The browser sends the following JSON string to the cloud to read the current state of the target device. It is not allowed to use this instruction when the value of the parameter "p0_type" is set to "custom".

```
{
    "cmd": "c2s_read",
    "req_sn": <int>, (Optional, if there is a value, indicates that it is a business instruction with ACK by transparent transmission [0x0093], if not, it is a business instruction without ACK by transparent transmission[0x0090])
    "data":
    {
        "did": <str>,（target device did）
        "names": [<str>, <str>, …] （optional for data points with variable length: Pass in the names of the data points to be read, omit to read all data points; For read operation of data points with fixed length, ignore this parameter）
    }
}
```

Browser ⇒ Cloud. The browser sends the following JSON string to the cloud to control the target device (changing the state of the target device). It is not allowed to use this command when the value of login parameter "p0_type" is set to "custom".

```
{
    "cmd": "c2s_write",
    "req_sn": <int>, (Optional, if there is a value, indicates that it is a business instruction with ACK by transparent transmission [0x0093], if not, it is a business instruction without ACK by transparent transmission[0x0090])
    "data":
    {
        "did": <str>,（target device did）
        "attrs":
        {
            "name1": <value1>, ("name1" refers to the name of the data point, and <value1> refers to the value of the data point, which can be true/false (Boolean), Unicode-encoded string like \u62bd (enumeration), number (numeric), byte array [23,2,3] (extension type))
            "name2": <value2>,
            ...
        }
    }
}
```

Cloud ⇒ Browser. After the device receives the read command or the state changes, it will actively send the current state to the cloud, and the cloud forwards the following JSON string to the browser. When the login parameter "p0_type" is set to "custom", this instruction will not be received.

```
{
    "cmd": "s2c_noti",
    "req_sn": <int>, (Optional. If the device sends a business instruction with ACK via transparent transmission [0x0093], this field is required. Then the browser must reply with c2s_ack and the value of this field. res_sn and req_sn parameters cannot coexist at the same time)
    "res_sn": <int>, (Optional. If the c2s_read or c2s_write request command sent by the browser has the req_sn parameter, the corresponding response command s2c_noti contains the res_sn field and its value is consistent with req_sn. res_sn and req_sn parameters cannot coexist at the same time)
    "data":
    {
        "did": <str>,（source device did）         
        "attrs":
        {
            "name1": <value1>, ("name1" refers to the name of the data point, and <value1> refers to the value of the data point, which can be true/false (Boolean), Unicode-encoded string like \u62bd (enumeration), number (numeric), byte array [23,2,3] (extension type))
            "name2": <value2>,
             ...          
        }
    }
}
```

Cloud ⇒ Browser. After the browser sends a read or write command with req_sn [0x0093], it may receive ACK 0x0094 for the transparent transmission command from the device, and the cloud forwards the following JSON string to the browser. This instruction is not used when the value of login parameter "p0_type" is set to "custom".

```
{
    "cmd": "s2c_ack",
    "res_sn": <int>, (corresponding to the req_sn value of the browser read or write instruction)
    "did": <str>(device did)

}
```

Browser ⇒ Cloud. After the browser receives the s2c_noti message with req_sn [0x0093], the browser is required to send the following JSON string [0x0094] to the cloud. It is not allowed to use this command when the value of login parameter "p0_type" is set to "custom".

```
{
    "cmd": "c2s_ack",
    "res_sn": <int>, (corresponding to the req_sn value of s2c_noti instruction received by the browser)
    "did": <str>(target device did)

}
```

## 7. Heartbeat

After a Web Socket connection is established between the browser and the cloud, the heartbeat needs to be periodically sent to the cloud within the time interval specified by the login parameter "heartbeat_interval". The cloud will reply to the heartbeat after receiving it.

Browser ⇒ Cloud. The browser sends the following JSON string to the cloud.

```
{
    "cmd": "ping"
}
```

Cloud ⇒ Browser. The cloud responds to the browser with the following JSON string.

```
{
    "cmd": "pong"
}
```

## 8. Invalid message notification

When the browser sends an invalid message to the cloud or the data reported by the device is invalid, the cloud sends this message to inform the browser.

Cloud ⇒ Browser. The cloud sends the following JSON string to the browser to notify that there is an invalid message.

```
{
    "cmd": "s2c_invalid_msg",
    "data":
    {
        "error_code": <int> (error code)
        "msg": <str> (description)
    }
}
```
