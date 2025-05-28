export const categories = [
    {
        "id": "5ebdaaa3-782f-47d5-8dc9-cbc155af9af7",
        "name": "Supermarket",
        "description": "esta es una descripcion que no deberia ser obligatoria, ahora que lo pienso",
        "type": "expense",
        "parentId": null
    },
    {
        "id": "837d3a2b-ae7f-4560-85bd-c7cb9e199bc3",
        "name": "Bravo",
        "description": "este es el supermercado mas utilizado",
        "type": "expense",
        "parentId": {
            "value": "5ebdaaa3-782f-47d5-8dc9-cbc155af9af7"
        }
    },
    {
        "id": "9d6c1ccf-b32f-4694-b75c-510670fa3029",
        "name": "Nacional",
        "description": "este es el supermercado que mas me gusta",
        "type": "expense",
        "parentId": {
            "value": "5ebdaaa3-782f-47d5-8dc9-cbc155af9af7"
        }
    },
    {
        "id": "c9325de3-49ad-472b-aa56-fcb7bd9d971c",
        "name": "Jumbo",
        "description": "lo maximo para comprar",
        "type": "expense",
        "parentId": {
            "value": "5ebdaaa3-782f-47d5-8dc9-cbc155af9af7"
        }
    },
    {
        "id": "c3a6b319-0e50-4e43-8aad-1e38ad9bff60",
        "name": "Salary",
        "description": "payment account from jobs",
        "type": "income",
        "parentId": null
    }
]