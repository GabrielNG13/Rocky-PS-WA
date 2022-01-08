function readJson(){
    return require('./broken-database.json')
}

function fixNames(data){
    data.forEach(obj => {
        var name = obj.name                 //Copia o valor de name
        name = name.replace(/æ/g,"a")       //Substitui "æ" por "a"
        name = name.replace(/¢/g,"c")       //Substitui "¢" por "c"
        name = name.replace(/ø/g,"o")       //Substitui "ø" por "o"
        name = name.replace(/ß/g,"b")       //Substitui "ß" por "b"
        obj.name = name                     //Registra o valor corrigido
    });
}

function fixPrices(data){
    data.forEach(obj => {
        var price = parseFloat(obj.price)   //Copia o valor de price e o converte para float
        obj.price = price                   //Registra o valor corrigido
    });
}

const data = readJson();                    //Array com todos os objetos obtidos da leitura do JSON
fixNames(data);                             //Chamada da função que corrige os nomes
fixPrices(data);                            //Chamada da função que corrige os preços

console.log(data)
