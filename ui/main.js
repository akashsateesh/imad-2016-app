console.log('Loaded!');
var e=document.getElementById("ok");
e.innerHTML="yes got u";
var madi=document.getElementById("madi");
var marginleft=0;
function moveright(){
    marginleft+=1;
    madi.style.marginLeft=marginleft+'px';
}
madi.onclick=function(){
    var int=setInterval(moveright,50);
   // madi.style.marginLeft= '100px';
     //img.style.height= '100px';
};