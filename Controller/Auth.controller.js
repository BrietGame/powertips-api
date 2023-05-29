const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const secret = "secret";

exports.login = async (req, res) => {
    const token = jsonwebtoken.sign({
        email: req.body.email
    }, secret, {
        expiresIn: "3h"
    })

    console.info("Token: " + token);

    let passwordIsValid;

    await User.findBy({
        field: "email",
        value: req.body.email
    }, (err, user) => {
       if (err) {
           res.status(500).send({
               message: err.message || "Une erreur est survenue."
           });
       }
       passwordIsValid = bcrypt.compare(req.body.password, user.password);
       if (passwordIsValid) {
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
    });
}

exports.logout = async (req, res) => {
    // TODO: détruire le refresh token en base de données et le token jwt
    res.status(200).send({
        auth: false,
        token: null
    });
}

exports.register = async (user, res) => {
    user.password = bcrypt.hash(user.password, 10);

    await User.create(user, (err, user) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.send(user);
    });
}