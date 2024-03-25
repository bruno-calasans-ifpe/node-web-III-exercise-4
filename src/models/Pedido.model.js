import { DataTypes } from "sequelize"
import db from "../config/db.js"
import Cliente from "./Cliente.model.js"

const Pedido = db.define("pedidos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data_pedido: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING(50),
  },
})

Pedido.belongsTo(Cliente, { foreignKey: "id_cliente" })

export default Pedido
