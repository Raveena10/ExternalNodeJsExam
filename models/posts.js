const mongoose = require("mongoose");

let mySchema = mongoose.Schema;

//define schema
let myPostSchema = new mySchema({
    title: { type: String, required: [true, "Title is required.."] },
    description: { type: String, required: [true, "Description is required.."] },
    author: { type: String, required: [true, "Author is required.."] },
    datetime: { type: String, required: [true, "DateTime is required.."]},
    liked:{type: String}
});

const tableName = "Post";

let signupData = mongoose.model(tableName, myPostSchema);

module.exports = signupData;
