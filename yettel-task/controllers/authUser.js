const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token nije poslat" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Nevalidan token" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Nevalidan token" });
  }
};

module.exports = authUser;
