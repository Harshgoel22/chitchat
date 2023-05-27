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

app.post('/getdata',async(req,res)=>{
    try{
        const data = await student.find({[req.body.name]: req.body.value});
        res.json(data);
    }catch(err){
        throw err;
    }
})

app.post('/signup', async (req,res)=>{
    try{
        const {fname, lname, username, email, pasword, confirm_pasword} = req.body.data;
        const valid = req.body.valid;
        console.log("valid -> ",valid);
        //hash
        const salt = parseInt(process.env.REACT_APP_SALT);
        const hashPassword = await bcrypt.hash(pasword,salt);
        const hashConfirmPassword = await bcrypt.hash(confirm_pasword,salt);
        // console.log("hash -> ",hashPassword);

        if(valid){ 
            await new student({fname, lname, username, email, pasword: hashPassword, confirm_pasword: hashConfirmPassword});
            // await student.create({fname, lname, username, email, pasword: hashPassword, confirm_pasword: hashConfirmPassword});
            // await instance.save();
        }
    }catch(e){throw e}
})

const port = process.env.REACT_APP_PORT;

app.listen(port, ()=>{
    console.log(`port is running on server ${port}`);
})