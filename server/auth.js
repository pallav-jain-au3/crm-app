const jwt = require("jsonwebtoken");
const User = require('./models/UserSchema');

module.exports = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) throw { error: "Unauthorised Request" };

  try {
    const verifiy = await jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({_id:verifiy});
    if (!user) throw {error : "Invalid User"}
    req.user = verifiy;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({error:error.message });
  }
};
