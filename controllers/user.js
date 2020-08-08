const User = require("../models").User;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const fetchOne = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({ status: false, message: "User not found" });
    }
    return res.send({
      user,
      status: true,
      message: "User details found successfully",
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

const create = async (req, res) => {
  const { username, password } = req.body;
  try {
    const isUnique = await User.findOne({ where: { username } });
    if (isUnique) {
      return res
        .status(409)
        .send({ status: false, message: "Username exists already" });
    }
    const user = await User.create({ username, password });
    return res.send({
      user,
      status: true,
      message: "User created successfully",
    });
  } catch (e) {
    return res
      .status(500)
      .send({ status: false, message: "Internal server error" });
  }
};

const update = async (req, res) => {
  const id = parseInt(req.params.id);
  const { username, password } = req.body;
  try {
    const user = await User.update({ username, password }, { where: { id } });
    if (!user[0]) {
      return res.status(404).send({ message: "User not found", status: false });
    }
    return res.send({
      user: { username, password },
      status: true,
      message: "User Udpated successfully",
    });
  } catch (e) {
    return res
      .status(500)
      .send({ status: false, message: "Internal server error" });
  }
};

const destroy = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const numDeletedRows = await User.destroy({ where: { id } });
    if (numDeletedRows === 0) {
      return res.status(404).send({ status: false, message: "User not found" });
    }
    return res.send({ status: true, message: "User deleted successfully" });
  } catch (e) {
    return res
      .status(500)
      .send({ status: false, message: "Internal server error" });
  }
};

module.exports = {
  fetchOne,
  create,
  update,
  destroy,
};
