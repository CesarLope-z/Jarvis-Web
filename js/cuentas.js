const formularioRegistro = document.querySelector('#formRegistro');
const espacioRegistros = document.querySelector('#registros');

let efectivo = 0;
let monedero = 0;
let ahorro = 0;


let registros = [];

cargarTodo();
function cargarTodo(){
    
    if(formularioRegistro){
        formularioRegistro.addEventListener('submit', agregarRegistro);
    }
    

    document.addEventListener('DOMContentLoaded', () => {
        registros = JSON.parse( localStorage.getItem('registros') ) || []  ;
        crearHTML();
    });

}

class Cuenta{
    constructor(dinero){
        this.dinero = Number(dinero);
        this.restante = Number(dinero);
    }
    ingreso(cuenta, dinero){
        // console.log(cuenta + dinero)
        switch (cuenta) {
            case 'Efectivo':
                // console.log('Desde ingreso efectivo')
                efectivo = efectivo + Number(dinero);
                console.log(efectivo)
                break;

            case 'Monedero':
                // console.log('Desde ingreso monedero')
                monedero = monedero + Number(dinero);
                console.log(monedero)
                break;
            case 'Ahorros':
                // console.log('Desde ingreso ahorro');
                ahorro = ahorro + Number(dinero);
                console.log(ahorro)
                
                break;
        
            default:
                alert('Algo pasa con el estupido codigo');
                
                break;
        }
    }
    gasto(cuenta, dinero){
        switch (cuenta) {
            case 'Efectivo':
                // console.log('Desde ingreso efectivo')
                efectivo = efectivo - Number(dinero);
                console.log(efectivo)
                break;

            case 'Monedero':
                // console.log('Desde ingreso monedero')
                monedero = monedero - Number(dinero);
                console.log(monedero)
                break;
            case 'Ahorros':
                // console.log('Desde ingreso ahorro');
                ahorro = ahorro - Number(dinero);
                console.log(ahorro)
                break;
        
            default:
                alert('Algo pasa con el estupido codigo');
                
                break;
        }
    }
    transferir(cuentaEmisora, cuentaReceptora, dinero){
        // alert('Por el momento no se ha configurado la transferencia de cuentas')
    }
}

const cuenta = new Cuenta(efectivo);


function agregarRegistro(e){
    e.preventDefault();

    // inputs, validar, arraysregistros, copiarlos, html, reset

    
     // leer el valor del textarea
    const tipo = document.querySelector('#tipo').value;
    const cuenta = document.querySelector('#cuenta').value;
    const dinero = document.querySelector('#dinero').value;
    const categoria = document.querySelector('#categoria').value;

    
    if (tipo === ' ' || cuenta === ' ' || dinero === '' || categoria === '') {
        alert('Llena todos los campos, cabeza de nance');
        return;
    }
    else if(isNaN(dinero)){
        alert('El dinero a procesar no es valido, coloca un valor correcto, pendejo')
        return;
    }


    const registroObj = {
        id: Date.now(),
        tipo,
        cuenta,
        dinero,
        categoria
    }

    registros = [...registros, registroObj]
    console.log(registros);
    crearHTML();
    formularioRegistro.reset();
}
function crearHTML(){
    if (espacioRegistros) {
        limpiarHTML(espacioRegistros);
    }
    const registrosReverse = registros.reverse();

    if(registrosReverse.length > 0 ) {
        registrosReverse.forEach( registro =>  {
            const div = document.createElement('div');
            
            if(registro.tipo == 1){

                //ingreso
                div.classList.add('registroI')
                div.innerHTML = `
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="iconoI icon icon-tabler icon-tabler-circle-check" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#73f141" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <circle cx="12" cy="12" r="9" />
                            <path d="M9 12l2 2l4 -4" />
                        </svg>
                    </div>
                    <div>
                        <p class="gn">${registro.categoria}</p>
                        <p class="gn">${registro.cuenta}</p>
                    </div>
                    <div>
                        <p class="fW gn">$${registro.dinero}</p>
                    </div>
                `;
                cuenta.ingreso(registro.cuenta, registro.dinero)
            }
            else if(registro.tipo == 2){
                //gasto
                div.classList.add('registroG')
                div.innerHTML = `
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="iconoG icon icon-tabler icon-tabler-refresh-alert" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                        <line x1="12" y1="9" x2="12" y2="12" />
                        <line x1="12" y1="15" x2="12.01" y2="15" />
                        </svg>    
                    </div>
                    <div>
                        <p class="rd">${registro.categoria}</p>
                        <p class="rd">${registro.cuenta}</p>
                    </div>
                    <div>
                        <p class="fW rd">$-${registro.dinero}</p>
                    </div>
                `;
                cuenta.gasto(registro.cuenta, registro.dinero)
            }
            else if(registro.tipo == 3){
                //transf
                div.classList.add('registroT')
                div.innerHTML = `
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="iconoT icon icon-tabler icon-tabler-arrows-left-right" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="21" y1="17" x2="3" y2="17" />
                        <path d="M6 10l-3 -3l3 -3" />
                        <line x1="3" y1="7" x2="21" y2="7" />
                        <path d="M18 20l3 -3l-3 -3" />
                        </svg>   
                    </div>
                    <div>
                        <p class="yll">${registro.categoria}</p>
                        <p class="yll">${registro.cuenta}</p>
                    </div>
                    <div>
                        <p class="fW yll">$${registro.dinero}</p>
                    </div>
                `;
                cuenta.transferir('1', '2', 3)
            }
            if (espacioRegistros) {
                espacioRegistros.appendChild(div)
            }
            
             
        });
        efectivo = 0;
        monedero = 0;
        ahorro = 0;
    }
    sincronizarStorage('registros', JSON.stringify(registros));
}
function limpiarHTML(lista) {
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
}

function sincronizarStorage(nombre, dato) {
    localStorage.setItem(nombre, dato);
}
// export { Cuenta, cuenta };