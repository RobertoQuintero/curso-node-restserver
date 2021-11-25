const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
  } catch (error) {
    console.log(error);
    throw new Error("Error al inicia la base de datos");
  }
};
console.log("Base de datos online");
// const a={
//   useNewUrlParser:true,
//   useUnifiedTopology:true,
//   useCreateIndex:true,
//   useFindAndModify:false
// }

module.exports = {
  dbConnection,
};
