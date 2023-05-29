const Category = require('../Model/Category');

exports.getCategories = async (req, res) => {
    await Category.findAll((err, categories) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.send(categories);
    });
}

exports.getCategoryById = async (req, res) => {
    await Category.findById(req.params.categoryId, (err, category) => {
        if (req.params.categoryId == null) {
            res.status(400).send({
                message: "L'id ne peut pas être vide."
            });
        }
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.send(category);
    });
}

exports.getCategoryBy = async (req, res) => {
    await Category.findBy({
        field: req.params.field,
        value: req.params.value
    }, (err, category) => {
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
        res.send(category);
    });
}

exports.createCategory = async (req, res) => {
    await Category.create(req.body, (err, category) => {
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
        res.send(category);
    });
}

exports.updateCategory = async (req, res) => {
    await Category.update(req.params.categoryId, req.body, (err, category) => {
        if (req.body == null) {
            res.status(400).send({
                message: "Le contenu ne peut pas être vide."
            });
        }
        if (req.params.categoryId == null) {
            res.status(400).send({
                message: "L'id ne peut pas être vide."
            });
        }
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.send(category);
    });
}

exports.deleteCategory = async (req, res) => {
    await Category.delete(req.params.categoryId, (err, category) => {
        if (req.params.categoryId == null) {
            res.status(400).send({
                message: "L'id ne peut pas être vide."
            });
        }
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.send(category);
    });
}