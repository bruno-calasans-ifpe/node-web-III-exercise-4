import express from "express"
import db from "../config/db.js"
import { QueryTypes } from "sequelize"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const [pedidos] = await db.query("select * from pedidos")
    res.json({ pedidos })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!id) return res.status(403).json({ message: "Id faltando" })

    const [pedido] = await db.query("select * from pedidos where id = ?", {
      replacements: [id],
      type: QueryTypes.SELECT,
    })

    if (!pedido || pedido.length === 0)
      return res.status(404).json({ message: "pedido não encontrado" })

    res.json({ pedido })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/", async (req, res) => {
  try {
    const { id_cliente, status } = req.body

    if (!id_cliente || !status)
      return res.status(401).json({ message: "Dados faltando" })

    const [cliente] = await db.query("select * from clientes where id = ?", {
      replacements: [id_cliente],
      type: QueryTypes.SELECT,
    })

    if (!cliente || cliente.length === 0)
      return res.status(401).json({ message: "Cliente não encontrado" })

    await db.query(
      "insert into pedidos (id_cliente, data_pedido, status) values (?, ?, ?)",
      {
        replacements: [id_cliente, new Date(), status],
        type: QueryTypes.INSERT,
      }
    )
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

    const [cliente] = await db.query("select * from clientes where id = ?", {
      replacements: [id_cliente],
      type: QueryTypes.SELECT,
    })

    if (!cliente || cliente.length === 0)
      return res.status(401).json({ message: "Cliente não encontrado" })

    const [pedido] = await db.query("select * from pedidos where id = ?", {
      replacements: [id],
      type: QueryTypes.SELECT,
    })

    if (!pedido || pedido.length === 0)
      return res.status(404).json({ message: "pedido não encontrado" })

    await db.query(
      "update pedidos set id_cliente = ?, data_pedido = ?, status = ? where id = ?",
      {
        replacements: [id_cliente, new Date(), status, id],
        type: QueryTypes.INSERT,
      }
    )

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

    const [pedido] = await db.query("select * from pedidos where id = ?", {
      replacements: [id],
      type: QueryTypes.SELECT,
    })

    if (!pedido || pedido.length === 0)
      return res.status(404).json({ message: "pedido não encontrado" })

    await db.query("delete from pedidos where id = ?", {
      replacements: [id],
      type: QueryTypes.DELETE,
    })

    res.json({ message: "pedido deletado com sucesso!" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
