console.log('Loaded!');
var element =document.getElementById("main-text");
element.innerHTML="java script";
//move img to right
var img= document.getElementById("img");
var margin=0;
function right(){
    margin=margin+1;
    img.style.marginLeft =margin+'px';
}
img.onclick = function() {
    var interval=setInterval( right,10) ;
};