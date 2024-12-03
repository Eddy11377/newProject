const { sequelize, DataTypes } = require('../index')

module.exports = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        allowNull: false,
        type: DataTypes.STRING
    },

    token: {
        allowNull: true,
        type: DataTypes.STRING
    },

    settings: {
        allowNull: true,
        type: DataTypes.JSONB
    }
}, {
    timestamps: true,
    underscored: true,
    tableName: "users"
})