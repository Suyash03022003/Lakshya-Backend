import express from 'express';
import { User } from '../models/User.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.email ||
            !request.body.password ||
            !request.body.role
        ) {
            return response.status(400).send({
                message: 'Enter all the required fields!'
            });
        }

        const newUser = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            role: request.body.role,
        };

        const user = await User.create(newUser);

        return response.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const user = await User.find({});

        return response.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const user = await User.findById(id);

        return response.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (user) {
            if (password === user.password) {
                response.send({ message: "Login successful!", user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
            } else {
                response.send({ message: "Wrong Credentials!" });
            }
        } else {
            // User not found
            response.send({ message: "User Not Registered!" });
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await User.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).send({ message: 'User updated successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await User.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'User not found' });
        }
        return response.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

export default router;