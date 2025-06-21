import { User } from "../../Models";
import { generateToken, hashPassword, transporter } from "../../utils";
import { catchAsync } from "../Error/catchAsync";

export const register = catchAsync(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(409).json({
            message: "user of this email already exisite",
        });
    };
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const newUser = await User.create(req.body);

    console.log("new user was created successfully");

    let token = generateToken({
        id: "newUser.id",
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: newUser.email,
        subject: 'Welcome to Our Platform',
        html: `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Holiday Planner</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"> <!-- Add the Font Awesome CSS link -->
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
              text-align: center;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          }
          h1 {
              color: #007BFF;
          }
          p {
              color: #333;
          }
          a {
              text-decoration: none;
              color: #007BFF;
          }
          .icon {
              font-size: 24px;
              color: #007BFF;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1><i class="icon fas fa-globe"></i> Welcome to Smart Farming</h1>
          <p>Dear ${newUser.fullNames} ,</p>
          <p>Thank you for signing up for Smart Farming. We are excited to have you as a member of our community.</p>
          <p>With Smart Farming, you can manage your livestock, plan for your future dreamz, and more.</p>
          <p>Get started now and discover your next Improvement!</p>
          <a href="[Your App URL]">Explore Smart Farming </a>
          <p>If you have any questions or need assistance, feel free to <a href="mailto:support@holidayplanner.com">contact our support team</a>.</p>
          <p>Smart Farming!</p>
          <p>Sincerely,<br>Your Smart Farming Team</p>
      </div>
  </body>
  </html>  
  `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:');
        }
    });

    return res.status(201).json({
        message: " user registered successfully",
        access_token: token,
        newUser
    });
}); 