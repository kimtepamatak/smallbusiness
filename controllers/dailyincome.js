const Dailyincome = require("../models/dailyincome");
//add dailyincome
exports.newDailyincome = (req, res) => {
    if (req.body) {
        const product = req.body.SellPrice;

        const dailyincome = new Dailyincome({
            UserId: req.session.user._id,
            ProductId: req.body.productId,
            date: new Date().toISOString().split('T')[0], // today date yyyy-mm-dd
            numberSold: req.body.numberSold,
            extraFee: req.body.extraFee,
            incomeAmount: (product * req.body.numberSold) - req.body.extraFee,
        });
        dailyincome.save().then(() => {
                res.redirect('/dailyincome');
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
// get a dailyincome
exports.getDailyincome = (req, res) => {
    if (req.params.dailyincomeId) {
        Dailyincome.find({ _id: req.params.dailyincomeId })
            .then((value) => {
                res.send(value[0]);
            })
            .catch(() => {
                res.send();
            });
    }
};
// get all dailyincome
exports.getAllDailyincome = (req, res) => {
    Dailyincome.find()
        .then((value) => {
            res.send(value);
        })
        .catch(() => {
            res.send();
        });
};
//delate dailyincome
exports.deleteDailyincome = (req, res) => {
    if (req.params.dailyincomeId) {
        Dailyincome.findByIdAndDelete({ _id: req.params.dailyincomeId })
            .then(() => {
                res.send(true);
            })
            .catch(() => {
                res.send(false);
            });
    }
};
//edit dailyincome
exports.editDailyincome = (req, res) => {
    if (req.params.dailyincomeId) {
        Dailyincome.findByIdAndUpdate(req.params.dailyincomeId).then((value) => {
            value.UserId = req.session.user._id
            value.ProductId = req.body.ProductId
            value.date = req.body.date
            value.numbersold = req.body.numbersold
            value.extrafee = req.body.extrafee
            value.incomeamount = req.body.incomeamount
            res.send(true);
            return value.save();
        });
    }
};