console.log('Loaded!');
var c=0;
var e=document.getElementById("counter");
e.onclick=function(){
    var s=document.getElementById("count");
    s.innerHTML=++c;
};