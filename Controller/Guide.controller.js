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
            data: guide
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