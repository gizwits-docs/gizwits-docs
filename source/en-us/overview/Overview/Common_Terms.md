title: Common Terms
---

# Technical Terms

## Developer Zone

Developer Zone is a management tool that Gizwits provides for developers. By using this management tool, developers can complete management of products, the setting of datapoints, virtual devices testing and debugging, application management, operation state, product release, OTA and other functions.



## GAgent

Gizwits provides hardware connectivity with the embedded system firmware that can operate in Wi-Fi modules, GPRS modules and other modes. Devices access Gizwits platform through the GAgent. GAgent provides the communication protocol between modules and MCU, so that, according to the protocol, developers can realize the communication between MCU and GAgent. In addition, developers can also connect the customized modules to Gizwits by obtaining the GAgent redevelopment kit.



## IOT SDK

To help developers realize iOS and Android application system quickly, Gizwits provides SDK so that it can complete the communication between application and GService, application and GAgent, as well as the underlying services. In this way, developers only need to focus on application development.



## Minor Cycle

Minor Cycle is defined as the concept that the interior LAN communication and transfer between smart devices and mobile phone application, smart devices and another smart device can be realized by accessing the same router.



## Macro Cycle

Connect the intelligent devices to the Internet by using the Wi-Fi router or cellular data network, so that users can realize the transfer between devices data and the cloud or the application, the communication between application and devices, devices and another devices, all of which is defined as Marco Cycle.



## Onboarding

Onboarding is the process when users connect a Wi-Fi-based device configuration to router. When the new device first uses Onboarding, it is required to obtain the username and password of the router so that it can connect to the Internet via this router. Because most of the IoT devices do not have their own screens and keyboards, sending the SSID and password of the router to the devices via smart phones is required. The IOT SDK provided by Gizwits has already internally installed the functions of this configuration.



## AirLink

AirLink is a general name for the technique of realizing Onboarding which is launched by Gizwits. It is compatible with multiple Wi-Fi module manufacturers’s Smart-Config and has provided a set of standardized Onboarding operation procedures for good user experience. The AirLink has been internally installed in the GizWits’ Wi-Fi devices accessing to the SDK.



## SoftAP

Because the Smart Config Protocols of Wi-Fi module manufacturers now are not fully mature and they do not support the 5G router signal, Gizwits supports not only the AirLink configuration mode, but the SoftAP configuration mode for the device to connect with the router. When the device enters into the SoftAP configuration mode, the device itself will become an AP and the smart phones can connect with this device directly. After that, users need to enter the SSID and password of the router, and when the devices receive signals, they will automatically attempt to connect with the router. After succeeding in connecting, the phones will automatically switch to the normal use mode.



# Business Terms



## Developer

To help developers quickly complete the intelligent hardware access, Gizwits platform define the Developer as the concept that a person or an enterprise register successfully and process hardware development on the Gizwits Developer Zone.   



## Product

This refers to the devices that the developers want to develop, produce and sell, which is corresponding to product management in the Developer Zone.



## Device

Device is an entity of product, and one product is corresponding to any number of devices.



## Datapoint

Datapoint refers to the property of product. According to datapoints, Gizwits generates the different communication protocols between systems and the module.



## Applications

Applications refer to the systems that are developed by the developers who are based on the characteristics of product business. This kind of systems provides services through SDK IOT. Applications include APP, the applications based on WeChat's Official Accounts and various types of business operation management systems.



## OTA

The English full name of OTA is Over-the-Air Technology, whose meaning is space download technology. OTA Firmware Upgrade refers to the operation of processing the long-distance firmware program upgrade for device Wi-Fi and MCU module, as well as fixing bugs in firmware program or adding some new functions.



# GoKit

GoKit is the development board that is provided by the Gizwits. It can help the developers understand the hardware tools of Gizwits, which can reduce the hardware development cycle.



## IOE Demo App

IOE Demo App is the general simplified version of App, which is provided by Gizwits. It is designed to help developers process debugging and verification for hardware products quickly. Demo APP has holistic process of the user registration, login and logout, and it can complete Gizwits intelligent hardware’s network configuration, devices search, devices binding, devices login and devices control, status updates, remote and local switching and other basic functions. According to product features that are defined by developers, it can also generate control page automatically.



## Productkey

ProductKey is an identification code. After the developers create new products on Gizwits back-end, Gizwits will generate a 32-bit string automatically. Each product has its own number that is generated by Gizwits. When developers finish developing and writing in the master control MCU of devices, Gizwits can recognize devices and automatically finish registration through ProductKey.



## did

did is an abbreviation of device’s ID (Device id). When a device accesses Gitwits for the first time, Gizwits will register a did for this device, which is based on the ProductKey and the MAC address of the Wi-Fi module of this device. Hence, this did is unique on the whole network and can be utilized for device’s identification, customer binding and the subsequent operations.



## Passcode

Passcode is the pass of device, which is used for verifying the customer binding and controlling privilege. When the users initiate the device binding, the Passcode can be obtained as long as the operation is legal. Through this passcode, the users can realize device binding and view, control the device within validity period.  



## AppID

AppID is the App identification code. When the developers need to develop the applications (including iOS, Android, Wed Apps and more) for an intellectual product, Gizwits will automatically generate AppID that will be associated with this device. When applications access Gizwits services, SDK need to use the AppID information as the verification.
