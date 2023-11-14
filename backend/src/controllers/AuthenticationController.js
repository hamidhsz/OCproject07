const {User} = require('../models/')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const bcrypt = require('bcrypt');


module.exports = {
    async register (req,res) {
        
        // console.log('Request body',req.body)
            try {
                const user = await User.create(req.body)
                res.send(user.toJSON())
            } catch (err) {
                // console.log(err)
                res.status(400).send({
                    // error: 'This email address already used.'
                    error: err.message
                })
            }
        },
    async login (req,res) {
            try {
                const {email, password} = req.body
                const user = await User.findOne({
                    where : {
                        email: email 
                    }
                })
                if (!user){
                    return res.status(403).send({
                        error: "No user found"
                    })
                }
                //Hash entered password 
                const enteredPassword = password; 
                const hashedPassword = user.password;

                const isValid = await bcrypt.compare(enteredPassword, hashedPassword);
    
                if(!isValid){
                    return res.status(401).send('Invalid password');
                }


                
                const token = jwt.sign({id: user.id}, config.jwt.secret, {
                    expiresIn: config.jwt.expiresIn
                  })
                
                const userJson = user.toJSON()
                res.send({
                    user: userJson,
                    
                    token:token
                    
                })
            } catch (err) {
                // console.log(err)
                res.status(500).send({
                    error: 'Invalid info.'
                })
            }
    }
    }

