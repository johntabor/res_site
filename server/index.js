const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', './views');
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(auth);
admin.initializeApp(functions.config().firebase);
const db = admin.database().ref();
//const st = storage.bucket('rutrep-27e19.appspot.com');

app.get('/in', (req, res) => {
    //db.child(req.params.id).once("value", snap => {
       // 
    //});
    res.render('portal');
});

function auth(req, res, next) {
    const tok = req.cookies.sqs;
    const uid = req.cookies.uid;
    admin.auth().verifyIdToken(tok).then( rTok => {
        if(rTok.uid == uid) {
            res.uid = uid;
            next();
        }
        else
            res.render('auth');
    }).catch(function(err) {
        console.error(err);
        res.render('auth');
    });
}

exports.internal = functions.https.onRequest(app);