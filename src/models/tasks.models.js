import { DataTypes } from "sequelize";
import db from "../utils/database.js";

const Task = db.define( 'tasks', {
    title:{
        type:DataTypes.STRING(35),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    completed:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull :false,
        field: 'user_id'
    },
    categoryId:{
        type: DataTypes.INTEGER,
        allowNull :false,
        field: 'category_id'
    }
}, {
    timestamps: false,
})

export default Task;