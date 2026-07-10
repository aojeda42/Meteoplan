const inputLocalidad = document.getElementById("localidad");
const boton = document.getElementById("btnLocalidad");

boton.addEventListener("click", async () => {

    const localidad = inputLocalidad.value.trim();
    const datosRecibidos = await buscarLocalidad(localidad);
    const tabla = document.getElementById("tabla");

    for (const resultado of datosRecibidos.results) {

        const filaTabla = document.createElement("tr");

        const ciudad = document.createElement("td");
        ciudad.textContent = resultado.name;

        const pais = document.createElement("td");
        pais.textContent = resultado.country;

        const botonSeleccionar = document.createElement("button");
        botonSeleccionar.textContent = "Seleccionar";

        botonSeleccionar.addEventListener("click", () => {
            console.log("Botón pulsado");
            console.log(resultado.name);
            console.log(resultado.country);
            const latitud = resultado.latitude;
            const longitud = resultado.longitude;
            console.log("Latitud: " + latitud + "Longitud: " + longitud);
        });

        const celdaBoton = document.createElement("td");
        celdaBoton.appendChild(botonSeleccionar);

        filaTabla.appendChild(ciudad);
        filaTabla.appendChild(pais);
        filaTabla.appendChild(celdaBoton);
        
        tabla.appendChild(filaTabla);

    };


});

async function buscarLocalidad(localidad) {

    const url =
        "https://geocoding-api.open-meteo.com/v1/search" +
        "?name=" + encodeURIComponent(localidad) +
        "&count=5" +
        "&language=es" +
        "&format=json";

    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos;

};
