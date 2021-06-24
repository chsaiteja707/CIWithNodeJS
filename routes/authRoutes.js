const express=require('express');

const router=express.Router();

const authController=require('../controller/authController');
const isAuthenticated=require('../middleware/isAuthenticated').authHandler;

router.get('/login',authController.renderLoginPage);
router.post('/login',authController.loginHandler);

router.get('/logout',isAuthenticated,authController.logoutController);

module.exports=router;