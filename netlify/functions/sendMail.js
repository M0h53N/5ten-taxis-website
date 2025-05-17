const nodemailer = require('nodemailer');

exports.handler = async (event) => {
    const { name, email, phone, message } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',       // Replace with your Gmail address
            pass: 'your-password'               // Replace with your Gmail password or App Password
        },
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com',            // Where you want to receive the form submissions
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
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email.' })
        };
    }
};
