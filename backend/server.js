const express=require("express"); //or import express from "express";
const mysql=require("mysql2");  
const cors=require("cors");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const multer = require('multer');

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin:'http://localhost:3000',
        methods:['POST','GET','PUT','DELETE'],
        credentials:true
    }
));


const salt=10;

const db=mysql.createConnection(
   {  host: "localhost", 
      user:"root",
      password:"root",
    database:"nodeproject"
});



const verifyUser=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.json({Error:"Sorry, this link has expired and is not available any more"});
    }
    else{
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if(err){
                return res.json({Error:"Token is not okey"})
            }
            else{
                req.name=decoded.name;
                next();
            }
        })
    }
}

app.get("/", verifyUser, (req,res)=>{

        return res.json({Status:"Success",name:req.name});
})

app.post("/register" ,(req,res)=>{
    // const sql="INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    const sql = "INSERT INTO login (name, email, password) VALUES (?)";


    bcrypt.hash(req.body.password.toString(), salt, (err, hash)=>{
        if(err) return res.json({Error:"Error for hashing password"});
        const values=[
            req.body.name,
            req.body.email,
            hash
        ]

        db.query(sql,[values], (err,result)=>{
            if(err){      
                console.error("Database error:", err);
                return res.json({Error:"Inserting data Error in server"});}

                console.log("mysql connected");
                
            return  res.json({Status:"Success"});
        })
    })   
})



app.post("/login",(req,res)=>{
    const sql="SELECT * FROM login where email=?";
    db.query(sql,[req.body.email],(err,data)=>{
        if(err) return res.json({Error:"Login error in server"});
        if(data.length>0){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response)=>{
                if(err) return res.json({Error:"Password compare error"});
                if(response){
                    const name=data[0].name;
                    const token=jwt.sign({name},"jwt-secret-key",{expiresIn:'1d'});
                    res.cookie('token',token);
                    return res.json({Status:"Success"});
               
                }
                else{
                    return res.json({Error:"Password not matched"});
                }
            })
        
        }
        else{
            return res.json({Error:"NO email existed"});
        }
    })
})



app.get("/logout",(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"});
})


app.get("/category",(req,res)=>{
    const sql="SELECT * FROM student";
    db.query(sql,(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})


app.post('/create',(req,res)=>
{
    const sql="Insert into student (name,email) values(?)";
    const values=[
        req.body.name,
        req.body.email
    ]

    db.query(sql,[values],(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})
  


app.put('/update/:id',(req,res)=>
    {
        const sql="UPDATE student SET name=?, email=? where id=?";
        const values=[
            req.body.name,
            req.body.email
        ]
    
        const id=req.params.id;
        db.query(sql,[...values,id],(err,data)=>{
            if(err) return res.json("Error");
            return res.json(data);
        })
    })


    app.delete('/student/:id',(req,res)=>
        {
            const sql="DELETE FROM student where id=?";
        
            const id=req.params.id;
            db.query(sql,[id],(err,data)=>{
                if(err) return res.json("Error");
                return res.json(data);
            })
        })

app.listen(8081,()=>{
    console.log("Running...");
    
})

