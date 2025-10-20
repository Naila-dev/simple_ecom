import User from '../models/usermodel.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    // Here you would typically add logic to save the user to the database
    res.status(201).json({ message: 'User signed up successfully', user: { username, email } });

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
try {
    await newUser.save();
    res.status(201).json({ message: 'User signed up successfully', User });
}
catch (error) {
    res.status(500).json({ message: 'Error signing up user', error: error.message });
};
};