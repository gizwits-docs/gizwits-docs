title: Guide to Gizwits Device Sharing
---

# 1. Overview

After binding a device, you can let others use the device through Device Sharing. In order to facilitate multiple customers use the same device, Device Sharing provides device permission management with a more secure and convenient device binding. There are four types of device permissions for device binding:

* Owner: The primary account of the device, who can share the device;
* Guest: The guest account of the device, who can accept the sharing invitation and can no longer share the device to other users;
* Special: The account who has bound to the device at the earliest but has not shared the device, and will become the Owner of the device after sharing it;
* Normal: The account that has bound to the device but cannot share the device or become the Owner of the device.

Only the user bound to a device at the earliest or the Owner of a device can share the device. Once a device has an Owner account, other users can no longer bind the device. The Owner can view the currently users bound to the device and can unbind other users. When a device does not have an Owner, other users can bind the device.

Note: Before using Device Sharing feature, it needs to be enabled in the Developer Center - Product Basics.

![Device Sharing](/assets/en-us/AppDev/DeviceSharing/11.png)

# 2. Scenarios of Device Sharing

The process flowchart is as follows.

![Device Sharing](/assets/en-us/AppDev/DeviceSharing/12.png)
 
## 2.1 Scenario 1: One device to one user

A device can only be bound and controlled by one user, which means that the user only needs the roles of Special / Owner and does not have the roles of Normal / Guest. The code flowchart is as follows:
 
![Device Sharing](/assets/en-us/AppDev/DeviceSharing/13.png)

Note: Because this scenario is for one device to one user, when the user with Special role calls the Device Sharing function to become the Owner role, the guestUser parameter of the sharingDevice method is just set to a user account registered using the appid without UI involved.

## 2.2 Scenario 2: One device to multi-users

This is a common scenario. A device can be bound by multiple users. When a Special user becomes the Owner and other users want bind the device, the Owner user can share the device to other users by calling the Device Sharing function, and then other users can remotely control the device. That is to say, the users involved can have roles of Special / Owner or Normal / Guest. The code flowchart is as follows:

(1) Create a sharing invitation

![Device Sharing](/assets/en-us/AppDev/DeviceSharing/14.png) 

(2) Receive a sharing invitation

![Device Sharing](/assets/en-us/AppDev/DeviceSharing/15.png) 

# 3. Hardware design

## 3.1 Introduction to the Bindable Mode

When the Wi-Fi module requests the device information, the MCU reply contains a binding timeout field. When the field value is 0, the device can be bound at any time in the WLAN. If it is greater than 0, the commands in the protocol document 4.12 MCU tells the Wi-Fi module to enter the bindable mode can be used.
 
![Device Sharing](/assets/en-us/AppDev/DeviceSharing/16.png)

![Device Sharing](/assets/en-us/AppDev/DeviceSharing/17.png)

## 3.2 Why Device Sharing should be used together with Device Binding timeout

In a WLAN, when a user becomes the device Owner via the Device Sharing function, other users in the WLAN can discover and control the device through Device Discovery API, but cannot bind the device merely.
In the case of Macro Cycle, the users who has previously bound the device, except the Owner, cannot discover the device via calling the API of getting the bound device list. Other uses can control the device only when it is shared by the Owner.

## 3.3 Reset Wi-Fi module

After the device module is reset, it clears the previously configured SSID, password, did, passcode, etc., and all binding relationships of the device.
 
![Device Sharing](/assets/en-us/AppDev/DeviceSharing/18.png)

## 3.4 Why Device Sharing needs the Wi-Fi module reset sometimes

When the device Owner or Special role is set to other users who are unidentified, the information of all users who have previously bound to the device will be cleared after the device module reset including the previous Owner or Special. Once the customer reconfigures and binds the device, he will have the Special role, then share the device, he will become the Owner again.

# 4. App development 

## 4.1 Android SDK

### 4.1.1 Device Sharing via user ID

For Device Sharing via user ID, the receiver's ID can be a mobile phone number, an email address, a regular user name, or an anonymous ID, but it must be a user who has already registered in Gizwits IoT Cloud. If the user is already the Guest of this device or has already bound the device, the sharing invitation will fail to be created. The sharing invitation is valid for 24 hours, that is, the receiver must respond within 24 hours, otherwise the invitation will expire. 

Note: If the scenario is one device to one user, the guestUser parameter of the sharingDevice method is just set to a user account registered using the appid without UI involved. For details, see 2.1 Scenario 1: One device to one user.

