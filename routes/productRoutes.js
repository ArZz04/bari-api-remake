const express = require('express');
const { 
    postNewProduct, 
    postMassiveProducts, 
    getProductByCode, 
    getProductByName, 
    getProductsBySimilarName,
    updateInfoProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/create', postNewProduct);
router.post('/create/massive', postMassiveProducts);

router.get('/:codigo', getProductByCode);
router.get('/search/:nombre', getProductByName);
router.get('/search/similar/:nombre', getProductsBySimilarName);

router.put('/update/:codigo', updateInfoProduct);

module.exports = router;
