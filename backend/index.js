const express =  require('express')
const  app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const server = require('./connect')
const appointment = require('./model')
const bodyParser = require('body-parser')

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

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

app.listen(port, ()=>{
    console.log(`App is live in port ${port}`);
})
