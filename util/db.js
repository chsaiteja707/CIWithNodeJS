const mongo=require('mongodb').MongoClient;

let db;

const mongoConnect=async ()=>{
    try {
        const client=await mongo.connect(process.env.MONGO_CLOUD_URL_TEST,{useNewUrlParser:true,useUnifiedTopology:true})
        db=client.db();
        return db;
    } catch (error) {
        console.log(error);
    }
}

const getDb=()=>{
    if(db){
        return db;
    }else{
        throw 'no db found'
    }
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;