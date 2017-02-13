title: 聚合API使用教程
----
# 1.概述
该接口可以对设备上报的数值型数据点数据进行聚合，可以按小时/天/周/月对数据点数据进行求和/平均值/最大值/最小值进行聚合。一次可以获取多个数据点的聚合数据。
要使用该接口，必须先请求开通该接口。请求通过的之后上报的数据才会进行聚合运算。
使用例子，如：智能水表的用水量数据点，可以统计分析每户每个月的用水量、每个星期的用水量和每天的用水量。从而，形成一个月报表、周报表和天报表。 

# 2.Open API的高级数据接口使用流程
Open API的高级数据接口，就是获取设备聚合数据。
当客户已开通open API聚合接口使用权限后，就可以调用该接口进行设备上报的数值型数据点数据进行聚合分析，可以按小时/天/周/月对数据点数据进行求和/平均值/最大值/最小值进行聚合。

## 2.1创建用户
[http://swagger.gizwits.com/doc/index/openapi_apps#/用户管理/post_app_users](http://swagger.gizwits.com/doc/index/openapi_apps#/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86/post_app_users)
如下图为创建匿名登录
![Alt text](/assets/zh-cn/UserManual/DataAPI/1486538498852.png)
## 2.2.登录用户
匿名创建接口和匿名登录接口一样。
## 2.3.绑定设备
[http://swagger.gizwits.com/doc/index/openapi_apps#/绑定管理/post_app_bind_mac](http://swagger.gizwits.com/doc/index/openapi_apps#/%E7%BB%91%E5%AE%9A%E7%AE%A1%E7%90%86/post_app_bind_mac)
![Alt text](/assets/zh-cn/UserManual/DataAPI/1486542205826.png)

## 2.4.上报设备数据
使用机智云提供的xpg工具，通过模拟mcu上报当前设备的数据。
工具的使用方法如下：
[http://docs.gizwits.com/zh-cn/deviceDev/串口工具使用文档.html](http://docs.gizwits.com/zh-cn/deviceDev/%E4%B8%B2%E5%8F%A3%E5%B7%A5%E5%85%B7%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3.html)
![Alt text](/assets/zh-cn/UserManual/DataAPI/1486543125080.png)

## 2.5.数据聚合查询
[http://swagger.gizwits.com/doc/index/openapi_apps#/高级数据接口](http://swagger.gizwits.com/doc/index/openapi_apps#/%E9%AB%98%E7%BA%A7%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3)
![Alt text](/assets/zh-cn/UserManual/DataAPI/1486543163248.png)

查询后的结果：
![Alt text](/assets/zh-cn/UserManual/DataAPI/1486543295027.png)

# 3.企业API的设备数据聚合查询流程
设备数据聚合查询只是对单台设备进行数据聚合查询，该接口提供查询某个时间周期内某个WiFi设备数据型数据点的聚合运算，包括求和、平均、最大、最小。
注意：企业API使用先向机智云技术申请开通企业API，以及要在API配置处添加IP白名单。

## 3.1.申请开通企业API
申请开通企业API的流程：
[http://docs.gizwits.com/zh-cn/Cloud/ent_dev.html](http://docs.gizwits.com/zh-cn/Cloud/ent_dev.html)

## 3.2.添加IP白名单
![Alt text](/assets/zh-cn/UserManual/DataAPI/1486543738812.png)
IP为你当前服务器的外部IP。
![Alt text](/assets/zh-cn/UserManual/DataAPI/1486543816467.png)

## 3.3.申请开通企业API聚合接口使用
联系机智云技术人员，向他们申请开通企业API聚合接口的使用权限。
## 3.4.获取token
请求URL: 
[http://enterpriseapi.gizwits.com/v1/products/447c947fff3245a18dfc709371c34e69/access_token](http://enterpriseapi.gizwits.com/v1/products/447c947fff3245a18dfc709371c34e69/access_token)
Body参数填写：
{
  "enterprise_id": "string",
  "enterprise_secret": " string ",
  "product_secret": " string "
}
![Alt text](/assets/zh-cn/UserManual/DataAPI/1486543902362.png)
注意：不能在swagger上面直接请求，因为swagger服务的IP没有在你们的IP白名单内，如果你暂时还没有搭建好后台服务器，可以借用chrome浏览器插件postman来进行请求。
## 3.5.上报设备状态
![Alt text](/assets/zh-cn/UserManual/DataAPI/1486543926801.png)

## 3.6.调用单台设备数据聚合查询接口
请求URL:
[http://enterpriseapi.gizwits.com/v1/products/cdfb1e7f2d31474ca10396de88491372/devices/Zb248887fhMVZ2V2Jhz2xfq/agg_data?start_ts=1485151200000&end_ts=1485153000000&attrs=t1%2Ct2%2Ct3%2Ct4&aggregator=avg&unit=HOURS](http://enterpriseapi.gizwits.com/v1/products/cdfb1e7f2d31474ca10396de88491372/devices/Zb248887fhMVZ2V2Jhz2xfq/agg_data?start_ts=1485151200000&end_ts=1485153000000&attrs=t1,t2,t3,t4&aggregator=avg&unit=HOURS)
URL的Params值有：
product_key
did
start_ts
end_ts
attrs
aggregator
unit

Headers参数：
Authorize   token “填token”
Content-Type	application/json

![Alt text](/assets/zh-cn/UserManual/DataAPI/1486544088058.png)

注意：${token值}是不包括${}号，只需将从获取token接口获得token值放到token之后。例如：Authorization: token efbekskdklllsF
# 4.相关支持
聚合接口是面向企业开发者使用的，如果要申请开通，请通过官网的联系方式联系我们。

网站地址：http://www.gizwits.com/about-us

官方二维码：

![Alt text](/assets/zh-cn/UserManual/DataAPI/1486544134249.png)
