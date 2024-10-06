import { NextResponse } from "next/server";
import dbConnection from "@/lib/dbConnection";
import User from "@/model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const POST = async (req) => {
  await dbConnection();
  try {
    const { email, password } = await req.json();
    if (email && password) {
      const isValidUser = await User.findOne({ email });
      if (!isValidUser) {
        return NextResponse.json(
          { error: "User is not authorized" },
          { status: 401 }
        );
      }

      const isMatch = await bcrypt.compare(password, isValidUser.password);
      if (!isMatch) {
        return NextResponse.json(
          { error: "Password is incorrect" },
          { status: 401 }
        );
      }
      const token = jwt.sign(
        { id: isValidUser._id, email: isValidUser.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      return NextResponse.json({ token }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("catch chala");
    return NextResponse.json(error, { status: 500 });
  }
};

export { POST };
