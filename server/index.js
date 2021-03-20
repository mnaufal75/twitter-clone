const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use("/api", routes);

mongoose
  .connect("mongodb+srv://mnaufal75:HYjJYnjNvQ5N3be@cluster0.lva9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    app.listen(5000, () => {
      console.log("Starting server");
    });
  })


