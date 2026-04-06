const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

router.post('/', userController.createUser);

router.get('/', authenticate, checkRole(['admin']), userController.getAllUsers);

router.get('/:id', authenticate, userController.getUserById);

router.patch('/:id/role', authenticate, checkRole(['admin']), userController.updateUserRole);

router.patch('/:id/toggle-status', authenticate, checkRole(['admin']), userController.toggleUserStatus);

router.delete('/:id', authenticate, checkRole(['admin']), userController.deleteUser);

module.exports = router;
