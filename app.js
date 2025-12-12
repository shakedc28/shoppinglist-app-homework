const express = require("express");
const shoppingListRoutes = require("./routes/shoppingListRoutes");
const listItemRoutes = require("./routes/listItemRoutes");

const app = express();

// FIX: correct body parsing
app.use(express.json());

// logger
app.use((req, res, next) => {
  console.log("REQUEST BODY:", req.body);
  next();
});

// routes
app.use("/", shoppingListRoutes);
app.use("/", listItemRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    type: err.name,
    message: err.message,
    uuAppErrorMap: err.uuAppErrorMap || {}
  });
});

module.exports = app;