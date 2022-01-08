//Carrega o JSON corrompido
function readJson(){
    try {
        return require('./broken-database.json')
    } catch (MODULE_NOT_FOUND){
        console.log("File not found");
        return null;
    }
}

//Substitui os caracateres trocados nos nomes
function fixName(data){
    data.forEach(obj => {
        let name = obj.name
        name = name.replace(/æ/g,"a")
        name = name.replace(/¢/g,"c")
        name = name.replace(/ø/g,"o")
        name = name.replace(/ß/g,"b")
        obj.name = name
    });
    return
}

//Converte os precos para valor numérico
function fixPrice(data){
    data.forEach(obj => {
        if(typeof obj.price == "string"){
            let price = parseFloat(obj.price)
            obj.price = price
        }
    });
    return
}

//Adiciona o atributo quantidade
function fixQuantity(data){
    data.forEach(obj => {
        if(obj.quantity == undefined){
            obj.quantity = 0
        }
    });
    return
}

//Gera o arquivo saida.json
function exportSolutionToJson(data) {
    let json = JSON.stringify(data)
    let fs = require('fs')
    fs.writeFile('saida.json',json, (err) => {
        if (err) console.log(err)
        console.log('\nSolution file created')
    })
    return
}

//Imprime a lista ordenada dos produtos
function orderedList(data) {
    let list = data.sort( function(a,b) {
        if (a.category > b.category) {
            return 1;
        } else if (a.category < b.category) {
            return -1;
        } else {
            if (a.id > b.id) {
                return 1;
            } else if (a.id < b.id) {
                return -1;
            } else {
                return 0;
            }
        }
    });
    console.log(list);
    return;
}

//Imprime o valor total de estoque por categoria
function valuePerCategory(data) {
    let categories = []
    let values = []
    data.forEach(obj => {
        if (categories.indexOf(obj.category) == -1) {
            categories.push(obj.category)
            values.push(0)
        }
        values[categories.indexOf(obj.category)] += obj.quantity * obj.price
    });
    
    for(let i = 0; i < categories.length; i++){
        console.log(categories[i] + ": " + values[i].toFixed(2))
    }

    return;
}

const data = readJson();
if (data == null) {
    return;
}
fixName(data);
fixPrice(data);
fixQuantity(data);
exportSolutionToJson(data);

console.log("----------- Ordered list ------------")
orderedList(data);

console.log("\n-------- Value per category ---------")
valuePerCategory(data);