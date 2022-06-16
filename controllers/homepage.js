exports.getHomePage = (req, res) => {
    if (req.session.user) {
        res.render('homepage', { username: req.session.user.username });
    } else {
        res.redirect('/')
    }

}
exports.getUser = (req, res) => {
    res.render('user');
}
exports.getAttendance = (req, res) => {
    res.render('attendance');
}
exports.getStaff = (req, res) => {
    res.render('staff');
}
exports.getproduct = (req, res) => {
    res.render('product');
}
exports.getpayment = (req, res) => {
    res.render('payment');
}
exports.getDailyincome = (req, res) => {
    res.render('dailyincome');
}
exports.getTypeofstaff = (req, res) => {
    res.render('typeofstaff');
}
exports.getTotaldailyincome = (req, res) => {
    res.render('totaldailyincome');
}
exports.getOutstock = (req, res) => {
    res.render('outstock');
}
exports.getLoginpage = (req, res) => {
    res.render('loginpage', { error: false });
}
exports.getKkkkkk = (req, res) => {
    res.render('kkkkkk');
}