const UserModel = require("../models/User");

const getUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getUser };
