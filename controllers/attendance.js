const Attendance = require("../models/attendance");
//add attendance
exports.newAttendance = (req, res) => {
    if (req.body) {
        const attendance = new Attendance({
            staffId: req.body.staffId,
            date: new Date().toISOString().split('T')[0], // today date yyyy-mm-dd
            numberhour: req.body.numberhour,
            bonus: req.body.bonus
        });

        attendance.save().then(() => {
                res.redirect('/attendance');
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
// get a attendance
exports.getAttendance = (req, res) => {
    if (req.params.attendanceId) {
        Attendance.find({ _id: req.params.attendanceId })
            .then((value) => {
                res.send(value[0]);
            })
            .catch(() => {
                res.send();
            });
    }
};
// get all attendance
exports.getAllAttendance = (req, res) => {
    Attendance.find()
        .then((value) => {
            res.send(value);
        })
        .catch(() => {
            res.send();
        });
};
//delate attendance
exports.deleteAttendance = (req, res) => {
    if (req.params.attendanceId) {
        Attendance.findByIdAndDelete({ _id: req.params.attendanceId })
            .then(() => {
                res.send(true);
            })
            .catch(() => {
                res.send(false);
            });
    }
};
//edit attendance
exports.editAttendance = (req, res) => {
    if (req.params.attendanceId) {
        Attendance.findByIdAndUpdate(req.params.attendanceId).then((value) => {
            value.staffId = req.body.staffId
            value.date = new Date().toISOString().split('T')[0] // today date yyyy-mm-dd
            value.numberhour = req.body.numberhour
            value.bonus = req.body.bonus
            res.send(true);
            return value.save();
        });
    }
};