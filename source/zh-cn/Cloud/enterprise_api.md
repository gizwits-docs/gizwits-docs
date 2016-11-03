
title: 企业API
---

# 概述
企业API是机智云为接入机智云平台的企业开发者提供的开放API服务，使用企业API的企业将设备接入到机智云平台后，通常还有进一步基于接入机智云设备数据开展企业某个垂直领域的业务需求，如用户管理、订单管理等，以满足企业开发者的运营管理需要。
所以企业API就是从接入机智云平台的企业的运营管理的需求出发，为企业的业务管理系统提供REST API接口，为企业提供企业视角全局的设备管理、数据分析等功能，让企业更关注业务管理系统本身，减少不必要的开发成本与时间。

# 术语
Eid:是Enterprise ID的简称,是机智云平台为企业开发者生成的访问企业应用开发的登录账号
Esecret：是Enterprise Secret的简称，是Eid对应的密码
Eid,Esecret是企业业务管理系统请求机智云企业API服务的凭证。

##  获取途径
企业开发者向机智云申请；
企业自行去开发者中心的组织管理中获取


# 协议约定
## 请求方式
本文档所定义接口基于HTTPS(后续服务端将会强制使用HTTPS)协议进行传输，需要注意协议中标注的请求方式，通过GET、PUT、DELETE等进行不同的操作。
## 接口地址
接口地址中当用<>号包含的为变量，需要使用者通过对应的变量替换。例如<product_key>，表示需要将获取的product_key值赋予到接口地址中，<did>表示是需要替换为具体的did
##  请求参数
HTTP请求参数的类型一般分为三种。header表示该参数是在HTTP请求头中；URL表示是通过url传参；BODY表示是Request Body，通常Body中都是Json格式

##  HTTP请求头部
本文档协议中设备管理类、设备报表查询类的接口在进行接口访问时，都需要在请求头增加token值，以此校验访问者是否有权访问该接口。token值是通过获取授权接口获得。
请求头格式如下：
Content-Type: application/json 
Authorization: token <token值>

<token值>前面必须加"token "，For Example:
Authorization: token xxxxxxxxxxx

## HTTP响应头部
本文档协议中的接口在返回报文头部会输出如下信息：
X-RateLimit-Limit: 60     //接口允许访问总量
X-RateLimit-Remaining: 56 //接口剩余访问次数
X-RateLimit-Reset: 1372700873 //调用频率限制重置时间，TS类型

##  Token值的生命周期
Token值有效期为7天， 调用获取token接口返回的expired_at为失效日期时间戳。若现在时间戳 > expired_at时间戳，则需要重新获取token, token调用请见:3.2 E02获取Token

4.2.4企业调用配额说明
企业eid每小时默认允许企业API接口每小时调用5600次，超过阈值则抛错，1小时后恢复接口调用。具体抛错请查看5.2错误信息表系统编码5013的相关说明

#  接入场景与业务流程
## 设备远程控制
### 场景描述
    该业务场景是指企业通过业务管理系统去控制接入到机智云平台的设备，管理设备的主要需求就是在业务管理系统中对设备发起控制。 
### 接入流程



流程说明：
1、首先企业需要申请eid,esecret参数，企业也可以在开发者中心自行获取,也可像机智云人工申请；
2、设置IP白名单：由企业登录开发者中心自行设置；
3、关联产品：企业的业务系统是管理某个产品下的设备，那么操作之前需要先对Eid与PK进行关联，只有关联某个产品后，才能访问那个产品的相关权限，如控制设备，查询某个产品的相关数据；
4、获取token：相当于登陆鉴权，鉴权通过返回服务端生成的token，作为后续API的输入;
5、发起设备远程控制，如果无法获取设备的did，则调用“设备信息查询”接口获得did；如果通过其他方式获得did，可忽略此步骤。(使用数据实时同步服务实时获取设备数据的可忽略此步骤，业务管理系统一般在收到每条设备上报的数据，会实时将最新的Did进行更新，所以在发起远程控制的时候，无需再次获取Did）
6、如果产品定义了数据点协议，则可以使用“E04数据点方式远程控制”去向设备发起控制；如果是数据透传协议，则通过“E05原始指令方式远程控制”控制。

## 设备数据点聚合查询
### 场景描述
该业务场景是指接入企业想通过机智云提供设备数据的聚合查询,在业务管理系统中展现设备的数据值类型数据的聚合报表，这样企业的业务管理系统就无需存储设备数据并进行较容易出现性能问题的数据查询。 
目前设备数据点聚合查询提供单台设备级别的查询以及产品级别的查询。主要能实现以下业务功能：
只支持对数字类型的数据点进行求和(sum)、求平均值（avg)、求最大值（max)、求最小值（min)
支持按月、周、天、小时四个时间维度计算数据
目前支持最大时间范围是最近一个月的数据
有特殊时间需求需要向机智云申请

