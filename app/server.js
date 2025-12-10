const express  = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();


const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());



mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));



    const User = mongoose.model("User", new mongoose.Schema({

        name: String,
        title: String,
        url: String,
        image: String

    }));


    app.post ("/saveMusic", async (req,res)=> {
        const {name , title,url,image} = req.body;

        await User.create({name, title,  url, image});

        res.json({message: " Track saved!"})
    });


    app.get("/allMusic", async (req, res)=>{
        try{
            const songs = await User.find();
            res.json(songs);
        }catch (err){
            res.status(500).json({message:err.message})
        }
    });


    app.delete('/deleteAllMusic', async (req, res)=>{
        try{
            await User.deleteMany({})
        }catch(error){
            res.status(500).json({error: error.message});
        }
    });



    app.listen(PORT, ()=>  console.log(`Server running on port ${PORT}`));


    