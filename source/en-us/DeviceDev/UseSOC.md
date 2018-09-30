title: Gizwits Cloud access for for ESP8266-SoC scheme
---

Attachment: LED lamp sample code for SoC rapid development 

# Overview

GizLamp is a simple and common smart product, whose hardware circuitry and the program are not complicated. We will use the GoKit3(S) development board and Gizwits Cloud to demonstrate how to upgrade a traditional light bulb into a low-cost smart light which supports remote control.

This document takes the GizLamp project as an example to demonstrate how to quickly connect the device to Gizwits Cloud to achieve hardware intelligence with a GoKit3 (S) development board based on the SoC solution on the ESP8266 module.

# Development process

## 1. Get ready

### Hardware

* 1*GoKit3（S）development board
* 5*DuPont lines
* 1*USB to serial converter, such as ft232, cp2102, ch340
* 1*Micro USB cable

### Software

* Oracle VM VirtualBox
* Espressif IDE for ESP8266

### Others

* A Gizwis developer account
* Source code of WeChat Pet House for GoKit3(S) ESP8266 V03000003 (available from Gizwits Download Center)
* The automatically generated SoC source code for GizLamp project (see the section below to generate it)

### Additional instructions

* If the GoKit3 is not available, you can refer to the GoKit3 schematic to set up your own hardware based on the ESP8266 module (the module's flash size must be 4MB. The recommended module is AiThinker esp-12f). The schematic link: http://club.gizwits.com/thread-2889-1-1.html
* GoKit3(S) purchase link: https://shop159680395.taobao.com/ (Gizwits official store)

## 2. Get started

### 2.1 Sign up for a developer account

The Gizwits developer account is used for device connection, device management, OTA service, MCU development and other functions.

Registration link: http://dev.gizwits.com/zh-cn/developer/

### 2.2 Create a product

After registration and logging into the Gizwits Developer Center, click the “Create New Product” button in the upper right corner of the Developer Center. Then type the new product name “GizLamp”, and select “Wi-Fi/Mobile” network access plan as shown below.

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/11.png)

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/12.png)
 
### 2.3 Create data points

The data point refers to the functionality abstraction of a device product, which describes the product's capabilities and its parameters. After data points are created, the data format of the device and the cloud communication can be determined, and the device and Gizwits Cloud can mutually recognize the data exchanged between the device and Gizwits Cloud.
For more details, click "Data point tutorial" in the upper right corner of Data Point page of Developer Center.

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/13.png)

Take the project "GizLamp" as an example to briefly describe the relationship between the cloud data points and the functions of the product. This project "GizLamp" needs to implement the function of turning on and off the lamp remotely, so you should create a "Boolean" data point in the cloud to complete this task, as shown below:

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/14.png)

After adding the data point, click “Apply” as the figure below.

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/15.png)

### 2.4 Gizwits Code Auto-generator

#### 2.4.1 Introduction

In order to lower the development barrier, shorten the development cycle, and reduce the development investment, Gizwits introduced the code auto-generator. Gizwits Cloud generates the device-side code for the corresponding product based on data points defined for the product. The automatically generated MCU code implements the packet encapsulation and parsing of the Gizwits communication protocol, the conversion logic of sensor data and communication data. All of these functions are integrated into a simple API set. When the device receives data from the cloud or the App, the program converts the data into corresponding events and notifies the application layer. You only needs to add the sensor control function to the corresponding event handler to complete the product development.

* For more information on Code Auto-generator, please click here.

Get the cloud automatically generated source code based on ESP8266 for GizLamp project:
After creating the product data point, click “MCU Development” on the left navigation pane and select “SoC Solution”. Currently the default “Hardware Platform” for the SoC solution is ESP8266. Scroll down to the bottom to click "Generate Code" and wait for about 30 seconds to generate the gizLamp code package based on ESP8266. Then download the package. So that the downloaded file name is too long and contains ProductKey of the product, rename the downloaded file name to "GizLamp" as shown below:
 
![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/16.png)

Note: Code Auto-generator for the SoC solution currently only supports ESP8266.

#### 2.4.2 Secondary development for the project source code

In the SoC source code generated automatically by Gizwits Cloud, you only need to care about the files under "GizLamp\app".

To add 8266 peripherals, 

* Add the .c file of the driver for the corresponding peripheral under the “GizLamp\app\driver” directory
* Add the .h file of the driver for the corresponding peripheral under the “GizLamp\app\include\driver” directory

To process control commands sent from App through the cloud,

* Handle control events to actuate device peripherals in the GizwitsEventProcess() function of gizwits_product.c in the “GizLamp\app\Gizwits” directory
To report device status,
* Implement data reporting in the userTimerFunc() function of user_main.c in the "GizLamp\app\user" directory.

In this SoC source code, you just focus on above points. The module communication and the underlying drivers do not need developers to process and modify.

