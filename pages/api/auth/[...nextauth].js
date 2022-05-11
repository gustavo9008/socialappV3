// import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";
import User from "../../../models/user";
import dbConnect from "../../../middleware/mongodb";
import { setCookies } from "cookies-next";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function auth(req, res) {

  const NextAuthCredential = await NextAuth(req, res, {

    providers: [
      CredentialsProvider({
        async authorize(credentials, req) {

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

          //Incorrect password - send response
          if (!checkPassword) {
            client.close();
            throw new Error("Password doesnt match");
          }
          //Else send success response
          client.close();
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
    callbacks: {
      async jwt({ token, user }) {
        let reading_list;
        if (user) {
          const userList = {
            user: user.name,
            readingList: user.profile.readingList || [],
            likesList: user.profile.likesList || [],
            postLoaded: [],
          };
          setCookies("user_lists", JSON.stringify(userList), {
            req,
            res,
          });
        }
        user &&
          ((token.id = user.id),
            (token.name = user.name),
            (token.email = user.email),
            (token.created = user.created),
            (token.profile = {
              about: user.profile.about,
              location: user.profile.location,
              image: user.profile.image,
              links: user.profile.links,
            }));

        if (
          req.rawHeaders.includes('Referer')
        ) {

          const refUrl = req.rawHeaders.findIndex(element => {
            if (element.includes("/user/profile/settings")) {
              return true;
            }
          });
          if (refUrl !== -1) {
            await dbConnect();
            const user = await User.findById(token.sub);
            token.name = user.name;
            token.email = user.email;
            token.profile.about = user.profile.about;
            token.profile.location = user.profile.location
            token.profile.image = user.profile.image;
            token.profile.links = user.profile.links;

          }

        }
        return token;
      },
      async session({ session, token }) {

        if (session.user.name !== token.name) {
          session.user.name = token.name;
          session.user.email = token.email;
          session.user.image = token.profile.image.url;
        }
        session.user.id = token.sub;
        session.user.profile = token.profile;
        session.user.genericImage = token.profile.image.genericPic;
        session.user.created = token.created;

        return session;
      },
      async redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
      },
    },
  });
  return NextAuthCredential;
}
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
