const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getNotes,
  createNote,
  deleteNote,
  updateNote
} = require('../controllers/noteController');

router.get('/', auth, getNotes);
router.post('/', auth, createNote);
router.delete('/:id', auth, deleteNote);
router.put('/:id', auth, updateNote);


exports.createNote = async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      userId: req.user.id   // 🔥 IMPORTANT
    });

    await note.save();

    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createNote = async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      userId: req.user.id   // 🔥 IMPORTANT
    });

    await note.save();

    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.id   // 🔥 FILTER
    });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.id   // 🔥 FILTER
    });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = router;