exports.authHandler=(req,res,next)=>{
    if(!req.session.user_id){
        res.redirect('/login')
    }else{
        console.log('validated')
        next();
    }
}

exports.authHandlerForAPI=(req,res,next)=>{
    if(!req.session.user_id){
        res.status(401).redirect('/login')
    }else{
        console.log('validated')
        next();
    }
}


