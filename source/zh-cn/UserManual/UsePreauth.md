title:  设备授权方法
---
# 一、授权密钥的来源
## 1.1. 云端生成
通过接口或工具，传入客户编码（PIN）、授权码（auth_code）、mac，返回授权密钥（auth_key）。将授权密钥烧录至设备。

## 1.2. 预录入
通过接口或工具，传入客户编码（PIN）、授权码（auth_code）、mac，把设备预先录入到云端，设备通过与云端统一的加密算法生成授权密钥（auth_key）。


# 二、授权密钥的烧写/录入
## 2.1.获取预授密钥工具
### 2.1.1.使用说明
1）填入客户编码（PIN）、授权码（auth_code）点击“获取信息”。
2）选择获取方式：串口方式需要连接设备烧录；录入方式需要录入mac或IMEI列表。

### 2.1.2.下载地址
机智云授权工具[下载地址]()

## 2.2.获取预授密钥接口
### 2.2.1.接口协议

* 传输方式：为保证交易安全性，采用HTTPS传输
* 提交方式：采用POST和GET方法
* 内容类型：application/json

### 2.2.2.获取授权密钥（云端生成）
#### 服务地址
* URL:  https://preauth.gizwits.com/v2/gagent
* Method: POST

#### 请求参数
| 属性名称 | 参数 | 类型 | 参数类型 | 是否必填 |
| -------- | ---- | ---- | -------- | -------- |
|客户标识码|	pin	|String|	Body|	是|
|Mac/IMEI|	mac|	String|	Body|	是|
|授权密钥	|auth_code|	String|	Body|	是|
|鉴权|	Authorization	|String|	Header|	是|

注：
1) 鉴权的Authorization参数需要向机智云申请；
2) pin、auth_code由机智云提供。

##### JSON请求示例：
```
{
  "pin": "d504fbc269cc8d2ccc8822d98310e218",
  "mac": "test00101011",
  "auth_code": "8318822d90c269cc8dd504fb2ccce218"
}
```

#### 响应参数
| 属性名称 | 参数 | 类型 | 参数类型 |
| -------- | ---- | ---- | -------- |
|创建时间	|created_at|	String|	Body|
|客户标识码|	pin	|String|	Body|
|Mac/IMEI	|mac	|String|	Body|
|授权密钥	|auth_key|	String	|Body|

##### JSON响应示例：
```
{
  "auth_key": "bff12c2998274c92b36de18b019ca9ea",
  "created_at": "2018-01-23T11:06:12.840298Z",
  "pin": "d504fbc269cc8d2ccc8822d98310e218",
  "mac": "test00101011"
}
```

### 2.2.3.批量获取授权密钥
#### 服务地址
*	URL:  https://preauth.gizwits.com/v2/gagent/batch
*	Method: POST

#### 请求参数
| 属性名称     | 参数| 类型   | 参数类型 | 是否必填 |
| --------- | ------------- | ------ | -------- | -------- |
| 客户标识码   | pin           | String | formData | 是|
| Mac/IMEI列表 | batch_file    | File   | formData | 是|
| 授权密钥     | auth_code     | String | formData | 是|
| 鉴权         | Authorization | String | Header   | 是|

注：
1) 鉴权的Authorization参数需要向机智云申请；
2) pin、auth_code由机智云提供。

#### 响应参数
| 属性名称 | 参数 | 类型   | 参数类型 |
| -------- | ---- | ------ | -------- |
| 任务ID   | Id   | String | Body     |

* JSON响应示例：
```
{
  "id": " deb54a82c22aff842a016d6e43d6de4c"
}
```

### 2.2.4.查询批量获取任务结果
#### 服务地址
*	URL:  https://preauth.gizwits.com/v2/gagent/batch/{id}
*	Method: GET

#### 请求参数
| 属性名称 | 参数 | 类型 | 参数类型 | 是否必填 |
| -------- | ---- | ---- | -------- | -------- |
|任务id|	id|	String|	Query|	是|
|鉴权|	Authorization	|String|	Header|	是|

