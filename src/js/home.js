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
    });

(async function load(){
    //await
    //action
    //terror
    //animation
    async function getData(url){
        const response = await fetch(url);
        const data= await response.json();
        return data;
    }
    const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action');
    const terrorList= await getData('https://yts.am/api/v2/list_movies.json?genre=terror');
    const animationList= await getData('https://yts.am/api/v2/list_movies.json?genre=animation')
    /*let terrorList;
    getData('https://yts.am/api/v2/list_movies.json?genre=terror')
        .then(function(data){
            console.log('terrorList',data);
            terrorList=data;
        })*/
    console.log (actionList, terrorList, animationList);
    console.log('actionList', actionList);
})()