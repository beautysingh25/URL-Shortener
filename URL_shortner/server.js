import express from 'express'
import mongoose from 'mongoose';
import {shortUrl} from './controllers/url.js'
import { getOriginalUrl } from './controllers/url.js';

const app = express();

app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://beautykumari159357:2Kq6gpIDw7IgBJiM@cluster0.rwejqr5.mongodb.net/",
    {
        dbName: "urlShortner",
    }
).then(()=>console.log("MongoDB connected..!")
).catch((err)=> console.log(err))

//rendering the ejs file
app.get('/' , (req, res)=>{
    res.render("index.ejs", {shortUrl: null})
})

//shorting url logic
app.post('/short', shortUrl)

//redirect to original url using short code: dynamic routing
app.get('/:shortCode', getOriginalUrl);

const port = 2000;

app.listen(port, ()=>console.log(`server is running on port ${port}`))