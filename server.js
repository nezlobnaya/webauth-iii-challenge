const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config()

const usersRouter = require('./routes/users/users-router')
const authRouter = require('./auth/auth-router')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)


server.get('/', (req, res, next) => {
    const messageOfTheDay = process.env.MOTD
    res.send(`<h1>${messageOfTheDay}</h1>`)
}) 

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: 'Bad mistake, Engineer!', err 
    })
})

module.exports = server 