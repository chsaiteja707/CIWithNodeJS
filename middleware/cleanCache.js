const deleteFromCache =require('../util/cache').deleteFromCache;

module.exports=async (req,res,next)=>{
    await next(); // this will ensure to route hander to complete and then excutiono will comeback to this function
    
}