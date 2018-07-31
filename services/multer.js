
const multer = require('multer');
const fs = require('fs');

const photodir = `${__dirname}/../res/photos/`;

/* Check res/photos directory */
if (!fs.existsSync(photodir)) {
    fs.mkdirSync(photodir);
    console.log('Directory res/photos is created and ready');
} else {
    console.log('Directory res/photos is ready');
}

const storagephoto = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, photodir);
    },
    filename: (req, file, cb) => {
        const name = 'Photo';// file.originalname.split('.')[0];
        const extension = file.originalname.split('.')[1];
        cb(null, `${name}-${Date.now()}.${extension}`);
    }
});

const photouploader = multer({ dest: photodir, storage: storagephoto });

module.exports.uploadhoto = photouploader.single('photo');

