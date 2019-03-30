title: Control Gokit using Amazon Echo
---

# 1. Overview

* This tutorial describes the third control manner used by users to control Gokit other than the App and WeChat: Amazon Echo.
* Amazon Echo: Amazon Echo is a brand of smart speakers developed by Amazon. The devices connect to the voice-controlled intelligent personal assistant service Alexa, which responds to the name "Alexa".
* Alexa: Alexa is Amazon’s cloud-based voice service that provides a set of built-in capabilities, referred to as skills that enable customers to use voice to interact with devices in a more intuitive way. For example, Alexa's abilities include playing music from multiple providers, answering questions, providing weather forecasts, and querying Wikipedia. 
* Alexa Skill: The Alexa Skills Kit is a collection of self-service APIs, tools, documentation, and code samples that makes it fast and easy for you to add skills to Alexa. ASK enables designers, developers, and brands to build engaging skills and reach customers through tens of millions of Alexa-enabled devices. With ASK, you can leverage Amazon’s knowledge and work in the field of voice design.
* Gizwits has published two skills on Alexa to control Gokit, named "Gokit Light" and "Gokit".

Skill name |	Skill Type |	Pros & Cons |	Functions
---|---|---|---
Gokit Light|	SmartHomeSkill|	Control your device without saying invocation name. Note that a skill built with the Smart Home Skill API can respond only to the requests (device directives) supported by the API.|	Turn on/off the Gokit LED light and adjust the Gokit LED brightness.
Gokit|	CustomSkill|	Control your device with saying invocation name. A custom skill can handle any kind of request, so long as you can create the code to fulfill the request and provide appropriate data in the interaction model to let users invoke the request. This is the most flexible kind of skill you can build, but also the most complex, since you need to provide the interaction model.|	Turn on/off the Gokit LED light. Change the Gokit LED color. Start and stop Gokit motor. Accelerate and decelerate Gokit motor speed. Get temperature and humidity.

# 2. Development prerequisites

## Hardware

* Gokit2 or Gokit3, you can buy it at https://59680395.taobao.com/
* Amazon Echo

## Software

* Gizwits Gokit App

iOS | Android
---|---
![Gizwits Gokit App](../../../assets/en-us/DeviceDev/UseEcho/11.png)  |![Gizwits Gokit App](../../../assets/en-us/DeviceDev/UseEcho/12.png)  

* Alexa App

![Echo](../../../assets/en-us/DeviceDev/UseEcho/13.png)

For Android, download it at http://pan.baidu.com/s/1c2iT2W4

For iOS, download it from Apple App Store in US by searching for Alexa.

## User accounts

* Gizwits user account (Sign up in Gizwits Gokit App)
* Amazon Alexa user account (Sign up at http://alexa.amazon.com/spa/index.html)

# 3. Get your Gizwits Gokit connected to Wi-Fi network

Launch the Gizwits Gokit App, register with your phone and log in. Go to “My Devices” page, and click “No device, please add”.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/14.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/15.png)  

Select the Wi-Fi module type of your Gokit. Select the Wi-Fi SSID you want to connect and enter the password, then click “Next”. Make RGB light turn green with long press on key2 of your Gokit, then click “Next”.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/16.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/17.png)  

The “Connecting your device to network” page appears. After a while, the “My Devices” page displays. In the “New Devices” pane, there is an unbound device “WeChat Pet House”, whose MAC address is "ACCF2378C44A". Click on the device.

Note: If the configuration times out, check if the router uses the 2.4GHz band and is able to connect to the Internet. If no new device is discovered, please check if the product key in your Gokit MCU program matches the one in your Gokit factory default settings.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/18.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/19.png)

Go to the device control page and click “Switch light On/Off”. If the Gokit lights up, it indicates that the configuration is successful. Then return to “My Device” page and you will find that the device is already in the “Bound Devices” pane. It means that your Gokit is successfully bound.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/20.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/21.png)

# 4. Apply Alexa Skill to your Amazon Echo

## 4.1 Get your Amazon Echo connected to Wi-Fi network

You can get your Amazon Echo connected to Wi-Fi network and apply Alexa Skill to your Amazon Echo through Alexa App and web page.

