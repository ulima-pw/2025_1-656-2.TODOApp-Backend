-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
