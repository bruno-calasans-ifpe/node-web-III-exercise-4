import express from "express"
import db from "../config/db.js"
import ItemPedido from "../models/ItemPedido.model.js"
import Pedido from "../models/Pedido.model.js"
import Produto from "../models/Produto.model.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const itemPedidos = await ItemPedido.findAll()
    res.json({ itemPedidos })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!id) return res.status(403).json({ message: "Id faltando" })

    // encontrando item pedido
    const itemPedido = await ItemPedido.findByPk(id)
    if (!itemPedido)
      return res.status(404).json({ message: "Item Pedido não encontrado" })

    res.json({ itemPedido })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/", async (req, res) => {
  try {
    const { id_pedido, id_produto, quantidade, preco_unitario } = req.body

    if (!id_pedido || !id_produto || !quantidade || !preco_unitario)
      return res.status(401).json({ message: "Dados faltando" })

    // encontrando pedido
    const pedido = await Pedido.findByPk(id_pedido)
    if (!pedido)
      return res.status(404).json({ message: "Item Pedido não encontrado" })

    // encontrando produto
    const produto = await Produto.findByPk(id_produto)
    if (!produto)
      return res.status(404).json({ message: "Produto não encontrado" })

    // criando item pedido
    await ItemPedido.create(req.body)
    res.json({ message: "Item pedido  criado com sucesso!" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const { id_pedido, id_produto, quantidade, preco_unitario } = req.body

    if (!id) return res.status(403).json({ message: "Id faltando" })

    // encontrando pedido
    const pedido = await Pedido.findByPk(id_pedido)
    if (!pedido)
      return res.status(404).json({ message: "Item Pedido não encontrado" })

    // encontrando produto
    const produto = await Produto.findByPk(id_produto)
    if (!produto)
      return res.status(404).json({ message: "Produto não encontrado" })

    if (!produto || produto.length === 0)
      return res.status(401).json({ message: "Produto não encontrado" })

    //  encontrando item pedido
    const itemPedido = await ItemPedido.findByPk(id)
    if (!itemPedido)
      return res.status(404).json({ message: "Item Pedido não encontrado" })

    // atualizando item pedido
    await ItemPedido.update(req.body, { where: { id } })
    res.json({ message: "Item pedido atualizado com sucesso!" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!id) return res.status(403).json({ message: "Id faltando" })

    //  encontrando item pedido
    const itemPedido = await ItemPedido.findByPk(id)
    if (!itemPedido)
      return res.status(404).json({ message: "Item Pedido não encontrado" })

    // removendo item pedido
    await ItemPedido.destroy({ where: { id } })
    res.json({ message: "Item pedido deletado com sucesso!" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
