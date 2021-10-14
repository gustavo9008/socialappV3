import { MongoClient } from "mongodb";
import { hash } from "bcryptjs";
import User from "../../../models/user";
// import Profile from "../../../models/profile";
import dbConnect from "../../../middleware/mongodb";

async function signUpHandler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    await dbConnect();
    //Getting email and password from body
    const { email, name, password } = req.body;
    //Validate
    if (!email || !email.includes("@") || !password) {
      res.status(422).json({ message: "Invalid Data" });
      return;
    }
    //===== color pick functions =====
    function generateRandomColors(num) {
      // make an array
      var arr = [];
      // repeat num times
      for (var i = 0; i < num; i++) {
        // get random color and push into arr
        arr.push(randomColor());
      }
      // return that array
      return arr;
    }
    function randomColor() {
      // pick a "red" fromm 0-255
      let r = Math.floor(Math.random() * 256);
      // pick a "green" fromm 0-255
      let g = Math.floor(Math.random() * 256);
      // pick a "blue" fromm 0-255
      let b = Math.floor(Math.random() * 256);
      return "rgb(" + r + ", " + g + ", " + b + ")";
    } //==========

    let newcolors = generateRandomColors(3);

    let profileRegistered = false;
    let hashPass = await hash(password, 12);

    const newProfile = {
      about: "",
      image: {
        url: "",
        filename: "",
        genericPic: newcolors,
      },
      location: "",
      links: {
        personalWebsite: "",
        instagram: "",
        twitter: "",
        youtube: "",
        linkedin: "",
      },
      posts: [],
      readingList: [],
      comments: [],
      commentReplies: [],
    };

    const newUser = new User({
      name: name,
      email: email,
      password: hashPass,
      profile: newProfile,
    });

    const usercreated = await newUser.save();
    // console.log(usercreated);
    //Send success response
    res.status(201).json(usercreated);
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}

export default signUpHandler;
