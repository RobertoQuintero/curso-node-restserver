const auth = require("./auth");
const buscar = require("./buscar");
const productos = require("./productos");
const categorias = require("./categorias");
const usuarios = require("./usuarios");

module.exports = {
  ...auth,
  ...buscar,
  ...productos,
  ...categorias,
  ...usuarios,
};
