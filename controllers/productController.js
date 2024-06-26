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
    try {
        // Extract product name from request parameters
        const { nombre } = req.params;
        console.log(nombre);
        console.log(typeof nombre);

        // Search for the product by exact description (assuming 'DESCRIPCION' is the field in your schema)
        const product = await Product.findOne({ DESCRIPCION: nombre });

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // If product found, return it in the response
        res.json(product);
    } catch (err) {
        console.error('Error al buscar producto por nombre:', err);
        res.status(500).json({ error: 'Error del servidor al buscar producto' });
    }
};

const getProductsBySimilarName = async (req, res) => {
    try {
        const { nombre } = req.params;

        // Verificar si nombre está definido y no es null
        if (!nombre) {
            return res.status(400).json({ error: 'Debe proporcionar una descripción para buscar productos similares' });
        }

        const products = await Product.find({ DESCRIPCION: { $regex: nombre, $options: 'i' } })

        if (!products || products.length === 0) {
            return res.status(404).json({ error: 'No se encontraron productos similares' });
        }

        res.json(products);
    } catch (err) {
        console.error('Error al buscar productos por descripción similar:', err);
        res.status(500).json({ error: 'Error del servidor al buscar productos' });
    }
};


module.exports = { postNewProduct, postMassiveProducts, getProductByCode, getProductByName, getProductsBySimilarName };
