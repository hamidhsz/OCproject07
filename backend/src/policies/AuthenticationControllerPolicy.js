const Joi = require('joi')
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_]{8,30}$/
const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(passwordRegex).required()
    
})

module.exports = { 
async register(req,res,next){ 
    try {
        const { error, value } = await schema.validateAsync(req.body)
        next()
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            const errorMessage = error.details[0].message
            if (errorMessage.includes("email")) {
                res.status(400).send({
                    error: "Invalid email address"
                })
            } else if (errorMessage.includes("password")) {
                res.status(400).send({
                    error: "Invalid password pattern"
                })
            } else {
                res.status(400).send({
                    error: errorMessage
                })
            }
        } else {
            console.log(error)
            res.status(500).send({
                error: 'Internal server error'
            })
        }
    }
    
    console.log('AuthenticationControllerPolicy.register middleware called');
    
}

}






