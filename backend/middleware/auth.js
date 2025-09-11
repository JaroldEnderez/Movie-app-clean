const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ msg: "No auth token" });

    const token = authHeader.replace("Bearer ", "").trim(); // remove 'Bearer '
    if (!token) return res.status(401).json({ msg: "No token provided" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.status(401).json({ msg: "Token invalid" });

    req.user = verified.id; 
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ error: "Invalid token" }); // return 401 instead of 500
  }
};

module.exports = auth;
