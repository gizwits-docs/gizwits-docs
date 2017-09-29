title: Manage Application
---

Based on different platforms,App developers need to connect product with application after creating application.Follow these following instructions to create one.

# 1.Application Page

Click the Application tab on the navigation bar to redirect to the App Management section in Fig 1-1.Create an application by clicking the Create Application button when the page indicates that no application is created yet.

![](/assets/en-us/QuickStart/ManageApp/pic_001.jpg)

<center>Fig 1-1</center >

2.Create Application

2.1Basic Information

A window will pop up by clicking the Create Application button to fill in some basic information in Fig 1-2.

![](/assets/en-us/QuickStart/ManageApp/pic_002.jpg)

<center>Fig 1-2</center >

2.2Type of Platform

iOS ,Android and WeChat Web Application

2.3User system

Only bind the same user system when create the android application,iOS application or Wechat Web Application can they share the same user system.

Independent User System:The user system can only be bound by one application.

Bind the existed user system:It means that several applications can share one user system.But only the new created application can bind the existed system.

2.4Name your App

Enter the App name and select the platform for your App(iOS as the default option).The independent user system is the only option for the new created application in Fig 1-3.

![](/assets/en-us/QuickStart/ManageApp/pic_003.jpg)

<center>Fig 1-3</center >

2.5 Finish your Creating(Take WeChat Pet House as example)

Click Confirm button to create your application name as WeChat Pet House in Fig 1-4.

![](/assets/en-us/QuickStart/ManageApp/pic_004.jpg)

<center>Fig 1-4</center >

3.Detailed Information of App

In this page,you can view the App name,selected platform,user system,App ID and App Secret.

App ID:The only App ID (auto-generated) during calling SDK.

App Secret:Token(auto-generated) is needed when call API and used to verify the legality of request.Don’t leak it to others.

3.1No Device Accessing

If user hasn’t accessed any device it will indicate in the Access Device field in Fig 1-5.

![](/assets/en-us/QuickStart/ManageApp/pic_005.jpg)

<center>Fig 1-5</center >

3.2Device accessing application

In order to control the device from App,we need to connect device with App,that is,binding applications.Bind the device in a few steps as following.

Enter the Detailed Information section by selecting the Device List tab.Take WeChat Pet House as example.The Bound Application is on the bottom of the Detailed Information section in Fig 1-6.

![](/assets/en-us/QuickStart/ManageApp/pic_006.jpg)

<center>Fig 1-6</center >

Check the Application you need in the dialog box which will pop up after clicking Binding Application button and save your change.Check your modification in the Access Device field of Detailed Information of Application in Fig 1-7.

![](/assets/en-us/QuickStart/ManageApp/pic_007.jpg)

<center>Fig 1-7</center >

3.3Push Notifications

Gizwits Andriod/iOS App support to access Baidu Cloud Push and JPush.Before accessing,developer need to configure Push Service by binding Baidu Cloud Push and JPush.

A dialog box will pop up after clicking the Configure Push Service on the right side.Select Baidu Cloud Push or JPush in the Push Notifications Service field.After select one of the push service,the content of the blue link below will change correspondingly.Enter the API Key and Secret Key for Baidu Cloud Push or App Key and Master Secret for JPush after you succeed to apply for the push service.After clicking Bind button to save your change,it will display in the Push Notifications field in Fig 1-8.

![](/assets/en-us/QuickStart/ManageApp/pic_008.jpg)

<center>Fig 1-8</center >

Enter the new value to replace the previous one and click the Confirm button to save your change.Change the push service by unbinding the previous one and selecting the new one.

3.4Edit Info

User can change the App name.

3.5Delete

User can click the Delete button to delete the unwanted application and click confirm button when make sure to permanently delete.

Warning:This action is undone.

3.6Social login

Click the Apply for APP ID in Tencent Open Platform link in the pop-up dialog box after clicking the Social login setting link.The status of Social login field will be Remove Social Login.

Note:Currently,QQ login is the only social login supported by Gizwits.Click the link in the dialog box to apply for the APP ID in Tencent Open Platform.After associate APP ID, integrate Gizwits SDK with your App and test the social login function.

![](/assets/en-us/QuickStart/ManageApp/pic_009.jpg)

<center>Fig 1-9</center >

3.7 Remove Social Login

Click the Remove Social Login link and select the Confirm button in the pop-up dialog box to save your change.

![](/assets/en-us/QuickStart/ManageApp/pic_010.jpg)

<center>Fig 1-10</center >
