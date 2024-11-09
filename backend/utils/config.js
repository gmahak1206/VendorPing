if(process.env.ENVIROMENT === "development") {
  require('dotenv').config();
}

const generateTokenSecret = (length = 32) => {
  try {
    const buffer = crypto.randomBytes(length);
    const tokenSecret = buffer.toString('hex');
    return tokenSecret;
  } catch (err) {
    console.log("Error generating token secret");
    throw err;
  }
}

// Port will be provided my render servers. 
// Also 10000 is the default port set by render servers
const PORT = process.env.PORT || 10000;
const ENVIROMENT = process.env.ENVIROMENT;
const MONGODB_URI = process.env.MONGO_URI;
const TOKEN_SECRET = ENVIROMENT === "development" ? "ybhhufei7ghf7c7btv[=]'=[38hq" : generateTokenSecret();
 
module.exports = {
  MONGODB_URI,
  PORT,
  ENVIROMENT,
  TOKEN_SECRET,
};