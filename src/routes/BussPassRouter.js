import express from 'express';
import BusPass from '../models/BusPass.js'; // Adjust the path as needed

const busPassRouter = express.Router();

// Create a new bus pass
busPassRouter.post('/buspass', async (req, res) => {
    try {
        const { userId, aadharNumber, studyCertificate, mobile, status } = req.body;
        const newBusPass = await BusPass.create({ userId, aadharNumber, studyCertificate, mobile, status });
        res.status(201).json(newBusPass);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all bus passes
busPassRouter.get('/buspass', async (req, res) => {
    try {
        const busPasses = await BusPass.findAll();
        res.status(200).json(busPasses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific bus pass by ID
busPassRouter.get('/buspass/:id', async (req, res) => {
    try {
        const busPass = await BusPass.findByPk(req.params.id);
        if (busPass) {
            res.status(200).json(busPass);
        } else {
            res.status(404).json({ error: 'Bus pass not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a bus pass by ID
busPassRouter.put('/buspass/:id', async (req, res) => {
    try {
        const { userId, aadharNumber, studyCertificate, mobile, status } = req.body;
        const busPass = await BusPass.findByPk(req.params.id);
        if (busPass) {
            await busPass.update({ userId, aadharNumber, studyCertificate, mobile, status });
            res.status(200).json(busPass);
        } else {
            res.status(404).json({ error: 'Bus pass not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a bus pass by ID
busPassRouter.delete('/buspass/:id', async (req, res) => {
    try {
        const busPass = await BusPass.findByPk(req.params.id);
        if (busPass) {
            await busPass.destroy();
            res.status(200).json({ message: 'Bus pass deleted' });
        } else {
            res.status(404).json({ error: 'Bus pass not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default busPassRouter;
