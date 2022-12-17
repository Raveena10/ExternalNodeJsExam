const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const router = require("./routes/signup");
const postRouter = require("./routes/postsRoutes")
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);
app.use("/api/posts",postRouter);

//DATA_BASE COLLECTION
mongoose.connect("mongodb://127.0.0.1:27017/User");
mongoose.connection.on("connected", () => {
  console.log("CONNECTED TO DATA BASE ");
});
mongoose.connection.on("error", (err) => {
  console.log("oops! error occured", err);
});

// listen port for server
const port = process.env.PORT || 8001;
app.listen(port, () => console.log(`Listening on port ${port}...`));


module.exports = app;
