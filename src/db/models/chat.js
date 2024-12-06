const { sequelize, DataTypes } = require('../index');

module.exports = sequelize.define("chat", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },

    firstParticipant: {
        type: DataTypes.STRING,
        allowNull: false
    },

    secondParticipant: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
        timestamps: false,
        tableName: 'chats',
        underscored: true
})

