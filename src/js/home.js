console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUserAll= new Promise(function(todoBien, todoMal){
    //setInterval
    //setTimeout
    setTimeout(function(){
        //luego de 3 segundos
        //todoBien();
        todoBien("se acabo el tiempo");
    }, 5000);
    //todoBien();
})

const getUser= new Promise(function(todoBien, todoMal){
    //setInterval
    //setTimeout
    setTimeout(function(){
        //luego de 3 segundos
        //todoBien();
        todoBien("se acabo el tiempo 3");
    }, 3000);
    //todoBien();
})

/*getUser
    .then(function(){
        console.log("todo esta bien en la vida");
    })
    .catch(function(message){
        console.log(message);
    })*/

Promise.all([
    getUser, getUserAll
])
.then(function(message){
    console.log(message);
})
.catch(function(message){
    console.log(message);
})

Promise.race([
    getUser, getUserAll
])
.then(function(message){
    console.log(message);
})
.catch(function(message){
    console.log(message);
})