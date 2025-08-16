let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = []; //almacena cada uno de los números random para no volver a usarlos
let numeroMaximo = 10;



function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return; //buena prácitca
}



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



function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}



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
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();