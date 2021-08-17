import { MongoClient } from "mongodb";
import { hash } from "bcryptjs";
import User from "../../../models/user";
import Profile from "../../../models/profile";
import connectDB from "../../../middleware/mongodb";

async function signUpHandler(req, res) {
  await dbConnect();
  //Only POST mothod is accepted
  if (req.method === "POST") {
    //Getting email and password from body
    const { email, name, password } = req.body;
    console.log(req.body);
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
    //Connect with database
    // const client = await MongoClient.connect(process.env.MONGODB_LOCAL_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    // const db = client.db(process.env.DB_NAME);
    // const usersCollection = db.collection("users");
    // //Check existing
    // const checkExisting = await usersCollection.findOne({ email: email });
    // //Send error response if duplicate user is found
    // if (checkExisting) {
    //   res.status(422).json({ message: "User already exists" });
    //   client.close();
    //   return;
    // }

    //Hash password
    // const status = await usersCollection.insertOne({
    //   email,
    //   name,
    //   password: await hash(password, 12),
    //   profile: "this is my profile",
    // });
    let newcolors = generateRandomColors(3);
    // let colorCircle = `background-color: ${newcolors[0]};
    // background-image: linear-gradient(225deg, ${newcolors[0]} 0%, ${newcolors[1]} 50%, ${newcolors[2]} 100%);`;
    // console.log(colorCircle);
    let profileRegistered = false;
    let hashPass = await hash(password, 12);

    // const newProfile = new Profile({
    //   about: '',
    //   image: {
    //     url: "",
    //     filename: "",
    //     genericPic: newcolors,
    //   },
    //   location:"",
    //   links:{
    //     personalWebsite: "",
    //       instagram: "",
    //       twitter: "",
    //       youtube: "",
    //       linkedin: "",
    //   },
    // })

    const newUser = new User({
      name: name,
      email: email,
      password: hashPass,
    });
    console.log(newUser);

    const usercreated = await newUser.save();

    //Send success response
    res.status(201).json(usercreated);
    //Close DB connection
    // client.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}

export default signUpHandler;
