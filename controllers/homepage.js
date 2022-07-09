exports.getHomePage = (req, res) => {
    if (req.session.user) {
        res.render('homepage', { username: req.session.user.username });
    } else {
        res.redirect('/')
    }
}
exports.getHomePageUser = (req, res) => {
    if (req.session.user) {
        res.render('homepageuser', { username: req.session.user.username });
    } else {
        res.redirect('/')
    }
}
exports.getUser = (req, res) => {
    if (req.session.user && req.session.user.type === 'Admin') {
        res.render('user', { username: req.session.user.username });
    } else {
        res.redirect('/')
    }
}
exports.getAttendance = (req, res) => {
    if (req.session.user && req.session.user.type === 'Admin') {
        res.render('attendance', { username: req.session.user.username });
    } else {
        res.redirect('/')
    }
}
exports.getAttendanceseller = (req, res) => {
    if (req.session.user && req.session.user.type === 'Normal') {
        res.render('attendanceseller', { username: req.session.user.username });
    } else {
        res.redirect('/')
    }
}
exports.getStaff = (req, res) => {
    if (req.session.user && req.session.user.type === 'Admin') {
        res.render('staff', { username: req.session.user.username });
    } else {
        res.redirect('/')
    }
}
exports.getproduct = (req, res) => {
    if (req.session.user && req.session.user.type === 'Admin') {
        res.render('product', { username: req.session.user.username });
    } else {
        res.redirect('/')
    }
}
exports.getproductseller = (req, res) => {
    if (req.session.user && req.session.user.type === 'Normal') {
        res.render('productseller', { username: req.session.user.username });
    } else {
        res.redirect('/')
    }
}
exports.getpayment = (req, res) => {
    if (req.session.user && req.session.user.type === 'Admin') {
        res.render('payment', { username: req.session.user.username });
    } else {
        res.redirect('/')
    }
}
exports.getpaymentseller = (req, res) => {
    if (req.session.user && req.session.user.type === 'Normal') {
        res.render('paymentseller', { username: req.session.user.username });
    } else {
        res.redirect('/')
    }
}
exports.getDailyincomeseller = (req, res) => {
    if (req.session.user && req.session.user.type === 'Normal') {
        res.render('dailyincomeseller', { username: req.session.user.username });
    } else {
        res.redirect('/')
    }
}
exports.getDailyincome = (req, res) => {
    if (req.session.user && req.session.user.type === 'Admin') {
        res.render('dailyincome', { username: req.session.user.username });
    } else {
        res.redirect('/')
    }
}
exports.getTypeofstaff = (req, res) => {
    if (req.session.user && req.session.user.type === 'Admin') {
        res.render('typeofstaff', { username: req.session.user.username });
    } else {
        res.redirect('/')
    }
}
exports.getTotaldailyincome = (req, res) => {
    if (req.session.user && req.session.user.type === 'Admin') {
        res.render('totaldailyincome', { username: req.session.user.username });
    } else {
        res.redirect('/')
    }
}
exports.getTotaldailyincomeseller = (req, res) => {
    if (req.session.user && req.session.user.type === 'Normal') {
        res.render('totaldailyincomeseller', { username: req.session.user.username });
    } else {
        res.redirect('/')
    }
}
exports.getOutstock = (req, res) => {
    if (req.session.user && req.session.user.type === 'Admin') {
        res.render('outstock', { username: req.session.user.username });
    } else {
        res.redirect('/')
    }
}
exports.getOutstockseller = (req, res) => {
    if (req.session.user && req.session.user.type === 'Normal') {
        res.render('outstockseller', { username: req.session.user.username })
    } else {
        res.redirect('/')
    }
}
exports.getLoginpage = (req, res) => {
    if (req.session.user && req.session.user.type === 'Normal') {
        res.redirect('/homepageuser')
    } else if (req.session.user) {
        res.redirect('/homepage')
    }
    res.render('loginpage', { error: false });
}