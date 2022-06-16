const Typeofstaff = require("../models/typeofstaff");
//add typeofstaff
exports.newTypeofstaff = (req, res) => {
    if (req.body) {
        const typeofstaff = new Typeofstaff({
            staffId: req.body.staffId,
            type: req.body.type,
            salary: req.body.salary,
        });

        typeofstaff.save().then(() => {
                res.redirect('/typeofstaff');
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
// get a typeofstaff
exports.getTypeofstaff = (req, res) => {
    if (req.params.typeofstaffId) {
        Typeofstaff.find({ _id: req.params.typeofstaffId })
            .then((value) => {
                res.send(value[0]);
            })
            .catch(() => {
                res.send();
            });
    }
};
// get all typeofstaff
exports.getAllTypeofstaff = (req, res) => {
    Typeofstaff.find()
        .then((value) => {
            res.send(value);
        })
        .catch(() => {
            res.send();
        });
};
//delate typeofstaff
exports.deleteTypeofstaff = (req, res) => {
    if (req.params.typeofstaffId) {
        Typeofstaff.findByIdAndDelete({ _id: req.params.typeofstaffId })
            .then(() => {
                res.send(true);
            })
            .catch(() => {
                res.send(false);
            });
    }
};
//edit typeofstaff
exports.editTypeofstaff = (req, res) => {
    if (req.params.typeofstaffId) {
        Typeofstaff.findByIdAndUpdate(req.params.typeofstaffId).then((value) => {
            value.type = req.body.type
            value.salary = req.body.salary
            res.send(true);
            return value.save();
        });
    }
};