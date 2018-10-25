# 			机智云GoKit4（G） SoC环境搭建教程

### 开发工具包

网盘下载开发环境所需安装包：

链接：https://pan.baidu.com/s/1dvTfeQQNdgHlxEsCdbOYHA

提取码: 86vs

| 序号 | 软件包                                   | 说明                   |
| ---- | ---------------------------------------- | ---------------------- |
| 1    | Quectel_BG96_Windows_USB_Driver_V1.0.zip | BG96 USB驱动文件       |
| 2    | 移远模组交叉编译工具4.0.3.zip            | 交叉编译链             |
| 3    | python-3.6.1-amd64.exe                   | Python3.6.1安装软件包  |
| 4    | python-2.7.11.amd64.msi                  | python2.7.11安装软件包 |
| 5    | pyserial-3.4.tar                         | python串口包           |
| 6    | 机智云串口调试助手v2.3.9                 | 机智云串口调试助手     |
| 7    | CP210x_Universal_Windows_Driver.zip      | CP210x串口驱动         |
| 8    | UartAssist.exe                           | 串口调试工具           |
| 9    | QFlash_V4.3.1                            | 底包烧录工具           |
| 10   | BG96MAR03A03M1G                          | Gokit4底包             |

### 1、交叉编译链

简单，解压移远模组交叉编译工具4.0.3.zip文件至D盘根目录（注意此目录顶级目录是4.0.3）

### 2、Python环境及QFLOG

1、python-2.7.amd64.msi“傻瓜式”安装，你懂得，默认路径一直下一步就好啦，注意python和交叉编译链的路径很重要，windows下编译源码的时候在批处理文件已经指定了默认路径。（编译时用python-2.7）

2、python-3.6.1-amd64.exe“同样很傻瓜式”安装。注意查看Python安装后的路径，默认是“C:\Users\Administrator\AppData\Local\Programs\Python\Python36 ”，当然系统会有差异请以系统为准。安装Python后会默认一起安装pip工具，在Python36目录下Scripts下可查看。将Python36添加到系统环境变量path中，打开命令行输入python -V查看是否添加环境变量成功及Python版本号。（下载时用python-3.6.1）

3、解压pyserial-3.4.tar，在命令行窗口下，跳转到解压后的目录下，运行命令：

python setup.py build

模块开始编译，编译后执行命令：

python setup.py install

安装后就可以了。

4、将QFLOG文件夹移植到D盘根目录下，修改D:\QFLOG\src\QFLOGPackage\env_qflog.bat文件，修改变量QFLOG_PYTHON_PATH的值，改为自己的python36的绝对路径，保存。

### 3、USB驱动安装

解压Quectel_BG96_Windows_USB_Driver_V1.0后点击setup.exe安装，貌似也不用多说，下一步就好。安装过程中遇到错误如下，忽略就好。

![驱动安装过程中出错](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/驱动安装过程中出错.png)

安装后，USB线连接PC和开发板，如下图，拨码开关拨至BOOT

![烧录模式图](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/烧录模式图.png)

打开PC设备管理器，检查驱动安装是否正常，如下图所示端口出现三个COM即表示成功，一会儿我们会用到AT port。

![设备管理器查看串口](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/设备管理器查看串口.png)

### 4、底包烧录

4.1 解压QFlash_V4.3.1到英文路径下

4.2 Gokit4数据线插到转接板上，并检查设备管理器Port，正常如下

![sbglqck](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/sbglqck.png)

4.3 打开QFlash工具烧录Gokit4底包，注意Gokit4底包（BG96MAR03A03M1G）在网盘中，解压放在英文路径下即可，烧录如下图，烧录后显示"PASS ...success"字样表示烧录成功，关闭工具。

![QFlashsldbt](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/QFlashsldbt.png)

### 5、AT切换NB模式

5.1 Gokit4数据线插到转接板上，并检查设备管理器AT Port

5.2 串口工具发送AT命令，设置（注意如下三条指令，每条指令后需加回车后发送）

