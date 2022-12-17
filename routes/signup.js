const express = require("express");
const bcrypt = require("bcrypt")
const signupModel = require("../models/signup");
var jwt = require('jsonwebtoken');

let router = express.Router();

router.post("/signup", async(req, res) => {
  const user = req.body;
  const isemailExists=await signupModel.findOne({email:user.email})
  const isPhoneNumberExists=await signupModel.findOne({phoneNumber:user.phoneNumber})
  if(isemailExists || isPhoneNumberExists){
    return res.status(201).json({ data: "Data already exists.." });
  }
  bcrypt.hash(user.password, 10, function(err, hash) {
    // Store hash in your password DB.
    const userOne = new signupModel({
      name: user.name,
      email: user.email,
      password: hash,
      phoneNumber: user.phoneNumber,
      age: user.age,
      gender: user.gender,
      address: user.address
    });
    userOne
    .save()
    .then((data) => {
      return res.status(200).json({ data: "DATA SAVED SUCESSFULLY.." });
    })
    .catch((e) => {
      return res.status(201).json({ data: "Error : ", e });
    });
  });
});
router.post("/signin", async(req, res) => {
    const user = req.body;
    if(!user.email && !user.password){
      return res.status(201).json({ data: "Kindly fill login Details" });
    }
    const isemailExists=await signupModel.findOne({email:user.email})
    if(isemailExists){
      bcrypt.compare(user.password, isemailExists.password).then(function(result) {
        if(result == true){
          var token = jwt.sign({ _id: isemailExists._id }, 'login-token');
          return res.status(200).json({ data: "Login sucessfully.." ,token});
        }
        else{
          return res.status(400).json({ data: "Please enter correct email/password..." });
        }
    });
    }
    else{
      return res.status(400).json({ data: "Please Sign up" });
    }
});
module.exports = router;