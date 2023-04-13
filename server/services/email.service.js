const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config('../.env');

let transponder = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 456,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const registerEmail = async(userEmail, user) => {
    try {
        const emailToken = user.generateRegisterToken();
        let mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "waves",
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
                        text: 'Confirm your accounts',
                        link: `${process.env.SITE_DOMAIN}verify/${emailToken}`
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };

        console.log('LINK: ', email.body.action.button.link)

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