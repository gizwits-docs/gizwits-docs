title: 设备联动API使用教程
---
# 1.概述
   单品WiFi设备之间联动关系，通过创建设备间联动规则，当设备触发规则后，由云端给要联动的设备推送控制指令。例如：客户有一个智能灯和一个智能空调，可以根据云端提供设备联动功能，创建一个规则，当打开智能灯后，就把智能空调打开。关系图如下
 
 ![Alt text](/assets/zh-cn/UserManual/LinkageAPI/1488352531568.png)

（注意：创建两个产品联动关系的时候，两个产品一定要关联同一个appid，不然，请求的时候就会报appid不存在问题。）
# 2.设备联动流程
条件：原设备和联动设备必须绑定在同一个用户下，然后再在该用户下设定设备联动的规则才能进行设备间的联动功能。
如下就是设备联动的流程图：

![Alt text](/assets/zh-cn/UserManual/LinkageAPI/1488352498616.png)

# 3.设备联动规则
## 3.1.获取可用变量
功能描述：获取可以在创建规则时使用的、跟appid关联的pk下的所有数据点标识名以及设备和产品相关变量。
1.请求URL:  [http://api.gizwits.com/app/rules/params?product_key=pk1,pk2 ](http://api.gizwits.com/app/rules/params?product_key=pk1,pk2)
2.请求方式:	GET
3.请求Header:

|参数|类型|必填|参数类型|描述|
|---|----|----|---|---|
|product_key|String|是|params|多个pk用“,”隔开，参数为空时默认选中与appid绑定的所有pk，填入与appid无绑定的pk时该pk无效|
|X-Gizwits-Application-Id|String|是|header|机智云APPID|
|X-Gizwits-User-Token|String|是|header|用户token|

## 3.2.创建规则
功能描述：创建一个设备联动规则。
1.请求URL: [http://api.gizwits.com/app/rules](http://api.gizwits.com/app/rules)
2.请求方式:POST
3.请求报文

|参数|类型|必填|参数类型|可选值|描述|
|---|----|----|---|---|---|
|X-Gizwits-Application-Id|String|是|header||机智云APPID |
|X-Gizwits-User-Token|String|是|header||用户token|
|product_key|String|是|body||产品识别码|
|did|String|是|body||设备号|
|name|String|否|body||产品名称|
|remark|String|否|body||设备别名|
|interval|Integer|否|body||最小触发间隔(单位:秒)，每当设置了此值的规则触发后，必须要经过时长等于此值的间隔时间后才可以再次触发|
|event|String|是|body|online/offline/alert/fault/data/extern|触发方式，无此参数或为空时默认值为data|
|event_attr|Object|否|body||当event为alert或fault需要的参数|
|input|Array|否|body||数组中每一个对象代表一个设备的数据,不需要使用设备数据时可忽略此参数|
|condition|Array|否|body||数组中的每一个数组代表一组条件,无此参数或为空时,表示直接触发|
|output|Array|是|body||数组中每一个数组代表一组触发动作,至少要有一个|

**参数补充说明**
**a.event**
表示该规则的触发方式,以下是可选值的意义:

```
	online  - 设备上线
    offline - 设备下线
    alert   - 设备某个报警数据点发生报警
    fault   - 设备某个故障数据点发生故障
    data    - 设备上报状态
    extern  - 外部调用触发API
```
无此参数或为空时默认值为data

**b.event_attr**
当触发方式为alert(报警)/fault(故障)时, 发生这个报警/故障的数据点,以及报警/故障的发生/恢复,由该参数指定:

```
"event_attr": {
    "attr_name": "datapoint_alert", ---- 发生这个报警/故障的数据点
    "value": "1"                    ---- 报警/故障的发生/取消, 值为1时表示发生, 值为0时表示取消
}
注: 这里提到的报警/故障的"发生"指的是－设备上一次上报的报警/故障数据点的值为0, 这一次上报的为1, 那么报警/故障发生
    这里提到的报警/故障的"恢复"指的是－设备上一次上报的报警/故障数据点的值为1, 这一次上报的为0, 那么报警/故障恢复
    其他情况均不属于"发生"和"恢复"
```

**c.did** 
当触发方式为online/offline/alert/fault/data时, 产生这个触发方式的设备由该参数指定, 以下把指定的这个设备称为主设备

**d.input** 
指定规则中需要用到的设备数据,数组中每一个对象代表一个设备的数据,不需要使用设备数据时可忽略此参数:

```
[{
    "product_key": "pk1", ---- 设备所属Product key
    "did": "did1",        ---- 设备did
    "prefix": "device1"   ---- 用于在条件及输出中引用这个设备的数据点值的前缀, 如设置了这个参数为device1时, 则device1.datapoint1表示引用这个设备的标识名为datapoint1的数据点
}]
```

**e.condition** 
指定触发规则需要满足的条件, 云端处理时将逐组检查数组内的条件, 任意一组条件满足时触发输出

```
[
    [{
        "left": "device1.datapoint1", ---- 左比较参数, 参数的值类型需要和右比较参数一致
        "opt": "==",                  ---- 比较运算符, 可选值有: >, >=, <, <=, ==, != (注:只有数值类型才能比较大小)
        "right": "1"                  ---- 右比较参数, 参数的值类型需要和左比较参数一致, 使用常数时注意,"1"代表数字1,"'1'"或"\"1\""才是字符串"1"
    }],
    [{                                ---- 每个数组表示一组条件，当这个组里的所有条件都满足时，这一组条件满足
        "left": "device1.datapoint1",
        "opt": "==",
        "right": "1"
    },{
        "left": "device2.datapoint2",
        "opt": ">",
        "right": "25"
    }]
]
```
**f.output** 
指定当条件满足时, 需要做的事情，可认为云端同时执行各组动作，各组之间互不影响

```
•	控制设备 
向设备发送控制指令
•	[
•	    [{                            ---- 每个数组表示一组输出动作，按顺序执行，前面的动作执行失败时，后面不会执行
•	        "type": "devctrl",        ---- output的类型, devctrl表示控制设备
•	        "did": "did1",            ---- 指定被控制的设备的did
•	        "attrs": {                 ---- key-value形式
•	            "datapoint1": 1,      ---- 设置datapoint1值为1
•	            "datapoint2": 25,
•	            "datapoint3": "黄色"
•	        }
•	    },{
•	        "type": "delay",          ---- output的类型, delay表示延时
•	        "delay": 5                ---- 延时时长, 单位:秒
•	    },{
•	        "type": "devctrl",
•	        "did": "did3",
•	        "raw": "1111111100000111" ---- raw形式
•	    }],
•	    [{
•	        "type": "devctrl",
•	        "did": "did2",
•	        "attrs": {
•	            "datapoint1": 1,
•	            "datapoint2": 25,
•	            "datapoint3": "黄色"
•	        }
•	    }]
•	]
```

**g.Body示例**

```
{
    "product_key": "pk1",
    "did": "did1",
    "name": "name1",
    "remark": "remark1",
    "event": "data",
    "event_attr": {
        "attr_name": "datapoint_alert",
        "value": "1"
    },
    "input": [
        {
            "product_key": "pk1",
            "did": "did1",
            "prefix": "device1"
        },
        {
            "product_key": "pk2",
            "did": "did2",
            "prefix": "device2"
        }
    ],
    "condition": [
        [{
            "left": "device1.datapoint1", ---- 布尔型
            "opt": "==",
            "right": "1"
        }],
        [{
            "left": "device2.datapoint2", ---- 数值型
            "opt": ">",
            "right": "25"
        }],
        [{
            "left": "device2.datapoint3", ---- 枚举型
            "opt": "!=",
            "right": "'黄色'"
        },{
            "left": "device2.datapoint4", ---- 扩展型
            "opt": "==",
            "right": "0xFF00"
        }]
    ],
    "output": [
        [{
            "type": "devctrl",
            "did": "did1", 
            "attrs": {
                "datapoint1": 1,
                "datapoint2": 25,
                "datapoint3": "黄色"
            }
        },{
            "type": "delay",
            "delay": 5
        },{
            "type": "devctrl",
            "did": "did3",
            "raw": "1111111100000111"
        }],
        [{
            "type": "devctrl",
            "did": "did2",
            "attrs": {
                "datapoint1": 1,
                "datapoint2": 25,
                "datapoint3": "黄色"
            }
        }]
    ]
}
```
**5.示例规则**
如：含义打开原设备Power_Switch数据点，就联动把要联动设备的数据点OnOff也打开。

```
{
    "product_key": "9005ab8399bb4338b6131a0522b3a57c",
    "did": "7qSv5w62GK36NkUWFQu8AP",
    "name": "",
    "remark": "",
    "event": "data",
      "input": [
        {
            "product_key":"9005ab8399bb4338b6131a0522b3a57c",
            "did":"7qSv5w62GK36NkUWFQu8AP",
            "prefix":"device1"
        },
        {
            "product_key":"98b133ecaa314d9d8224cd8cbc935c06",
            "did":"qkDCqFiW3s4mbXWAqpFUnW",
            "prefix":"device2"
        }
    ],
    "condition": [
    	 [{
            "left": "device1.Power_Switch", 
            "opt": "==",
            "right": "1"
        }]
	],
    "output": [
        [{
            "type":"devctrl",
            "did":"qkDCqFiW3s4mbXWAqpFUnW", 
            "attrs":{
                "OnOff":1
            }
        }]
    ]
}
```


## 3.3.获取用户规则
功能描述：获取某个用户创建的所有规则

1.请求UR: [ http://api.gizwits.com/app/rules](http://api.gizwits.com/app/rules)
2.请求方式:GET
3.请求报文

|参数|类型|必填|参数类型|描述|
|---|----|----|---|---|
|X-Gizwits-Application-Id|String|是|Header|机智云APPID|
|X-Gizwits-User-Token|String|是|Header|用户token|

## 3.4.修改规则
功能描述：根据rule_id，修改该rule_id下的规则
1.请求URL:[http://api.gizwits.com/app/rules/{rule_id}](http://api.gizwits.com/app/rules/%7Brule_id%7D)
2.请求方式:PUT
3.请求报文

|参数|类型|必填|参数类型|可选值|描述|
|---|----|----|---|---|---|
|X-Gizwits-Application-Id|String|是|header||机智云APPID |
|X-Gizwits-User-Token|String|是|header||用户token|
|product_key|String|是|body||产品识别码|
|did|String|是|body||设备号|
|name|String|否|body||产品名称|
|remark|String|否|body||设备别名|
|interval|Integer|否|body||最小触发间隔(单位:秒)，每当设置了此值的规则触发后，必须要经过时长等于此值的间隔时间后才可以再次触发|
|event|String|是|body|online/offline/alert/fault/data/extern|触发方式，无此参数或为空时默认值为data|
|event_attr|Object|否|body||当event为alert或fault需要的参数|
|input|Array|否|body||数组中每一个对象代表一个设备的数据,不需要使用设备数据时可忽略此参数|
|condition|Array|否|body||数组中的每一个数组代表一组条件,无此参数或为空时,表示直接触发|
|output|Array|是|body||数组中每一个数组代表一组触发动作,至少要有一个|

4.示例规则格式

```
{
    "product_key": "pk1",
    "did": "did1",
    "name": "name1",
    "remark": "remark1",
    "event": "data",
    "event_attr": {
        "attr_name": "datapoint_alert",
        "value": "1"
    },
    "input": [
        {
            "product_key": "pk1",
            "did": "did1",
            "prefix": "device1"
        },
        {
            "product_key": "pk2",
            "did": "did2",
            "prefix": "device2"
        }
    ],
    "condition": [
        [{
            "left": "device1.datapoint1",
            "opt": "==",
            "right": 1
        }],
        [{
            "left": "device2.datapoint2",
            "opt": ">",
            "right": 25
        }],
        [{
            "left": "device2.datapoint3",
            "opt": "!=",
            "right": "黄色"
        },{
            "left": "device2.datapoint4",
            "opt": "==",
            "right": "0xFF00"
        }]
    ],
    "output": [
        [{
            "type": "devctrl",
            "did": "did1", 
            "attrs": {
                "datapoint1": 1,
                "datapoint2": 25,
                "datapoint3": "黄色"
            }
        },{
            "type": "delay",
            "delay": 5
        },{
            "type": "devctrl",
            "did": "did3",
            "raw": "1111111100000111"
        }],
        [{
            "type": "devctrl",
            "did": "did2",
            "attrs": {
                "datapoint1": 1,
                "datapoint2": 25,
                "datapoint3": "黄色"
            }
        }]
    ]
}
```
5.修改规则的实例，
如下（规则含义为：把原设备的Power_Switch数据点打开，联动到把要联动的设备数据点OnOff打开，然后等待5s，再把要联动的设备数据点Lightness设置为25值）

```
{
    "product_key": "9005ab8399bb4338b6131a0522b3a57c",
    "did": "7qSv5w62GK36NkUWFQu8AP",
    "name": "",
    "remark": "",
    "event": "data",
    "input": [
        {
            "product_key": "9005ab8399bb4338b6131a0522b3a57c",
            "did": "7qSv5w62GK36NkUWFQu8AP",
            "prefix": "device1"
        },
        {
            "product_key": "98b133ecaa314d9d8224cd8cbc935c06",
            "did": "qkDCqFiW3s4mbXWAqpFUnW",
            "prefix": "device2"
        }
    ],
    "condition": [
        [{
            "left": "device1.Power_Switch",
            "opt": "==",
            "right": "1"
        }]
    ],
    "output": [
        [{
            "type": "devctrl",
            "did": "qkDCqFiW3s4mbXWAqpFUnW", 
            "attrs": {
                "OnOff": 1
            }
        },{
            "type": "delay",
            "delay": 5
        },{
            "type": "devctrl",
            "did": "qkDCqFiW3s4mbXWAqpFUnW",
             "attrs": {
                "Lightness": 25
            }
        }]
    ]
}
```

## 3.5.删除规则
功能描述：根据rule_id，删除该rule_id下的规则
1.请求URL: [http://api.gizwits.com/app/rules/{rule_id}](http://api.gizwits.com/app/rules/%7Brule_id%7D)
2.请求方式: DELETE
3.请求报文:

|参数|类型|必填|参数类型|可选值|描述|
|---|----|----|---|---|---|
|X-Gizwits-Application-Id|String|是|Header||机智云APPID|
|X-Gizwits-User-Token|String|是|Header||用户token|
|rule_id|Integer|是|url||规则号|

#4.参考资料
Open API文档:[http://docs.gizwits.com/zh-cn/Cloud/openapi_apps.html](http://docs.gizwits.com/zh-cn/Cloud/openapi_apps.html)
swagger使用链接:[swagger](http://swagger.gizwits.com/doc/index/openapi_apps#!/%E8%AE%BE%E5%A4%87%E8%81%94%E5%8A%A8/get_app_rules)



