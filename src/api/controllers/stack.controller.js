const { DBName } = require("../../typeDB");
const { Stack, Tools } = require("../../models")(DBName);

module.exports.create = async (req, res) => {
  const tools = [];

  for (let i = 0; i < req.body.tools.length; i++) {
    const tool = await Tools.findOne({ where: { id: req.body.tools[i].id } });

    if (!tool) {
      return res.status(422).send({
        errors: [
          {
            tools: "Invalid value",
          },
        ],
      });
    }
    tools.push(tool);
  }

  const stack = await Stack.create({
    name: req.body.name,
    description: req.body.description,
  });

  await stack.setTools(tools);

  return res.send(stack);
};

module.exports.list = async (req, res) => {
  const stack = await Stack.findAll({
    include: [
      {
        model: Tools,
        attributes: [
          "id",
          "name",
          "description",
          "createdAt",
          "updatedAt",
          ["categoryId", "category_id"],
        ],
        through: {
          attributes: [],
        },
      },
    ],
  });
  res.send(stack);
};

module.exports.retrieve = async (req, res) => {
  const stack = await Stack.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Tools,
        attributes: [
          "id",
          "name",
          "description",
          "createdAt",
          "updatedAt",
          ["categoryId", "category_id"],
        ],
        through: {
          attributes: [],
        },
      },
    ],
  });

  if (!stack) {
    return res.status(404).send({
      msg: "Stack not found",
    });
  }

  res.send(stack);
};

module.exports.update = async (req, res) => {
  const tools = [];

  for (let i = 0; i < req.body.tools.length; i++) {
    const tool = await Tools.findOne({ where: { id: req.body.tools[i].id } });

    if (!tool) {
      return res.status(422).send({
        errors: [
          {
            tools: "Invalid value",
          },
        ],
      });
    }
    tools.push(tool);
  }

  const stack = await Stack.findOne({
    where: { id: req.params.id },
  });

  if (!stack) {
    return res.status(404).send({
      msg: "Stack not found",
    });
  }

  stack.name = req.body.name;
  stack.description = req.body.description;

  await stack.setTools(tools);

  await stack.save();

  const updatedStack = await Stack.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Tools,
        attributes: [
          "id",
          "name",
          "description",
          "createdAt",
          "updatedAt",
          ["categoryId", "category_id"],
        ],
        through: {
          attributes: [],
        },
      },
    ],
  });

  return res.send(updatedStack);
};

module.exports.destroy = async (req, res) => {
  const stack = await Stack.findOne({
    where: { id: req.params.id },
  });

  if (!stack) {
    return res.status(404).send({
      msg: "Stack not found",
    });
  }

  await stack.destroy();

  res.status(204).send("");
};
