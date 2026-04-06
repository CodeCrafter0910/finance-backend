const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.post('/init-default-roles', roleController.initializeDefaultRoles);

router.post('/', roleController.createRole);

router.get('/', roleController.getAllRoles);

router.get('/:id', roleController.getRoleById);

module.exports = router;
