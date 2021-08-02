import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";
import jwt from "next-auth/jwt";
async (req, res) => {
  const token = await jwt.getToken({ req, secret });
  if (token) {
    // Signed in
    console.log("JSON Web Token", JSON.stringify(token, null, 2));
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
export default NextAuth({
  //Specify Provider
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        //Connect to DB
        const client = await MongoClient.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        //Get all the users
        const users = await client.db().collection("users");
        //Find user with the email
        const result = await users.findOne({
          email: credentials.email,
        });
        console.log(result);
        //Not found - send error res
        if (!result) {
          client.close();
          throw new Error("No user found with the email");
        }
        //Check hased password with DB password
        const checkPassword = await compare(
          credentials.password,
          result.password
        );
        //Incorrect password - send response
        if (!checkPassword) {
          client.close();
          throw new Error("Password doesnt match");
        }
        //Else send success response
        client.close();
        return { email: result.email, name: result.name, id: result._id };
      },
    }),
  ],
  database: process.env.MONGODB_LOCAL_URI,
  secret: process.env.SECRET,
  session: {
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.SECRET,
  },
  pages: {
    signIn: "/login", // Displays signin buttons
  },
});
