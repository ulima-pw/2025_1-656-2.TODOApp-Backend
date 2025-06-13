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

## Endpoint: Registrar TODO

- Path: "/todos"
- Metodo: POST
- Input: 

```json
{
    "descripcion" : "bla bla bla",
    "estado" : 0
}
```

- Output:

```json
{
    "msg" : ""
}
```

## Endpoint: Modificar TODO

- Path: "/todos"
- Metodo: PUT
- Input: 

```json
{
    "id" : 1,
    "descripcion" : "bla bla bla",
    "estado" : 0
}
```

- Output:

```json
{
    "msg" : ""
}
```

## Endpoint: Eliminar TODO

- Path: "/todos/:id"
- Metodo: DELETE
- Input: Path Parameter :id

- Output:

```json
{
    "msg" : ""
}
```