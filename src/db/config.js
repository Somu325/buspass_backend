import sequelize from "sequelize";
import { config } from 'dotenv';
config(); // This loads environment variables 
const dbHost = process.env.RDS_HOSTNAME;
const dbPort = process.env.RDS_PORT;
const dbName = process.env.RDS_DB_NAME;
const dbUser = process.env.RDS_USERNAME;
const dbDriver = process.env.DB_DRIVER;
const dbPassword = process.env.RDS_PASSWORD;
console.log("details are ",dbDriver,dbHost,dbName,dbUser,dbPassword);


function getConnection() {
    if (!dbHost || !dbPort || !dbName || !dbUser || !dbPassword) {
        throw new Error('Missing required database environment variables');
    }

    return new sequelize(dbName, dbUser, dbPassword, {
        host: dbHost,
        port: parseInt(dbPort || '5432'),
        dialect: dbDriver,
    });
}

const sequelizeConnection = getConnection();

if (sequelizeConnection) {
    console.log('Database connection established successfully');
}

export default sequelizeConnection;
