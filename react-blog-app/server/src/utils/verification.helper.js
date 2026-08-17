import jwt from "jsonwebtoken";
import { sendmail_For_Verification } from "./sendEmail.js";
import 'dotenv/config'




export const sendVerificationEmail = async (user) => {
  const verifyToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });
  const verifyUserLink = `${process.env.CLIENT_URL}/api/v1/user/verify-email/${verifyToken}`;
  // const verify_token_expiry =  Date.now() + 15 * 60 *1000

  // send mail
  await sendmail_For_Verification(verifyUserLink, user.email);
}