You need to specify the user ID type. The guestUser parameter for the anonymous user should be set to the uid of the anonymous user. When the Account Sharing is created successfully, the sharingID will be returned in the callback parameter, but the QRCodeImage will not be returned. The following is only an example of Device Sharing to a user registered with mobile phone number:


[Code sample]

```
// Set Device Sharing listener
GizDeviceSharing.setListener(mListener);

// Find devices that can be shared in the device list

// Share the device via phone number
GizDeviceSharing.sharingDevice("your_token", "your_device_id", GizDeviceSharingWay.GizDeviceSharingByNormal, "guest_phone_number", GizUserAccountType.GizUserPhone);

GizDeviceSharingListener mListener = new GizDeviceSharingListener() {
 
    @Override
    public void didSharingDevice(GizWifiErrorCode result, String deviceID, int sharingID, Bitmap QRCodeImage) {
        if (result == GizWifiErrorCode.GIZ_SDK_SUCCESS) {
            // Success
        } else {
            // Failure
        }
    }
};
``` 

### 4.1.2 Device Sharing via QR code

For the Device Sharing via QR code, the QR code is valid for 15 minutes, that is, the receiver must scan the generated QR code within 15 minutes and respond, otherwise the QR code invitation will expire. When the QR code Sharing invitation is created successfully, the sharingID will be returned in the callback parameter, and the corresponding QRCodeImage will also be returned. The App can directly load the QR code image.

[Code sample]

```
// Set Device Sharing listener
GizDeviceSharing.setListener(mListener);

// Find devices that can be shared in the device list

// Share the device via QR code
GizDeviceSharing.sharingDevice("your_token", "your_device_id", GizDeviceSharingWay.GizDeviceSharingByQRCode, null, null);

GizDeviceSharingListener mListener = new GizDeviceSharingListener() {
 
    @Override
    public void didSharingDevice(GizWifiErrorCode result, String deviceID, int sharingID, Bitmap QRCodeImage) {
        if (result == GizWifiErrorCode.GIZ_SDK_SUCCESS) {
            // Success
        } else {
            // Failure
        }
    }
};
```

### 4.1.3 Accept sharing invitation

The Guest account can query the received sharing invitations. Only the Guest account can accept the sharing invitation.

If a sharing invitation received by the Guest has not yet been accepted, the Guest can accept or reject it.

[Code sample]

```
// Set Device Sharing listener
GizDeviceSharing.setListener(mListener);

// Query the list of sharing invitations sent to you
GizDeviceSharing.getDeviceSharingInfos("your_token", GizDeviceSharingType.GizDeviceSharingToMe, "your_device_id");

GizDeviceSharingListener mListener = new GizDeviceSharingListener() {

 
    @Override
    public void didGetDeviceSharingInfos(GizWifiErrorCode result, String deviceID, List<GizDeviceSharingInfo> deviceSharingInfos) {
        if (result == GizWifiErrorCode.GIZ_SDK_SUCCESS) {

	    	// Successfully retrieved. Find the share invitations that have not yet been accepted in deviceSharingInfos. your_sharing_id is the ID of the share invitation to be acceptted
	    	int your_sharing_id = -1;
	    	for (int i = 0; i < deviceSharingInfos.size(); i++) {
	    		GizDeviceSharingInfo mDeviceSharing = deviceSharingInfos.get(i);
	    		if (mDeviceSharing.getStatus() == GizDeviceSharingStatus.GizDeviceSharingNotAccepted) {
	    			your_sharing_id = mDeviceSharing.getId();
	    			break;
	    		}
	    	}
    
	    	// Accept invitation
	    	if (your_sharing_id != -1) {
	    		GizDeviceSharing.acceptDeviceSharing("your_token", your_sharing_id, true);
	    	}

        } else {
            // Failed to retrieve
        }
    }

 
    @Override
    public void didAcceptDeviceSharing(GizWifiErrorCode result, int sharingID) {
        if (result == GizWifiErrorCode.GIZ_SDK_SUCCESS) {
            // Success
        } else {
            // Failure
        }
    }
};
```

## 4.2 iOS SDK

### 4.2.1 Device Sharing via user ID

For Device Sharing via user ID, the receiver's ID can be a mobile phone number, an email address, a regular user name, or an anonymous ID, but it must be a user who has already registered in Gizwits IoT Cloud. If the user is already the Guest of this device or has already bound the device, the sharing invitation will fail to be created. The sharing invitation is valid for 24 hours, that is, the receiver must respond within 24 hours, otherwise the invitation will expire. 

