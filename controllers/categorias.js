const { response, request } = require("express");
const { Categoria } = require("../models");

//obtener categorias paginado populate
const obtenerCategorias = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "nombre"),
  ]);
  res.json({
    total,
    categorias,
  });
};

//obtener categoria populate
const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findById(id).populate(
      "usuario",
      "nombre"
    );
    res.json({
      categoria,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe`,
    });
  }
  //generar la data el guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };
  const categoria = new Categoria(data);
  //guardar db
  await categoria.save();
  res.status(201).json(categoria);
};

//actualizar categoria
const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;
  try {
    const categoria = await Categoria.findByIdAndUpdate(id, data, {
      new: true,
    }).populate("usuario", "nombre");
    res.json({
      categoria,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

//borrar categoria estado false
const borrarCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate(
    id,
    {
      estado: false,
    },
    { new: true }
  ).populate("usuario");
  res.json({
    categoria,
  });
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