### 4.1.1 Set up Amazon Echo via Alexa App

Open and log in to Alexa App. Go to the welcome page and click “Begin Setup”. In the “Setup” page, select Echo Dot.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/22.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/23.png)

Choose your language. Currently, Echo only supports English (American pronunciation), English (English pronunciation), and German. Click “Continue” and then click “Connect to Wi-Fi”.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/24.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/25.png)

Plug the power adapter into Amazon Echo and then into a power outlet. The light ring on Amazon Echo turns blue, and then orange. When the light turns orange, click Continue to jump to Manually connect to Echo Dot page.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/26.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/27.png)

Go to the Wi-Fi settings page in your phone and select the network of the format Amazon-XXX to connect your phone to Echo Dot. Go back to your Alexa App and it shows Connected to Echo Dot. Then click “Continue”. 

![Echo](../../../assets/en-us/DeviceDev/UseEcho/28.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/29.png)  

On this page, select your Wi-Fi network and enter the network password. Then click “Connect”.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/30.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/31.png)  


After a while, the Setup Complete page appears. Click “Continue”.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/32.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/33.png)  

If you use Echo Dot, it will let you choose how to use your Echo Dot. If you choose “No speakers”, there will be a short promotional video. If you use Echo, it jumps directly to the promotional video.
	
![Echo](../../../assets/en-us/DeviceDev/UseEcho/34.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/35.png)

  
### 4.1.2 Set up Amazon Echo via Web page

Navigate to http://alexa.amazon.com/spa/index.html in your PC browser to set up your Amazon Echo. Log in with your Amazon account.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/36.png)
 

Go to the Alexa settings page. Click Begin Setup, and select your device.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/37.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/38.png) 
 
Choose the language you use.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/39.png)

Click Connect to Wi-Fi.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/40.png)

 
Make sure your Echo device is plugged into a power outlet. When the light ring turns orange, click Continue.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/41.png)

Go to the Wi-Fi settings on your PC and select the network of the format Amazon-XXX to connect your PC to Echo.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/42.png)

After the following page appears, click Continue.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/43.png)

Select your Wi-Fi network and enter the network password (if required).

![Echo](../../../assets/en-us/DeviceDev/UseEcho/44.png)

After your device connects to your Wi-Fi network, a confirmation message appears. Then click Continue.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/45.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/46.png)
 
## 4.2 Apply Alexa Skill to your Amazon Echo

Gokit now supports two Alexa Skills: “Gokit Light” of SmartHomeSkill type and “Gokit” of CustomSkill type. “Gokit Light” can only be used to control your Gokit.

Clicking on the menu bar in the upper left corner will pop up a menu on the left. Click Skills to enter the All Skill page, then search for “Gokit” or “gizwits” in the search bar. Click Search.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/47.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/48.png) 

There are two Skills in the search results, “Gokit Light” and “Gokit”.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/49.png)

 
### 4.2.1 Use SmartHomeSkill “Gokit Light”

Click on the Skill called “Gokit Light”, and click ENABLE to jump to the “Please sign in” page. Sign in with your account registered in the Gokit App.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/50.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/51.png)  

Then click Yes on the following page and the success message will appear as follows, indicating that the Alex Skill was linked to Gizwits Gokit App user account successfully.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/52.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/53.png)  

Return to the Skill page, the “Discover Devices” prompt box will pop up.  Make your Gokit come online, and click DISCOVER DEVICES. The discovering page pops up and wait a moment.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/54.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/55.png) 

After the progress bar disappears, Alexa App has discovered a device whose name is a string of hexadecimal MAC addresses. Go back to the device control page of your Gokit App, click on the upper right menu, and choose Set Device Info.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/56.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/57.png)  

Here you can enter the Gokit's alias and comment. Set both Alias and Comment to “Light”, then click OK.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/58.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/59.png)  

Go to the device list page and find that the device name has been changed to “Light”.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/60.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/61.png)
  
Go back to the Alexa App and re-click on Discover devices. After a while, you will find that Your Devices page displays your Gokit with the alias and comment you just provided. Then you can control your Gokit using the SmartHomeSkill with the Invocation phrases table in the appendices.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/62.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/63.png)
  
### 4.2.2 Use Custom skill “Gokit”

