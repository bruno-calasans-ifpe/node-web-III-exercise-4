import express from "express"
import db from "../config/db.js"
import Cliente from "../models/Cliente.model.js"
import Categoria from "../models/Categoria.model.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const clientes = await Cliente.findAll()
    res.json({ clientes })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!id) return res.status(403).json({ message: "Id faltando" })

    const cliente = await Cliente.findByPk(id)

    if (!cliente)
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

    await Cliente.create(req.body)
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

    const cliente = await Cliente.findByPk(id)
    if (!cliente)
      return res.status(404).json({ message: "Cliente não encontrado" })

    await Cliente.update(req.body, { where: { id } })
    res.json({ message: "Cliente atualizado com sucesso!" })
  } catch (error) {
    console.log(error)
    res.status(500).json("Server error")
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!id) return res.status(403).json({ message: "Id faltando" })

    const cliente = await Cliente.findByPk(id)
    if (!cliente)
      return res.status(404).json({ message: "Cliente não encontrado" })

    await Cliente.destroy({ where: { id } })
    res.json({ message: "Cliente deletado com sucesso!" })
    
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
