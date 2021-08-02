import { getSession } from "next-auth/client";
import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  // console.log(req.body);

  const createNewPost = async () => {
    if (req.method === "POST") {
      const { title, image, content } = req.body;
      console.log(title, image, content);

      //Connect with database
      const client = await MongoClient.connect(process.env.MONGODB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const db = client.db(process.env.DB_NAME);
      const postsCollection = db.collection("blogs");
      //Check existing
      // const checkExisting = await postsCollection.findOne({ email: email });
      //Send error response if duplicate user is found
      // if (checkExisting) {
      //   res.status(422).json({ message: "User already exists" });
      //   client.close();
      //   return;
      // }
      //Hash password
      const status = await postsCollection.insertOne({
        title,
        image: [],
        body: content,
        imageUrl: image,
        created: new Date(),
      });
      //Send success response
      res.status(201).json({ message: "post created", ...status });
      //Close DB connection
      client.close();
    } else {
      //Response for other than POST method
      res.status(500).json({ message: "Route not valid" });
    }
  };

  const session = await getSession({ req });
  if (session) {
    // Signed in
    await createNewPost();
    console.log("Session", JSON.stringify(session, null, 2));
  } else {
    // Not Signed in
    res.status(401).json({ message: "oh no you must be logged in" });
  }
  res.end();
};

export default handler;
