const { body } = require('express-validator');

module.exports = () => {
    return [
        body('username').isString().notEmpty().escape().trim(),
        body('password').isString().notEmpty().escape().trim()
    ]
}