// import { Cuenta, cuenta } from "./cuentas.js";

const listaTweets = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario');
const formularioNota = document.querySelector('#addNota');

const totalDinero = document.querySelector('#totalDinero');
const ultimoRegistro = document.querySelector('#ultimoRegistro');

const espacioEfectivo = document.querySelector('#efectivo');
const espacioMonedero = document.querySelector('#monedero');
const espacioAhorro = document.querySelector('#ahorro');

let tweets = [];
let notasGlobal = [];
let registros = [];
let espacios = [
     'tareaaulaMatematica', 'integradoraMatematica', 'pruebaobjMatematica', 'pruebaPerMatematica',
     'tareaaulaSociales', 'integradoraSociales', 'pruebaobjSociales', 'pruebaPerSociales',
     'tareaaulaLenguaje', 'integradoraLenguaje', 'pruebaobjLenguaje', 'pruebaPerLenguaje',
     'tareaaulaFisica', 'integradoraFisica', 'pruebaobjFisica', 'pruebaPerFisica',
     'tareaaulaBiologia', 'integradoraBiologia', 'pruebaobjBiologia', 'pruebaPerBiologia',
     'tareaaulaOpv', 'integradoraOpv', 'pruebaobjOpv', 'pruebaPerOpv',
     'tareaaulaMucy', 'integradoraMucy', 'pruebaobjMucy', 'pruebaPerMucy',
     'tareaaulaReligion', 'integradoraReligion', 'pruebaobjReligion', 'pruebaPerReligion',
     'tareaaulaIngles', 'integradoraIngles', 'pruebaobjIngles', 'pruebaPerIngles'
];
let efectivo = 0;
let monedero = 0;
let ahorro = 0;


eventListeners();

function eventListeners() {
     //Cuando se envia el formulario
     formulario.addEventListener('submit', agregarTweet);

     formularioNota.addEventListener('submit', agregarNota);

     // Borrar Tweets
     listaTweets.addEventListener('click', borrarTweet);

     // Contenido cargado
     document.addEventListener('DOMContentLoaded', () => {
          tweets = JSON.parse( localStorage.getItem('tweets') ) || []  ;
          notasGlobal = JSON.parse( localStorage.getItem('notas') ) || []  ;
          registros = JSON.parse( localStorage.getItem('registros') ) || []  ;
          console.log(tweets);
          console.log(notasGlobal);
          console.log(registros);
          crearHTML();
          crearHTML2();
          crearHTML3();
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
               //   console.log(efectivo)
                 break;
 
             case 'Monedero':
                 // console.log('Desde ingreso monedero')
                 monedero = monedero + Number(dinero);
               //   console.log(monedero)
                 break;
             case 'Ahorros':
                 // console.log('Desde ingreso ahorro');
                 ahorro = ahorro + Number(dinero);
               //   console.log(ahorro)
                 
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
               // console.log(efectivo)
               break;

          case 'Monedero':
               // console.log('Desde ingreso monedero')
               monedero = monedero - Number(dinero);
               // console.log(monedero)
               break;
          case 'Ahorros':
               // console.log('Desde ingreso ahorro');
               ahorro = ahorro - Number(dinero);
               // console.log(ahorro)
               break;
     
          default:
               alert('Algo pasa con el estupido codigo');
               
               break;
          }
     }
     transferir(cuentaEmisora, cuentaReceptora, dinero){
          //alert('Por el momento no se ha configurado la transferencia de cuentas')
     }
}
const cuenta = new Cuenta;
class UI{
     mostrarTotal(){
         let total = efectivo + monedero + ahorro;
         
         totalDinero.textContent = `$${total}`;
         espacioEfectivo.textContent = `$${efectivo}`;
         espacioMonedero.textContent = `$${monedero}`;
         espacioAhorro.textContent = `$${ahorro}`;

         const totalDineroC = document.querySelector('#totalDineroC');
          if (total <= 0 ) {
               totalDineroC.classList.add('malo');
               totalDineroC.classList.remove('bueno');
               totalDineroC.classList.remove('medio');     
          } else if(total > 0 && total <= 25){
               totalDineroC.classList.add('medio')
               totalDineroC.classList.remove('bueno')
               totalDineroC.classList.remove('malo')
          } else{
               totalDineroC.classList.add('bueno');
               totalDineroC.classList.remove('malo');
               totalDineroC.classList.remove('medio');
          }
         
     }
     mostrarUltimoRegistro(){
          if(registros != 0){
               let ultimo = registros[0];  
               console.log(`ejecutando el primer registro ${ultimo}`)
               let last = Number(ultimo.dinero);
               const ultimoRegistroC = document.querySelector('#ultimoRegistroC');
               
               if(Number(ultimo.tipo) == 2){
                    last = last*-1;
               }
               if (last <= 0 ) {
                    ultimoRegistroC.classList.add('malo');
                    ultimoRegistroC.classList.remove('bueno');
                    ultimoRegistroC.classList.remove('medio');     
               } else if(last > 0 && last <= 10){
                    ultimoRegistroC.classList.add('medio')
                    ultimoRegistroC.classList.remove('bueno')
                    ultimoRegistroC.classList.remove('malo')
               } else if(last >= 11){
                    ultimoRegistroC.classList.add('bueno');
                    ultimoRegistroC.classList.remove('malo');
                    ultimoRegistroC.classList.remove('medio');
               }
               ultimoRegistro.textContent = `$${last}`;
          }
          
     }
}
const ui = new UI();


