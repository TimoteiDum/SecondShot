import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Task = sequelize.define(
    "Task",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        paranoid: true,
    }
);

export default Task;
