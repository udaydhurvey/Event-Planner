import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import genToken from "../utils/auth.js";
import cloudinary from "../config/cloudinary.js";
import Deactivation from "../models/deactivationModel.js";
import sendEmail from "../utils/sendEmail.js";


export const RegisterUser = async (req, res, next) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone || !password) {
      const error = new Error("all fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.status === "Active") {
      const error = new Error("Email Already Registerd");
      error.statusCode = 409;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePic = `https://placehold.co/600x400?text=${fullName
      .charAt(0)
      .toUpperCase()}`;


      const mailBody=`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to [Company Name]</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0;">
  <div style="background-color: #ffffff; max-width: 600px; margin: 40px auto; padding: 30px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);">
    
    <h2 style="color: #333333; margin-top: 0;">Welcome to Festive Flair 🎉</h2>

    <p style="color: #555555; line-height: 1.6;">Hi ${fullName},</p>

    <p style="color: #555555; line-height: 1.6;">Thank you for signing up! We're excited to have you on board.</p>

    <p style="color: #555555; line-height: 1.6;">You can now access your dashboard, explore features, and get the most out of your experience with us.</p>

    <a href="[Login_Link]" style="display: inline-block; background-color: #4CAF50; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;">Go to Dashboard</a>

    <p style="color: #555555; line-height: 1.6;">If you have any questions or need help getting started, our support team is here for you.</p>

    <p style="color: #555555; line-height: 1.6;">Cheers,<br>The Festive Flair Team</p>

    <div style="font-size: 12px; color: #999999; text-align: center; margin-top: 30px;">
      © ${new Date().getFullYear()}. All rights reserved.
    </div>
    
  </div>
</body>
</html>
`
    if (existingUser && existingUser.status === "Inactive") {
      existingUser.fullName = fullName;
      existingUser.password = hashedPassword;
      existingUser.status = "Active";
      existingUser.photo = profilePic;
      existingUser.role = "User";
      await existingUser.save();
    } else {
      const newUser = await User.create({
        fullName,
        email,
        phone,
        password: hashedPassword,
        photo: profilePic,
      });
    }

    await sendEmail(email,"subject", mailBody);

    res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    next(error);
  }

  


};

export const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("all fleids Required");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User Not Registered");
      error.statusCode = 400;
      return next(error);
    }

    const isVerified = await bcrypt.compare(password, user.password);

    if (!isVerified) {
      const error = new Error("Invalid Username or Password");
      error.statusCode = 401;
      return next(error);
    }

    genToken(user._id, res);

    res
      .status(200)
      .json({ message: `Welcome Back ${user.fullName} !!`, data: user });
  } catch (error) {
    next(error);
  }
};

export const LogoutUser = (req, res, next) => {
  try {
    res.cookie("IDCard", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    next(error);
  }
};

export const UpdateUser = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const {
      fullName,
      phone,
      gender,
      occupation,
      address,
      city,
      state,
      district,
      representing,
    } = req.body;

    if (!currentUser) {
      const error = new Error("User Not Found !! Login Again");
      error.statusCode = 401;
      return next(error);
    }
    const photo = req.file;
    let picture;
    if (photo) {
      const b64 = Buffer.from(photo.buffer).toString("base64");
      const dataURI = `data:${photo.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "eventPlannerPictures",
        width: 500,
        height: 500,
        crop: "fill",
      });
      picture = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      {
        fullName,
        phone,
        gender,
        occupation,
        address,
        city,
        state,
        district,
        representing,
        photo: picture || currentUser.photo,
      },
      { new: true }
    );

    res.status(200).json({ message: "Profile Updated", data: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { reason, feedback, confirmPassword } = req.body;

    if (!currentUser) {
      const error = new Error("User Not Found !! Login Again");
      error.statusCode = 401;
      return next(error);
    }

    const isVerified = await bcrypt.compare(
      confirmPassword,
      currentUser.password
    );

    if (!isVerified) {
      const error = new Error("Invalid Username or Password");
      error.statusCode = 401;
      return next(error);
    }

    const mailBody = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Account Deactivation Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0;">
  <div style="background-color: #ffffff; max-width: 600px; margin: 40px auto; padding: 30px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);">
    
    <h2 style="color: #333333; margin-top: 0;">Account Deactivation Confirmed</h2>

    <p style="color: #555555; line-height: 1.6;">Dear ${
      currentUser.fullName
    },</p>

    <p style="color: #555555; line-height: 1.6;">We're confirming that your account has been deactivated as per your request.</p>

    <p style="color: #555555; line-height: 1.6;">If this was a mistake or you'd like to return, you can reactivate your account anytime within the next 30 days by logging in again.</p>

    <p style="color: #555555; line-height: 1.6;">If you have any questions or need assistance, feel free to contact our support team.</p>

    <p style="color: #555555; line-height: 1.6;">Thank you,<br>The Festive Flair Team</p>

    <div style="font-size: 12px; color: #999999; text-align: center; margin-top: 30px;">
      © ${new Date().getFullYear()} . All rights reserved.
    </div>
    
  </div>
</body>
</html>`;

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      {
        gender: "N/A",
        occupation: "N/A",
        address: "N/A",
        city: "N/A",
        state: "N/A",
        district: "N/A",
        representing: "N/A",
        photo: "N/A",
        role: "N/A",
        password: "N/A",
        status: "Inactive",
      },
      { new: true }
    );

    await sendEmail(currentUser.email, currentUser.subject, mailBody);

    await Deactivation.create({ userId: currentUser._id, reason, feedback });

    res.status(200).json({ message: "Sorry to see you go . . ." });
  } catch (error) {
    next(error);
  }
};
