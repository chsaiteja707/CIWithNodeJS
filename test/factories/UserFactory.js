const getDb=require('../connections/db').mongoConnect;
require('../connections/db');
const user=require('../../model/Blog');
module.exports=async (user)=>{
    const db=await getDb();
    user=await db.collection('Users').insertOne(user);
    return user;
}