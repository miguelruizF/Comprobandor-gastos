const d = document;

//Variables
const formulario = d.querySelector("#agregar-gasto");
const gastoListado = d.querySelector("#gastos ul");


//Eventos
eventListeners();
function eventListeners(){
    d.addEventListener("DOMContentLoaded", preguntarPresupuesto);
}

//Clases


//Funciones

function preguntarPresupuesto() {
    const preguntarUsuario = prompt("¿Cual es tu presupuesto?");
    // console.log(preguntarUsuario);

    preguntarUsuario === "" || preguntarUsuario === null || isNaN(preguntarUsuario) || preguntarUsuario <= 0 ? window.location.reload() : ""
}