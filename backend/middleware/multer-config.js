// Le code est obsolète: 
// Ce fonctionnement nous propose de stocker directement l'image avec multer.diskStorage, ce qui sauvegarde en local
// Nous, nous voulons maintenant passer l'image dans le memoryStorage afin d'avoir un buffer (une mémoire tampon)
// Avec ce buffer, sharp pourra récupérer l'image et la compresser selon notre envie
// Sharp se chargera ensuite de sauvegarder l'image dans le dossier indiqué
//  https://www.youtube.com/watch?v=n-AuBy-z4_A

const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage();

const upload = multer({
    storage
});

const resizeAndSaveImage = async (req, res, next) => {
    try {
        const timestamp = Date.now();
        const filename = `${timestamp}-${req.file.originalname}`;
        req.file.filename = filename;
        await sharp(req.file.buffer)
            .resize({ width: 206, height: 260 })
            .toFile(`./images/${filename}`);
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    upload,
    resizeAndSaveImage
};