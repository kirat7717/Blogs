import User from "../models/user.model.js";
import { sendGreetingEmail } from "../utils/sendEmail.js";

export const greetingEmail = async (type) => {
  const users = await User.find();

  for (const user of users) {
    await sendGreetingEmail(user.email, type);
  }
};
