const transporter  = require("../utils/Transporter");

const sendEmails = async (customeremail,email, name,message) => {

    console.log(customeremail, email,   name, message);
    
    try {
        const mailOptions = {
            from: customeremail, // Sender email
            to: email, // Recipient email
            subject: 'Contact Message',
            html: `
                <html>
                    <body>
                        <p>Name: ${name}</p>
                        <p>Message: ${message}</p>
                    </body>
                </html>
            `,
        };
        
      
     await transporter.sendMail(mailOptions);
      console.log(' email sent to:', email);
    //  await new Verification({email:email, code:code}).save();
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleContact =async (req,res)=>{
    const {name, email:customeremail, customerType,message } = req.body;
     //republicgroup
     let email;

     if (customerType === "companygroup") {
         email = 'itexpertstoday@gmail.com';
     } else if (customerType === "itcandidategroup") {
         email = 'itexpertsacademy24@gmail.com';
     }else if (customerType === "blockchainhiv") {
         email = 'uemglobal.admin@gmail.com';
     }  else if (customerType === "republicgroup") {
         email = 'uemglobal.admin@gmail.com'; 
     } else {
         email = 'academyforcybersec24@gmail.com';
     }
     

    try{
      await sendEmails(customeremail,email, name,message);
      res.status(200).json({message: 'email sent successfully'});
    }catch(error){
      console.error('Error sending  email:', error);
      res.status(500).json({error: 'Error sending  email'});
    } 

  }
  
  module.exports = handleContact;
