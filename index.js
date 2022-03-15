import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
const app = express();
import axios from 'axios'
app.use(express.json())
var First_Name = 'Surya'
var Full_name = ''
var Last_Name = 'Balakrishnan'

const req_1 = axios.get('http://localhost:5000/api1')
const req_2 = axios.get('http://localhost:5000/api2')

Promise.all([req_1, req_2]).then(values => {
    var name = values[0].data + ' ' + values[1].data
   const req_3 = axios.post('http://localhost:5000/api3', {name})
   Promise.all([req_3]).then(values =>{
       console.log("Status code is "+values[0].status);
       console.log("Full Name is "+Full_name)
   })
})

app.get('/api1', (req,res)=>{
    res.status(200).json(First_Name)
})

app.get('/api2', (req,res)=>{
    res.status(200).json(Last_Name)
})

app.post('/api3', (req, res) => {
    const {name} = req.body;
    Full_name = name;
    res.sendStatus(200)
})

app.listen(5000,() => console.log("Server listening in 5000"))