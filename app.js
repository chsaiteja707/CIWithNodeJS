const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const mongoConnect=require('./util/db').mongoConnect;
const path=require('path');

require('dotenv').config();

const appRoutes=require('./routes/appRoutes');
const authRoutes=require('./routes/authRoutes');
const apiRoutes=require('./routes/apiRoutes');

const app=express();

app.set('view engine', 'ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser('boomboomchao'));
app.use(session({secret:"secsession",resave:false,saveUninitialized:false}));

app.use(appRoutes);
app.use(authRoutes);
app.use(apiRoutes);

app.get('*',(req,res,next)=>{
    res.render('404');
})

const main=async ()=>{
    await mongoConnect();
    app.listen(process.env.APPLICATION_PORT,()=>{
        console.log('listening on '+process.env.APPLICATION_PORT)
    })
}

main();



