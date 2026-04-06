const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticate } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/roleMiddleware');

router.get('/summary', authenticate, checkPermission('view_dashboard'), dashboardController.getDashboardSummary);

router.get('/category-totals', authenticate, checkPermission('view_dashboard'), dashboardController.getCategoryWiseTotals);

router.get('/recent-activity', authenticate, checkPermission('view_dashboard'), dashboardController.getRecentActivity);

router.get('/monthly-trends', authenticate, checkPermission('view_dashboard'), dashboardController.getMonthlyTrends);

router.get('/user/:userId/summary', authenticate, checkPermission('view_dashboard'), dashboardController.getUserDashboardSummary);

module.exports = router;
