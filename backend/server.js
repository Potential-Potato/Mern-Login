if (process.env.NODE_ENV !== 'production'){ //check if app is running on prod
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')

const app = express()

// database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Database Connected')
})
.catch((err) => {
    console.log('Database not connected', err)
})

// middleware
app.use(express.json()) //so frontend and backend connects
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))


//routes
app.use('/', authRoutes)

const port = 8000

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})