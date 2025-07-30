import Contact from "../models/contactUsModel.js";

export const GetAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ message: "All Contact Fetched", data: contacts });
  } catch (error) {
    next(error);
  }
};
