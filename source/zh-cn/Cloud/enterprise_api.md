title: 企业API
---

# 概述

企业API是机智云为接入机智云平台 的企业开发者提供的开放API服务，使用企业API的企业将设备接入到机智云平台后，通常还有进一步基于接入机智云设备数据开展企业某个垂直领域的业务需求。企业API为企业提供企业视角全局的设备管理、数据分析等功能，让企业更关注业务管理系统本身，减少不必要的开发成本。

#  企业API接口列表

根据机智云提供的服务，企业 API 提供如下功能:

* [授权](http://swagger.gizwits.com/doc/index/debug_enterprise#/授权)：企业开发者获取token的功能。

| API列表                                  | 描述               |
| ---------------------------------------- | ------------------ |
| [post_v1_products_product_key_access_token](#获取token)  | 获取企业API接口访问权限的功能   |

* [产品管理](http://swagger.gizwits.com/doc/index/debug_enterprise#/产品管理)：提供了获取产品数据点等功能。

| API列表                                  | 描述               |
| ---------------------------------------- | ------------------ |
| [get_v1_products_product_key_datapoint](#获取产品数据点)    | 获取某个产品的数据点信息  |

* [用户管理](http://swagger.gizwits.com/doc/index/debug_enterprise#/用户管理)：提供了搜索注册用户、搜索绑定用户等功能。

| API列表                                  | 描述               |
| ---------------------------------------- | ------------------ |
| [get_v1_products_product_key_users_search](#搜索注册用户)  |   该接口查询的是注册用户信息     |
| [get_v1_users_search](#搜索绑定用户)                       |   该接口查询的是绑定用户信息     |


* [设备管理](http://swagger.gizwits.com/doc/index/debug_enterprise#/设备管理)：提供了获取设备did、获取设备详情、搜索设备、远程控制设备、查看设备上下线记录、通信日志以及默认查询2天的历史数据等功能。

| API列表                                  | 描述               |
| ---------------------------------------- | ------------------ |
| [get_v1_products_product_key_devices](#获取设备did)               |   获取设备did    |
| [get_v1_products_product_key_device_detail](#获取设备详情)      |    获取设备详情    |
| [get_v1_products_product_key_devices_search](#搜索设备)         |     搜索设备    |
| [get_v1_products_product_key_devices_did_data](#获取设备历史数据)|  默认查询两天内的设备KV值  |
| [get_v1_products_product_key_devices_did_online](#设备上下线记录) | 获取设备上下线记录|
| [get_v1_products_product_key_devices_did_cmd](#设备通信日志) | 默认查询两天内的设备原始指令 |
| [post_v1_products_product_key_devices_did_control](#设备远程控制)   |  远程控制设备  |


* [设备组管理](http://swagger.gizwits.com/doc/index/debug_enterprise#/设备组管理)：提供了创建设备组、查询设备组列表、删除设备组、更新设备组、获取设备组下mac列表等功能。

| API列表                                  | 描述               |
| ---------------------------------------- | ------------------ |
| [get_v1_products_product_key_device_groups](#获取设备组树形结构)               |   获取设备组树形结构  |
| [post_v1_products_product_key_device_groups](#创建设备组)      |    创建设备组   |
| [delete_v1_products_product_key_device_groups_gid](#删除设备组)         |     删除设备组    |
| [get_v1_products_product_key_device_groups_gid](#获取设备组下的mac列表)|  获取设备组下的mac列表  |
| [put_v1_products_product_key_device_groups_gid](#更新设备组) | 更新设备组|

* [绑定管理](http://swagger.gizwits.com/doc/index/debug_enterprise#/绑定管理)：提供了设备绑定、解绑功能。

| API列表                                  | 描述               |
| ---------------------------------------- | ------------------ |
| [post_v1_products_product_key_devices_bindings](#设备绑定功能)   | 设备绑定   |
| [delete_v1_products_product_key_devices_bindings](#解除绑定) | 解除设备绑定  |


* [设备报表](http://swagger.gizwits.com/doc/index/debug_enterprise#/设备报表)：提供了查询设备激活报表、地理位置分布、概览、激活详情、活跃详情、设备故障、设备报警报表等功能

| API列表                                  | 描述               |
| ---------------------------------------- | ------------------ |
| [get_v1_products_product_key_devices_report_activation](#获取激活报表)              |   获取激活设备统计报表    |
| [get_v1_products_product_key_devices_locations](#获取设备地理位置分布)         |   获取设备地理位置分布     |
| [get_v1_products_product_key_summary](#设备概览)                 |    最近的激活和活跃设备数     |
| [get_v1_products_product_key_incr_devices](#设备激活详情)              |    自定义查询激活设备详情    |
| [get_v1_products_product_key_active_devices](#设备活跃详情)              |    自定义查询活跃设备详情   |
| [get_v1_products_product_key_devices_report_liveness_history](#获取活跃历史报表)           |   可以获取以日、周、月为时间维度的活跃设备历史报表  |
| [get_v1_products_product_key_devices_report_rt](#设备实时统计报表)              |    查询设备状态表   |
| [get_v1_products_product_key_fault_report_devices](#获取故障设备台数报表)              |  获取故障设备台数报表    |
| [get_v1_products_product_key_alert_report_devices](#获取报警设备台数报表)              |   获取报警设备台数报表   |
| [get_v1_products_product_key_fault_report_events](#获取故障次数报表)              |  获取故障次数报表    |
| [get_v1_products_product_key_fault_alert_events](#获取报警次数报表)              |   获取报警次数报表   |




* [用户报表](http://swagger.gizwits.com/doc/index/debug_enterprise#/用户报表)：提供了查询用户新增报表、企业活跃用户人数、用户地理分布、用户总数报表等功能。

| API列表                                  | 描述               |
| ---------------------------------------- | ------------------ |
| [get_v1_products_product_key_users_report_new](#用户新增报表)          |   这里指的是绑定了该 PK 下产品的新增用户  |
| [get_v1_users_liveness_total](#企业活跃用户人数)     |    企业活跃用户人数  |
| [get_v1_users_location](#用户地理分布)          |    用户地理分布   |
| [get_v1_products_product_key_users_report_total](#用户总数报表)         |   用户总数   |






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
```
Content-Type: application/json
Authorization: token ${token值}
```
注意：${token值}是不包括${}号，只需将从获取token接口获得token值放到token之后。例如：Authorization: token  efbekskdklllsF

## 5、HTTP响应头部
本协议中的接口在返回报文头部会输出如下信息：
```
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

## 获取token

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/授权/post_v1_products_product_key_access_token)


#### 请求类型及地址

      POST
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/access_token

#### 请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| product_key				| string |  是  | path   | 产品标识符     |
| enterprise_id  			| string |  是  | body  | 企业id |
| enterprise_secret   		 | string |  是 |  body  |  企业id 密码 |
| product_secret       		| string |  是 | body    | 	 产品密匙 |



#### 响应参数

|   参数    |  数据类型   |     描述      |
|:--------- |:------- |:------------- |  
| token     | string  | 用户token     |
| expire_at | integer | token过期时间（时间戳） |

#### 返回例子
```json
{
  "token": "89d753a234ef42cd90f75da7489e78a4",
  "expired_at": 1517897923
}
```

# 产品管理

## 获取产品数据点
该接口查询的是产品的数据点定义 
*  数值型数据点真实范围需要通过计算获得
```
最大值 = max * ratio + addition
最小值 = min * ratio + addition
```

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/产品管理/get_v1_products_product_key_datapoint)


#### 请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/datapoint


#### 请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| product_key				| string |  是  | path  | 产品名称  |



#### 响应参数

| 参数           | 类型           | 描述                                                                                      |
| -------------- | -------------- | ----------------------------------------------------------------------------------------- |
| name           | string         | 产品名称                                                                                  |
| entities       | Array          | [EntitiyList]                                                                              |
| protocolType   | string         | 固定值：standard                                                                          |
| product_key    | string         | 产品product_key                                                                           |
| packetVersion  | string         | 固定值：0x00000004                                                                                 |
| ui             | inline_model_7 | 手机客户端 UI 定义                                                                        |
| EntitiyList     | ——————         | ——————                                                                                    |
| id             | integer        | 固定值：0                                                                                 |
| name           | string         | 固定值：entity0                                                                           |
| display_name   | string         | 固定值：机智云开发套件                                                                    |
| attrs          | Array          | [AttrItem]                                                                                |
| inline_model_7 | ——————         | ——————                                                                                    |
| object         | inline_model_1 |                                                                                           |
| sections       | Array          | UI 片段列表:[SectionItem]                                                                 |
| AttrItem       | ——————         | ——————                                                                                    |
| id             | integer        | 数据点顺序                                                                                |
| name           | string         | 数据点标示名                                                                              |
| display_name   | string         | 数据点显示名                                                                              |
| desc           | string         | 固定值：.....                                                                             |
| type           | string         | 读写类型，W: 读写,R: 只读,N: 报警,E: 故障                                                 |
| data_type      | string         | 数据类型，bool：布尔;'uint8','uint16','uint32'：数值型;enum：枚举;binary:扩展型]          |
| uint_spec      | inline_model_4 | 当 data_type 为 uint8/uint16/uint32 时，有该字段                                          |
| enum           | Array          | 当 data_type 为 enum 时，有该字段                                                         |
| position       | inline_model_5 | 字节与比特位描述                                                                          |
| inline_model_1 | ——————         | ——————                                                                                    |
| version        | integer        | 固定值：4                                                                                 |
| showEditButton | boolean        | 固定值：false                                                                             |
| SectionItem    | ——————         | ——————                                                                                    |
| elements       | Array          | [ElementItem]                                                                             |
| inline_model_4 | ——————         | ——————                                                                                    |
| min            | integer        | 最少值                                                                                    |
| max            | integer        | 最大值                                                                                    |
| ratio          | number         | 分辨率k                                                                                   |
| addition       | integer        | 增量                                                                                      |
| inline_model_5 | ——————         | ——————                                                                                    |
| bit_offset     | integer        | 位索引，如果为变长协议，固定为 0                                                          |
| len            | integer        | 长度                                                                                      |
| unit           | string         | 单位，'bit', 'byte'                                                                       |
| byte_offset    | integer        | 字节索引，如果为变长协议，固定为 0                                                        |
| ElementItem    | ——————         | ——————                                                                                    |
| title          | string         | 数据点显示名                                                                              |
| key            | string         | entity0.{数据点标示名}                                                                    |
| type           | string         | 'QBooleanElement', 'QFloatElement', 'QRadioElement', 'QMultilineElement', 'QLabelElement' |
| keyboardType   | string         | 键盘类型，固定值，"NumbersAndPunctuation"                                                 |
| maxLength      | integer        | type 为 QMultilineElement 才有该字段，最大长度，为数据点定义长度的 2 倍                   |
| items          | Array          | type 为 QRadioElement 才有该字段，枚举值列表                                              |
| boolValue      | boolean        | type 为 QBooleanElement 才有该字段，固定值：false                                         |
| bind           | string         | type 为 QFloatElement 才有该字段，固定值：floatValue:float                                |
| maximumValue   | number         | type 为 QFloatElement 才有该字段，最大值                                                  |
| minimumValue   | number         | type 为 QFloatElement 才有该字段，最少值                                                  |
| value          | integer        | type 为 QFloatElement 才有该字段，固定值：0                                               |
| object         | inline_model_6 |                                                                                           |
| inline_model_6 | ——————         | ——————                                                                                    |
| action         | string         | 固定值:entity0                                                                            |
| bind           | Array[string]  | 固定值:entity0.{数据点标示名}                                                             |
| perm           | string         | 读写类型：W: 读写,R: 只读,N: 报警,E: 故障                                                 |
| unit_spec      | inline_model_2 | type 为 QFloatElement 才有该字段                                                          |
| inline_model_2 | ——————         | ——————                                                                                    |
| max            | integer        | 最大值                                                                                    |
| step           | integer        | 步进                                                                                      |
| min            | integer        | 最小值                                                                                    |



#### 返回例子
```json
{
  "name": "微信宠物屋",
  "entities": [
    {
      "id": 0,
      "display_name": "机智云开发套件",
      "attrs": [
        {
          "display_name": "开关",
          "name": "switch",
          "data_type": "bool",
          "position": {
            "bit_offset": 0,
            "len": 1,
            "unit": "bit",
            "byte_offset": 0
          },
          "type": "status_writable",
          "id": 0,
          "desc": "....."
        }
      ],
      "name": "entity0"
    }
  ],
  "protocolType": "standard",
  "product_key": "4244bf2d79694a259232431b6f2ef46a",
  "packetVersion": "0x00000004",
  "ui": {
    "object": {
      "version": 4,
      "showEditButton": false
    },
    "sections": [
      {
        "elements": [
          {
            "boolValue": false,
            "object": {
              "action": "entity0",
              "bind": [
                "entity0.switch"
              ],
              "perm": "W"
            },
            "type": "QBooleanElement",
            "key": "entity0.switch",
            "title": "开关"
          }
        ]
      }
    ]
  }
}

```


# 用户管理

## 搜索注册用户</span>

该接口查询的是注册用户信息

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/用户管理/get_v1_users_search)


#### 请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/users/search

#### 请求参数

| 参数                        | 数据类型 | 必填 | 参数类型 | 描述                  |
|:--------------------------- |:-------- |:----:|:-------- |:--------------------- |
| X-Gizwits-Enterprise-ID     | string   |  是  | header   | enterprise id         |
| X-Gizwits-Enterprise-Secret | string   |  否  | header   | enterprise secret     |
| product_key                 | string   |  是  | query    | 产品名称  product_key |
| appid                       | string   |  否  | query    | 应用id                |
| username                    | string   |  否  | query    | 用户名称              |
| phone                       | string   |  否  | query    | 手机号码              |
| email                       | string   |  否  | query    | 邮件                  |
| limit                       | integer  |  否  | query    | 返回的条数，默认:20   |
| skip                        | integer  |  否  | query    | 跳过的条数，default:0 |


#### 响应参数

| 参数         | 数据类型 | 描述             |
|:------------ |:-------- |:---------------- |
| total        | integer  | 消息总数         |
| limit        | integer  | 返回的结果条数   |
| skip         | integer  | 跳过的条数       |
| previous     | string   | 上一页的请求地址 |
| next         | string   | 下一页的请求地址 |
| uid          | string   | 用户 id          |
| username     | string   | 用户名称         |
| phone        | string   | 手机号码         |
| email        | string   | 邮箱             |
| birthday     | string   | 生日日期         |
| is_anonymous | boolean  | 是否为匿名用户   |
| gender       | string   | 性别             |
| address      | string   | 地址             |
| remark       | string   | 备注             |
| created_at   | integer  | 创建时间         |
| updated_at   | integer  | 更新时间         |




#### 返回例子
```json
{
  "meta": {
    "previous": null,
    "skip": 0,
    "total": 20,
    "limit": 20,
    "next":null
  },
  "objects": [
    {
      "username": null,
      "remark": null,
      "uid": "25a5324c807842348f63ade277eb413a",
      "is_anonymous": true,
      "gender": null,
      "created_at": 1513135417,
      "updated_at": 1513135417,
      "phone": null,
      "birthday": null,
      "address": null,
      "email": null
    }
  ]
}
```



## 搜索绑定用户

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/用户管理/get_v1_products_product_key_users_search)

该接口用于查询的是绑定用户信息
* 只有当搜索设备 did 时会返回该设备的 owner 权限情况，true：拥有 owner 权限，false：没有 owner 权限

#### 请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/users/search

#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述           |
|:----------- |:-------- |:----:|:-------- |:-------------- |
| product_key | string   |  是  | path     | 产品名称       |
| gid         | string   |  否  | query    | 组ID           |
| type        | string   |  否  | query    | 密码           |
| val         | string   |  否  | query    | 查询条件值     |
| limit       | integer  |  否  | query    | 每次返回的条数 |
| skip        | integer  |  否  | query    | 每次跳过的条数 |


#### 响应参数

| 参数         | 数据类型 | 描述                                                                                              |
|:------------ |:-------- |:------------------------------------------------------------------------------------------------- |
| total        | integer  | 消息总数                                                                                          |
| limit        | integer  | 返回的结果条数                                                                                    |
| skip         | integer  | 跳过的条数                                                                                        |
| previous     | string   | 上一页的请求地址                                                                                  |
| next         | string   | 下一页的请求地址                                                                                  |
| uid          | string   | 用户 id                                                                                           |
| username     | string   | 用户名称                                                                                          |
| phone        | string   | 手机号码                                                                                          |
| email        | string   | 邮箱                                                                                              |
| birthday     | string   | 生日日期                                                                                          |
| address      | string   | 地址                                                                                              |
| remark       | string   | 备注                                                                                              |
| created_at   | integer  | 创建时间                                                                                          |
| is_anonymous | boolean  | 是否为匿名用户                                                                                    |
| auth_src     | object   | 用户第三方信息                                                                                    |
| is_owner     | boolean  | 只有当搜索设备 did 时会返回该设备的 owner 权限情况，true：拥有 owner 权限，false：没有 owner 权限 |




#### 返回例子
```json
{
  "meta": {
    "previous": null,
    "skip": 0,
    "total": 30,
    "limit": 20,
    "next": null
  },
  "objects": [
    {
      "username": null,
      "remark": null,
      "uid": "2ac80784a695a5f88f63ade277eb413a",
      "is_anonymous": true,
      "gender": null,
      "created_at": 1513135417,
      "auth_src": null,
      "phone": null,
      "birthday": null,
      "address": null,
      "email": null,
      "name": null
    }
  ]
}
```





# 设备管理
***备注： 此接口只在产品未发布的情况下使用，产品发布后如要使用，请联系机智云工作人员。***
## 获取设备did

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备管理/get_v1_products_product_key_devices)


#### 请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices


#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述     |
|:----------- |:-------- |:----:|:-------- |:-------- |
| product_key | string   |  是  | path     | 产品名称 |
| mac         | string   |  是  | query    | mac 地址 |



#### 响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| did      | string |     设备id              |



#### 返回例子
```json
{
  "did": "cBYkSjoE2xspYMhaUHdk5k",
  "passcode": "123456"
}
```


## <span id = "get_v1_products_product_key_device_detail">获取设备详情</span>

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备管理/get_v1_products_product_key_device_detail)


#### 请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/device_detail


#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述     |
|:----------- |:-------- |:----:|:-------- |:-------- |
| product_key | string   |  是  | path     | 产品名称 |
| mac         | string   |  是  | query    | mac 地址 |



#### 响应参数

| 参数        | 数据类型 | 描述                                            |
|:----------- |:-------- |:----------------------------------------------- |
| product_key | string   | 产品名称                                        |
| mac         | string   | mac 地址                                        |
| did         | string   | 设备 ID                                         |
| is_online   | boolean  | 设备是否在线，True 代表在线，False 代表离线     |
| is_disabled | boolean  | 设备是否注销，True 代表已注销，False 代表未注销 |
| type        | string   | 设备类型                                        |


#### 返回例子
```json
{
  "did": "dE2xjocBhaUHkYkSspYM5k",
  "is_disabled": false,
  "product_key": "6f2e214bf2d79649232431b94a25f46a",
  "mac": "virtual:site",
  "is_online": false,
  "type": "normal"
}
```


## 搜索设备

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备管理/get_v1_products_product_key_devices_search)


#### 请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/search

#### 请求参数

| 参数           | 数据类型 | 必填 | 参数类型 | 描述                       |
|:-------------- |:-------- |:----:|:-------- |:-------------------------- |
| product_key    | string   |  是  | path     | 产品名称                   |
| gid            | string   |  否  | query    | 设备组 id                  |
| country        | string   |  否  | query    | 国家                       |
| region         | string   |  否  | query    | 省                         |
| city           | string   |  否  | query    | 城市                       |
| is_online      | integer  |  否  | query    | 是否在线,在线为1,不在线为0 |
| is_faulty      | integer  |  否  | query    | 是否故障,故障为1,无故障为0 |
| is_alert       | integer  |  否  | query    | 是否报警,报警为1,无报警为0 |
| show_disabled  | integer  |  否  | query    | 显示注销为1，过滤注销为0   |
| liveness_start | string   |  否  | query    | 最近活跃时间戳             |
| type           | string   |  否  | query    | 可以为 did、mac、uid       |
| val            | string   |  否  | query    | 查询条件值                 |
| limit          | integer  |  否  | query    | 每次返回的条数             |
| skip           | integer  |  否  | query    | 每次跳过的条数             |


#### 响应参数

| 参数              | 数据类型 | 描述             |
|:----------------- |:-------- |:---------------- |
| total             | integer  | 消息总数         |
| limit             | integer  | 返回的结果条数   |
| skip              | integer  | 跳过的条数       |
| previous          | string   | 上一页的请求地址 |
| next              | string   | 下一页的请求地址 |
| did               | string   | 设备 id          |
| mac               | string   | mac 地址         |
| is_online         | integer  | 是否设备在线     |
| country           | string   | country          |
| region            | string   | 省               |
| city              | string   | 市               |
| longitude         | string   | 经度             |
| latitude          | integer  | 纬度             |
| is_faulty         | integer  | 是否发生故障     |
| is_alert          | integer  | 是否发生报警     |
| online_latest     | integer  | 设备最近上线时间 |
| created_at        | integer  | 设备创建时间     |
| mcu_hard_version  | string   | mcu 硬件版本     |
| mcu_soft_version  | string   | mcu 软件件版本   |
| wifi_hard_version | string   | wifi 硬件版本    |
| wifi_soft_version | string   | wifi 软件件版本  |



#### 返回例子
```json
{
  "meta": {
    "previous": null,
    "skip": 0,
    "total": 3,
    "limit": 20,
    "next": null
  },
  "objects": [
    {
      "city": "Guangzhou",
      "mcu_hard_version": null,
      "mcu_soft_version": null,
      "did": "kYkSE2xspYjocBhaUHdM5k",
      "country": "China",
      "region": "Guangdong",
      "mac": "virtual:site",
      "longitude": 113.280637,
      "wifi_hard_version": null,
      "online_latest": 1517296665,
      "wifi_soft_version": null,
      "is_online": false,
      "latitude": 23.125178,
      "is_alert": false,
      "created_at": 1505789918,
      "is_faulty": false
    }
  ]
}
```

## 设备远程控制

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备管理/post_v1_products_product_key_devices_did_control)

#### 原始指令(raw):

默认格式为十进制数组，设置 binary_coding 参数可使用 hex 和 base64，
如要发送 payload 为二进制 011000010110001001100011 ，每组byte换成一个十进制数组的值得就是：[97,98,99]；
如要发送 payload 为16进制 616263 ，每组byte换成一个十进制数组的值得就是：[97,98,99]。

```json
{
  "raw": [97,98,99]
}
```

#### 数据点方式(attrs):
设备产品必须定义了数据点。如要设置扩展类型的字段 binary 为16进制 1234567 ，需要补齐扩展型长度：

```json
{
  "attrs": {
    "binary": "1234567000"
  }
}
```

#### 请求类型及地址

      POST
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/{did}/control



#### 请求参数

| 参数        | 数据类型       | 必填 | 参数类型 | 描述       |
|:----------- |:-------------- |:----:|:-------- |:---------- |
| product_key | string         |  是  | path     | 产品名称   |
| did         | string         |  是  | path     | 设备 id    |
| raw         | Array[integer] |  是  | body     | 原始指令   |
| attrs       | object         |  是  | body     | 数据点方式 |




#### 响应参数
   无


## 设备上下线记录

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备管理/get_v1_products_product_key_devices_did_online)

用于查询最近7天内任意两天的上下线记录。


#### 时间&排序：
*  start_ts 和 end_ts不填，默认查询过去到现在两天以内的通信日志记录
*  start_ts 与 end_ts之间的间隔秒必须在两天范围以内
*  增加sort排序，默认为降序，asc代表升序，desc代表降序

#### 设备的下线原因（reason）
* mqtt_disconnect：设备主动断开与mqtt的连接
* no_heartbeat：m2m在KeepAlive时段内，没有收到设备心跳
* tcp_closed：设备主动断开tcp连接
* ssl_closed：设备主动断开ssl连接
* offline_force：设备重复上线，原有的连接断开
* offline_reset：设备注销，断开连接
* offline_exception：异常断开连接
* offline_sending_density_overflow：客户端发送信息的频率过大，断开链接
* offline_sending_data_size_overflow：客户端发送信息的流量过大，断开链接



#### 请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/{did}/online



#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述            |
|:----------- |:-------- |:----:|:-------- |:--------------- |
| product_key | string   |  是  | path     | 产品名称        |
| did         | string   |  是  | path     | 设备did         |
| start_ts    | integer  |  否  | query    | 开始时间戳      |
| end_ts      | integer  |  否  | query    | 结束时间戳      |
| sort        | sort     |  否  | query    | 可以是desc和asc |
| limit       | integer  |  否  | query    | 返回的结果条数  |
| skip        | integer  |  否  | query    | 跳过的条数      |




#### 响应参数

| 参数      | 数据类型 | 描述                                          |
|:--------- |:-------- |:--------------------------------------------- |
| total     | integer  | 消息总数                                      |
| limit     | integer  | 返回的结果条数                                |
| skip      | integer  | 跳过的条数                                    |
| previous  | string   | 上一页的请求地址                              |
| next      | string   | 下一页的请求地址                              |
| timestamp | integer  | 设备上下线指令时间                            |
| type      | string   | 设备日志类型，如： dev_offline/dev_offline 等 |
| payload   | string   | 设备原始日志信息                              |
| KeepAlive | integer  | 设备指定的心跳时间间隔（单位:秒）             |
| duration  | integer  | 设备的在线时长 （单位:秒）                    |
| count     | integer  | 在线时发送的心跳次数                          |
| max       | integer  | 最大间隔时间                                  |
| min       | integer  | 最小间隔时间                                  |
| avg       | integer  | 平均间隔时间                                  |
| last      | integer  | 最后一次收到心跳时刻与下线时刻的间隔时间      |
| reason    | string   | 下线原因                                      |




#### 返回例子
```json
{
  "meta": {
    "previous": null,
    "skip": 0,
    "total": 5,
    "limit": 20,
    "next": null
  },
  "objects": [
    {
      "timestamp": 1517384124.229,
      "type": "dev_online",
      "payload": {
        "keep_alive": 130
      }
    },
    {
      "timestamp": 1517298056.201,
      "type": "dev_offline",
      "payload": {
        "duration": 1391,
        "heartbeat": {
          "count": 21,
          "max": 60,
          "avg": 60,
          "last": 130,
          "min": 60
        },
        "reason": "no_heartbeat"
      }
    }
  ]
}
```


## 设备通信日志

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备管理/get_v1_products_product_key_devices_did_cmd)

用于查询最近7天内任意两天的设备通讯日志（原始数据）。

#### 时间&排序：
* start_ts 和 end_ts不填，默认查询过去到现在两天以内的通信日志记录
* start_ts与end_ts之间的间隔秒必须在两天范围以内
* 增加sort排序，默认为降序，asc代表升序，desc代表降序

#### payload：
* payload 为二进制进行 base64 编码后的结果。


#### 请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/{did}/cmd



#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述            |
|:----------- |:-------- |:----:|:-------- |:--------------- |
| product_key | string   |  是  | path     | 产品名称        |
| did         | string   |  是  | path     | 设备did         |
| start_ts    | integer  |  否  | query    | 开始时间戳      |
| end_ts      | integer  |  否  | query    | 结束时间戳      |
| sort        | sort     |  否  | query    | 可以是desc和asc |
| limit       | integer  |  否  | query    | 返回的结果条数  |
| skip        | integer  |  否  | query    | 跳过的条数      |




#### 响应参数

| 参数      | 数据类型 | 描述                                  |
|:--------- |:-------- |:------------------------------------- |
| total     | integer  | 消息总数                              |
| limit     | integer  | 返回的结果条数                        |
| skip      | integer  | 跳过的条数                            |
| previous  | string   | 上一页的请求地址                      |
| next      | string   | 下一页的请求地址                      |
| timestamp | integer  | 设备上下线指令时间                    |
| type      | string   | 设备日志类型，如： dev2app/app2dev 等 |
| payload   | string   | 设备原始日志信息                      |



#### 返回例子
```json
{
  "meta": {
    "previous": null,
    "skip": 0,
    "total": 6,
    "limit": 20,
    "next": null
  },
  "objects": [
    {
      "timestamp": 1517384252.294,
      "type": "app2dev",
      "payload": "0000000309000090010101000010"
    },
    {
      "timestamp": 1517384243.044,
      "type": "dev2app",
      "payload": "000000030b0000910401000010000000"
    }
  ]
}
```

## 获取设备历史数据

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备管理/get_v1_products_product_key_devices_did_data)

用于查询最近7天内任意两天的设备通讯日志（Json格式）。

* start_ts 和 end_ts不填，默认查询过去到现在两天以内的通信日志记录
* start_ts与end_ts之间的间隔秒必须在两天范围以内
* 增加sort排序，默认为降序，asc代表升序，desc代表降序

#### 请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/{did}/data



#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述            |
|:----------- |:-------- |:----:|:-------- |:--------------- |
| product_key | string   |  是  | path     | 产品名称        |
| did         | string   |  是  | path     | 设备did         |
| start_ts    | integer  |  否  | query    | 开始时间戳      |
| end_ts      | integer  |  否  | query    | 结束时间戳      |
| sort        | sort     |  否  | query    | 可以是desc和asc |
| limit       | integer  |  否  | query    | 返回的结果条数  |
| skip        | integer  |  否  | query    | 跳过的条数      |




#### 响应参数

| 参数     | 数据类型 | 描述             |
|:-------- |:-------- |:---------------- |
| total    | integer  | 消息总数         |
| limit    | integer  | 返回的结果条数   |
| skip     | integer  | 跳过的条数       |
| previous | string   | 上一页的请求地址 |
| next     | string   | 下一页的请求地址 |
| ts       | integer  | 设备指令时间     |
| attrs    | objects  | 数据点           |


#### 返回例子
```json
{
  "meta": {
    "previous": null,
    "skip": 0,
    "total": 3,
    "limit": 20,
    "next": null
  },
  "objects": [
    {
      "ts": 1517384243,
      "attrs": {
        "alert_full": 0,
        "alert_shutdown": 0,
        "mode": "制冷",
        "fan_swing": 0,
        "switch": 1,
        "fan_speed": "低风",
        "fault_roomtemp": 0,
        "room_temp": -10,
        "set_temp": 16,
        "off_timing": 0,
        "on_timing": 0
      }
    }
  ]
}
```




# 设备组管理
## 获取设备组树形结构

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备组管理/get_v1_products_product_key_device_groups)


#### 请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/device_groups


#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述     |
|:----------- |:-------- |:----:|:-------- |:-------- |
| product_key | string   |  是  | path     | 产品名称 |



#### 响应参数
| 参数 | 数据类型 | 描述     |
|:---- |:-------- |:-------- |
| gid  | string   | 设备组ID |



#### 返回例子
```json
{
  "c8e4b5634b047dc495be4a05a39d02a3": ""
}
```


## 创建设备组

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备组管理/post_v1_products_product_key_device_groups)

* parent 为可选参数，如果有 parent 表示创建一个子设备组。
* 一个产品只能有一个根设备组。

#### 请求类型及地址

     POST
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/device_groups



#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述       |
|:----------- |:-------- |:----:|:-------- |:---------- |
| product_key | string   |  是  | path     | 产品名称   |
| parent_gid  | string   |  否  | body     | 子设备组id |


#### 响应参数
    
| 参数 | 数据类型 | 描述     |
|:---- |:-------- |:-------- |
| gid  | string   | 设备组ID |


#### 返回例子
```json
{
  "gid": "c8e4b5634b047dc495be4a05a39d02a3"
}
```

## 删除设备组

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备组管理/delete_v1_products_product_key_device_groups_gid)

删除设备组需要先清空设备组下所有设备及子设备组。

#### 请求类型及地址

     DELETE
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/device_groups/{gid}


#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述     |
|:----------- |:-------- |:----:|:-------- |:-------- |
| product_key | string   |  是  | path     | 产品名称 |
| gid         | string   |  是  | path     | 设备组id |


#### 响应参数
       无 



## 获取设备组下的mac列表

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备组管理/get_v1_products_product_key_device_groups_gid)


#### 请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/device_groups/{gid}


#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述     |
|:----------- |:-------- |:----:|:-------- |:-------- |
| product_key | string   |  是  | path     | 产品名称 |
| gid         | string   |  是  | path     | 设备组id |


#### 响应参数
   
| 参数     | 数据类型      | 描述                            |
|:-------- |:------------- |:------------------------------- |
| macs     | Array[string] | mac列表                         |


#### 返回例子
```json
{
  "macs": [
    "virtual:site"
  ]
}
```


## 更新设备组

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备组管理/put_v1_products_product_key_device_groups_gid)

* action: 操作，"assign" | "unassign"
* macs: MAC 列表，最多一次上传 1000 个 MAC
* reassign: 当 action 为 "assign" 时有效。当 reassgin 为 true，MAC 如果已经在某个设备组下面，会被移动到当前组；当 reassign 为 false，MAC 如果已经在某个设备组下面，则移动失败。

#### 请求类型及地址

      PUT
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/device_groups/{gid}


#### 请求参数

| 参数        | 数据类型      | 必填 | 参数类型 | 描述                            |
|:----------- |:------------- |:----:|:-------- |:------------------------------- |
| product_key | string        |  是  | path     | 产品名称                        |
| gid         | string        |  是  | path     | 设备组id                        |
| action      | string        |  是  | body     | 设备组分配类型: assign,unassign |
| reassign    | boolean       |  是  | body     |                                 |
| macs        | Array[string] |  是  | body     | MAC 列表                        |

#### 响应参数

| 参数    | 数据类型      | 描述              |
|:------- |:------------- |:----------------- |
| failed  | Array[string] | 更新失败的mac列表 |
| success | Array[string] | 更新成功的mac列表 |


#### 返回例子
```json
{
  "failed": [],
  "success": [
    "virtual:site"
  ]
}
```

# 绑定管理

## 设备绑定功能


[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/绑定管理/post_v1_products_product_key_devices_bindings)


#### 请求类型及地址

      POST
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/bindings

#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述       |
|:----------- |:-------- |:----:|:-------- |:---------- |
| product_key | string   |  是  | path     | 产品标识码 |
| uid         | string   |  是  | body     | 用户 id    |
| appid       | string   |  是  | body     | 应用  id   |
| dids        | string   |  是  | body     | did 列表   |


#### 响应参数

| 参数    | 数据类型      | 描述            |
|:------- |:------------- |:--------------- |
| success | Array[string] | 解绑成功MAC列表 |
| failed  | Array[string] | 解绑失败MAC列表 |


#### 返回例子
```json
{
  "failed": [],
  "success": [
    "jaUHdkYkSocBhE2xspYM5k"
  ]
}
```

## 解除绑定


[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/绑定管理/delete_v1_products_product_key_devices_bindings)


#### 请求类型及地址

      DELETE
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/bindings

#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述       |
|:----------- |:-------- |:----:|:-------- |:---------- |
| product_key | string   |  是  | path     | 产品标识码 |
| uid         | string   |  是  | body     | 用户 id    |
| appid       | string   |  是  | body     | 应用  id   |
| dids        | string   |  是  | body     | did 列表   |


#### 响应参数

| 参数    | 数据类型       | 描述            |
|:------- |:-------------- |:--------------- |
| success | Array[string] | 绑定成功MAC列表 |
| failed  | Array[string] | 绑定失败MAC列表 |


#### 返回例子
```json
{
  "failed": [],
  "success": [
    "jaUHdkYkSocBhE2xspYM5k"
  ]
}
```


# 设备报表

## 获取设备地理位置分布

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/用户报表/get_v1_products_product_key_devices_locations)

用于获取设备地理位置分布报表

#### 请求类型及地址

      GET
     http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/locations

#### 请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
|product_key	| string |  是  | path   | 产品标识码     |
| gid  			| string |  否  | query   | 设备组id   |
| is_online 	 | integer |  否  | query   | 是否在线   |
| is_faulty  	| integer |  否  | query   | 是否故障   |
| is_alert  	| integer |  否  | query   | 是否报警   |



#### 响应参数

| 参数       | 数据类型    | 描述                      |
|:---------- |:------- |:------------------------- |
| gid      | string | 设备组 id           |
| total       | integer | 设备总数           |
| location        | object | 设备地理位置信息           |


#### 返回例子
```json
{
  "gid": null,
  "total": 4,
  "location": {
    "China": {
      "count": 3,
      "Guangdong": {
        "count": 3,
        "Guangzhou": 3
      }
    }
  }
}
```

## 设备概览
**此接口仅可在国内环境使用**

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/用户报表/get_v1_products_product_key_summary)

用于获取最近的新增激活和活跃设备数报表

#### 请求类型及地址

      GET
     http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/summary

#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述       |
|:----------- |:-------- |:----:|:-------- |:---------- |
| product_key | string   |  是  | path     | 产品标识码 |




#### 响应参数

| 参数      | 数据类型     | 描述             |
|:--------- |:------------ |:---------------- |
| online    | integer      | 设备在线数       |
| total     | integer      | 设备累计上线数   |
| active    | inline_model | 活跃设备         |
| yesterday | integer      | 昨日活跃设备数   |
| 7_day     | integer      | 近7天活跃设备数  |
| new       | inline_model | 新增设备         |
| today     | integer      | 今日新增设备数   |
| yesterday | integer      | 昨日新增设备数   |
| 7_day     | integer      | 近7天新增设备数  |
| 30_day    | integer      | 近30天新增设备数 |


#### 返回例子
```json
{
  "active": {
    "7_day": 0,
    "yesterday": 0
  },
  "new": {
    "7_day": 0,
    "30_day": 0,
    "yesterday": 0,
    "today": 0
  },
  "total": 3,
  "online": 0
}
```

## 设备激活详情

**此接口仅可在国内环境使用**

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备报表/get_v1_products_product_key_incr_devices)

用于获取设备激活详情报表

#### 日期查询说明
* start,end 的格式是年-月-日，例如:2016-08-01,
* 注意：蓝牙设备响应返回的结果为device_sn字段

#### 请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/incr_devices

#### 请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| product_key				| string |  是  | path   | 产品标识码  |
| start           | string |  否  | query     | 字符串开始日期 |
| end           | string |  否  | query     | 字符串结束日期 |
| country           | string |  否  | query     | 国家  |
| region           | string |  否  | query     | 省  |
| city           | string |  否  | query     |  城市  |


#### 响应参数

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
| device_sn        | string | 蓝牙设备的设备号  |
| country     | string |  国家   |
| region      | string |  省   |
| city      | string | 城市    |
| created_at      | string | 设备创建时间    |




#### 返回例子
```json
{
  "meta": {
    "previous": null,
    "skip": 0,
    "total": 4,
    "limit": 20,
    "next": null
  },
  "objects": [
    {
      "city": "Guangzhou",
      "country": "China",
      "region": "Guangdong",
      "report_date": "2017-12-07",
      "product_key": "4bd8778c5aa4602e5c9a5a208a1fdcc3",
      "mac": "virtual:site",
      "created_at": "2017-12-07 10:12:45"
    }
  ]
}
```


## 设备活跃详情

**此接口仅可在国内环境使用**

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备报表/get_v1_products_product_key_active_devices)

用于获取设备活跃详情报表

#### 日期查询说明
* start,end 的格式是年-月-日，例如:2016-08-01,
* 注意：蓝牙设备响应返回的结果为device_sn字段

#### 请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/active_devices

#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述           |
|:----------- |:-------- |:----:|:-------- |:-------------- |
| product_key | string   |  是  | path     | 产品标识码     |
| start       | string   |  否  | query    | 字符串开始日期 |
| end         | string   |  否  | query    | 字符串结束日期 |
| country     | string   |  否  | query    | 国家           |
| region      | string   |  否  | query    | 省             |
| city        | string   |  否  | query    | 城市           |


#### 响应参数

| 参数        | 数据类型 | 描述             |
|:----------- |:-------- |:---------------- |
| total       | integer  | 消息总数         |
| limit       | integer  | 返回的结果条数   |
| skip        | integer  | 跳过的条数       |
| previous    | string   | 上一页的请求地址 |
| next        | string   | 下一页的请求地址 |
| report_date | string   | 报表日期         |
| product_key | string   | 产品标识码       |
| mac         | string   | mac地址          |
| device_sn   | string   | 蓝牙设备的设备号       |
| country     | string   | 国家             |
| region      | string   | 省               |
| city        | string   | 城市             |
| created_at  | string   | 设备创建时间     |




#### 返回例子
```json
{
  "meta": {
    "previous": null,
    "skip": 0,
    "total": 19,
    "limit": 20,
    "next": null
  },
  "objects": [
    {
      "city": "Guangzhou",
      "country": "China",
      "region": "Guangdong",
      "report_date": "2017-12-28",
      "product_key": "ea202c9a5bd8708a145a4678c5afdcc3",
      "mac": "virtual:site",
      "created_at": "2017-12-28 18:45:33"
    }
  ]
}
```


## 获取活跃历史报表

**此接口仅可在国内环境使用**

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备报表/get_v1_products_product_key_devices_report_liveness_history)

活跃设备指：一天之内有数据上报的设备
#### 查询范围
* 日报表最多查询 30 天。
* 周报表最多查询 53 周。
* 月报表最多查询 12 月。
#### 日期查询说明
* cycle 为 date 时，start,end 的格式是年-月-日，example:2016-08-01,
* cycle 为 week 时，start,end 的格式是年-周，example:2016-51
* cycle 为 month 时，start,end 的格式为年-月，example:2016-12

#### 请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/report/liveness/history

#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述                       |
|:----------- |:-------- |:----:|:-------- |:-------------------------- |
| product_key | string   |  是  | path     | 产品标识码                 |
| gid         | string   |  否  | query    | 设备组 id                  |
| cycle       | string   |  否  | query    | 统计周期，可以是日(date)、周(week)、月(month) |
| start       | string   |  是  | query    | 开始日期                   |
| end         | string   |  是  | query    | 结束日期                   |



#### 响应参数

| 参数     | 数据类型 | 描述                       |
|:-------- |:-------- |:-------------------------- |
| gid      | string   | 设备组 id                  |
| cycle    | string   | 周期，分为 month,week,date |
| start    | string   | 开始日期                   |
| end      | string   | 结束日期                   |
| date     | string   | 日期                       |
| count    | integer  | 数量                       |
| location | object   | 地理位置信息               |


#### 返回例子
```json
{
  "start": "2017-12",
  "gid": null,
  "end": "2017-12",
  "data": [
    {
      "count": 2,
      "location": {
        "China": {
          "count": 1,
          "Guangdong": {
            "count": 1,
            "Guangzhou": {
              "count": 1
            }
          }
        }
      },
      "month": "2017-12"
    }
  ],
  "cycle": "month"
}
```

## 设备实时统计报表

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备报表/get_v1_products_product_key_devices_report_rt)

用于获取设备实时统计报表

#### 请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/devices/report/devices/report/rt

#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述       |
|:----------- |:-------- |:----:|:-------- |:---------- |
| product_key | string   |  是  | path     | 产品标识码 |
| gid         | string   |  否  | query    | 设备组 id  |




#### 响应参数

| 参数      | 数据类型 | 描述             |
|:--------- |:-------- |:---------------- |
| gid       | string   | 设备组 id        |
| activated | integer  | 激活数           |
| faulty    | integer  | 故障数           |
| alert     | integer  | 报警数           |
| location  | object   | 设备地理位置分布 |



#### 返回例子
```json
{
  "count": {
    "faulty": 0,
    "activated": 4,
    "alert": 1
  },
  "gid": null,
  "location": {
    "China": {
      "count": {
        "activated": 2,
        "alert": 1
      },
      "Guangdong": {
        "count": {
          "faulty": 1,
          "activated": 1,
          "alert": 1
        },
        "Guangzhou": {
          "count": {
            "activated": 3
          }
        }
      }
    }
  }
}
```


## 获取故障设备台数报表

**此接口仅可在国内环境使用**

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备报表/get_v1_products_product_key_fault_report_devices)

获取故障设备台数报表

#### 请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/fault/report/devices

#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述       |
|:----------- |:-------- |:----:|:-------- |:---------- |
| product_key | string   |  是  | path     | 产品标识码 |
| gid         | string   |  否  | query    | 设备组 id  |



#### 响应参数

| 参数       | 数据类型 | 描述                 |
|:---------- |:-------- |:-------------------- |
| gid        | string   | 设备组 id            |
| total      | integer  | 故障设备总数         |
| resolved   | integer  | 故障设备已解决数     |
| unresolved | integer  | 故障设备未解决数     |
| location   | object   | 故障设备地理位置分布 |


#### 返回例子
```json
{
  "gid": null,
  "count": {
    "total": 2,
    "resolved": 1,
    "unresolved": 1
  },
  "location": {
    "China": {
      "count": {
        "total": 2,
        "resolved": 1,
        "unresolved": 1
      },
      "Guangdong": {
        "count": {
          "total": 2,
          "resolved": 1,
          "unresolved": 1
        },
        "Guangzhou": {
          "count": {
            "total": 2,
            "resolved": 1,
            "unresolved": 1
          }
        }
      }
    }
  }
}
```


## 获取报警设备台数报表

**此接口仅可在国内环境使用**

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备报表/get_v1_products_product_key_alert_report_devices)

用于获取报警设备台数报表

#### 请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/alert/report/devices

#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述       |
|:----------- |:-------- |:----:|:-------- |:---------- |
| product_key | string   |  是  | path     | 产品标识码 |
| gid         | string   |  否  | query    | 设备组 id  |



#### 响应参数

| 参数       | 数据类型 | 描述                 |
|:---------- |:-------- |:-------------------- |
| gid        | string   | 设备组 id            |
| total      | integer  | 报警设备总数         |
| resolved   | integer  | 报警设备已解决数     |
| unresolved | integer  | 报警设备未解决数     |
| location   | object   | 报警设备地理位置分布 |


#### 返回例子
```json
{
  "gid": null,
  "count": {
    "total": 2,
    "resolved": 1,
    "unresolved": 1
  },
  "location": {
    "China": {
      "count": {
        "total": 2,
        "resolved": 1,
        "unresolved": 1
      },
      "Guangdong": {
        "count": {
          "total": 2,
          "resolved": 1,
          "unresolved": 1
        },
        "Guangzhou": {
          "count": {
            "total": 2,
            "resolved": 1,
            "unresolved": 1
          }
        }
      }
    }
  }
}
```

## 获取故障次数报表

**此接口仅可在国内环境使用**

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备报表/get_v1_products_product_key_fault_report_events)

用于获取故障次数报表

#### 请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/fault/report/events

#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述       |
|:----------- |:-------- |:----:|:-------- |:---------- |
| product_key | string   |  是  | path     | 产品标识码 |
| gid         | string   |  否  | query    | 设备组 id  |



#### 响应参数

| 参数       | 数据类型 | 描述                 |
|:---------- |:-------- |:-------------------- |
| gid        | string   | 设备组 id            |
| detail     | object   | 详情故障类数据点统计 |
| location   | object   | 故障地理分布统计     |
| total      | integer  | 故障设备总数             |
| resolved   | integer  | 故障已解决数         |
| unresolved | integer  | 故障未解决数         |


#### 返回例子
```json
{
  "count": {
    "resolved": 1,
    "total": 1,
    "unresolved": 0
  },
  "gid": null,
  "detail": {
    "fault_roomtemp": {
      "resolved": 1,
      "total": 1,
      "unresolved": 0
    }
  },
  "location": {
    "China": {
      "count": {
        "resolved": 1,
        "total": 1,
        "unresolved": 0
      },
      "detail": {
        "fault_roomtemp": {
          "resolved": 1,
          "total": 1,
          "unresolved": 0
        }
      }
    }
  }
}
```


## 获取报警次数报表
用于获取报警次数报表

**此接口仅可在国内环境使用**

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/设备报表/get_v1_products_product_key_fault_alert_events)


#### 请求类型及地址

      GET  
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/alert/report/devices

#### 请求参数

| 参数        | 数据类型 | 必填 | 参数类型 | 描述       |
|:----------- |:-------- |:----:|:-------- |:---------- |
| product_key | string   |  是  | path     | 产品标识码 |
| gid         | string   |  否  | query    | 设备组 id  |



#### 响应参数

| 参数       | 数据类型 | 描述                 |
|:---------- |:-------- |:-------------------- |
| gid        | string   | 设备组 id            |
| detail     | object   | 详情故障类数据点统计 |
| location   | object   | 报警地理分布统计     |
| total      | integer  | 报警设备总数         |
| resolved   | integer  | 报警已解决数         |
| unresolved | integer  | 报警未解决数         |


#### 返回例子
```json
{
  "count": {
    "resolved": 1,
    "total": 1,
    "unresolved": 0
  },
  "gid": null,
  "detail": {
    "alert_full": {
      "resolved": 1,
      "total": 1,
      "unresolved": 0
    }
  },
  "location": {
    "China": {
      "count": {
        "resolved": 1,
        "total": 1,
        "unresolved": 0
      },
      "detail": {
        "alert_full": {
          "resolved": 1,
          "total": 1,
          "unresolved": 0
        }
      }
    }
  }
}
```



# 用户报表

## 用户新增报表

**此接口仅可在国内环境使用**

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/用户报表/get_v1_products_product_key_users_report_new)

这里指的是绑定了该 PK 下产品的新增用户

#### 日期查询说明：
* cycle 为 date 时，start,end的格式是年-月-日，example:2016-08-01,
* cycle 为 week 时，start,end的格式是年-周，example:2016-51
* cycle 为 month 时，start,end的格式为年-月，example:2016-12

#### 请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/products/{product_key}/users/report/new


#### 请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |     
| product_key            | string |  是 | path    | 产品名称   |
| gid         			| string |  是 | query    | 设备组id  |
| cycle         		| string |  否 | query    | 统计周期，可以为 date、week、month  |
| start         		| string |  是 | query    | 起始周期，为起始日期、起始周或起始月 |
| end         			| string |  是 | query    | 结束周期，为结束日期、结束周或结束月|



#### 响应参数

| 参数     | 数据类型 | 描述                       |
|:-------- |:-------- |:-------------------------- |
| did      | string   | 设备组 id                  |
| cycle    | string   | 周期，分为 month,week,date |
| start    | string   | 开始日期                   |
| data     | string   | 日期                       |
| count    | string   | 数量                       |



#### 返回例子
```json
{
  "start": "2017-12",
  "gid": null,
  "end": "2017-12",
  "data": [
    {
      "count": 3,
      "month": "2017-12"
    }
  ],
  "cycle": "month"
}
```

## 企业活跃用户人数

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/用户报表/get_v1_users_liveness_total)

用于查询的是企业活跃用户人数

#### 请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/users/liveness_total

#### 请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| X-Gizwits-Enterprise-ID	| string |  是  | header   | enterprise id      |
| X-Gizwits-Enterprise-Secret  | string |  是  | header   | enterprise secret   |
| product_secret           | string |  是 | query    | 产品标识码 product_key  |
| appid          | string |  否 | query    | 	应用id  |
| start_date         | string |  是 | query    | 	开始日期，如：2015-01-02 |
| end_date          | string |  是 | query    | 	结束日期，如：2015-01-03  |



#### 响应参数

| 参数  | 数据类型 | 描述 |
|:----- |:-------- |:---- |
| date  | string   | 日期 |
| count | integer  | 数量 |



#### 返回例子
```json
{
  "data": [
    {
      "count": 2,
      "date": "2017-12-13"
    }
  ]
}
```

## 用户地理分布

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/用户报表/get_v1_users_location)

该接口用于查询的是企业用户地理分布

#### 请求类型及地址

      GET
      http://enterpriseapi.gizwits.com/v1/users/location

#### 请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
| X-Gizwits-Enterprise-ID	| string |  是  | header   | enterprise id     |
| X-Gizwits-Enterprise-Secret  | string |  是  | header   | enterprise secret  |
| product_secret           | string |  是 | query    | 产品标识码 product_key  |




#### 响应参数

| 参数  | 数据类型 | 描述  |
|:----- |:-------- |:----- |
| count | integer  | 数 量 |



#### 返回例子
```json
{
  "China": {
    "count": 18,
    "Beijing": {
      "count": 14,
      "Beijing": {
        "count": 14
      }
    },
    "Guangdong": {
      "count": 4,
      "Guangzhou": {
        "count": 4
      }
    }
  }
}
```

## 用户总数报表
用于查询用户空间表，获取曾经绑定过该 pk 设备的用户总数

[调试接口](http://swagger.gizwits.com/doc/index/debug_enterprise#!/用户报表/get_v1_products_product_key_users_report_total)


#### 请求类型及地址

      GET
     http://enterpriseapi.gizwits.com/v1/products/{product_key}/users/report/total

#### 请求参数

| 参数                     | 数据类型   | 必填 | 参数类型 | 描述                                          |
|:------------------------ |:------ |:----:|:-------- |:--------------------------------------------- |
|product_key	| string |  是  | path   | 产品标识码     |
| gid  | string |  否  | query   | 设备组id   |



#### 响应参数

| 参数  | 数据类型 | 描述      |
|:----- |:-------- |:--------- |
| gid   | string   | 设备组 id |
| total | integer  | 用户总数  |


#### 返回例子
```json
{
  "gid": null,
  "total": 31,
}
```





# 错误信息表

| 响应码 | 系统错误码 | 错误信息描述                                            | 解决办法                                    |
| ------ |:----------:|:------------------------------------------------------- |:------------------------------------------- |
| 400    |    5001    | body json invalid                                       | 核对json字串                                |
| 400    |    5002    | form invalid                                            | 输入数据不对                                |
| 404    |    5003    | enterprise id not exist                                 | Eid不存在，检查是否申请或者Eid输入错误      |
| 400    |    5004    | enterprise secret error                                 | Esecret校验失败，检查是否是正确的           |
| 400    |    5005    | product secret error                                    | Product Secret校验失败，检查是否是正确的    |
| 400    |    5006    | product exist devicegroups                              |                                             |
| 404    |    5007    | association not exist                                   | 需要先开通企业API服务                                        |
| 400    |    5008    | association existed                                     | Eid没有与对应的Product Key 关联，请联系客服 |
| 400    |    5009    | token invalid                                           | 请携带token或检查token字段格式              |
| 400    |    5010    | token not match product_key                             |                                             |
| 400    |    5011    | token has expired                                       | 请再次获取token                             |
| 400    |    5012    | ip not in white list                                    | 添加ip到ip企业数据访问白名单中              |
| 403    |    5013    | API call rate limit execeed quota                       | 等待一定时间后再次使用此接口                |
| 400    |    5014    | Report has not been generated!                          |                                             |
| 404    |    5015    | Product key not exist!                                  | 核对产品Product Key是否正确                 |
| 404    |    5016    | Appid not exist!                                        |                                             |
| 404    |    5016    | Appid not exist!                                        |                                             |
| 404    |    5017    | Uid not exist!                                          |                                             |
| 403    |    5018    | product operation not allowed                           |                                             |
| 404    |    5019    | organization does not exist                             |                                             |
| 400    |    5020    | can not delete published product!                       |                                             |
| 400    |    5021    | enterprise is exist                                     |                                             |
| 404    |    5022    | enterprise does not exist                               |                                             |
| 403    |    5023    | enterprise is creating                                  |                                             |
| 403    |    5024    | api deny to visit!                                      |                                             |
| 404    |    5025    | product does not exist                                  |                                             |
| 403    |    5201    | device group not belong to this product                 |                                             |
| 404    |    5202    | parent group not exist                                  |                                             |
| 400    |    5203    | already has one root group                              |                                             |
| 400    |    5204    | group has subgroup                                      |                                             |
| 400    |    5205    | group has device item                                   |                                             |
| 404    |    5206    | group not exist                                         |                                             |
| 400    |    5207    | product key not in pre assignment!                      |                                             |
| 400    |    5208    | create assign device in progress!                       |                                             |
| 404    |    5301    | device not exist                                        | 核对设备ID                                  |
| 403    |    5302    | device not belong to this product                       | 请先将设备绑定到产品                        |
| 400    |    5303    | device not bound                                        |                                             |
| 400    |    5304    | device is disabled                                      | 激活设备                                    |
| 400    |    5305    | device offline!                                         | 上线设备                                    |
| 400    |    5401    | attr invalid!                                           | 核对数据点信息                              |
| 404    |    5402    | datapoint data not found!                               | 先定义数据点,然后再次尝试                   |
| 400    |    5403    | send command failed!                                    | 请再次使用此接口                            |
| 403    |    5404    | remote control not allowed!                             | 远程控制操作需要后台开启                    |
| 404    |    5405    | attrs not exist!                                        |                                             |
| 500    |    5406    | Datapoints malformed                                    |                                             |
| 500    |    5407    | generate meta failed                                    |                                             |
| 400    |    5408    | raw data error!                                         |                                             |
| 500    |    5409    | call innerapi failed!                                   |                                             |
| 404    |    5501    | firmware does not exist                                 |                                             |
| 400    |    5502    | firmware version has created                            |                                             |
| 403    |    5503    | firmware operation not allowed                          |                                             |
| 500    |    5601    | kairosdb query error!                                   |                                             |
| 403    |    5701    | This eid has no permission to reset pwd.                |                                             |
| 403    |    5702    | This eid has no permission to reset pwd for this appid. |                                             |
| 400    |    5703    | Cannot reset pwd for anonymous user                     |                                             |
| 400    |    5801    | the pks has not associate with enterprise!              |                                             |
| 400    |    5901    | x-service secret key invalid!                           |                                             |
