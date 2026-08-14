const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Admin-only endpoints to create users
router.post('/admin', authMiddleware.verifyToken, authMiddleware.allowRoles('admin'), userController.createAdmin);
router.post('/seller', authMiddleware.verifyToken, authMiddleware.allowRoles('admin'), userController.createSeller);

// Admin-only: list users
router.get('/', authMiddleware.verifyToken, authMiddleware.allowRoles('admin'), userController.getAll);

module.exports = router;
