'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// var axios = require('axios');

const Location = require('./model/location');
const Remember = require('./model/remember');
const mongoose = require('mongoose');
const db = require('./keys').mongoURI;

var bodyParser = require('body-parser');

const axios = require('axios');
 
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
  const PSID = req.body.events[0].source.userId
  Remember.findOne({
    id: req.body.events[0].source.userId
    
  }, function(err,result) {
    if(err) {
      return next(err);
    }else {
      // console.log("remember"+result)
     if (result === null) {
      var data = new Remember({
        id: PSID,
        username: req.body.events[0].message.text 
        
      });
      data.save(function(error) {
        if (error) {
          return error;
        } else {
          console.log(data)
          res.json(data)
          axios
              .post(
                `https://api.line.me/v2/bot/message/push`,
                {
                  to: PSID,
                  messages: [
                      {
                        type: `text`,
                        text: `คุณ `+req.body.events[0].message.text+` ได้ลงทะเบียบสำเร็จแล้ว`,
                      }
                    ]
                },
                {
                  headers: {
                    Authorization: `Bearer ${"hh+dn7m5EEUYGCulsc1dyRNDMAnYJ1RzHnrSseDLqUAv9NhY820C83Kl1p+lMFFh/f1aN34134ei1ts9XEMkcDjHAitagI4LJNhE1PdHQduzEgxQxkfGQ0GsLzT13ZcAG2v6N8PFzPn0D7VPXQByaAdB04t89/1O/w1cDnyilFU="}`,
                  },
                }
              )
              .then(function (response) {
                console.log("success")
              })
              .catch(function (errors) {
                console.log(errors)
              })
        }
      });
     }
      else if (req.body.events[0].message.text === 'Check in') {
      axios
    .post(
      `https://api.line.me/v2/bot/message/push`,
      {
        to: PSID,
        messages: [
            {
              type: `text`,
              text: `Please send me your location!`,
              quickReply: {
                items: [
                  {
                    type: "action",
                    action: {
                      type: "location",
                      label: "Send Location"
                    }
                  }
                ]
              }
            }
          ]
      },
      {
        headers: {
          Authorization: `Bearer ${"hh+dn7m5EEUYGCulsc1dyRNDMAnYJ1RzHnrSseDLqUAv9NhY820C83Kl1p+lMFFh/f1aN34134ei1ts9XEMkcDjHAitagI4LJNhE1PdHQduzEgxQxkfGQ0GsLzT13ZcAG2v6N8PFzPn0D7VPXQByaAdB04t89/1O/w1cDnyilFU="}`,
        },
      }
    )
    .then(function (response) {
      console.log(response)
      var datalocation = new Location({
          id: PSID,
          address: req.body.events[0].message.address, 
          latitude: req.body.events[0].message.latitude, 
          longitude: req.body.events[0].message.longitude
        });
        datalocation.save(function(errors) {
          if (errors) {
            return errors;
          } else {
            console.log(datalocation)
            res.json(datalocation)
          }
        });
    })
    .catch(function (error) {
      console.log("error txt")
    })
     }
    }
  }
  
  )
  
  // const PSID = req.body.events[0].source.userId

    // if(req.body.events[0].message.text === 'Check in last day') {
    //   console.log ('Hello')
     
    // }else if (req.body.events[0].message.text === 'Check in') {
    // axios
    //   .post(
    //     `https://api.line.me/v2/bot/message/push`,
    //     {
    //       to: PSID,
    //       messages: [
    //           {
    //             type: `text`,
    //             text: `Please send me your location!`,
    //             quickReply: {
    //               items: [
    //                 {
    //                   type: "action",
    //                   action: {
    //                     type: "location",
    //                     label: "Send Location"
    //                   }
    //                 }
    //               ]
    //             }
    //           }
    //         ]
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${"hh+dn7m5EEUYGCulsc1dyRNDMAnYJ1RzHnrSseDLqUAv9NhY820C83Kl1p+lMFFh/f1aN34134ei1ts9XEMkcDjHAitagI4LJNhE1PdHQduzEgxQxkfGQ0GsLzT13ZcAG2v6N8PFzPn0D7VPXQByaAdB04t89/1O/w1cDnyilFU="}`,
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     // console.log("send txt success ")
    //     var data = new Location({
    //         id: req.body.events[0].source.userId,
    //         address: req.body.events[0].message.address, 
    //         latitude: req.body.events[0].message.latitude, 
    //         longitude: req.body.events[0].message.longitude
    //       });
    //       data.save(function(err) {
    //         if (err) {
    //           return err;
    //         } else {
    //           console.log(data)
    //           res.json(data)
    //         }
    //       });
    //   })
    //   .catch(function (error) {
    //     console.log("error txt")
    //   })

    // }

});


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



  