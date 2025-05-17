const nodemailer = require('nodemailer');

exports.handler = async (event) => {
    const { name, email, phone, message } = JSON.parse(event.body);

    // ✅ Configure AOL SMTP server
    const transporter = nodemailer.createTransport({
        host: 'smtp.aol.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME, // <-- Now using environment variable
            pass: process.env.EMAIL_PASSWORD  // <-- Now using environment variable
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: process.env.EMAIL_USERNAME,   // <-- Also secured with environment variable
        subject: `Contact Form Submission from ${name}`,
        text: `Message from ${name} (${email}, ${phone}):\n\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully!' })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email.' })
        };
    }
};
