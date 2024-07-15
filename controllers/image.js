const imageRouter = require('express').Router();
const path = require('path');

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    },
});

const upload = multer({storage : storage});

imageRouter.post('/', upload.single("Image"), (req, res) => {
    try {
        res.status(200).json({res: "Guardado"});
    } catch {
        res.status(500).json({message: error.message})
    }
});

module.exports = imageRouter;