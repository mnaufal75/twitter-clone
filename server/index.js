const mongoose = require("mongoose");

const app = require("./app");
const port = process.env.PORT || 5000;

const connect = async (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

if (require.main === module) {
  app.listen(port, () => console.log(`Connected to server with port: ${port}`));

  connect(process.env.MONGODB_URI);
  mongoose.connection.on("error", console.log);
}

module.exports = { connect };
