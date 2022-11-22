
const express = require('express')

const router = express.Router();
const drinks = [

    {
        name: "BMW",
        alkoholic:"alkoholic",
    },
    {
        name: "KKS",
        alkoholic:"soft",

    }
]


router.get('/', (req, res) => {
    res.send(drinks)
})


router.post('/', (req, res) => {
    console.log('mamaaaaaaa')

    res.send('mamaaaaaaa')
})

module.exports = router;