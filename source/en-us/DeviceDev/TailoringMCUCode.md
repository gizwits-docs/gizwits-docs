title: Tailoring MCU SDK to resource-limited platform
---

# 1. Overview

Due to the limited on-chip resources of the 8051 and other MCUs (take the STC15F2K60S2 as an example, the SRAM size is 2K = 2048 bytes), when more product Data Points are defined in the Gizwits IoT Cloud, there is not much free memory for the compiled program, causing the abnormality of serial data parsing and getting the program stuck, etc. For the STC15F2K60S2 platform, the Data Point length is recommended to be less than 20 bytes, and the corresponding RAM usage should be within 60%.

For developers who want to further reduce memory consumption, this document provides a way of “Tailoring MCU SDK to resource-limited platform".

This document describes how to tailor the automatically generated MCU code to save more hardware resources for application layer development or port to a platform with more limited resources (such as a MCU with 1K SRAM).

Before reading this document, you are advised to have a deep understanding of the Gizwits standalone MCU scheme. Please refer to the document "Gokit-MCU program with explanation". This document will not elaborate on the implementation of the MCU program. 

Below are the tailoring steps.

# 2. Check the resource usage of the source code project

First, define the corresponding Data Points:

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/11.png)

Next, generate the source code project for the STC15F2K60S2 platform:

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/12.png) 

The method to check the Data Point length: download "xxx- Gizwits standalone MCU scheme communication protocol document" in the Developer Center, and you can see that the sum of "attr_flags" + "attr_vals" in "3.2 Wi-Fi module controls device" is the total size of the Data Point length (in bytes):

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/13.png) 

You can see that the Data Point length is 2 bytes.

The SRAM usage of the compiled program is as shown in the following figure:

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/14.png) 

It can be seen that the SRAM usage corresponding to the defined Data Points is 988 bytes (the total size of STC15F2K60S2 SRAM is 2048 bytes).

If you want to further reduce memory usage, it needs to tailor the MCU SDK to meet the limited hardware resources requirement.

# 3. Tailoring MCU SDK to resource-limited platform

## 3.1 Remove transparent transmission code

* Remove the fields for transparent transmission in the global structure:

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/15.png) 

* Comment out the corresponding code:

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/16.png) 
 
![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/17.png)

Reduce memory usage by 26 bytes:

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/18.png) 

## 3.2 Remove Data Point Event Processing code

* Remove the fields for Data Point Event Processing in the global structure:

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/19.png) 

* Remove the corresponding code:

Tip: You can search for keywords globally, such as: issuedProcessEvent.

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/20.png)

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/21.png) 
 
* Modify the handler for converting p0 data to event:

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/22.png) 

Reduce memory usage by 19 bytes:

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/23.png) 

* Remove the global variable p0 of the user area (replaced with the global variable p0 of the common protocol area):

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/24.png) 
 
![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/25.png) 
 
![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/26.png)

* Comment out Control Event Processing code:

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/27.png) 

Reduce memory usage by 2 bytes:

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/28.png) 

* Add processing logic to the function of converting p0 data to event :

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/29.png) 

## 3.3 Remove log output function

For the MCU platforms like Arduino, when using log output, the print content will be stored in RAM by default, so it will take up a large amount of memory temporarily.

Note: The STC15F2K60S2 platform does not have this problem, and its print content will be stored in the code area, i.e., FLASH, and does not occupy the memory space of the xdata area.

You can comment out the log output code or modify the redirect macro to remove the log output function:

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/30.png) 

# 4. Summary

The section above meets the limited hardware resources requirement by tailoring transparent transmission, the conversion of Data Point into event, and user area global variables. 

From the tailoring example above, we see that when only one Boolean Data Point is defined, the Data Point length in the protocol is as follows:

![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/31.png) 

You can see that the Data Point length is 2 bytes.

The memory usage has been reduced from 988 bytes to 941 bytes, reducing the total memory usage by 47 bytes.

It has been tested that when defining an extension type Data Point of 20 bytes, the Data Point length in the protocol is as follows:
 
![Tailoring MCU code](/assets/en-us/DeviceDev/MCUCode/Tailoring/32.png)

You can see that the Data Point length is 21 bytes.

Similarly, the memory usage can be reduced from 1332 bytes to 1248 bytes, reducing the memory usage by 84 bytes.

Conclusion: The more Data Points you define, the more memory you will save by this way.

