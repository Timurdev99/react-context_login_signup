const jwt = require("jsonwebtoken");

const generateToken = name =>
  jwt.sign(
    {
      name
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h"
    }
  );

module.exports = generateToken;
