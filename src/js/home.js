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
    const dramaList= await getData('https://yts.am/api/v2/list_movies.json?genre=drama');
    const animationList= await getData('https://yts.am/api/v2/list_movies.json?genre=animation')

    function videoItemTemplate(movie){
        return (
            `<div class="primaryPlaylistItem">
                <div class="primaryPlaylistItem-image">
                    <img src="${movie.medium_cover_image}">
                </div>
                <h4 class="primaryPlaylistItem-title">
                    ${movie.title}
                </h4>
            </div>`
        )
    }
    //console.log(videoItemTemplate('src/images/covers/bitcoin.jpg','bitcoin'));

    const $actionContainer = document.querySelector('#action');

    actionList.data.movies.forEach((movie)=>{
        //debugger
        const HTMLString=videoItemTemplate(movie);
        //const html= document.implementation.createHTMLDocument();
        const html= document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        //debugger
        $actionContainer.append(html.body.children[0]);
        //console.log(HTMLString);
    } )
    /*let terrorList;
    getData('https://yts.am/api/v2/list_movies.json?genre=terror')
        .then(function(data){
            console.log('terrorList',data);
            terrorList=data;
        })*/
    console.log (actionList, dramaList, animationList);
    console.log('actionList', actionList);

    //const $home = $('.home .list #item');
    //const $home = $('.home');
    //const $home = document.getElementById('modal');
    //const $home = document.getElementsByClassName('modal');
    //const $home = document.getElementsByTagName('modal');
    const $dramaContainer = document.querySelector('#drama');
    //proff for drama list
    dramaList.data.movies.forEach((movie)=>{
        //debugger
        const HTMLString=videoItemTemplate(movie);
        //const html= document.implementation.createHTMLDocument();
        const html= document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        //debugger
        $dramaContainer.append(html.body.children[0]);
        //console.log(HTMLString);
    } )
    const $animationContainer = document.querySelector('#animation');

    //proff for animation list
    animationList.data.movies.forEach((movie)=>{
        //debugger
        const HTMLString=videoItemTemplate(movie);
        //const html= document.implementation.createHTMLDocument();
        const html= document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        //debugger
        $animationContainer.append(html.body.children[0]);
        //console.log(HTMLString);
    } )
    const $featuringContainer = document.querySelector('#featuring');
    const $form = document.querySelector('#form');
    const $home = document.querySelector('#home');

    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');

    const $modalTitle = $modal.querySelector('h1');
    const $modalImage = $modal.querySelector('img');
    const $modalDescription = $modal.querySelector('p');




})()