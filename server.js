import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dbInit from './src/models/init.js'; // Import the database initialization function
import routes from './src/routes/index.js';

// Create an instance of Express
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the Bus Pass Management API');
});
app.use('/api/v1',routes)
// Initialize the database
dbInit();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
