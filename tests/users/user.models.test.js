const testDb = require("../../src/models")("test");
const { User } = testDb;

const userData = {
  username: "felipe",
  password: "Aa1*",
};

describe("User Model", () => {
  beforeAll(async () => {
    await testDb.sequelize.sync({ force: true });
  });

  describe("Create new user", () => {
    test("Creates a new user on the database", async () => {
      const user = await User.create(userData);

      expect(user.id).toBe(1);
      expect(user.username).toBe(userData.username);
    });
  });

  afterAll(async () => {
    await testDb.sequelize.close();
  });
});
