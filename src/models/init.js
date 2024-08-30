// src/models/init.js

import User from './user.js';
import BusPass from './BusPass.js';
import Booking from './BusBooking.js';

async function init() {
    const isDev = true; // Set to false in production

    // Define associations
    User.hasOne(BusPass, { foreignKey: 'user_id' });
    BusPass.belongsTo(User, { foreignKey: 'user_id' });

    User.hasMany(Booking, { foreignKey: 'user_id' });
    Booking.belongsTo(User, { foreignKey: 'user_id' });

    // Sync models with the database
    await User.sync({ alter: isDev });
    await BusPass.sync({ alter: isDev });
    await Booking.sync({ alter: isDev });
}

const dbInit = () => {
    init().then(() => {
        console.log("Database initialized successfully.");
    }).catch((error) => {
        console.error("Database initialization failed:", error);
    });
};

export default dbInit;
