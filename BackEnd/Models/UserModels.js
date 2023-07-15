const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default:""
    },
    email: {
      type: String,
      trim: true,
      required: true,
      default:""
      
    },
    pass: {
      type: String,
      required: true,
      trim: true,
      default:""

    },
    phone: {
      type: String,
      trim: true,
      default:"",

      maxLength: [10, "Phone Number Should be atleat 10 number"],
    },
    flag: {
      type: Number,
      default: 1,
      default:""

    },
    orders: {
      type: String,
      default:""

    },
    ans: {
      default:"123",

      type: String,
    },
    address: {
      type: String,
      default: "",
    },
    role: {
      type: Number,
      default: 0,
    },
    photo:{
      type:String
    }
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

module.exports = User;
