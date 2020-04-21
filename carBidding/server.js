//Install express server
const express = require('express');
const path = require('path');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const vapidKeys = {
    "publicKey": "BLzVD3cpcRqBYbujq25JR_J5EbHkL_7PM_BHN7AlqOomchns1Oq5gyO0875hCnNw1fQ-cLSXoGZQqFoz9WtOMZs",
    "privateKey": "a0iA5t43rc4w_ebbStmUJvnElStQ6Ke3sUvqHXYf6V0"
}


const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/carBidding'));

// app.get('/*', function (req, res) {

//     res.sendFile(path.join(__dirname + '/dist/carBidding/index.html'));
// });

app.use(bodyParser.json());

// Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);

webpush.setVapidDetails(
    'mailto:gitaram.kanawade@fulcrumdigital.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);


/***** */
app.route('/api/newsletter').post(sendNewsletter);
app.route('/api/notifications').post(addPushSubscriber);



const allSubscriptions = [];



function sendNewsletter(req, res) {

    console.log('Total subscriptions', allSubscriptions.length);

    const notificationPayload = {
        "notification": {
            "title": "Tata ",
            "body": "Tata Nexon Electric launch!",
            "icon": "assets/TaTa_N.jpg",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    };

    Promise.all(allSubscriptions.map(sub => webpush.sendNotification(
        sub, JSON.stringify(notificationPayload))))
        .then(() => res.status(200).json({ message: 'Newsletter sent successfully.',allSubscriptions:allSubscriptions }))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
}

function addWelcomePushSubscriber(sub) {
 

    const notificationPayload = {
        "notification": {
            "title": "Nice Job! Notifications are on now for CarBidding ",
            "body": "Change this at any time from you browser notification permissions setting",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
           
        }
    };

    Promise.all(webpush.sendNotification(
        sub, JSON.stringify(notificationPayload)))
        .then(() => console.log('sent'))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
           
        });
}

function addPushSubscriber(req, res) {

    const sub = req.body;
   
    allSubscriptions.push(sub);    
    addWelcomePushSubscriber(sub);  
    res.status(200).json({ message: "Subscription added successfully.",allSubscriptions:allSubscriptions });
}

app.set('port', process.env.PORT || 8080);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });