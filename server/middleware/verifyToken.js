const jwt =  require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.status(403).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.clearCookie("token");
    res.status(500).json({ error: err.message });
  }
};

module.exports = verifyToken;