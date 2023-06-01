const d = document;

//Variables
const formulario = d.querySelector("#agregar-gasto");
const gastoListado = d.querySelector("#gastos ul");


//Eventos
eventListeners();
function eventListeners(){
    d.addEventListener("DOMContentLoaded", preguntarPresupuesto);

    formulario.addEventListener("submit", agregarGasto);
}

//Clases

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gasto = [];
    }
}

class UI{
    insertarPresupuesto(cantidad){
        const {presupuesto, restante} = cantidad;
        d.querySelector("#total").textContent = presupuesto;
        d.querySelector("#restante").textContent = restante;
    }

    imprimirAlerta(mensaje,tipo){
        const divMensaje = d.createElement("div");
        divMensaje.classList.add("text-center", "alert");

        tipo === "error" ? divMensaje.classList.add("alert-danger"): divMensaje.classList.add("alert-success");

        divMensaje.textContent = mensaje;
        // console.log(divMensaje);
        //Insertar HTML
        d.querySelector("#primario").insertBefore(divMensaje, formulario);

        //Quitar HTML
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);

    }
}

const ui = new UI;
let presupuesto;

//Funciones

function preguntarPresupuesto() {
    const preguntarUsuario = prompt("¿Cual es tu presupuesto?");
    // console.log(preguntarUsuario);

    preguntarUsuario === "" || preguntarUsuario === null || isNaN(preguntarUsuario) || preguntarUsuario <= 0 ? window.location.reload() : "";

    //Presupuesto valido

    presupuesto = new Presupuesto(preguntarUsuario);
    // console.log(presupuesto)
    ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e){
    e.preventDefault();
    const nombre = d.querySelector("#gasto").value;
    const cantidad = d.querySelector("#cantidad").value;

    if(nombre === "" || cantidad === "" ){
        ui.imprimirAlerta("Ambos campos son obligatorios", "error");
        return;
    } else if ( cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta("Cantidad no valida", "error");
        return;
    }
}