注：1) 鉴权的Authorization参数需要向机智云申请；

#### 响应参数
| 属性名称 | 参数 | 类型 | 参数类型 |
| -------- | ---- | ---- | -------- |
|失败mac/IMEI条数|	Failed|	String|	Body|
|任务id|	Id|	String|	Body|
|成功mac/IMEI条数|	Success	|String|	Body|
|返回结果下载地址	|auth_result|String|	Body|

* JSON响应示例：
```
{
    "status": 2,
    "failed": 0,
    "id": "deb54a82c22aff842a016d6e43d6de4c",
    "success": 10,
    "auth_result": "X.X.X/deb54a82c22aff842a016d6e43d6de4c.xlsx"
}
```

### 2.2.5.查询密钥余量
#### 服务地址
*	URL:  https://preauth.gizwits.com/v2/package
*	Method: GET

#### 请求参数
| 属性名称 | 参数 | 类型 | 参数类型 | 是否必填 |
| -------- | ---- | ---- | -------- | -------- |
|客户标识码|	pin	|String	|Query|	是|
|授权码|	auth_code	|String	|Query	|是|
|跳过数	|skip|	Integer	|Body|	否|
|每页条数	|limit|	Integer|	Header	|否|

#### 响应参数
| 属性名称 | 参数 | 类型 | 参数类型 |
| -------- | ---- | ---- | -------- |
|创建时间|	created_at|	String|	Body|
|更新时间	|updated_at|	String|	Body|
|客户标识码|	pin|	String|	Body|
|总数量	|capacity|	Integer|	Body|
|已使用量	|size	|Integer|	Body|
|授权码|	auth_code	|String|	Body|
|是否禁用	|is_enabled|	Integer|	Body|

 

##### JSON响应示例：
```
{
  "meta": {
    "total": 1,
    "limit": 20,
    "skip": 0,
    "next": "string",
    "previous": "string"
  },
  "objects": [
    {
      "created_at": "string",
      "updated_at": "string",
      "pin": "d504fbc269cc8d2ccc8822d98310e218",
      "capacity": 1000,
      "size": 10,
      "auth_code": "8318822d90c269cc8dd504fb2ccce218",
      "is_enabled": true
    }  ]
}
```

### 2.2.6.常见错误码
| 错误标识                    | HTTP状态码 | 接口状态码 | 错误原因                                    |
| --------------------------- | ---------- | ---------- | ------------------------------------------- |
| DATA_INVALID                | 400        | 1          | data invalid                                |
| AUTH_FAILED                 | 403        | 2          | Authorization invalid                       |
| INVALID_AUTH_CODE           | 400        | 3          | Invalid auth_code                           |
| PACKAGE_CAPACITY_NOT_ENOUGH | 400        | 4          | Package capacity not enough                 |
| GET_AUTH_KEY_IN_PROGRESS    | 400        | 5          | Get auth_key in progress                    |
| GAGENT_EXIST                | 400        | 6          | GAgent with this product_key and mac exist  |
| INVALID_AUTH_KEY            | 400        | 7          | Invalid auth_key                            |
| SYSTEM_ERROR                | 500        | 8          | Uncaught exception                          |
| PACKAGE_NOT_FOUND           | 404        | 9          | Package not found                           |
| AUTH_CODE_DISABLED          | 400        | 10         | Package disabled                            |
| ROLES_INVALID               | 403        | 11         | Roles invalid                               |
| MODE_INVALID                | 403        | 12	Mode    | invalid                                     |
| PACKAGE_EXPIRED             | 400        | 13         | Package expired                             |
| DECYPT_AUTH_KEY_ERROR       | 400        | 14         | Decypt Auth Key Error                       |
| FILE_INVALID                | 400        | 15         | Mac Address File Format Error               |
| PACKAGE_TYPE_INVALID        | 400        | 16         | Package type error, not support this method |
