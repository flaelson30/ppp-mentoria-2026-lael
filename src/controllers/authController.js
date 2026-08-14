const jwt = require('jsonwebtoken');
const users = require('../models/userModel');
const SECRET = process.env.JWT_SECRET || 'verysecretkey';

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ username: user.username, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token });
};

// Removed public register: user creation must be done by admin via /users/admin or /users/seller
