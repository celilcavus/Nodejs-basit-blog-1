

var express = require("express");
var app = express();

var parser = require('body-parser');

//mongo db
// kendi mongodb connection stringinizi girip uygulamayı terminalden başlatabilirsiniz..
const connectionString = "mongodb+srv://celilcavus:celil123@cluster0.eqmwerv.mongodb.net/nodejs?retryWrites=true&w=majority";

const mongo = require('mongoose');
mongo.set("strictQuery", false);
mongo.connect(connectionString,{useNewUrlParser:true});

const scheme = mongo.Schema;
let blog = new scheme({
   title:String,
   description:String
});

let blogs  = mongo.model('blogs',blog);

////

app.set("view engine","ejs");

app.use(express.static('public'));

app.use(parser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
   blogs.find((err,result)=>{
      if(err)
      {
         console.log(err);
      }
      else
      {
         res.render('index',{model:result});
      }
   });
})


app.post('/add-blog', (req, res) => {
  let blog1 = new blogs({
   title:req.body.title,
   description:req.body.description,
  })
  blog1.save((er,result)=>{
   if(result){
      res.redirect('/');
   }
  })
  
 })

 app.get('/blog-details/:id',(req,res)=>{
   blogs.findById(req.params.id)
   .then((result)=>{
    res.render('blog-details',{details:result})
   })
   .catch((err)=>{
    console.log(err);
   });
   
 });

 app.get('/blog-del/:id',(req,res)=>{
      blogs.findByIdAndDelete(req.params.id)
      .then((result)=>{
         res.redirect('/');
      })
      .catch((err)=>{
         console.log(err);
      })
 })

 app.get('/blog-update',(req,res)=>{
   
   res.render('blog-update')
})

app.post('/blog-update/:id',(req,res)=>{
   blogs.findById(req.params.id)
   .then((result)=>{

      let blog1 = new blogs({
         _id:req.body._id,
         title:req.body.title,
         description:req.body.description,
        })
        blog1.update((er,result)=>{
         if(result){
            res.redirect('/');
         }
        })
        




     
   })
   .catch((err)=>{
      console.log(err);
   })
})

app.listen(3000,(req,res)=>{
   console.log("3000 portu çalışıyor");
})
