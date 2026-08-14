const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.verifyToken, authMiddleware.allowRoles('admin'), userController.create);
router.get('/', authMiddleware.verifyToken, authMiddleware.allowRoles('admin'), userController.getAll);

module.exports = router;
