

// const apis = require('../API/drinks.json')
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const DrinkRouter = require('../API/routes/drinks')



app.use(bodyParser.json())


app.use('/drinks', DrinkRouter)

app.get('/', (req, res) => {
    res.send('HOME')
})

app.listen(8080)