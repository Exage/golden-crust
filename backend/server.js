require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const productsRoutes = require('./routes/products')
const personRoutes = require('./routes/category')

const app = express()
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

app.use('/images', express.static('uploads'))
app.use('/api/products', productsRoutes)
app.use('/api/category', personRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port: ${process.env.PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })