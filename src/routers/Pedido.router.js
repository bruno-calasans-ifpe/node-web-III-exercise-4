import express from "express"
import db from "../config/db.js"
import Pedido from "../models/Pedido.model.js"
import Cliente from "../models/Cliente.model.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const pedidos = await Pedido.findAll()
    res.json({ pedidos })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!id) return res.status(403).json({ message: "Id faltando" })

    // encontrando pedido
    const pedido = await Pedido.findByPk(id)
    if (!pedido)
      return res.status(404).json({ message: "Pedido não encontrado" })

    res.json({ pedido })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/", async (req, res) => {
  try {
    const { id_cliente, status } = req.body

    if (!id_cliente || !status)
      return res.status(401).json({ message: "Dados faltando" })

    // encontrando cliente
    const cliente = await Cliente.findByPk(id_cliente)
    if (!cliente)
      return res.status(404).json({ message: "Cliente não encontrado" })

    // colocando a data do pedido
    req.body.data_pedido = new Date()

    // criando pedido
    await Pedido.create(req.body)
    res.json({ message: "pedido criado com sucesso!" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const { id_cliente, status } = req.body

    if (!id) return res.status(403).json({ message: "Id faltando" })

    // encontrando cliente
    const cliente = await Cliente.findByPk(id_cliente)
    if (!cliente)
      return res.status(404).json({ message: "Cliente não encontrado" })

    // encontrando pedido
    const pedido = await Pedido.findByPk(id)
    if (!pedido)
      return res.status(404).json({ message: "Pedido não encontrado" })

    // atualizando pedido
    await Pedido.update(req.body, { where: { id } })

    res.json({ message: "pedido atualizado com sucesso!" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!id) return res.status(403).json({ message: "Id faltando" })

    // encontrando pedido
    const pedido = await Pedido.findByPk(id)
    if (!pedido)
      return res.status(404).json({ message: "Pedido não encontrado" })

    // removendo pedido
    await Pedido.destroy({ where: { id } })

    res.json({ message: "Pedido deletado com sucesso!" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
