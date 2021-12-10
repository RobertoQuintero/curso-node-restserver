const { Categoria, Producto } = require("../models");
const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya existe`);
  }
};

const existeUsuarioPorID = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe`);
  }
};
//valida que exista la categoria
const existeCategoria = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id ${id} no existe en la DB`);
  }
};

const existeProducto = async (id) => {
  const producto = await Producto.findById(id);
  if (!producto) {
    throw new Error(`El id ${id} no existe en la DB`);
  }
};

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioPorID,
  existeCategoria,
  existeProducto,
};
