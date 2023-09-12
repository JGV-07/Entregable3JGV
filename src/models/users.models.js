import { DataTypes } from "sequelize";
import db from "../utils/database.js";

const User = db.define( 'users', {
    username:{
        type: DataTypes.STRING(35),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    timestamps: false,
})

export default User;