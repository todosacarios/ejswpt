const { ipcRenderer}= require('electron');

document.addEventListener("DOMContentLoaded", function(){

    let dato= "mi dato de preload"

    window.ipcRenderer.send('dato', dato)

})
