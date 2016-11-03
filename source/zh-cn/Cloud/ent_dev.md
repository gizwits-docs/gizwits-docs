
title: 企业应用开发
---

# 概述

 企业应用开发是指企业将设备、APP等客户端接入机智云后，企业构建云端业务管理系统以实现自己的管理需要。通常企业需要通过机智云平台获取接入设备的数据，然后再通过企业API去控制设备，并根据需求选择企业API提供的各种数据服务。


![@企业应用开发示意图](/assets/zh-cn/cloud/ent_dev.jpg)

## 消息代理
消息代理服务简称Noti服务，该服务可以实时将企业设备数据推送到企业应用系统，企业应用系统基于设备数据实现业务需求。如上图所示，企业应用不同于设备与手机应用端的接入，企业应用系统相对独立，有自己的业务功能，只是企业的设备接入了机智云PaaS平台，而企业应用的业务要求必须要将设备数据实时传输到企业应用系统。上图中的消息代理


## 企业API
企业API是从接入机智云平台的企业的运营管理的需求出发，为企业应用系统提供REST API接口服务。为企业提供企业视角全局的设备管理、数据分析等功能，让企业更关注业务管理系统本身，减少不必要的开发成本与时间。

企业API基于企业接入到机智云平台所产生的数据，为企业提供了通用的数据计算能力，如设备数据点聚合查询、设备历史数据查询、设备位置服务、设备激活、活跃数据等。企业API的定位是减少企业业务管理系统的开发成本，让企业更关注自己的核心业务


# 案例介绍
## 充电桩SaaS平台
 充电桩SaaS平台是充电桩运营商为电动车主提供了寻找电桩、预约、充电、支付等功能，运营商通过运营管理平台对充电桩、故障、订单、计费规则、订单管理、结算等管理功能。充电桩运营商通过充电桩SaaS平台可以完整闭环的管理日常业务，大大提高运营效率。
 
 充电桩设备接入了机智云，充电桩SaaS平台需要实时获得充电桩的数据，根据这些数据才能计算充电费用，是否有故障等。这些设备数据正是由机智云PaaS平台负责采集，并通过消息代理服务实时推给充电桩SaaS平台。
 
 充电桩SaaS平台还可以通过企业API开放的接口进行统计分析，如设备的位置服务查询，设备通信数据查询，充电桩故障数查询等功能

## 分时租赁平台



# 开发流程
## 如何接入消息代理

### 1、提出申请
消息代理服务通常是向企业开发者开放，如果企业需要实时获取接入到机智云PaaS平台的数据进行二次开发，则向机智云提出申请
### 2、理解协议
具体协议请点击 [消息代理接口协议](./noti1.0.html)
### 3、获取参数
登录开发者中心，获取Eid，设置ip白名单
登陆开发者中心，选择“企业信息”，如下图

![@企业API开通申请](/assets/zh-cn/cloud/ent_info01.png)

选择左侧有权限可管理的组织，然后点击“API配置”，即可获取Eid,Esecret，也可以在此设置IP白名单
![@企业API开通申请](/assets/zh-cn/cloud/ent_info02.png)
### 4、调试Demo代码
该Demo代码已实现了接口协议，只需修改eid,esecret即可实时获取设备数据。Demo代码请点击 [Demo code](https://github.com/gizwits/noti-java-demo/tree/master)
public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
        
        String enterpriseId = "8fb23e6dbf06438b8200cf4588e45b5f";
        String enterpriseSecret = "c7c9e01549004b96a8612a0e7c71a9d6";
        new GizwitsNoti(enterpriseId, enterpriseSecret, 
                        new CallBack() {
                            public void call(JSONObject msg)    
                            {
                                System.out.println( msg.toString() );
                            }
                        }).connect();
    }



### 5、按需实现
企业根据Demo Code，实现接收到设备数据后的业务逻辑。如：
1. 可将接受到收据实时Publish到企业应用的队列中，尤其是实时性较强的业务
2. 可直接写入数据库；

## 使用企业API
### 1、申请企业API服务
企业开发者登陆开发者中心，选择添加服务，如下图
![@企业API申请](/assets/zh-cn/cloud/add_ent_api.png)

点击上图红色框中的企业API，进入下一步

![@企业API开通申请](/assets/zh-cn/cloud/add_ent_api02.png)

### 2、获取参数
登陆开发者中心，选择“企业信息”，如下图

![@企业API开通申请](/assets/zh-cn/cloud/ent_info01.png)

选择左侧有权限可管理的组织，然后点击“API配置”，即可获取Eid,Esecret，也可以在此设置IP白名单
![@企业API开通申请](/assets/zh-cn/cloud/ent_info02.png)

### 3、理解协议
了解 [企业API](./enterprise_api.html)
