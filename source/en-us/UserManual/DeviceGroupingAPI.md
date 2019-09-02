title: Device Grouping API tutorial
---

# Overview
The device grouping API can group multiple devices. As long as commands are sent to a device group, multiple devices under the group can be controlled collectively.

To use device grouping API, you must first create a group. After creating a group, bind a device with its MAC address, and then add the device to the group with the device did that corresponds to its MAC address in the device log. Then send an command to the group. The devices in the group receive the command and responds, and device grouping is completed.

For example, a company has multiple departments, each of which has multiple smart lights. Every morning anyone of a department comes in, he can just open all smart lights of his department at once. Every evening anyone of a department leaves, all smart lights of his department can be turned off at once.

# Device grouping API usage

The device grouping API is used to group and control multiple devices. When you has set up device grouping API, this API can be called to add multiple devices to a group, so that multiple devices can be controlled collectively.

__1. Open the document center of Gizwits official website -> Cloud API -> OPEN API guide, click any “Debug console” hyperlink.__

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/11.png)

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/12.png)
 
__2. Click Device Grouping -> Create a Group__
 
![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/13.png)

__3. Click Create a Group -> Exclamation Point__

Set App ID and token which can be referred to the section "2.3 Create Application Configuration" and "3. Postman Installation and Import" in the document "Using Gizwits Open API to control virtual device with Postman". The document link is 

http://docs.gizwits.com/en-us/cloud/OpenAPI.html

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/14.png)

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/15.png)
 
 
__4. Fill in the body field after completing the App ID and token__

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/16.png)

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/17.png)
 
 
__5. After getting the group id, check if there is any device in the group__

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/18.png)

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/19.png)
 
__6. Bind a device with its MAC address__

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/20.png)

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/21.png)
 
Timestamp helper link

http://tool.chinaz.com/Tools/unixtime.aspx

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/22.png)
 
Signature helper link

http://tool.chinaz.com/Tools/md5.aspx

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/23.png)
 
After the device binding is successful, there will be a response body as follows 

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/24.png)
 
__7. After binding the device, we go back to the device group and add the device to the group__

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/25.png)

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/26.png)
 
__8. Check the device log__

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/27.png)
 
__9. After successfully adding the device to the group, you will get the following response body__

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/28.png)
 
__10. Then you send commands to the device group to control the device remotely__

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/29.png)
 
__11. In this way we can control a device in a group (RGB light on and off). Add multiple devices to a group in the same way, and we can control multiple devices in a group at the same time.__

![Device grouping API usage](../../../assets/en-us/UserManual/Dev_GroupAPI/30.png)
 
