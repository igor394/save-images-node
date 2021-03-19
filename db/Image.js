const Sequilize = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('image', {
        id: {
            type: Sequilize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        image_name: {
            type: Sequilize.STRING,
            allowNull: false
        },
        file_name: {
            type: Sequilize.STRING,
            allowNull: false
        },
        user_name: {
            type: Sequilize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'image' /*либо изменять в базе данных название таблицы на "images" (sqlMessage: "Table 'node_proj.images' doesn't exist"), т.к. sequelize по умолчанию добовляет именам в конец "s" */
    });
}