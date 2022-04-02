const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homepage");
const authenticationController = require("../controllers/authentication");

router.get('/', homeController.getHomePage);
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
router.get('/loginpage', homeController.getLoginpage);
router.get('/kkkkkk', homeController.getKkkkkk);

module.exports = router;