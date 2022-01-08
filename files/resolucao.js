function readJson(){
    return require('./broken-database.json')
}

function fixNames(data){
    data.forEach(obj => {
        var name = obj.name
        name = name.replace(/æ/g,"a")       //Substituindo "æ" por "a"
        name = name.replace(/¢/g,"c")       //Substituindo "¢" por "c"
        name = name.replace(/ø/g,"o")       //Substituindo "ø" por "o"
        name = name.replace(/ß/g,"b")       //Substituindo "ß" por "b"
        obj.name = name
    });
}

const data = readJson();                    //Array com todos os objetos obtidos da leitura do JSON
fixNames(data);                             //Chamada da função que corrige os nomes


console.log(data)