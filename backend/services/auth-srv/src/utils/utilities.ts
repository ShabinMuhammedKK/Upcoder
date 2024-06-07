import nodemailer from "nodemailer"

//generate otp
const generateOtp = ()=>{
    return Math.floor(100000 + Math.random()* 900000);
}


const mailSender = async (email:string,title:string,body:string)=>{
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            service:"gmail",
            port: 465,
            secure: true,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from:'upcoder education',
            to:email,
            subject:title,
            html:body
        });
    } catch (error) {
        throw error
    }
}

// send otp by email
async function sendVerificationMail(email:string,otp:number) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification mail",
            `<h1>Please confirm your OTP</h1>
             <p>Here is your OTP code: ${otp}</p>`

        );
        console.log("email sent successfully")
    } catch (error) {
        throw error;
    }
}





export {

    sendVerificationMail,
    generateOtp,
}