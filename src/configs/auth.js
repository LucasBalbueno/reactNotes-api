// Aqui contém as informações de configuração do JWT;
// O secret é a chave secreta que será usada para gerar o token que será default;
// O expiresIn é o tempo de expiração do token, que está configurado para 1 dia;
module.exports = {
    jwt: {
        secret: "default",
        expiresIn: "1d"
    }
}