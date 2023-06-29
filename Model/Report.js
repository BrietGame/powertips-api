const sql = require("../Config/mysql");

const Report = function (report) {
    this.id = report.id;
    this.user_id = report.user_id;
    this.guide_id = report.guide_id;
}

// GETTERS & SETTERS
Report.findAll = result => {
    sql.query("SELECT * from report", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Report.findById = (id, result) => {
    sql.query(`SELECT * FROM report WHERE id = ${id}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Report.create = (newReport, result) => {
    sql.query("INSERT INTO report SET ?", newReport, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

module.exports = Report;