AT+QCFG="band",0,0,80

AT+QCFG="nwscanmode",3

AT+QCFG="iotopmode",1

5.3 查询信号强度和注网状态

at+csq;+qnwinfo;+cereg?;

模组返回信息，CEREG为0,1 或 0,5就说明注册成功了

![ATForNB](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/ATForNB.png)

### 6、编码及编译

​	借助机智云自助开发平台，开发者可以快速实现产品设计、开发、调试、发布的完整流程，请先阅读先阅读http://docs.gizwits.com/zh-cn/quickstart/README.html 五分钟 五分钟了解机智云自助开发平台。

6.1 创建产品，选择通讯方式为移动网络，如下图：

备注：本次高通开发者大赛标配的物联网卡支持NB-IoT网络，但请勿选择“WiFi”或“NB-IoT”通讯方式

![TXLXXZ](D:\GizwitsBusiness\for_market\20180901_GOKIT4\site\Gokit4 SoC开发环境搭建教程.assets/TXLXXZ.png)

6.2 根据产品需求编辑数据点

6.3 选择MCU开发，选择SOC方案，选择硬件平台MDM9206,输入Product Secret，利用代码自动生成开发框架，进行二次开发完善自己的产品逻辑。注意：若出现无此平台的生成支持，网盘资源包中提供了一个例程SoC_MDM9206_Source_Demo，修改数据点协议相关部分，也可以完成产品开发。可参考的协议文档见开发向导->MCU开发资源中的通信协议，注意该文档默认是MCU方案的串口协议文档，本次开发是SOC方案，所以该文档只需关注3.3和3.4 flag和action相关部分即可。

6.4 双击源码根目录中的llvm_build.bat批处理文件，喝水等会，如果出现红色Error那就恭喜你成功编写了BUG。一切顺利的话，在源码目录target下生成三个文件表示成功，如下图

![目标文件输出](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/目标文件输出.png)

### 7、固件下载

7.1  将上一步编译后生成的目标文件gagent_app.bin和oem_app_path.ini文件拷贝到D:\QFLOG\src\QFLOGPackage\目录下

7.2 打开命令行中断,运行env_qflog.bat配置环境参数(注意很重要)

7.3 运行下面命令，PUSH上传目标文件到设备

python QFLOG.py -p [COMPORT] PUSH -f [absolute bin path]   

其中 [COMPORT]为设备设备管理器中AT Port（千万别找错端口哈，注意此时USB连接的是BG96转接板）后，如"COM43"

[absolute bin path] 为下载的文件名,返回表示成功，如下图：

![下载成功](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/下载成功.png)

注意：若出现一直卡在第二行长时间未收到ACK，则需要用串口工具打开AT Port发送下面两行AT命令打开QFLOG允许，该步骤只需执行一次，后序更新固件则不需要再执行

AT+QCFGEXT="qflogport",1

AT+QCFGEXT="qflogen",1

同样将oem_app_path.ini下载到设备中(注意很重要，若固件名不做修改，该步骤也只需做一次即可)

![下载ini文件](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/下载ini文件.png)

7.4 下载后拔下USB口，插到扩展板usb口上就开始运行程序了，如下

![运行接USB](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/运行接USB.png)

### 8、查看日志调试代码

连接电脑，在设备管理器下看自己的端口号，打开串口工具，观察日志，注意波特率是115200，非十六进制显示

![观察日志](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/观察日志.png)

### 9、在个人账户下查看设备在线情况

![查看设备IMEI](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/查看设备IMEI.png)

### 10、APP绑定设备并实现控制

10.1 打开机智云串口调试助手，依次点击小工具->二维码生成->输入Product Key和IMEI->获取二维码

![生成二维码](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/生成二维码.png)

10.2 APP扫码绑定设备

打开IOEDemo，左上角扫码允许摄像头，扫码二维码后在设备列表中就会出现你的设备

![扫码绑定](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/扫码绑定.png)
