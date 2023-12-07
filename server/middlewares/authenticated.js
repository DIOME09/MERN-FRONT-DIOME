const jwt = require("jsonwebtoken")

function asureAuth(req, res, next) {
    if(!req.headers.authorization){
        res.status(403).send({msg: "La peticion no tiene la cabecera de autenticacion"})
    }

    const token = req.headers.authorization.replace("Bearer", "")

    try {
        const payload = jwt.decoded(token)

        const { exp } = payload
        const currentData = new Date().getTime()

        console.log(exp)
        console.log(currentData)

        if(exp <= currentData){
            return res.status(400).send({msg: "El token ha expirado"})
        }

        req.user = payload
        next()

    } catch (error) {
        return res.status(400).send({msg: "Token Invalido"})
    }
}

module.exports = {
    asureAuth
}