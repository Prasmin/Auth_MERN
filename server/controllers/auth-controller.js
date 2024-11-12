import { User } from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import { generateTokenandSetCokkie } from "../utils/generateTokenandSetCookie.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  console.log(email);

  try {
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userAlreadyExists = await User.findOne({ email });

    console.log("userAlreadyExists", userAlreadyExists);
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: " User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const verficationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verficationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    //jwt
    generateTokenandSetCokkie(res, user._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
