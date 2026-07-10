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
        obtenerPrevision(resultado.latitude, resultado.longitude, resultado.name, resultado.country);
    });

    celdaBoton.appendChild(botonSeleccionar);

    filaTabla.appendChild(ciudad);
    filaTabla.appendChild(pais);
    filaTabla.appendChild(celdaBoton);

    tabla.appendChild(filaTabla);

}



async function obtenerPrevision(latitud, longitud, ciudad_buscada, pais_buscado){

    const url =
        "https://api.open-meteo.com/v1/forecast" +
        "?latitude=" + latitud +
        "&longitude=" + longitud +
        "&current=temperature_2m" +
        "&timezone=auto" +
        "&forecast_days=7";

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    const temperatura = document.getElementById("temperatura");
    temperatura.textContent = datos.current.temperature_2m;

    const ciudad = document.getElementById("ciudad");
    ciudad.textContent = ciudad_buscada;

    const pais = document.getElementById("pais");
    pais.textContent = pais_buscado;

}
