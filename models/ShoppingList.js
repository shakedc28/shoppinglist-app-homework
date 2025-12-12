// models/ShoppingList.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ListItemSchema = new Schema({
  name: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 1 },
  checked: { type: Boolean, default: false },
  addedAt: { type: Date, default: Date.now }
}, { _id: true });

const ShoppingListSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, index: true },
  title: { type: String, required: true, trim: true, minlength: 1, maxlength: 200 },
  createdAt: { type: Date, default: Date.now },
  items: { type: [ListItemSchema], default: [] }
});

module.exports = mongoose.model("ShoppingList", ShoppingListSchema);