## 单台设备数据点聚合查询接入流程



流程说明：
1、获取Eid等都是一次性行为。其他关联产品、获取Token同2.1设备远程控制流程
2、找到需要查询目标设备的did，可通过E03接口查询；如果业务管理系统使用了机智云的数据实时同步服务并实时处理了did信息，则可跳过E03接口。
3、调用“E06单台设备数据聚合查询”接口获取指定设备的聚合数据。

## 设备历史数据查询
2.3.1场景描述
该业务场景是指接入企业查询某台设备、某段时间的设备上报的历史数据。 

2.3.2接入流程



# 接口协议
##  E01关联产品
### 业务功能描述
该接口提供创建企业与产品的关联关系能力，一个 product_key 只能关联到一个 enterprise_id，一个enterprise_id可以关联多个product_key。
### 接口地址
    http://enterpriseapi.gizwits.com/v1/products/<product_key>/association
### 请求方式
    POST
### 请求报文

参数 | 类型 | 必填 | 参数类型 | 参数类型 | 描述
-----|------|----
{
  "enterprise_id": "ad7e60f0594247dcba017ba76d2f4275",
  "enterprise_secret": "db2ac98200824181b447b03e4d42f99b",
  "product_secret": "8f11ee69eb9d4269ba0777ca5e7280f5"
}    | 是    | Body | Product secret：product key对应的唯一秘钥，在开发者中心产品信息中获取



### 应答报文
响应编码	返回内容	说明
201	{}	 关联成功


## E02获取Token
3.2.1业务功能描述
该接口提供获取企业API接口访问权限的功能
3.2.2接口地址
     http://enterpriseapi.gizwits.com/v1/products/<product_key>/access_token
3.2.3请求方式
     POST
3.2.4请求报文 
参数	类型	必填	参数类型	描述
{
  "enterprise_id": "ad7e60f0594247dcba017ba76d2f4275",
  "enterprise_secret": "db2ac98200824181b447b03e4d42f99b",
  "product_secret": "8f11ee69eb9d4269ba0777ca5e7280f5"
}
	JSON	是	BODY	


3.2.5应答报文
响应编码	返回内容	说明
201	{
  "token": "7cf955ec8b504d6497d83f39ce9b16d2",
  "expired_at": 1372700873
}  	Token为访问后续API的令牌；
Expired_at为token过期时间；token过期后需要再次获取新的token






## E03设备信息查询
3.3.1业务功能描述
该接口提供某一台设备的详细信息查询功能，获取did信息，主要目的是用于没有使用机智云数据同步服务（Noti接口）的企业获取接入到机智云平台的设备对应的Did。
3.3.2接口地址
http://enterpriseapi.gizwits.com/v1/products/<product_key>/device_detail
3.3.3请求方式
     GET
3.3.4请求报文 

参数	类型	必填	参数类型	描述
Authorization	string	是	header 	获取授权返回的token值,For example: Authorization:token xxxx
product_key	string	是	path	
mac	string	是	query	

3.3.5应答报文
响应编码	返回内容	说明
201	{
  "did": "7cf955ec8b504d6497d83f39ce9b16d2",
  “product_key”:”7cf955ec8b504d6497d83f39ce9b16d2”,
  “mac”:”955ec8b504d6497d”,
   “type”: “string”
}  	
设备ID
产品ID
设备mac
设备类型

## E04数据点方式远程控制
3.4.1业务功能描述
该接口提供远程设置设备数据点的功能，可修改设备可写数据点的值。
3.4.2接口地址
     http://enterpriseapi.gizwits.com/v1/products/<product_key>/devices/<did>/control
3.4.3请求方式
    POST
3.4.4请求报文
参数	类型	必填	参数类型	描述	备注
Authorization	String	是	header	获取授权返回的token值, For example: Authorization:token xxxx	
did	String	是	URL	设备id	

{
  "attrs": {
    "temp": 10
  }
}  	JSON	是	BODY	只能设置可写类型的数据点
bool 类型的数据点设置为 true/false
enum 类型的数据点设置为枚举的字符串
uint8/uint16/uint32 类型的数据点设置为数字
binary 类型的数据设置为 hex 类型字符串，如发送一串二进制数据 0x01, 0x02, 0x03, 就写成 "010203”
	例如在机智云开发者中心定义了一个产品的数据点例如是开关，标示名为“switch”，类型为bool类型；如果要关闭该设备，则报文为 "attrs": {
    "switch": true
  }
