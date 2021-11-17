const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const query = req.query;
  res.json({
    msg: "get API - controlador",
    query,
  });
};
const usuariosPost = (req, res = response) => {
  const body = req.body;
  res.status(201).json({
    msg: "post API - controlador",
    body,
  });
};
const usuariosPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "put API - controlador",
    id,
  });
};
const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "get API - controlador",
  });
};
const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "get API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
