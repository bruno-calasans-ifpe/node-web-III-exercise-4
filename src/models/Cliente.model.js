import { DataTypes } from "sequelize"
import db from "../config/db"

const Cliente = db.define("clientes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  endereco: {
    type: DataTypes.STRING(255),
  },
  telefone: {
    type: DataTypes.STRING(20),
  },
})

export default Cliente
