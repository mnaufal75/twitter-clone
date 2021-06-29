const mongoose = require('mongoose');

const app = require('./app');

const connect = async (url) => {
  return mongoose.connect(url,
    { useNewUrlParser: true, useUnifiedTopology: true });
};

if (require.main === module) {
  app.listen(process.env.PORT, () => console.log('Connected to server'));
  connect(process.env.MONGODB_URI);
  mongoose.connection.on('error', console.log);
};

module.exports = { connect };
