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
    await Guide.create(req.body, (err, guide) => {
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
            data: guide
        })
    });
}

exports.updateGuide = async (req, res) => {
    await Guide.update(req.params.guideId, req.body, (err, guide) => {
        if (req.body == null) {
            res.status(400).send({
                message: "Le contenu ne peut pas être vide."
            });
        }
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