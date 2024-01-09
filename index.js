require('dotenv').config()

const express = require("express")
const{connectToMongoDB} = require('./routes/connect')
const urlRoute = require('./routes/url')
const URL = require('./models/url')
const {handleGetAnalytics} = require("./controllers/url")
const app = express()
const port = 3000

connectToMongoDB(process.env.MONGO)
.then(()=> console.log('mongodb connected'))

app.use((req, res, next) => {
    // Set headers to allow requests from any origin
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

app.use(express.json())

app.use('/url',urlRoute)

app.get('/analytics/:shortId', handleGetAnalytics)

app.get('/url/:shortId', async (req, res)=>{
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({shortId},
        {$push:
            {visitHistory:
                {timestamp:Date.now()},
            }
        }
    );
    // await URL.deleteMany({})
        res.redirect(entry.redirectURL)
})


app.listen(port, ()=>{console.log(`server started on port ${port}`)})
