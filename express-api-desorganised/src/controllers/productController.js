import db from '../config/database.js';
import { getAllProductsSQL } from '../repository/products.js';

export const getAllProducts = (req, res) => {
  db.all(getAllProductsSQL, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erreur interne du serveur');
    } else {
      res.json(rows);
    }
  });
};

export const createProduct = (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    res.status(400).send('Le nom et le prix sont requis');
  } else {
    const sql = 'INSERT INTO products(name, price) VALUES (?, ?)';
    db.run(sql, [name, price], function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Erreur interne du serveur');
      } else {
        const id = this.lastID;
        res.status(201).json({ id, name, price });
      }
    });
  }
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  if (!name || !price) {
    res.status(400).send('Le nom et le prix sont requis');
  } else {
    const sql = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    db.run(sql, [name, price, id], function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Erreur interne du serveur');
      } else if (this.changes === 0) {
        res.status(404).send('Produit non trouvé');
      } else {
        res.status(200).json({ id, name, price });
      }
    });
  }
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM products WHERE id = ?';
  db.run(sql, [id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erreur interne du serveur');
    } else if (this.changes === 0) {
      res.status(404).send('Produit non trouvé');
    } else {
      res.status(204).send();
    }
  });
};
