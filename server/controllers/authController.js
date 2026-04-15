import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const generateToken = (userId) => {
  return jwt.sign({ id: userId },
     process.env.JWT_SECRET,
      { expiresIn: '7d' });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please fill all the fields'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters' 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists'
       });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password,salt);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      message: 'Register successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ 
      message: 'Server not responding'
     });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Fill email and password correctly'
       });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        message: 'No user found'
       });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        message: 'Invalid credentials'
       });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        message: 'Login successfully'
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ 
      message: 'Server error'
     });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error('GetMe giving error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
