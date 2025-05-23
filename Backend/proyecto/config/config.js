require('dotenv').config()

module.exports ={
    development:{
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
              require: process.env.DB_SSL === "true",
              rejectUnauthorized: false,
            },
        },
    },
};