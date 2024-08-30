import express from 'express';
import User from '../models/user.js'; // Adjust the path as needed

const userRouter = express.Router();

// Create a new user
userRouter.post('/users', async (req, res) => {
    try {
        const { username, email, password, gender, phone } = req.body;
        const newUser = await User.create({ username, email, password, gender, phone });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all users
userRouter.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific user by ID
userRouter.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user by ID
userRouter.put('/users/:id', async (req, res) => {
    try {
        const { username, email, password, gender, phone, active, is_deleted } = req.body;
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update({ username, email, password, gender, phone, active, is_deleted });
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a user by ID (soft delete)
userRouter.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update({ is_deleted: true });
            res.status(200).json({ message: 'User soft deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default userRouter;
