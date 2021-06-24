const express=require('express');

const router=express.Router();

const blogController=require('../controller/apiController');
const isAuthenticated=require('../middleware/isAuthenticated').authHandlerForAPI;

router.get('/api/v1/:user_id/blogs',isAuthenticated,blogController.getBlogsForUser);

module.exports=router;