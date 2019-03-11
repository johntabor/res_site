const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
admin.initializeApp(functions.config().firebase);
const db = admin.database().ref();
const st = admin.storage().bucket('rutrep-27e19.appspot.com');
const Busboy = require('busboy')

const os = require('os')
const fs = require('fs')
const path = require('path')

const app = express();



app.post('/x', (req,res) => {
  
})

//app.listen(3132, 'localhost', () => console.log('running...'))
exports.internal = functions.https.onRequest(app);