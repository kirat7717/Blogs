import "dotenv/config";
import nodemailer from "nodemailer";
// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
// console.log("PASS LENGTH:", process.env.EMAIL_PASS?.length);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendmail_For_ResetPassword = async ( userMail, resetPasswordUrl) => {
  try {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
      </head>

      <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
          <tr>
            <td align="center">

              <table width="600" cellpadding="0" cellspacing="0"
                style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.1);">

                <!-- Header -->
                <tr>
                  <td align="center" style="background:#1f2937;padding:25px;">
                    <h1 style="margin:0;color:#ffffff;">
                      Blog Application
                    </h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:35px;">

                    <h2 style="margin-top:0;color:#111827;">
                      Verify Your Email Address
                    </h2>

                    <p style="font-size:16px;color:#4b5563;line-height:1.7;">
                      Hello,
                    </p>

                    <p style="font-size:16px;color:#4b5563;line-height:1.7;">
                      Thank you for creating an account with
                      <strong>Blog Application</strong>.
                    </p>

                    <p style="font-size:16px;color:#4b5563;line-height:1.7;">
                      To activate your account, please verify your email address by clicking the button below.
                    </p>

                    <!-- Button -->
                    <div style="text-align:center;margin:35px 0;">
                      <a href="${verifyEmailUrl}"
                        style="
                          background:#2563EB;
                          color:#ffffff;
                          text-decoration:none;
                          padding:14px 28px;
                          border-radius:6px;
                          font-size:16px;
                          font-weight:bold;
                          display:inline-block;
                        ">
                        Verify Email
                      </a>
                    </div>

                    <p style="font-size:15px;color:#6b7280;line-height:1.7;">
                      This verification link will expire in
                      <strong>24 hours</strong>.
                    </p>

                    <div style="background:#F9FAFB;padding:18px;border-left:4px solid #2563EB;margin:25px 0;">
                      <p style="margin:0;color:#4B5563;font-size:15px;line-height:1.6;">
                        If you did not create this account, you can safely ignore this email.
                      </p>
                    </div>

                    <hr style="border:none;border-top:1px solid #E5E7EB;margin:30px 0;">

                    <p style="font-size:14px;color:#9CA3AF;line-height:1.6;">
                      Regards,<br>
                      <strong>Blog Application Team</strong>
                    </p>

                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userMail,
      subject: "Verify Your Email Address",
      html,
    });

    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Node mailer error:", error.message);
  }
};
export const sendmail_For_Status = async (userMail, status) => {
  try {
    const isDeactive = status === "deactive";

    const subject = isDeactive
      ? "Your Account Has Been Deactivated"
      : "Your Account Has Been Activated";

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
        </head>

        <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

          <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
            <tr>
              <td align="center">

                <table width="600" cellpadding="0" cellspacing="0"
                  style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.1);">

                  <!-- Header -->
                  <tr>
                    <td align="center" style="background:#1f2937;padding:25px;">
                      <h1 style="margin:0;color:#ffffff;">
                        Blog Application
                      </h1>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding:35px;">

                      <h2 style="margin-top:0;color:#111827;">
                        ${
                          isDeactive
                            ? "Account Status: Deactivated"
                            : "Account Status: Activated"
                        }
                      </h2>

                      <p style="font-size:16px;color:#4b5563;line-height:1.7;">
                        Hello,
                      </p>

                      <p style="font-size:16px;color:#4b5563;line-height:1.7;">
                        ${
                          isDeactive
                            ? `Your account has been <strong>deactivated</strong> by our administration team.
                              While your account is deactivated, you won't be able to log in or use our platform.`
                            : `Good news! Your account has been <strong>activated</strong> successfully.
                              You can now log in and continue using all features of our platform.`
                        }
                      </p>

                      ${
                        isDeactive
                          ? `
                          <div style="background:#FEF2F2;padding:18px;border-left:4px solid #DC2626;margin:25px 0;">
                            <p style="margin:0;color:#991B1B;font-size:15px;line-height:1.6;">
                              If you believe this action was taken by mistake, please contact our support team for assistance.
                            </p>
                          </div>
                        `
                          : `
                          <div style="background:#ECFDF5;padding:18px;border-left:4px solid #16A34A;margin:25px 0;">
                            <p style="margin:0;color:#166534;font-size:15px;line-height:1.6;">
                              Welcome back! We're glad to have you with us again.
                            </p>
                          </div>
                        `
                      }

                      <p style="font-size:16px;color:#4b5563;line-height:1.7;">
                        Thank you for being a valued member of our community.
                      </p>

                      <hr style="border:none;border-top:1px solid #e5e7eb;margin:30px 0;">

                      <p style="font-size:14px;color:#9ca3af;line-height:1.6;">
                        Regards,<br>
                        <strong>Blog Application Team</strong>
                      </p>

                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>

        </body>
        </html>
      `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userMail,
      subject,
      html,
    });

    console.log("Status email sent successfully");
  } catch (error) {
    console.error("Node mailer error:", error.message);
  }
};

export const sendmail_For_Verification = async (verify_user_link, email) => {
  try {
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
        </head>

        <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

          <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
            <tr>
              <td align="center">

                <table width="600" cellpadding="0" cellspacing="0"
                  style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.1);">

                  <!-- Header -->
                  <tr>
                    <td align="center" style="background:#1f2937;padding:25px;">
                      <h1 style="margin:0;color:#ffffff;">
                        Blog Application
                      </h1>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:35px;">

                      <h2 style="margin-top:0;color:#111827;">
                        Verify Your Email Address
                      </h2>

                      <p style="font-size:16px;color:#4b5563;line-height:1.7;">
                        Hello,
                      </p>

                      <p style="font-size:16px;color:#4b5563;line-height:1.7;">
                        Welcome to <strong>Blog Application</strong>! We're excited to have you join our community.
                      </p>

                      <p style="font-size:16px;color:#4b5563;line-height:1.7;">
                        Before you can log in, please verify your email address by clicking the button below.
                      </p>

                      <!-- Button -->
                      <div style="text-align:center;margin:35px 0;">
                        <a href="${verify_user_link}"
                          style="
                            background:#2563EB;
                            color:#ffffff;
                            text-decoration:none;
                            padding:14px 30px;
                            border-radius:6px;
                            font-size:16px;
                            font-weight:bold;
                            display:inline-block;
                          ">
                          Verify Email
                        </a>
                      </div>

                      <p style="font-size:15px;color:#6B7280;line-height:1.7;">
                        This verification link will expire in
                        <strong>24 hours</strong>.
                      </p>

                      <p style="font-size:15px;color:#6B7280;line-height:1.7;">
                        If the button doesn't work, copy and paste the following link into your browser:
                      </p>

                      <p style="word-break:break-all;font-size:14px;color:#2563EB;">
                        ${verify_user_link}
                      </p>

                      <div style="background:#F9FAFB;padding:18px;border-left:4px solid #2563EB;margin:30px 0;">
                        <p style="margin:0;color:#4B5563;font-size:15px;line-height:1.6;">
                          If you didn't create an account on Blog Application, you can safely ignore this email.
                        </p>
                      </div>

                      <hr style="border:none;border-top:1px solid #E5E7EB;margin:30px 0;">

                      <p style="font-size:14px;color:#9CA3AF;line-height:1.6;">
                        Regards,<br>
                        <strong>Blog Application Team</strong>
                      </p>

                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>

        </body>
        </html>
      `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email Address",
      html,
    });

    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Node mailer error:", error.message);
  }
};

