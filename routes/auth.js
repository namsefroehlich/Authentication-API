const router = require('express').Router();
const { schema } = require('../model/User');
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const { valid } = require('@hapi/joi');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {

    // Validating Register Req.Body
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if user exists
    const emailExists =  await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email already Exists');

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Creating a new User
    const user = new User({
        namse: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {
        // Validating Login Req.Body
        const {error} = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        
        // Checking if user exists
        const user =  await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send("Email doesn't Exists");

        // Is Password Correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).send("Invalid Password");

        // Create and assign Session Token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
});


module.exports = router;

