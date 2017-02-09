title: ArduinoUnoWiFi SDK之API介绍
----


# 1 文件介绍

![Alt text](/assets/zh-cn/deviceDev/ArduinoUNO/SDK/1486537812364.png)

## 重要文件解读：
## 1.gizwits_product.cpp
该文件为产品相关处理函数，如gizwitsEventProcess()。

## 2.gizwits_product.h
该文件为gizwits_product.c的头文件，如HARDWARE_VERSION、SOFTWARE_VERSION。

## 3.gizwits_protocol.cpp
该文件为SDK API接口函数定义文件。

## 4.gizwits_protocol.h
该文件为gizwits_protocol.c对应头文件,相关API的接口声明均在此文件中。

## 5.工程文件
networkConfig.ino
按键配置入网示例，实现了两个按键驱动，key1短按通知模组进入产测模式，key1长按复位模组，key2短按模组进入softAP模式，key2长按模组进入Airlink模式。
simpleTry.ino
数据点示例，主要处理数据的下发和上报。

# 2 Gizwits类方法介绍
`void begin(void)`
gizwits协议初始化接口。
用户调用该接口可以完成Gizwits协议相关初始化（包括协议串口的初始化、串口接收数据缓冲区初始化）。

`void process(void)`
该函数中完成了相应协议数据的处理及数据上报的等相关操作，需要在loop中调用。

`void setBindMode(uint8_t mode)`
模组配置网络接口，参数mode[in]：WIFI_MODE_TYPE_T枚举值
参数为WIFI_RESET_MODE，恢复模组出厂配置接口，调用会清空所有配置参数，恢复到出厂默认配置。
参数为WIFI_SOFTAP_MODE或WIFI_AIRLINK_MODE，配置模式切换接口，支持SoftAP和AirLink模式。参数为WIFI_SOFTAP_MODE时配置模组进入SoftAp模式，参数为WIFI_AIRLINK_MODE配置模组进入AirLink模式。
参数为WIFI_PRODUCTION_TEST，模组进入产测模式。
参数为WIFI_NINABLE_MODE，模组进入可绑定模式，可绑定时间为NINABLETIME(gizwits_protocol.h中声明)，默认为0，表示模组永久可绑定。
bool wifiHasBeenSet(EVENT_TYPE_T eventType)
查询模组状态接口，参数eventType[in]：EVENT_TYPE_T枚举值
参数为WIFI_SOFTAP，函数返回为true则表示模组状态为SOFTAP模式
参数为WIFI_AIRLINK，函数返回为true则表示模组状态为AIRLINK模式
参数为WIFI_STATION，函数返回为true则表示模组状态为STATION模式
参数为WIFI_CON_ROUTER，函数返回为true则表示模组状态为已连接到路由器
参数为WIFI_DISCON_ROUTER，函数返回为true则表示模组状态为断开路由器
参数为WIFI_CON_M2M，函数返回为true则表示模组状态为连接到M2M状态
参数为WIFI_DISCON_M2M，函数返回为true则表示模组状态为断开M2M状态

`void read(EVENT_TYPE_T eventType, bool* value)`
参数eventType[in]:数据点事件宏
参数value[out]:返回的数据
bool型数据点下发数值获取接口。用户获取到下发的数值，做相应处理。


`void read(EVENT_TYPE_T eventType, uint32_t* value)`
参数eventType[in]:数据点事件宏
参数value[out]:返回的数据
无符号整型数值类数据点和枚举型数据点下发数值获取接口。用户获取到下发的数值，做相应处理。

`void read(EVENT_TYPE_T eventType, int32_t* value)`
参数eventType[in]:数据点事件宏
参数value[out]:返回的数据
有符号整型数值类数据点下发数值获取接口。用户获取到下发的数值，做相应处理。

`void read(EVENT_TYPE_T eventType, float* value)`
参数eventType[in]:数据点事件宏
参数value[out]:返回的数据
浮点型数值类数据点下发数值获取接口。用户获取到下发的数值，做相应处理。

