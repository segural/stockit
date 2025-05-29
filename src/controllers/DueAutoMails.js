// Requires
const { DATE } = require("sequelize");
const { QueryTypes } = require("sequelize");
const db = require("../database/models");
require("datejs");
const ejs = require("ejs");
const axios = require('axios');

const DueAutoMails = async function () {
    const fechaActual = new Date();
    let number = fechaActual.getTime();
    let items = await db.due.findAll({
        where: {status: 1}
    });

    function objetoATablaHTML(stocks) {
        let tablaHTML = "<table border='1'>";
        tablaHTML += "<tr><th>Descripción</th><th>Quien renueva</th><th>Fecha de vencimiento</th></tr>";
        for (item of items) {
            if (item.datenumber - number <= "2629746000" && item.datenumber - number > "604800000") {
            tablaHTML += `<tr><td>${item.description}</td><td>${item.who}</td><td>${item.duedate}</td></tr>`;
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
            "asunto": "Vencimientos de licencias",
            "contenido": "<h1>Sistema Stock IT</h1>" + "<h2>Hay vencimientos en menos de 1 mes que debe verificar: </h2> <br>" + objetoATablaHTML(items),
            "isHtml": true,
    };
    
    // URL de la API a la que deseas enviar el POST
    const apiUrl = 'http://arweb02.crtp.corp:32276/api/Email?appId=5B3DFA11-8EF6-465D-9D72-DEFD9FFBD8B7&accountId=6C0B00EB-FAD0-47BA-B370-F62DA5AD5797';
    
    // Realizar la solicitud POST utilizando Axios
    axios.post(apiUrl, postData)
        .then(response => {
            console.log('Respuesta de la API:', response.data);
        })
        .catch(error => {
            console.error('Error al enviar POST:', error);
        });

    }

module.exports = DueAutoMails;