title: 企业API
---

# 概述
    企业API是机智云为接入机智云平台的企业开发者提供的开放API服务，使用企业API的企业将设备接入到机智云平台后，通常还有进一步基于接入机智云设备数据开展企业某个垂直领域的业务需求。企业API为企业提供企业视角全局的设备管理、数据分析等功能，让企业更关注业务管理系统本身，减少不必要的开发成本。


#  企业API接口列表

根据机智云提供的服务，企业 API 提供如下功能:

* [授权](http://swagger.gizwits.com/doc/index/debug_enterprise#/授权)：企业开发者获取token的功能。

| API列表                                  | 描述               |
| ---------------------------------------- | ------------------ |
| [post_v1_products_product_key_access_token](#获取token)  | 获取企业API接口访问权限的功能   |



* [用户管理](http://swagger.gizwits.com/doc/index/debug_enterprise#/用户管理)：提供了搜索注册用户、搜索绑定用户等功能。

| API列表                                  | 描述               |
| ---------------------------------------- | ------------------ |
| [get_v1_products_product_key_users_search](#搜索注册用户)  |   该接口查询的是注册用户信息     |
| [get_v1_users_search](#搜索绑定用户)                       |   该接口查询的是绑定用户信息     |



* [产品管理](http://swagger.gizwits.com/doc/index/debug_enterprise#/产品管理)：提供了获取产品数据点等功能。

| API列表                                  | 描述               |
| ---------------------------------------- | ------------------ |
| [get_v1_products_product_key_datapoint](#获取产品数据点)    | 获取某个产品的数据点信息  |


* [设备管理](http://swagger.gizwits.com/doc/index/debug_enterprise#/设备管理)：提供了获取设备did、获取设备详情、搜索设备、远程控制设备、查看设备上下线记录、通信日志以及默认查询2天的历史数据等功能。

| API列表                                  | 描述               |
| ---------------------------------------- | ------------------ |
| [get_v1_products_product_key_devices](#获取设备did)               |   获取设备did    |
| [get_v1_products_product_key_device_detail](#获取设备详情)      |    获取设备详情    |
| [get_v1_products_product_key_devices_search](#搜索设备)         |     搜索设备    |
| [get_v1_products_product_key_devices_did_data](#获取设备历时数据)|  默认查询两天内的设备KV值  |
| [get_v1_products_product_key_devices_did_online](#设备上下线记录) | 获取设备上下线记录|
| [get_v1_products_product_key_devices_did_cmd](#设备通信日志) | 默认查询两天内的设备原始指令 |
| [post_v1_products_product_key_devices_did_control](#设备远程控制)   |  远程控制设备  |



* [用户报表](http://swagger.gizwits.com/doc/index/debug_enterprise#/用户报表)：提供了查询用户新增报表、企业活跃用户人数、用户地理分布、用户总数报表等功能。

| API列表                                  | 描述               |
| ---------------------------------------- | ------------------ |
| [get_v1_products_product_key_users_report_new](#用户新增报表--大数据)          |   这里指的是绑定了该 PK 下产品的新增用户  |
| [get_v1_users_liveness_total](#企业活跃用户人数)     |    企业活跃用户人数  |
| [get_v1_users_location](#用户地理分布)          |    用户地理分布   |
| [get_v1_products_product_key_users_report_total](#用户总数报表--实时)         |   用户总数   |

* [设备报表](http://swagger.gizwits.com/doc/index/debug_enterprise#/设备报表)：提供了查询设备激活报表、地理位置分布、概览、激活详情、活跃详情、设备故障、设备报警报表等功能

| API列表                                  | 描述               |
| ---------------------------------------- | ------------------ |
| [get_v1_products_product_key_devices_report_activation](#获取激活报表--大数据)              |   获取激活设备统计报表    |
| [get_v1_products_product_key_devices_locations](#获取设备地理位置分布--实时)         |   获取设备地理位置分布     |
| [get_v1_products_product_key_summary](#设备概览--大数据)                 |    最近的激活和活跃设备数     |
| [get_v1_products_product_key_incr_devices](#设备激活详情--大数据)              |    自定义查询激活设备详情    |
| [get_v1_products_product_key_active_devices](#设备活跃详情--大数据)              |    自定义查询活跃设备详情   |
| [get_v1_products_product_key_devices_report_liveness_history](#获取活跃历史报表--大数据)           |   可以获取以日、周、月为时间维度的活跃设备历史报表  |
| [get_v1_products_product_key_devices_report_rt](#设备实时统计报表--实时)              |    查询设备状态表   |
| [get_v1_products_product_key_fault_report_devices](#获取故障设备台数报表--大数据)              |  获取故障设备台数报表    |
| [get_v1_products_product_key_alert_report_devices](#获取报警设备台数报表--大数据)              |   获取报警设备台数报表   |
| [get_v1_products_product_key_fault_report_events](#获取故障次数报表--大数据)              |  获取故障次数报表    |
| [get_v1_products_product_key_fault_alert_events](#获取报警次数报表--大数据)              |   获取报警次数报表   |


* [绑定管理](http://swagger.gizwits.com/doc/index/debug_enterprise#/绑定管理)：提供了设备绑定、解绑功能。

| API列表                                  | 描述               |
| ---------------------------------------- | ------------------ |
| [post_v1_products_product_key_devices_bindings](#设备绑定功能)   | 设备绑定   |
| [delete_v1_products_product_key_devices_bindings](#解除绑定) | 解除设备绑定  |






# 协议约定
## 1、请求方式
本文档所定义接口基于HTTP/HTTPS协议进行传输，需要注意协议中标注的请求方式，通过GET、PUT、DELETE等进行不同的操作。
## 2、接口地址
接口地址中用${ }号包含的为变量，需要使用者通过对应的变量替换。例如${product_key}表示需要将获取的product_key值赋予到接口地址中，${token值}表示是需要替换为通过授权接口获取的token，${did} 表示是需要替换为具体的did。
##  3、请求参数
HTTP请求参数的类型一般分为三种。Header表示该参数是在HTTP请求头中；URL表示是通过url传参；Body表示是Request Body，通常Body中都是JSON格式

##  4、HTTP请求头部
本文档协议中设备管理类、设备报表查询类的接口在进行接口访问时，都需要在请求头增加token值，以此校验访问者是否有权访问该接口。token值是通过获取授权接口获得。
请求头格式如下：
```json
Content-Type: application/json
Authorization: token ${token值}
```
注意：${token值}是不包括${}号，只需将从获取token接口获得token值放到token之后。例如：Authorization: token  efbekskdklllsF

## 5、HTTP响应头部
本协议中的接口在返回报文头部会输出如下信息：
```json
X-RateLimit-Limit: 60     //接口允许访问总量
X-RateLimit-Remaining: 56 //接口剩余访问次数
X-RateLimit-Reset: 1372700873 //调用频率限制重置时间，TS类型
```
##  6、Token值的生命周期
Token值有效期为7天， 调用获取token接口返回的expired_at为失效日期时间戳。若现在时间戳 > expired_at时间戳，则需要重新获取token, token调用请见"获取Token"

##  7、接口请求配额说明
企业API每小时默认允许企业API接口每小时调用3600次，超过阈值则抛错，1小时后恢复接口调用。具体抛错请查看5.2错误信息表系统编码5013的相关说明





# 在线调试 企业 API

我们提供了在线 API 调试工具，在每个接口描述中，都会给出对应的调试接口链接。

下面以用户管理为例，说明 企业 API 调试工具的使用：

- 点击 [用户管理](http://swagger.gizwits.com/doc/index/debug_enterprise#!/get_v1_products_product_key_users_search) 进入接口调试页面
- 接口右边有个红色叹号，点击后弹出对话框，提示需要输入的头部信息
- 该接口需要输入 X-Gizwits-Application-Id，根据前面的说明获取 AppID 并填入，点击 "Authorize" 进行授权
- 页面自动刷新，并且叹号变成蓝色，表示需要输入的头部信息已填写（已填写并不一定表示值是正确的，如果值错误，会反应在接口返回内容中）
- 在参数输入框中输入参数值（点击参数右边的 Example Value 黄色框框，可以快速输入示例 JSON）
- 点击 "试一下" 按钮，即可完成接口调用
- 接口调用完成，会显示本地调用等效的 curl 语句，请求 URL，响应体，响应码和响应头




# 授权

## <span id = "post_v1_products_product_key_access_token">获取token</span>

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/授权/post_v1_products_product_key_access_token)


请求类型及地址

      POST
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/access_token

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| product_key				| string |  是  | path   | 产品标识符     |
| enterprise_id  			| string |  是  | body  | 企业id |
| enterprise_secret   		 | string |  是 |  body  |  企业id 密码 |
| product_secret       		| string |  是 | body    | 	 产品密匙 |



响应参数

|   参数    |  数据类型   |     描述      |
|:--------- |:------- |:------------- |  
| token     | string  | 用户token     |
| expire_at | integer | token过期时间（时间戳） |

返回例子
```json
{
  "token": "string",
  "expired_at": 0
}
```



# 用户管理

## <span id = "get_v1_users_search">搜索注册用户</span>


* 实现备注
该接口查询的是注册用户信息

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/用户管理/get_v1_users_search)


请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/users/search

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| X-Gizwits-Enterprise-ID	| string |  是  | header   | enterprise id      |
| X-Gizwits-Enterprise-Secret  | string |  否  | header   | enterprise secret|
| product_secret           | string |  是 | query    | 产品名称  product_key  |
| appid          | string |  否 | query    | 	应用id  |
| username         | string |  否 | query    | 	用户名称 |
| phone          | string |  否 | query    | 	手机号码  |
| email          | string |  否 | query    | 	邮件  |
| limit          | integer |  否 | query    | 	返回的条数，默认:20  |
| skip           | integer |  否 | query    | 跳过的条数，default:0|


响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| total      | integer | 消息总数                  |
| limit      | integer | 返回的结果条数            |
| skip       | integer | 跳过的条数                |
| previous   | string  | 上一页的请求地址          |
| next       | string  | 下一页的请求地址          |
| uid         | string  | 用户 id                 |
| username | string  | 用户名称             |
| phone | string  |     手机号码          |
| email       | string | 邮箱 |
| birthday     | string | 生日日期   |
| is_anonymous    | boolean  | 是否为匿名用户        |
| gender     | string | 性别   |
| address     | string | 地址   |
| remark     | string | 备注   |
| created_at     | integer | 创建时间   |
| updated_at     | integer | 更新时间   |




返回例子
```json
{
  "meta": {
    "total": 0,
    "limit": 0,
    "skip": 0,
    "next": "string",
    "previous": "string"
  },
  "objects": [
    {
      "uid": "string",
      "username": "string",
      "phone": "string",
      "email": "string",
      "birthday": "string",
      "is_anonymous": true,
      "gender": "string",
      "address": "string",
      "remark": "string",
      "created_at": 0,
      "updated_at": 0
    }
  ]
}
```



## <span id = "get_v1_products_product_key_users_search">搜索绑定用户</span>


* 实现备注
该接口查询的是绑定用户信息
* 说明：只有当搜索设备 did 时会返回该设备的 owner 权限情况，true：拥有 owner 权限，false：没有 owner 权限

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/用户管理/get_v1_products_product_key_users_search)


请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/users/search

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| product_key				| string |  是  | path   | 产品名称   |
| gid           | string |  否  | query     | 组ID  |
| type        | string |  否  | query     | 密码    |
|   val         | string |  否  | query     | 查询条件值   |
| limit           | integer |  否  | query     | 每次返回的条数 |
| skip       | integer |  否  | query   | 每次跳过的条数|


响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| total      | integer | 消息总数                  |
| limit      | integer | 返回的结果条数            |
| skip       | integer | 跳过的条数                |
| previous   | string  | 上一页的请求地址          |
| next       | string  | 下一页的请求地址          |
| uid         | string  | 用户 id                 |
| username | string  | 用户名称             |
| phone | string  |     手机号码          |
| email       | string | 邮箱 |
| birthday     | string | 生日日期   |
| address     | string | 地址   |
| remark     | string | 备注   |
| created_at     | integer | 创建时间   |
| is_anonymous    | boolean  | 是否为匿名用户        |
| auth_src      | object | 用户第三方信息    |
| is_owner      | boolean | 只有当搜索设备 did 时会返回该设备的 owner 权限情况，true：拥有 owner 权限，false：没有 owner 权限   |




返回例子
```json
{
  "meta": {
    "total": 0,
    "limit": 0,
    "skip": 0,
    "next": "string",
    "previous": "string"
  },
  "objects": [
    {
      "uid": "string",
      "username": "string",
      "phone": "string",
      "email": "string",
      "name": "string",
      "gender": "string",
      "birthday": "string",
      "address": "string",
      "remark": "string",
      "created_at": 0,
      "is_anomymous": true,
      "auth_src": {},
      "is_owner": true
    }
  ]
}
```


# 产品管理

## <span id = "get_v1_products_product_key_datapoint">获取产品数据点</span>

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/产品管理/get_v1_products_product_key_datapoint)


请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/datapoint


请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| product_key				| string |  是  | path  | 产品名称  |



响应参数

|   参数    |  数据类型   |     描述      |
|:--------- |:------- |:------------- |  
| name      | string  | 数据点标识名称    |
| entities   | Array[EntitiyList] | 数据点列表  |
| protocolType       | string  | 协议类型，固定长度为“standard” ，可变长度为“var_len” |
| product_key       | string  | 产品名称     |
| packetVersion       | string  |  固定值，“0x00000004”   |
| ui       | object  | 数据点 ui json    |
| display_name       | string  | 数据点名称    |
| id      | string  | entity id    |


返回例子
```json
{
  "name": "string",
  "entities": [
    {
      "display_name": "string",
      "id": 0,
      "name": "string"
    }
  ],
  "protocolType": "string",
  "product_key": "string",
  "packetVersion": "string",
  "ui": {}
}

```


# 设备管理
## <span id = "get_v1_products_product_key_devices">获取设备did</span>

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备管理/get_v1_products_product_key_devices)


请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices


请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |     
| product_key            | string |  是 | path    | 产品名称   |
| mac          | string |  是 | query    | 	mac 地址  |



响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| did      | string |     设备id              |





返回例子
```json
{
  "did": "string",
}
```

## <span id = "get_v1_products_product_key_device_detail">获取设备详情</span>

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备管理/get_v1_products_product_key_device_detail)


请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/device_detail


请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |     
| product_key            | string |  是 | path    | 产品名称   |
| mac          | string |  是 | query    | 	mac 地址  |



响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| product_key       | string |          产品名称    |
| mac          | string |  	mac 地址  |
| did           | string |  	设备 ID  |
| is_online           | boolean |  	设备是否在线，True 代表在线，False 代表离线  |
| is_disabled            | boolean |  	设备是否注销，True 代表已注销，False 代表未注销  |
| type            | string |  	设备类型  |


返回例子
```json
{
  "product_key": "string",
  "mac": "string",
  "did": "string",
  "is_online": true,
  "is_disabled": true,
  "type": "string"
}
```


## <span id = "get_v1_products_product_key_devices_search">搜索设备</span>

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备管理/get_v1_products_product_key_devices_search)


请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/search

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| product_key				| string |  是  | path   | 产品名称   |
| gid           | string |  否  | query     | 设备组 id  |
| country           | string |  否  | query     | 国家  |
| region           | string |  否  | query     | 省  |
| city           | string |  否  | query     |  城市  |
| is_online           | integer |  否  | query     | 是否在线,在线为1,不在线为0   |
| is_faulty        | integer |  否  | query     | 是否故障,故障为1,无故障为0    |
| is_alert        | integer |  否  | query     | 是否报警,报警为1,无报警为0    |
| show_disabled        | integer |  否  | query     | 显示注销为1，过滤注销为0    |
| liveness_start        | string |  否  | query     | 最近活跃时间戳|
| type        | string |  否  | query     | 可以为 did、mac、uid|
|   val         | string |  否  | query     | 查询条件值   |
| limit           | integer |  否  | query     | 每次返回的条数 |
| skip       | integer |  否  | query   | 每次跳过的条数|


响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| total      | integer | 消息总数                  |
| limit      | integer | 返回的结果条数            |
| skip       | integer | 跳过的条数                |
| previous   | string  | 上一页的请求地址          |
| next       | string  | 下一页的请求地址          |
| did         | string  | 设备 id                 |
| mac  | string  | mac 地址             |
| is_online | integer  |     是否设备在线           |
| country        | string | country  |
| region     | string | 省    |
| city      | string | 市    |
| longitude      | string | 经度    |
| latitude      | integer | 纬度    |
| is_faulty    | integer  | 是否发生故障 ,        |
| is_alert       | integer | 是否发生报警    |
| online_latest      | integer | 设备最近上线时间  |
| created_at       | integer | 设备创建时间  |



返回例子
```json
{
  "meta": {
    "total": 0,
    "limit": 0,
    "skip": 0,
    "next": "string",
    "previous": "string"
  },
  "objects": {
    "did": "string",
    "mac": "string",
    "is_online": 0,
    "country": "string",
    "region": "string",
    "city": "string",
    "longitude": "string",
    "latitude": "string",
    "is_faulty": 0,
    "is_alert": 0,
    "online_latest": 0,
    "created_at": 0
  }
}
```

## <span id = "post_v1_products_product_key_devices_did_control">远程控制</span>

远程控制设备可以通过两种方式
* 原始指令: raw
二进制转 byte 数组，如要发送 010203，就是
{
"raw": [1, 2, 3]
}
* 数据点方式: attrs
设备产品必须定义了数据点，比如要设置温度 temp 为 30 度
{
"attrs": {
  "temp": 30
}
}

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备管理/post_v1_products_product_key_devices_did_control)


请求类型及地址

      POST
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/{did}/control



请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |     
| product_key            | string |  是 | path    | 产品名称   |
| did        			 | string |  是 | path    | 设备 id |
| raw        		| Array[integer] |  是 | body  | 原始指令 |
| attrs         	 | object |  是 | body    | 数据点方式 |




响应参数
   无



返回例子
```json
{
  "raw": [
    0
  ],
  "attrs": {}
}
```

## <span id = "get_v1_products_product_key_devices_did_online">设备上下线记录</span>

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备管理/get_v1_products_product_key_devices_did_online)

ChangeLog
* 0.4.2.1 start_ts 和 end_ts不填，默认查询过去到现在两天以内的通信日志记录
* 0.4.2.1 start_ts与end_ts之间的间隔秒必须在两天范围以内
* 0.4.2.1 增加sort排序，默认为降序，asc代表升序，desc代表降序

请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/{did}/online



请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |     
| product_key           | string |  是 | path    | 产品名称   |
| did                   | string |  是 | path    | 	设备did |
| start_ts              |integer  |  否 |   query  | 	开始时间戳|
| end_ts                |integer  |  否 |   query  | 	结束时间戳|
| sort             	    |sort  | 否 |   query  | 	可以是desc和asc|
| limit             	|integer  |  否 |   query  | 	返回的结果条数  |
| skip    		  		|integer  |  否 |   query  | 	跳过的条数|




响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| total      | integer | 消息总数                  |
| limit      | integer | 返回的结果条数            |
| skip       | integer | 跳过的条数                |
| previous   | string  | 上一页的请求地址          |
| next       | string  | 下一页的请求地址          |
| timestamp      | integer | 设备上下线指令时间    |
| type       | string | 设备日志类型，如： dev2app/app2dev 等   |
| payload    | string  | 设备原始日志信息       |




返回例子
```json
{
  "meta": {
    "total": 0,
    "limit": 0,
    "skip": 0,
    "next": "string",
    "previous": "string"
  },
  "objects": [
    {
      "timestamp": 0,
      "type": "string",
      "payload": "string"
    }
  ]
}
```


## <span id = "get_v1_products_product_key_devices_did_cmd">设备通信日志</span>

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备管理/get_v1_products_product_key_devices_did_cmd)

ChangeLog
* 0.4.2.1 start_ts 和 end_ts不填，默认查询过去到现在两天以内的通信日志记录
* 0.4.2.1 start_ts与end_ts之间的间隔秒必须在两天范围以内
* 0.4.2.1 增加sort排序，默认为降序，asc代表升序，desc代表降序

请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/{did}/cmd



请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |     
| product_key           | string |  是 | path    | 产品名称   |
| did                   | string |  是 | path    | 	设备did |
| start_ts              |integer  |  否 |   query  | 	开始时间戳|
| end_ts                |integer  |  否 |   query  | 	结束时间戳|
| sort             	    |sort  | 否 |   query  | 	可以是desc和asc|
| limit             	|integer  |  否 |   query  | 	返回的结果条数  |
| skip    		  		|integer  |  否 |   query  | 	跳过的条数|




响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| total      | integer | 消息总数                  |
| limit      | integer | 返回的结果条数            |
| skip       | integer | 跳过的条数                |
| previous   | string  | 上一页的请求地址          |
| next       | string  | 下一页的请求地址          |
| timestamp      | integer | 设备上下线指令时间    |
| type       | string | 设备日志类型，如： dev2app/app2dev 等   |
| payload    | string  | 设备原始日志信息       |



返回例子
```json
{
  "meta": {
    "total": 0,
    "limit": 0,
    "skip": 0,
    "next": "string",
    "previous": "string"
  },
  "objects": [
    {
      "timestamp": 0,
      "type": "string",
      "payload": "string"
    }
  ]
}
```

## <span id = "get_v1_products_product_key_devices_did_data">获取设备历时数据</span>

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备管理/get_v1_products_product_key_devices_did_data)

ChangeLog
* 0.4.2.1 start_ts 和 end_ts不填，默认查询过去到现在两天以内的通信日志记录
* 0.4.2.1 start_ts与end_ts之间的间隔秒必须在两天范围以内
* 0.4.2.1 增加sort排序，默认为降序，asc代表升序，desc代表降序

请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/{did}/data



请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |     
| product_key           | string |  是 | path    | 产品名称   |
| did                   | string |  是 | path    | 	设备did |
| start_ts              |integer  |  否 |   query  | 	开始时间戳|
| end_ts                |integer  |  否 |   query  | 	结束时间戳|
| sort             	    |sort  | 否 |   query  | 	可以是desc和asc|
| limit             	|integer  |  否 |   query  | 	返回的结果条数  |
| skip    		  		|integer  |  否 |   query  | 	跳过的条数|




响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| total      | integer | 消息总数                  |
| limit      | integer | 返回的结果条数            |
| skip       | integer | 跳过的条数                |
| previous   | string  | 上一页的请求地址          |
| next       | string  | 下一页的请求地址          |
| longitude      | string | 经度    |
| latitude      | integer | 纬度    |

返回例子
```json
{
  "meta": {
    "total": 0,
    "limit": 0,
    "skip": 0,
    "next": "string",
    "previous": "string"
  },
  "objects": [
    {
      "ts": 0,
      "attrs": {
        "longitude": "string",
        "latitude": "string"
      }
    }
  ]
}
```





# 用户报表

## <span id = "get_v1_products_product_key_users_report_new">用户新增报表</span>

实现备注：
这里指的是绑定了该 PK 下产品的新增用户
日期查询说明：
* cycle 为 date 时，start,end的格式是年-月-日，example:2016-08-01,
* cycle 为 week 时，start,end的格式是年-周，example:2016-51
* cycle 为 month 时，start,end的格式为年-月，example:2016-12

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/用户报表/get_v1_products_product_key_users_report_new)


请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/users/report/new


请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |     
| product_key            | string |  是 | path    | 产品名称   |
| gid         			| string |  是 | query    | 设备组id  |
| cycle         		| string |  否 | query    | 统计周期，可以为 date、week、month  |
| start         		| string |  是 | query    | 起始周期，为起始日期、起始周或起始月 |
| end         			| string |  是 | query    | 结束周期，为结束日期、结束周或结束月|



响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| did      		| string |     设备组 id               |
| cycle       | string |     周期，分为 month,week,date        |
| start      		| string |     开始日期             |
| data      		| string |    日期    |
| count      		| string |     数量                |
| location      		| object |     地理位置信息               |



返回例子
```json
{
  "gid": "string",
  "cycle": "string",
  "start": "string",
  "end": "string",
  "data": [
    {
      "date": "string",
      "count": 0,
      "location": {}
    }
  ]
}
```

## <span id = "get_v1_users_liveness_total">企业活跃用户人数</span>


* 实现备注
该接口查询的是企业活跃用户人数

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/用户报表/get_v1_users_liveness_total)


请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/users/liveness_total

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| X-Gizwits-Enterprise-ID	| string |  是  | header   | enterprise id      |
| X-Gizwits-Enterprise-Secret  | string |  是  | header   | enterprise secret   |
| product_secret           | string |  是 | query    | 产品标识码 product_key  |
| appid          | string |  否 | query    | 	应用id  |
| start_date         | string |  是 | query    | 	开始日期，如：2015-01-02 |
| end_date          | string |  是 | query    | 	结束日期，如：2015-01-03  |



响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| date      | string | 日期                 |
| count       | integer | 数量          |



返回例子
```json
{
  "data": [
    {
      "date": "string",
      "count": 0
    }
  ]
}
```

## <span id = "get_v1_users_location">用户地理分布</span>


* 实现备注
该接口查询的是企业用户地理分布

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/用户报表/get_v1_users_location)


请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/users/location

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| X-Gizwits-Enterprise-ID	| string |  是  | header   | enterprise id     |
| X-Gizwits-Enterprise-Secret  | string |  是  | header   | enterprise secret  |
| product_secret           | string |  是 | query    | 产品标识码 product_key  |




响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| count       | integer | 数 量           |



返回例子
```json
{
  "China": {
    "count": 0,
    "Guangdong": {
      "count": 0,
      "Guangzhou": {
        "count": 0
      }
    }
  }
}
```

## <span id = "get_v1_products_product_key_users_report_total">用户总数报表</span>


* 实现备注
查询用户空间表，获取曾经绑定过该 pk 设备的用户总数

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/用户报表/get_v1_products_product_key_users_report_total)


请求类型及地址

      GET
     http://enterpriseapi.gizwits.com/v1/products/{product_key}/users/report/total

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
|product_key	| string |  是  | path   | 产品标识码     |
| gid  | string |  否  | query   | 设备组id   |



响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| gid      | string | 设备组 id           |
| total       | integer | 用户总数           |


返回例子
```json
{
  "gid": "string",
  "total": 0
}
```


# 设备报表

## <span id = "get_v1_products_product_key_devices_locations">获取设备地理位置分布</span>


* 实现备注
获取设备地理位置分布报表

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/用户报表/get_v1_products_product_key_devices_locations)


请求类型及地址

      GET
     http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/locations

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
|product_key	| string |  是  | path   | 产品标识码     |
| gid  			| string |  否  | query   | 设备组id   |
| is_online 	 | integer |  否  | query   | 是否在线   |
| is_faulty  	| integer |  否  | query   | 是否故障   |
| is_alert  	| integer |  否  | query   | 是否报警   |



响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| gid      | string | 设备组 id           |
| total       | integer | 设备总数           |
| location        | object | 设备地理位置信息           |


返回例子
```json
{
  "gid": "string",
  "total": 0,
  "location": {}
}
```

## <span id = "get_v1_products_product_key_summary">设备概览</span>


* 实现备注
获取最近的激活和活跃设备数报表

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/用户报表/get_v1_products_product_key_devices_locations)


请求类型及地址

      GET
     http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/locations

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
|product_key	| string |  是  | path   | 产品标识码     |
    



响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| online      | integer | 设备在线数           |
| total       | integer | 设备类型上线数           |
| today        | object | 今日新增设备数            |
| yesterday        | object | 昨日新增设备数           |
| 7_day        | object | 近7天新增设备数           |
| 30_day        | object | 近30天新增设备数           |


返回例子
```json
{
  "online": 0,
  "total": 0,
  "new": {
    "today": 0,
    "yesterday": 0,
    "7_day": 0,
    "30_day": 0
  },
  "active": {
    "yesterday": 0,
    "7_day": 0
  }
}
```

## <span id = "get_v1_products_product_key_incr_devices">设备激活详情</span>

实现备注
* 获取设备激活详情报表
日期查询说明
* start,end 的格式是年-月-日，example:2016-08-01,
* 注意：蓝牙设备响应返回的结果为device_sn字段

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备报表/get_v1_products_product_key_incr_devices)


请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/incr_devices

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| product_key				| string |  是  | path   | 产品标识码  |
| start           | string |  否  | query     | 字符串开始日期 |
| end           | string |  否  | query     | 字符串结束日期 |
| country           | string |  否  | query     | 国家  |
| region           | string |  否  | query     | 省  |
| city           | string |  否  | query     |  城市  |


响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| total      | integer | 消息总数                  |
| limit      | integer | 返回的结果条数            |
| skip       | integer | 跳过的条数                |
| previous   | string  | 上一页的请求地址          |
| next       | string  | 下一页的请求地址          |
| report_date         | string  | 报表日期         |
| product_key  | string  | 产品标识码             |
| mac		 | string  |     mac地址           |
| device_sn        | string | 设备序列号  |
| country     | string |  国家   |
| region      | string |  省   |
| city      | string | 城市    |
| created_at      | string | 设备创建时间    |




返回例子
```json
{
  "meta": {
    "total": 0,
    "limit": 0,
    "skip": 0,
    "next": "string",
    "previous": "string"
  },
  "objects": [
    {
      "report_date": "string",
      "product_key": "string",
      "mac": "string",
      "device_sn": "string",
      "country": "string",
      "region": "string",
      "city": "string",
      "created_at": "string"
    }
  ]
}
```


## <span id = "get_v1_products_product_key_active_devices">设备活跃详情</span>

实现备注
* 获取设备活跃详情报表
日期查询说明
* start,end 的格式是年-月-日，example:2016-08-01,
* 注意：蓝牙设备响应返回的结果为device_sn字段

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备报表/get_v1_products_product_key_active_devices)


请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/active_devices

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| product_key				| string |  是  | path   | 产品标识码  |
| start           | string |  否  | query     | 字符串开始日期 |
| end           | string |  否  | query     | 字符串结束日期 |
| country           | string |  否  | query     | 国家  |
| region           | string |  否  | query     | 省  |
| city           | string |  否  | query     |  城市  |


响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| total      | integer | 消息总数                  |
| limit      | integer | 返回的结果条数            |
| skip       | integer | 跳过的条数                |
| previous   | string  | 上一页的请求地址          |
| next       | string  | 下一页的请求地址          |
| report_date         | string  | 报表日期         |
| product_key  | string  | 产品标识码             |
| mac		 | string  |     mac地址           |
| device_sn        | string | 设备序列号  |
| country     | string |  国家   |
| region      | string |  省   |
| city      | string | 城市    |
| created_at      | string | 设备创建时间    |




返回例子
```json
{
  "meta": {
    "total": 0,
    "limit": 0,
    "skip": 0,
    "next": "string",
    "previous": "string"
  },
  "objects": [
    {
      "report_date": "string",
      "product_key": "string",
      "mac": "string",
      "device_sn": "string",
      "country": "string",
      "region": "string",
      "city": "string",
      "created_at": "string"
    }
  ]
}
```


## <span id = "get_v1_products_product_key_devices_report_liveness_history">获取活跃历史报表</span>

实现备注
活跃设备：一天之内有数据上报的设备
* 日报表最多查询 30 天。
* 周报表最多查询 53 周。
* 月报表最多查询 12 月。
日期查询说明
* cycle 为 date 时，start,end 的格式是年-月-日，example:2016-08-01,
* cycle 为 week 时，start,end 的格式是年-周，example:2016-51
* cycle 为 month 时，start,end 的格式为年-月，example:2016-12

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备报表/get_v1_products_product_key_devices_report_liveness_history)


请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/report/liveness/history

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| product_key				| string |  是  | path   | 产品标识码  |
| gid          | string |  否  | query     | 设备组 id |
| cycle           | string |  否  | query     | 统计周期，可以是日、周、月 |
| start           | string |  是  | query     | 开始日期  |
| end           | string |  是  | query     | 结束日期  |



响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| gid        | string | 设备组 id                   |
| cycle       | string | 周期，分为 month,week,date   |
| start       | string | 开始日期                 |
| end    | string  | 结束日期           |
| date        | string  | 日期           |
| count          | integer  | 数量          |
| location   | object  | 地理位置信息|
             

返回例子
```json
{
  "gid": "string",
  "cycle": "string",
  "start": "string",
  "end": "string",
  "data": [
    {
      "date": "string",
      "count": 0,
      "location": {}
    }
  ]
}
```

## <span id = "get_v1_products_product_key_devices_report_rt">设备实时统计报表</span>
实现备注
* 获取设备实时统计报表

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备报表/get_v1_products_product_key_devices_report_rt)


请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/report/devices/report/rt

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| product_key				| string |  是  | path   | 产品标识码  |
| gid          | string |  否  | query     | 设备组 id |




响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| gid        | string | 设备组 id                   |
| activated     | integer | 激活数  |
| faulty        | integer | 故障数        |
| end    | integer  | 报警数           |

             

返回例子
```json
{
  "gid": "string",
  "count": {
    "activated": 0,
    "faulty": 0,
    "alert": 0
  },
  "location": {
    "China": {
      "count": {
        "activated": 0,
        "faulty": 0,
        "alert": 0
      }
    }
  }

```


## <span id = "get_v1_products_product_key_fault_report_devices">获取故障设备台数报表</span>

实现备注
* 获取故障设备台数报表


[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备报表/get_v1_products_product_key_fault_report_devices)


请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/fault/report/devices

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| product_key				| string |  是  | path   | 产品标识码  |
| gid          | string |  否  | query     | 设备组 id |



响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| gid         | string | 设备组 id                  |
| total 	       | integer | 设备总数   |
| resolved         | integer | 设备已解决数                  |
| unresolved         | integer | 设备未解决数                 |


返回例子
```json
{
  "gid": "string",
  "count": {
    "total": 0,
    "resolved": 0,
    "unresolved": 0
  },
  "location": {}
}
```


## <span id = "get_v1_products_product_key_alert_report_devices">获取报警设备台数报表</span>

实现备注
* 获取报警设备台数报表


[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备报表/get_v1_products_product_key_alert_report_devices)


请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/alert/report/devices

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| product_key				| string |  是  | path   | 产品标识码  |
| gid          | string |  否  | query     | 设备组 id |



响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| gid         | string | 设备组 id                  |
| total 	       | integer | 设备总数   |
| resolved         | integer | 设备已解决数                  |
| unresolved         | integer | 设备未解决数                 |


返回例子
```json
{
  "gid": "string",
  "count": {
    "total": 0,
    "resolved": 0,
    "unresolved": 0
  },
  "location": {}
}
```

## <span id = "get_v1_products_product_key_fault_report_events">获取故障次数报表</span>

实现备注
* 获取故障次数报表


[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备报表/get_v1_products_product_key_fault_report_events)


请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/fault/report/events

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| product_key				| string |  是  | path   | 产品标识码  |
| gid          | string |  否  | query     | 设备组 id |



响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| gid         | string | 设备组 id                  |
| detail          | object | 设备详情信息                 |
| location         | object | 设备地理位置信息               |
| total 	       | integer | 设备总数   |
| resolved         | integer | 设备已解决数                  |
| unresolved         | integer | 设备未解决数                 |


返回例子
```json
{
  "gid": "string",
  "count": {
    "total": 0,
    "resolved": 0,
    "unresolved": 0
  },
  "detail": {},
  "location": {}
}
```


## <span id = "get_v1_products_product_key_fault_alert_events">获取报警次数报表</span>

实现备注
* 获取报警次数报表


[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备报表/get_v1_products_product_key_fault_alert_events)


请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/alert/report/devices

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| product_key				| string |  是  | path   | 产品标识码  |
| gid          | string |  否  | query     | 设备组 id |



响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| gid         | string | 设备组 id                  |
| detail          | object | 设备详情信息                 |
| location         | object | 设备地理位置信息               |
| total 	       | integer | 设备总数   |
| resolved         | integer | 设备已解决数                  |
| unresolved         | integer | 设备未解决数                 |


返回例子
```json
{
  "gid": "string",
  "count": {
    "total": 0,
    "resolved": 0,
    "unresolved": 0
  },
  "detail": {},
  "location": {}
}
```





# 绑定管理

## <span id = "post_v1_products_product_key_devices_bindings">设备绑定功能</span>


[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/绑定管理/post_v1_products_product_key_devices_bindings)


请求类型及地址

      POST 
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/bindings

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| product_key				| string |  是  | path   | 产品标识码  |
| uid          | string |  是  | body     | 用户 id |
| appid           | string |  是  | body     | 应用  id |
| dids           | string |  是  | body     | did 列表  |


响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| success         | Array[string], | 绑定成功列表     |
| failed           | Array[string], |  绑定失败列表    |


返回例子
```json
{
  "success": [
    "string"
  ],
  "failed": [
    "string"
  ]
}
```

## <span id = "delete_v1_products_product_key_devices_bindings">解除绑定</span>


[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/绑定管理/delete_v1_products_product_key_devices_bindings)


请求类型及地址

      DELETE
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/bindings

请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| product_key				| string |  是  | path   | 产品标识码  |
| uid          | string |  是  | body     | 用户 id |
| appid           | string |  是  | body     | 应用  id |
| dids           | string |  是  | body     | did 列表  |


响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| success         | Array[string], | 绑定成功列表     |
| failed           | Array[string], |  绑定失败列表    |


返回例子
```json
{
  "success": [
    "string"
  ],
  "failed": [
    "string"
  ]
}
```




































# 接口错误

## 错误信息格式
```json
{
      "error_code": "5001",
      "error_message": "body json invalid",
      "detail": ""
}
```

## 错误信息表
|HTTP响应编码|	系统错误编码	| 错误信息描述 | 	解决办法 |
| ------------- |:-------------:|:-------------|:-------------|
|400|   5001|   json字串格式错误|   核对json字串|
|400|   5002|   form invalid|   输入数据不对|
|404|   5003|   enterprise id not exist|   Eid不存在，检查是否申请或者Eid输入错误|
|400|   5004|   enterprise secret error|   Esecret校验失败，检查是否是正确的|
|400|   5005|   product secret error|   Product Secret校验失败，检查是否是正确的|
|400|   5006|   product exist devicegroups| |
|404|   5007|   association not exist|   表示Eid没有雨对应的产品Product Key 关联，必须成功关联才能操作|
|400|   5008|   association existed| |
|400|   5009|   token invalid|   请携带token或检查token字段格式,正确的token格式是在http header中输入:token ${token值}，token后面必须空一格后再写入具体的token值|
|400|   5010|   token未匹配|   请核对token|
|400|	5011|	token过期|	请再次获取token|
|400|	5012|	发起关联请求的主机ip无访问权限|   添加ip到ip企业数据访问白名单中|
|403|	5013|	接口使用过于频繁|   等待一定时间后再次使用此接口|
|400|	5014|	Report has not been generated!|	 |
|404|	5015|	Product Key不存在|   核对产品Product Key是否正确|
|403|	5201|	device group not belong to this product|  |
|404|	5202|	parent group not exist| |
|400|	5203|	already has one root group| |
|400|	5204|	group has subgroup|	 |
|400|	5205|	group has device item| |
|404|	5206|	group not exist| |
|404|	5301|	设备不存在|   核对设备ID|
|403|	5302|	产品与设备未绑定|   请先将设备绑定到产品|
|400|	5303|	device not bound| |
|400|	5304|	设备未激活|   激活设备|
|400|	5305|	设备处于下线状态|   上线设备|
|400|	5401|	数据点错误|	核对数据点信息|
|400|	5402|	数据点未定义|   先定义数据点,然后再次尝试|
|400|	5403|	控制命令发送失败|   请再次使用此接口|
|400|	5404|	remote control not allowed|   远程控制操作需要后台开启|
