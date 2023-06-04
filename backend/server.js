require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const {student} = require('./mongodb');
const jwt = require('jsonwebtoken');
const http = require("http")
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/',(req,res)=>{
    res.send("hello");
})

let uname = '';

app.post('/getlogindata', async (req,res)=>{
    try{
        const {login_username, login_pasword} = req.body.list;
        // console.log(login_username+" -> "+login_pasword);
        const studentRecord = await student.find({'username': login_username});
        let bool = false;
        if(studentRecord.length!==0) bool = await bcrypt.compare(login_pasword, studentRecord[0].pasword);
        console.log("record -> ",studentRecord);
        console.log("bool -> ",bool);
        res.json({studentRecord,bool});
    }catch(err){
        throw err;
    }
})

app.post('/submitLoginData',async(req,res)=>{
    try{
        const {login_username, login_pasword} = req.body.list;
        const studentRecord = await student.find({'username': login_username, 'pasword': login_pasword});
        /*
        const token =  jwt.sign({_id: studentRecord._id}, process.env.REACT_APP_SECRET_KEY);
        console.log("login_token -> ", token);
        res.cookie("jwt", token, {
            httpOnly: true,
            expires: new Date(Date.now()+60*60*24*1000)
        })
        await student.updateOne({username: login_username}, {$push:{tokens:{token: token, _id: studentRecord._id}}});
        */uname = login_username;
    }catch(err){
        console.log(err);
    }
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
        console.log(`${fname} -> ${lname} -> ${username} -> ${email} -> ${pasword} -> ${confirm_pasword}`)
        const valid1 = req.body.valid1;
        const valid2 = req.body.valid2;
        console.log(`valid1 -> ${valid1} && valid2 -> ${valid2}`);
        console.log("valid1 && valid2 -> ",valid1&&valid2);
        if(valid1&&valid2){
            //hash
            const salt = parseInt(process.env.REACT_APP_SALT);
            const hashPassword = await bcrypt.hash(pasword,salt);
            const hashConfirmPassword = await bcrypt.hash(confirm_pasword,salt);
            // console.log("hash -> ",hashPassword);

            const instance = new student({fname, lname, username, email, pasword: hashPassword, confirm_pasword: hashConfirmPassword});
            await instance.save();

            const studentRecord = await student.findOne({username: username});
            // console.log(studentRecord);
            const token = jwt.sign({_id: studentRecord._id},process.env.REACT_APP_SECRET_KEY);
            // console.log("token -> ",token);
            res.cookie("jwt",token,{
                expires: new Date(Date.now()+60*60*24*1000),
                httpOnly: true
            })
            await student.updateOne({_id: studentRecord._id},{$push:{tokens: {token: token}}});
            uname = username;
        }
    }catch(e){throw e}
})

app.post('/onChangeSearch',async (req,res)=>{
    const {searchTag, id} = req.body;
    // console.log(`searching: ${searchTag}`);
    const data = (searchTag==="") ? 
        await student.find({recentTab: 'yes',username: {$ne: id}}) : 
        await student.find({$and: [
            {username: new RegExp(searchTag, 'i')},
            {username: {$ne: id}}
        ]});
    console.log(`search_output: ${data}`);
    res.json(data);
})

app.post('/updateRecentTab',async (req,res)=>{
    const {username, id} = req.body;
    await student.updateOne({'username': username},{recentTab: 'yes'});
    const data = await student.findOne({$and: [
        {username: username},
        {username: {$ne: id}}
    ]});
    console.log(`msgData: ${data}`);
    res.json(data);
})

//socket io connection
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"]
    }
});

io.on("connection",(socket)=>{
    console.log(`user connected: ${socket.id}`);

    if(uname!==""){
        socket.join(uname);
    }

    socket.on("send_message",(data)=>{
        console.log("message: ",data);
        //update msg to sender and receiver's db
        socket.join(data.receiver);
        socket.to(data.receiver).emit("receive_message",{msg: data.msg, sent: 'receive'});
    })

    socket.on("disconnect",()=>{
        console.log("User disconnected: ",socket.id);
    })
});

const port = process.env.REACT_APP_PORT;

server.listen(port, ()=>{
    console.log(`port is running on server ${port}`);
})
