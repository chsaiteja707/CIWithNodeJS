const mongo=require('mongodb').MongoClient;
require('dotenv').config();



const mongoConnect=async ()=>{
    try {
        const client=await mongo.connect(process.env.MONGO_CLOUD_URL_TEST,{useNewUrlParser:true,useUnifiedTopology:true})
        return client.db();
        //let db=;
        
    } catch (error) {
        console.log(error);
    }
}

const getDb=()=>{
    return db;
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;