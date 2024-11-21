import dbConnect from "@/lib/dbConnect";
import users from "@/models/user";
import response from "@/utils/common";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return response(false, 400, "Email and password are required");
    }

    const user = await users.findOne({ email });
    if (!user) {
      return response(false, 404, "User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user?.password);
    if (!isPasswordCorrect) {
      return response(false, 401, "Incorrect password");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return response(true, 200, "Login successful", {
      token,
    });
  } catch (error) {
    console.log(">>>>>> user signIn >>>>>>", error);
    return response(false, 500, ">>>>>> user signIn >>>>>>", error);
  }
}
