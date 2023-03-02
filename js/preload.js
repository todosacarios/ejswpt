const { ipcRenderer}= require('electron');

console.log("eih!")

document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("boton").addEventListener("click", () =>{

        let dato= "mi dato de preload"

        ipcRenderer.send('dato', dato)

    })

})
