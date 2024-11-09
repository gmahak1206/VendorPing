if(process.env.ENVIROMENT === "development") {
    require('dotenv').config();
}

const PORT = process.env.PORT || 10000;
const ENVIROMENT = process.env.ENVIROMENT;
const MONGODB_URI = ENVIROMENT === "development" ? process.env.MONGODB_URI_DEV : process.env.MONGODB_URI_PROD;
const TOKEN_SECRET = ENVIROMENT === "development" ? "ybhhufei7ghf7c7btv[=]'=[38hq" : generateTokenSecret();

module.exports = {
    MONGODB_URI,
    PORT,
    ENVIROMENT,
    TOKEN_SECRET,
};