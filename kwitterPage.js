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

document.getElementById("header").innerHTML = roomName;

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

function logout()
{
    localStorage.removeItem("useName");
    localStorage.removeItem("roomName");
    window.location.replace("index.html");
}
