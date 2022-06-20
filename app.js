const express = require('express')
const app = express()
const port = 3000

const weatherRoute = require('./routes/weather')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.use('/', weatherRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})