const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homepage");
const authenticationController = require("../controllers/authentication");
const authenController = require("../controllers/authentication");
const userpage = require("../controllers/userpage");
// const product = require("../models/product");
const product = require("../controllers/product");
const staff = require("../controllers/staff");
const attendance = require("../controllers/attendance");
const payment = require("../controllers/payment");
const typeofstaff = require("../controllers/typeofstaff");
const dailyincome = require("../controllers/dailyincome");
// const User = require('../models/users');

router.get('/homepage', homeController.getHomePage);
router.get('/signin', authenticationController.getSignInPage);
router.get('/user', homeController.getUser);
router.get('/attendance', homeController.getAttendance);
router.get('/stuff', homeController.getStaff);
router.get('/product', homeController.getproduct);
router.get('/payment', homeController.getpayment);
router.get('/dailyincome', homeController.getDailyincome);
router.get('/typeofstaff', homeController.getTypeofstaff);
router.get('/totaldailyincome', homeController.getTotaldailyincome);
router.get('/outstock', homeController.getOutstock);
router.get('', homeController.getLoginpage);
router.get('/kkkkkk', homeController.getKkkkkk);

//for login
// router.post('/register', authenController.register);
router.post('/login', authenController.login);
router.get('/logout', authenController.logout);

// for attendance
router.post('/typeofstaff', typeofstaff.newTypeofstaff);
router.get('/typeofstaff/:typeofstaffId', typeofstaff.getTypeofstaff);
router.get('/typeofstaffs', typeofstaff.getAllTypeofstaff);
router.patch('/typeofstaff/:typeofstaffId', typeofstaff.editTypeofstaff);
router.delete('/typeofstaff/:typeofstaffId', typeofstaff.deleteTypeofstaff);
// for user
router.post('/user', userpage.newUser);
router.get('/user/:userId', userpage.getUser);
router.get('/users', userpage.getAllUser);
router.patch('/user/:userId', userpage.editUser);
router.delete('/user/:userId', userpage.deleteUser);
// for product
router.post('/product', product.newProduct);
router.get('/product/:productId', product.getProduct);
router.get('/products', product.getAllproduct);
router.patch('/product/:productId', product.editProduct);
router.delete('/product/:productId', product.deleteProduct);
// for staff
router.post('/staff', staff.newStaff);
router.get('/staff/:staffId', staff.getStaff);
router.get('/staffs', staff.getAllStaff);
router.patch('/staff/:staffId', staff.editStaff);
router.delete('/staff/:staffId', staff.deleteStaff);
// for attendance
router.post('/attendance', attendance.newAttendance);
router.get('/attendance/:attendanceId', attendance.getAttendance);
router.get('/attendances', attendance.getAllAttendance);
router.patch('/attendance/:attendanceId', attendance.editAttendance);
router.delete('/attendance/:attendanceId', attendance.deleteAttendance);
// for payment
router.post('/payment', payment.newPayment);
router.get('/payment/:paymentId', payment.getPayment);
router.get('/payments', payment.getAllPayment);
router.patch('/payment/:paymentId', payment.editPayment);
router.delete('/payment/:paymentId', payment.deletePayment);
// for payment
router.post('/dailyincome', dailyincome.newDailyincome);
router.get('/dailyincomes/:dailyincomeId', dailyincome.getDailyincome);
router.get('/dailyincomes', dailyincome.getAllDailyincome);
router.patch('/dailyincome/:dailyincomeId', dailyincome.editDailyincome);
router.delete('/dailyincome/:dailyincomeId', dailyincome.deleteDailyincome);
module.exports = router;