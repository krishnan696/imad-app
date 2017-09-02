var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');

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
function harsh(input,salt)
{
    var harshedString=crypto.pbkdf2Sync(input, salt, 100000, 512, 'sha512');
    return harshString.toString('hex');
    
}
var salt='i-love-u';
app.get('/harsh/:input',function(req,res){
   var harshString=harsh(req.params.input,salt);
   return harshString;
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
               res.send(404).send("file not found");
           }
       
        else{
            var articleData = result.rows[0];
             res.send(createTemplate(articleData));
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
