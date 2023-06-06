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
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Note.findById = (id, result) => {
    sql.query(`SELECT * FROM note WHERE id = ${id}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Note.findBy = (field, value, result) => {
    sql.query(`SELECT * FROM note WHERE ${field} = ${value}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Note.findAllByGuideId = (id, result) => {
    sql.query(`SELECT * FROM note WHERE guide_id = ${id}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res.map((note) => {
            return {
                id: note.id,
                score: note.score,
                user_id: note.user_id,
                guide_id: note.guide_id
            }
        }))
    })
}

Note.create = (newNote, result) => {
    sql.query("INSERT INTO note SET ?", newNote, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Note.update = (id, note, result) => {
    sql.query("UPDATE note SET ? WHERE id = ?", [note, id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Note.delete = (id, result) => {
    sql.query("DELETE FROM note WHERE id = ?", id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

module.exports = Note;