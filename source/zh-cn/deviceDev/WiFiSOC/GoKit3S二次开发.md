title: GoKit3(S) 二次开发--开发环境搭
---
#GoKit3(S)开发环境准备

##1.开发环境搭建方式
GoKit3(S)有两种开发环境的搭建方式：

1) 使用乐鑫官方的ESP8266开发环境 **(推荐方式)**

2) 使用自定义开发环境：虚拟机VMware(12.0版) + Ubuntu系统(14.04 <64位版>)，然后在Ubuntu下配置交叉编译工具编译源码。

###1.1.使用乐鑫官方开发环境(推荐方式)

1) 下载官方编译环境安装包：

链接: http://pan.baidu.com/s/1eSbSsQQ 密码: 46vf

安装包说明：
![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image3.png)

注：
开发者需先安装虚拟机VirtualBox (及运行VirtualBox-4.3.12-93733-Win.exe)，然后用VirtualBox 加载编译环境的虚拟镜像（ESP8266_lubuntu_20141021.ova）。

xtensa-lx106-elf.tar.bz2 是交叉编译工具，在“自定义开发环境”时使用。

2) 配置VirtualBox

安装VirtualBox 4.3.12 后打开，按如下步骤进行操作：

Step 1: 选择 "Preferences" 选项

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image4.png)


Step 2: 选择 "General" 创建VM默认虚拟机路径，例如： D:\vm 

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image5.png)


Step 3: 选择 "Import Appliance " 选项

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image6.png)


Step 4: 选择要加载的虚拟镜像，例如: D:\vm\ ESP8266_lubuntu_20141021.ova

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image7.png)


Step 5: 导入虚拟镜像

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image8.png)


导入后，可以发现相应文件 D:\vm\ ESP8266_lubuntu_1:

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image9.png)


Step 5: 创建共享文件夹

在windows下创建名叫 "share"的共享文件，使VirtualBox与windows之间方便的进行文件传输，操作步骤如下：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image10.png)

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image11.png)


Step 6: 验证编译环境

运行链接脚本： “./mount.sh”

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image12.png)


输入用户密码： **“espressif”**，回车确认。

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image13.png)


进入Gokit3(S)文件目录（可查看**“GoKit3(S)源码编译”**一节）

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image14.png)


运行编译脚本：./gen_misc.sh

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image15.png)


显示如下说明编译环境搭建成功。

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image16.png)


如有问题请查看乐鑫官方说明：

https://github.com/esp8266/esp8266-wiki/wiki/Toolchain


###1.2 使用自定义开发环境
1)安装VMware(12.0版) + Ubuntu系统，并创建共享目录”D:\share”（方法自行百度）。

2)配置开发环境

Step 1: 将 **xtensa-lx106-elf.tar.bz2**  复制到 D:\share 中。（之前创建的共享文件夹）完成后如下：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image17.png)


Step 2: 进入Ubuntu运行Terminal，如下图顺序打开Terminal

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image18.png)


首先进入root权限，命令行中输入：sudo su ，输密码后回车。

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image19.png)


更新源：

apt-get update

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image20.png)


安装相关软件库：

32位虚拟机执行：apt-get install vim git						//一路回车确认

64位虚拟机执行：apt-get install vim git libc6-dev-amd64			//一路回车确认

进入共享文件夹：

cd /mnt/hgfs/share

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image21.png)


命令行顺序执行：

cp xtensa-lx106-elf.tar.bz2 /opt/

cd /opt/

tar -jxvf xtensa-lx106-elf.tar.bz2					//解压后显示如下

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image22.png)


cd /home/$ username	                    //$username为登录用户名

vim .profile

export PATH="/opt/xtensa-lx106-elf/bin:$PATH"		//添加到最后一行 保存退出

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image23.png)


exit											//注意在要退出超级用户权限

source .profile 								//在用户名权限下执行此脚本

echo $PATH									//显示红框所示表示配置正确		


![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image24.png)

如有问题请查看**乐鑫官方**说明：

https://github.com/esp8266/esp8266-wiki/wiki/Toolchain

##2.GoKit3(S)源代码
GoKit3(S)源码下载地址：

http://site.gizwits.com/zh-cn/developer/resource/hardware?type=GoKit

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image25.png)


#GoKit3(S)源码编译

1) 将GoKit3(S)源码解压后放入share共享目录下：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image26.png)


2) 进入编译目录：

cd /mnt/hgfs/share/gokit-soc-esp8266/app/

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image27.png)


