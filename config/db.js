const { Sequelize } = require('sequelize');
const { programModel } = require("../model/program");

const dbConnection = async () => {
    const sequelize = new Sequelize('Program', 'postgres', 'Viratkohli1!', {
        host: "localhost",
        dialect: "postgres"
    });
    
    let Program = null;
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        Program = programModel(sequelize);
        await sequelize.sync();
        console.log("Table created Successfully");
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    return { sequelize, Program };
}

module.exports = { dbConnection };
