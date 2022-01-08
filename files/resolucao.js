function readJson(){
    return require('./broken-database.json')
}

function fixName(data){
    data.forEach(obj => {
        var name = obj.name                 //Copia o valor de name
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
            var price = parseFloat(obj.price)   //Copia o valor de price e o converte para float
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

const data = readJson();                    //Array com todos os objetos obtidos da leitura do JSON
fixName(data);                              //Chamada da função que corrige os nomes
fixPrice(data);                             //Chamada da função que corrige os preços
fixQuantity(data);                          //Chamada da função que corrige as quantidades

console.log(data)
