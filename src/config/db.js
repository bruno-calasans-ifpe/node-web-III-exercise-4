import { Sequelize } from "sequelize"
// import { DATABASE_URL } from "./constants.js"

const db = new Sequelize({
  database: "loja",
  username: "root",
  password: "root",
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  define: {
    timestamps: true,
    charset: "utf8",
    dialectOptions: {
      collate: "utf8_general_ci",
    },
    freezeTableName: true,
  },
  sync: {
    force: true,
  },
})

try {
  await db.authenticate()
  console.log("Connection has been established successfully.")
} catch (error) {
  console.error("Unable to connect to the database:", error)
}

await db.sync({ force: true })

export default db