Note: If the scenario is one device to one user, the guestUser parameter of the sharingDevice method is just set to a user account registered using the appid without UI involved. For details, see 2.1 Scenario 1: One device to one user.

You need to specify the user ID type. The guestUser parameter for the anonymous user should be set to the uid of the anonymous user. When the Account Sharing is created successfully, the sharingID will be returned in the callback parameter, but the QRCodeImage will not be returned. The following is only an example of Device Sharing to a user registered with mobile phone number:

[Code sample]

```
// Set a Device Sharing delegate
[GizDeviceSharing setDelegate:self];

// Find devices that can be shared in the device list

// Share the device to a user registered with mobile phone number
[GizDeviceSharing sharingDevice:@"your_token" deviceID: @"your_device_id" sharingWay:GizDeviceSharingByNormal guestUser:@"guest_phone_number" guestUserType:GizUserPhone]; 

// Callback
- (void)didSharingDevice:(NSError*)result deviceID:(NSString*)deviceID sharingID:(NSInteger)sharingID QRCodeImage:(UIImage*)QRCodeImage {
    if(result.code == GIZ_SDK_SUCCESS) {
        // success
    } else {
        // failure
    }
}
```

### 4.2.2 Device Sharing via QR code

For the Device Sharing via QR code, the QR code is valid for 15 minutes, that is, the receiver must scan the generated QR code within 15 minutes and respond, otherwise the QR code invitation will expire. When the QR code Sharing invitation is created successfully, the sharingID will be returned in the callback parameter, and the corresponding QRCodeImage will also be returned. The App can directly load the QR code image.

[Code sample]

```
// Set a Device Sharing delegate
[GizDeviceSharing setDelegate:self];

// Find devices that can be shared in the device list

// Share the device through QR code Sharing
[GizDeviceSharing sharingDevice:@"your_token" deviceID: @"your_device_id" sharingWay:GizDeviceSharingByQRCode guestUser:nil guestUserType:GizUserOther]; 

// Callback
- (void)didSharingDevice:(NSError*)result deviceID:(NSString*)deviceID sharingID:(NSInteger)sharingID QRCodeImage:(UIImage*)QRCodeImage {
    if(result.code == GIZ_SDK_SUCCESS) {
        // success
    } else {
        // failure
    }
}
```

### 4.2.3 Accept sharing invitation

The Guest account can query the received sharing invitations. Only the Guest account can accept the sharing invitation.

If a sharing invitation received by the Guest has not yet been accepted, the Guest can accept or reject it.

[Code sample]

```
// Set a Device Sharing delegate
[GizDeviceSharing setDelegate:self];

// Query the received sharing invitations
[GizDeviceSharing getDeviceSharingInfos:@"your_token" sharingType: GizDeviceSharingToMe deviceID: @"your_device_id"];

// Callback for getting the invitation list 
- (void)didGetDeviceSharingInfos:(NSError*)result deviceID:(NSString*)deviceID deviceSharingInfos:(NSArray*)deviceSharingInfos {
    if(result.code == GIZ_SDK_SUCCESS) {
        // Get the invitation list successfully. Find the unaccepted sharing invitations in deviceSharingInfos, and your_sharing_id represents the sharing invitation to be accepted
        NSInteger your_sharing_id = -1;
        for (int i = 0; i < deviceSharingInfos.count; i++) {
            GizDeviceSharingInfo* mDeviceSharing = [deviceSharingInfos objectAtIndex:i];
            if (mDeviceSharing.status == GizDeviceSharingNotAccepted) {
                your_sharing_id = mDeviceSharing.id;
                break;
            }
        }
           
        // Accept the invitation
        if (your_sharing_id != -1) {
            [GizDeviceSharing acceptDeviceSharing:@"your_token" sharingID:your_sharing_id accept:YES];
        }
    } else {
        // Fail to get the invitation list
    }
}

// Callback for accepting the sharing invitation	
- (void)didAcceptDeviceSharing:(NSError*)result sharingID:(NSInteger)sharingID {
    if(result.code == GIZ_SDK_SUCCESS) {
        // success
    } else {
        // failure
    }
}
```



# 5. Reference

* Guide to Gizwits App SDK 2.0 for Android: http://docs.gizwits.com/en-us/AppDev/AndroidSDKA2.html
* Guide to Gizwits App SDK 2.0 for iOS: http://docs.gizwits.com/en-us/AppDev/iOSSDKA2.html
