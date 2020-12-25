'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// var axios = require('axios');

const Location = require('./model/location');
const mongoose = require('mongoose');
const db = require('./keys').mongoURI;

var bodyParser = require('body-parser');

// const axios = require('axios');
 
var app = express()
 
app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

// config Line
const config = {
  channelAccessToken:"hh+dn7m5EEUYGCulsc1dyRNDMAnYJ1RzHnrSseDLqUAv9NhY820C83Kl1p+lMFFh/f1aN34134ei1ts9XEMkcDjHAitagI4LJNhE1PdHQduzEgxQxkfGQ0GsLzT13ZcAG2v6N8PFzPn0D7VPXQByaAdB04t89/1O/w1cDnyilFU=",
  channelSecret:"1307039a0d7e8b2c521ad6da465d2c1a",
};
const client = new line.Client(config);


//POST
app.post('/callback', (req, res) => {
  // console.log(req.body.events[0])
  res.status(200)

  //add mongoDB
  var data = new Location({
    id: req.body.events[0].message.id,
    address: req.body.events[0].message.address, 
    latitude: req.body.events[0].message.latitude, 
    longitude: req.body.events[0].message.longitude
  });
  data.save(function(err) {
    if (err) {
      return err;
    } else {
      console.log(data)
      res.json(data)
    }
  });

  // Promise
  //   .all(req.body.events.map(handleEvent))
  //   .then((result)=> res.json(result))

    // console.log(req.body.events)

});


// function sendmessage
// function handleEvent(e) {
//   if (e.type !== 'message' || e.message.type !== 'text') {
//     return Promise.resolve(null);
//   }else if (e.message.type === 'message' || e.message.text === 'Check in') {
//     const payload = {
//       type: "text",
//       text: "Hello Covid19"
//     }
//     return client.replyMessage(e.replyToken, payload);
//   }else if (e.message.type === 'message' || e.message.text === 'Check in last day') {
//     const payload2 = {
//       type: "text",
//       text: "Hello Koson"
//     }
//     return client.replyMessage(e.replyToken, payload2);
//   }
//   const echo = { type: 'text', text: e.message.text };
//   // use reply API
//   return client.replyMessage(e.replyToken, echo);
// }


// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

//mongon connect seccess 
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



  