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

    function createTemplate(HTMLString){
        const html= document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        return html.body.children[0];
    }


    function renderMovieList(list, $container){
        //actionList.data.movies

        $container.children[0].remove();
        list.forEach((movie)=>{

        const HTMLString = videoItemTemplate(movie);
        const movieElement= createTemplate(HTMLString);
        //$actionContainer
        $container.append(movieElement);
    } )
    }


    /*let terrorList;
    getData('https://yts.am/api/v2/list_movies.json?genre=terror')
        .then(function(data){
            console.log('terrorList',data);
            terrorList=data;
        })*/
    //console.log (actionList, dramaList, animationList);
    //console.log('actionList', actionList);

    //const $home = $('.home .list #item');
    //const $home = $('.home');
    //const $home = document.getElementById('modal');
    //const $home = document.getElementsByClassName('modal');
    //const $home = document.getElementsByTagName('modal');

    const $actionContainer = document.querySelector('#action');

    renderMovieList(actionList.data.movies, $actionContainer);

    const $dramaContainer = document.querySelector('#drama');

    renderMovieList(dramaList.data.movies, $dramaContainer);

    const $animationContainer = document.querySelector('#animation');

    renderMovieList(animationList.data.movies, $animationContainer);

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