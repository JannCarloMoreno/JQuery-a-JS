console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

/*const getUserAll= new Promise(function(todoBien, todoMal){
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
    })

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
})*/

/*$.ajax('https://randomuser.me/api/', {
    method: 'GET',
    success: function(data){
        console.log(data);
    },
    error: function(error){
        console.log(error);
    }
})*/

fetch('https://randomuser.me/api/')
    .then(function(response){
        //console.log(response);
        return response.json();
    })
    .then(function(user){
        console.log('user', user.results[0].name.first);
    })
    .catch(function(){
        console.log('algo fallo');
    })