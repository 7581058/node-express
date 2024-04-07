const express = require("express")
const app = express()

app.get('/', (req, res) => {
  res.send("hello node")
})
app.get('/contacts', (req, res) => {
  res.send("Contacts Page")
})

app.listen(3000, () => {
  console.log("서버 실행 중")
})