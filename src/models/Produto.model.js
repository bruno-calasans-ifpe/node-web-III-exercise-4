import { DataTypes } from "sequelize"
import db from "../config/db"
import Categoria from "./Categoria.model"

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

Produto.hasMany(Categoria, { foreignKey: "id_categoria" })
Categoria.belongsTo(Produto)

export default Produto
