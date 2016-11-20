console.log('Loaded!');
function show(){
    var user=document.getElementById("inputuser");
    var pass=document.getElementById("inputPassword");
    var arry=[user.value,pass.value];
    console.log('yes its logged');
    var request=new XMLHttpRequest();
   
    request.onreadystatechange=function(){
        if(request.readyState==XMLHttpRequest.DONE){
           if(request.status==200)
            {
                 c=request.responseText;
                 if(c==null)alert("Validation unsuccessful");
                 else
                 window.open("http://www.rvce.edu.in");
                 
            }
        }  
}
request.open('POST','http://localhost:8080/login',true);
request.send(arry);
}
document.getElementById("how").onclick=function(){
    window.location.href = "http://localhost:8080/ui/how"; 
}
document.getElementById("farmer").onclick=function(){
     window.location.href = "http://localhost:8080/ui/hello.html";
}
document.getElementById("dbms").onclick=function(){
    window.location.href = "http://localhost:8080/ui/hello.html";
}
document.getElementById('trader').onclick=function(){
     window.location.href = "http://localhost:8080/ui/hello.html";
}
document.getElementById('about').onclick=function(){
  window.location.href = "http://localhost:8080/";
}
document.getElementById('register').onclick=function(){
  window.location.href = "http://localhost:8080/register";
}