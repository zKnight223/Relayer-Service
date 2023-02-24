import express from "express"
import MetaStore from "./middleware/metaStore"
import bodyParser from "body-parser"
import BN from "bignumber.js"

const MAX_SUM = process.env.MAX

const app = express()
const store = MetaStore(10000, new BN(MAX_SUM || "0"))

app.use(bodyParser.urlencoded({ extended: true }))

// Middlewares
app.post("/execute", (req, res) => {
  store.add(req.body)

  res.json({ success: true, message: "Transaction stored!", data: store.fetch() })
})

app.post("/revert", (req, res) => {
  if (store.remove(req.body)) {
    res.json({ success: true, message: "Abort Success!", data: store.fetch() })
  } else {
    res.json({ success: false, message: "Transaction not exit." })
  }
})

app.post("/fetch", (req, res) => {
  res.json({ success: true, message: "Fetch transactions.", data: store.fetch() })
})

const port = process.env.PORT

app.listen(port, () => {})
