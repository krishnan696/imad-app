var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

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
var articles = {
     'article-one' : {
        title : 'articleone|krishnan',
        heading: 'articleone',
        date: '20 aug 2017',
        content:`
        
            <p>
                this is the 
                Java software for your computer, or the Java Runtime Environment, is also referred to as the Java Runtime, Runtime Environment, Runtime, JRE, Java Virtual Machine, Virtual Machine, Java VM, JVM, VM, Java plug-in, Java plugin, Java add-on or Java download
            </p>
        
            <p>
                this is the para
                Java software for your computer, or the Java Runtime Environment, is also referred to as the Java Runtime, Runtime Environment, Runtime, JRE, Java Virtual Machine, Virtual Machine, Java VM, JVM, VM, Java plug-in, Java plugin, Java add-on or Java download
            </p>
        
            <p>
                this is the para
                Java software for your computer, or the Java Runtime Environment, is also referred to as the Java Runtime, Runtime Environment, Runtime, JRE, Java Virtual Machine, Virtual Machine, Java VM, JVM, VM, Java plug-in, Java plugin, Java add-on or Java download
            </p>
            <p>
                this is the para
                Java software for your computer, or the Java Runtime Environment, is also referred to as the Java Runtime, Runtime Environment, Runtime, JRE, Java Virtual Machine, Virtual Machine, Java VM, JVM, VM, Java plug-in, Java plugin, Java add-on or Java download
            </p>
        
        
        `
    },
     'article-three':{
        title : 'articleThree|krishnan',
        heading: 'articleThree',
        date: '20 aug 2017',
        content:`
        
            <p>
                this is the 
                Java software for your computer, or the Java Runtime Environment, is also referred to as the Java Runtime, Runtime Environment, Runtime, JRE, Java Virtual Machine, Virtual Machine, Java VM, JVM, VM, Java plug-in, Java plugin, Java add-on or Java download
            </p>
        
            <p>
                this is the para
                Java software for your computer, or the Java Runtime Environment, is also referred to as the Java Runtime, Runtime Environment, Runtime, JRE, Java Virtual Machine, Virtual Machine, Java VM, JVM, VM, Java plug-in, Java plugin, Java add-on or Java download
            </p>
        
            <p>
                this is the para
                Java software for your computer, or the Java Runtime Environment, is also referred to as the Java Runtime, Runtime Environment, Runtime, JRE, Java Virtual Machine, Virtual Machine, Java VM, JVM, VM, Java plug-in, Java plugin, Java add-on or Java download
            </p>
            <p>
                this is the para
                Java software for your computer, or the Java Runtime Environment, is also referred to as the Java Runtime, Runtime Environment, Runtime, JRE, Java Virtual Machine, Virtual Machine, Java VM, JVM, VM, Java plug-in, Java plugin, Java add-on or Java download
            </p>
        
        
        `
    },
     'article-two':{
        title : 'articleTwo|krishnan',
        heading: 'articleTwo',
        date: '20 aug 2017',
        content:`
        
            <p>
                this is the 
                Java software for your computer, or the Java Runtime Environment, is also referred to as the Java Runtime, Runtime Environment, Runtime, JRE, Java Virtual Machine, Virtual Machine, Java VM, JVM, VM, Java plug-in, Java plugin, Java add-on or Java download
            </p>
        
            <p>
                this is the para
                Java software for your computer, or the Java Runtime Environment, is also referred to as the Java Runtime, Runtime Environment, Runtime, JRE, Java Virtual Machine, Virtual Machine, Java VM, JVM, VM, Java plug-in, Java plugin, Java add-on or Java download
            </p>
        
            <p>
                this is the para
                Java software for your computer, or the Java Runtime Environment, is also referred to as the Java Runtime, Runtime Environment, Runtime, JRE, Java Virtual Machine, Virtual Machine, Java VM, JVM, VM, Java plug-in, Java plugin, Java add-on or Java download
            </p>
            <p>
                this is the para
                Java software for your computer, or the Java Runtime Environment, is also referred to as the Java Runtime, Runtime Environment, Runtime, JRE, Java Virtual Machine, Virtual Machine, Java VM, JVM, VM, Java plug-in, Java plugin, Java add-on or Java download
            </p>
        
        
        `
    }
};
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
