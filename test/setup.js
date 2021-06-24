jest.setTimeout(30000);
const mongoConnect=require('./connections/db').mongoConnect;

const main=async ()=>{
   await mongoConnect();
}

main();







