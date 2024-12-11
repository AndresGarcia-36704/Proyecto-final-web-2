import { sequelize } from '../libs/sequelize.js';

async function index() {
    console.log('INDEX /api/v1/makeups');
    const makeups = await sequelize.models.Makeup.findAll(); // Asegúrate de usar "Makeup"
    return makeups;
}

async function create(makeup) {
    console.log('CREATE /api/v1/makeups');
    const newMakeup = await sequelize.models.Makeup.create({
        name: makeup.name,
        done: makeup.done || false,
        brand: makeup.brand || null,
        price: makeup.price || null,
        category: makeup.category || null,
        description: makeup.description || null,
        imagePath: makeup.imagePath || 'images/' 
    });
    return newMakeup;
}

async function show(id) {
    console.log('SHOW /api/v1/makeups/:id');
    const makeup = await sequelize.models.Makeup.yPk(id); // Asegúrate de usar "Makeup"
    return makeup;
}

async function update(id, makeup) {
    console.log('UPDATE /api/v1/makeups/:id');
    const searchedMakeup = await sequelize.models.Makeup.findByPk(id);
    if (!searchedMakeup) {
        return false;
    }

    const [rowsAffected, [updatedMakeup]] = await sequelize.models.Makeup.update({
        name: makeup.name,
        done: makeup.done || false,
        brand: makeup.brand || null,
        price: makeup.price || null,
        category: makeup.category || null,
        description: makeup.description || null,
        imagePath: makeup.imagePath || 'images/', 
    }, {
        where: { id },
        returning: true
    });
    return updatedMakeup;
}


async function destroy(id) {
    console.log('DESTROY /api/v1/makeups/:id');
    const makeup = await sequelize.models.Makeup.findByPk(id); 
    if (!makeup) {
        return false;
    }

    await sequelize.models.Makeup.destroy({ 
        where: {
            id
        }
    });
    return makeup;
}

async function getProductsGroupedByCategory() {
    console.log('GET PRODUCTS GROUPED BY CATEGORY');
    const products = await sequelize.models.Makeup.findAll(); // Asegúrate de usar "Makeup"
    const categories = {};

    // Agrupar productos por categoría
    products.forEach(product => {
        if (!categories[product.category]) {
            categories[product.category] = { name: product.category, products: [] };
        }
        categories[product.category].products.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imagePath: product.imagePath, 
        });
    });

    // Convertir objeto a arreglo
    return Object.values(categories);
}


export {
    index,
    create,
    show,
    update,
    destroy,
    getProductsGroupedByCategory
};