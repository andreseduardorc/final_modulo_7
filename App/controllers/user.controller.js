const {users} = require('../models')
const db = require('../models')
const User = db.users
const Bootcamp = db.bootcamps

exports.createUser = (user)=>{
    return user.create({
        firstName : user.firstName,
        lastName : user.lastName,
        email: user.email

    })
    .then(user =>{
        console.log(`usuario creado: ${JSON.stringify(user, null, 4)}`)
        return user
    })
    .catch((err)=>{
        console.log(`error al crear usuario-${err}`)
    })

}
