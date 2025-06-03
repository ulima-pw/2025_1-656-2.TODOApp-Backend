import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { data, TODO } from "./data"
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.get("/", (req : Request, resp : Response) => {
    resp.send("Endpoint raiz de Backend de TODOApp")
})

app.get("/todos", (req : Request, resp : Response) => {
    const listaTODOs = data

    const estado = req.query.estado

    if (estado == undefined) {
        resp.json(listaTODOs)
        return
    }

    const nuevaLista : TODO[] = []

    for (let t of listaTODOs) {
        if (t.estado.toString() == estado){
            nuevaLista.push(t)
        }
    }

    resp.json(nuevaLista)
})

app.listen(PORT, () => {
    console.log(`Servicior iniciado en puerto ${PORT}`)
})