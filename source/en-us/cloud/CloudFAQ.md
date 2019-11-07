title: FAQ on Cloud Application Development
---
# 1. Overview

This article lists some of the problems that developers might face when using the development platform and APIs of Gizwits cloud, or carrying out web development and backend development and their solutions.

# 2. FAQ

__Q: How long can the device log data under a project be retained in the cloud?__

A: The device log and history log in the cloud can be retained for 7 days.

__Q: How many data points can be added for one product key?__

A: Currently, there is no limit on the server side. 200 data points work properly according to test feedback.

__Q: Can the product key be modified?__

A: After the project is created, pk cannot be modified. If you want to change pk, you can export data points into a template, and then re-create a new project and import the template into it.

__Q: Do Open API and Web Socket API support SSL communication?__

A: Yes.

__Q: When the device is disconnected. Why do the cloud and App still show the device online for a while?__

A: The device may be abnormally disconnected due to various unexpected issues such as power failure, crash, and network disconnection. The default value of TCP keepalive is 2 minutes or so. 

__Q: Under what circumstances will device online event reappear in the device log?__

A: When the module reconnects to the cloud during a heartbeat interval, the log in the cloud will print that the device goes online. It usually happens when debugging manually, or network reception being poor.

__Q: How to confirm whether OTA is successful?__

A: After the OTA, re-power the module and check the software version number of the module. If it shows the OTA version number, the OTA is successful. Even though the cloud shows that the OTA has failed, it is still successful as long as the version number is new.

__Q: Why is the error 9999 returned when calling the cloud Open API update user information?__

A: The Open API will return error 9999 when the new information to be updated is the same as the original.

__Q: Why does the prompt "it is not the same series of firmware" appear when performing OTA for GAgent?__

A: Because the hardware version number you provided is not correct. First, check the hardware version number of the GAgent to be upgraded, and then re-enter it into the firmware verification information.

__Q: When it is not able to upgrade the device Wi-Fi firmware via OTA, why does it upgrade again after re-power?__

A: The device will check whether the firmware version needs to be upgraded every time it restarts. If the device meets the upgrade requirements, even if the first upgrade fails, the device will perform upgrade again once the device is rebooted until the device is successfully upgraded.

__Q: What API can be used to obtain device data with web pages?  What are the differences among Open API, Web Socket API, and SNoti?__

A: All these three APIs can be used. The difference is that Open API is an HTTP request that is executed asynchronously (and involves interfaces such as user management, device sharing, and device grouping etc.). Web Socket API is capable of monitoring a single device in real time, and SNoti is able to monitor multiple devices in real time.
