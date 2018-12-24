title: SDK error codes
---

# Overview

This document mainly lists the error code information returned by the Gizwits App SDK when it is called.

# Error codes definition

ID |	Definition |	Description
---|---|---
0	|GIZ_SDK_SUCCESS|	The request from the client was executed successfully
8001	|GIZ_SDK_PARAM_FORM_INVALID|	The format of the JSON sent by Client to Daemon was invalid
8002	|GIZ_SDK_CLIENT_NOT_AUTHEN|	If there is no handshake authentication between Client and Daemon, any data interaction is invalid
8003	|GIZ_SDK_CLIENT_VERSION_INVALID|	Client version number is invalid
8004	|GIZ_SDK_UDP_PORT_BIND_FAILED|	UDP port binding failed
8005	|GIZ_SDK_DAEMON_EXCEPTION	|System error of Daemon 
8006	|GIZ_SDK_PARAM_INVALID|	JSON format of the data request sent by Client is correct, but the parameters are invalid; the parameters passed by the App are invalid
8007	|GIZ_SDK_APPID_LENGTH_ERROR|	Error of Appid length 
8008	|GIZ_SDK_LOG_PATH_INVALID|	Invalid log path
8009	|GIZ_SDK_LOG_LEVEL_INVALID|	Invalid log level
8020	|GIZ_SDK_NO_AVAILABLE_DEVICE|	No devices are available when setting device domain name in batch
8021	|GIZ_SDK_DEVICE_CONFIG_SEND_FAILED|	Device configuration failed to be sent
8022	|GIZ_SDK_DEVICE_CONFIG_IS_RUNNING|	Device is being configured
8023	|GIZ_SDK_DEVICE_CONFIG_TIMEOUT|	Device configuration timed out
8024	|GIZ_SDK_DEVICE_DID_INVALID|	Device did is invalid
8025	|GIZ_SDK_DEVICE_MAC_INVALID|	Device mac is invalid
8026	|GIZ_SDK_SUBDEVICE_DID_INVALID|	Child device did invalid
8027	|GIZ_SDK_DEVICE_PASSCODE_INVALID|	Device passcode is invalid
8028	|GIZ_SDK_DEVICE_NOT_CENTERCONTROL|	It is not a central control device
8029	|GIZ_SDK_DEVICE_NOT_SUBSCRIBED|	The device is not subscribed
8030	|GIZ_SDK_DEVICE_NO_RESPONSE|	No respond from the device
8031	|GIZ_SDK_DEVICE_NOT_READY|	The device is not ready
8032	|GIZ_SDK_DEVICE_NOT_BINDED|	The device is not bound
8033	|GIZ_SDK_DEVICE_CONTROL_WITH_INVALID_COMMAND|	The device command contains invalid contents
8034	|GIZ_SDK_DEVICE_CONTROL_FAILED|	Device command failed to execute
8035	|GIZ_SDK_DEVICE_GET_STATUS_FAILED|	Device status query failed
8036	|GIZ_SDK_DEVICE_CONTROL_VALUE_TYPE_ERROR|	The parameter type of device command is incorrect
8037	|GIZ_SDK_DEVICE_CONTROL_VALUE_OUT_OF_RANGE|	The parameter value of device command is not within the valid range
8038	|GIZ_SDK_DEVICE_CONTROL_NOT_WRITABLE_COMMAND|	Device command contains non-writable contents
8039	|GIZ_SDK_BIND_DEVICE_FAILED|	Device binding failed
8040	|GIZ_SDK_UNBIND_DEVICE_FAILED|	Device unbinding failed
8041	|GIZ_SDK_DNS_FAILED|	Domain name resolution failed
8042	|GIZ_SDK_M2M_CONNECTION_SUCCESS|	M2M connection succeeded
8043	|GIZ_SDK_SET_SOCKET_NON_BLOCK_FAILED|	Non-blocking socket connection failed
8044	|GIZ_SDK_CONNECTION_TIMEOUT|	Connection timed out
8045	|GIZ_SDK_CONNECTION_REFUSED|	Connection refused
8046	|GIZ_SDK_CONNECTION_ERROR|	Connection error
8047	|GIZ_SDK_CONNECTION_CLOSED|	Connection is closed
8048	|GIZ_SDK_SSL_HANDSHAKE_FAILED|	SSL handshake failed
8049	|GIZ_SDK_DEVICE_LOGIN_VERIFY_FAILED|	Device login verification failed
8050	|GIZ_SDK_INTERNET_NOT_REACHABLE|	The current external network is unreachable
8095	|GIZ_SDK_HTTP_SERVER_NOT_SUPPORT_API|	HTTP service does not support this API
8096	|GIZ_SDK_HTTP_ANSWER_FORMAT_ERROR|	Open API response format is wrong
8097	|GIZ_SDK_HTTP_ANSWER_PARAM_ERROR|	HTTP response parameter is incorrect
8098	|GIZ_SDK_HTTP_SERVER_NO_ANSWER|	HTTP service is not responding
8099	|GIZ_SDK_HTTP_REQUEST_FAILED|	HTTP request failed, such as returned 404, etc.
8101	|GIZ_SDK_MEMORY_MALLOC_FAILED|	Daemon memory allocation failed
8102	|GIZ_SDK_THREAD_CREATE_FAILED|	Daemon internal thread creation failed
8150	|GIZ_SDK_USER_ID_INVALID|	User ID is invalid
8151	|GIZ_SDK_TOKEN_INVALID|	User token is invalid
8152	|GIZ_SDK_GROUP_ID_INVALID|	Invalid group id
8153	|GIZ_SDK_GROUPNAME_INVALID|	Invalid group name
8154	|GIZ_SDK_GROUP_PRODUCTKEY_INVALID|	Invalid group type
8155	|GIZ_SDK_GROUP_FAILED_DELETE_DEVICE|	Group device deletion failed
8156	|GIZ_SDK_GROUP_FAILED_ADD_DEVICE|	Group device addition failed
8157	|GIZ_SDK_GROUP_GET_DEVICE_FAILED|	Failed to get device group
8201	|GIZ_SDK_DATAPOINT_NOT_DOWNLOAD|	Profile is not yet downloaded
8202	|GIZ_SDK_DATAPOINT_SERVICE_UNAVAILABLE|	Profile service is not available
8203	|GIZ_SDK_DATAPOINT_PARSE_FAILED|	Failed to parse profile
8300	|GIZ_SDK_SDK_NOT_INITIALIZED|	SDK not initialized
8301	|GIZ_SDK_APK_CONTEXT_IS_NULL|	Context is invalid and cannot be started
8302	|GIZ_SDK_APK_PERMISSION_NOT_SET	|Insufficient App permissions
8303	|GIZ_SDK_CHMOD_DAEMON_REFUSED|	Unable to modify daemon's execution permission
8304	|GIZ_SDK_EXEC_DAEMON_FAILED|	Daemon execution failed
8305	|GIZ_SDK_EXEC_CATCH_EXCEPTION|	An exception occurred while trying to run the daemon
8306	|GIZ_SDK_APPID_IS_EMPTY|	APPID is empty
8307	|GIZ_SDK_UNSUPPORTED_API|	Unsupported API
8308	|GIZ_SDK_REQUEST_TIMEOUT|	If Client does not get Daemon's reply, it will return timeout to the App
8309	|GIZ_SDK_DAEMON_VERSION_INVALID|	Daemon version number is invalid
8310	|GIZ_SDK_PHONE_NOT_CONNECT_TO_SOFTAP_SSID|	The phone is not connected to a Soft AP hotspot
8311	|GIZ_SDK_DEVICE_CONFIG_SSID_NOT_MATCHED|	The phone hotspot does not match the router SSID to be configured 
8312	|GIZ_SDK_NOT_IN_SOFTAPMODE|	Device is not in SoftAP mode
8313	|GIZ_SDK_CONFIG_NO_AVAILABLE_WIFI|	Wi-Fi is unavailable when configuring device
8314	|GIZ_SDK_RAW_DATA_TRANSMIT|	Indicating that the device reports data via transparent transmission
8315	|GIZ_SDK_PRODUCT_IS_DOWNLOADING|	Downloading device product definition
8316	|GIZ_SDK_START_SUCCESS|	SDK started successfully
10003	|GIZ_SITE_PRODUCTKEY_INVALID|	Product identifier is invalid
10010	|GIZ_SITE_DATAPOINTS_NOT_DEFINED|	Data Point not defined
10011	|GIZ_SITE_DATAPOINTS_NOT_MALFORME|	Data Point exception

