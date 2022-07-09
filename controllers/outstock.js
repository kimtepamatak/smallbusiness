const Outstock = require("../models/outstock");
//add dailyincome
exports.newOutstock = (req, res) => {
    if (req.body) {
        const outstock = new Outstock({
            ProductId: req.body.ProductId,
            date: req.body.date,
            numberSold: req.body.numberSold,
        });
        outstock.save().then(() => {
                res.redirect('/outstock');
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
// get a dailyincome
exports.getOutstock = (req, res) => {
    if (req.params.outstockId) {
        Outstock.find({ _id: req.params.outstockId })
            .then((value) => {
                res.send(value[0]);
            })
            .catch(() => {
                res.send();
            });
    }
};
// get all dailyincome
exports.getAllOutstock = (req, res) => {
    Outstock.find()
        .then((value) => {
            res.send(value);
        })
        .catch(() => {
            res.send();
        });
};