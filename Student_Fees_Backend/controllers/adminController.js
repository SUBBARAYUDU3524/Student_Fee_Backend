const Admin = require("../models/Admin");

// Get admin profile
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    console.log("admin detils in backend",admin)
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllAdminProfile=async (req, res) => {
  try {
    const admin = await Admin.find();
    console.log("admin detils in backend",admin)
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new admin
exports.addAdmin = async (req, res) => {
  const { name, email, phone, password, secretKey } = req.body;

  const newAdmin = new Admin({
    name,
    email,
    phone,
    password,
    secretKey,
  });

  try {
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update admin profile
exports.updateAdminProfile = async (req, res) => {
  const { name, email, phone, password, secretKey } = req.body;

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, password, secretKey },
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(updatedAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete admin profile
exports.deleteAdminProfile = async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json({ message: "Admin profile deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
