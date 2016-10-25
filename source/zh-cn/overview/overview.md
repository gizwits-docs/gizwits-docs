
title:  机智云平台概述
---

# 机智云平台概述

![Alt text](/assets/index.png)

机智云平台是致力于物联网、智能硬件云服务的开放平台。平台提供了从定义产品、设备端开发调试、应用开发、产测、运营管理等覆盖智能硬件接入到运营管理全生命周期服务的能力。

机智云平台为开发者提供了自助式智能硬件开发工具与开放的云端服务。通过傻瓜化的工具、不断增强的SDK与API服务能力最大限度降低了物联网硬件开发的技术门槛，降低研发成本，提升开发者的产品投产速度，帮助开发者进行硬件智能化升级，更好的连接、服务最终消费者。

## 机智云

机智云云端提供了产品的定义、产品数据点定义、虚拟设备调试、M2M服务、API服务等功能。为设备、应用接入提供云服务

## GAgent

设备端的模组系统GAgent，通过使用GAgent，开发者可根据机智云提供的协议与GAgent对接，使设备可快速接入。目前已兼容国内主流的Wi-Fi模块、移动网络模块

## IOT SDK

机智云提供了基于IOS，Android系统的IOT SDK，开发者通过SDK，可快速实现APP开发，无缝接入机智云，并根据SDK获取机智云平台逐步推出的新服务

## MCU

开发者遵循机智云自动生成的模组与MCU通讯协议进行MCU的开发

## 机智云平台的作用

* 对于希望将硬件产品接入互联网的企业与开发者,使用机智云将会带来以下帮助：
* 稳定的、兼容多模组厂商并提供二次开发的GAgent
* 高可用的、不断增强的云端服务平台
* 稳定的、丰富的SDK应用开发包
* 提供免费开源的APP参考
* 无需维护IaaS平台
* 专业的嵌入式、云端接入技术支持
* 24*7的系统维护  

## 代码示例

```Javascript

  //设置协议引用
  @interface Class1 () <XPGWifiSDKDelegate>
  @end
    
  //调用获取手机短信验证码方法
  [XPGWifiSDK sharedInstance].delegate = self;
  [[XPGWifiSDK sharedInstance] requestSendPhoneSMSCode:token captchaId:captchaId captchaCode:"WXAN" phone:@"13012345678"];
    
  //使用获取手机短信验证码事件
  - (void)wifiSDK:(XPGWifiSDK *)wifiSDK didRequestSendPhoneSMSCode:(NSError *)result
  {
      if(result.code == XPGWifiError_NONE) {
          //获取手机验证码成功
      }
      else
      {
          //获取手机验证码失败
      }
  }
```

