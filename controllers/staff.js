const Staff = require("../models/staff");
//add staff
exports.newStaff = (req, res) => {
    if (req.body) {
        const staff = new Staff({
            surname: req.body.surname,
            firstname: req.body.firstname,
            dateofbirth: req.body.dateofbirth,
            telephone: req.body.telephone,
            email: req.body.email,
            address: req.body.address,
            startdate: req.body.startdate,
            status: req.body.status,
        });

        staff.save().then(() => {
                res.redirect('/stuff');
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
// get a staff
exports.getStaff = (req, res) => {
    if (req.params.staffId) {
        Staff.find({ _id: req.params.staffId })
            .then((value) => {
                res.send(value[0]);
            })
            .catch(() => {
                res.send();
            });
    }
};
// get all staff
exports.getAllStaff = (req, res) => {
    Staff.find()
        .then((value) => {
            res.send(value);
        })
        .catch(() => {
            res.send();
        });
};
//delate staff
exports.deleteStaff = (req, res) => {
    if (req.params.staffId) {
        Staff.findByIdAndDelete({ _id: req.params.staffId })
            .then(() => {
                res.send(true);
            })
            .catch(() => {
                res.send(false);
            });
    }
};
//edit staff
exports.editStaff = (req, res) => {
    if (req.params.staffId) {
        Staff.findByIdAndUpdate(req.params.staffId).then((value) => {
            value.surname = req.body.surname;
            value.firstname = req.body.firstname;
            value.dateofbirth = req.body.dateofbirth;
            value.telephone = req.body.telephone;
            value.email = req.body.email;
            value.address = req.body.address;
            value.startdate = req.body.startdate;
            value.status = req.body.status;
            res.send(true);
            return value.save();
        });
    }
};