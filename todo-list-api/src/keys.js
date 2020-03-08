module.exports = {
  mongoHost: process.env.MONGO_HOST | 'localhost',
  mongoPort: process.env.MONGO_PORT | '27017',
  nodePort: process.env.NODE_PORT | 3000,
};
