var button = document.getElementById('button');
button.onclick=function(){
    var request= new XMLHttpRequest();
    request.onereadystatechange = function()
    {
      if(request.readyState===XMLHttpRequest.DONE)
      {
          if(request.status=== 20)
          {
              var counter=request.responseText;
             
              var count=document.getElementById('count');
              count.innerHTML=(counter.toString());
          }
      }
    };
    request.open('GET', 'http://kris15226ec.imad.hasura-app.io/counter', true );
    request.send(null);         

   
};