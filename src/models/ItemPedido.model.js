import { DataTypes } from "sequelize"
import db from "../config/db.js"
import Produto from "./Produto.model.js"
import Pedido from "./Pedido.model.js"

const ItemPedido = db.define("itenspedido", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantidade: {
    type: DataTypes.INTEGER,
  },
  preco_unitario: {
    type: DataTypes.DECIMAL(10, 2),
  },
})

ItemPedido.belongsTo(Produto, { foreignKey: "id_produto" })
ItemPedido.belongsTo(Pedido, { foreignKey: "id_pedido" })

export default ItemPedido
