const mongoose = require("mongoose");

let mySchema = mongoose.Schema;

//define schema
let mySignupSchema = new mySchema({
    name: { type: String, required: [true, "Name is required.."] },
    email: { type: String, required: [true, "Email is required.."] },
    password: { type: String, required: [true, "Password is required.."] },
    phoneNumber: { type: String, required: [true, "Phone number is required.."],max:10},
    age: { type: Number, required: [true, "Age is required.."] },
    gender: { type: String, required: [true, "Gender is required.."] },
    address: { type: String, required: [true, "Address is required.."] },
});

const tableName = "Signup";

let signupData = mongoose.model(tableName, mySignupSchema);

module.exports = signupData;
