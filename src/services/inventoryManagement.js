const Product = require("../models/Product");

const updateProductPrice = async (name, newPrice) => {
  try {
    const productName = name.toLowerCase();
    const priceValue = Number(newPrice);
    if (isNaN(priceValue) || priceValue <= 0) {
      return { success: false, message: 'Invalid price' };
    }

    const product = await Product.findOne({ name: productName });
    if (!product) {
      return { success: false, message: 'Product not found' };
    }

    product.price = priceValue;
    product.lastModified = Date.now();
    await product.save();

    
    console.log(`Updated price for ${productName} to ${priceValue}`);
    return { success: true, price: product.price };
  } catch (error) {
    console.error('Error updating product price:', error);
    return { success: false, message: 'Failed to update product price' };
  }
};

  const createProduct = async (name, price, inventory = 0) => {
    try {
      const productName = name.toLowerCase();
      const product = new Product({ name: productName, price, inventory });
      await product.save();
      
      console.log(`Product ${productName} created with price ${price} and inventory ${inventory}`);
      return { success: true, product };
    } catch (error) {
      console.error('Error creating product:', error);
      return { success: false, message: 'Product creation failed' };
    }
  };



// Increase inventory

const increaseInventory = async (name, quantity) => {
  try {
    const productName = name.toLowerCase();
    const incrementValue = Number(quantity);
    if (isNaN(incrementValue) || incrementValue <= 0) {
      return { success: false, message: 'Invalid quantity' };
    }

    const product = await Product.findOne({ name: productName });
    if (!product) {
      return { success: false, message: 'Product not found' };
    }

    product.inventory += incrementValue;
    product.lastModified = Date.now();
    await product.save();

    console.log(`Increased inventory for ${productName} by ${incrementValue}. New inventory: ${product.inventory}`);
    return { success: true, inventory: product.inventory };
  } catch (error) {
    console.error('Error increasing inventory:', error);
    return { success: false, message: 'Failed to increase inventory' };
  }
};

// Decrease inventory
const decreaseInventory = async (name, quantity) => {
  try {
    const productName = name.toLowerCase();
    const decrementValue = Number(quantity);
    if (isNaN(decrementValue) || decrementValue <= 0) {
      return { success: false, message: 'Invalid quantity' };
    }

    const product = await Product.findOne({ name: productName });
    if (!product) {
      return { success: false, message: 'Product not found' };
    }

    if (product.inventory < decrementValue) {
      return { success: false, message: 'Insufficient inventory' };
    }

    product.inventory -= decrementValue;
    product.lastModified = Date.now();
    await product.save();

 
    console.log(`Decreased inventory for ${productName} by ${decrementValue}. New inventory: ${product.inventory}`);
    return { success: true, inventory: product.inventory };
  } catch (error) {
    console.error('Error decreasing inventory:', error);
    return { success: false, message: 'Failed to decrease inventory' };
  }
};

// Get current inventory
const getInventory = async (name) => {
  try {
    console.log("getInventory",(name))

    const productName = name.toLocaleLowerCase()
    const product = await Product.findOne({ name:productName });
    if (!product) {
      return { success: false, message: "Product not found" };
    }

    return { success: true, inventory: product.inventory };
  } catch (error) {
    console.error("Error getting inventory:", error);
    return { success: false, message: "Failed to get inventory" };
  }
};


const getProductPrice = async (name) => {
    try {
        console.log("getProductPrice",name)
        const productName = name?.toLocaleLowerCase()

      const product = await Product.findOne({ name: productName });
      console.log("getProductPrice",product)
      if (!product) {
        return { success: false, message: "Product not found" };
      }
      return { success: true, price: product.price };
    } catch (error) {
      console.error("Error fetching product price:", error);
      return { success: false, message: "Failed to fetch product price" };
    }
  };


  const deleteProduct = async (name) => {
    try {
      const productName = name.toLowerCase();
      const product = await Product.findOne({ name: productName });
      if (!product) {
        return { success: false, message: 'Product not found' };
      }
  
      await product.deleteOne();
  
      
      console.log(`Deleted product ${productName}`);
      return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
      console.error('Error deleting product:', error);
      return { success: false, message: 'Failed to delete product' };
    }
  };
  
  
module.exports = {deleteProduct, increaseInventory, decreaseInventory, getInventory, createProduct,updateProductPrice,getProductPrice };
