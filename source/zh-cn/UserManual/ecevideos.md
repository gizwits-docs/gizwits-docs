# 机智云ECE入门教程

标签（空格分隔）： 机智云 ECE GAgent

---
##[ECE 介绍][1]
>**ECE（Edge Computing Engine）边缘计算引擎**，是 一个运行在设备通信模组或近场通信网关上的微应用容器，提供雾计算的运行环境，协调程序和底层硬件环境的关系。ECE和云端微应用管理及分发机制组成了机智云的“雾计算”层。微应用由开发者自行定义，以轻量级对脚本语言（JavaScript，Lua，Python等）构成。脚本可以根据云端的管理机制实 时更新和加载，无需重启设备和OTA固件升级。开发者可以直接在云端编写各种脚本，ECE下载到微应用容器中，动态加载这些脚本代码，实时应用到设备和数 据上，从而改变设备行为，进行多样化的本地的运算和决策，让“端”变得更加聪明，反应速度更加快，把日渐流行的“软件定义硬件Software Defined Device”升级到“云端定义硬件Cloud Defined Device”。
##ECE 入门准备
本教程分为4大部分

 - **机智云账号注册**
 - **硬件准备**
 - **MCU协议介绍**
 - **脚本编写以及推送**

###**1. [机智云账号注册][2]**
目前ECE的功能只有注册了机智云的企业账号，在企业账号下的企业产品项目下创建的产品才能体验。
**步骤一：**点击注册链接https://accounts.gizwits.com/zh-cn/register/



