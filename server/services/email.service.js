const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

let transponder = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const registerEmail = async(userEmail, user) => {
    try {
        console.log('DUSTIN userEmail:', userEmail)
        console.log('DUSTIN user:', user)
        const emailToken = user.generateRegisterToken();

        let mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "eBike",
                link: `${process.env.EMAIL_MAIL_URL}`
            }
        })

        var email = {
            body: {
                name: userEmail,
                intro: 'Welcome to eBike! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get started with eBike, please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Confirm your account',
                        link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };

        let emailBody = mailGenerator.generate(email);
        let message = {
            form: process.env.EMAIL,
            to: userEmail,
            subject: 'Welcome to eBike',
            html: emailBody
        }

        await transponder.sendMail(message);
        return true;
        
    } catch (error) {
        throw error
    }
}


module.exports = {
    registerEmail
}