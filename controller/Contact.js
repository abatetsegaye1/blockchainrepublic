const transporter  = require("../utils/Transporter");

const sendEmails = async (customeremail,email, name,message) => {

    console.log(customeremail, email,   name, message);
    
    try {
        const mailOptions = {
            from: customeremail, // Sender email
            to: email, // Recipient email
            replyTo: customeremail, //
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
     console.log("===== email sent from =====: ", customeremail);
     let emailto;

     if (customerType === "companygroup") {
         emailto = 'itexpertstoday@gmail.com';
     } else if (customerType === "itcandidategroup") {
         emailto = 'gibetsegaye123@gmail.com';
     }else if (customerType === "blockchainhiv") {
         emailto = 'didier@excellencemanagement.net';
     }  else if (customerType === "republicgroup") {
         emailto = 'didier@excellencemanagement.net'; 
     } else {
         emailto = 'academyforcybersec24@gmail.com';
     }
     
//
//didier@excellencemanagement.net
    try{
      await sendEmails(customeremail,emailto, name,message);
      res.status(200).json({message: 'email sent successfully'});
    }catch(error){
      console.error('Error sending  email:', error);
      res.status(500).json({error: 'Error sending  email'});
    } 

  }
  
  module.exports = handleContact;
