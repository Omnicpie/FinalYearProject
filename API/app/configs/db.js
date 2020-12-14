module.exports = {
    HOST: "100.66.128.60",
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