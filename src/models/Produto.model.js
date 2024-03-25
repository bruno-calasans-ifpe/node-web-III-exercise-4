import { DataTypes } from "sequelize"
import db from "../config/db.js"
import Categoria from "./Categoria.model.js"

const Produto = db.define("produtos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
  },
})

Categoria.hasOne(Produto, { foreignKey: "id_categoria" })

export default Produto
