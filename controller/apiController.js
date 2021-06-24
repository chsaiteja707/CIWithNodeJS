const Blog=require('../model/Blog');
exports.getBlogsForUser=async (req,res,next)=>{
    const user_id=req.params.user_id;
    const blogs=await Blog.getBlogsForUser(user_id);
    res.status(200).send({blogs:blogs})
}