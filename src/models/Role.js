const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['viewer', 'analyst', 'admin']
  },
  description: {
    type: String,
    required: true
  },
  permissions: {
    type: [String],
    default: function() {
      if (this.name === 'viewer') {
        return ['view_records', 'view_dashboard'];
      } else if (this.name === 'analyst') {
        return ['view_records', 'view_dashboard', 'view_insights', 'export_data'];
      } else if (this.name === 'admin') {
        return ['create_records', 'update_records', 'delete_records', 'view_records', 'create_users', 'manage_roles', 'view_dashboard', 'view_insights', 'export_data'];
      }
      return [];
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Role', roleSchema);
