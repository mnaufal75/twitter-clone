const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const dotenv = require('dotenv').config();

const app = express();

app.use(cors())
app.use(express.json());

app.use("/api", routes);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log("Starting server");
    });
  })


