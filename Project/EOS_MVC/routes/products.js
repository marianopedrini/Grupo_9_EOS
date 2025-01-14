const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productsController = require("../controllers/productsController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images/products"));
    },
    filename: (req, file, cb) => {
        const fileName = "product-" + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({storage});

// Listado de productos
router.get("/products", productsController.products);

// Carrito
router.get("/productCart", productsController.productCart);

// Detalle de producto
router.get("/productDetail", productsController.productDetail);

// Crear un nuevo producto:
router.get("/newProduct", productsController.newProduct);
router.post("/newProduct", upload.single("imagenProducto"),productsController.saveProduct);

//R utas para guardar actualizar un producto:
router.get("/updateProduct", productsController.updateProduct);
router.get("/updateProduct/:idProduct", productsController.productToUpdate);

// Aca va la ruta a una nueva pagina "producto a actualizar" o algo asi

module.exports = router;
