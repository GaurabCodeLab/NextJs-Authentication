import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import User from "./model/user";
import dbConnection from "./lib/dbConnection";
import bcrypt from "bcrypt";
import Swal from "sweetalert2";

const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (user) => {
        await dbConnection();
        try {
          if (user.email && user.password) {
            const { email, password } = user;
            const isValidUser = await User.findOne({ email });
            if (!isValidUser) {
              throw new Error("User is not authorized");
            }
            const isMatch = await bcrypt.compare(
              password,
              isValidUser.password
            );
            if (!isMatch) {
              throw new Error("Password is incorrect");
            }

            return isValidUser;
          } else {
            throw new Error("Missing required field");
          }
        } catch (error) {
          throw error.message;
        }
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
});

export { auth, handlers, signIn, signOut };
