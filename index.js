const  express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

app.use(express.json())

require('./src/bot/bot')

async function dev() {
    try {
        mongoose.connect(process.env.MONGO_URL , {
            useNewUrlParser: true
        }).then(() => console.log('mongo connect'))
        .catch((error) => console.log(error))
        
        app.listen(process.env.PORT, () => {
            console.log('server is runing');
        })
    } catch (error) {
        console.log(error);
    }
}

dev()