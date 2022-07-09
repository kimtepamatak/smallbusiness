const Totalincome = require("../models/dailyincome");
//add totalincome
exports.newTotalincome = (req, res) => {
    if (req.body) {
        const totalincome = new Totalincome({
            date: req.body.date,
            total: req.body.incomeAmount,
        });
        totalincome.save().then(() => {
                res.redirect('/totalincome');
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
// get a totalincome
exports.getTotalincome = (req, res) => {
    if (req.params.totalincomeId) {
        Totalincome.find({ _id: req.params.totalincomeId })
            .then((value) => {
                res.send(value[0]);
            })
            .catch(() => {
                res.send();
            });
    }
};
// get all totalincome
exports.getAllTotalincome = (req, res) => {
    Totalincome.find()
        .then((value) => {
            res.send(value);
        })
        .catch(() => {
            res.send();
        });
};