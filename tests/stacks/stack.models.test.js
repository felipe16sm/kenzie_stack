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

describe("Tools Model", () => {
  beforeAll(async () => {
    await testDb.sequelize.sync({ force: true });
  });

  describe("Tools tests", () => {
    test("Create a new tool on the database", async () => {
      const category = await Category.create(categoryData);

      const tool = await Tools.create({
        name: toolData.name,
        description: toolData.description,
        categoryId: toolData.category_id,
      });

      expect(tool.id).toBe(1);
      expect(tool.name).toBe(toolData.name);
      expect(tool.description).toBe(toolData.description);
      expect(tool.categoryId).toBe(toolData.category_id);
    });

    test("Get tool by id on the database", async () => {
      const ToolById = await Tools.findOne({ where: { id: 1 } });

      expect(ToolById.name).toBe(toolData.name);
      expect(ToolById.description).toBe(toolData.description);
      expect(ToolById.categoryId).toBe(toolData.category_id);
    });

    test("List all tools on the database", async () => {
      const listTools = await Tools.findAll();

      expect(listTools).toHaveLength(1);
      expect(listTools[0].name).toBe(toolData.name);
      expect(listTools[0].description).toBe(toolData.description);
      expect(listTools[0].categoryId).toBe(toolData.category_id);
    });

    test("Update tool on the database", async () => {
      const updateTools = await Tools.findOne({ where: { id: 1 } });
      updateTools.name = "NodeJS";
      updateTools.description = "Backend Javascript";
      updateTools.save();

      expect(updateTools.name).toBe("NodeJS");
      expect(updateTools.description).toBe("Backend Javascript");
      expect(updateTools.categoryId).toBe(toolData.category_id);
    });

    test("Delete tool on the database", async () => {
      const deleteTools = await Tools.findOne({ where: { id: 1 } });
      await deleteTools.destroy();

      const deletedToolSearch = await Tools.findOne({
        where: { id: 1 },
      });

      expect(deletedToolSearch).toBe(null);
    });
  });

  afterAll(async () => {
    await testDb.sequelize.close();
  });
});
