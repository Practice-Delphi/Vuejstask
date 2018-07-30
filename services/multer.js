
const multer = require('multer');

const storage_photo = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../res/photos/`);
    },
    filename: (req, file, cb) => {
        const name = 'Photo';// file.originalname.split('.')[0];
        const extension = file.originalname.split('.')[1];
        cb(null, `${name}-${Date.now()}.${extension}`);
    }
});

const photouploader = multer({ dest: `${__dirname}/../res/photos/`, storage: storage_photo });

module.exports.uploadhoto = photouploader.single('photo');

