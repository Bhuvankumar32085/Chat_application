import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    if (!name || !email || !password || !confirmpassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await generateToken(newUser._id, res);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(`Server error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const checkPossword = await bcrypt.compare(password, user?.password);
    if (!checkPossword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Possword",
      });
    }

    await generateToken(user._id, res);

    res.status(201).json({
      success: true,
      message: "User LogIn successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(`Server error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(`Server error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "token not found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      success: true,
      message: "token  found",
      user: decoded,
    });
  } catch (error) {
    console.log(`Server error: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateProfilePic = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findById(req.id);

    if (!name && !req.file) {
      return res.status(401).json({
        success: false,
        message: "One field must be required!",
      });
    }

    if (name) {
      user.name = name;
    }

    if (req.file) {
      if (user.avatar?.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }

      user.avatar = {
        public_id: req.file.filename,
        url: req.file.path,
      };
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile  updated!",
      avatar: user.avatar,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
