
fetch('https://randomuser.me/api/')
    .then(function(response){
        return response.json();
    })
    .then(function(user){
        console.log('user', user.results[0].name.first);
    })
    .catch(function(){
        console.log('algo fallo');
    });

(async function load(){


    //reto

    const FRIEND_API= 'https://randomuser.me/api/?inc=name,picture&results=10&noinfo';
     async function getFriend(url){
         const response= await fetch(url)
         const user = await response.json();
         return user;
     }
     //const proff = await getFriend(`${FRIEND_API}`);
     //debugger
     function friendTemplate(person){
        return(`<li class="playlistFriends-item">
        <a href="#">
          <img src="${person.picture.thumbnail}" alt="echame la culpa" />
          <span>
            ${person.name.first} ${person.name.last}
          </span>
        </a>
      </li>`)
     }

     function renderFriendList(list, $container){
        list.forEach((person)=>{
            const HTMLString = friendTemplate(person);
            const friendElement= createTemplate(HTMLString);
            $container.append(friendElement);
            const image = friendElement.querySelector('img');
            image.addEventListener('load', (event)=> {
                event.srcElement.classList.add('fadeIn');
            })
        })
    }

    const friendList= await getFriend(`${FRIEND_API}`);
    const $friendsContainer = document.querySelector('.playlistFriends');
    renderFriendList(friendList.results, $friendsContainer);

    //fin reto
    async function getData(url){
            const response = await fetch(url);
            const data= await response.json();
            if(data.data.movie_count > 0){
                return data;
        }
        throw new Error('No se encotro ningun resultado');

    }

    const $form = document.querySelector('form');
    const $home = document.getElementById('home');

    const $featuringContainer = document.getElementById('featuring');
    function setAttributes($element, setAttributes){
        for(const attr in setAttributes){
            $element.setAttribute(attr, setAttributes[attr]);
        }
    }

    const BASE_API = 'https://yts.am/api/v2/';

    function featuringTemplate(peli){
        return(
            `
        <div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
        `
        )
    }

    $form.addEventListener('submit', async (event) => {
        event.preventDefault();
        $home.classList.add('search-active');
        const $loader =  document.createElement('img');
        setAttributes($loader, {
            src: 'src/images/loader.gif',
            height: '50px',
            width: '50px'
        })
        $featuringContainer.append($loader);

        const data= new FormData($form);
        try{
            const {
                data: {
                    movies: pelis
                }
            }= await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
            const HTMLString= featuringTemplate(pelis[0]);
            $featuringContainer.innerHTML=HTMLString;
        }catch(error){
            alert(error.message);
            $loader.remove();
            $home.classList.remove('search-active');
        }

    })

    function videoItemTemplate(movie, category){
        return (
            `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
                <div class="primaryPlaylistItem-image">
                    <img src="${movie.medium_cover_image}">
                </div>
                <h4 class="primaryPlaylistItem-title">
                    ${movie.title}
                </h4>
            </div>`
        )
    }

    function createTemplate(HTMLString){
        const html= document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        return html.body.children[0];
    }

    function addEventClick($element){
        $element.addEventListener('click', ()=> {
            showModal($element)
        })
    }
    function renderMovieList(list, $container, category){

        $container.children[0].remove();
        list.forEach((movie)=>{

        const HTMLString = videoItemTemplate(movie, category );
        const movieElement= createTemplate(HTMLString);
        $container.append(movieElement);
        const image = movieElement.querySelector('img');
        image.addEventListener('load', (event)=> {

            event.srcElement.classList.add('fadeIn');
        })

        addEventClick(movieElement);
    } )
    }
    const {data:{movies: actionList}}= await getData(`${BASE_API}list_movies.json?genre=action`);
    window.localStorage.setItem('actionList', JSON.stringify(actionList));
    const $actionContainer = document.querySelector('#action');
    renderMovieList(actionList, $actionContainer, 'action');

    const {data:{movies: dramaList}}= await getData(`${BASE_API}list_movies.json?genre=drama`);
    window.localStorage.setItem('dramaList', JSON.stringify(dramaList));
    const $dramaContainer = document.querySelector('#drama');
    renderMovieList(dramaList, $dramaContainer, 'drama');

    const {data:{movies: animationList}}= await getData(`${BASE_API}list_movies.json?genre=animation`)
    window.localStorage.setItem('animationList', JSON.stringify(animationList));
    const $animationContainer = document.querySelector('#animation');
    renderMovieList(animationList, $animationContainer, 'animation');

    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');

    const $modalTitle = $modal.querySelector('h1');
    const $modalImage = $modal.querySelector('img');
    const $modalDescription = $modal.querySelector('p');

    function findById(list, id){
        return list.find(movie => movie.id === parseInt(id,10));
    }
    function findMovie(id, category){

        switch(category){
            case 'action': {
                return findById(actionList, id)

            }
            case 'drama': {
                return findById(dramaList, id)

            }
            case 'animation': {
                return findById(animationList, id)

            }
        }
        actionList.find(movie => movie.id === parseInt(id,10)); //el 10 es la base del numero en este caso decimal
    }
    function showModal($element){

        $overlay.classList.add('active');
        $modal.style.animation= 'modalIn .8s forwards';
        const id= parseInt($element.dataset.id);
        const category= $element.dataset.category;
        const data= findMovie(id,category);
        //element.getAttribute('data-id') la otra forma de hacerlo.
        $modalTitle.textContent= data.title;
        $modalImage.setAttribute('src', data.medium_cover_image);
        $modalDescription.textContent= data.description_full
    }
    function hideModal(){
        $overlay.classList.remove('active');
        $modal.style.animation= 'modal .8s forwards';
    }
    $hideModal.addEventListener('click', hideModal);
})()