import { DataTypes } from "sequelize"
import db from "../config/db"
import Cliente from "./Cliente.model"

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

Cliente.hasMany(Pedido)
Pedido.belongsTo(Cliente, { foreignKey: "id_cliente" })

export default Pedido
