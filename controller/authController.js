const User=require('../model/User');

exports.renderLoginPage=(req,res,next)=>{
    res.render('login',{passwordError:false,userNotFound:false});
}

exports.loginHandler=async (req,res,next)=>{
    const {email,password}=req.body;
    console.log(email,password);
    try {
        const user= await User.getUsersByUserEmail(email);
        console.log(user._id.toString());
        if(user){
            if(user.password===password){
                req.session.userEmail=user.email;
                req.session.user_id=user._id.toString();
                res.redirect('/');
            }else{
                res.render('login',{passwordError:true,userNotFound:false});
            }
        } else {
            res.render('login',{userNotFound:true,passwordError:false});
        }
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
}

exports.logoutController=(req,res,next)=>{
    req.session.user_id=null;
    req.session.destroy(); //will destroy entire session objects if anything is there
    res.redirect('/');
}

