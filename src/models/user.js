import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../db/config.js";


class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    gender: {
        type: DataTypes.STRING(1)
    },
    phone: {
        type: DataTypes.STRING(15), // Define phone attribute
        allowNull: true,
        unique: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: 'User_tbl'
});

export default User;
