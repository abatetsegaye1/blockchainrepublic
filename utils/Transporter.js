
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service provider
    auth: {
      user: 'didier@excellencemanagement.net', // Your email address
      pass: 'fiiu aued teom nqhg', // Your email password or app password
    },
  });
  module.exports=transporter;


