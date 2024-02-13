 
  const express = require('express');
  const bodyParser = require('body-parser');
  const nodemailer = require('nodemailer');
  
  const app = express();
  const port = 3000;
  
  // Body parser middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  // Form route
  app.post('/send-email', (req, res) => {
      const { name, email, message } = req.body;
  
      // Create a transporter
      const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: 'sid@gmail.com', // Your email
              pass: 'qwerty' // Your password
          }
      });
  
      // Email options
      const mailOptions = {
          from: 'sid@gmail.com',
          to: 'khdigsol@gmail.com',
          subject: 'Form',
          html: `Name: ${name}<br>Email: ${email}<br>Message: ${message}`
      };
  
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log(error);
              res.status(500).send('Error sending email');
          } else {
              console.log('Email sent: '+ info.response);
              res.send('Email sent successfully');
          }
      });
  });
  
  // Start server
  app.listen(port, () => console.log(`Server running on port ${port}`));
  