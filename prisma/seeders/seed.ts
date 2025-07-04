import { PrismaClient } from "../../src/generated/prisma"; 

const prisma = new PrismaClient()

const main = async () => {
    // Usuarios
    const usuarios = await prisma.usuario.createManyAndReturn({
        data : [
            {
                username : "ignacio",
                password :"1234",
                estado : true
            },
            {
                username : "edgard",
                password :"aaaa",
                estado : true
            }
        ]
    })

    // Proyectos
    const proyecto = await prisma.proyecto.create({
        data : {
            nombre : "Proyecto 1",
            estado : true,
            usuarios : {
                connect : [
                    { id : usuarios[0].id },
                    { id : usuarios[1].id }
                ]
            }
        }
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })