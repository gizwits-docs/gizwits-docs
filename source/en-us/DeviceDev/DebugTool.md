title: Guide to Gizwits Serial Port Debug Tool
---

# Get ready

## 1. Sign up for a developer account and create a product

To use the Gizwits serial port debug tool, you need to create a product in Gizwits Developer Center. See here for reference.

## 2. Download Gizwits Debug App

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/11.png)

## 3. Download GAgent firmware

Take ESP8266 as an example. On how to download GAgent firmware, please refer to: Firmware downloading for ESP8266 via serial port.

## 4. Connect the module to the computer

According to the following schematic, connect ESP8266 to your PC using a USB-to-TTL converter.

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/12.png)

## 5. Download Gizwits Serial Port Debug Tool

Download it here: https://download.gizwits.com/en-us/p/98/119


## 6. Configure Gizwits Serial Port Debug Tool

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/13.png)

Find the productkey corresponding to the product in Gizwits Developer Center and fill in the blank of the serial port debug tool and save it.

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/14.png)

# UI description for Gizwits Serial Port Debug Tool 

## 1. Home Screen

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/15.png)

## 2. Command Screen

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/16.png)

## 3. Parameter Screen

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/17.png)

# Configure the module to access Gizwits Cloud

## 1. Power on the module for the first time

As shown in the figure, when the ESP8266 module is powered on for the first time, the following message will be printed in the receiving box.

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/18.png)

## 2. Start Gizwits Debug App

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/19.png)

## 3. Register for an account and log in

Here you can use your mobile phone number to register for an account or simply click Skip to jump to the next step.

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/20.png)

## 4. Add Device

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/21.png)

## 5. Input the router SSID and password

Select the corresponding module model which defaults to Espressif, and enter the SSID and password of the router that your mobile phone connected to. Then click Next.

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/22.png)

## 6. Send to the Airlink command

Click AirLink on the Command Screen, and the PC simulates the MCU function of sending a command to inform the module to enter AirLink mode.

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/23.png)

The figure below shows the output of the Wi-Fi module after entering the AirLink mode.

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/24.png)

## 7. App sends configuration information

After the above steps are completed, check the “Done above operations” on the App and click Next.

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/25.png)

At this point the App will issue a configuration package and display that it is discovering devices.

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/26.png)

## 8. Configuration result

Observe the receiving box of the serial port tool. When the following two commands are output, it indicates that the Wi-Fi module has successfully received the configuration information sent by the App, and connected to the router and Gizwits Cloud.

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/27.png)

After the Wi-Fi module is successfully connected to the router, it will broadcast a success message. After App receives the success message, it will show a device list page in which the Wi-Fi device locates.

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/28.png)

# Control device

## 1. Go to the device control page

Clicking the device on the device list page will take you to the device control page.

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/29.png)

## 2. Send control commands

Toggle "Turn on/off red light" button on the App to issue commands to control the red light.

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/30.png)

## 3. Control result

When you see the following command in the serial port debug tool, it means that the App controlled the device successfully.

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/31.png) 

## 4. Report data

Change the infrared detection value on the serial port debug tool to "1", click Report Data to mimic the MCU behavior of reporting the device status actively.

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/32.png)

After the App received the reported data, the "Infrared Detection" toggle button is switched on, which indicates that the MCU reported data to the App successfully.

![Gizwits Serial Port Debug Tool](../../../assets/en-us/DeviceDev/debug/Serial/33.png)

