const express =  require('express')
const  app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const server = require('./connect')
const appointment = require('./model')
const bodyParser = require('body-parser')
var nodemailer = require('nodemailer');

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

app.get('/', async (req, res)=>{
  res.send("Hello").status(200);
})

app.post('/create', async (req, res)=>{
    const details = new appointment(req.body);
    console.log(req.body);
    await details.save().then(()=>{
        res.send(details).status(201);
    }).catch((err)=>{
        res.send(err).status(400)
    })
})

app.get('/appointments', async (req, res)=>{
    const details = await appointment.find({})
    res.send(details).status(200);
    console.log(details);
})

app.get('/mailSend', async (req, res)=>{
    var transporter = nodemailer.createTransport({
        host: 'gulpereelmanagement.com',
        port: 25,
        secure: true,
        auth: {
          user: 'ContactUs@gulpereelmanagement.com',
          pass: 'j08h8D%a9'
        }
    });
    var mailOptions = {
        from: 'ContactUs@gulpereelmanagement.com',
        to: 'moafzalhd786@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send(error).status(400);
        } else {
          console.log('Email sent: ' + info.response);
          res.send("Mail sent successfully.").status(200);
        }
      });
});

app.listen(port, ()=>{
    console.log(`App is live in port ${port}`);
})
