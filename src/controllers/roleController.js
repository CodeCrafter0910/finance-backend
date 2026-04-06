const Role = require('../models/Role');

const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    const roleExists = await Role.findOne({ name });
    if (roleExists) {
      return res.status(400).json({ message: 'Role already exists' });
    }

    const role = new Role({
      name,
      description
    });

    await role.save();
    res.status(201).json({ message: 'Role created', role });
  } catch (error) {
    res.status(500).json({ message: 'Error creating role', error: error.message });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ message: 'Roles retrieved', roles });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles', error: error.message });
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json({ message: 'Role retrieved', role });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching role', error: error.message });
  }
};

const initializeDefaultRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    if (roles.length > 0) {
      return res.status(200).json({ message: 'Default roles already exist', roles });
    }

    const defaultRoles = [
      {
        name: 'viewer',
        description: 'Can only view records and dashboard'
      },
      {
        name: 'analyst',
        description: 'Can view records, insights, and export data'
      },
      {
        name: 'admin',
        description: 'Full access including user and record management'
      }
    ];

    const createdRoles = await Role.insertMany(defaultRoles);
    res.status(201).json({ message: 'Default roles initialized', roles: createdRoles });
  } catch (error) {
    res.status(500).json({ message: 'Error initializing roles', error: error.message });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  initializeDefaultRoles
};