3) 设置编译脚本为Unix格式，防止Win系统下对编译脚本产生影响：

vim gen_misc.sh

:set ff=unix			//这是vim命令，非添加的内容

:wq!					//这是vim命令，非添加的内容

4) 运行编译脚本：
./gen_misc.sh 

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image28.png)


注：如图所示表明编译成功

5) 生成的固件位置:
share/gokit3_SoC_ESP8266_xxx/bin/upgrade

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image29.png)


Windows中显示如下


![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image30.png)


#GoKit3(S)固件下载
##1.打开烧写软件

下载程序烧录工具“FLASH_DOWNLOAD_TOOLS_v2.4” ，下载地址：

http://bbs.espressif.com/viewtopic.php?f=57&t=433

下载完毕解压后点击运行**“ESP_DOWNLOAD_TOOL_V2.4.exe”**

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image31.png)


##2.设置烧写选项
GoKit3(S) 烧写固件分为SOC版和MCU版，开发者应根据GoKit3(S) 的模式烧写对应版本的固件，详细介绍请查看**《GoKit3(S) 开发套件介绍》**中的“2. 了解SOC版与MCU版的区别”一节。

###2.1.GoKit3(S) SOC版

SOC版的程序固件名称为：

**user1.4096.new.6.bin**

编译后固件默认保存位置： 	

**share/gokit3_SoC_ESP8266_xxx/bin/upgrade**

##2.2.GoKit3(S) MCU版

MCU版的程序固件名称为：

**GAgent_00ESP826_04020011_16041419.bin**

下载地址：

http://site.gizwits.com/zh-cn/developer/resource/hardware?type=GAgent 

详细介绍请查看**《GoKit3(S) 开发套件介绍》**中“5. 使用Gokit的MCU模式”一节。

###2.3.确认烧写选项

烧写选项按如下图所示选择、填写：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image32.png)


注：
1.前三个 ‘.bin’ 文件都在**D:\share\gokit-soc-esp8266\bin** 目录下，选择对应的名称的 ‘.bin’文件即可。

最后一个.bin 文件默认为SOC版固件：**user1.4096.new.6.bin**

位置：**D:\share\gokit-soc-esp8266\bin\upgrade\user1.4096.new.6.bin**

若烧写MCU版固件请选择 **GAgent_00ESP826_04020011_16041419.bin**

2.COM PORT 为TTL转串口的COM号（下边会说明）

3.BAUDRATE建议为：115200（烧写速度慢但成功率高）


##3.连接TTL转USB接口

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image33.png)


将TTL转USB与电脑连接：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image34.png)


设备管理器中找到对应的串口号：（此处为COM4）

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image35.png)


##4.给Gokit供电

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image36.png)


注：
这里USB可连直接接电源，若想查看日志可接电脑（需区别COM号）。


##5.烧写程序

首先，将拨码开关设为程序烧录模式（下拨位置）

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image37.png)


相继按下烧录工具的“START”键与WiFi模组的“Reset”键，开始烧录程序：

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image38.png)


![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image39.png)


若显示“完成”及烧录成功

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image40.png)


注：若不成功，先查看COM是否正确，并调低BAUDRATE多试几次。

接下来，将拨码开关设为正常使用模式**（上拨位置）**

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image41.png)


按下 **Reset键重启模组**，程序开始工作

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image42.png)


##6 查看LOG日志

将USB口（及供电接口）连接计算机便可通过串口（注意**选择对应COM口号**）打印工具查看LOG信息（波特率：115200）

![Alt text](/assets/zh-cn/deviceDev/WiFiSOC/dev/image43.png)


注：若LOG信息出现乱码，可重启串口打印软件，即可恢复正常。

#FAQ&总结

##1.FAQ

**问：自定义开发环境共享文件夹不成功怎么办？**

答：使用如下命令重新安装VMware Tools

sudo apt-get autoremove open-vm-dkms open-vm-tools --purge 

点击“虚拟机”—— 重新安装VMware Tools ——在终端中进入相应目录

tar -zxvf VMwareTools-10.0.0-2977863.tar.gz

sudo ./vmware-install.pl

之后一路回车键确认直到安装完成即可

##2.总结
至此，Gokit3的开发环境搭建、源码编译及固件下载已介绍完毕。

若想深入了解Gokit3的硬件电路说明请查看：

**《GoKit3硬件手册》**

若想在Gokit3所给出的“微信宠物屋”代码示例的基础上开发自己的程序请查看：

**《GoKit3(S)程序开发手册》**
