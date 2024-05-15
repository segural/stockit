// Requires
const { DATE } = require("sequelize");
const { QueryTypes } = require("sequelize");
const db = require("../database/models");
require("datejs");
const ejs = require("ejs");
const axios = require('axios');

const AutoMails = async function () {
    const fechaActual = new Date();
    let number = fechaActual.getTime();
    let items = await db.due.findAll({
        where: {status: 1}
    });

    function objetoATablaHTML(stocks) {
        let tablaHTML = "<table border='1'>";
        tablaHTML += "<tr><th>Descripción</th><th>Quien renueva</th><th>Fecha de vencimiento</th></tr>";
        for (item of items) {
            if (item.datenumber - number <= "0") {
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
            "asunto": "Licencias vencidas - ALERTA",
            "contenido": "<h1>Sistema Stock IT</h1>" + "<h2>Hay licencias vencidas que debe verificar: </h2> <br>" + objetoATablaHTML(stocks),
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