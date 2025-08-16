//OPCION 1:
/*
let titulo = document.querySelector('h1');
titulo.innerHTML = 'Juego del número secreto';

let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un número del 1 al 10';
*/

//OPCION 2: MENOS LINEAS DE CODIGO
/*
function asignarTextoElemento() {
    let titulo = document.querySelector('h1');
    titulo.innerHTML = 'Juego del número secreto'; 
}
*/

//variable de alcance GLOBAL OPCION 1
/*
let numeroSecreto = generarNumeroSecreto();
let intentos = 1;
*/

//variable de alcance GLOBAL OPCION 2
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = []; //almacena cada uno de los números random para no volver a usarlos
let numeroMaximo = 10;

//OPCION 3: FUNCIÓN GENÉRICA
//para que una funcion sea generica, usamos el concepto de parametro
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return; //buena prácitca
}

///////////
//OPCION 1:
/*
function verificarIntento() {
    alert('Click desde el botón');
    return;
}
*/

//OPCION 2:
/*
function verificarIntento() {
    //let numeroDeUsuario = document.querySelector('input');
    //el 'input' está en el HTML como etiqueta
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    console.log(typeof(numeroDeUsuario));
    //reemplazo el 'input' por 'valorUsuario' del 'id' en HTML
    console.log(numeroSecreto);
    console.log(typeof(numeroSecreto));
    console.log(numeroDeUsuario); //solo para verlo 
    console.log(numeroSecreto === numeroDeUsuario);
    //=== tiene q ser igual en type y en valor
    return;
}
*/

//OPCION 3:
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    console.log(numeroSecreto);
    console.log(intentos);
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        //Para generar un nuevo número aleatorio
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

///////////////////////////////////////
//OPCION 1:
/*
function limpiarCaja(){
   let valorCaja = document.querySelector('#valorUsuario'); //lo quiero por ID de mi 'input'
   valorCaja.value = '';
}
*/


//OPCION 2:
function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}



/////////////////////////////////////
//OPCION VARIABLE LOCAL
/*
function generarNumeroSecreto() {
    //variable de alcance local
    let numeroSecreto = Math.floor(Math.random() * 10) + 1;
    return numeroSecreto; //return del número q me interesa
}
*/

//OPCION VARIABLE GLOBAL: OPCION 1 - acá la posicion del return cambia
/*
function generarNumeroSecreto(){
    return Math.floor(Math.random() * 10) + 1;
}
*/

//OPCION VARIABLE GLOBAL: OPCION 2 - recursividad, la función se llama a si misma
//OTRA FORMA de colocar una condicion de salida es limitando el númeor de intentos
function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo) + 1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo){
        //aviso importante
        asignarTextoElemento('p', 'Ya se sorteron todos los números posibles.');
    } else {
        //si el numero generado está incluido en la lista, uso '.includes'
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto(); //se llama a si misma p/generar otro numero aleatorio
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }    
    }
}


function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}


function reiniciarJuego(){
    //limpiar la caja
    limpiarCaja();
    //indicar mensaje de intervalo de números
    //generar el número aleatorio
    //inicializar el número de intentos
    condicionesIniciales();
    //Deshabilitar el botón de Nuevo Juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();