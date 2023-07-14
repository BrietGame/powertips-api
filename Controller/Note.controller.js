const Note = require('../Model/Note');

exports.getNotes = async (req, res) => {
    await Note.findAll((err, notes) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.json({
            statusCode: 200,
            data: notes.map((note) => {
                return {
                    id: note.id,
                    score: note.score,
                    user: {
                        id: note.user_id,
                        username: note.username,
                        avatar: note.avatar
                    },
                    guide: {
                        id: note.guide_id,
                        title: note.title,
                        slug: note.slug
                    },
                }
            })
        })
    });
}

exports.getNotesByUserId = async (req, res) => {
    await Note.findAllByUserId(req.params.userId, (err, note) => {
        if (req.params.userId == null) {
            res.status(400).send({
                message: "L'id ne peut pas être vide."
            });
        }
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.json({
            statusCode: 200,
            data: note.map((note) => {
                return {
                    id: note.id,
                    score: note.score,
                    user_id: note.user_id,
                    guide_id: note.guide_id
                }
            })
        })
    });
}

exports.getNoteById = async (req, res) => {
    await Note.findById(req.params.noteId, (err, note) => {
        if (req.params.noteId == null) {
            res.status(400).send({
                message: "L'id ne peut pas être vide."
            });
        }
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.json({
            statusCode: 200,
            data: note.map((note) => {
                return {
                    id: note.id,
                    score: note.score,
                    user_id: note.user_id,
                    guide_id: note.guide_id
                }
            })[0]
        })
    });
}

exports.getNotesByGuideId = async (req, res) => {
    console.log(req)
    await Note.findAllByGuideId(req.params.guideId, (err, note) => {
        if (req.params.guideId == null) {
            res.status(400).send({
                message: "L'id ne peut pas être vide."
            });
        }
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.json({
            statusCode: 200,
            data: note
        })
    });
}

exports.getMoyenneByGuideId = async (req, res) => {
    await Note.findAllByGuideId(req.params.guideId, (err, note) => {
        if (req.params.guideId == null) {
            res.status(400).send({
                message: "L'id ne peut pas être vide."
            });
        }
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        let moyenne = 0;
        note.forEach(element => {
            console.log(element.score)
            moyenne += parseInt(element.score);
            console.log(moyenne)
        });
        moyenne = moyenne / note.length;
        res.json({
            statusCode: 200,
            data: moyenne
        })
    });
}

exports.createNote = async (req, res) => {
    const note = new Note({
        score: req.body.score,
        user_id: req.body.user_id,
        guide_id: req.body.guide_id
    });
    if (note.score == null || note.user_id == null || note.guide_id == null) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide."
        });
    }
    await Note.create(note, (err, note) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.status(201).json({
            statusCode: 201,
            data: note
        })
    });
}

exports.updateNote = async (req, res) => {
    const note = new Note({
        score: req.body.score,
        user_id: req.body.user_id,
        guide_id: req.body.guide_id
    });
    if (note.score == null || note.user_id == null || note.guide_id == null) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide."
        });
    }
    await Note.update(req.params.noteId, note, (err, note) => {
        if (req.body == null) {
            res.status(400).send({
                message: "Le contenu ne peut pas être vide."
            });
        }
        if (req.params.noteId == null) {
            res.status(400).send({
                message: "L'id ne peut pas être vide."
            });
        }
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.json({
            statusCode: 200,
            data: note
        })
    });
}

exports.deleteNote = async (req, res) => {
    await Note.delete(req.params.noteId, (err, note) => {
        if (req.params.noteId == null) {
            res.status(400).send({
                message: "L'id ne peut pas être vide."
            });
        }
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.json({
            statusCode: 200
        })
    });
}