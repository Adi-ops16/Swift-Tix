const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Swift-Tix server is working')
})


app.listen(port, (req, res) => {
    console.log("Swift-Tix server is running on port:", port)
})
