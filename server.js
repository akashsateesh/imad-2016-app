var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleone = {
    title :'Article-one',
    heading :'Article-one',
    date : 'sept 5',
    content : `
        <div Class="container">
            <hr/>
            <ol>
                <li>Hello
                </li>
                <li>Bye
                </li>
            </ol><br>
            <p>hello this is gazillian cover.Hope you enjoyed this and stay happy bye</p><br/>
            <a href="http://www.w3schools.com">Visit W3Schools</a>
        </div>`
};
function create(data){
    var title=data.title;
    var content=data.content;
var html=`<html>
    <body>
        <link href="/ui/style.css" rel="stylesheet" />
        <title>Article two</title>
        <h1>Hi displaying article two</h1>
         ${content}
    </body>
</html>`;
return html;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/article-two', function (req, res) {
  res.send(create(articleone));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
