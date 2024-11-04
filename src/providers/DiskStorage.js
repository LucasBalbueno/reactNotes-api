const fs = require('fs');
const path = require('path');
const uploadConfig = require('../configs/upload');

class DiskStorage {

    // Método para salvar o arquivo
    async saveFile(file) {
        // Mover o arquivo da pasta tmp para a pasta uploads
        await fs.promises.rename(
            // Origem
            path.resolve(uploadConfig.TMP_FOLDER, file),
            // Destino
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        );

        return file;

    }

    // Retornar o nome do arquivo
    async deleteFile(file) {
        // Caminho do arquivo
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

        // Verificar se o arquivo existe
        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        };

        // Deletar o arquivo
        await fs.promises.unlink(filePath);
    };
}

module.exports = DiskStorage;