![image_1b371n1kmdhl11tflrn1ci2q6i9.png-273.5kB][3]
**步骤二：**填写注册信息
![image_1b371ovb3163ba7kbgj17hj10ctm.png-46.1kB][4]
点击《立即注册》，机智云会向您的注册邮箱发送一份激活邮件
![image_1b371qqh5rbj1voqlncrnah5t1t.png-98.5kB][5]
**步骤三：**登陆您的邮箱，选中机智云账号激活邮件
![image_1b37251i91pq21q610dos8uhic2a.png-141.2kB][6]
点击《登陆》，跳转到开发者类型选择界面，企业开发者必须选择《企业开发者》类型，方便后续产品的开发和支持,这里我们选择企业开发者。然后完善信息
![image_1b372bquop6v62k42npemtg02n.png-69kB][7]
接着完善企业信息
![image_1b372h81musb916biemcb1u6m34.png-64.9kB][8]
注意：**需要在企业用户里面创建企业产品才能体验ECE 个人产品目前不支持**
![image_1b5507vufs80vgl1hubvih1ltj54.png-49.8kB][9]
![image_1b372oaie170moj31laahbaitk3u.png-66.6kB][10]
添加ECE服务
![image_1b54gedde1qo11j7l1ajdmk6ju61f.png-89.7kB][11]
![image_1b54gfv431igq1vn419njipj1tbs1s.png-129.5kB][12]
![image_1b54ghdg15ik12am1brl1aj4unk29.png-121.4kB][13]
![image_1b372rr9ugfqr9jt5hjv31ta55i.png-162.3kB][14]
等待机智云开通ECE服务
ECE开通后如下图
![image_1b54glnol15d9aporv6t611eo33.png-55.5kB][15]
#观看链接：
[1.企业账号注册](http://v.qq.com/x/page/l0361rcmzqp.html)
###**2.硬件准备**
机智云ECE功能现在基于GAgent ESP8266 **4M Flash** 硬件平台；
第一步我们得找到一个ESP8266的WiFi模组；
第二步拿到机智云提供的支持[ECE的固件][16]。
当以上两步准备好，然后进入固件烧录
###[烧录流程如下：][17]
1. 设备连接
>将ESP8266模块按照如下原理图进行接线，注意GPIO0（18号管脚）需要输入低电平，本实验直接接地处理，KEY1实现外部复位功能
![image_1b378319t74665t1j6md8t1hkg9.png-25.6kB][18]
上图为烧录固件简易原理图，在产品中实际搭建线路时，请参考官方提供线路图，如下所示：
![image_1b3783s1s1e614sbvv11a1610nlm.png-350.6kB][19]

2. 串口设置
>将上述串口连接电脑后，通过“我的电脑”->“管理”-> “设备管理器”->“端口（COM 和LPT）”选项中可以看到相应增加的COM口。
![image_1b3785au5o68b8vj41ath16c513.png-4.1kB][20]
3. 下载烧写软件
>下载地址：http://pan.baidu.com/s/1mhMGSeG
下载解压后得到下面文件
![image_1b3788adf3nd1stvnae17ts11r71g.png-57.2kB][21]
再次解压图中所示的文件后，双击打开烧写软件，出现如下对话框
![image_1b378a03e14sv1ablqira248si1t.png-131.1kB][22]

4. 使用串口方式一烧写固件
>拿到支持ECE的ESP8266机智云WiFi固件
请务必依次对照下图所选的地方进行相应的填写：
![ececonfig.png-64.1kB][23]

固件烧写操作：
 步骤一、当串口连接成功之后，点击如上图的“START”按钮，
 
![image_1b378f7tf1cmac031gvf1lb0rng2n.png-4.9kB][24]

会出现

![image_1b378fqrj2q16bd1n45e38v0o34.png-5.1kB][25]

步骤二、将ESP8266进行复位（按下1节原理图所示的KEY1后松开）将会出现如下信息表示模块正在进行烧写。

![image_1b378iqa41kbpobn1kc01g766343h.png-10.6kB][26]

步骤三、等待一段时间后，出现“FINISH”字样表示烧写成功。

![image_1b378jlisb9jpq51khd1h3kft83u.png-10.3kB][27]

产品初始化信息烧录：
- 到产品页面找到对应产品的**product key**,如下图：
![image_1b54goudp1mv3113418pp2g5s553g.png-58.7kB][28]
- 把**product key**保存到init.lua脚本里面，格式如下：
![image_1b54grort2v01nums0s4gq8103t.png-7.8kB][29]
- 把该文件烧录到**0xb0000**地址，烧录步骤跟**第五部分固件烧写操作**一样
- ![init.lua烧录][30]

###**3.MCU协议介绍**
####**MCU与WiFi通讯以字符串形式通讯，具体命令规范如下：**
- - - 
- - -
- MCU 通知 WiFi进入airlink配网 **cmd=2**:
  命令: ```mcu2wifi&cmd=2&mode=0/1```
  解释: ```mode:0 softap配置模式; mode:1 airlink配网模式```
-  WiFi回复配网:
 命令: ```mcu2wifi&cmd=2&result=0/1```
- - -
- MCU上传设备数据给WiFi **cmd=3**:
 命令: ```mcu2wifi&cmd=3&Infrared=1&LedSwitchOnOff=1&MotorSwitchOnOff=1&Temperature=05```
- WiFi发送控制指令给mcu **cmd=4**：
 命令: ```wifi2mcu&cmd=4&LedSwitchOnOff=1或者MotorSwitchOnOff=1```

**实现该协议的固件见机智云下载中心 [ECE雾计算esp8266固件包][31] 里面的```gokit_mcu_stm32_ece.hex```**
**固件烧录教程:**http://club.gizwits.com/forum.php?mod=viewthread&tid=3311&highlight=gokit%2B%E7%83%A7%E5%BD%95
###**4.脚本编译及推送**
- - -
####**脚本格式及编写规则**
请参照demo.lua这个脚本为模板编写自己的lua应用程序，该demo脚本需配套gokit套件及上面提到的模组及MCU固件使用，实现了下列功能：  
1、当检测到上报温度大于27度时，通知MCU打开电机;  
2、当红外对管检测到障碍物时，打开红灯;  
下面我们通过注释区定义了几大块：  
应用程序初始化部分，程序请写到luaInit内容区，这部分的代码在整个脚本生命周期只会运行一次，比如分配应用的内存大小，请把lua应用程序需要初始化一次的部分放在这个区域内。
```
----------luaInit----------
---------内容------------

----------luaInit end----
```
应用程序公有函数部分，程序请写到luaUtils内容区。
```
----------luaUtils---------
---------内容------------

----------luaUtils end---
```
从app过来的数据处理，程序请写到luaHandleDataFromApp内容区。
```
----------luaHandleDataFromApp----------
---------------------内容--------------

----------luaHandleDataFromApp end----
```

从MCU设备过来的数据处理，程序请写到luaHandleDataFromApp内容区。
```
----------luaHandleDataFromDev----------
---------------------内容---------------

----------luaHandleDataFromApp end----
```
**注意：**由于esp8266资源紧缺，编写的lua应用程序脚本大小不能大于10Kbytes，一次性定义的变量（table\string）不宜超过300个，总变量不宜超过500个。

####**lua SDK版本及相关的API**
sdk版本：```sdk5.1.4```
Lua SDK标准库：其中string和table为sdk5.1.4标准库，```core,math，C API，auxiliary library```不全支持，有裁剪(详细的api请查看```gagent_esp8266_api```文档)；tmr定时器接口用的是esp8266平台的定时器。
GAgent封装给lua使用的API:　请查看```gagent_esp8266_api```文档。
####**验证lua应用程序的语法**
编写好的lua应用程序，可以先用本地的IDE先进行语法编译验证，确保语法编译没有问题，对于调用到的GAgent API，可以先打桩。Window平台推荐LUA本地编译的IDE工具：SciTE或 LuaForWindows:

![image_1b52ecj9g1tsp1vli471qan1j3u9.png-206.5kB][32]

**Ubuntu安装lua环境：**```sudo apt-get install lua、sudo apt-get install lua5.1-0-dev```

![image_1b52ee4viuqs1q5jcp8bf314vgm.png-44kB][33]

####**脚本推送**
把lua脚本拷贝到lua脚本录入处做推送：

![image_1b52efl9u4m61s98144016fj2v413.png-96.7kB][34]

可以通过指向mac地址对某台或某几台设备进行脚本推送：

![image_1b52eg53l1vnn19q810qepb5be91g.png-66.8kB][35]

推送结果反馈：
**推送成功：**

![image_1b52egm5f1q3951nla12lg1apm1t.png-61kB][36]

**Mac地址出错或设备未上线提示的推送失败：**

![image_1b52eh3j657kvm6177i1k1epd42a.png-66.4kB][37]


  [1]: http://www.gizwits.com/news/69
  [2]:http://docs.gizwits.com/zh-cn/quickstart/5%E5%88%86%E9%92%9F%E4%BA%86%E8%A7%A3%E6%9C%BA%E6%99%BA%E4%BA%91.html
  [3]: http://static.zybuluo.com/AlexLin/ilfjrdsrklg3wijauq9myph8/image_1b371n1kmdhl11tflrn1ci2q6i9.png
  [4]: http://static.zybuluo.com/AlexLin/5a0p580uy1cuolg2lkf6fbu6/image_1b371ovb3163ba7kbgj17hj10ctm.png
  [5]: http://static.zybuluo.com/AlexLin/l8lc2stjb2ebzxhdt7gxpzg2/image_1b371qqh5rbj1voqlncrnah5t1t.png
  [6]: http://static.zybuluo.com/AlexLin/ltc2hef52f4irsgwvswt05cq/image_1b37251i91pq21q610dos8uhic2a.png
  [7]: http://static.zybuluo.com/AlexLin/j7ibb0wjby4hgpbsivazl58b/image_1b372bquop6v62k42npemtg02n.png
  [8]: http://static.zybuluo.com/AlexLin/z76rc5djg5l8y8y3gh5ciu0n/image_1b372h81musb916biemcb1u6m34.png
  [9]: http://static.zybuluo.com/AlexLin/h7irfs30xgxeh0lbn2kew83l/image_1b5507vufs80vgl1hubvih1ltj54.png
  [10]: http://static.zybuluo.com/AlexLin/k979hvbii3kmiwb007j5idmo/image_1b372oaie170moj31laahbaitk3u.png
  [11]: http://static.zybuluo.com/AlexLin/aav2s8d24r7nwjp1tznvcf6w/image_1b54gedde1qo11j7l1ajdmk6ju61f.png
  [12]: http://static.zybuluo.com/AlexLin/9q97jl2og6xnd3fdcwr4st2u/image_1b54gfv431igq1vn419njipj1tbs1s.png
  [13]: http://static.zybuluo.com/AlexLin/ak00umu8f49jksm6xphlgg8u/image_1b54ghdg15ik12am1brl1aj4unk29.png
  [14]: http://static.zybuluo.com/AlexLin/1l39y1meot6r3r5q20ktozz6/image_1b54gjag412b1iou468umsf9v2m.png
  [15]: http://static.zybuluo.com/AlexLin/5pfs4spu2rzmy6kxptwn6ilv/image_1b54glnol15d9aporv6t611eo33.png
  [16]:http://dev.gizwits.com/zh-cn/developer/resource/hardware?type=GAgent
  [17]:http://docs.gizwits.com/zh-cn/deviceDev/ESP8266%E4%B8%B2%E5%8F%A3%E7%83%A7%E5%86%99%E8%AF%B4%E6%98%8E.html
  [18]: http://static.zybuluo.com/AlexLin/p9aokc7i7vizl644k65nxyoi/image_1b378319t74665t1j6md8t1hkg9.png
  [19]: http://static.zybuluo.com/AlexLin/jsxjii3qjfjsw8ipx5k5m9kt/image_1b3783s1s1e614sbvv11a1610nlm.png
  [20]: http://static.zybuluo.com/AlexLin/sh4ik05qtukepyouh78ltjwc/image_1b3785au5o68b8vj41ath16c513.png
  [21]: http://static.zybuluo.com/AlexLin/xicp3uiv2e4ch08htiokk56p/image_1b3788adf3nd1stvnae17ts11r71g.png
  [22]: http://static.zybuluo.com/AlexLin/it7c09runtpudrqli3yn2hgm/image_1b378a03e14sv1ablqira248si1t.png
  [23]: http://static.zybuluo.com/AlexLin/kpsrthdmcgifdv9zx23g9wcv/ececonfig.png
  [24]: http://static.zybuluo.com/AlexLin/xogit0hg2992bz0bj5vx4y3x/image_1b378f7tf1cmac031gvf1lb0rng2n.png
  [25]: http://static.zybuluo.com/AlexLin/1pq342yqs92censu2yssctth/image_1b378fqrj2q16bd1n45e38v0o34.png
  [26]: http://static.zybuluo.com/AlexLin/65qisaj8claxqi809mo7xko0/image_1b378iqa41kbpobn1kc01g766343h.png
  [27]: http://static.zybuluo.com/AlexLin/ppea46nn4t9n9ipnp79unmaj/image_1b378jlisb9jpq51khd1h3kft83u.png
  [28]: http://static.zybuluo.com/AlexLin/kgh8wgy6eu2gy6chl6k5d7dj/image_1b54goudp1mv3113418pp2g5s553g.png
  [29]: http://static.zybuluo.com/AlexLin/drpbhokmpu0ls8sy5x2k7nox/image_1b54grort2v01nums0s4gq8103t.png
  [30]: http://static.zybuluo.com/AlexLin/99epdwavq6vodgxr2dxxco8u/image_1b3u26iv81mp21lntq0cpd41rpf13.png
  [31]: http://dev.gizwits.com/zh-cn/developer/resource/hardware?type=GAgent
  [32]: http://static.zybuluo.com/AlexLin/gjmyi8ud02hjhf3vjk00oerw/image_1b52ecj9g1tsp1vli471qan1j3u9.png
  [33]: http://static.zybuluo.com/AlexLin/mzlzoden5h1tysswp90tzxwb/image_1b52ee4viuqs1q5jcp8bf314vgm.png
  [34]: http://static.zybuluo.com/AlexLin/dmw8f8vny4wkamzwnh9c9lmg/image_1b52efl9u4m61s98144016fj2v413.png
  [35]: http://static.zybuluo.com/AlexLin/sqvaal69sat4ygwgchxcaz4a/image_1b52eg53l1vnn19q810qepb5be91g.png
  [36]: http://static.zybuluo.com/AlexLin/yu6scxcs2zdzlsb92n5q5gi8/image_1b52egm5f1q3951nla12lg1apm1t.png
  [37]: http://static.zybuluo.com/AlexLin/s1oj1xyj90avz3lippw7syzw/image_1b52eh3j657kvm6177i1k1epd42a.png
