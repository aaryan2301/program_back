const { Sequelize } = require("sequelize");

const programModel = (sequelize) => {
    const { DataTypes } = Sequelize;

    return sequelize.define("Program", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        domain: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        programType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        registrations: {
            type: DataTypes.ENUM('open', 'closed'),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        placementAssurance: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        universityName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        facultyProfile: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        learningHours: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        certificateDiploma: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eligibilityCriteria: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });
};

module.exports = { programModel };
