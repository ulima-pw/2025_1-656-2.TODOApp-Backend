import express, { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"

const TodosController = () => {
    const router = express.Router()

    router.get("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const estado = req.query.estado

        if (estado == undefined) {
            const listaTODOs = await prisma.todo.findMany()
            resp.json(listaTODOs)
            return
        }

        const listaTODOs = await prisma.todo.findMany({
            where: {
                estado: estado == "0" ? false : true
            }
        })

        resp.json(listaTODOs)
    })

    router.post("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const todo = req.body

        if (todo == undefined) {
            resp.status(400).json({
                msg: "Debe enviar data de TODO."
            })
            return
        }

        if (todo.descripcion == undefined) {
            resp.status(400).json({
                msg: "Debe enviar una descripcion del TODO."
            })
            return
        }

        try {
            const todoCreado = await prisma.todo.create({
                data: todo
            })
            resp.json({
                msg: "",
                todo: todoCreado
            })
            return
        } catch (e) {
            resp.status(400).json({
                msg: "Hubo un error creando un TODO.",
                details: e
            })
            return
        }
    })

    router.put("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const todo = req.body

        if (todo.id == undefined) {
            resp.status(400).json({
                msg: "Debe enviar un id para modificar."
            })
            return
        }

        try {
            const todoModificado = await prisma.todo.update({
                where: {
                    id: todo.id
                },
                data: todo
            })
            resp.json({
                msg: "",
                todo: todoModificado
            })
        } catch (e) {
            resp.status(400).json({
                msg: "Debe enviar un id que exista."
            })
        }
    })

    router.delete("/:id", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const id = req.params.id

        if (id == undefined) {
            resp.status(400).json({
                msg: "Debe enviar un id."
            })
            return
        }

        try {
            await prisma.todo.delete({
                where: {
                    id: parseInt(id)
                }
            })
            resp.json({
                msg: ""
            })
            return
        } catch (e) {
            resp.status(400).json({
                msg: "Debe enviar un id que exista."
            })
            return
        }
    })

    return router
}

export default TodosController