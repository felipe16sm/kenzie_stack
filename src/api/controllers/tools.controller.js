const { DBName } = require("../../typeDB");
const { Tools } = require("../../models")(DBName);

module.exports.create = async (req, res) => {
  const tools = await Tools.create({
    name: req.body.name,
    description: req.body.description,
    categoryId: req.body.category_id,
  });
  res.send(tools);
};

module.exports.list = async (req, res) => {
  const tools = await Tools.findAll();
  res.send(tools);
};

module.exports.retrieve = async (req, res) => {
  const tool = await Tools.findOne({ where: { id: req.params.id } });

  if (!tool) {
    return res.status(404).send({
      msg: "Tool not found",
    });
  }

  res.send(tool);
};

module.exports.update = async (req, res) => {
  const tool = await Tools.findOne({ where: { id: req.params.id } });

  if (!tool) {
    return res.status(404).send({
      msg: "Tool not found",
    });
  }

  tool.name = req.body.name;
  tool.description = req.body.description;
  tool.categoryId = req.body.category_id;

  await tool.save();

  res.send(tool);
};

module.exports.destroy = async (req, res) => {
  const tool = await Tools.findOne({ where: { id: req.params.id } });

  if (!tool) {
    return res.status(404).send({
      msg: "Tool not found",
    });
  }

  await tool.destroy();

  res.status(204).send("");
};
