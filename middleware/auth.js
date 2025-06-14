const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log({message:authHeader});
    const accessToken = authHeader?.split(" ")[1];
    // console.log(accessToken);
    if (!accessToken) {
      return res
        .status(403)
        .send({ error: "Access denied. No Access Token provided." });
    }
    const valid = jwt.verify(accessToken, process.env.SECRET_KEY);
    // const valid = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    // const valid = jwt.verify(accessToken, "SECRETKEY");
    // console.log({ message: valid });
    req.user = valid;
    next();
  } catch (err) {
    res.status(400).send("invaled Access Token");
  }
};
