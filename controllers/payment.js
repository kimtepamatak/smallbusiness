const Payment = require("../models/payment");
//add payment
exports.newPayment = (req, res) => {
    if (req.body) {
        const payment = new Payment({
            staffId: req.body.staffId,
            date: new Date().toISOString().split('T')[0], // today date yyyy-mm-dd
            paymentamount: req.body.paymentamount,
        });

        payment.save().then(() => {
                res.redirect('/payment');
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
// get a payment
exports.getPayment = (req, res) => {
    if (req.params.paymentId) {
        Payment.find({ _id: req.params.paymentId })
            .then((value) => {
                res.send(value[0]);
            })
            .catch(() => {
                res.send();
            });
    }
};
// get all payment
exports.getAllPayment = (req, res) => {
    Payment.find()
        .then((value) => {
            res.send(value);
        })
        .catch(() => {
            res.send();
        });
};
//delate payment
exports.deletePayment = (req, res) => {
    if (req.params.paymentId) {
        Payment.findByIdAndDelete({ _id: req.params.paymentId })
            .then(() => {
                res.send(true);
            })
            .catch(() => {
                res.send(false);
            });
    }
};
//edit payment
exports.editPayment = (req, res) => {
    if (req.params.paymentId) {
        Payment.findByIdAndUpdate(req.params.paymentId).then((value) => {
            value.staffId = req.body.staffId
            value.date = new Date().toISOString().split('T')[0] // today date yyyy-mm-dd
            value.numberhour = req.body.numberhour
            value.bonus = req.body.bonus
            res.send(true);
            return value.save();
        });
    }
};