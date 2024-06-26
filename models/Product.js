const mongoose = require('mongoose');
const moment = require('moment');

const productoSchema = new mongoose.Schema({
  NUMERO: { type: Number, required: true },
  CODIGO: { type: String, required: true },
  DESCRIPCION: { type: String, index: true, required: true },
  BARRAS: { type: String },
  POR_PESO: { type: Number, required: true },
  ACTIVO: { type: Number, required: true },
  TIPO: { type: String },
  CORTO: { type: String, required: true },
  UNIDAD_COMPRA: { type: String, required: true },
  UNIDAD_CONSUMO: { type: String, required: true },
  COSTO: { type: Number, required: true },
  EQUIVALENCIA: { type: Number, required: true },
  EXISTENCIA: { type: Number, required: true },
  MINIMO: { type: Number, required: true },
  MAXIMO: { type: Number, required: true },
  UBICACION: { type: String, default: '' },
  FAMILIA: { type: String },
  SUBFAMILIA: { type: String },
  ESPESOR: { type: Number, required: true },
  COLOR: { type: String, default: '' },
  PROCESOS: { type: String, default: '' },
  PESOM2: { type: Number, required: true },
  MARCA: { type: String },
  ESTATUS: { type: String, default: '' },
  FECHA: {
    type: Date,
    set: val => moment(val, "D/M/YYYY HH:mm:ss").toDate()
  },
  ULTIMA_COMPRA: {
      type: Date,
      set: function(val) {
          // Intenta convertir la fecha usando moment.js
          const momentDate = moment(val, "D/M/YYYY HH:mm:ss");
          if (momentDate.isValid()) {
              return momentDate.toDate();
          } else {
              // Si no es válida, establece la fecha actual
              return new Date();
          }
      }
  },
  ULTIMA_VENTA: {
      type: Date,
      set: function(val) {
          // Intenta convertir la fecha usando moment.js
          const momentDate = moment(val, "D/M/YYYY HH:mm:ss");
          if (momentDate.isValid()) {
              return momentDate.toDate();
          } else {
              // Si no es válida, establece la fecha actual
              return new Date();
          }
      }
  },
  NOTAS: { type: String, default: '' },
  USUARIO: { type: String, required: true },
  FDATE: {
    type: Date,
    set: val => moment(val, "D/M/YYYY HH:mm:ss").toDate()
  },
  P01: { type: Number, required: true },
  P02: { type: Number, required: true },
  P03: { type: Number, required: true },
  P04: { type: Number, default: 0 },
  P05: { type: Number, default: 0 },
  P06: { type: Number, default: 0 },
  P07: { type: Number, default: 0 },
  P08: { type: Number, default: 0 },
  P09: { type: Number, default: 0 },
  P10: { type: Number, default: 5 },
  VINCULA: { type: String, default: '' },
  Ancho: { type: Number, default: 0 },
  Alto: { type: Number, default: 0 },
  IVA: { type: Number, default: 0 },
  IMPORTADO: { type: Number, required: true },
  PAQUETE: { type: Number, default: 0 },
  PRIORIDAD: { type: Number, default: 0 },
  favorito: { type: Number, default: 1 },
  kit: { type: Number, default: 0 },
  ran_01: { type: Number, default: 0 },
  ran_02: { type: Number, default: 0 },
  ran_03: { type: Number, default: 0 },
  ran_04: { type: Number, default: 0 },
  ran_05: { type: Number, default: 0 },
  ran_06: { type: Number, default: 0 },
  ran_07: { type: Number, default: 0 },
  ran_08: { type: Number, default: 0 },
  ran_09: { type: Number, default: 0 },
  ran_10: { type: Number, default: 0 },
});

const Product = mongoose.model('Product', productoSchema);

module.exports = Product;
