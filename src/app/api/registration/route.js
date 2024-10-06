import { NextResponse } from "next/server";
import dbConnection from "@/lib/dbConnection";
import User from "@/model/user";
import bcrypt from "bcrypt";

const POST = async (req) => {
  await dbConnection();
  try {
    const { name, email, password } = await req.json();
    if (name && email && password) {
      const isExisting = await User.findOne({ email });
      if (isExisting) {
        return NextResponse.json(
          { error: "User already exist" },
          { status: 409 }
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ name, email, password: hashedPassword });
      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: "Missing Required Field" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export { POST };
