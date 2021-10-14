import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";
import User from "../../../models/user";
import dbConnect from "../../../middleware/mongodb";
// var profile;
// async (req, res) => {
//   const token = await jwt.getToken({ req, secret });
//   if (token) {
//     // Signed in
//     console.log("JSON Web Token", JSON.stringify(token, null, 2));
//   } else {
//     // Not Signed in
//     res.status(401);
//   }
//   res.end();
// };

// var profile;

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
        const userProfile = await users.findOne({
          email: credentials.email,
        });
        // profile = userProfile;
        //Not found - send error res
        if (!userProfile) {
          client.close();
          throw new Error("No user found with the email");
        }
        //Check hased password with DB password
        const checkPassword = await compare(
          credentials.password,
          userProfile.password
        );
        //Incorrect password - send response
        if (!checkPassword) {
          client.close();
          throw new Error("Password doesnt match");
        }
        //Else send success response
        client.close();
        return {
          email: userProfile.email,
          name: userProfile.name,
          id: userProfile._id,
          profile: userProfile.profile,
          created: userProfile.createdAt,
        };
      },
    }),
  ],
  database: process.env.MONGODB_URI,
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
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
        token.created = user.created;
      }
      if (token) {
        await dbConnect();
        const user = await User.findById(token.sub);
        token.name = user.name;
        token.email = user.email;
        // console.log("this is from the token callback");
        // console.log(user);
        token.profile = user.profile;
      }
      // console.log(token);

      // Add access_token to the token right after signin

      return token;
    },
    session: async (session, token) => {
      if (session.user.name !== token.name) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.profile.image.url;
      }
      session.user.id = token.sub;
      session.user.profile = token.profile;
      session.user.genericImage = token.profile.image.genericPic;
      session.user.created = token.created;

      // console.log(session);
      return Promise.resolve(session);
    },
  },
});
