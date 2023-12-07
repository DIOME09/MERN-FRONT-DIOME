const express = require("express")
const { API_VERSION } = require("./constants.js")
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

// Importacion de rutas
const authRoutes = require("./router/auth.router")
const userRoutes = require("./router/user.router")
const menuRoutes = require("./router/menu.router")

// Configurar Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Configurar Carpeta Estaticos
app.use(express.static('uploads'))

// <configurar headers, HTTP y CORS
app.use(cors())

// Configurar Rutas
app.use(`/api/${API_VERSION}`, authRoutes)
app.use(`/api/${API_VERSION}`, userRoutes)
app.use(`/api/${API_VERSION}`, menuRoutes)

module.exports = app 