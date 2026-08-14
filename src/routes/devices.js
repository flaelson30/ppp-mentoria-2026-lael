const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware.verifyToken, deviceController.getAll);
router.get('/:id', authMiddleware.verifyToken, deviceController.getById);
router.post('/', authMiddleware.verifyToken, authMiddleware.allowRoles('admin'), deviceController.create);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.allowRoles('admin'), deviceController.update);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.allowRoles('admin'), deviceController.remove);

module.exports = router;
