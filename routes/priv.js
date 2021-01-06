const router = require('express').Router();
const verify = require('./verifyToken');

//Private Route Only Accesible with Token 

router.get('/', verify, (req, res) => {
    res.json({
        privateData: {
            data: "I like hummus!"
        }
    });
});

module.exports = router;