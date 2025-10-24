const contact = require("../models/Contact");
const {Resend} = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendContactMessage = async (req, res) => {
    try{
        const {name, email, message} = req.body;
        if(! name || !email || !message){
            return res.status(400).json({
                success: false,
                message:"All Fields are required"
            });
        }

        const newContact = await contact.create({name,email,message});

        const emailResponse = await resend.emails.send({
            from:process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            replyTo: email,
            subject: `New Portfolio Contact From ${name}`,
            html:
                `<h2>New Contact Form Submission</h2>
                <p><strong>From:</strong>${name}</p>
                <p><strong>Email:</strong>${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g,"<br>")}</p>`,
        })
        console.log("Sending email to:", process.env.EMAIL_TO);
        console.log("Resend response:", emailResponse);
        if(emailResponse.error){
            console.error("Resend error:", emailResponse.error);
            return res.status(500).json({success:false, message:"Failed to send email"});
        }
        res.status(200).json({
            success: true,
            message: "Message saved and email sent successfully",
            contact: newContact,
        });
    }
    catch(error){
        console.error("Error sending contact message:", error);
        res.status(500).json({success:false, message:"Server Error", error: error.message});
    }
};