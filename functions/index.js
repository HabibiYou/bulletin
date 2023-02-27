// const functions = require("firebase-functions");
// const admin = require('firebase-admin');
// admin.initializeApp();
// const database = admin.database();


// exports.scheduledFunction = functions.pubsub.schedule('* * * * *').onRun((context) => {
//     var thirtyDays = new Date();
//     thirtyDays.setDate(thirtyDays.getDate()-30);
//     const sixtyDays= new Date();
//     sixtyDays.setDate(sixtyDays.getDate()-60);

//     var updates = {};
//     let del_ref = database.ref().orderByChild("dateCreated").startAt(thirtyDays.getTime()).endAt(sixtyDays.getTime());
//     del_ref.once('value' ,(snapshot)=> {
//         snapshot.forEach((child)=>{
//             updates[child.key] =null;
//         })
//     }).then(()=>{
//         console.log("UPDATES HERE",updates);
//         database.ref().update(updates);
//         console.log('This will be run every 1 minute!');
//         console.log("DRR",del_ref);
//         console.log("dbRRRR",database.ref());
//     });
//     // del_ref.remove();


    
//     return null;
//   });