function agregarTweet(e) {
     e.preventDefault();
     // leer el valor del textarea
     const tweet = document.querySelector('#tweet').value;
     
     // validación
     if(tweet === '') {
          mostrarError('Un mensaje no puede ir vacio');
          return;
     }

     // Crear un objeto Tweet
     const tweetObj = {
          id: Date.now(),
          texto: tweet
     }

     // Añadirlo a mis tweets
     tweets = [tweetObj, ...tweets];
     
     // Una vez agregado, mandamos renderizar nuestro HTML
     crearHTML();

     // Reiniciar el formulario
     formulario.reset();
}

function mostrarError(error) {
     const mensajeEerror = document.createElement('p');
     mensajeEerror.textContent = error;
     mensajeEerror.classList.add('error');

     const contenido = document.querySelector('#contenido');
     contenido.appendChild(mensajeEerror);

     setTimeout(() => {
          mensajeEerror.remove();
     }, 3000);
}

function crearHTML() {
     limpiarHTML(listaTweets);

     if(tweets.length > 0 ) {
          tweets.forEach( tweet =>  {
               // crear boton de eliminar
               const botonBorrar = document.createElement('a');
               botonBorrar.classList = 'borrar-tweet';
               
               botonBorrar.innerHTML = '&times'
     
               // Crear elemento y añadirle el contenido a la lista
               const li = document.createElement('li');

               // Añade el texto
               li.innerText = tweet.texto;

               // añade el botón de borrar al tweet
               li.appendChild(botonBorrar);
               li.classList = 'cssTweet';
               // añade un atributo único...
               li.dataset.tweetId = tweet.id;

               // añade el tweet a la lista
               listaTweets.appendChild(li);
          });
     }

     sincronizarStorage('tweets', JSON.stringify(tweets));
}

function borrarTweet(e) {
     e.preventDefault();

     // console.log(e.target.parentElement.dataset.tweetId);
     const id = e.target.parentElement.dataset.tweetId;
     tweets = tweets.filter( tweet => tweet.id != id  );
     crearHTML();
}

function sincronizarStorage(nombre, dato) {
     localStorage.setItem(nombre, dato);
}

function limpiarHTML(lista) {
     while(lista.firstChild) {
          lista.removeChild(lista.firstChild);
     }
}
function agregarNota(e){
     e.preventDefault();
     materia = document.querySelector('#materia').value;
     tipo = document.querySelector('#tipo').value;
     nota = document.querySelector('#notaForm').value;
     donde = tipo + materia;
     
     if(materia === ' ' || tipo === ' ' || nota === ' '){
          alert('No puede ir vacio, pendejo');
          return;
     }
     else if(isNaN(nota)){
          alert('debe contener un numero, pendejo, ahi dice nota');
          return;
     }
     
     notax = {
          id: Date.now(),
          donde,
          nota
     }

     notasGlobal = [...notasGlobal, notax]
     console.log(notasGlobal);

     crearHTML2()

     formularioNota.reset();
     

}
function crearHTML2(){
     limpiarHTML2();
     if(notasGlobal.length > 0 ) {
          notasGlobal.forEach( not =>  {
               // crear boton de eliminar
               
               // Crear elemento y añadirle el contenido a la lista
               const p = document.createElement('p');

               // Añade el texto
               p.textContent = not.nota
               p.classList.add('azul')

               // añade el botón de borrar al tweet
               // p.appendChild(botonBorrar);
               
               // añade un atributo único...
               p.dataset.notaId = not.id;
               
               // añade el tweet a la lista
               espacios.forEach(espacio => {
                    
                    if(espacio === not.donde){
                         let agregara = document.querySelector(`.${espacio}`);
                         if(agregara.firstChild){
                              alert('Esta tarea ya tiene asignada una nota');
                              return;
                         }
                         agregara.appendChild(p);
                    }

               });

          });
     }
     sincronizarStorage('notas', JSON.stringify(notasGlobal));

}
function limpiarHTML2(){

     espacios.forEach(espacio => {
          
          const espacioselect = document.querySelector(`.${espacio}`);
          limpiarHTML(espacioselect);
     });

}
function crearHTML3(){
     registros.forEach(registro => {
          if(registro.tipo == 1){
               //ingreso
               cuenta.ingreso(registro.cuenta, registro.dinero)

          }
          else if(registro.tipo == 2){
               //gasto
               cuenta.gasto(registro.cuenta, registro.dinero)
          }
          else if(registro.tipo == 3){
               //transf
               cuenta.transferir('1', '2', 3)
          }
          
     });
     ui.mostrarTotal();
     ui.mostrarUltimoRegistro();
     
}
