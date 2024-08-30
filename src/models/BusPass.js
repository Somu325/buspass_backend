import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../db/config.js";


class BusPass extends Model {}

BusPass.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User_tbl',
            key: 'id'
        }
    },
    aadharNumber: {
        type: DataTypes.STRING(12),
        allowNull: false,
        unique: true
    },
    studyCertificate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(20),
        defaultValue: 'Accepted'
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: 'BusPass_tbl'
});

export default BusPass;
