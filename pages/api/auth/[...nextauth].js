import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
    CredentialsProvider({
      async authorize(credentials, req) {
        // console.log(credentials);
        //Connect to DB
        const client = await MongoClient.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        //Get all the users
        const userProfile = await client.db().collection("users");
        //Find user with the email
        const user = await userProfile.findOne({
          email: credentials.email,
        });
        const checkPassword = await compare(
          credentials.password,
          user.password
        );
        // console.log(checkPassword);
        // profile = userProfile;
        if (checkPassword) {
          const loginUser = {
            email: user.email,
            name: user.name,
            id: user._id,
            profile: user.profile,
            created: user.createdAt,
          };
          return loginUser;
        }
        //Not found - send error res
        if (!user) {
          client.close();
          throw new Error("No user found with the email");
        }
        //Check hased password with DB password
        // const checkPassword = await compare(
        //   credentials.password,
        //   userProfile.password
        // );
        //Incorrect password - send response
        if (!checkPassword) {
          client.close();
          throw new Error("Password doesnt match");
        }
        //Else send success response
        client.close();
        // return {
        //   email: userProfile.email,
        //   name: userProfile.name,
        //   id: userProfile._id,
        //   profile: userProfile.profile,
        //   created: userProfile.createdAt,
        // };
      },
    }),
  ],
  database: process.env.MONGODB_URI,
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
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
    async jwt({ token, user }) {
      // console.log(user);
      // console.log(token);
      user &&
        ((token.id = user.id),
        (token.name = user.name),
        (token.email = user.email),
        (token.created = user.created),
        (token.profile = {
          about: user.profile.about,
          image: user.profile.image,
          links: user.profile.links,
        }));

      // if (token) {
      //   await dbConnect();
      //   const user = await User.findById(token.sub);
      //   token.name = user.name;
      //   token.email = user.email;
      //   // console.log("this is from the token callback");
      //   // console.log(user);

      // }
      // console.log(token);

      // Add access_token to the token right after signin

      return token;
    },
    async session({ session, token }) {
      // console.log(session);

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
      return session;
    },
  },
});
