title:  快速集成消息推送
---

# 1.	概述

机智云APP开源框架集成了百度推送与极光推送功能，只需修改部分代码即可快速使用。本文档就如何基于机智云APP开源框架快速集成消息推送功能，如需了解开源框架，请参考快速入门的文档。

# 2.	快速集成极光推送

## 2.1.申请极光AppKey与Master Secret

开发者需要根据框架包名在极光官网上创建应用并填写相应信息，如下所示：

查看框架包名

![name](\assets\zh-cn\app\openSoure\push\image001.png)

在极光平台创建应用

![name](\assets\zh-cn\app\openSoure\push\image002.png)


查看对应的AppKey和Master Secret

![name](\assets\zh-cn\app\openSoure\push\image003.png)


## 2.2.	在云端绑定第三方推送

### 2.2.1.	申请开通D3 Engine

查看D3 Engine

![name](\assets\zh-cn\app\openSoure\push\image004.png)


开通审核

![name](\assets\zh-cn\app\openSoure\push\image005.png)

开通D3 Engine需要机智云审核通过，点击开通服务后需要联系机智云FAE协助审核开通。