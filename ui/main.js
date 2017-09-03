

//list the given namesz
var sumbit=document.getElementById('sumbit');
submit.onclick= function(){
    var request= new XMLHttpRequest();

    request.onreadystatechange = function()
    {
      if(request.readyState===XMLHttpRequest.DONE)
      {
          if(request.status=== 200)
          {
               var names=request.responseText;
               
               names=JSON.parse(names);
           
               var list='';
           
               for(var i=0;i<names.length;i++)
               {
                   list +='<li>'+ names[i] +'</li>';
               }
               var ul=document.getElementById('list');
               ul.innerHTML=list;
          }
      }
    
    
    }
    var username=document.getElementById('name').value;
  
    request.open('GET', 'http://kris15226ec.imad.hasura-app.io/submit-names?name='+ name, true );
    request.send(null); 
  
};