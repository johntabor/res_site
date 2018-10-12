const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
//const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mailer = require('nodemailer')
const request = require('request')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', './views');
app.set('view engine', 'pug');
//app.use(cookieParser());
//app.use(auth);
admin.initializeApp(functions.config().firebase);
const db = admin.database().ref();
//const st = storage.bucket('rutrep-27e19.appspot.com');

app.get('/in', (req, res) => {
    //db.child(req.params.id).once("value", snap => {
       // 
    //});
    res.render('portal');
})

app.get('/subscribe/:email', (req,res) => {

    res.set('Access-Control-Allow-Origin', '*')
    let post = {"email_address": req.params.email, "status": "subscribed"}
    request.post({
        url: 'https://us19.api.mailchimp.com/3.0/lists/e7#######a7/members',
        auth: {
            user: 'rocky',
            pass: '###############################'
        },
        headers: {
            'content-type': 'application/json; charset=UTF-8'
        },
        json: post
    }, function(err, httpR, body) {
        if(err === 'null')
            res.status(201)
        else
            res.send(err)
        })
})

app.get('/x/new/:email/:pitch', (req,res) => {

    res.set('Access-Control-Allow-Origin', '*')
    let transporter = mailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
          user: 'hello@squantofood.com',
          pass: 'pomme528'
        }
      })
      let mailOptions = {
        from: '"Form Monkey" <hello@squantofood.com>',
        to: 'nicholas.lusskin@rutgers.edu',
        subject: '🚀 New RESx Submission',
        html: '<h2>New Submission:</h2><br><br>' +
          '<p><b>Reply To: </b>' + req.params.email + '<br><br>'+
          '<p><b>Pitch: </b>' + req.params.pitch + '<br><br>'
      }
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error(error)
          res.sendStatus(500)
        }
        else {
          console.log('Email sent: ' + info.response)
          res.sendStatus(201)
        }
      })

})

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