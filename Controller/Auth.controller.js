const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const secret = "secret";

exports.login = async (req, res) => {
    let passwordIsValid;

    await User.findByEmail(req.body.email, async (err, user) => {
        if (req.body.email == null && req.body.password == null) {
            res.status(400).send({
                message: "L'email et le password ne peuvent pas être vide."
            });
        }
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        if (!user || user == null) {
            res.status(404).send({
                message: "L'utilisateur n'a pas été trouvé."
            });
        } else {
            passwordIsValid = await bcrypt.compare(req.body.password, user.password);
            if (passwordIsValid) {
                const token = jsonwebtoken.sign({
                    id: user.id,
                    email: req.body.email
                }, secret, {
                    expiresIn: "3h"
                })

                console.info("Token: " + token);
                // TODO: update refresh token in database
                res.status(200).send({
                    auth: true,
                    token: token
                });
            } else {
                res.status(401).send({
                    auth: false,
                    token: null
                });
            }
        }
    });
}

exports.register = async function(req, res) {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles
    })


    if (!user.username || !user.email || !user.password || !user.roles) {
        res.status(400).send({
            message: "Les champs ne sont pas correctement remplis"
        })
    }

    // Crypt password
    user.password = await bcrypt.hash(user.password, 10);

    // Add dates
    user.created_at = new Date();
    user.updated_at = new Date();
    user.sso_login = "normal";
    user.roles = JSON.stringify(user.roles);

    await User.create(user, async (err,data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite"
            })
        }

        res.json({
            statusCode: 200,
            data: data
        })
    })
}