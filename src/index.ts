import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from "cors"
import { data, TODO } from "./data"
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

app.post("/todos", (req : Request, resp : Response) => {
    const listaTODOs = data
    const todo = req.body

    if (todo == undefined) {
        resp.status(400).json({
            msg : "Debe enviar data de TODO."
        })
        return
    }

    if (todo.descripcion == undefined) {
        resp.status(400).json({
            msg : "Debe enviar una descripcion del TODO."
        })
        return
    }

    if (todo.estado == undefined) {
        resp.status(400).json({
            msg : "Debe enviar un estado del TODO."
        })
        return
    }

    listaTODOs.push({
        id : new Date().getTime(),
        descripcion : todo.descripcion,
        estado : todo.estado
    })

    resp.json({
        msg : ""
    })

})

app.put("/todos", (req: Request, resp : Response) => {
    const listaTODOs = data
    const todo = req.body

    if (todo.id == undefined) {
        resp.status(400).json({
            msg : "Debe enviar un id para modificar."
        })
        return
    }

    for (let t of listaTODOs) {
        if (t.id == todo.id) {
            if (todo.descripcion != undefined)
            {
                t.descripcion = todo.descripcion
            }
            t.estado = todo.estado != undefined ? todo.estado : t.estado

            resp.json({
                msg : ""
            })
            return
        }
    }

    resp.status(400).json({
        msg : "Debe enviar un id que exista."
    })
})

app.delete("/todos/:id", (req: Request, resp : Response) => {
    const listaTODOs = data
    const id = req.params.id

    let indice : number | null = null
    let contador = 0
    for (let t of listaTODOs) {
        if (t.id.toString() == id) {
            indice = contador
            break
        }
        contador++
    }

    if (indice == null) {
        resp.status(400).json({
            msg : "Debe enviar un id que exista."
        })
        return
    } 

    listaTODOs.splice(indice, 1)

    resp.json({
        msg : ""
    })
})

app.listen(PORT, () => {
    console.log(`Servicior iniciado en puerto ${PORT}`)
})