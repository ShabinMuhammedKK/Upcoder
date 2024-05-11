import express from 'express';
import {config} from 'dotenv';
config();

const app = express();

const start = async ()=>{
    try {
        const port = process.env.PORT || 3000;

        app.use(express.json());
        app.use(express.urlencoded({extended:true}));

        app.get('/',(req,res)=>{
            res.status(200).send("hello user !!!")
        })

        app.listen(port,()=>{
            console.log("User-srv running on PORT 3000 !!!")
        })

        return app;
    } catch (error) {
        console.log(error);
    }
}

export {start};