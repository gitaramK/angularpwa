const express = require('express');
const path = require('path');
const webpush = require('web-push');//Requires for push notifications
const bodyParser = require('body-parser');
const fs = require('fs');

const vapidKeys = {
    "publicKey": "BLzVD3cpcRqBYbujq25JR_J5EbHkL_7PM_BHN7AlqOomchns1Oq5gyO0875hCnNw1fQ-cLSXoGZQqFoz9WtOMZs",
    "privateKey": "a0iA5t43rc4w_ebbStmUJvnElStQ6Ke3sUvqHXYf6V0"
}

const app = express();

app.use(express.static(__dirname + '/dist/carBidding'));

app.use(bodyParser.json());

/****Push notifications public and private keys */
webpush.setVapidDetails(
    'mailto:gitaram.kanawade@fulcrumdigital.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);


/****APIS for notifications* */
app.route('/api/newsletter').post(sendNewsletter);
app.route('/api/notifications').post(addPushSubscriber);
app.route('/api/getcar').post(getCars);
app.route('/api/updateBid').post(updateBid);

const allSubscriptions = [];

/*****Broadcast the notification to multiple subscriber */
function sendNewsletter(req, res) {
    const notificationPayload = {
        "notification": {
            "title": "Tata ",
            "body": "Tata Nexon EV is an electric 5 seater SUV car launched at a base price of Rs. 13.99 lakh in January 2020 by Tata in India. Nexon EV also comes with automatic transmission.",
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
        .then(() => res.status(200).json({ message: 'Newsletter sent successfully.', allSubscriptions: allSubscriptions }))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
}
/*****Add subscriber and send welcome notifications */
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

/*****Add subscriber when it allows notifications */
function addPushSubscriber(req, res) {
    const sub = req.body;
    allSubscriptions.push(sub);
    addWelcomePushSubscriber(sub);
    res.status(200).json({ message: "Subscription added successfully.", allSubscriptions: allSubscriptions });
}

/*****Get car Details*/
function getCars(req, res) {
    var obj;
    fs.readFile('car.json', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      res.status(200).json(obj);
    });
    
}

/*****Update Bid Valie */
function updateBid(req, res) {
    var obj;
    const request = req.body;
    fs.readFile('car.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        obj.forEach((x,index) => {
            // If the bookID is the one we are looking for, set it as null
            if (x.carId === request.carId) {
                obj[index].updatedBid = request.updatedBid;
                fs.writeFile('car.json',JSON.stringify(obj), function (err, data) {
                    if (err) throw err;
                   // obj = JSON.parse(data);
                    res.status(200).json({message: "Updated Successfully",json:obj});
                  });
                 
            }

          });
      
    });
}



app.set('port', process.env.PORT || 8081);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});