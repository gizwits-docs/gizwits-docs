title: 机智云全球部署方案说明
---
# 全球化方案介绍
为满足机智云客户销售到海外的的硬件和硬件产品的消费者能更好的体验机智云平台带来的便利性，机智云在国外设有独立部署平台，以期从网络距离上缩短销售到海外的设备连接到国内长距离的网络延时问题，提供更好的交互体验。

目前机智云海外部署节点分布在美国东部、欧洲中部（法兰克福），都使用AWS 云计算服务。如下图所示：
![Alt text](/assets/zh-cn/UserManual/WorldWideConnectSolution/1503024906729.png)

美东节点覆盖范围：北美、南美地区；
欧洲节点覆盖范围：欧洲地区 
关于各节点的服务器的响应速度报告可以参阅[《机智云全球联网报告》](http://docs.gizwits.com/zh-cn/overview/overview.html)(本文主要介绍开发者接入机智云全球化方案流程。)

# 前期准备工作
## 确认模组使用固件版本
目前支持全球一体化方案模组固件如下
![Alt text](/assets/zh-cn/UserManual/WorldWideConnectSolution/1503024937640.png)

WIFI模组上烧录的固件为上图中发布时间之后的固件版本均可使用全球一体化方案，不过建议使用最新版本的固件来开发全球一体化的设备。
如果开发者无法确认模组的固件是否支持全球一体化方案，可咨询机智云FAE确认。
## 确认APP使用的SDK版本
APP支持全球一体化建议使用以下及其之后发布的SDK版本。
![Alt text](/assets/zh-cn/UserManual/WorldWideConnectSolution/1503024974568.png)

## 一体化方案产品数据同步部署
确定产品使用全球一体化方案后，开发者需要联系机智云技术支持，提供产品如下的对应信息。

|内容|示例|
|--|--|
|产品名称|《一体化方案产品》|
|Product Key|d187f9……|
|安卓APPID|943d59……|
|iOS APPID|000593……|
|开发者中心登录帐号|Myemail@xxx.com|

取《产品名称》和《Product key》如下图：
![Alt text](/assets/zh-cn/UserManual/WorldWideConnectSolution/1503025146453.png)

取《安卓与iOS APPID》如下图：
![Alt text](/assets/zh-cn/UserManual/WorldWideConnectSolution/1503025170676.png)

# 设备端开发
设备要支持全球一体化，除了需要使用支持的固件外，还需要在《3.1获取设备信息》协议中，回复一个Product Secret，具体协议如下图所示：

![Alt text](/assets/zh-cn/UserManual/WorldWideConnectSolution/1503025196192.png)

![Alt text](/assets/zh-cn/UserManual/WorldWideConnectSolution/1503025200577.png)

上图所需产品密钥获取如下：
![Alt text](/assets/zh-cn/UserManual/WorldWideConnectSolution/1503025212893.png)

# APP开发
全球一体化方案的APP开发分两种方案：
方案一：只开发一套APP适应全球设备
方案二：根据机智云的服务器划分，分别开发相对应的APP，也就是总共三套APP。
下面先介绍一下全球一体化使用到的启动接口。

## Andriod端
启动方法：
```java
public void startWithAppID(Context context, String appID, String appSecret, List<String>
specialProductKeys, ConcurrentHashMap<String, String> cloudServiceInfo, boolean
autoSetDeviceDomain)
```
参数解析：

|context|上下文对象|
|--|--|
|appID|接入产品绑定的appID，在开发者中心上获取|
|appSecret|APPID对应的appSecret，在开发者中心上获取|
|specialProductKeys|要过滤的设备产品类型productKey 列表，为String 数组|
|cloudServiceInfo|要切换的服务器域名信息。此参数默认值为null，此时SDK 将根据用户手机的地理位置信息为App 设置机智云统一部署的云服务域名。若App 希望使用独立部署的私有云服务域名，需按照以下字典<br>{key: value}格式传值：<br>{<br>"openAPIInfo": "xxx", // String类型，api服务域名<br>"siteInfo": "xxx" // String类型，site服务域名<br>"pushInfo": "xxx" // String类型，推送服务域名<br>}<br>其中，openAPIInfo 和siteInfo 必须传值，pushInfo 可选。可以不指定端口号，SDK 会使用默认的服务端口。此时形如：<br>api.gizwits.com<br>指定端口号时，需同时指定Http 和Https 端口。此时形如：<br>xxx.gizwits.com:81&8443|
|autoSetDeviceDomain|是否要开启设备域名的自动设置功能。此参数默认值为false，即不开启自动设置。参数值传true，则开启设备域名的自动设置功能。如果开启了设备域名的自动设置，小循环设备将被连接到App 当前使用的云服务域名上|

注意：cloudServiceInfo和autoSetDeviceDomain是没有任何关联的，当autoSetDeviceDomain设置为true的时候，启动SDK以后，APP需要能连上外网，让SDK去云端获取当前APP的APPID与ProudctKey列表的关联关系，只有与APPID关联的ProductKey，APP才有权限去修改其设备的域名。
APP去修改设备域名的时机是：当设备与APP连到同一个局域网内时，APP发现局域网的设备与APP连的服务器不同，就会通过TCP给设备发送域名信息，切换设备连接的服务器。
## iOS端
启动接口：
```objectivec
+(void)startWithAppID:(NSString*)appID appSecret:(NSString*)appSecret specialProductKeys:(NSArray*)specialProductKeys cloudServiceInfo:(NSDictionary *)cloudSeviceInfo autoSetDeviceDomain:(BOOL)autoSetDeviceDomain;
```

|appID|接入产品绑定的appID，在开发者中心上获取|
|--|--|
|appSecret|APPID对应的appSecret，在开发者中心上获取|
|specialProductKeys|要过滤的设备产品类型productKey 列表，为NSString 数组|
|cloudServiceInfo|要切换的服务器域名信息。此参数默认值为null，此时SDK 将根据用户手机的地理位置信息为App 设置机智云统一部署的云服务域名。若App 希望使用独立部署的私有云服务域名，需按照以下字典<br>{key: value}格式传值：<br>@{<br>@"openAPIInfo": @"xxx", // String类型，api服务域名<br>@"siteInfo": @"xxx" // String类型，site服务域名<br>@"pushInfo": @"xxx" // String类型，推送服务域名<br>}<br>其中，openAPIInfo 和siteInfo 必须传值，pushInfo 可选。可以不指定端口号，SDK 会使用默认的服务端口。此时形如：<br>api.gizwits.com<br>指定端口号时，需同时指定Http 和Https 端口。此时形如：<br>xxx.gizwits.com:81&8443|
|autoSetDeviceDomain|是否要开启设备域名的自动设置功能。此参数默认值为false，即不开启自动设置。参数值传true，则开启设备域名的自动设置功能。如果开启了设备域名的自动设置，小循环设备将被连接到App 当前使用的云服务域名上|

iOS的cloudServiceInfo和autoSetDeviceDomain功能同安卓相同。

## 一套APP适配全球设备
该方案是让SDK自动根据时区切换连接的服务器域名，此时的启动接口调用方式如下：
安卓端：
```java
GizWifiSDK.sharedInstance().startWithAppID(this, AppID, AppSecret, ProductKeyList(), null, true);
```
iOS端：
```objectivec
[GizWifiSDK startWithAppID:APPID appSecret:APPSECRET specialProductKeys: ProductKeyList cloudServiceInfo:nil autoSetDeviceDomain:YES];
```
该方案的优点：只需要一套APP就可适应所有地区的设备<br>
缺点：SDK自动根据时区去切换对应服务器，用户会较为被动，当APP与设备不是处于同一网络下，APP切换到另一个服务器，可能会导致找不到原来的账号和设备。
## 三套APP适配全球设备
该方案是根据机智云的服务器划分对应的APP。
机智云主要划分出三大服务器：中国服务器，美东服务器、欧洲服务器
APP也按这三大服务器划分为三套：中国APP，美东APP，欧洲APP
这三大APP基本内容相同，只在启动接口这里有差别，下面以iOS为例:

中国APP的启动接口：
```objectivec
[GizWifiSDK startWithAppID:APP_ID appSecret:APP_SECRET specialProductKeys:[GosCommon sharedInstance].productKey cloudServiceInfo:@{@"openAPIInfo" : @"api.gizwits.com" , @"siteInfo": @"site.gizwits.com", @"pushInfo": @"push.gizwitsapi.com"} autoSetDeviceDomain:YES];
```
美东APP的启动接口：
```objectivec
[GizWifiSDK startWithAppID:APP_ID appSecret:APP_SECRET specialProductKeys:[GosCommon sharedInstance].productKey cloudServiceInfo:@{@"openAPIInfo" : @"usapi.gizwits.com" , @"siteInfo": @"ussite.gizwits.com", @"pushInfo": @"us.push.gizwitsapi.com"} autoSetDeviceDomain:YES];
```
欧洲APP的启动接口：
```objectivec
[GizWifiSDK startWithAppID:APP_ID appSecret:APP_SECRET specialProductKeys:[GosCommon sharedInstance].productKey cloudServiceInfo:@{@"openAPIInfo" : @"euapi.gizwits.com" , @"siteInfo": @"eusite.gizwits.com", @"pushInfo": @" eupush.gizwits.com
"} autoSetDeviceDomain:YES];
```
使用该方式的优点: 用户根据所在位置下载相对应的APP，之后设备就是固定连接相对应的服务器了，运行相对稳定，APP和设备都不会出现在各个服务器之间切换的问题。
缺点：较繁琐，需要开发和上架三套APP。

# 问题说明
1、	APP有消息推送功能，使用全球一体化方案的时候该怎么处理？
解答：待机智云在国内外服务器上同步好产品的数据信息后，开发者需要使用同一帐号密码登录国外服务器，找到对应的产品，申请开通D3服务，并创建与国内一致的规则。
国外服务器的访问地址：
欧洲：http://eusite.gizwits.com/zh-cn/developer/
美东：http://ussite.gizwits.com/zh-cn/developer/


2、	如果发现APP有权修改非关联ProductKey的设备连接的域名，要怎么做？
解答：更换2017年8月14号后发布的SDK，也就是从2.07.07.2开始的SDK版本才做了设备域名切换的限制。
具体限制：在SDK启动之后，SDK会去云端确认APPID和ProductKey数组的关联关系，只有跟APPID关联的ProductKey下的设备，SDK才有权去修改设备的域名。

3、	如果APP开启了域名修改功能，但是发现局域网的设备都无法根据APP去自动切换到相应的服务器，该怎么做？
解答：
   a. 确认APP是否能连上外网，因为从2.07.07.2版本开始的SDK需要去云端确认APPID和Productkey的关联关系之后，才会去修改设备域名。
   b. 上机智云官网确认，APPID是否和ProductKey关联了。

4、	当在测试全球化设备时，若出现设备列表的设备出现闪烁状态，一会出现，一会消失的状态，会是什么原因导致的？
解答：查看同一个局域网下，是否开启了多个有权设置设备域名的APP，并且各自连的不同的服务器。
在测试全球化的设备时，同一局域网下的APP，必须连的相同服务器。否则，会出现多个APP在来回切换设备的服务器。

5、已经在全球化APP中创建了账号，之前登陆绑定设备一切正常，后来登陆报没有该账户、账户密码错误，这可能是什么问题导致的？
解答：确认一下之前创建账号时，APP连到的是机智云的哪个服务器，登陆报错时，APP连到的又是哪个服务器。很可能是连接的是不同服务器导致的报错，只需要切换到原来的服务器下即可正常登陆。























































