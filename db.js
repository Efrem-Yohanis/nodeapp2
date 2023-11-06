const {MongoClient} = require('mongodb');
let dbconnection;
const remoteDburl = 'mongodb+srv://efremyohanis116:fCmvix8BgDTYzqzW@cluster0.8hx7jke.mongodb.net/OHRMS?retryWrites=true&w=majority'
const localDburl = 'mongodb://0.0.0.0:27017/myDb'
module.exports = {
    connectToDb: (cb)=>{
        MongoClient.connect(remoteDburl).then((client)=>{
            dbconnection=client.db()
            return cb();
            console.log('connected')
        }).catch((error)=>{
            console.log(error)
            return cb(error);
        })
    },
    getDb: ()=>dbconnection
}