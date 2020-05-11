const jwt = require("jsonwebtoken");
const User = require('./models/UserSchema');

module.exports = async (req, res, next) => {
  try {
  const token = req.header("auth-token")
  if (token === undefined) throw { error: "Unauthorised Request" };
    const verifiy = await jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({_id:verifiy});
    if (!user) throw {error : "Invalid User"}
    req.user = verifiy;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json(error);
  }
};
