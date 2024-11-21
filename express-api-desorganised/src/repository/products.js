export const getAllProductsSQL = "SELECT * FROM products"
export const createProductSQL = "INSERT INTO products(name, price) VALUES (?, ?)"
export const updateProductSQL = "UPDATE products SET name = ?, price = ? WHERE id = ?"
export const deleteProductSQL = "DELETE FROM products WHERE id = ?"