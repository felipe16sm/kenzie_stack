const testDb = require("../../src/models")("test");
const { Tools, Category, Stack } = testDb;

const categoryData = {
  name: "category 1",
};

const toolData = {
  name: "Django",
  description: "Melhor Framework",
  category_id: 1,
};

const stackData = {
  name: "Projeto Novo",
  description: "Meu super projeto",
  tools: [{ id: 1 }],
};

const stackDataUpdated = {
  name: "Projeto 2",
  description: "Meu super projeto 2",
  tools: [],
};

describe("Stack Model", () => {
  beforeAll(async () => {
    await testDb.sequelize.sync({ force: true });
  });

  describe("Stacks tests", () => {
    test("Create a new stack on the database", async () => {
      const category = await Category.create(categoryData);

      const tool = await Tools.create({
        name: toolData.name,
        description: toolData.description,
        categoryId: toolData.category_id,
      });

      const tools = [];

      for (let i = 0; i < stackData.tools.length; i++) {
        const tool = await Tools.findOne({
          where: { id: stackData.tools[i].id },
        });
        tools.push(tool);
      }

      const stack = await Stack.create({
        name: stackData.name,
        description: stackData.description,
      });

      await stack.setTools(tools);

      expect(stack.id).toBe(1);
      expect(stack.name).toBe(stackData.name);
      expect(stack.description).toBe(stackData.description);
    });

    test("Get stack by id on the database", async () => {
      const stackById = await Stack.findOne({ where: { id: 1 } });

      expect(stackById.name).toBe(stackData.name);
      expect(stackById.description).toBe(stackData.description);
    });

    test("List all stacks on the database", async () => {
      const listStacks = await Stack.findAll();

      expect(listStacks).toHaveLength(1);
      expect(listStacks[0].name).toBe(stackData.name);
      expect(listStacks[0].description).toBe(stackData.description);
    });

    test("Update stack on the database", async () => {
      const tools = [];

      for (let i = 0; i < stackDataUpdated.tools.length; i++) {
        const tool = await Tools.findOne({
          where: { id: stackDataUpdated.tools[i].id },
        });

        tools.push(tool);
      }

      const stack = await Stack.findOne({
        where: { id: 1 },
      });

      stack.name = stackDataUpdated.name;
      stack.description = stackDataUpdated.description;

      await stack.setTools(tools);

      await stack.save();

      const updatedStack = await Stack.findOne({
        where: { id: 1 },
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

      expect(updatedStack.name).toBe(stackDataUpdated.name);
      expect(updatedStack.description).toBe(stackDataUpdated.description);
      expect(updatedStack.Tools).toHaveLength(0);
    });

    test("Delete stack on the database", async () => {
      const stack = await Stack.findOne({
        where: { id: 1 },
      });

      stack.destroy();

      const deletedStackSearch = await Stack.findOne({
        where: { id: 1 },
      });

      expect(deletedStackSearch).toBe(null);
    });
  });

  afterAll(async () => {
    await testDb.sequelize.close();
  });
});
