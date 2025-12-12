const mongoose = require("mongoose");
const app = require("./app");

const PORT = 3000;
const MONGO_URI = "mongodb://127.0.0.1:27017/shoppinglist-app";

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

start();
