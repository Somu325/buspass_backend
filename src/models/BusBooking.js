import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../db/config.js";

class BusBooking extends Model {}

BusBooking.init({
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
    fromPlace: {
        type: DataTypes.STRING,
        allowNull: false
    },
    toPlace: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bookingDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: 'BusBooking_tbl'
});

export default BusBooking;
