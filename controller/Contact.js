const transporter  = require("../utils/Transporter");

const sendEmails = async (customeremail,email, name,message,type) => {

    console.log(customeremail, email,   name, message);
    
    try {
        const mailOptions = {
            from: customeremail, // Sender email
            to: email, // Recipient email
            replyTo: customeremail, //
            subject: `Contact Message from ${type}`,
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
     let type="";
     if (customerType === "companygroup") {
         emailto = 'itexpertstoday@gmail.com';
     } else if (customerType === "itcandidategroup") {
         emailto = 'gibetsegaye123@gmail.com';
     }else if (customerType === "blockchainhiv") {
         emailto = 'didier@excellencemanagement.net';
         type="blockchain.hiv";
     }  else if (customerType === "republicgroup") {
         type="blockchain.republican"
         emailto = 'didier@excellencemanagement.net'; 
     } else {
         emailto = 'academyforcybersec24@gmail.com';
     }
     
//
//didier@excellencemanagement.net
    try{
      await sendEmails(customeremail,emailto, name,message,type);
      res.status(200).json({message: 'email sent successfully',status: 'success'});
    }catch(error){
      console.error('Error sending  email:', error);
      res.status(500).json({message: error.message,status: error.status});
    } 

  }
  
  module.exports = handleContact;
