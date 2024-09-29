import { routerSwapiPeople } from "./src/domains/swapi-people/swapi-people-route";
import { routerCustomPeople } from "./src/domains/custom-people/custom-people-route";

const express = require("express");
const serverless = require("serverless-http");

const yaml = require("yaml");

const app = express();

app.use(express.json());

app.use("/api", routerSwapiPeople);
app.use("/api", routerCustomPeople);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
