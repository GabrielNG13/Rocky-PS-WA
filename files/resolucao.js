function readJson(){
    try {
        return require('./broken-database.json')
    } catch (MODULE_NOT_FOUND){
        console.log("File not found");
        return null;
    }
}

function fixName(data){
    data.forEach(obj => {
        let name = obj.name                 //Copia o valor de name
        name = name.replace(/æ/g,"a")       //Substitui "æ" por "a"
        name = name.replace(/¢/g,"c")       //Substitui "¢" por "c"
        name = name.replace(/ø/g,"o")       //Substitui "ø" por "o"
        name = name.replace(/ß/g,"b")       //Substitui "ß" por "b"
        obj.name = name                     //Registra o valor corrigido
    });
}

function fixPrice(data){
    data.forEach(obj => {
        if(typeof obj.price == "string"){
            let price = parseFloat(obj.price)   //Copia o valor de price e o converte para float
            obj.price = price                   //Registra o valor corrigido
        }
    });
}

function fixQuantity(data){
    data.forEach(obj => {
        if(obj.quantity == undefined){
            obj.quantity = 0
        }
    });
}

function exportSolutionToJson(data) {
    let json = JSON.stringify(data)
    let fs = require('fs')
    fs.writeFile('files/fixed-database.json',json,'utf8', function(err) {
        if (err) throw err
        console.log('Complete')
    })
}

const data = readJson();                    //Array com todos os objetos obtidos da leitura do JSON
if (data == null) {
    return;
}
fixName(data);                              //Chamada da função que corrige os nomes
fixPrice(data);                             //Chamada da função que corrige os preços
fixQuantity(data);                          //Chamada da função que corrige as quantidades
exportSolutionToJson(data);                 //Chamada da função que exporta um arquivo com a saída
