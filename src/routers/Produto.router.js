import express from "express"
import db from "../config/db.js"
import Produto from "../models/Produto.model.js"
import Categoria from "../models/Categoria.model.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.findAll()
    res.json({ produtos })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!id) return res.status(403).json({ message: "Id faltando" })

    // pegando produto
    const produto = await Produto.findByPk(id)
    if (!produto)
      return res.status(404).json({ message: "Produto não encontrado" })

    res.json({ produto })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/", async (req, res) => {
  try {
    const { nome, descricao, preco, id_categoria, disponivel } = req.body
    if (!nome || !descricao || !preco || !id_categoria || !disponivel)
      return res.status(401).json({ message: "Dados faltando" })

    // encontrando categoria
    const categoria = await Categoria.findByPk(id_categoria)
    if (!categoria)
      return res.status(404).json({ message: "Categoria não encontrada" })

    // criando produto
    await Produto.create(req.body)
    res.json({ message: "produto criado com sucesso!" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const { id_categoria } = req.body

    if (!id) return res.status(403).json({ message: "Id faltando" })

    // procurando categoria
    const categoria = await Categoria.findByPk(id_categoria)
    if (!categoria)
      return res.status(404).json({ message: "Categoria não encontrada" })

    // pegando produto
    const produto = await Produto.findByPk(id)
    if (!produto)
      return res.status(404).json({ message: "Produto não encontrado" })

    // atualizando produto
    await Produto.update(req.body, { where: { id } })
    res.json({ message: "Produto atualizado com sucesso!" })
  } catch (error) {
    res.status(500).json("Server error")
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!id) return res.status(403).json({ message: "Id faltando" })

    // pegando produto
    const produto = await Produto.findByPk(id)
    if (!produto)
      return res.status(404).json({ message: "Produto não encontrado" })

    // removendo produto
    await Produto.destroy({ where: { id } })
    res.json({ message: "produto deletado com sucesso!" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
