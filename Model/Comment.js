const sql = require("../Config/mysql");

const Comment = function (comment) {
    this.id = comment.id;
    this.content = comment.content;
    this.user_id = comment.user_id;
    this.guide_id = comment.guide_id;
    this.created_at = comment.created_at;
}

// GETTERS & SETTERS
Comment.findAll = result => {
    sql.query(`SELECT *, guide.content AS guide_content from comment
            LEFT JOIN user ON comment.user_id = user.id
            LEFT JOIN guide ON comment.guide_id`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Comment.findAllByGuideId = (id, result) => {
    sql.query(`SELECT * FROM comment
    LEFT JOIN user ON comment.user_id = user.id WHERE guide_id = ${id}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res)
    })
}

Comment.findAllByUserId = (id, result) => {
    sql.query(`SELECT * FROM comment WHERE user_id = ${id}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res)
    });
}

Comment.findById = (id, result) => {
    sql.query(`SELECT * FROM comment WHERE id = ${id}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Comment.findBy = (field, value, result) => {
    sql.query(`SELECT * FROM comment WHERE ${field} = ${value}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Comment.create = (newComment, result) => {
    sql.query("INSERT INTO comment SET ?", newComment, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Comment.update = (id, comment, result) => {
    sql.query("UPDATE comment SET ? WHERE id = ?", [comment, id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Comment.delete = (id, result) => {
    sql.query("DELETE FROM comment WHERE id = ?", id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

module.exports = Comment;