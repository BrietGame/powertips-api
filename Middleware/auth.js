const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const deniedPaths = [
        "/api/guide/create",
        "/api/guide/update",
        "/api/guide/delete",
        "/api/user/create",
        "/api/user/update",
        "/api/user/delete",
        "/api/comment/create",
        "/api/comment/update",
        "/api/comment/delete",
        "/api/category/create",
        "/api/category/update",
        "/api/category/delete",
        "/api/note/create",
        "/api/note/update",
        "/api/note/delete"
    ]
    if (!deniedPaths.includes(req.path)) {
        return next();
    }
    const token = req.headers["authorization"] ? req.headers["authorization"].split(" ")[1] : null;
    if (!token) {
        return res.status(401).send("Le token n'existe pas");
    }
    try {
        req.user = jwt.verify(token, "secret");
    } catch (e) {
        return res.status(401).send("Le token n'est pas valide");
    }
    return next();
}

module.exports = checkToken;