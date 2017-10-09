title: Instructions for Serial Port Programming (Gizwits GAgent for MXCHIP 3162)
---

# 1.Introduction

Take Module MXCHIP 3162 of MXCHIP as example.We provide the instructions for flashing serial port with the Flash Tools offered by Gizwits IoT.Follow these step-by-step instructions to operate with the Flash Tools provided.Otherwise,there would be uncontrollable errors.

# 2.Instructions


## 2.1.Download the firmware related to MXCHIP from Resources in Gizwits IoT.

![](/assets/en-us/QuickStart/debug/pic_MX001.jpg)

![](/assets/en-us/QuickStart/debug/pic_MX002.jpg)

![](/assets/en-us/QuickStart/debug/pic_MX003.jpg)


## 2.2.Unzip the firmware package which is downloaded from Resources.

![](/assets/en-us/QuickStart/debug/pic_MX004.jpg)

The bin document is the exact firmware we need in Fig.

## 2.3Hardware Connecting

Use pinboard to connect module MXCHIP with demoboard.We use EMB-380-S2 demoboard here in Fig.Developers can use other demoboards based on the actual situation.

![](/assets/en-us/QuickStart/debug/pic_MX005.jpg)

Connect Module MXCHIP with Dupont lines according to the figure below and pay attention to input Vil to PB1 pin.This experiment requires earth grounding.

KEY1 is the external resetting button.

![](/assets/en-us/QuickStart/debug/pic_MX006.jpg)


## 2.4Serial Port Setting

### 2.4.1.Confirm Parameters of Serial Port

Connect the demoboard with computer and find the added COM Port from My Computer ->administration ->Device manager ->Port(COM and LPT)

![](/assets/en-us/QuickStart/debug/pic_MX007.jpg)

### 2.4.2.Download SecureCRT (the serial port tool)

Download link：http://pan.baidu.com/s/1dECLxYD

Open SecureCRT and a dialog box will pop up after clicking Quick Connect button.

![](/assets/en-us/QuickStart/debug/pic_MX008.jpg)

![](/assets/en-us/QuickStart/debug/pic_MX009.jpg)

Choose the corresponding items according to the figure above and click the Connect button.

## 2.5.Operation of programming

### 2.5.1.Programming Pattern

Step 1:Reset (pressing KEY1 in Fig 2.3 and then releasing)module of MXCHIP when succeed to connect serial port.The information will show up in SecureCRT workshop to indicate that the module is on programming pattern.Please create the serial port connection again or restart the secureCRT if there is garbage.Please confirm whether the serial port setting is correct or not if the information below do not show up.

![](/assets/en-us/QuickStart/debug/pic_MX010.jpg)


### 2.5.2.Programming

Step 2:Press Enter after entering ‘1’.

![](/assets/en-us/QuickStart/debug/pic_MX011.jpg)

Step 3:Click Transmission button in the menu and select Send Ymodem(D) to choose the firmware document in 2.2 and confirm to send when CCC...are printed in the window.

![](/assets/en-us/QuickStart/debug/pic_MX010.jpg)

Wait for a short time and your programming finishes when appears the information above.
