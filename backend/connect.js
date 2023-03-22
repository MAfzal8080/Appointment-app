const mongoose = require('mongoose')

const server = mongoose.connect("mongodb://localhost:27017/appointment").then(()=>{
    console.log('connected');
}).catch((err)=>{
    console.log(err);
})

module.export = server