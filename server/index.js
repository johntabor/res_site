const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
//const cookieParser = require('cookie-parser')
//const bodyParser = require('body-parser')
const request = require('request')
const env = require('./env.js') //aka 'KEYS.js'
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(env.em_key);

const os = require('os')
const fs = require('fs')
const path = require('path')
const Busboy = require('busboy')

const app = express()

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
//app.set('views', './views');
//app.set('view engine', 'pug');
//app.use(cookieParser());
//app.use(auth);
app.use((r,s,n) => { s.set('Access-Control-Allow-Origin', '*'); n(); })
admin.initializeApp(functions.config().firebase);
const db = admin.database().ref();
const st = admin.storage().bucket('rutrep-27e19.appspot.com');

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
        url: `https://us19.api.mailchimp.com/3.0/lists/${env.mc_listid}/members`,
        auth: {
            user: env.mc_user,
            pass: env.mc_apikey
        },
        headers: {
            'content-type': 'application/json; charset=UTF-8'
        },
        json: post
    }, function(err, httpR, body) {
        if(err === 'null')
            res.sendStatus(201)
        else
            res.send(err)
        })
})

app.get('/test', (req,res) => {
    res.send(os.tmpdir()+"/resxDecks/")
})

app.post('/x/new/:email/:pitch', upload, (req,res,next) => {
    const msg = {
        to: env.em_addr,
        from: env.em_faddr,
        subject: '🚀 New RESx Submission',
        text: 'New Pitch Submission',
        html: '<h2>New Submission:</h2><br><br>' +
            '<p><b>Reply To: </b>' + req.params.email + '<br><br>'+
            '<p><b>Pitch: </b>' + req.params.pitch + '<br><br>'+
            '<p><b>Deck: </b>' + null
    }
    sgMail.send(msg).then(() => {
        res.send(201)
    }).catch((e) => { 
        res.sendStatus(500)
        console.error(e)
    }) 
})


function auth(req, res, next) {
    const tok = req.cookies.sqs;
    const uid = req.cookies.uid;
    admin.auth().verifyIdToken(tok).then( rTok => {
        if(rTok.uid == uid) {
            res.uid = uid
            next()
        }
        else
            res.render('auth');
    }).catch(function(err) {
        console.error(err);
        res.render('auth');
    });
}

function upload(req,res,next) {
    const busboy = new Busboy({headers: req.headers})
    var uploads = {}
    var fileWrites = []
    
    busboy.on('file', (fieldname, file, filename) => {
        
        console.log(`Processed file ${filename}`)
        const filepath = path.join(os.tmpdir(), filename)

        uploads[fieldname] = filepath

        const writeStream = fs.createWriteStream(filepath)
        file.pipe(writeStream)

        const promise = new Promise((resolve, reject) => {
        file.on('end', () => {
            writeStream.end()
            })
            writeStream.on('finish', resolve)
            writeStream.on('error', reject)
        })
        fileWrites.push(promise)
    })

        busboy.on('finish', () => {
            Promise.all(fileWrites).then(() => {
            for (const name in uploads) {
                const file = uploads[name]
                st.upload(file+"", function(err, file, ress) {
                    if(err) {
                        res.send(err)
                    }
                    else {
                        next()
                    }
                })
                fs.unlinkSync(file)
            }
        })
  })

  busboy.end(req.rawBody)
}

exports.internal = functions.https.onRequest(app);