import express from "express"
import db from "../config/db.js"
import { QueryTypes } from "sequelize"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const [produtos] = await db.query("select * from produtos")
    res.json({ produtos })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!id) return res.status(403).json({ message: "Id faltando" })

    const [produto] = await db.query("select * from produtos where id = ?", {
      replacements: [id],
      type: QueryTypes.SELECT,
    })

    if (!produto || produto.length === 0)
      return res.status(404).json({ message: "produto não encontrado" })

    res.json({ produto })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/", async (req, res) => {
  try {
    const { nome, descricao, preco, id_categoria, disponivel } = req.body

    if (!nome || !descricao || !preco || !id_categoria || !disponivel)
      return res.status(401).json({ message: "Dados faltando" })

    const [categoria] = await db.query(
      "select * from categorias where id = ?",
      {
        replacements: [id_categoria],
        type: QueryTypes.SELECT,
      }
    )

    if (!categoria || categoria.length === 0)
      return res.status(401).json({ message: "Categoria não encontrada" })

    await db.query(
      "insert into produtos (nome, descricao, preco, id_categoria, disponivel) values (?, ?, ?, ?, ?)",
      {
        replacements: [nome, descricao, preco, id_categoria, disponivel],
        type: QueryTypes.INSERT,
      }
    )
    res.json({ message: "produto criado com sucesso!" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const { nome, descricao, preco, id_categoria, disponivel } = req.body

    if (!id) return res.status(403).json({ message: "Id faltando" })

    const [produto] = await db.query("select * from produtos where id = ?", {
      replacements: [id],
      type: QueryTypes.SELECT,
    })

    if (!produto || produto.length === 0)
      return res.status(404).json({ message: "produto não encontrado" })

    await db.query(
      "update produtos set nome = ?, descricao = ?, preco = ?, id_categoria = ?, disponivel = ? where id = ?",
      {
        replacements: [nome, descricao, preco, id_categoria, disponivel, id],
        type: QueryTypes.UPDATE,
      }
    )

    res.json({ message: "produto atualizado com sucesso!" })
  } catch (error) {
    res.status(500).json("Server error")
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!id) return res.status(403).json({ message: "Id faltando" })

    const [produto] = await db.query(`select * from produtos where id = ${id}`)

    if (!produto || produto.length === 0)
      return res.status(404).json({ message: "produto não encontrado" })

    await db.query("delete from produtos where id = ?", {
      replacements: [id],
      type: QueryTypes.DELETE,
    })

    res.json({ message: "produto deletado com sucesso!" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
