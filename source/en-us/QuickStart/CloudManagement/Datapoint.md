title: Set Datapoint
---


Gizwits Cloud and App can analyze and process the data that upload from devices, while the devices can also analyze and process the data from cloud and APP. All of these are based on a clear understanding of the data definition on both sides.Gizwits Cloud back-end provides the interface of datapoint,which can ensure that the definition among the cloud, APP and devices is clear.

* Make a clear definition for data communication between devices and the Cloud or APP.

* Based on the definition of datapoint, the cloud can analyze the device data.The user can enjoy some functions, such as "Device running status" and "Statistical Analysis".

* Gizwits Cloud possesses the interface of big data that can analyze the device data in a short time.

* It's convenience for developer to develop when APP SDK can send down or upload the device data.

* In addition, it's also beneficial to develop the MCU because the Gizwits, according to the data point, can establish detailed communication protocol of serial port between MCU and GAgent.

# Follow These Step-by-Step Instructions to Set your Datapoints

1.Click the device name after enter the Hardware Integration section in Fig.

![](/assets/en-us/QuickStart/Datapoint/pic_001.jpg)


2.Click the Create Datapoint button in Datapoint section.

![](/assets/en-us/QuickStart/Datapoint/pic_002.jpg)

3.A window will pop up on your screen.Fill in the datapoint name and the Note(optional) and choose the I/O Type and Data Type according to the tips.

![](/assets/en-us/QuickStart/Datapoint/pic_003.jpg)

4.User can edit and delete datapoints set before.

![](/assets/en-us/QuickStart/Datapoint/pic_004.jpg)

5.After confirming to create datapoints,click Apply button to save your change. Make your own reusable template by clicking Save as template button.User can apply this template directly when create a product with similar features and functions.

![](/assets/en-us/QuickStart/Datapoint/pic_005.jpg)

# Specific Definition of Datapoint

The datapoint is made up of the display name,name,I/O Type,Data Type and Note in Fig.

![](/assets/en-us/QuickStart/Datapoint/pic_006.jpg)

1.Display name:When creating a datapoint,the display name is set as the same as Name.User can only edit the display name by clicking Edit button.Chinese or English characters and special characters(avoiding to use for normal displaying) are allowed to use here.The display name will be used in the virtual device and for developing IoE Demo App instead of storage and transmission of hardware.

2.Name:The variable name will be used on application layer,Client or the development of Service Cloud,but not on storage and transmission of hardware.The naming rule for the variable name of the standard development languages should be applied on.English letters,digits and underline are allowed to use in the name and the first letter of name must be English letter.

3.I/O Type:

①　Read Only:Read Only attribute means that the datapoint is unable to modify.Data Types like Boolean,Enumeration,Number,Binary are available to choose.Cloud/Client is unable to send instructions to device to change the datapoint value.While the device can upload the data to Cloud.More can refer to the Infrared Sensor datapoint in Wechat Pet house.

②　Writable:Writable attribute means that the datapoint is able to modify.Data Types like Boolean,Enumeration,Number,Binary are available to choose.Device can upload data to Cloud.Meanwhile,Cloud and App have permission to send instructions to device.More can refer to the Turn red light on/off datapoint in Wechat Pet house.

③　Alert:Alert attribute means that the datapoint is unable to modify.Boolean is the only option for Data Type.Cloud/Client is unable to send instructions to device to change the datapoint value.While device can upload data to Cloud.More can refer to the Alarm1 datapoint in Wechat Pet house.

④　Fault:Fault attribute means that the datapoint is unable to modify.Boolean is the only option for Data Type.Data uploaded by Device will be processed through cloud,which can be checked in the Running state section.While device can upload data to Cloud.More can refer to the Fault1 datapoint in Wechat Pet house.

4.Data Type

①　Boolean:It indicates two kinds of state of device and is represented by 0 or 1.We suggest our users using Boolean to indicate ON-OFF.More can refer to the Turn red Light on/off datapoint in Wechat Pet house.

②　Enumeration:It can define a finite value range.Every two values will occupy one bit.Some function(component) will have finite enumeration members.More can refer to the LED Color Setting datapoint in Wechat Pet house.

③　Number:Write down the data range here.Gizwits back-end will convert the negative value into positive value and decimal number is acceptable.More can refer to the Motor Speed Setting datapoint in Wechat Pet house.

④　Binary:User can write down the length of data and define the data.But we do not suggest our users using this data type which can not be identified by Gizwits cloud.In other words,service based on data analysis and value added service are unavailable.

5.Note:A description for datapoint function and defining method can be fill in the blank. This optional field has no restriction on character format and is used to make the datapoint more understandable for others.Note that it would be better to write in a unified pattern if there are more than one developer or in a team cooperation.

# Editing Datapoint

Different kinds of Data types require various parameters.The following instructions provide users with editing ways according to different data types.

## 1.Add and edit Boolean Data Type:

Boolean is the format type with no parameter but only two values:true(1) and false(0) in Fig.

![](/assets/en-us/QuickStart/Datapoint/pic_007.jpg)

## 2.Add and edit Enumeration Data Type:

Choose the Enum in the Data Type dropdown menu.Enter the enumeration value in Enum range textbox and separate each one by a comma ”,”.After confirming to add or edit,a serial number for every enumeration value will automatically be assigned by Gizwits and can be used directly in Client and the development of hardware.

![](/assets/en-us/QuickStart/Datapoint/pic_008.jpg)


## 3.Add and edit numeric Data Type:

Choose the Number in the Data Type dropdown menu.Enter the maximum value and minimum value in Data Range textboxes and ratio represents the step value each time.The conversion method of ratio can refer to the following context.

![](/assets/en-us/QuickStart/Datapoint/pic_009.jpg)

## 4.Add and edit binary Data Type

Choose the Binary in the Data Type dropdown menu.Developer can enter a positive integer less than or equal to 2047(Byte) in the data length textbox.Substantially,it is an instruction for holding space for this datapoint.


# Conversion Principle of Numeric Data Type

As mentioned above,when define a datapoint, Values that are not uint type,like decimal and negative values are acceptable.But,developers who are familiar with the embedded development know that these values can not be shown in Device.

In order to simplify the process of setting datapoint,Gizwits has developed a set of algorithm which can convert the figure entered by users to the uint type recognized by device.The core formula for this algorithm is y=kx+m.

Y represents ‘display value’ or the final value shown to user,including Ymin(Maximum value) and Ymax(Minimum value),which is entered when set the datapoint.

X represents ‘transmission value’ in the uint form or the actual value during transmission Which can be received by Cloud/Client ,including Xmin and Xmax.

k represents ‘ratio’ entered by developers,which ensures the step value each time.

m represents ‘offset value’ or ‘increment’.Through algorithm,y will be offset to meet the requirement of making x in the uint form by m.M is equal to Ymin to ensure Xmin = 0.

Take an electronic thermometer for example to explain the conversion.Value range:-30(Ymin)~50(Ymax), ratio=0.1     

Based on the formula：y=kx＋m,m is equal to Ymin -30

Xmin = (-30+30) / 0.1 = 0

Xmax = (50+30) / 0.1 = 800
