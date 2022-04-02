const listaTweets = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario');
const formularioNota = document.querySelector('#addNota');
let tweets = [];
let notasGlobal = [];
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
]

// Event Listeners
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
          console.log(tweets);
          console.log(notasGlobal);
          crearHTML();
          crearHTML2();
     });
}

// Añadir tweet del formulario
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
     tweets = [...tweets, tweetObj];
     
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

     sincronizarStorage('tweet', JSON.stringify(tweets));
}

// Elimina el Tweet del DOM
function borrarTweet(e) {
     e.preventDefault();

     // console.log(e.target.parentElement.dataset.tweetId);
     const id = e.target.parentElement.dataset.tweetId;
     tweets = tweets.filter( tweet => tweet.id != id  );
     crearHTML();
}

// Agrega tweet a local storage
function sincronizarStorage(nombre, dato) {
     localStorage.setItem(nombre, dato);
}

// Elimina los cursos del carrito en el DOM
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
