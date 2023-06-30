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

exports.getCommentsByGuideId = async (req, res) => {
    await Comment.findAllByGuideId(req.params.guideId, (err, comment) => {
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
            data: comment.map((comment) => {
                return {
                    id: comment.id,
                    content: comment.content,
                    user_id: comment.user_id,
                    guide_id: comment.guide_id,
                    created_at: comment.created_at,
                    user: {
                        id: comment.user_id,
                        username: comment.username,
                        email: comment.email,
                        avatar: comment.avatar,
                        roles: comment.roles,
                    }
                }
            })
        })
    });
}

exports.getCommentsByUserId = async (req, res) => {
    await Comment.findAllByUserId(req.params.userId, (err, comment) => {
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
            data: comment.map((comment) => {
                return {
                    id: comment.id,
                    content: comment.content,
                    user_id: comment.user_id,
                    guide_id: comment.guide_id,
                    created_at: comment.created_at
                }
            })
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
            data: comment.map((comment) => {
                return {
                    id: comment.id,
                    content: comment.content,
                    user_id: comment.user_id,
                    guide_id: comment.guide_id,
                    created_at: comment.created_at
                }
            })[0]
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
    const comment = new Comment({
        content: req.body.content,
        user_id: req.body.user_id,
        guide_id: req.body.guide_id
    });
    if (comment.content == null && comment.user_id == null && comment.guide_id == null) {
        res.status(400).send({
            message: "Le contenu, l'id de l'utilisateur et l'id du guide ne peuvent pas être vide."
        });
    }
    comment.created_at = new Date();
    await Comment.create(comment, (err, comment) => {
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
    const comment = new Comment({
        content: req.body.content,
        user_id: req.body.user_id,
        guide_id: req.body.guide_id
    });
    if (comment.content == null && comment.user_id == null && comment.guide_id == null) {
        res.status(400).send({
            message: "Le contenu, l'id de l'utilisateur et l'id du guide ne peuvent pas être vide."
        });
    }
    await Comment.update(req.params.commentId, comment, (err, comment) => {
        if (req.params.commentId == null) {
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