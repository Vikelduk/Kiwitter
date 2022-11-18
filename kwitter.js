
function addUser() 
{
    userName = document.getElementById("inpUser").value;
  
    localStorage.setItem("nomeUsuario", userName);
    
    window.location = "kwitter_room.html";
}