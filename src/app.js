const express = require("express");
const PORT = 8000;
const applyPassportStrategy = require("./loaders/passport");
const passport = require("passport");
const app = express();
const server = require("./server");

app.use(express.json());
applyPassportStrategy(passport);

const bindAPIRoutes = require("./api");

// Vai deixar todas que tem o /api com autenticação
// app.use('/api', passport.authenticate('jwt', { session: false }));
bindAPIRoutes(app);

server(app, PORT);

module.exports = app;
