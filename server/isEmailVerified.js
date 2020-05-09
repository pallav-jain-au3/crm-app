const User = require('./models/UserSchema')
module.exports = async (req, res, next) => {
    const _id = req.user._id;
    try {
        let user = await User.findOne({ _id });
        if (!user) throw {error : "Invalid User"}
        if (user.isVerified){
            next();
        }
        else {
           throw {error : "Please verify your email"}
        }
    }catch(err){
        res.status(400).json(err)
    }

}