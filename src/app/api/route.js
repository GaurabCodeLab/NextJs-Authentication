import { NextResponse } from "next/server";
import dbConnection from "@/lib/dbConnection";
import User from "@/model/user";

const GET = async (req) => {
  await dbConnection();
  try {
    const allUsers = await User.find();
    return NextResponse.json(allUsers, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export { GET };
