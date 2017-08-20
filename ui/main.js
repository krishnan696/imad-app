var button = document.getElementById('button');
button.onclick=function(){
    var request= new XMLHttpRequest();
    request.onReadyStateChange = function()
    {
      if(request.readyState===XMLHttpRequest.DONE)
      {
          if(request.status===200)
          {
              var counter=request.responseText();
             
              var count=document.getElementById('count');
              count.innerHTML=(counter.toString());
          }
      }
    };
    request.open('GET', 'http://kris15226ec.imad.hasura-app.io/counter', True );
    request.send(NULL);         

   
};