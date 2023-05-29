const express = require('express');
const router = express.Router();
const NoteController = require('../Controller/Note.controller');
const auth = require('../Middleware/auth');

router.get('/all', auth, NoteController.getNotes);
router.get('/:noteId', auth, NoteController.getNoteById);
router.get('/:field/:value', auth, NoteController.getNoteBy);
router.post('/create', auth, NoteController.createNote);
router.put('/:noteId', auth, NoteController.updateNote);
router.delete('/:noteId', auth, NoteController.deleteNote);

module.exports = router;