`void readBinary(EVENT_TYPE_T eventType, uint8_t* data)`
参数eventType[out]:数据点事件宏
参数data[out]:返回的数据
扩展型数据点下发数值获取接口。用户获取到下发的数值，做相应处理。注意，使用云端自动生成的代码，扩展型数据点使用数组存储并且长度已经定义完毕，用户不需要传参，也不许任意改动该长度定义。

`void write(VALUE_TYPE_T valueType, bool value)`
参数valueType[in]:可写数据点事件宏
参数value[in]:待上报数据
bool型数据点数据上报接口。用户通过传感器或者其他获取到数据，通过该接口上报到云端和APP。

`void write(VALUE_TYPE_T valueType, uint32_t value)`
参数valueType[in]:可写数据点事件宏
参数value[in]:待上报数据
无符号整型数值类和枚举类数据点数据上报接口。用户通过传感器或者其他获取到数据，通过该接口上报到云端和APP。

`void write(VALUE_TYPE_T valueType, int32_t value)`
参数valueType[in]:可写数据点事件宏
参数value[in]:待上报数据
有符号整型数值类数据点数据上报接口。用户通过传感器或者其他获取到数据，通过该接口上报到云端和APP。

`void write(VALUE_TYPE_T valueType, float value)`
参数valueType[in]:可写数据点事件宏
参数value[in]:待上报数据
浮点型数值类数据点数据上报接口。用户通过传感器或者其他获取到数据，通过该接口上报到云端和APP。

`void writeBinary(VALUE_TYPE_T valueType, uint8_t* data,uint32_t dataLen)`
参数eventType[in]:数据点事件宏
参数data[in]:待上报的数据
参数dataLen[in]:待上报的数据长度
扩展型数据点上报接口。注意，使用云端自动生成的代码，扩展型数据点使用数组存储并且长度已经定义完毕，也不许改动该长度定义。

`bool hasBeenSet(EVENT_TYPE_T eventType)`
参数eventType[in]:可写数据点事件宏
返回true表示已产生该数据点事件，如APP控制某数据点动作。用户首先判断该数据点事件是否发生，再去做相应处理。


# 3 二次开发
## 配置入网
支持SoftAp和AirLink两种方式配置入网，相应接口为setBindMode()。networkConfig工程提供给了按键配置入网的示例。
举例：KEY2长按3s触发AirLink配置模式
case KEY2_LONG_PRESS:
myGizwits.setBindMode(WIFI_AIRLINK_MODE);
Break;

## 数据采集
simpleTry示例已经自动生成了关于开发者定义的需要上报的所有数据点信息。bool型数据点使用bool型变量，无符号整型数值类或者枚举型数据点使用unsigned long型变量，有符号整型数值类数据点使用long型变量，浮点型数据点使用float型变量，扩展型数据点使用数组存储，长度信息已经生成，开发者只需要实现数据采集即可。特别提醒，如果开发者自行定义变量，变量类型定义一定要遵从上述规则，数值型变量的赋值一定不要越界（超过在云端定义的数据大小范围）。

## 举例：温度采集
long varW_Temperature = 0;//采集函数返回温度数值
myGizwits.write(VALUE_TEMPERATURE, varW_Temperature);//Add Sensor Data Collection
事件处理
simpleTry示例已经自动生成了关于开发者定义的需要处理的所有数据点信息的基础框架。bool型数据点使用bool型变量，无符号整型数值类或者枚举型数据点使用unsigned long型变量，有符号整型数值类数据点使用long型变量，浮点型数据点使用float型变量，扩展型数据点使用数组存储，长度信息已经生成，开发者只需要实现相应处理即可。特别提醒，如果开发者自行定义变量，变量类型定义一定要遵从上述规则。

## 举例：控制LED开关(bool型)
bool varR_LED_OnOff = 0;
if(myGizwits.hasBeenSet(EVENT_LED_ONOFF))
{
    myGizwits.read(EVENT_LED_ONOFF,&varR_LED_OnOff);//Address for storing data 
//判断动作是开/关，做灯相应处理
}
