const users = require('../models/userModel');

module.exports = {
  getAll: () => users,
  findByUsername: (username) => users.find(u => u.username === username),
  create: ({ username, password, role }) => {
    const user = { username, password, role };
    users.push(user);
    return user;
  }
};
