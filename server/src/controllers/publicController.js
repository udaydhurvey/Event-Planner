import Contact from "../models/contactUsModel.js";

export const ContactUs = async (req, res, next) => {
  try {
    const { fullName, email, phone, message } = req.body;

    if (!fullName || !email || !phone || !message) {
      const error = new Error("Please Fill All Details");
      error.statusCode = 400;
      return next(error);
    }

    const newContactUs = await Contact.create({
          fullName,
          email,
          phone,
          message,
        });
    
        res.status(201).json({ message: "Thank You For Contact Us" });
  } catch (error) {
    next(error);
  }
};
