function readJson(){
    return require('./broken-database.json')
}

data = readJson();  //Array com todos os objetos obtidos da leitura do JSON

console.log(data)