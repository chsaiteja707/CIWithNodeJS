const mongoDb=require('mongodb');
const getDb=require('../util/db').getDb;

class User{
    constructor(){

    }

    static async getUsersByUserEmail(userId){
        const db=getDb();
        try {
            const getUser= await db.collection('Users').findOne({email:userId})//in Mongo Cloud name is specified as User for DB
            return getUser;
        } catch (error) {
            throw 'error DB query'
        }   
    }
}

module.exports=User;