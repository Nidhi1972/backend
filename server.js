const express=require('express')
const mongose=require('mongoose')
require('dotenv').config()
const User=require('./models/User')
const bcrypt=require('bcryptjs')

const app=express()
const PORT=3000
app.use(express.json());

//Home page API
app.get('/ ',(req, res)=>{
    res.send("<h1 align=centre>welcome to the MERN Stack week 2 session")
})

//Registration page API

app.post('/register', async(req, res) => {
    const {username,email,password}=req.body
    try {
          const hashedPassword= await bcrypt.hash(password,10)
          const user=new User({username,email,password:hashedPassword})
          await user.save()
          res.json({message: "User Registred..."})
          console.log("User Registration completed...")
    }
    catch (err) 
    {
       console.log(err)
    }
})


//login page API
app.post('/login', async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await user.findOne({email });
        if (!user || !(await bcrypt.compare(password, user.password))) 
            {
             return res.status(400).json({ message: "Invalid Credentials" });
            }
          res.json({ message: "Login Successful", username: user.username });
    }
    
    catch(err)
    {
        console.log(err)
    } 
})

mongose.connect(process.env.MONGO_URL).then(()=>console.log("DB connected successfully....")
).catch(
    (err)=>console.log(err)
)


app.listen(PORT,(err)=>{
    if(err)
    {
        console.log(err)
    }
    console.log("Server is running on port: "+PORT)
})