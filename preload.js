const { contextBridge}= require('electron');

const miValor= "hola picha!"

contextBridge.exposeInMainWorld('miValor', miValor)

// document.addEventListener("DOMContentLoaded", function(){

//     document.getElementById("boton").addEventListener("click", () =>{

//         let dato= "mi dato de preload"

//         ipcRenderer.send('dato', dato)

//     })

// })
