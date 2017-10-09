title: Instructions for Serial Port Programming (ESP8266)
---

# 1.Introduction

Take module ESP8266 of Espressif as example.We provide instructions for serial port programming with the Flash Tools offered by Gizwits IoT.Follow these step-by-step instructions to operate with the Flash Tools provided.Otherwise,there would be uncontrollable errors.

# 2.Instructions

## 2.1.Download the firmware related to ESP8266 from Resources in Gizwits IoT.

![](/assets/en-us/QuickStart/debug/pic_001.jpg)

![](/assets/en-us/QuickStart/debug/pic_002.jpg)

![](/assets/en-us/QuickStart/debug/pic_003.jpg)


## 2.2 Unzip the firmware package which is downloaded from Resources.

The bin document is the exact firmware we need in Fig.

## 2.3Hardware Connecting

Two solutions are provided here to illustrate how to connect hardware.

### 2.3.1. Connect Module ESP8266 without pinboard

Connect Module ESP8266 with Dupont lines according to the figure below.Pay attention to input Vil to GPIO0 and GPIO15 under the programming mode.

![](/assets/en-us/QuickStart/debug/pic_004.jpg)

### 2.3.2. Connect Module ESP8266 with pinboard

![](/assets/en-us/QuickStart/debug/pic_005.jpg)

Connect the pins of Espressif module with Dupont lines according to the figure below.Pay attention to input Vil to GPIO0.KEY1 is the external resetting button.

![](/assets/en-us/QuickStart/debug/pic_006.jpg)

## 2.4Serial Port Setting

### 2.4.1. Confirm Parameters of Serial Port

Connect the demoboard with computer and find the added COM Port from My Computer ->administration ->Device manager ->Port(COM and LPT)

![](/assets/en-us/QuickStart/debug/pic_007.jpg)

### 2.4.2. Download Flash Tools

Download Link：http://pan.baidu.com/s/1mhMGSeG

Get the documents below from uncompressed document

![](/assets/en-us/QuickStart/debug/pic_008.jpg)

Double click the flash_download_tools_v1.2_150512.exe file to run the Flash Tools after unzip the document above.

![](/assets/en-us/QuickStart/debug/pic_009.jpg)

Please fill in the blanks according to the instructions below.

![](/assets/en-us/QuickStart/debug/pic_010.jpg)

## 2.5Programming with Flash Tools

Step 1:Click the START button when the serial port succeeds to connect.

![](/assets/en-us/QuickStart/debug/pic_011.jpg)


And then will show up the figure below.

![](/assets/en-us/QuickStart/debug/pic_012.jpg)
![](/assets/en-us/QuickStart/debug/pic_013.jpg)

waiting to synchronize with power up

Step 2: Power up Module ESP8266 again or press the KYE1 in Fig2.3.2 and the information below will indicate that the module is being programmed by the Flash Tool.

![](/assets/en-us/QuickStart/debug/pic_014.jpg)

Step 3:Wait for a short time and your programming finishes when appears “FINISH”.

![](/assets/en-us/QuickStart/debug/pic_015.jpg)
