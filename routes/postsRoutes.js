const express = require("express");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

const postModel = require("../models/posts");
let router = express.Router();

router.post("/create", async (req, res) => {
  const postData = req.body;
  const posts = new postModel({
    title: postData.title,
    description: postData.description,
    author: postData.author,
    datetime: postData.datetime,
  });
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(409).json({ data: "Token not exist" });
  }
  const token = auth.replace("Bearer ", "");
  jwt.verify(token, "login-token", async function (err, decoded) {
    // err
    console.log("err", err);
    // decoded undefined
    console.log("decoded", decoded);
    if (err) {
      return res.status(409).json({ data: err });
    } else {
      posts
        .save()
        .then((data) => {
          return res.status(200).send({ message: "Post Saved.." });
        })
        .catch((e) => {
          return res.status(201).send({ message: "Error : ", e });
        });
    }
  });
});

router.get("/view", (req, res) => {
  postModel
    .find()
    .then((data) => {
      if (data.length > 0) return res.send(data);
      else return res.send({ message: "No Data Found" });
    })
    .catch((e) => {
      return res.send({ message: e });
    });
});

router.post("/like/:id", async (req, res) => {
  //Get id from the reqst params
  const id = req.params.id;
  var isValid = mongoose.Types.ObjectId.isValid(id);
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(409).json({ data: "Token not exist" });
  }
  const token = auth.replace("Bearer ", "");
  jwt.verify(token, "login-token", async function (err, decoded) {
    // err
    console.log("error", err);
    if (err) {
      return res.status(409).json({ data: err });
    } else {
      if (isValid) {
        const postexists = await postModel.findById(id);
        if (postexists) {
          const updatedData = req.body;
          const updatePost = await postModel.findOneAndUpdate(
            { _id: id },
            {liked:req.body.liked},
            { new: true }
          );
          if (updatePost) {
            return res
              .status(200)
              .send({ message: `Liked For Id: ${id}` });
          } else {
            return res
              .status(409)
              .send({ message: `Data Not Liked For Id: ${id}` });
          }
        } else {
          return res
            .status(409)
            .send({ message: `Data Not Found For this Id: ${id}` });
        }
      } else {
        return res.status(409).send({ message: `Invalid Id: ${id}` });
      }
    }
  });
});

module.exports = router;
