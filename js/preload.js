const { ipcRenderer}= require('electron');

let dato= "mi dato de preload"

window.ipcRenderer.send('dato', dato)