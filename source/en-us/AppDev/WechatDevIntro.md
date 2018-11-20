title: Introduction to WeChat application development
---

# Development Process

## 1. Overview

If you need to use WeChat Official Accounts as the end user interface, you can read this document to understand how to develop it with the help of Gizwits, WeChat Official Accounts Platform and WeChat hardware platform. Since device connection and control based on WeChat Official Accounts involve interactions across multiple platforms, it is necessary to have a clear understanding of the role of each platform.  

## 2. Overall access flowchart

![Overview](/assets/en-us/AppDev/WeChatIntro/11.png)
 
## 3. Gizwits IoT Cloud

As shown in Figure 1, in the WeChat access scenario, the device function is defined through the graphical interface of the Developer Center (site.gizwits.com). Gizwits IoT Cloud automatically generates the Serial communication protocol for Gizwits IoT Cloud access for the communication between the device MCU and the Wi-Fi module. The device connectivity can be accomplished according to the communication protocal document.

As shown in Figure 2, when devices connect to Gizwits IoT Cloud, Gizwits provides API for WeChat applications, which supports the functions of sending device data to applications and issuing commands from applications to devices.

## 4. Private server

The Private server is a Web system that is independently deployed by developers to run its own WeChat application. The system uses the API provided by the Gizwits IoT Cloud to perform real-time communication with device data and control in order to satisfy the need of device connection and serve the end users through WeChat channel by accessing the API of WeChat Official Accounts Platform. 

First of all, developers can design personalized HTML with interactive UI and functions for their own applications. (As shown in Figure 3 and 4)

## 5. WeChat server

The WeChat server mainly provides a set of APIs for the communication between the device and the private server, which mainly includes binding/unbinding WeChat user account with devices, and receiving/sending device messages. For the API details, refer to the WeChat official documents. WeChat recently launched the WeChat hardware platform. Before implementing WeChat access, you need to go through WeChat Official Accounts Platform and WeChat hardware platform, which are subject to continuous update.

## 6. WeChat client

The WeChat client provides an UI that interacts with end users. It can be thought of as a browser running on a mobile phone, which is just running under WeChat Official Accounts Platform. Developers can configure custom menus through WeChat Official Accounts Platform.

# Learn about WeChat

Learn about WeChat Official Accounts Platform.

For details, please refer to WeChat Official Accounts Platform.

# FAQ

## 1. What is Gizwits Web Socket API?

Gizwits Web Socket API service is a set of APIs developed to meet the needs of device remote control, real-time display of device state based on HTML5 applications such as WeChat Official Accounts. The Web Socket API is mainly used to make up for the shortcomings of the HTTP protocol. It can transfer device data to web pages and display them in real time.

## 2. What is the difference between Web Socket protocol and HTTP?

The HTTP is short-lived one-way communication initiated by the client to send requests to the server.

Web Socket is long-lived two-way communication, both server and client can send data actively.

## 3. If the device is not successfully bound, can the device command be sent out by the Web Socket API?

For the device not successfully bound, the device command could not be successfully sent out.

## 4. Which encoding schema is used by device control API that communicates with server?

UTF-8 encoding schema. Non-ASCII characters in enumeration values of Data Points should be encoded in Unicode explicitly. 

## 5. Are there any detailed descriptions of parameters in the device control API protocol?

* did: The did of the target device. 
* attr: data of Data Point Protocol. 
* raw: data of Raw Data Protocol.

* did is in the result of device registration using Gizwits Open API.
* The value of attr is based on the Data Point Protocol.
* The value of raw is based on the Raw Data Protocol.

Web Socket is just a form of M2M communication. Therefore, its parameters are the same as the corresponding parameters defined in the Gizwits Open API. 

## 6. Does Web Socket API support SSL communication?

Yes.
