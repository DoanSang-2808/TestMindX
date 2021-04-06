const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const User = require("./model/user")
const jwt = require('jsonwebtoken')
const middleware = require('./middleWare')
const TableJob = require("./model/TableJob")
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json({type: 'application/json'}))
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', {useNewUrlParser:true})
app.listen(3000,()=>{
    console.log("Cổng 3000")
})
app.post('/register', async(req, res)=>{
    const newUser = new User();
    newUser.name = req.body.name
    newUser.email = req.body.email
    newUser.password = req.body.password
    try{
        const User = await newUser.save()
        res.send(User);
    }catch(error){
        res.status(400).send(error);
    }
},)
app.post("/login", async (reqs,res)=>{
    const userLogin = await User.findOne({email: reqs.body.email});
    if(!userLogin) return res.status(400).send("Không tìm thấy email")
    const passLogin = await (reqs.body.password == userLogin.password);
    if(!passLogin) return res.status(400).send("Mật khẩu không hợp lệ")
    const token = jwt.sign({_id: userLogin._id}, 'daylatoken')
     res.json(token);
})
app.post('/addjob', middleware, async (req, res) =>{
    const newJob = new TableJob();
    newJob.nameJob = req.body.nameJob
    newJob.content = req.body.content
    newJob.process = req.body.process
    newJob.user  = req.body.user
    try{
        const TableJob = await newJob.save()
        res.send(TableJob);
    }catch(error){
        res.status(400).send(error);
    }
})
app.get('/show', async (req,res) =>{
    const job = await TableJob.find()
    return res.json(job)
})
app.post('/show', async (req,res) =>{
    if(req.body.id){
        if(req.body.id){
            await TableJob.findByIdAndDelete({_id: req.body.id})
            return res.json({
                mess: "Suss"
            })
        }
        return res.json({
            mess: "Error"
        })
    }
})
