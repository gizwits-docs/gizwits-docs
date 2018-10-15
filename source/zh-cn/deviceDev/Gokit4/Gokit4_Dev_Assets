# 			机智云GoKit4（G） SoC环境搭建教程

## 开发工具包

网盘下载开发环境所需安装包：

链接：https://pan.baidu.com/s/1cq2zFFxRDo5Do0HoXS-WCQ

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

![设备管理器查看串口]/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/设备管理器查看串口.png)

### 4、编译

双击源码根目录中的llvm_build.bat批处理文件，喝水等会，如果出现红色Error那就恭喜你成功编写了BUG。一切顺利的话，在源码目录target下生成三个文件表示成功，如下图

![目标文件输出](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/目标文件输出.png)

### 5、固件下载

6.1  将上一步编译后生成的目标文件gagent_app.bin和oem_app_path.ini文件拷贝到D:\QFLOG\src\QFLOGPackage\目录下

6.2 打开命令行中断,运行env_qflog.bat配置环境参数(注意很重要)

6.3 运行下面命令，PUSH上传目标文件到设备

python QFLOG.py -p <COMPORT> PUSH -f <absolute bin path>   

其中 <COMPORT>为设备设备管理器中AT Port（千万别找错端口哈，注意此时USB连接的是BG96转接板）后，如"COM43" 

<absolute bin path> 为下载的文件名,返回表示成功，如下图：

![下载成功](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/下载成功.png)

同样将oem_app_path.ini下载到设备中(注意很重要)

![下载ini文件](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/下载ini文件.png)

6. 4 下载后拔下USB口，插到扩展板usb口上就开始运行程序了，如下

![运行接USB](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/运行接USB.png)

### 6、查看日志调试代码 

连接电脑，在设备管理器下看自己的端口号，打开串口工具，观察日志，注意波特率是115200，非十六进制显示

![观察日志](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/观察日志.png)

### 7、在个人账户下查看设备在线情况

![查看设备IMEI](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/查看设备IMEI.png)

### 8、APP绑定设备并实现控制

9.1 打开机智云串口调试助手，依次点击小工具->二维码生成->输入Product Key和IMEI->获取二维码

![生成二维码](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/生成二维码.png)

9.2 APP扫码绑定设备

打开IOEDemo，左上角扫码允许摄像头，扫码二维码后在设备列表中就会出现你的设备

![扫码绑定](/assets/zh-cn/deviceDev/Gokit4/Gokit4_Dev_Assets/扫码绑定.png)
