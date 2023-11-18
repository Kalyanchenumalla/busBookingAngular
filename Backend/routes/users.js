const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Bus = require('../models/bus')

// Register
router.post('/register', (req, res, next) => {
let userData = req.body
let user = new User(userData)
user.save((error, registeredUser)=> {
  if(error) {
    res.json({success: false, msg: 'Email already exists'});
  } else {
    res.json({success:true, msg:"User registered"})
  }
})
});

// Login
router.post('/login', (req, res) => {
let userData = req.body 
User.findOne({email: userData.email}, (error, user)=> {
  if(error) {
    console.log(error);
  } else {
    if(!user) {
      res.status(401).send('Invalid email')
    } else 
    if (user.password !== userData.password) {
      res.json({success:false, msg:"Incorrect password"})
    } else {
      let payload = { subject: user._id }
      let token = jwt.sign(payload, 'secretKey')
      res.json({success:true, msg:"User Logged in", token})
    }
  }
})
});


//bus
router.post('/bus', function(req, res) {
  let note = new Bus(req.body)
  note.save(function(err, note) {
      if(err) {
          return res.status(400).json(err)
      }
      res.status(200).json(note)
  })
})

router.get('/getBus', function (req, res) {
  Bus.find({}, (err, data) => {
      if(err) {
          res.json({success: false, message: err});
      } else {
          if(!data) {
              res.json({ success:false, message:'No buses found'});
          } else {
              res.json({success:true, data: data}); 
          }
      }
  })
})

//NO buses found
router.post('/nobuses', verifyToken, (req, res)=> {
  Bus.find({from:req.body.from, to:req.body.to, travelDate:req.body.travelDate}, (err, Bus)=> {
    if(err) {
      res.json({success:false, message:err});
    } else {
      if(Bus<=0){
        res.json({success: false, message:"☹ 🚍No Buses found on specified date."})
      }
      else {
        res.json(Bus)
      }
    }
  })
})

//bus updates
router.post('/bookedSeats', (req, res, next)=> {
  console.log(req.body.seats)
  Bus.findByIdAndUpdate(
    { _id: req.body.id},
    { $push: { bookedSeats: { $each: req.body.seats}}},
    )
    .then((result)=> {
      res.status(201).json({
      message: "Seats Booked",
    });
  })
  .catch((err)=> {
    console.log(err)
    res.status(500).json({
      message:"Error in Booking",
    })
  })
})

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
  return res.status(401).send("Unauthorized request");
   }
  let token = req.headers.authorization;
  console.log(token);
  if (token === null) {
  return res.status(401).send("Unauthorized request");
   }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
  return res.status(401).send("Unauthorized request");
   }
  req.userId = payload.subject;
  next();
   }
module.exports = router;