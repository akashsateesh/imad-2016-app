console.log('Loaded!');
var c=0;
var e=document.getElementById("counter");
e.onclick=function(){
    var request=new XMLHttpRequest();
    //var s=document.getElementById("count");
    request.onreadystatechange=function(){
        if(request.readyState==XMLHttpRequest.DONE){
            if(request.status==200)
            {
                c=request.responseText;
                 var s=document.getElementById("count");
                 s.innerHTML=++c;
            }
        }
    };
    request.open('GET','http://akashsateesh.imad.hasura-app.io/counter',true);
    request.send(null);
};