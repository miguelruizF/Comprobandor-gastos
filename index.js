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

    nuevoGasto(gasto){
        this.gasto = [...this.gasto, gasto];
        // console.log(this.gasto);
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado = this.gasto.reduce((total, gasto)=>total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
    }

    eliminarGasto(id){
        this.gasto = this.gasto.filter((gasto) => gasto.id !== id);
        this.calcularRestante();
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

    agregarGastoListado(gasto){

        this.limpiarHTML();

        //Iterar sobre gastos
        gasto.forEach(gasto => {
            const {cantidad, nombre, id } = gasto;
            //Crear un LI
            const nuevoGasto = d.createElement("li");
            nuevoGasto.className = "list-group-item d-flex justify-content-between align-items-center";
            nuevoGasto.dataset.id = id;

            // console.log(nuevoGasto);

            //Agregar el HTML
            nuevoGasto.innerHTML = ` ${nombre} <span class="badge bg-primary rounded-pill"> $${cantidad}</span>
            `;
            const btnBorrar = d.createElement("button");
            btnBorrar.classList.add("btn", "btn-danger", "borrar-gasto");
            btnBorrar.textContent = "Borrar X";
            btnBorrar.onclick = () => {
                eliminarGasto(id);
            }

            nuevoGasto.appendChild(btnBorrar);

            gastoListado.appendChild(nuevoGasto);
            //boton para borrar gasto
        })
    }

    actualizarRestante(restante){
        d.querySelector("#restante").textContent = restante;
    }

    comprobarPresupuesto(presupuestoObj){
        const {presupuesto, restante} = presupuestoObj;
        const restanteDiv = d.querySelector(".restante");
        
        //comprobar 25%
        if((presupuesto / 4) > restante){
            restanteDiv.classList.remove("alert-success", "alert-warning");
            restanteDiv.classList.add("alert-danger");
        }else if((presupuesto / 2) > restante){
            restanteDiv.classList.remove("alert-success");
            restanteDiv.classList.add("alert-warning");
        }else{
            restanteDiv.classList.remove("alert-danger", "alert-warning");
            restanteDiv.classList.add("alert-success");
        }

        //total igual a cero
        if(restante <= 0){
            ui.imprimirAlerta("El presupuesto se ha agotado", "error");
            formulario.querySelector('button[type="submit"]').disabled = true;
        }else{
            formulario.querySelector('button[type="submit"]').disabled = false;
        }
    }

    limpiarHTML(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild)
        }
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
    const cantidad = Number(d.querySelector("#cantidad").value);

    if(nombre === "" || cantidad === "" ){
        ui.imprimirAlerta("Ambos campos son obligatorios", "error");
        return;
    } else if ( cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta("Cantidad no valida", "error");
        return;
    }

    //Generar objeto Gasto
    const gastoC = {
        nombre,
        cantidad,   
        id: Date.now()
    }

    //Añade un nuevo gasto
    presupuesto.nuevoGasto(gastoC);
    // console.log(gasto);
    ui.imprimirAlerta("Gasto agregado correctamente");

    //Imprimir gastos
    const {gasto, restante} = presupuesto;
    ui.agregarGastoListado(gasto);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);

    //Reinicia formulario
    formulario.reset();
    
}

function eliminarGasto(id){
    // console.log(id)
    presupuesto.eliminarGasto(id);
    const {gasto, restante} = presupuesto;
    ui.agregarGastoListado(gasto);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);

}