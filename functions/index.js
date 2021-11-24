const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

function addNotificationToDb(plant) {
  db.collection('notifications')
    .doc()
    .set(JSON.parse(JSON.stringify(plant)));
}

/*exports.subscribeUser = functions.https.onCall((data, context) => {
  const token = data.token;
  const uid = context.auth.uid;
  console.log('token ', token);
  console.log('userId ', uid);

  admin
    .messaging()
    .subscribeToTopic(token, uid)
    .then((response) => {
      console.log('succesfully subscribed to topic ', response);
    })
    .catch((error) => {
      console.log(('error subscribing ', error));
    });
});*/

function addNotification(message, token) {
  const notificationMessage = {
    notification: {
      title: 'Time to water your plants ',
      body: message,
    },
    webpush: {
      notification: {
        requireInteraction: true,
        icon: '/icons/notification.png',
      },
      fcmOptions: {
        link: 'http://localhost:3000/today',
      },
    },
    // android: {},
    // apns: {},
    token: token,
  };

  console.log(notificationMessage);

  // Send a message to the device corresponding to the provided
  // registration token.

  admin
    .messaging()
    .send(notificationMessage)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
}

exports.deleteNotificationsCollection = functions.pubsub
  .schedule('every day 10:40')
  .timeZone('Europe/Stockholm')
  .onRun(  (context) => {
    db.collection('notifications').delete();
  });

exports.dummy1 = functions.pubsub
  .schedule('every 2 minutes')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will be run every 2nd minute');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;
          const userId = user.data().uid;

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '1');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
              addNotificationToDb(plant.data(), userId);
            });
            if (message !== '') {
              addNotification(message, registrationToken);
            }
          });
        });
      });

    return null;
  });

exports.dummy2 = functions.pubsub
  .schedule('every 2 minutes')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will be run every minute');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          //const registrationToken = user.data().token;
          const userId = user.data().uid;
          //const userId = user.data().uid

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '1');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
              //addNotificationToDb(plant.data(), userId)
            });

            if (message !== '') {
              addNotification(message, userId);
            }
          });
        });
      });

    return null;
  });

/*exports.everyDay = functions.pubsub
  .schedule('every day 09:00')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will be run every day at 9');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;
          console.log(registrationToken);

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '1');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
            });
            addNotification(message, registrationToken, user.data().uid);
          });
        });
      });

    return null;
  });*/

exports.everySecondDay = functions.pubsub
  .schedule('0 09 */2 * *')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will be run every second day at 9');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;
          console.log(registrationToken);

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '2');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
            });

            addNotification(message, registrationToken, user.data().uid);
          });
        });
      });

    return null;
  });

exports.everyThirdDay = functions.pubsub
  .schedule('0 09 */3 * *')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will run every third day at 9');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;
          console.log(registrationToken);

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '3');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
            });

            addNotification(message, registrationToken, user.data().uid);
          });
        });
      });

    return null;
  });

exports.everyFourthDay = functions.pubsub
  .schedule('0 09 */4 * *')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will run every fourth day at 9');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;
          console.log(registrationToken);

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '4');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
            });

            addNotification(message, registrationToken, user.data().uid);
          });
        });
      });

    return null;
  });

exports.everyWeek = functions.pubsub
  .schedule('every monday 09:00')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will run every monday day at 9');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;
          console.log(registrationToken);

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '7');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
            });

            addNotification(message, registrationToken, user.data().uid);
          });
        });
      });

    return null;
  });

exports.everyTenthDay = functions.pubsub
  .schedule('1, 10, 20, 30 of month 09:00')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will run every tenth day at 9');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;
          console.log(registrationToken);

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '10');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
            });

            addNotification(message, registrationToken, user.data().uid);
          });
        });
      });

    return null;
  });

exports.everySecondWeek = functions.pubsub
  .schedule('1st, 3rd monday of month 09:00')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will run every second monday day at 9');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;
          console.log(registrationToken);

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '14');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
            });

            addNotification(message, registrationToken, user.data().uid);
          });
        });
      });
    return null;
  });

exports.everyMonth = functions.pubsub
  .schedule('1st monday of month 09:00')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will run every 1st monday of month at 9');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;
          console.log(registrationToken);

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '30');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
            });

            addNotification(message, registrationToken, user.data().uid);
          });
        });
      });

    return null;
  });

exports.createUserDocument = functions.auth.user().onCreate((user) => {
  db.collection('users')
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(user)));
});
