import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from "cors"
import TodosController from "./controllers/TodosControllers"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors()) // Habilitamos cualquier url de cliente
app.use(bodyParser.json()) // Configuracion para poder recibir peticiones en formato json
app.use(bodyParser.urlencoded({
    extended : true
}))

app.get("/", (req : Request, resp : Response) => {
    resp.send("Endpoint raiz de Backend de TODOApp")
})

app.use("/todos", TodosController())


app.listen(PORT, () => {
    console.log(`Servicior iniciado en puerto ${PORT}`)
})