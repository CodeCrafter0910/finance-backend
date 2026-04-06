const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const { authenticate } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/roleMiddleware');

router.post('/', authenticate, checkPermission('create_records'), recordController.createRecord);

router.get('/', authenticate, checkPermission('view_records'), recordController.getAllRecords);

router.get('/:id', authenticate, checkPermission('view_records'), recordController.getRecordById);

router.get('/user/:userId', authenticate, checkPermission('view_records'), recordController.getRecordsByUser);

router.patch('/:id', authenticate, checkPermission('update_records'), recordController.updateRecord);

router.delete('/:id', authenticate, checkPermission('delete_records'), recordController.deleteRecord);

module.exports = router;
