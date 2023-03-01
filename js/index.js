
const fs = require('fs');
const csv = require('fast-csv');
const { stringify } = require('querystring');

window.addEventListener("load", inicio)

async function inicio(){

    let datos= await processCSV();
    console.log(datos);
}

async function processCSV(){

    const data = []
    const headersCSV=['A',' B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS1','AT1','AU','AV','AW','AX','AY','AZ','BA'];
    var finalDataRow=new Array();
    const finalData=[];
    
    fs.createReadStream('./payslips.csv')
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
    
            return finalData;
        });

}