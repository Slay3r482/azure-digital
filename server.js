const express = require("express")
const app = express()
const fs = require("fs")

app.use(express.json())
app.use(express.static("public"))

let products = JSON.parse(fs.readFileSync("./database/products.json"))

app.get("/api/products",(req,res)=>{
res.json(products)
})

app.listen(3000,()=>{
console.log("Server running")
})
