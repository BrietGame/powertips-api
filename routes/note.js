const express = require('express');
const router = express.Router();
const NoteController = require('../Controller/Note.controller');
const auth = require('../Middleware/auth');

router.get('/all', auth, NoteController.getNotes);
router.get('/:noteId', auth, NoteController.getNoteById);
router.get('/guide/:guideId', auth, NoteController.getNotesByGuideId);
router.get('/user/:userId', auth, NoteController.getNotesByUserId);
router.get('/moyenne/:guideId', auth, NoteController.getMoyenneByGuideId);
router.post('/create', auth, NoteController.createNote);
router.put('/:noteId', auth, NoteController.updateNote);
router.delete('/:noteId', auth, NoteController.deleteNote);

module.exports = router;