const userService = require('../services/userService');

exports.create = (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(400).json({ error: 'username, password and role required' });
  if (!['admin', 'seller'].includes(role)) return res.status(400).json({ error: 'role must be admin or seller' });
  const existing = userService.findByUsername(username);
  if (existing) return res.status(409).json({ error: 'username already exists' });
  const user = userService.create({ username, password, role });
  res.status(201).json({ username: user.username, role: user.role });
};

exports.getAll = (req, res) => {
  const users = userService.getAll();
  res.json(users.map(u => ({ username: u.username, role: u.role })));
};
