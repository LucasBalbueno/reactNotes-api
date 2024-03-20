// importando sqlite3 e sqlite
// o sqlite3 é o driver do sqlite. Usamos o driver para se conectar com o banco de dados.
const sqlite3 = require('sqlite3')
// o sqlite é de fato o banco de dados
const sqlite = require('sqlite')

// O path é uma biblioteca nativa do node que serve para manipular caminhos de arquivos e diretórios de acordo com o ambiente, ao invés de uma forma fixa
// importando a biblioteca path
const path = require('path')

// criando a função para inicializar o banco de dados
// quando trabalhamos com banco de dados devemos usar funções assincronas para não travar a aplicação quando estivermos esperando uma resposta do banco de dados

async function sqliteConnection() {
    // abrindo uma conexão com o banco de dados usando open() do sqlite
    // dentro do open() devemos passar um objeto com as configurações da conexão do banco de dados.
    const database = await sqlite.open({
        // filename dizemos onde o arquivo do banco de dados será criado. Já o driver usamos para se conectar com o banco de dados (devemos informar que estamos usando o sqlite3)

        // usamos o path.resolve para criar o caminho do arquivo de acordo com o ambiente. __dirname é uma variável global do node que retorna o diretório do arquivo que está executando o código e depois passamos a intrução para voltar uma pasta com (..) e então criar o arquivo database.db (se não existir, ele será criado)
        filename: path.resolve(__dirname, "..", 'database.db'),
        driver: sqlite3.Database
    })

    return database
}

// exportando a função sqliteConnection para usar em outros arquivos
module.exports = sqliteConnection