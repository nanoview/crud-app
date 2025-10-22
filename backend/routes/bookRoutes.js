import express from "express";
import Book from "../models/Book.js";
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json(book);
});

// READ
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
