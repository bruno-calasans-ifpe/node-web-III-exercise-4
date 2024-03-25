import express from "express"
import db from "../config/db.js"
import { QueryTypes } from "sequelize"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const [itenspedido] = await db.query("select * from itenspedido")
    res.json({ itenspedido })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!id) return res.status(403).json({ message: "Id faltando" })

    const [itenspedido] = await db.query(
      "select * from itenspedido where id = ?",
      {
        replacements: [id],
        type: QueryTypes.SELECT,
      }
    )

    if (!itenspedido || itenspedido.length === 0)
      return res.status(404).json({ message: "Item pedido não encontrado" })

    res.json({ itenspedido })
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

    const [pedido] = await db.query("select * from pedidos where id = ?", {
      replacements: [id_pedido],
      type: QueryTypes.SELECT,
    })

    if (!pedido || pedido.length === 0)
      return res.status(401).json({ message: "Pedido não encontrado" })

    const [produto] = await db.query("select * from pedidos where id = ?", {
      replacements: [id_produto],
      type: QueryTypes.SELECT,
    })

    if (!produto || produto.length === 0)
      return res.status(401).json({ message: "Produto não encontrado" })

    await db.query(
      "insert into itenspedido (id_pedido, id_produto, quantidade, preco_unitario) values (?, ?, ?, ?)",
      {
        replacements: [id_pedido, id_produto, quantidade, preco_unitario],
        type: QueryTypes.INSERT,
      }
    )
    res.json({ message: "Item pedido  criado com sucesso!" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const { id_pedido, id_produto, quantidade, preco_unitario } = req.body

    if (!id) return res.status(403).json({ message: "Id faltando" })

    // Encontrando pedido
    const [pedido] = await db.query("select * from pedidos where id = ?", {
      replacements: [id_pedido],
      type: QueryTypes.SELECT,
    })

    if (!pedido || pedido.length === 0)
      return res.status(401).json({ message: "Pedido não encontrado" })

    //  Encontrando produto
    const [produto] = await db.query("select * from pedidos where id = ?", {
      replacements: [id_produto],
      type: QueryTypes.SELECT,
    })

    if (!produto || produto.length === 0)
      return res.status(401).json({ message: "Produto não encontrado" })

    //   encontrando item pedido
    const [itenspedido] = await db.query(
      "select * from itenspedido where id = ?",
      {
        replacements: [id],
        type: QueryTypes.SELECT,
      }
    )

    if (!itenspedido || itenspedido.length === 0)
      return res.status(404).json({ message: "Item pedido não encontrado" })

    await db.query(
      "update itenspedido set id_pedido = ?, id_produto = ?, quantidade = ?, preco_unitario = ? where id = ?",
      {
        replacements: [id_pedido, id_produto, quantidade, preco_unitario, id],
        type: QueryTypes.INSERT,
      }
    )

    res.json({ message: "Item pedido atualizado com sucesso!" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!id) return res.status(403).json({ message: "Id faltando" })

    const [itenspedido] = await db.query(
      "select * from itenspedido where id = ?",
      {
        replacements: [id],
        type: QueryTypes.SELECT,
      }
    )

    if (!itenspedido || itenspedido.length === 0)
      return res.status(404).json({ message: "Item pedido não encontrado" })

    await db.query("delete from itenspedido where id = ?", {
      replacements: [id],
      type: QueryTypes.DELETE,
    })

    res.json({ message: "Item pedido deletado com sucesso!" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
