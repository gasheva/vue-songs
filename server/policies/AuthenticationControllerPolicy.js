const Joi = require('joi');

module.exports = {
    register(req, res, next){
        console.log('[x] Policy register');
        const schema = Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }).required(),
            // password: Joi.string().pattern(
            //     new RegExp('^[a-zA-Z0-9]{3, 32}$')
            // ).required()
            password: Joi.string().required()
        });
        console.log('schema');
        const {error, value} = schema.validate(req.body);
        console.log(error);
        console.log(value);
        if(error){
            switch(error.details[0].context.key){
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    });
                    break;
                case 'password':
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                        <br>
                        1. It must contain latin letters or numbers;
                        <br>
                        2. It must at least 8 characters in length and not greater then 32 characters`
                    });
                    break;
                default:
                    res.status(400).send({
                        error: 'Invalid registration information'
                    });
                    break;
            }
        }else{
            next();
        }
    }
}