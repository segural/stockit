// Requires
const { DATE } = require("sequelize");
const { QueryTypes } = require("sequelize");
const db = require("../database/models");
require("datejs");
const ejs = require("ejs");
const axios = require('axios');

const AutoMails = async function () {
    let stocks = await db.sequelize.query("SELECT c.name as 'category',SUM(s.quantity) as 'quantity' FROM stocks s INNER JOIN products p on s.idProduct = p.id INNER JOIN categories c on p.idCategory = c.id GROUP BY c.name", {
        type: QueryTypes.SELECT
    });
    function objetoATablaHTML(stocks) {
        let tablaHTML = "<table border='1'>";
        tablaHTML += "<tr><th>Categoría</th><th>Cantidad</th></tr>";
        for (stock of stocks) {
            if (stock.quantity <= 3) {
            tablaHTML += `<tr><td>${stock.category}</td><td>${stock.quantity}</td></tr>`;
        }}
        tablaHTML += "</table>";
        return tablaHTML;
    }

    //EMAIL
    // Definir los datos que deseas enviar en el cuerpo del POST
    const postData = {
            "para": [
                "notificaciones_it@rtp.com.ar"
            ],
            "cc": [],
            "cco": [],
            "asunto": "Stock cantidades",
            "contenido": "<h1>Sistema Stock IT</h1>" + "<h2>Hay items que debe verificar, queda poca cantidad: </h2> <br>" + objetoATablaHTML(stocks),
            "isBodyHtml": true,
    };
    
    // URL de la API a la que deseas enviar el POST
    const apiUrl = 'http://arweb01.crtp.corp:36245/Email?appId=9D3CFF08-4061-494B-B445-6061DBF6699B';
    
    // Realizar la solicitud POST utilizando Axios
    axios.post(apiUrl, postData)
        .then(response => {
            console.log('Respuesta de la API:', response.data);
        })
        .catch(error => {
            console.error('Error al enviar POST:', error);
        });

    }

module.exports = AutoMails;