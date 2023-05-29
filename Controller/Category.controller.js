const Category = require('../Model/Category');

exports.getCategories = async (req, res) => {
    await Category.findAll((err, categories) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.json({
            statusCode: 200,
            data: categories
        })
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
        res.json({
            statusCode: 200,
            data: category
        })
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
        res.json({
            statusCode: 200,
            data: category
        })
    });
}

exports.createCategory = async (req, res) => {
    const category = new Category({
        name: req.body.name,
        description: req.body.description,
        parent_id: req.body.parent_id
    });
    if (category.name == null) {
        res.status(400).send({
            message: "Le nom ne peut pas être vide."
        });
    }
    await Category.create(category, (err, category) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.status(201).json({
            statusCode: 201,
            data: category
        })
    });
}

exports.updateCategory = async (req, res) => {
    const category = new Category({
        name: req.body.name,
        description: req.body.description,
        parent_id: req.body.parent_id
    });
    if (category.name == null) {
        res.status(400).send({
            message: "Le nom ne peut pas être vide."
        });
    }
    await Category.update(req.params.categoryId, category, (err, category) => {
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
        res.json({
            statusCode: 200,
            data: category
        })
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
        res.json({
            statusCode: 200,
            data: category
        })
    });
}