import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import User from "./model/user";
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
          Swal.fire({
            icon: "error",
            text: error.message ? error.message : "Something went wrong",
          });
        }
      },
    }),
    GitHub,
    Google,
  ],
});

export { auth, handlers, signIn, signOut };
