const { sequelize, DataTypes } = require('../index')

module.exports = sequelize.define("post", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "posts",
    timestamps: true,
    underscored: true
})