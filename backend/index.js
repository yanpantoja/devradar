const express = require('express');

const app = express();

app.use(express.json());

//Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:
// Query params: request.query (Filtros, ordenação, paginação, ...)
// Route params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)


app.get('/', (req, res) => {
    return res.json({message: 'hello world'});
});

app.listen(3333);