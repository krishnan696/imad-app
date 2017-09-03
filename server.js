var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var Crypto=require('crypto');
var bodyParser = require('body-parser');
var session=require('express-session');
var config=
{
    user:"kris15226ec",
    database:"kris15226ec",
    host:"db.imad.hasura-app.io",
    port:'5432',
    password:process.env.DB_PASSWORD
    
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret :"randomSecretValue",
    cookie :{maxAge : 1000*60*60*24*30}
}));
function createTemplate(data){
    var title=data.title; 
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var htmlTemplate=`
        <html>
            <head>
                <title>
                    ${title}
                </title>
                 <meta name="viewport" content="width=device-width,initial-scale=1"/>
                 <link href="/ui/style.css" rel="stylesheet" />
                
            </head>
            <body>
                <div class="container">
                <div>
                      <a href= "/" >home</a>  
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                
                
                <div>
                    ${date.toDateString()}
                </div>
            
               
                <div>
                    ${content}
                </div>
            </div>
            </body>
        </html>
    
    `;
    return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool=new Pool(config);

app.get('/test-tb',function(req,res)
{
    pool.query('SELECT * FROM test',function(err,result)
    {
      if(err)
      {
          res.status(500).send(err.toString());
      }
      else
      {
          res.send(JSON.stringify(result.rows));
      }
    });
    
});
var count=0;
app.get('/counter',function(req,res){
    count=count+1;
    res.send(count.toString());
});
var names=[];
app.get('/submit-names',function(req,res){
    var names1=req.query.name;
    names.push(names1);
    res.send(JSON.stringify(names));
    
});
function hash(input,salt)
{
    var hashedString=Crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ['pbkdf2',10000,salt,hashedString.toString('hex')].join('$');
    
}
var salt='i-love-u';
app.get('/hash/:input',function(req,res){
   var hashString=hash(req.params.input,salt);
   res.send(hashString);
});

app.get('/ui/best.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'best.jpg'));

});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/articles/:articleName',function (req, res){
    pool.query("SELECT * FROM articles WHERE title =$1", [req.params.articleName], function(err,result){
       if(err)
       {
           res.send(500).send(err.toString());
       }
       else if(result.rows.length===0)
           {
               res.send(403).send("file not found");
           }
       
        else{
            var articleData = result.rows[0];
             res.send(createTemplate(articleData));
        }
        
       });
    });
app.post('/create-user',function(req,res){
   var username=req.body.username;
   var password=req.body.password;
   var salt=Crypto.randomBytes(128).toString('hex');
   var dbString=hash(password,salt);
   console.log(username);
   console.log(dbString);
   pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else{
           res.send("user is successfully created:"+username);
           
       }
           
   });
   });
 app.post('/login',function(req,res){
      var username=req.body.username;
      var password=req.body.password;
     pool.query('SELECT * FROM "user" WHERE username = $1 ',[username],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else if(result.rows.length===0){
           res.status(505).send("user/password is incorrect");
       }
           else{
               var dbString=result.row[0].password;
               var salt=result.split('$')[2];
               var hashPassword=hash(password,salt);
               if(hashPassword===dbString){
                   res.send("successful login");
               }
               else{
                   res.send("username/password is incorrect");
               }
                   
           
       }
           
   });
 });
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
