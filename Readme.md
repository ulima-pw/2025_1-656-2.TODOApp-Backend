# Documento de Endpoints

## Endpoint: Listar TODOs

- Path: "/todos"
- Metodo: GET
- Input: 

Query Parameter: estado

- Output

```json
[
    {
        "id" : 1,
        "descripcion" : "comer",
        "estado" : 0
    },
    {
        "id" : 2,
        "descripcion" : "dormir",
        "estado" : 1
    }
]
```
