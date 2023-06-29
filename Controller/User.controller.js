const User = require('../Model/User');
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
    await User.findAll((err, user) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.json({
            statusCode: 200,
            data: user.map((user) => {
                return {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: user.roles
                }
            })
        })
    });
};

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
        res.json({
            statusCode: 200,
            // Premier élément du tableau
            data: user.map((user) => {
                return {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: user.roles,
                    avatar: user.avatar
                }
            })[0]
        })
    });
}

exports.getUserByEmail = async (req, res) => {
    await User.findByEmail(req.params.userEmail, (err, user) => {
        if (req.params.userEmail == null) {
            res.status(400).send({
                message: "L'email ne peut pas être vide."
            });
        }
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.json({
            statusCode: 200,
            data: user != null ? user : null
        })
    });
}

exports.getUserBy = async (req, res) => {
    await User.findBy({
        field: req.params.field,
        value: req.params.value
    }, (err, user) => {
        if (req.params.field == null && req.params.value == null) {
            res.status(400).send({
                message: "Field et value ne peuvent pas être vide."
            });
        }
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.json({
            statusCode: 200,
            data: user
        })
    });
}

exports.createUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles,
    });
    if (user.username == null && user.email == null && user.password == null && user.roles == null) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide."
        });
    }
    user.password = await bcrypt.hash(req.body.password, 10);
    user.roles = JSON.stringify(req.body.roles);
    user.created_at = new Date();
    user.updated_at = new Date();
    await User.create(user, (err, user) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.status(201).json({
            statusCode: 201,
            data: user
        })
    });
}

exports.updateUser = async (req, res) => {
    const user = new User({
        username: req.body.username
    });
    if (user.username == null) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide."
        });
    }
    user.updated_at = new Date();
    await User.update(req.params.userId, user, (err, user) => {
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
            data: user
        })
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
        res.json({
            statusCode: 200
        })
    });
}