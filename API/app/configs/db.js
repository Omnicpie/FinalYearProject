module.exports = {
    HOST: "localhost",
    USER: "api",
    PASSWORD: "eshopAPI%pass1",
    DB: "eshop",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};