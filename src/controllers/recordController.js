const Record = require('../models/Record');
const User = require('../models/User');

const createRecord = async (req, res) => {
  try {
    const { amount, type, category, description, date, userId } = req.body;

    if (!amount || !type || !category || !date) {
      return res.status(400).json({ message: 'Amount, type, category, and date are required' });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ message: 'Type must be either income or expense' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const record = new Record({
      amount,
      type,
      category,
      description: description || '',
      date: new Date(date),
      userId
    });

    await record.save();
    await record.populate('userId', 'username email');

    res.status(201).json({ message: 'Record created successfully', record });
  } catch (error) {
    res.status(500).json({ message: 'Error creating record', error: error.message });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate, page = 1, limit = 10 } = req.query;

    let filter = {};

    if (type && ['income', 'expense'].includes(type)) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const records = await Record.find(filter)
      .populate('userId', 'username email')
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalRecords = await Record.countDocuments(filter);

    res.status(200).json({ 
      message: 'Records retrieved', 
      records,
      pagination: {
        totalRecords,
        totalPages: Math.ceil(totalRecords / parseInt(limit)),
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records', error: error.message });
  }
};

const getRecordById = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id).populate('userId', 'username email');
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json({ message: 'Record retrieved', record });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching record', error: error.message });
  }
};

const getRecordsByUser = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const filter = { userId: req.params.userId };

    const records = await Record.find(filter)
      .populate('userId', 'username email')
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalRecords = await Record.countDocuments(filter);

    res.status(200).json({ 
      message: 'User records retrieved', 
      records,
      pagination: {
        totalRecords,
        totalPages: Math.ceil(totalRecords / parseInt(limit)),
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user records', error: error.message });
  }
};

const updateRecord = async (req, res) => {
  try {
    const { amount, type, category, description, date } = req.body;

    const updateData = {};
    if (amount !== undefined) updateData.amount = amount;
    if (type !== undefined) {
      if (!['income', 'expense'].includes(type)) {
        return res.status(400).json({ message: 'Type must be either income or expense' });
      }
      updateData.type = type;
    }
    if (category !== undefined) updateData.category = category;
    if (description !== undefined) updateData.description = description;
    if (date !== undefined) updateData.date = new Date(date);

    const record = await Record.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('userId', 'username email');

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ message: 'Record updated', record });
  } catch (error) {
    res.status(500).json({ message: 'Error updating record', error: error.message });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json({ message: 'Record deleted', record });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting record', error: error.message });
  }
};

module.exports = {
  createRecord,
  getAllRecords,
  getRecordById,
  getRecordsByUser,
  updateRecord,
  deleteRecord
};
