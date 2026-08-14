const userService = require('../services/userService');

exports.createAdmin = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  const existing = userService.findByUsername(username);
  if (existing) return res.status(409).json({ error: 'username already exists' });
  const user = userService.create({ username, password, role: 'admin' });
  res.status(201).json({ username: user.username, role: user.role });
};

exports.createSeller = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  const existing = userService.findByUsername(username);
  if (existing) return res.status(409).json({ error: 'username already exists' });
  const user = userService.create({ username, password, role: 'seller' });
  res.status(201).json({ username: user.username, role: user.role });
};

exports.getAll = (req, res) => {
  const users = userService.getAll();
  res.json(users.map(u => ({ username: u.username, role: u.role })));
};
