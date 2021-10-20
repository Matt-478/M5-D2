import express from "express"
import authorsRouter from "./services/authors/index.js"

const server = express()
server.use(express.json())  //specify before endpoints, otherwise the bodies will be undefined


server.use("/authors", authorsRouter)  //all of the endpoints in authorRouter will have /authors prefix

const port = 3001

server.listen(port, () => {
  console.log("Server is running on port ", port)
})