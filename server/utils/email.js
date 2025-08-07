// const nodemailer = require("nodemailer");
// const htmlToText = require("html-to-text");
// const { EMAIL_VERIFY_TEMPLATE } = require("./templates/emailVerify");
// const {
//   PASSWORD_RESET_TEMPLATE,
// } = require("./templates/passwordReset");
// const { WELCOME_TEMPLATE } = require("./templates/welcome");
// const {
//   BUSINESS_STATUS_TEMPLATE,
// } = require("./templates/businessStatus");

// module.exports = class Email {
//   constructor(user, data = {}) {
//     this.to = user.email;
//     this.firstName = user.name?.split(" ")[0] || "User";
//     this.data = data;
//     this.from = `Your Company <${process.env.EMAIL_FROM}>`;
//   }

//   newTransport() {
//     return nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });
//   }

//   async send(subject, htmlContent) {
//     const mailOptions = {
//       from: this.from,
//       to: this.to,
//       subject,
//       html: htmlContent,
//       text: htmlToText.convert(htmlContent),
//     };

//     await this.newTransport().sendMail(mailOptions);
//   }

//   async sendEmailVerify() {
//     const html = EMAIL_VERIFY_TEMPLATE(this.to, this.data.otp);
//     await this.send("Verify Your Email", html);
//   }

//   async sendPasswordReset() {
//     const html = PASSWORD_RESET_TEMPLATE(this.to, this.data.otp);
//     await this.send("Password Reset Request", html);
//   }

//   async sendWelcomeUser() {
//     const html = WELCOME_TEMPLATE(this.firstName);
//     await this.send("Welcome to Our Platform!", html);
//   }

//   async sendBusinessStatus() {
//     const html = BUSINESS_STATUS_TEMPLATE(
//       this.firstName,
//       this.data.status
//     );
//     await this.send(`Business ${this.data.status}`, html);
//   }
// };
