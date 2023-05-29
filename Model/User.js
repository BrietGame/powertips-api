const sql = require("../Config/mysql");

const User = function (user) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
    this.avatar = user.avatar;
    this.roles = user.roles;
    this.token = user.token;
    this.sso_login = user.sso_login;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
}

// GETTERS & SETTERS
User.findAll = result => {
    sql.query("SELECT * from users", (err, res) => {
        if (err) return err;
        return (null, res);
    })
}

User.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
        if (err) return err;
        return (null, res);
    })
}

User.findBy = (field, value, result) => {
    sql.query(`SELECT * FROM users WHERE ${field} = ${value}`, (err, res) => {
        if (err) return err;
        return (null, res);
    })
}

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) return err;
        return (null, res);
    })
}

User.update = (id, user, result) => {
    sql.query("UPDATE users SET ? WHERE id = ?", [user, id], (err, res) => {
        if (err) return err;
        return (null, res);
    })
}

User.delete = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) return err;
        return (null, res);
    })
}

module.exports = User;