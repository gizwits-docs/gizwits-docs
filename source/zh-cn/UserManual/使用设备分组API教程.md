title: 设备分组API使用教程
---
# 概述
设备分组接口可以对多个设备进行分组，只要往分组里面发送指令，做到同时控制一个分组下的多个设备。

要使用该设备分组接口，必须创建分组。创建分组以后根据MAC地址绑定设备，再根据设备日志MAC地址对应的did将设备加进一个分组里面，再往分组里面发送指令，设备收到指令并作出反应，就完成了设备分组。

使用例子，如：一个公司有多个部门，每个部门有多盏智能灯。每天早上一个部门来人了，就可以只打开该部门的智能灯。每天晚上一个部门的人都走光了，就可以只关闭该部门的智能灯。

# 设备分组API使用流程
Open API的设备分组接口，就是对多个设备分组并进行控制。当开发者/企业客户设置好openAPI设备分组接口后，就可以调用该接口把多个设备加入到分组，做到分组控制多个设备。

#### 1.打开机智云官网文档中心->云API->OPEN API指南，下拉点击调试接口

![调试接口1](/assets/zh-cn/UserManual/Dev_GroupAPI/1.png)

![调试接口2](/assets/zh-cn/UserManual/Dev_GroupAPI/2.png)

#### 2.点击设备分组->创建分组

![创建分组](/assets/zh-cn/UserManual/Dev_GroupAPI/3.png)

#### 3.点击创建分组->感叹号，填写App ID和token，这两个参数可以参考文档《利用openapi（postman）控制虚拟设备》中“2.3新建应用配置”和“3. Postman安装和导入”，参考文档链接http://docs.gizwits.com/zh-cn/UserManual/UseOpenAPI.html

![填写App ID和token 1](/assets/zh-cn/UserManual/Dev_GroupAPI/4.png)

![填写App ID和token 2](/assets/zh-cn/UserManual/Dev_GroupAPI/5.png)

#### 4.填写App ID和token之后，填写body

![填写body1](/assets/zh-cn/UserManual/Dev_GroupAPI/6.png)

![填写body2](/assets/zh-cn/UserManual/Dev_GroupAPI/7.png)

#### 5.得到分组id后，我们可以查看一下组里面有没有设备

![查看分组设备1](/assets/zh-cn/UserManual/Dev_GroupAPI/8.png)

![查看分组设备2](/assets/zh-cn/UserManual/Dev_GroupAPI/9.png)

#### 6.根据MAC绑定设备

![根据MAC绑定设备1](/assets/zh-cn/UserManual/Dev_GroupAPI/10.png)

![根据MAC绑定设备2](/assets/zh-cn/UserManual/Dev_GroupAPI/11.png)

#### [Timestamp获取链接](http://tool.chinaz.com/Tools/unixtime.aspx)

![Timestamp获取](/assets/zh-cn/UserManual/Dev_GroupAPI/12.png)

#### Signature获取链接http://tool.chinaz.com/Tools/md5.aspx

![Signature获取](/assets/zh-cn/UserManual/Dev_GroupAPI/13.png)

#### 绑定设备成功以后会返回一个如下的响应体

![绑定设备成功](/assets/zh-cn/UserManual/Dev_GroupAPI/14.png)

#### 7.绑定设备以后，我们回到设备分组，将设备添加到分组

![设备添加到分组1](/assets/zh-cn/UserManual/Dev_GroupAPI/15.png)

![设备添加到分组2](/assets/zh-cn/UserManual/Dev_GroupAPI/16.png)

#### 8.查看设备日志

![查看设备日志](/assets/zh-cn/UserManual/Dev_GroupAPI/17.png)

#### 9.成功添加设备到分组以后会返回如下响应体

![添加设备到分组成功](/assets/zh-cn/UserManual/Dev_GroupAPI/18.png)

#### 10.然后我们就可以针对设备分组发送指令远程控制设备

![分组发送指令](/assets/zh-cn/UserManual/Dev_GroupAPI/19.png)

#### 11.这样我们就可以控制一个分组中的一个设备（RGB灯亮灭），按照同种方法添加多个设备到一个分组中，我们就可以同时控制一个分组中的多个设备。

![分组发送指令成功](/assets/zh-cn/UserManual/Dev_GroupAPI/20.png)
