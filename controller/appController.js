const Blog=require('../model/Blog');
const UserBlogs = require('../model/BlogsUsers');

exports.homeController=async (req,res,next)=>{
    const blogsForUser=await Blog.getBlogsForUser(req.session.user_id);
    res.render('blogs',{blogs:blogsForUser});
}

exports.redirectToBlogCreationPage=(req,res,next)=>{
    res.render('blog',{editing:false});
}

exports.redirectToEditPage=async (req,res,next)=>{
    const getBlog =await Blog.getBlog(req.params.id);
    res.render('blog',{editing:true, title:getBlog.title,description:getBlog.description,id:req.params.id});
}

exports.updateBlog=async (req,res,next)=>{
    try {
        const {title,description}=req.body;
        const user_id=req.session.user_id;
        const id=req.params.id;
        const date=new Date();
        const getBlog =await Blog.updateBlog(id,user_id,title,description,date.toString());
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
    
}

exports.addNewBlog=async (req,res,next)=>{
    const userId=req.session.user_id;
    const {description, title}=req.body;
    const date=new Date();
    const newBlog=await Blog.addNewBlog(userId,title,description,date.toString());
    const newBlogId=newBlog.insertedId;
    const addToBlogs=await UserBlogs.pushBlog(newBlogId,userId);
    res.redirect('/');
}

exports.deleteBlog=async (req,res,next)=>{
    const blog_id=req.params.id;
    const deleteFroBlogDB=await Blog.deleteBlog(blog_id,req.session.user_id);
    const deleteFromUserDB=await UserBlogs.popBlog(blog_id,req.session.user_id);
    console.log(blog_id)
    res.redirect('/');
}


