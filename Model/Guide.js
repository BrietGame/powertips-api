const sql = require("../Config/mysql");

const Guide = function (guide) {
    this.id = guide.id;
    this.title = guide.title;
    this.excerpt = guide.excerpt;
    this.content = guide.content;
    this.media = guide.media;
    this.stats = guide.stats;
    this.status = guide.status;
    this.category_id = guide.category_id;
    this.created_at = guide.created_at;
    this.updated_at = guide.updated_at;
}

// GETTERS & SETTERS
Guide.findAll = result => {
    sql.query("SELECT * from guide", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Guide.findById = (id, result) => {
    sql.query(`SELECT * FROM guide WHERE id = ${id}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Guide.findBy = (field, value, result) => {
    sql.query(`SELECT * FROM guide WHERE ${field} = ${value}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Guide.create = (newGuide, result) => {
    sql.query("INSERT INTO guide SET ?", newGuide, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Guide.update = (id, guide, result) => {
    sql.query("UPDATE guide SET ? WHERE id = ?", [guide, id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Guide.delete = (id, result) => {
    sql.query("DELETE FROM guide WHERE id = ?", id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

module.exports = Guide;