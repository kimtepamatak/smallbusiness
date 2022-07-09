// const User = require('../models/users');
const User = require('../models/user');

exports.getSignInPage = (req, res) => {
    res.render('signin');
}
exports.login = async(req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const type = req.body.type;
        // let typeuser = new String('Normal');
        // Check if email is exist
        await User.find({ email: email }).then(result => {
            if (result != "") {

                // if user exist, check given password with the encrypted password

                if (password === result[0].password) {
                    // if password is correct, return success, with cookie save
                    res.cookie('email', email, { expire: 3600 * 1000 });
                    res.cookie('logged-time', new Date().toISOString(), { expire: 3600 * 1000 });
                    // store user information to session
                    req.session.user = result[0];
                    console.log("login sucess");
                    if (result[0].status === 'Disable') {
                        res.render('loginpage', { error: true, message: "Account Disable" });
                    } else if (result[0].type === 'Normal') {
                        res.redirect("/homepageuser");
                    } else {
                        res.redirect("/homepage");
                    }
                } else {
                    // else return fail
                    res.render('loginpage', { error: true, message: "Password incorrect" });
                    // res.redirect("/loginpage", { error: true, message: "Password incorrect" });
                }

            } else {
                res.redirect("/");
            }
        }).catch(err => {
            console.log(err);
        })
    }
    // exports.register = async(req, res) => {
    //     const username = req.body.username;
    //     const email = req.body.email;
    //     const password = req.body.password;
    //     const isAdmin = false;
    //     const date = new Date();
    //     const salt = bcrypt.genSaltSync(10);
    //     await User({
    //         isAdmin: true,
    //         username: "Admin",
    //         email: email,
    //         password: bcrypt.hashSync(password, salt),
    //         registerAt: date.toISOString()
    //     }).save().then(result => {
    //         // res.redirect("/homepage");
    //     }).catch(err => {
    //         res.render('signup', { message: "Signup fail, try again" });
    //     })
    // }
exports.logout = (req, res) => {
    // clear session
    req.session.destroy();
    res.redirect('/');
}