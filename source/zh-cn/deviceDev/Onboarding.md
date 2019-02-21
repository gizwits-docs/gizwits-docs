# Airlink配网排查引导手册

## 修订历史

版本 | 修订内容 | 修订人 | 修订日期
---|---|---|---
V1.0 | 起稿，第一版本 | 钟汉烽 | 2018/12/24
V2.0 | 加入查看配网时，模组日志打印的配置密码 | 钟汉烽 | 2019/1/23
V3.0 | 补充说明 | 钟汉烽 | 2019/2/2

## 1、本文编写背景
&emsp;&emsp;机智云的客户和开发者使用Airlink方式给WiFi模组配网，总是会遇到各种奇奇怪怪的情况导致配网失败，本文介绍AirLink配网原理，AirLink配网失败主要原因和排查基本步骤，进而引导客户自行排查配网问题，最终达到快速定位问题和处理问题的效果。

## 2、AirLink配网基本原理

![1](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/1.png)

&emsp;&emsp;1、Airlink利用了UDP的广播或者组播技术，由于数据包会被网络协议加密，能获取到明文信息很少，所以只能把信息用数据包长度这样的信息来传递（不同算法还有其他方式），模组在Airlink（混杂）模式下可以获取到包，虽然解不开包的内容，但是可以知道包长度和一起其他的明文信息。
&emsp;&emsp;2、比如某个路由器的SSID为： MyHome，这几个字母的ascii分别是(10进制）：77，121，72，111，109，101；那么手机在发送信息的时候就会发送数据长度分别是77，121，72，111，109，101的数据包，不断的循环发送（当然还包含一些算法上需要的数据特征值）；
&emsp;&emsp;3、模组在Airlink模式下，是会在所有信道上不断的扫抓取所有的数据包的，一旦在某个信道上抓到了特征包（比如10个以上的长度为131的UDP数据包），表示这个信道上有配置信息要接受，接着就会收到长度为77，121，72，111，109，101的数据包，模组把这6个包的信息（长度）翻译成MyHome。
&emsp;&emsp;4、至于长度为77字节的数据包的内容，模组和APP都不用关心，只用了长度信息而已，也就是发送了77个字节，只为了让模组得到一个数值（ascii）为77的字符。再加上模组要在所有信道上轮询抓取，就导致了Airlink的UDP数据量很大。
&emsp;&emsp;5、上述是概括某一平台的Airlink原理，模组的不同的模组平台Airlink的原理会有所不同，本文不一一展开，有兴趣的朋友可以参考https://blog.csdn.net/it_beecoder/article/details/72651940

## 3、AirLink配网失败排查步骤
&emsp;&emsp;1、	乐鑫8266模组仅支持连接2.4G频段路由器，确认要配网连接的路由器不是5G或者2.4G/5G混合双频
&emsp;&emsp;2、	通过模组日志判断，模组使用的是否最新版模组固件
&emsp;&emsp;3、	通过模组日志判断，模组确实进入Airlink配网模式
&emsp;&emsp;4、	确认客户的APP没有选错模组平台和Airlink配网模式

### 3.1、确认路由器是2.4G频段

&emsp;&emsp;我们通过手机的搜索WiFi功能就可以确认我们周围的路由器是否2.4G频段；如果要连接的路由器不是2.4G，请设置成2.4G频段

![2](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/2.png)

### 3.2、模组使用的是否最新版模组固件

&emsp;&emsp;客户需要确保乐鑫8266（12F、12S、07S等）使用的是最新版固件，目前最新的固件版本号是04020034。可以在乐鑫8266模组在日志中确认固件版本号。模组日志打印方法请见：http://docs.gizwits.com/zh-cn/deviceDev/%E9%80%9A%E8%AE%AF%E6%A8%A1%E7%BB%84%E8%B0%83%E8%AF%95%E6%97%A5%E5%BF%97%E6%8A%93%E5%8F%96%E6%95%99%E7%A8%8B.html#1-%E8%8E%B7%E5%8F%96%E4%B9%90%E9%91%ABESP-8266-Gagent%E6%97%A5%E5%BF%97

![3](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/3.png)

### 3.3、模组确实进入Airlink配网模式

![4](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/4.png)

### 3.4、请客户确认App使用的配网方式及模组平台

&emsp;&emsp;请app开发确认app的配网方式为AirLink，并且对应的模组型号与板卡的模组型号一致。

## 4、使用最新版机智云demo APP进行配网

&emsp;&emsp;如果客户使用自己的设备和自己的APP如上述步骤3.1、3.2、3.3、3.4进行Airlink配网都失败，可以使用机智云demo APP进行Airlink的配网对比测试，以快速初步对比出配网失败的原因。

### 4.1、路由器设置2.4G、模组使用最新版固件和进入Airlink配置模式，参考3.1——3.3

### 4.2、机智云demoAPP下载链接https://download.gizwits.com/zh-cn/p/98/99

### 4.3、机智云demo APP配网流程，等待配网成功

![5](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/5.png)![6](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/6.png)![7](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/7.png)![8](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/8.png)![9](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/9.png)![10](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/10.png)![11](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/11.png)![12](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/12.png)![13](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/13.png)

&emsp;&emsp;若机智云demo APP配网成功，而开发者APP配网失败，则有以下几点原因：
&emsp;&emsp;1、可能是开发者app调用配网接口填写的模组平台与板卡模组型号不一致。
&emsp;&emsp;2、开发者app调用配网接口的配网方法参数非AirLink配网。

## 5、使用手机热点作为路由器进行测试

&emsp;&emsp;若是使用机智云demo App如上述步骤4.1——4.3配网后仍然失败了，这时候极有可能是路由器的问题了，可以尝试使用手机热点作为路由器进行测试，以对比出是否真实路由器的某些原因导致配网失败。
&emsp;&emsp;1、打开手机A热点
&emsp;&emsp;2、使用手机B连接A的热点
&emsp;&emsp;3、手机B打开机智云demo APP，一键配置，等待配网成功。

![14](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/14.png)
手机A热点设置

### 5.1、使用手机热点进行Airlink配网失败

&emsp;&emsp;如果通过手机热点和机智云demo APP进行配网还是失败，需要抓取模组日志和APP的sdk日志给机智云FAE，才能进一步确认问题的分析。除了日志，客户还应该提供手机型号，手机操作系统版本号，路由器型号，模组版本号，product key信息，企业信息，appid信息给FAE
&emsp;&emsp;模组日志或sdk日志的获取流程
http://docs.gizwits.com/zh-cn/deviceDev/%E9%80%9A%E8%AE%AF%E6%A8%A1%E7%BB%84%E8%B0%83%E8%AF%95%E6%97%A5%E5%BF%97%E6%8A%93%E5%8F%96%E6%95%99%E7%A8%8B.html#
&emsp;&emsp;APP端sdk日志获取流程
http://docs.gizwits.com/zh-cn/AppDev/SDK%E8%B0%83%E8%AF%95%E6%97%A5%E5%BF%97%E6%8A%93%E5%8F%96%E6%95%99%E7%A8%8B.html#

### 5.2、使用手机热点进行Airlink配网成功

&emsp;&emsp;如果通过手机热点和机智云demo APP进行配网成功，通过真实路由器和机智云demo APP进行配网失败，需要测试网络环境能否收发UDP广播包，具体方法如下：

#### 5.2.1、手机安装机智云Demo APP

#### 5.2.2、将手机WiFi网络链接到测试网络环境中，并且查看手机在该网络环境中的IP地址。如下图：

![15](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/15.png)
![16](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/16.png)

#### 5.2.3、安装wireshark抓包工具，下载链接

#### 5.2.4、打开wireshark工具，按照下图指引设置。

![17](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/17.png)

#### 5.2.5、设置wireshark后，Wireshark跳转到抓包界面，打开机智云Demo APP。

#### 5.2.6、对wireshark抓包条件设置过滤，如下图：

![18](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/18.png)

#### 5.2.7、参考上图中设置，等待数分钟（等待期间，可以点击机智云Demo APP的设备列表刷新功能），如果可以看到Destination：255.255.255.255的数据包，则说明该测试网络环境具备UDP广播包的传输条件。如果没有，则说明该环境不具备UDP广播包的传输条件，客户应当想办法使路由器具备UDP广播包的传输条件。

## 6、其他配网失败排查方法

&emsp;&emsp;有时候配网失败可能的原因既不是设备端原因，也不是APP端原因，也不是路由器原因，可能是手机的原因，这时候我们可以尝试更换手机来配网，以此排查是否手机的原因。例如客户原先用的IOS手机，安装了机智云demo APP后airlink配网仍然失败，换了Android手机就能成功，这样就可以初步判断是IOS手机的原因；例如客户用Android8.0甚至Android9.0的手机，机智云demo APP后Airlink配网仍然失败，换了Android7.0及以下就能成功，这样就可以初步判断是Android8.0及以上手机的原因。
&emsp;&emsp;注：目前乐鑫的配置库使用IOS手机和Android8.0及以上手机Airlink配网均正常，这里只是提供一个排查的思路打的比方。

## 7、FAQ

&emsp;&emsp;Q：客户使用自己开发的APP给模组Airlink配网失败，用机智云demo APP给模组Airlink配网成功，怎么知道客户APP是否选错平台和选错配网模式？
&emsp;&emsp;A：发送SDK日志给FAE

&emsp;&emsp;Q：乐鑫模组会跟2.4G路由器的存在兼容问题导致无法连接路由器吗？
&emsp;&emsp;A：理论上有这种情况，但是极少见，一般都遇不到

&emsp;&emsp;Q：配网时APP输入路由器的密码错误，模组会如何表现
&emsp;&emsp;A：APP输入错误的密码后配网，模组会正常退出配网模式并进入STA模式，开始一直搜索APP给出ssid和密码都符合的热点，有就连接上，没有就打印disconnect from ssid xxx，reason2...

![19](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/19.png)

<center>除了密码错误，路由器不兼容，APP连接5G路由器后配网，模组解析配置包出错，模组日志都会如上打印</center>

![20](http://docs.gizwits.com/assets/zh-cn/deviceDev/Onboarding/Esp8266-Airlink/20.png)

&emsp;&emsp;Q：路由器端口号的限制会不会影响Airlink配网和影响模组连接路由器
&emsp;&emsp;A：都有影响，特别是一些高级写字楼，对应路由器设置有一定的限制，要确认一下端口是否禁止：
&emsp;&emsp;&emsp;&emsp;APP与设备服务端口的定义
&emsp;&emsp;&emsp;&emsp;设备监听UDP广播端口号为：12414
&emsp;&emsp;&emsp;&emsp;设备TCP服务器端口号为：12416
&emsp;&emsp;&emsp;&emsp;APP监听UDP广播端口号为：2415

&emsp;&emsp;&emsp;&emsp;设备与云端服务端口的定义
&emsp;&emsp;&emsp;&emsp;设备与GService服务器端口号为：80
&emsp;&emsp;&emsp;&emsp;设备与M2M服务器端口号为：1883或8883
