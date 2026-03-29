const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const auth = require('../middleware/auth');

// POST (note add)
router.post('/', auth, async (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ message: "Text is required" });
  }

  const note = new Note({
    text: req.body.text,
    userId: req.user.id
  });

  await note.save();

  res.json({ message: "Note saved" });
});

// GET (user-specific notes)
router.get('/', auth, async (req, res) => {
  const notes = await Note.find({
    userId: req.user.id
  });

  res.json(notes);
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  await Note.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  });

  res.json({ message: "Deleted" });
});

// UPDATE
router.put('/:id', auth, async (req, res) => {
  await Note.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.user.id
    },
    req.body
  );

  res.json({ message: "Updated" });
});

module.exports = router;