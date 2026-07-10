const inputLocalidad = document.getElementById("localidad");
const boton = document.getElementById("btnLocalidad");
const tabla = document.getElementById("tabla");

boton.addEventListener("click", gestionarBusqueda);

async function gestionarBusqueda() {

    const localidad = inputLocalidad.value.trim();
    const datosRecibidos = await buscarLocalidad(localidad);
    mostrarResultados(datosRecibidos.results);

}

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
}

function mostrarResultados(resultados) {

    tabla.replaceChildren();
    for (const resultado of resultados) {
        crearFilaResultado(resultado);
    }

}

function crearFilaResultado(resultado) {

    const filaTabla = document.createElement("tr");

    const ciudad = document.createElement("td");
    ciudad.textContent = resultado.name;

    const pais = document.createElement("td");
    pais.textContent = resultado.country;

    const celdaBoton = document.createElement("td");
    const botonSeleccionar = document.createElement("button");

    botonSeleccionar.textContent = "Seleccionar";

    botonSeleccionar.addEventListener("click", () => {
        seleccionarLocalidad(resultado);
    });

    celdaBoton.appendChild(botonSeleccionar);

    filaTabla.appendChild(ciudad);
    filaTabla.appendChild(pais);
    filaTabla.appendChild(celdaBoton);

    tabla.appendChild(filaTabla);

}

function seleccionarLocalidad(resultado) {

    const latitud = resultado.latitude;
    const longitud = resultado.longitude;

    console.log("Botón pulsado");
    console.log(resultado.name);
    console.log(resultado.country);
    console.log(`Latitud: ${latitud} Longitud: ${longitud}`);

}
