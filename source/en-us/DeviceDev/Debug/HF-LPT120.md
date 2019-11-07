title: Firmware downloading for HF-LPT120 via serial port
---

# Overview

This document describes how to perform firmware downloading on HF-LPT120 module via serial port. When downloading firmware for the module, please follow the steps below, otherwise an unknown error will occur.

Note:For LPT120, LPB120, LPT220 of High-Flying, the firmware downloading process via serial port is the same.

# Procedure

## 1. Download the firmware package for HF-LPT120

![Firmware downloading](../../../../assets/en-us/DeviceDev/debug/LPT120/11.png)

![Firmware downloading](../../../../assets/en-us/DeviceDev/debug/LPT120/12.png)

![Firmware downloading](../../../../assets/en-us/DeviceDev/debug/LPT120/13.png)
 
## 2. Unzip the downloaded firmware package

![Firmware downloading](../../../../assets/en-us/DeviceDev/debug/LPT120/14.png)

After unzipping the package, you will find two bin files. The file whose name has a UART suffix is what we need.
 
## 3. Connect the module to PC

Connect the HF-LPT120 module to a USB-to-TTL converter according to the following schematic. Note that nReload (Pin 45) needs to be set to LOW as an input. Here it is connected to ground directly. KEY1 is used for the external reset function.

![Firmware downloading](../../../../assets/en-us/DeviceDev/debug/LPT120/15.png)

![Firmware downloading](../../../../assets/en-us/DeviceDev/debug/LPT120/16.png)

## 4. Configuration of the firmware download tool

### 4.1 Confirm serial port parameters

After connecting the above USB-to-TTL converter to the PC, you can see the corresponding COM port through the "My Computer" -> "Administration" -> "Device Manager" -> "Port (COM and LPT)".

![Firmware downloading](../../../../assets/en-us/DeviceDev/debug/LPT120/17.png)
 
### 4.2 Download the serial port tool SecureCRT

Download it here: http://pan.baidu.com/s/1dECLxYD

Unzip the package and start SecureCRT. Clicking Quick Connection will bring up the serial port configuration dialog.

![Firmware downloading](../../../../assets/en-us/DeviceDev/debug/LPT120/18.png)

![Firmware downloading](../../../../assets/en-us/DeviceDev/debug/LPT120/19.png)
 
Select Serial for the Protocol. Set the Port to the COM above, Baud rate to 230400, Data bit to 8, Stop bit to 1, Parity to None, and finally click Connect.

After the successful connection, the cursor will flash in the SecureCRT workspace.

![Firmware downloading](../../../../assets/en-us/DeviceDev/debug/LPT120/20.png)
 
## 5. Firmware downloading

### 5.1 Enter flash mode

Step 1. After the HF-LPT120 module is connected to your PC, reset the HF-LPT120 (Press the KEY1 shown in the schematic of section 3 and release it) or power on the module again.

Step 2: Once completing Step 1, quickly click the keyboard space bar continuously. If the following message appears, it indicates that the module enters the flash mode.

![Firmware downloading](../../../../assets/en-us/DeviceDev/debug/LPT120/21.png)

Note: This step is not easy to complete. It needs several attempts. When the above message is always unable to appear, please check whether the serial port settings is correct and repeat above steps again.

Each code in the above message is explained as follows:

Command | meaning
---|---
B |Clear all setting parameters, including manufacture defaults, etc.
S |Upgrade the application. Use this option to upgrade the file compiled from SDK etc. 
G |Execute the application.

### 5.2 Flash firmware

![Firmware downloading](../../../../assets/en-us/DeviceDev/debug/LPT120/22.png)

Step 1. Enter S to upgrade the application, and then enter Y to receive the firmware.
Step 2: When the window prints "CCC...." continuously, select "Transfer" -> "Send Xmode(N)" in the menu bar, and choose the firmware file downloaded in section 2, then click Send.

![Firmware downloading](../../../../assets/en-us/DeviceDev/debug/LPT120/23.png)

After waiting for a while, it will display the above message which indicates that the firmware downloading is successful.
