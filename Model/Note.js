const sql = require("../Config/mysql");

const Note = function (note) {
    this.id = note.id;
    this.score = note.score;
    this.user_id = note.user_id;
    this.guide_id = note.guide_id;
}

// GETTERS & SETTERS
Note.findAll = result => {
    sql.query("SELECT * from note", (err, res) => {
        if (err) return err;
        return (null, res);
    })
}

Note.findById = (id, result) => {
    sql.query(`SELECT * FROM note WHERE id = ${id}`, (err, res) => {
        if (err) return err;
        return (null, res);
    })
}

Note.findBy = (field, value, result) => {
    sql.query(`SELECT * FROM note WHERE ${field} = ${value}`, (err, res) => {
        if (err) return err;
        return (null, res);
    })
}

Note.create = (newNote, result) => {
    sql.query("INSERT INTO note SET ?", newNote, (err, res) => {
        if (err) return err;
        return (null, res);
    })
}

Note.update = (id, note, result) => {
    sql.query("UPDATE note SET ? WHERE id = ?", [note, id], (err, res) => {
        if (err) return err;
        return (null, res);
    })
}

Note.delete = (id, result) => {
    sql.query("DELETE FROM note WHERE id = ?", id, (err, res) => {
        if (err) return err;
        return (null, res);
    })
}

module.exports = Note;