// Fonctionnement : on va stocker l'image avec multer.memoryStorage, ce qui sauvegarde l'image dans la RAM
// Pour récupérer l'image, on passe par le buffer du fichier
// En passant le buffer en argument de sharp, on récupère l'image et on peut ensuite lui appliquer une fonction resize, et passer les arguments
// Ensuite on enregistre le fichier reshape avec un .toFile et on passe le chemin de sauvegarde en argument

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
