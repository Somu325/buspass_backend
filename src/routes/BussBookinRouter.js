import express from 'express';
import BusBooking from '../models/BusBooking.js'; // Adjust the path as needed

const busBookingRouter = express.Router();

// Create a new bus booking
busBookingRouter.post('/busbooking', async (req, res) => {
    try {
        const { userId, fromPlace, toPlace, bookingDate } = req.body;
        const newBusBooking = await BusBooking.create({ userId, fromPlace, toPlace, bookingDate });
        res.status(201).json(newBusBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all bus bookings
busBookingRouter.get('/busbooking', async (req, res) => {
    try {
        const busBookings = await BusBooking.findAll();
        res.status(200).json(busBookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific bus booking by ID
busBookingRouter.get('/busbooking/:id', async (req, res) => {
    try {
        const busBooking = await BusBooking.findByPk(req.params.id);
        if (busBooking) {
            res.status(200).json(busBooking);
        } else {
            res.status(404).json({ error: 'Bus booking not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a bus booking by ID
busBookingRouter.put('/busbooking/:id', async (req, res) => {
    try {
        const { userId, fromPlace, toPlace, bookingDate } = req.body;
        const busBooking = await BusBooking.findByPk(req.params.id);
        if (busBooking) {
            await busBooking.update({ userId, fromPlace, toPlace, bookingDate });
            res.status(200).json(busBooking);
        } else {
            res.status(404).json({ error: 'Bus booking not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a bus booking by ID
busBookingRouter.delete('/busbooking/:id', async (req, res) => {
    try {
        const busBooking = await BusBooking.findByPk(req.params.id);
        if (busBooking) {
            await busBooking.destroy();
            res.status(200).json({ message: 'Bus booking deleted' });
        } else {
            res.status(404).json({ error: 'Bus booking not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default busBookingRouter;
