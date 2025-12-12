# ShoppingList App (Express + MongoDB)

## Overview
This project contains a simple Express + Mongoose backend implementing CRUD operations for shopping lists and items.

## Requirements
- Node.js v18+ (your environment: v24.x is fine)
- MongoDB running locally or accessible via MONGO_URL

## Quick start
1. Install deps:
   ```bash
   npm install
   ```
2. Start MongoDB (local) or use Docker:
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo
   ```
3. Start server:
   ```bash
   npm run dev
   # or
   npm start
   ```
4. Server runs on `http://localhost:3000` by default. Use Insomnia or curl to test endpoints.

## Endpoints (all POST, dtoIn in request body)
- POST /shoppingList/create
- POST /shoppingList/listByUser
- POST /shoppingList/get
- POST /shoppingList/delete
- POST /listItem/add
- POST /listItem/update
- POST /listItem/delete

## Insomnia
There's an example Insomnia export at `/test/insomnia-shoppinglist.json`.
