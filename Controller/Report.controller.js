const Report = require('../Model/Report');

exports.getReports = async (req, res) => {
    await Report.findAll((err, reports) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.json({
            statusCode: 200,
            data: reports
        })
    });
}

exports.getReportById = async (req, res) => {
    await Report.findById(req.params.reportId, (err, report) => {
        if (req.params.reportId == null) {
            res.status(400).send({
                message: "L'id ne peut pas être vide."
            });
        }
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.json({
            statusCode: 200,
            data: report.map((report) => {
                return {
                    id: report.id,
                    user_id: report.user_id,
                    guide_id: report.guide_id,
                    content: report.content
                }
            })[0]
        })
    });
}

exports.createReport = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide."
        });
    }
    await Report.create(req.body, (err, report) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue."
            });
        }
        res.json({
            statusCode: 200,
            data: report
        })
    });
}