const Product = require('../models/Product.js');

const postNewProduct = async (req, res) => {
    const productData = req.body;

    try {
        // Verificar si el producto ya existe
        const existingProduct = await Product.findOne({ NUMERO: productData.NUMERO });
        if (existingProduct) {
            return res.status(400).json({ error: 'Product with this number already exists' });
        }

        const newProduct = new Product(productData);
        await newProduct.save();

        res.status(201).json({ message: 'Product created', product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Product creation failed' });
    }
};

const postMassiveProducts = async (req, res) => {
    const productsData = req.body; // Suponiendo que envías un array con los datos de los productos
    

    try {
        // Obtener los números de productos que ya existen
        const existingProducts = await Product.find({ NUMERO: { $in: productsData.map(p => p.NUMERO) } }, 'NUMERO');
        const existingProductNumbers = existingProducts.map(p => p.NUMERO);

        // Filtrar los productos que no existen
        const newProductsData = productsData.filter(p => !existingProductNumbers.includes(p.NUMERO));

        // Insertar solo los nuevos productos
        if (newProductsData.length > 0) {
            await Product.insertMany(newProductsData);
        }

        res.status(201).json({
            message: 'Products created',
            skippedProducts: existingProductNumbers
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Products creation failed' });
    }
};

// Función para buscar producto por código
const getProductByCode = async (req, res) => {
    const { codigo } = req.params; // Obtener el código del producto desde los parámetros de la solicitud

    try {
        // Buscar el producto por el código
        const product = await Product.findOne({ CODIGO: codigo });

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Si se encuentra el producto, devolverlo en la respuesta
        res.json(product);
    } catch (err) {
        console.error('Error al buscar producto por código:', err);
        res.status(500).json({ error: 'Error del servidor al buscar producto' });
    }
};

const getProductByName = async (req, res) => {
    let { nombre } = req.params; // Obtener el nombre del producto desde los parámetros de la solicitud

    try {

        // Buscar el producto por el nombre exacto
        const product = await Product.findOne({ DESCRIPCION: nombre });

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Si se encuentra el producto, devolverlo en la respuesta
        res.json(product);
    } catch (err) {
        console.error('Error al buscar producto por nombre:', err);
        res.status(500).json({ error: 'Error del servidor al buscar producto' });
    }
}

module.exports = { postNewProduct, postMassiveProducts, getProductByCode, getProductByName };
