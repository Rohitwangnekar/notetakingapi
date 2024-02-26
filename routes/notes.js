// routes/notes.js
const express = require('express');
const Note = require('../models/note');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

router.use(authenticateJWT);

router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = req.user;

    const note = await Note.create({ title, content, UserId: user.id });
    res.status(201).json({ message: 'Note created successfully', note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const user = req.user;
    const { page = 1, pageSize = 10 } = req.query;

    const notes = await Note.findAll({
      where: { UserId: user.id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = req.user;
    const note = await Note.findOne({
      where: { id: req.params.id, UserId: user.id },
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = req.user;
    const note = await Note.findOne({
      where: { id: req.params.id, UserId: user.id },
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    note.title = title;
    note.content = content;
    note.updatedAt = new Date();

    await note.save();

    res.json({ message: 'Note updated successfully', note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = req.user;
    const note = await Note.findOne({
      where: { id: req.params.id, UserId: user.id },
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await note.destroy();

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
