import express, { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"

const UsuariosController = () => {
    const router = express.Router()

    router.post("/login", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const { username, password } = req.body

        if (!username || !password) {
            resp.status(400).json({
                msg: "Debe enviar un username y password."
            })
            return
        }

        const usuario = await prisma.usuario.findFirst({
            where: {
                username: username,
                password: password
            },
            omit : {
                password: true // No devolver la contraseña en la respuesta
            }
        })

        if (!usuario) {
            resp.status(401).json({
                msg: "Usuario o contraseña incorrectos."
            })
            return
        }

        resp.json(usuario)
    })

    return router
}

export default UsuariosController