const Comment = require('../Model/Comment');

exports.getComments = async (req, res) => {
    await Comment.findAll((err, comments) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.json({
            statusCode: 200,
            data: comments
        })
    });
}

exports.getCommentById = async (req, res) => {
    await Comment.findById(req.params.commentId, (err, comment) => {
        if (req.params.commentId == null) {
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
            data: comment
        })
    });
}

exports.getCommentBy = async (req, res) => {
    await Comment.findBy({
        field: req.params.field,
        value: req.params.value
    }, (err, comment) => {
        if (req.params.field == null && req.params.value == null) {
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
            data: comment
        })
    });
}

exports.createComment = async (req, res) => {
    await Comment.create(req.body, (err, comment) => {
        if (req.body == null) {
            res.status(400).send({
                message: "Le contenu ne peut pas être vide."
            });
        }
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.status(201).json({
            statusCode: 201,
            data: comment
        })
    });
}

exports.updateComment = async (req, res) => {
    await Comment.update(req.params.commentId, req.body, (err, comment) => {
        if (req.params.commentId == null && req.body == null) {
            res.status(400).send({
                message: "L'id et le contenu ne peuvent pas être vide."
            });
        }
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.json({
            statusCode: 200,
            data: comment
        })
    });
}

exports.deleteComment = async (req, res) => {
    await Comment.delete(req.params.commentId, (err, comment) => {
        if (req.params.commentId == null) {
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
            data: comment
        })
    });
}