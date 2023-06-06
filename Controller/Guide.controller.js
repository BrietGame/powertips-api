const Guide = require('../Model/Guide');

exports.getGuides = async (req, res) => {
    await Guide.findAll((err, guides) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.json({
            statusCode: 200,
            data: guides
        })
    });
}

exports.getGuidesByUserId = async (req, res) => {
    await Guide.findAllByUserId(req.params.userId, (err, guides) => {
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
            data: guides
        })
    });
}

exports.getGuideById = async (req, res) => {
    await Guide.findById(req.params.guideId, (err, guide) => {
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
            data: guide.map((guide) => {
                return {
                    id: guide.id,
                    title: guide.title,
                    excerpt: guide.excerpt,
                    content: guide.content,
                    media: guide.media,
                    stats: guide.stats,
                    status: guide.status,
                    category_id: guide.category_id,
                    user_id: guide.user_id,
                    created_at: guide.created_at,
                    updated_at: guide.updated_at
                }
            })[0]
        })
    });
}

exports.getGuideBy = async (req, res) => {
    await Guide.findBy({
        field: req.params.field,
        value: req.params.value
    }, (err, guide) => {
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
            data: guide
        })
    });
}

exports.createGuide = async (req, res) => {
    const guide = new Guide({
        title: req.body.title,
        excerpt: req.body.excerpt,
        content: req.body.content,
        media: req.body.media != null ? req.body.media : null,
        stats: req.body.stats != null ? req.body.stats : null,
        status: req.body.status != null ? req.body.status : 'WAITING',
        user_id: req.body.user_id,
        category_id: req.body.category_id
    });
    if (guide.title == null || guide.excerpt == null || guide.content == null || guide.user_id == null || guide.category_id == null) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide."
        });
    }
    guide.created_at = new Date();
    guide.updated_at = new Date();
    await Guide.create(guide, (err, guide) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.status(201).json({
            statusCode: 201,
            data: guide
        })
    });
}

exports.updateGuide = async (req, res) => {
    const guide = new Guide({
        title: req.body.title,
        excerpt: req.body.excerpt,
        content: req.body.content,
        media: req.body.media,
        stats: req.body.stats,
        status: req.body.status,
        category_id: req.body.category_id
    });
    if (guide.title == null || guide.excerpt == null || guide.content == null || guide.status == null || guide.category_id == null) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide."
        });
    }
    guide.updated_at = new Date();
    await Guide.update(req.params.guideId, guide, (err, guide) => {
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
            data: guide
        })
    });
}

exports.deleteGuide = async (req, res) => {
    await Guide.delete(req.params.guideId, (err, guide) => {
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
            data: guide
        })
    });
}