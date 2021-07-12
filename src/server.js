module.exports = (app, PORT) => {
  app.listen(PORT, () => {
    console.log(`Running on <http://localhost:${PORT}>`);
  });
};
