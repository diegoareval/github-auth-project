const router = require('express').Router()
const signup = require('../controllers/auth.controller')
const login = require('../controllers/auth.controller')
const getCurrentUser = require('../controllers/auth.controller')
const {validateUser} = require('../middleware/validation');
const {loginValidation} = require('../middleware/loginvalidation');
const auth = require('../middleware/auth')


router.post('/signup',validateUser,signup.signup)
router.post('/login',loginValidation,login.login)
router.get('/user',auth, getCurrentUser.getCurrentUser)



module.exports = router