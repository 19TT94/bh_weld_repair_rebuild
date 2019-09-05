const nodemailer = require('nodemailer');

async function Mail(name, email, message) {
    // create reusable transporter object using the default SMTP transport
    let transporter = await nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'taylorbtobin@gmail.com',
            pass: 'VDXjHEp]poD9RJuyw?'
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '19tt94@gmail.com', // sender address
        to: '19tt94@gmail.com', // list of receivers
        subject: name + ', ' + email, // Subject line
        text: message, // plain text body
        html: '<b>' + message + '</b>' // html body
    }, (error, info) => {
        if(error) {
            throw error;
        } else  {
            console.log('Message sent: %s', info.messageId);
        }
    });
}

export default Mail;