Click on the Skill called “Gokit”, and click ENABLE to jump to the “Please sign in” page. Sign in with your account registered in the Gokit App.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/64.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/65.png)  

Then click Yes on the following page and the success message will appear as follows, indicating that the Alex Skill was linked to Gizwits Gokit App user account successfully.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/66.png)

![Echo](../../../assets/en-us/DeviceDev/UseEcho/67.png)  

Go back to the Skill page. If it appears as shown below, you can control your Gokit using the CustomSkill with the Invocation phrases table in the appendices.

![Echo](../../../assets/en-us/DeviceDev/UseEcho/68.png)
 
# 5. Appendices

## 5.1 Invocation phrases of “Gokit Light” skill

* Utterance sample: Alexa,Turn on the light
* Alexa -> Wake word for Echo
* Turn on the -> Command to control the Gokit
* Light -> Device alias or group name

Invocation phrase |	Response of Amazon Echo |	Intended effect
---|---|---
Alexa,Turn on the [Device alias]	|OK|	Gokit LED is on
Alexa,Turn off the [Device alias]	|OK|	Gokit LED is off
Alexa,Set [Device alias] to xx percent	|OK|	Gokit LED brightness is set to xx％
Alexa,Decrease [Device alias] to xx percent	|OK|	Gokit LED brightness is decreased by xx％
Alexa,Increase [Device alias] to xx percent	|OK|	Gokit LED brightness is increased by xx％

## 5.2 Invocation phrases of “Gokit” skill

* Utterance sample: Alexa,start Gokit turn on the light
* Alexa -> Wake word for Echo
* Start Gokit -> Used to invoke the Skill “Gokit”
* Turn on the light -> Command to control the Gokit
 
Invocation phrase |	Key words |	Response of Amazon Echo |	Intended effect
---|---|---|---
Alexa,Gokit / Alexa,start Gokit / Alexa,open Gokit	|-|	Welcome to Gokit. I will now receive commands for your device. If you need more help, say help. For a full list of commands, visit the About this Skill page.|In this case, the skill normally returns a welcome message that provides users brief help on how to use the skill. If your skill needs more information to complete a request, you can have a back-and-forth conversation with the user. 
Alexa,Gokit,turn [Key word] the light / Alexa,Gokit,turn the light [Key word] / Alexa,Gokit,switch [Key word] the light	|On / off	|The light is [Key word].|	Gokit LED is on/off.
Alexa,Gokit, [Key word] motor / Alexa,Gokit,make the Gokit motor [Key word]  / Alexa,Gokit,turn [Key word] the motor /  Alexa,Gokit,fan [Key word] / Alexa,Gokit,motor [Key word]	|Start / stop / on / off / run / work|	The motor is now running / The motor has stopped.|	Gokit motor is running/has stopped.
Alexa,Gokit, [Key word] motor / Alexa,Gokit,motor speed [Key word] / Alexa,Gokit,speed [Key word] / Alexa,Gokit, [Key word]|	Accelerate / decelerate / down / up / faster / slower|	The motor speed has increased (decreased) / The motor is already running at top speed / The motor has stopped and its speed cannot be decreased anymore / Please turn on the motor first before changing the speed.	|The motor speed has increased/decreased.
Alexa, Gokit, [Key word] light / Alexa, Gokit, change the [Key word] light.	|Red / green / blue|	The light is [Key word].|	The Gokit LED color turns Red/Green/Blue.
Alexa, Gokit, [Key word] / Alexa, Gokit, tell me the [Key word] / Alexa, Gokit, tell me what is the [Key word]	|Temperature / humidity	|The temperature is xx degree / The humidity is xx percent	|Echo replies the current temperature and humidity.
Alexa,start Gokit and help	|-|	You can command your Gokit to turn on the light or motor. You may also ask your Gokit to tell you the humidity and temperature. For a full list of commands, please refer to the Skill card details in the Alexa application program.	|Echo provides users brief help on how to use the skill and keeps a back-and-forth conversation with the user.
[Key word]	|See you later / bye-bye / thank bye / goodbye / see you / bye	|Thank you for using Gizwits skill. Have a nice day!	|Used to end the current back-and-forth conversation with the user.

