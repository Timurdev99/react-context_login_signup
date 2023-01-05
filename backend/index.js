const express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes');

const app = express();
const port = process.env.PORT || "8000";

let users = [];

app.use(express.json());
app.use(cors());

const connectDB = (req, res, next) => {
  req.users = users;
  next();
}

app.use('/api', connectDB, routes);

app.listen(port, () => {
  console.log(`Server is starting at port ${port}.`);
}); 