const User = require("../models/user");
//add user
exports.newUser = (req, res) => {
    if (req.body) {
        const user = new User({
            username: req.body.username,
            fullname: req.body.fullname,
            password: req.body.password,
            email: req.body.email,
            telephone: req.body.telephone,
            address: req.body.address,
            type: req.body.type,
            status: req.body.status,
        });

        user.save().then(() => {
                res.redirect('/user');
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
// get a user
exports.getUser = (req, res) => {
    if (req.params.userId) {
        User.find({ _id: req.params.userId })
            .then((value) => {
                res.send(value[0]);
            })
            .catch(() => {
                res.send();
            });
    }
};
// get all user
exports.getAllUser = (req, res) => {
    User.find()
        .then((value) => {
            res.send(value);
        })
        .catch(() => {
            res.send();
        });
};
//delate user
exports.deleteUser = (req, res) => {
    if (req.params.userId) {
        User.findByIdAndDelete({ _id: req.params.userId })
            .then(() => {
                res.send(true);
            })
            .catch(() => {
                res.send(false);
            });
    }
};
//edit user
exports.editUser = (req, res) => {
    if (req.params.userId) {
        User.findByIdAndUpdate(req.params.userId).then((value) => {
            value.username = req.body.username;
            value.fullname = req.body.fullname;
            value.password = req.body.password;
            value.email = req.body.email;
            value.telephone = req.body.telephone;
            value.address = req.body.address;
            value.type = req.body.type;
            value.status = req.body.status;
            res.send(true);
            return value.save();
        });
    }
};