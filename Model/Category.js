const sql = require("../Config/mysql");

const Category = function (category) {
    this.id = category.id;
    this.name = category.name;
    this.description = category.description;
    this.parent_id = category.parent_id;
}

// GETTERS & SETTERS
Category.findAll = result => {
    sql.query("SELECT * from category", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Category.findById = (id, result) => {
    sql.query(`SELECT * FROM category WHERE id = ${id}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Category.findBy = (field, value, result) => {
    sql.query(`SELECT * FROM category WHERE ${field} = ${value}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Category.create = (newCategory, result) => {
    sql.query("INSERT INTO category SET ?", newCategory, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Category.update = (id, category, result) => {
    sql.query("UPDATE category SET ? WHERE id = ?", [category, id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Category.delete = (id, result) => {
    sql.query("DELETE FROM category WHERE id = ?", id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

module.exports = Category;