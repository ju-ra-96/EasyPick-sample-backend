const nodemailer = require("nodemailer");

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
      user:"apikey",
      pass: "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",
    },
  });

  const mailOptions = {
    from: "easypick.info@gmail.com",
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
