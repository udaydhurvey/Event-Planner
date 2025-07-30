import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const Protect = async (req, res, next) => {
  try {
    const token = req.cookies.IDCard || "";
    console.log(token);

    if (!token) {
      const error = new Error("Unauthorized !! Login Again");
      error.statusCode = 401;
      return next(error);
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    const verifiedUser = await User.findById(decode.ID);

    if (!verifiedUser) {
      const error = new Error("Unauthorized !! Login Again");
      error.statusCode = 401;
      return next(error);
    }

    req.user = verifiedUser;
    next();
  } catch (error) {
    next(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if ((req.user.role !== "Admin")) {
      const error = new Error("Unauthorized !! Admin Permission Required");
      error.statusCode = 401;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
