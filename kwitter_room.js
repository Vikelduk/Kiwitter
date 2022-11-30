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

  document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";
  
  function addRoom()
  {
    roomName = document.getElementById("roomName").value;
  
    firebase.database().ref("/").child(roomName).update(
      {
      purpose : "adicionar nome de sala"
      });
  
      localStorage.setItem("roomName", roomName);
      
      window.location = "kwitterPage.html";
  }
  
  function getData() 
  {  
    firebase.database().ref("/").on('value', function(snapshot) 
    { 
      document.getElementById("output").innerHTML = ""; 
      snapshot.forEach(function(childSnapshot) 
      { 
        childKey  = childSnapshot.key;
        roomNames = childKey;
        console.log("Nome da Sala - " + roomNames);
        row = "<div class='roomName' id=" + roomNames + " onclick='redirectToRoomName(this.id)' >#" + roomNames + "</div><hr>";
        document.getElementById("output").innerHTML += row;
      });
    });
  }
  
  getData();
  
  function redirectToRoomName(name)
  {
    console.log(name);
    localStorage.setItem("roomName", name);
    window.location = "kwitterPage.html";
  }
  
  function logout() 
  {
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName");
    window.location = "index.html";
  }