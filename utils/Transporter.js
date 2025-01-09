
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service provider
    auth: {
      user: 'abatetsegaye12@gmail.com', // Your email address
      pass: 'ebuq qhkh vfqd bvxn', // Your email password or app password
    },
  });
  module.exports=transporter;