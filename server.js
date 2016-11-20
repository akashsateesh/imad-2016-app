var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var app = express();
app.use(morgan('combined'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var config = {
  host: 'db.imad.hasura-app.io',
  user: 'akashsateesh',
  password: process.env.DB_PASSWORD,
  database: 'akashsateesh',
  port :'5432'
};

var pool = new Pool(config);

var userid;
var pass,ht;
var buffer=[];
var ht1,ht2,ht3;
var store_i,decimal;
var farmer=[],trader=[];
var farid=9,traid=6;
app.post('/login',function(req,res){
   //req.on('data', function(chunk) {
  userid=(req.body.username);
  userid=(userid).substring(6,userid.search(/\d/));
  pass=req.body.password;
  pool.query('select * from user where username=? AND password=?',[req.body.username,pass],function(err,result){
    if(err || result.length==0)
  {
      res.send('Incoorect Login');
      setTimeout(function(){
        res.sendFile(path.join(__dirname,'ui','hello.html'));
        console.log('Hi  bh');
      },10000);
  }         
    else{
      pool.query('select name,farmer_id,ph_no from farmer where name=?;select *from product;select *from commodity',userid,function(err,result){
    if(err || result.length==0){
     res.sendFile(path.join(__dirname,'ui','hello.html'));
     return;
    }
      else
      { 
        buffer=result;
       ht1=`<html>
  <head>
<title>Farmer</title>
<link href="http://localhost:8080/ui/style.css" rel="stylesheet"/>
</head>
<body>
<br>
<div class="container">
    <label>Farmer name-${result[0][0].name}</label><br/>
    <label>Farmer id-${result[0][0].farmer_id}</label><br/>
    <label>Farmer Phone-${result[0][0].ph_no}</label>
    </div>
    <hr/>
    <h3 class="container">Buy Commodities/Cattle</h3>
    <hr/>
    <div class="container">
    <form class="form-horizontal" method="POST" action="http://localhost:8080/farmer/buy">
     <div class="container">
    <label for="inputuser" class="col-sm-2 control-label">Search Commodity</label>
    <div class="col-sm-4">
      <input type="username" class="form-control" name="crop"  id="inputuser" placeholder="Type Crop Name and press Enter">
    </div>
  </div>
     
  </form>`;
ht2=`
</table>
</div>
<div class="container">
    <h3>Sell commodity</h3></div>
<hr/>
<div class="container">
<table class="table table-bordered">
  <tr>
    <th>Product</th>
    <th>Product_Id</th>
    <th>Cost</th>
    <th>Sell</th>
  </tr>`;
  for(var i=0;i<result[1].length;i++)
  {
    ht2+=`<tr>
   <td>${result[1][i].name}</td>
    <td>${result[1][i].p_id}</td>
    <td>${result[1][i].cost}</td>
    <td><form class="form-vertical" method="POST" action="http://localhost:8080/farmer/sell">
  <div class="col-sm-6">
  <input type="username" class="form-control" name="q${i}"  id="inputquantity" placeholder="Quantity">
  </div>
   <button class="btn btn-success" id="sell" type="submit">Sell</button>
  </form></td>
  </tr>`;
  }
  ht2+=`
</table>
</div><br>
</body>
</html>    
`;
ht=ht1+ht2;    
res.send(ht);
      }});
}
  })});   
app.get('/', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.post('/farmer/sell', function (req, res) {
  var r=JSON.stringify(req.body);
  var decimal="";
  for(var i=0;i<buffer[1].length;i++)
  {
    if((r[2]+r[3])==`q${i}`)
    {
        var j=7;
        while(r[j]!=`"`)
        {
        decimal+=r[j];
        j++;
        }
        var isNumber = /^[0-9]*$/.test(decimal);
        if(isNumber)
        {
          var con=parseInt(decimal);
          if(con>100000)
            res.send(ht); 
          else
          {
              pool.query('UPDATE product SET quantity=? WHERE p_id=?',[con+buffer[1][i].quantity,i+1],function(err,result){
                if(err)res.send(ht);
                else res.send('Success');
              } );
          }
        }
        else
        res.send(ht);
        break;
  }}
  return;
});
app.post('/farmer/buy', function (req, res) {
  var r=req.body.crop;
  var i=0,j=-1;
  for(;i<buffer[2].length;i++)
  {
    if(r.toUpperCase()==(buffer[2][i].com_name).toUpperCase())
    {
        j=buffer[2][i].com_id;break;
    }
  }
  if(j>0)
  {
      pool.query('select * from sell where p_id=?',j,function(err,result){
        if(err || result.length==0)res.send(ht);
        else{
            var htm=` <div class="container">
                      <table class="table table-bordered">
                      <tr>
                        <th>Product_Name</th>
                        <th>Product_Id</th>
                        <th>Market_Id</th>
                        <th>Cost</th>
                      </tr>`;
                      console.log(result[0]);
            for(var i=0;i<result.length;i++)
            {
                htm+=`<tr>
                  <td>${buffer[2][j-1].com_name}</td>
                  <td>${result[i].p_id}</td>
                  <td>${result[i].m_id}</td>
                  <td>${result[i].cost}</td>
                </tr>`;
            }
            htm+=`</table></div><br/>`;
            res.send(ht1+htm+ht2);
        }
      });
  }
  else{res.send(ht);}
});
app.get('/ui/hello.html',function(req,res){
  //console.log('Hi I got u');
  res.sendFile(path.join(__dirname,'ui','hello.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/agri11.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'agri11.jpg'));
});
app.post('/search', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui', 'hello.html'));
});
app.get('/ui/how',function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'how.html'));
});
app.get('/request/buy',function(req,res){
  var str=JSON.stringify(buffer[2][store_i]);
  str+=decimal;
  res.send(str);
  console.log(JSON.stringify(buffer[2][store_i]));
});
app.get('/farmer/buy/yes',function(req,res){
   res.send(ht);
});
app.get('/register',function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'register.html'));
});
app.post('/register/done',function(req,res){
 console.log(req.body);
 var temp=[];temp=req.body;
 var des=req.body.des;
 if(des.toUpperCase()=="farmer".toUpperCase())
 {
   pool.query('insert into farmer(name,ph_no) values (?,?)',[temp.name,temp.ph_no],function(err,result){
     if(err)
     res.send('sorry!');
     else 
     {
       var t=(temp.des).substring(0,3)+(temp.state).substring(0,3)+(temp.name)+(farid+1).toString();
       var t_rev=temp.name+(farid).toString();
       farid++;
        pool.query('insert into user(username,password) values(?,?)',[t,t_rev],function(err,result){
        });
       res.send(`Your userID is ${t} and password is ${t_rev}`);
       setTimeout(function() {
           res.sendFile(path.join(__dirname, 'ui', 'index.html'));
        }, 2);
     }
  });
 }
  else
{
  pool.query('insert into trader(name,ph_no) values (?,?)',[temp.name,temp.ph_no],function(err,result){
    if(err)
     res.send('sorry!');
     else res.send('success');
  });
}
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`listening on port ${port}!`);
});
