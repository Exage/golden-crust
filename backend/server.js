require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const userRoutes = require('./routes/users')
const personRoutes = require('./routes/category')
const productsRoutes = require('./routes/products')
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/order')
const addressesRoutes = require('./routes/addresses')

const app = express()
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

app.use('/images', express.static('uploads'))
app.use('/api/users', userRoutes)
app.use('/api/category', personRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/bag', cartRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/address', addressesRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port: ${process.env.PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })