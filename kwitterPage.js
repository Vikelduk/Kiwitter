const firebaseConfig = {
      apiKey: "AIzaSyD8dUGyUc619letryDwCLQs8TmhScjB3bU",
      authDomain: "kwitter-9db4f.firebaseapp.com",
      databaseURL: "https://kwitter-9db4f-default-rtdb.firebaseio.com",
      projectId: "kwitter-9db4f",
      storageBucket: "kwitter-9db4f.appspot.com",
      messagingSenderId: "635885073539",
      appId: "1:635885073539:web:8ee5e2f7e6f6222e7a57b6"
};

firebase.initializeApp(firebaseConfig);
    
userName = localStorage.getItem("userName");
roomName = localStorage.getItem("roomName");

document.getElementById("nomeSala").innerHTML = roomName;

function send()
{
      msg = document.getElementById("msg").value;
      firebase.database().ref(roomName).push(
      {
            name: userName,
            message:msg,
            like: 0 
      });

      document.getElementById("msg").value = "";
}

function getData() 
{ 
      firebase.database().ref("/"+roomName).on('value', function(snapshot) 
      { 
            document.getElementById("output").innerHTML = ""; 
            snapshot.forEach(function(childSnapshot) 
            {
                  childKey  = childSnapshot.key; 
                  childData = childSnapshot.val(); 

                  if(childKey != "purpose") 
                  { 
                        firebaseMessageId = childKey;
                        messageData = childData;

                        console.log(firebaseMessageId);
                        console.log(messageData);

                        name = messageData['name'];
                        message = messageData['message'];
                        like = messageData['like']; 

                        nameWidthTag = "<h4> " + name + "<img class = 'user_tick' src = 'tick.png'></h4>";
                        messageWidthTag = "<h4 class = 'message_h4'>" + message + "</h4>";
                        like_button = "<button class = 'btn btn-warning' id = " + firebaseMessageId + "value = " + like + "onclick = 'updateLike(this.id)'>";
                        spanWithTag = "<span class = 'gliphycon gliphycon-thumbs-up'> Like: " + like + "</span></button><hr>";

                        row = nameWidthTag + messageWidthTag + like_button + spanWithTag;
                        document.getElementById("output").innerHTML += row;

                  } 
            });  
      }); 
}

getData();

function updateLike(messageId)
{
      console.log("Botão de like pressionado - " + messageId);
      buttonId = messageId;
      likes = document.getElementById(buttonId).value;
      updatedLikes = Number(likes) + 1;
      console.log(updatedLikes);

      firebase.database().ref(roomName).child(messageId).update(
            {
                  likes : updatedLikes
            })
}

function logout()
{
      localStorage.removeItem("useName");
      localStorage.removeItem("roomName");
      window.location.replace("index.html");
}
