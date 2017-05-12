title: APICloud开源框架使用指南
---
APICloud开源框架是使用机智云SDK开发的APP模板，实现了SDK的加载、初始化、用户注册、登陆、设备配置、设备发现、设备连接等基本的功能。APP开发者可以基于框架实现具体产品的控制界面就可以生成一个完整的APP。目前提供iOS、Android和APICloud三个版本的开源框架，APICloud版的主要优势是一套代码适配iOS和Android两个平台。
本文档主要目的是告诉开发者如何利用开源框架来快速开发一个完整的APP，当然，也可以将源码作为参考，重新开发一套APP。
APICloud开源框架工程源码链接：https://github.com/gizwits/GizOpenSourceAppKit_APICloud
APICloud Gokit App是使用开源框架工程的源码范例，源码链接：https://github.com/gizwits/gokit_demo_in_apicloud
#框架目录结构说明
APICloud开发类似于Web前端开发，也是通过CSS + html + Javascript来完成的，目录也是基于此结构来区分的，如下图：
![Alt text](./1494472115112.png)
 具体到每个文件的功能描述如下：
![Alt text](./1494487796384.png)
#快速集成指南
在APICloud中每一个应用都有一个唯一的id标识，开源框架中并没有该id，需要重新创建一个APICloud项目，获取项目id，才能运行框架源码。

##创建一个空白项目
右击《我的APP项目》栏下的空白部分，点击新建APICloud项目；或者点击菜单栏的导航按钮，点击《新建APP项目》，进入项目创建页面。
![Alt text](./1494472516206.png)
选择《空白应用》，点击《完成》，此时，APICloud也同步生成了一个空白项目。
![Alt text](./1494472548413.png)
进入APICloud的开发控制台：http://www.apicloud.com/console，可以看到创建成功的APP项目
![Alt text](./1494472603492.png)
##移植框架代码
上面生成的空白源码目录如下，将红框部分的文件删除。
![Alt text](./1494472633370.png)
下图是框架的源码，将红框部分的文件复制到上图空白源码部分，则新创建的源码除了config.xml之外都与框架相同了。
![Alt text](./1494472649164.png)
##设置config.xml文件
config.xml是APICloud提供的配置文件，在每个项目中都会存在一个config.xml，上面提供了项目的id，也就是项目在APICloud平台的唯一标识，开发者个人的账号信息，以及一些界面的设置、项目所使用到的第三方模块的引入。若想了解详细内容可查看：http://docs.apicloud.com/Dev-Guide/app-config-manual。
下图是框架的config.xml文件内容，将红框部分的内容，替换为新建项目生成的对应值，然后将新建项目的config.xml文件替换为该config.xml文件
![Alt text](./1494472731064.png)
如果项目中使用QQ登陆，需要前往腾讯开发者中心申请应用，并获取apiKey值，urlScheme的value值就是填写 tencent+apiKey的字符串值； apikey的value值直接填写QQ的apikey值即可。
将项目的改动提交到APICloud云端，如下：
![Alt text](./1494472798416.png)
##引入GizWifiSDK
将源码移植与Config.xml的改动提交到云端后，APICloud会根据源码使用到的模块自动导入相应
的模块，机智云SDK需要手动导入。
![Alt text](./1494472869619.png)
搜索并导入GizWifiSDK
![Alt text](./1494472884133.png)
##设置源码中产品和应用的参数
此时的源码还需要设置安卓和iOS应用的appid和appsecret，并且设置在机智云官网创建的产品的ProductKey。
在机智云官网获取产品的ProductKey和ProductSecret。
![Alt text](./1494472920246.png)
获取安卓和iOS的AppID和AppSecret
![Alt text](./1494472945214.png)
进入框架的index.html页面：
![Alt text](./1494472962369.png)
将红框中的代码修改为下图红框所示：
![Alt text](./1494472981193.png)
your_ios_appid: 替换成在机智云创建的iOS应用的AppID
your_android_appid：替换成在机智云创建的安卓应用的AppID
your_ios_appsecret：同上，替换成iOS应用的AppSecret
your_android_appid：同上，替换成安卓应用的AppSecret
your_productKey：替换成在机智云创建的产品的ProductKey.
同时在deviceList.html文件中设置一下产品的ProductKey，让APP只获取该ProductKey的设备
![Alt text](./1494473000691.png)
将红框部分改为如下图：
![Alt text](./1494473019302.png)
##部署APP
完成上面的所有步骤后，运行APP
![Alt text](./1494473043471.png)
![Alt text](./1494473047283.png)
#APICloud真机调试说明
APICloud真机调试的方法较多，包括云编译、USB真机调试、WiFi真机调试等等，其中最方便快捷的是WiFi真机调试。下面将以APCIoud Studio工具为例，说明如何使用WiFi真机同步。
##编译自定义Loader
APICloud的所有第三方模块都保存在云端，如果编译调试的方式与原生APP相同，每次真机调试都要重新编译代码，将会耗费较长时间和资源。所以，APICloud推出了自定义Loader的编译调试方法。
每个APP项目对应一个自定义Loader，即当APP所需的第三方模块都在云端设置后，并且本地的代码也已经编辑，需要真机调试效果，即可编译自定义Loader，Loader中将根据你选择的模块和设置进行编译。
自定义Loader在真机调试中的优点是：若在调试过程中修改了代码不需要重新编译自定义Loader，只需要重新WiFi真机同步即可，在真机同步中APICloud会将改动的部分同步在自定义Loader中。
自定义Loader编译方式，选择需要调试的项目，右击如下图所示：
![Alt text](./1494473114095.png)
编译成功，会弹出如下页面，扫描即可安装相应的自定义Loader
![Alt text](./1494473131534.png)
##安装自定义Loader
扫描安装自定义Loader如下所示：
![Alt text](./1494473160910.png)
![Alt text](./1494473164790.png)
点击红色框内的白圆圈进入以下界面，通过该界面设置数据进行WiFi同步。
![Alt text](./1494473182148.png)
注意：自定义Loader也可通过以下方式获取：
![Alt text](./1494473196119.png)
##设置WiFi同步参数
在APICloud Studio中查看同步参数
![Alt text](./1494473222376.png)
选择《查看WiFi真机同步服务器地址》
![Alt text](./1494473238046.png)
在安装的自定义Loader设置该参数，点击《连接》，连接成功后，界面的圆圈变为绿色。
![Alt text](./1494473258387.png)
![Alt text](./1494473261599.png)
##WiFi同步测试
完成自定义Loader和WiFi同步参数后，即可进入WiFi同步测试。
在APICloud Studio选择《WiFi真机同步》
![Alt text](./1494473284744.png)
APP进入以下界面，同步完成后，即成功同步APP，接下来就可以测试APP了
![Alt text](./1494473300972.png)
![Alt text](./1494473304169.png)


































	