export const sendGreetingEmail = async (userMail, type) => {
  try {
    const isMorning = type === "morning";

    const subject = isMorning ? "☀️ Good Morning!" : "🌙 Good Night!";

    const headerColor = isMorning ? "#FFD54F" : "#1e293b";
    const headerTextColor = isMorning ? "#333333" : "#ffffff";
    const bodyBackground = isMorning ? "#f4f7fb" : "#0f172a";
    const title = isMorning ? "☀️ Good Morning" : "🌙 Good Night";

    const greeting = isMorning
      ? `
        <p>Hi there 👋,</p>
        <p>
          A brand new day is here with new opportunities,
          fresh energy, and endless possibilities.
        </p>
        <p>
          Stay positive, work hard, and keep chasing your goals.
        </p>
        <p>
          Wishing you a productive and joyful day ahead!
        </p>
      `
      : `
        <p>Hello 👋,</p>
        <p>
          The day has come to an end. Take a moment to relax,
          appreciate today's achievements, and let go of today's worries.
        </p>
        <p>
          Rest well, recharge your mind, and wake up tomorrow ready
          for another beautiful day.
        </p>
        <p>
          May your night be peaceful, your dreams be beautiful,
          and your tomorrow be full of success.
        </p>
      `;

    const centerMessage = isMorning
      ? "☀️ Have an Amazing Day"
      : "🌙 Sleep Well";

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>${subject}</title>
      </head>

      <body style="margin:0;padding:0;background:${bodyBackground};font-family:Arial,Helvetica,sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
          <tr>
            <td align="center">

              <table width="600" cellpadding="0" cellspacing="0"
                style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 5px 20px rgba(0,0,0,.15);">

                <tr>
                  <td align="center"
                    style="background:${headerColor};padding:35px;">

                    <h1 style="margin:0;font-size:34px;color:${headerTextColor};">
                      ${title}
                    </h1>

                  </td>
                </tr>

                <tr>
                  <td style="padding:35px;color:#555;font-size:16px;line-height:28px;">

                    ${greeting}

                    <div style="text-align:center;margin:35px 0;">

                      <span
                        style="
                          display:inline-block;
                          background:${headerColor};
                          color:${headerTextColor};
                          padding:14px 28px;
                          border-radius:6px;
                          font-size:16px;
                          font-weight:bold;
                        ">
                        ${centerMessage}
                      </span>

                    </div>

                    <p>
                      Regards,<br>
                      <strong>Your Blog Team</strong>
                    </p>

                  </td>
                </tr>

                <tr>
                  <td
                    style="background:#f4f4f4;padding:20px;text-align:center;font-size:13px;color:#888;">

                    © ${new Date().getFullYear()} Blog App. All rights reserved.

                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userMail,
      subject,
      html,
    });

    console.log(`${type} greeting email sent to ${userMail}`);
  } catch (error) {
    console.error(`Failed to send ${type} greeting email:`, error);
  }
};
