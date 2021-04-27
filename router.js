const Router = require("express").Router();
const Controller = require("./controller");
const Authentication = require("./authentication");

Router.post("/register", Controller.register);
Router.post("/login", Controller.login);
Router.use(Authentication);
Router.get("/", Controller.getProfile);

module.exports = Router;
