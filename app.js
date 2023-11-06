const express = require('express')
const {connectToDb,getDb} = require('./db')
const {ObjectId} = require('mongodb')
const app = express()
app.use(express.json())
// db connection 
let db;

connectToDb((error)=>{
   if(!error){
    app.listen(3000,()=>{
        console.log("app running ....")
    })
    db=getDb()
   }
})


app.get('/api/v1/getAllUser',(req,res)=>{
   let books =[];

   db.collection('user').find().forEach(book => {
      books.push(book)
   }).then(()=>{
      res.status(200).json(books)
   }).catch(()=>{
      res.status(500).json({error:'sorry could not fetch the data'})
   })
  
})

app.get('/api/v1/getUserByID/:id',(req,res)=>{
   if(ObjectId.isValid(req.params.id)){
      db.collection('user').findOne({_id: new ObjectId(req.params.id)})
      .then((data)=>{
         res.status(200).json(data)
      })
      .catch(error => {
         res.status(500).json({error:'sorry could not fetch the data'})
      })
   }else{
      res.status(500).json({error:'The Id is Not Valid'})
   }
})

app.post('/api/v1/addUser',(req,res)=>{
   const user = req.body
   db.collection('user').insertOne(user).then((result)=>{
      const mergedJSON = Object.assign({}, user, result);
      res.status(201).json(mergedJSON)
   }).catch(err=>{
      res.status(500).json({err:"could not able to create data"})
   })
})

app.delete('/api/v1/DeleteUser/:id',(req,res)=>{
   if(ObjectId.isValid(req.params.id)){
      db.collection('user').deleteOne({_id: new ObjectId(req.params.id)})
      .then((result)=>{
         res.status(200).json(result)
      })
      .catch(error => {
         res.status(500).json({error:'sorry could not fetch the data'})
      })
   }else{
      res.status(500).json({error:'The Id is Not Valid'})
   }
})


app.put('/api/v1/books/:id',(req,res)=>{
   const update = req.body
   if(ObjectId.isValid(req.params.id)){
      db.collection('bookstore').updateOne({_id: new ObjectId(req.params.id)},{$set: update})
      .then((result)=>{
         res.status(200).json(result)
      })
      .catch(error => {
         res.status(500).json({error:'sorry could not update the data'})
      })
   }else{
      res.status(500).json({error:'The Id is Not Valid'})
   }
})
