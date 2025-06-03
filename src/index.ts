import express, { Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.get("/", (req : Request, resp : Response) => {
    resp.send("Endpoint raiz de Backend de TODOApp")
})

app.listen(PORT, () => {
    console.log(`Servicior iniciado en puerto ${PORT}`)
})