const { Router } = require("express");
const { check } = require("express-validator");

const {
  usuariosGet,
  usuariosDelete,
  usuariosPatch,
  usuariosPut,
  usuariosPost,
} = require("../controllers");

const {
  esRolValido,
  emailExiste,
  existeUsuarioPorID,
} = require("../helpers/db-validators");

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const router = Router();

router.get("/", usuariosGet);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener más de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom(esRolValido),

    validarCampos,
  ],
  usuariosPost
);
router.put(
  "/:id",
  check("id", "No es un ID válido").isMongoId(),
  check("id").custom(existeUsuarioPorID),
  check("rol").custom(esRolValido),
  validarCampos,
  usuariosPut
);
router.patch("/:id", usuariosPatch);
router.delete(
  "/:id",
  validarJWT,
  // esAdminRole,
  tieneRole("ADMIN_ROLE", "VENTAS_ROLE", "OTRO_ROLE"),
  check("id", "No es un ID válido").isMongoId(),
  check("id").custom(existeUsuarioPorID),
  validarCampos,
  usuariosDelete
);

module.exports = router;
