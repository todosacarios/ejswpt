const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const url= require('url');
const path= require('path');
const fs = require('fs')
const csv = require('fast-csv');

if(process.env.NODE_ENV !== 'production'){
  require('electron-reload')(__dirname,{
    electron: path.join(__dirname, './node_modules','.bin','electron')
  })
}

let mainWindow;

ipcMain.on('dato', (event, dato) => {
  console.log(dato) // msg from web page
  //window.webContents.send('pong', 'hi web page') // send to web page
})

app.on('ready',() => {
  mainWindow= new BrowserWindow({});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname,'/views/index.html'),
    protocol: 'file',
    slashes: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true,                                                  
      enableRemoteModule: true,
      preload: path.join(__dirname, 'js/preload.js'),
    }
  }))

  const mainMenu= Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(mainMenu);
})

  const templateMenu=[
    {
      label: 'file',
      submenu:[
        {
          label: 'open file',
          click(){
            openFile();
          }
        }
      ]
    }
  ]

  if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
      label: 'Dev Tools',
      submenu: [
        {
          label: 'Show/Hide Dev tools',
          click(utem, focusedWindow){
            focusedWindow.toggleDevTools();
          }
        },
        {
          role: 'reload'
        }
      ]
    })
  }

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

function openFile(){

  const files= dialog.showOpenDialog(mainWindow,{

    properties: ['openFile'],
    filters:[{ name:'csv',extensions:['csv']}]
  })

  if(!files) return;

  const { stringify } = require('querystring');
  const data = []
  const headersCSV=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS1','AT1','AU','AV','AW','AX','AY','AZ','BA'];
  var finalDataRow=new Array();
  const finalData=[];

    fs.createReadStream('./test/payslips.csv')
    .pipe(csv.parse({ headers: false }))
    .on('error', error => console.error(error))
    .on('data', row => data.push(row))
    //.on('end', () => console.log(data));

    .on('end', () => {

        for(let i=1; i < data.length; i++){

            finalDataRow=[];
            
            for(let z=0; z < headersCSV.length; z++){

                finalDataRow[headersCSV[z]]=data[i][z];
            }

            finalData.push(finalDataRow)
        }

        console.log(finalData)
    });
}