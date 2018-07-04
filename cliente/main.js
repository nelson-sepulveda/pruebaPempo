

var so = io.connect("http://192.168.1.9:6677",{"forceNew":true});

so.on("messages",function(data){
  pintar(data);
  console.log(data);  
})

function pintar(data){
  var html = data.map(function(message , i){
    return(`
      <div class="message">
        <strong> 
          ${message.nickname}
        </strong>
        <p>
          ${message.text}  
        </p>  
      </div>
    `);
  }).join(' ');

  var s = document.getElementById('mensajes');
  s.innerHTML = html;
  s.scrollTo = s.scrollHeight;
}


function addMensaje(event){
  var msg = {
    nickname : document.getElementById('nickname').value, 
    text : document.getElementById('text').value
  };

  document.getElementById('nickname').style.display = 'none';
  var d = document.getElementById('text')
  d.value = "";
  so.emit('add-message',msg);
  return false;
}

function vaciar(event){
  var msg={};

  var chat = document.getElementById('mensajes')
  chat.innerHTML = '';
  so.emit('vaciar-chat',msg)
  return false;

}
