const mongoose = require('mongoose');

//mongoDB setup
const DB = 'mongodb+srv://root:admin@cluster0.y4ep6st.mongodb.net/chitchat?retryWrites=true&w=majority';

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log(`Database has been successfully connected!`);
}).catch(err => console.log("no connection!"));

const Schema =  mongoose.Schema;
const objectSchema = new Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    pasword: {type: String, required: true},
    confirm_pasword: {type: String, required: true}
})

const student = mongoose.model("student",objectSchema);

module.exports = student;