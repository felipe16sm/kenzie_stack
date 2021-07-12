const testDb = require("../../src/models")("test");
const { Category } = testDb;

const categoryData = {
  name: "category 1",
};

describe("Category Model", () => {
  beforeAll(async () => {
    await testDb.sequelize.sync({ force: true });
  });

  describe("Category tests", () => {
    test("Creates a new category on the database", async () => {
      const category = await Category.create(categoryData);

      expect(category.id).toBe(1);
      expect(category.name).toBe(categoryData.name);
    });

    test("Get category by id on the database", async () => {
      const CategoryById = await Category.findOne({ where: { id: 1 } });
      expect(CategoryById.name).toBe("category 1");
    });

    test("List all categories on the database", async () => {
      const listCategory = await Category.findAll();
      expect(listCategory).toHaveLength(1);
      expect(listCategory[0].name).toBe("category 1");
    });

    test("Update category on the database", async () => {
      const updateCategory = await Category.findOne({ where: { id: 1 } });
      updateCategory.name = "category 2";
      updateCategory.save();

      expect(updateCategory.name).toBe("category 2");
    });

    test("Delete category on the database", async () => {
      const deleteCategory = await Category.findOne({ where: { id: 1 } });
      await deleteCategory.destroy();

      const deletedCategorySearch = await Category.findOne({
        where: { id: 1 },
      });

      expect(deletedCategorySearch).toBe(null);
    });
  });

  afterAll(async () => {
    await testDb.sequelize.close();
  });
});
