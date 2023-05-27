require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const student = require('./mongodb')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/',(req,res)=>{
    res.send("hello");
})

app.post('/signup', async (req,res)=>{
    try{
        const {fname, lname, username, email, pasword, confirm_pasword} = req.body;
        //hash
        const salt = parseInt(process.env.REACT_APP_SALT);
        const hashPassword = await bcrypt.hash(pasword,salt);
        const hashConfirmPassword = await bcrypt.hash(confirm_pasword,salt);
        // console.log("hash -> ",hashPassword);

        await student.create({fname, lname, username, email, pasword: hashPassword, confirm_pasword: hashConfirmPassword});
    }catch(e){throw e}
})

const port = process.env.REACT_APP_PORT;

app.listen(port, ()=>{
    console.log(`port is running on server ${port}`);
})