可同时传送多个。


3.4.5应答报文
响应编码	返回内容	说明
200	{ }
	设置数据点成功



## E05原始指令方式远程控制
3.5.1业务功能描述
该接口提供通过原始控制指令远程控制设备的功能。
3.5.2接口地址
http://enterpriseapi.gizwits.com/v1/products/<product_key>/devices/<did>/control
3.5.3请求方式
    POST
3.5.4请求报文
参数	类型	必填	参数类型	描述	备注
Authorization	String	是	header	获取授权返回的token值, For example: Authorization:token xxxx	
did	String	是	URL	设备id	
body
{
    "raw": [<byte>, <byte>, ...]
}  

	JSON	是	BODY	原始控制指令,十六进制的格式需要转换为十进制。	假设要发送的原始控制指令为：01020304ffff（十六进制），那么 raw 的值为 [1, 2, 3, 4, 255, 255]


3.5.5应答报文
响应编码	返回内容	说明
200	{ }
	远程控制指令执行成功



## E06单台设备数据聚合查询
3.6.1业务功能描述
该接口提供查询某个时间周期内某个wifi设备数值型数据点的聚合运算，包括求和、平均、最大、最小的计算。
3.6.2接口地址
http://enterpriseapi.gizwits.com/v1/products/<product_key>/devices/<did>/agg_data?start_ts=1447837618000&end_ts=1447837828000&attrs=weight&aggregator=sum&unit=DAYS

3.6.3请求方式
    GET
3.6.4请求报文
参数	类型	必填	参数类型	描述	备注
Authorization	String	是	header	获取授权返回的token值, For example: Authorization:token xxxx	
did	String	是	URL	设备id	
start_ts	number	是	URL	开始时间	
end_ts	number	是	URL	结束时间	
attrs	String	是	URL	只能为数字类型的数据点，对应为数据点标示编码
	
aggregator	String	是	URL	sum,avg,max,min	
unit	String	是	URL	展示时间维度的单位	包括：HOURS,DAYS,WEEKS,MONTHS


3.6.5应答报文
响应编码	返回内容	说明
200	{
    "query": {
               "start_ts": 1447837618000,
        "end_ts": 1447837828000,
        "attrs": "weight,fat",
        "aggregator": "sum",
        "unit": "DAYS",
        "did": "xxx"
    },
    "data": [{
        "attrs": {
            "weight": 50,
            "fat": 0.2
        }
        "datetime": xxx
    },
    {
        "attrs": {
            "weight": 50,
            "fat": 0.2
        }
        "datetime": xxx
    }]
}
	返回报文中的 datetime 格式:
HOURS: "2015072010"
DAYS: "20150720"
WEEKS: "201529"
MONTHS: "201507"




## E07设备历史数据查询
3.7.1业务功能描述
该接口提供获取某个产品某台设备的历史数据，如温度值等功能；
3.7.2接口地址
http://enterpriseapi.gizwits.com/v1/products/<product_key>/devices/<did>/data?start_ts=<start_ts>&end_ts=<end_ts>&limit=20&skip=0
3.7.3请求方式
    GET
3.7.4请求报文
参数	类型	必填	参数类型	描述	备注
Authorization	String	是	header	获取授权返回的token值, For example: Authorization:token xxxx	
did	String	是	URL	设备号	
Start_ts	
Integer 

	是	URL	开始时间戳	
End_ts	
Integer 

	是	URL	结束时间戳	start_ts与end_ts之间的间隔秒必须在两天范围以内

limit	Integer 	是	URL		
skip	Integer 	是	URL		

3.7.5应答报文
响应编码	返回内容	说明
200	{
  "meta": {
    "total": 100,
    "limit": 20,
    "skip": 0,
    "next": "/v1/products/8f11ee69eb9d4269ba0777ca5e7280f5/devices/gdGn7PzAYf4VrhnVag5x8D/data?start_ts=1372700873&end_ts=1372701873&skip=20&limit=20",
    "previous": null
  },
  "objects": [
    {
      "ts": 1372701873,
      "attrs": {
        "temp": 20,
        "humi": 60
      }
    },
    {
      "ts": 1372701880,
      "attrs": {
        "temp": 20,
        "humi": 60
      }
    }
  ]
}
	

