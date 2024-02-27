const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node Server API´s',
            version: '1.0.0',
        },
    },
    apis: ['entradas/entradas.js'], // files containing annotations as above
};


const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get('/docs.json', (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);

    });

    console.log("documentacion Swagger http://localhost:" + port + "/docs");
}

module.exports = { swaggerDocs };

