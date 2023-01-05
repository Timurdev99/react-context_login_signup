const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {

  const { name, email, password } = req.body;
  let { users } = req;

  const emailExist = users.find((user) => user.email === email);

  if (emailExist) {
    return res.status(400).json({error: "A user with that email already exists"});
  }

  const nameExist = users.find((user) => user.name === name);

  if (nameExist) {
    return res.status(400).json({error: "A user with that name already exists"});
  }

  const salt = await bcrypt.genSalt(10);
  encryptedPassword = await bcrypt.hash(password, salt);

  users.push({
    name,
    email,
    encryptedPassword
  });

  const token = generateToken(name);

  return res.status(201).json({
    success: {
      token: token
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const { users } = req; 

  const user = users.find(user => user.email === email);

  if (user && (await bcrypt.compare(password, user.encryptedPassword))) {
    const token = generateToken(user.email);

    return res.status(200).json({
      success: {
        token: token
      }
    });
  } else {
    return res.status(401).json({error: "Invalid email or password"});
  }
};

exports.logout = (req, res, next) => {
  res.clearCookie("token");

  res.send("You have successfully logged out");
};
