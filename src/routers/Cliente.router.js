import express from "express"
import db from "../config/db.js"
import { QueryTypes } from "sequelize"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const [clientes] = await db.query("select * from clientes")
    res.json({ clientes })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!id) return res.status(403).json({ message: "Id faltando" })

    const [cliente] = await db.query("select * from clientes where id = ?", {
      replacements: [id],
      type: QueryTypes.SELECT,
    })

    if (!cliente || cliente.length === 0)
      return res.status(404).json({ message: "Cliente não encontrado" })

    res.json({ cliente })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/", async (req, res) => {
  try {
    const { nome, email, endereco, telefone } = req.body

    if (!nome || !email || !endereco || !telefone)
      return res.status(401).json({ message: "Dados faltando" })

    await db.query(
      "insert into clientes (nome, email, endereco, telefone) values (?, ?, ?, ?)",
      {
        replacements: [nome, email, endereco, telefone],
        type: QueryTypes.INSERT,
      }
    )
    res.json({ message: "Cliente criado com sucesso!" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const { nome, email, endereco, telefone } = req.body

    if (!id) return res.status(403).json({ message: "Id faltando" })

    const [cliente] = await db.query("select * from clientes where id = ?", {
      replacements: [id],
      type: QueryTypes.SELECT,
    })

    if (!cliente || cliente.length === 0)
      return res.status(404).json({ message: "Cliente não encontrado" })

    await db.query(
      "update clientes set nome = ?, email = ?, endereco = ?, telefone = ? where id = ?",
      {
        replacements: [nome, email, endereco, telefone, id],
        type: QueryTypes.UPDATE,
      }
    )

    res.json({ message: "Cliente atualizado com sucesso!" })
  } catch (error) {
    res.status(500).json("Server error")
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!id) return res.status(403).json({ message: "Id faltando" })

    const [cliente] = await db.query(`select * from clientes where id = ${id}`)

    if (!cliente || cliente.length === 0)
      return res.status(404).json({ message: "Cliente não encontrado" })

    await db.query("delete from clientes where id = ?", {
      replacements: [id],
      type: QueryTypes.DELETE,
    })

    res.json({ message: "Cliente deletado com sucesso!" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
