const Record = require('../models/Record');

const getDashboardSummary = async (req, res) => {
  try {
    const records = await Record.find();

    const totalIncome = records
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);

    const totalExpense = records
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);

    const netBalance = totalIncome - totalExpense;

    res.status(200).json({
      message: 'Dashboard summary retrieved',
      summary: {
        totalIncome,
        totalExpense,
        netBalance
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching summary', error: error.message });
  }
};

const getCategoryWiseTotals = async (req, res) => {
  try {
    const records = await Record.find();

    const categoryTotals = {};

    records.forEach(record => {
      if (!categoryTotals[record.category]) {
        categoryTotals[record.category] = {
          income: 0,
          expense: 0,
          total: 0
        };
      }

      if (record.type === 'income') {
        categoryTotals[record.category].income += record.amount;
      } else {
        categoryTotals[record.category].expense += record.amount;
      }

      categoryTotals[record.category].total =
        categoryTotals[record.category].income - categoryTotals[record.category].expense;
    });

    res.status(200).json({
      message: 'Category wise totals retrieved',
      categoryTotals
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category totals', error: error.message });
  }
};

const getRecentActivity = async (req, res) => {
  try {
    const limit = req.query.limit || 10;

    const recentRecords = await Record.find()
      .populate('userId', 'username email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      message: 'Recent activity retrieved',
      recentRecords
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent activity', error: error.message });
  }
};

const getMonthlyTrends = async (req, res) => {
  try {
    const records = await Record.find();

    const monthlyData = {};

    records.forEach(record => {
      const date = new Date(record.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          income: 0,
          expense: 0
        };
      }

      if (record.type === 'income') {
        monthlyData[monthKey].income += record.amount;
      } else {
        monthlyData[monthKey].expense += record.amount;
      }
    });

    const sortedMonthlyData = Object.keys(monthlyData)
      .sort()
      .reduce((acc, key) => {
        acc[key] = monthlyData[key];
        return acc;
      }, {});

    res.status(200).json({
      message: 'Monthly trends retrieved',
      monthlyTrends: sortedMonthlyData
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching monthly trends', error: error.message });
  }
};

const getUserDashboardSummary = async (req, res) => {
  try {
    const { userId } = req.params;

    const records = await Record.find({ userId });

    const totalIncome = records
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);

    const totalExpense = records
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);

    const netBalance = totalIncome - totalExpense;

    const categoryTotals = {};
    records.forEach(record => {
      if (!categoryTotals[record.category]) {
        categoryTotals[record.category] = 0;
      }
      categoryTotals[record.category] += record.type === 'income' ? record.amount : -record.amount;
    });

    res.status(200).json({
      message: 'User dashboard summary retrieved',
      summary: {
        totalIncome,
        totalExpense,
        netBalance,
        categoryTotals,
        totalRecords: records.length
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user summary', error: error.message });
  }
};

module.exports = {
  getDashboardSummary,
  getCategoryWiseTotals,
  getRecentActivity,
  getMonthlyTrends,
  getUserDashboardSummary
};
