const { sequelize, DataTypes } = require('../index')

module.exports = sequelize.define("message", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },

    text: {
        allowNull: false,
        type: DataTypes.TEXT
    },

    author: {
        allowNull: false,
        type: DataTypes.STRING,
    },

    chatId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    underscored: true,
    tableName: "messages"
})