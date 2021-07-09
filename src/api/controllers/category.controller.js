const { Category } = require("../../models");

module.exports.create = async (req, res) => {
  const category = await Category.create(req.body);
  return res.send(category);
};

module.exports.list = async (req, res) => {
  const category = await Category.findAll();
  return res.send(category);
};

module.exports.retrieve = async (req, res) => {
  const category = await Category.findOne({ where: { id: req.params.id } });
  if (!category) {
    return res.status(404).send({
      msg: "Category not found",
    });
  }

  return res.send(category);
};

module.exports.update = async (req, res) => {
  const category = await Category.findOne({ where: { id: req.params.id } });

  if (!category) {
    return res.status(404).send({
      msg: "Category not found",
    });
  }

  category.name = req.body.name;

  await category.save();

  return res.send(category);
};

module.exports.destroy = async (req, res) => {
  const category = await Category.findOne({ where: { id: req.params.id } });

  if (!category) {
    return res.status(404).send({
      msg: "Category not found",
    });
  }

  await category.destroy();

  return res.status(204).send("");
};
