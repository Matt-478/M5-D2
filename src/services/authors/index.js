// ALL ENDPOINTS HERE
import express from "express"
import fs from "fs" //file system
import {fileURLToPath} from "url"
import {dirname, join} from "path"
import uniqid from "uniqid"

const authorsRouter = express.Router()  //routers for similiar endpoints that have a common prefix

// finding the path
  const currentFilePath = fileURLToPath(import.meta.url)
  const parentFolderPath = dirname(currentFilePath)  //dirname === directory/folder that this is in
  const authorsJSONPath = join(parentFolderPath, "authors.json")


authorsRouter.get("/", (req, res) => {

  const fileContent = fs.readFileSync(authorsJSONPath)

  console.log(JSON.parse(fileContent))
  const arrayOfStudents = JSON.parse(fileContent)
  res.send(arrayOfStudents)
})


authorsRouter.get("/:authorId", (req, res) => {
  // GET http://localhost:3001/authors/:authorId

  // read the content of authors.json file, obtain that info
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  // find the user by id in the array
  const author = authors.find(a => a.id === req.params.authorId)

  // send the user as a response
  res.send(author)
})


authorsRouter.post("/", (req, res) => {
  // read request body so we know the new students data
  req.body()

  const newAuthor = {...req.body, createdAt: new Date(), id: uniqid()}

  // read the content of authors.json file, obtain that info
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  // Add a new student to the array
  authors.push(newAuthor)

  // write/change the array and give it back to the file
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))

  // send back a response
  res.status(201).send({id: newAuthor.id})
})


authorsRouter.put("/:authorId", (req, res) => {
  // read the array
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  // obtain the specific author with the req.id && give it the old body + new body
  const index = authors.findIndex(author => author.id === req.params.authorId)
  const updatedAuthor = {...authors[index], ...req.body}
  authors[index] = updatedAuthor

  // write the file into the array(updated ofc)
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))

  // send req
  res.send(updatedAuthor)
})

authorsRouter.delete("/:authorId", (req, res) => {
// read the array or authors
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

// filter out specified student from the array - there are  mutiplle methods
  const remainingAuthors = authors.filter(author => author.id !== req.params.authorId) //keeping all that don't have that id

// save the reamining students in the students.json file
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors))

// send a proper response
  res.status(204).send()
})



export default authorsRouter