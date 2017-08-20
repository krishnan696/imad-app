var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articleOne=
{
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
}

function createTemplate(data){
    var title=data.title; 
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var htmlTemplate=`
        <html>
            <head>
                <title>
                    S{title}
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
                    S{heading}
                </h3>
                
                
                <div>
                    S{date}
                </div>
            
               
                <div>
                    S{content}
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
app.get('//best-background-pictures-for-laptop-hd-wallpaper.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'best-background-pictures-for-laptop-hd-wallpaper.jpg'));
});
app.get('/article-one',function (req, res){
    res.send(createTemplate(articleOne));
});
app.get('/article-three',function (req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});
app.get('/article-two',function (req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
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
