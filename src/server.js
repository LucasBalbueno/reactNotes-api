require('express-async-errors');
// antes de todo o código devemos importar a dependencia de tratamento de erros.

// importando o migrations que automatiza a criação do banco de dados e tabelas
const migrationsRun = require('./database/sqlite/migrations');

// importando a classe de tratamento de erro
const AppError = require('./utils/AppError');

// importando o express. Como se tivessemos pegando toda a pasta do express e armazenando na variável express
const express = require('express');

// importando o arquivo principal que une as rotas de usuários da aplicação
// por padrão, quando não é informado o arquivo, o node procura pelo arquivo chamado index.js
const routes = require("./routes");

// executando o migrations de automatização da criação do banco de dados e tabelas
migrationsRun()

// inicializando o express
const app = express();

// dizendo para o express que ele irá trabalhar com json (PARA O MÉTODO POST)
app.use(express.json());

// dizendo para o express que ele irá trabalhar com as rotas do arquivo index.js
app.use(routes);

// o error é para capturarmos os erros que acontecerem na aplicação, a requisição é a requisição em si.
// a resposta é a resposta que daremos para o cliente. O next é para caso quisermos que o erro continue a ser tratado por outras etapas.
app.use((error, request, response, next) => {
    // se o tipo da instancia do erro for AppError (erro por parte do cliente)
    if (error instanceof AppError) {
        // retornamos um json com o status e a mensagem do erro
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }

    // para mostrar o erro no console (caso precisamos debugar)
    console.error(error);

    // caso a o erro seja do lado do servidos, retornamos um erro 500 (erro interno do servidor), uma mensagem e o status.
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
});

// definindo o nº da porta/endereço que o express irá observar
const port = 3333;
// criando uma função para o app oberservar nessa porta/endereço
app.listen(port, () => console.log(`Server is running on port ${port}`));