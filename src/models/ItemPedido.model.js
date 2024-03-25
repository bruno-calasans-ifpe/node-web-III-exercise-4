import { DataTypes } from "sequelize"
import db from "../config/db"
import Produto from "./Produto.model"
import Pedido from "./Pedido.model"

const ItemPedido = db.define("item_pedidos", {
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

Produto.hasMany(ItemPedido)
ItemPedido.belongsTo(Produto, {
  foreignKey: "id_produto",
})

Pedido.hasMany(ItemPedido)
ItemPedido.belongsTo(Pedido, {
  foreignKey: "id_pedido",
})

export default ItemPedido
