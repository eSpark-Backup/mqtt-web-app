# MQTT Application

Some coantent About Application

## How to Run Application

At first Clone project in to you pc by using git clone command or use

### `git clone repo url `

or you can downlaod it for github drecly with url [Direct Downlaod link](http://localhost:3000)

then open command prompt in the folder by typing `cmd` in top navigation bar

then type `npm i` and press `Enter` to install `Node Modeules` in project after installing modules In the project directory, you can run:

### `npm start`

after
After startinng completion you can runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## How to Run MQTT Blocker (MQTTX) Localy/Cloud

MQTT X is available for download and installation at the following resource sites:

### Download Broker

1- MQTTX is available for download and installation at MQTTX official website home page
 or you can directly use it on there cloud plateform if you want
![alt text](./src/assets/screenshots/mqttx-website.png?raw=true)

 install it according to your [Operating System](https://mqttx.app/docs/downloading-and-installation)

![alt text](./src/assets/screenshots/download-place.png?raw=true)

2- Install app

![alt text](./src/assets/screenshots/install-1.png?raw=true)

![alt text](./src/assets/screenshots/install-2.png?raw=true)

### Create Connection

3- after instalation run app, 

![alt text](./src/assets/screenshots/mqttx-dashbaord.png?raw=true)

4- create Connection using these details
- Name: MQTT Test (Any Name)
- Client ID: (Auto Gernerate)
- Host: wss:// => broker.emqx.io
- Port: 8084 
- Path: /mqttx
- adn click on Conenct Button (top right)

![alt text](./src/assets/screenshots/connection-wss.png?raw=true)

Connection Sucessfully created.
![alt text](./src/assets/screenshots/connection-done.png?raw=true)

### Make Subscriber for Topic

5- Click on New Subscribe Button
![alt text](./src/assets/screenshots/new-subs.png?raw=true)

6- Create Subscribtion using this data
- Topic: testtopic/meter 
- Leave other detasil as they are
![alt text](./src/assets/screenshots/creating-new-sub.png?raw=true)

Subscribtion Sucessfully created.
![alt text](./src/assets/screenshots/subs-created.png?raw=true)

### Send Payload to Topic


7- Click on the created topic and chnage datatype to `JSON`
and send sample payload for initial Valuess, shared Below
![alt text](./src/assets/screenshots/updating-data-payload.png?raw=true)

##  Sample Script (JSON): 

```
{
	"meter_data": [{
			"meter_id": 1,
			"kwh_reading": 125.36,
			"voltage": 220,
			"current": 6.36,
			"frequency": 50
		},
		{
			"meter_id": 2,
			"kwh_reading": 125.36,
			"voltage": 220,
			"current": 6.36,
			"frequency": 50
		},
		{
			"meter_id": 3,
			"kwh_reading": 125.36,
			"voltage": 220,
			"current": 6.36,
			"frequency": 50
		},
		{
			"meter_id": 4,
			"kwh_reading": 125.36,
			"voltage": 220,
			"current": 6.36,
			"frequency": 50
		}
	]
}
```


### verify Payload & Set Trigger & Subscribtion

- go to Application Dashboard to see lates changes.

![alt text](./src/assets/screenshots/dashboard.png?raw=true)

After verifing data value changes,
click on setting to set trigger detasil, this will be as according:
- Subscribtion: Number or max Subscribtion
- Trigger Point: Subs Max Threshold
- SMS Number: Phone Number (whwrw you want to send Notification on Max Value Reach)

![alt text](./src/assets/screenshots/modifing-data-trigger.png?raw=true)

### verify Trigger 

- Go back to MQTT Client and pass modify existing payload and send vales more then trigger Point,
you will recive SMS after each 30 seconds til you dont update payload to values les then Trigger Point

## Restrictions

thet mat be some Restrictions with the application & payload which are as follow:

- For the security reasons, we had added some limiztation into ecript to fetch & approve on above mention json script values and do not entertain any other type of script formate & values

## SMS Api (Sparrow SMS) Service

For Sms service we had used Sparrow SMS & Viber Api service, It provides SMS Gateway connectivity with the telecom operators to send Sms using apis.

### How Apis Work
`Documnetaion Link :` [https://docs.sparrowsms.com/](https://docs.sparrowsms.com/) for more information.

`API URL :` [api.sparrowsms.com/v2](api.sparrowsms.com/v2) to test api.

`End points : `
- Push SMS (outgoing): to send automated Sms.
- Credit: To check Remining Credit.
- Pull SMS : [https://docs.sparrowsms.com/sms/incoming/](https://docs.sparrowsms.com/sms/incoming/)

### Push SMS (outgoing) : 
Send SMS / Outgoing / Push / MT (Mobile Terminated)
Supported HTTP request methods:

    GET
    POST

Method

    /sms/

Parameters
Mandatory Fields


    token : Token generated from our website.
    from  : It should be the identity provided to you.
    to    : Comma Separated 10-digit mobile numbers.
    text  : SMS Message to be sent.

Example

    POST: api.sparrowsms.com/v2/sms/?api=PROVIDED-API-KEY&to=SECRET-KEY&to=PHONE-NUMBER&SMS

Optional Fields


Responses
Valid Response
Status Code: 200

Response Message:


    {
        "count": number_of_sms_sent, 
        "response_code": 200,
        "response": "number_of_sms_sent mesages has been queued for delivery"
    }

Invalid Response
Status Code: 403

Error Messages:


    {"response_code":1000,"response":"A required field is missing"}
    {"response_code":1001,"response":"Invalid IP Address"}
    {"response_code":1002,"response":"Invalid Token"}
    {"response_code":1003,"response":"Account Inactive"}
    {"response_code":1004,"response":"Account Inactive"}
    {"response_code":1005,"response":"Account has been expired"}
    {"response_code":1006,"response":"Account has been expired"}
    {"response_code":1007,"response":"Invalid Receiver"}
    {"response_code":1008,"response":"Invalid Sender"}
    {"response_code":1010,"response":"Text cannot be empty"}
    {"response_code":1011,"response":"No valid receiver"}
    {"response_code":1012,"response":"No Credits Available"}
    {"response_code":1013,"response":"Insufficient Credits"}

### Credits
It can be used to know about the available credits, consumed credits.

Supported HTTP request method:

    GET

Method

    /credit/

Parameters

    token : Token generated from our website.


Example

    GET: api.sparrowsms.com/v2/credit/?api=PROVIDED-API-KEY

Responses
Valid Response
Status Code: 200

Response Message:


    {
        "credits_available" : <credits-available>,
        "credits_consumed"  : <credits-consumed>,
        "response_code"     : 200
    }

Invalid Response
Status Code: 403

Error Messages:


    {"response_code":1001,"response":"Invalid IP Address"}
    {"response_code":1002,"response":"Invalid Token"}
    {"response_code":1003,"response":"Account Inactive"}
    {"response_code":1004,"response":"Account Inactive"}
    {"response_code":1005,"response":"Account has been expired"}
    {"response_code":1006,"response":"Account has been expired"}
    {"response_code":1012,"response":"No Credits Available"}

### Receive SMS / Incoming / Pull / MO (Mobile Originated)

Shortcode is four digit number to which user can send SMS from any telecom. Benefits of Shortcodes are:
1. Easy to remember
2. Provides direct connectivity to Telecom
3. Shortcode can have different tarrifs like (Rs. 1-5)

Keyword
First word of SMS sent by user is Keyword, it is used to identify the action / service requested.

Sub Keyword
Second Keyword of SMS sent by user is called Sub Keyword. Its optional and depends upon the campaign

Parameters
Settings


    URL           : Public URL where the incoming SMS has to be forwarded.
    Keyword       : Keyword that has to be forwarded.
    Shortcode     : Shortcode to which, user has to send SMS.
    Default Reply : Default response that has to be sent to user, 
                    incase request to url fail.

Request


    GET request is sent to the URL provided with following arguments:

    from    : Subscribers number sending SMS.
    to      : Shortcode to which subscriber has sent SMS.
    text    : Complete SMS sent by user.
    keyword : Keyword of SMS sent.


Response
URL must process the request and send text response of maximum 160 characters with status code 200 or 202. Incase of any other response code, default reply will be sent to user as SMS reply.