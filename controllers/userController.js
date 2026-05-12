import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export function createUser(req, res) {
    const data = req.body;
    const hashedPassword = bcrypt.hashSync(data.password, 10);

    const user = new User({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashedPassword,
        role: data.role,
    });

    user.save()
        .then(() => {
            res.json({
                message: 'User created successfully',
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Error creating user',
                error,
            });
        });
}

export function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }

            const isPasswordCorrect = bcrypt.compareSync(password, user.password);

            if (isPasswordCorrect) {
                const payload = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    Image: user.Image,
                };
                const token = jwt.sign(payload, 'secretKey96$2025', { expiresIn: '1h' });
                res.json({
                    message: 'Login successful',
                    token: token
                });
            } else {
                res.status(401).json({
                    message: 'Incorrect password',
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Error logging in',
                error,
            });
        });
}  