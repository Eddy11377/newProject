const { sequelize, DataTypes } = require('../index');

module.exports = sequelize.define("subscription", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },

    subscriber: {
        allowNull: false,
        type: DataTypes.STRING
    }
}, {
    tableName: "subscriptions",
    timestamps: true,
    underscored: true
})