module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        display_name: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING
        },
        p_hash: {
            type: Sequelize.STRING
        }
    });

    return User;
};