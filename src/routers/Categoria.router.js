import express from "express"
import db from "../config/db.js"
import { QueryTypes } from "sequelize"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const [categorias] = await db.query("select * from categorias")
    res.json(categorias)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!id) return res.status(403).json({ message: "Id faltando" })

    // encontrando categoria
    const [categoria] = await db.query(
      "select * from categorias where id = ?",
      {
        replacements: [id],
        type: QueryTypes.SELECT,
      }
    )

    if (!categoria || categoria.length === 0)
      return res.status(404).json({ message: "Categoria não encontrada" })

    res.json(categoria)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/", async (req, res) => {
  try {
    const { nome, descricao } = req.body

    if (!nome || !descricao)
      return res.status(403).json({ message: "Dados faltando" })

    // criando categoria
    await db.query("insert into categorias (nome, descricao) values (?, ?)", {
      replacements: [nome, descricao],
      type: QueryTypes.INSERT,
    })
    res.json({ message: "Categoria criada com sucesso!" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const { nome, descricao } = req.body

    if (!id) return res.status(403).json({ message: "Id faltando" })

    // encontrando categoria
    const [categoria] = await db.query(
      "select * from categorias where id = ?",
      {
        replacements: [id],
        type: QueryTypes.SELECT,
      }
    )
    if (!categoria || categoria.length === 0)
      return res.status(404).json({ message: "Categoria não encontrada" })

    // atualizando categoria
    await db.query(
      "update categorias set nome = ?, descricao = ? where id = ?",
      {
        replacements: [nome, descricao, id],
        type: QueryTypes.UPDATE,
      }
    )

    res.json({ message: "Categoria atualizada com sucesso" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!id)
      return res.status(403).json({ message: "Id da categoria está faltando" })

    // encontrando categoria
    const [categoria] = await db.query(
      "select * from categorias where id = ?",
      {
        replacements: [id],
        type: QueryTypes.SELECT,
      }
    )
    if (!categoria || categoria.length === 0)
      return res.status(404).json({ message: "Categoria não encontrada" })

    // removendo categoria
    await db.query("delete from categorias where id = ?", {
      replacements: [id],
      type: QueryTypes.DELETE,
    })

    res.json({ message: "Categoria deletada com sucesso!" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
