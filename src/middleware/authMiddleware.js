const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'verysecretkey';

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const parts = authHeader.split(' ');
  let token = null;
  if (parts.length === 2) {
    const [scheme, t] = parts;
    if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: 'Token malformatted' });
    token = t;
  } else if (parts.length === 1) {
    // allow raw token without Bearer prefix
    token = parts[0];
  } else {
    return res.status(401).json({ error: 'Token error' });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token invalid' });
    req.user = decoded;
    next();
  });
};

exports.allowRoles = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
  next();
};