#### 2.4.3 Go to Gizwits Download Center and get SoC source code of WeChat Pet House for GoKit3(S) ESP8266 V03000003 

"WeChat Pet House for GoKit3(S) ESP8266 V03000003" is a case implemented by Gizwits engineers using GoKit3(S) board based on the ESP8266 hardware platform. The source code of this case includes peripheral drivers for infrared sensor, temperature and humidity sensor, small motor, RGB light, key, etc., which can be directly used on any GoKit3(S) board, or can be ported to other ESP8266 boards for use. The source code is as follows:
 
![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/17.png)

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/18.png)
 
Note: For an in-depth understanding of the source code of WeChat Pet House case, you can refer to the following link:
Source code exploration of WeChat Pet House 

#### 2.4.4 Port .c and .h files of the LED driver to the "GizLamp" project from "WeChat Pet House for GoKit3(S) ESP8266 V03000003" project

* Copy hal_rgb_led.c in gokit3_SoC_ESP8266_03000003_2016120711\app\driver directory to gizlamp\app\driver
 
![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/19.png)

* Copy hal_rgb_led.h in gokit3_SoC_ESP8266_03000003_2016120711\app\include\driver directory to gizlamp\app\include\driver

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/20.png)
 
After completing the above preparation for the SoC code files, modify the corresponding c file below.

#### 2.4.5 Modify SoC code files for GizLamp

Use Sublime software to open the entire project, and modify two files as follows:

* The driver initialization of peripherals is done in user_init() function of user_main.c file in GizLamp\app\user directory.
* The data sent by the cloud is processed in gizwitsEventProcess() function of gizwits_product.c in GizLamp\app\Gizwits directory.

The following picture shows where to modify the code.
 
![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/21.png)

Other instructions for the automatically generated SoC source code

* The code for Key1 and Key2 is completed by Gizwits engineers based on GoKit3(S). If the hardware (not GoKit3) you set up by yourself is based on ESP8266, you need to modify the code for Key1 and Key2 to drive the GPIO port for your own keys. The code for keys is necessary because it is used to enable Wi-Fi to enter the corresponding configuration mode, and to push the SSID and password of the router to the Wi-Fi module through the App provided by Gizwits, so that the Wi-Fi module is connected to network.

The code snippets for Key1 and Key2.

1) Key1

Used to reset Wi-Fi module or drop it into production mode

* reset Wi-Fi -> Long press on Key1

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/22.png)

* Go into production testing mode -> Short press on Key1

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/23.png)
 
2) Key2

Used to trigger the module enter AirlLink or SoftAP configuration mode

* AirlLink configuration mode -> Long press on Key2

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/24.png)
 
* SoftAP configuration mode -> Short press on Key2
 
![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/25.png)

First add the following header file in user_main.c

```
#include "driver/hal_rgb_led.h"
```

Then add the following two function calls in the "//user init" section of user_init() function to initialize the RGB light on GoKit3. The definitions of these two functions can be found in hal_rgb_led.c

```
 //LED initialization function calls
 rgbGpioInit()
 rgbLedInit();
```

* Add the header file

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/26.png)
 
* Add the LED initialization function calls in user_init() function

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/27.png) 

Then add the following header file in gizwits_product.c

```
#include "driver/hal_rgb_led.h" 
```

Then add the following function calls in the "//user handle" section of gizwitsEventProcess() function to drive the RGB light on GoKit3 to turn it on and off. To control the RGB light color combination, you can also modify the parameters of the rgbControl() function, each of which is set to a integer in the range of “0~254”. The rgbControl function can be found in the “hal_rgb_led.c” file.

```
//LED control function calls
rgbControl(0,0,0);// turn off the light
rgbControl (254, 254, 254); // turn on the light
```

* Add the header file

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/28.png)
 
* Add the light switch event handling in gizwitsEventProcess() function

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/29.png) 

After completing the above actions, conduct the SoC code compiling environment setup as follows.

#### 2.4.6 Set up SoC code compiling environment

See Set up development environment
 
![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/30.png)

Note: It is recommended to use Virtualbox and Espressif official development environment for secondary development.

#### 2.4.7 SoC code compilation

See Code compilation

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/31.png)
 
#### 2.4.8 Download firmware

See Download firmware

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/32.png)
 
## 3. Debug and release

For product debug, see here.

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/33.png)

For product release, see here. 

![Gizwits Cloud access for for ESP8266-SoC scheme](../../../assets/en-us/deviceDev/UseSoc/34.png)

## 4. Project completion

After the above steps finished, the entire project development is complete. If you need more open source projects and want to discuss with other developers, you can visit Gizwits Developer Community: http://club.gizwits.com/forum.php

# Appendix: UART0 tutorial for ESP8266-SoC schema

Click here to download UART0 tutorial for ESP8266-SoC schema.

