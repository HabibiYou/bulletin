const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const database = admin.database();


exports.scheduledFunction = functions.pubsub.schedule('0 1 * * *').onRun((context) => {
    var thirtyDays = new Date();
    thirtyDays.setDate(thirtyDays.getDate() - 5);

    var updates = {};
    let del_ref = database.ref().orderByChild("dateCreated");
    del_ref.once('value', (snapshot) => {
        snapshot.forEach((child) => {
            if (child.val().dateCreated < thirtyDays) {
                updates[child.key] = null;
            }
        })
    }).then(() => {
        database.ref().update(updates);
    });



    return null;
});
