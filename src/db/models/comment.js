const { sequelize, DataTypes } = require('../index') 

module.exports = sequelize.define("comment", {
    id: {
        primaryKey: true,
        allowNull: false, 
        autoIncrement: true,
        type: DataTypes.INTEGER
    }, 

    username: {
        allowNull: false, 
        type: DataTypes.STRING,
    }, 

    postId: {
        allowNull: false, 
        type: DataTypes.INTEGER
    },

    text: {
        allowNull: false, 
        type: DataTypes.TEXT
    }

}, {
    tableName: "comments",
    timestamps: true,
    underscored: true
})