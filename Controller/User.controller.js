const User = require('../Model/User');

exports.getUsers = async (req, res) => {
    await User.findAll((err, users) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.send(users);
    });
}

exports.getUserById = async (req, res) => {
    await User.findById(req.params.userId, (err, user) => {
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
        res.send(user);
    });
}

exports.getUserBy = async (req, res) => {
    await User.findBy({
        field: req.params.field,
        value: req.params.value
    }, (err, user) => {
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
        res.send(user);
    });
}

exports.createUser = async (req, res) => {
    await User.create(req.body, (err, user) => {
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
        res.send(user);
    });
}

exports.updateUser = async (req, res) => {
    await User.update(req.params.userId, req.body, (err, user) => {
        if (req.body == null) {
            res.status(400).send({
                message: "Le contenu ne peut pas être vide."
            });
        }
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
        res.send(user);
    });
}

exports.deleteUser = async (req, res) => {
    await User.delete(req.params.userId, (err, user) => {
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
        res.send(user);
    });
}