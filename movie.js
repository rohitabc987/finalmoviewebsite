// Function to clear search and return to the home page
function clearsearch() {
    let search_element =document.getElementById("search");  
    search_element.style.value="";
    refreshPage();
}

// Function to refresh the page
function refreshPage() {
    location.reload();
}



// for changing image in slide-show
let slideIndex = 0;
showSlides();

// function of automatic slider
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 2500); 
}

// const movieContainers = document.querySelectorAll('.pictures');

// expand search bar when clicked
function search_size(movie2) {   
    // original_movies();
    if (window.innerWidth < 400) {
        // movie2.style.width="160px"
        return;
    }
    else{
        movie2.style.width="30vw";
    }
}

// make seach to its inital value, when not clicked
const searchInput = document.getElementById('search');
searchInput.addEventListener('blur', function () {
    if (window.innerWidth < 500) {
        searchInput.style.width="30vw"
        return;
    } else {
        searchInput.style.width = '200px'; // Set width to 200px for desktop devices
    }
});



// for showing list of movies based on diffrent catogory
document.addEventListener('DOMContentLoaded', function(){
        const movies_list =document.querySelectorAll('.pictures');
        movies_list.forEach(movie => {

            // 2022 movies
            if(movie.classList.contains('2023')){
                document.getElementById("newrelaseMovies").appendChild(movie);
            }

            // South Indian Movies
            else if(movie.classList.contains('southindian')){
                document.getElementById("southindianMovies").appendChild(movie);
            }

            // Hindi Movies
            else if(movie.classList.contains('hindiMovies')){
                document.getElementById("hindiMovies").appendChild(movie);
            }

            // ActionthrillerMovies
            else if(movie.classList.contains('actionthrillerMovies')){
                document.getElementById("actionthrillerMovies").appendChild(movie);
            }

            // Suspensfull Movies
            else if(movie.classList.contains('suspensefullMovies')){
                document.getElementById("suspensefullMovies").appendChild(movie);
            }

            // Comedy Movies
            else if(movie.classList.contains('comedyMovies')){
                document.getElementById("comedyMovies").appendChild(movie);
            }

            // Horror Movies
            else if(movie.classList.contains('horrorMovies')){
                document.getElementById("horrorMovies").appendChild(movie);
            }
            else{
                document.getElementById("otherMovies").appendChild(movie);
            }
        })
    }
)



// search movies when search icon is pressed
document.querySelector('form').onsubmit = function (event) {    
    event.preventDefault();
    searchMovies();
};
 
// to searched mivies 
function searchMovies() {

    //  for image slider
    let image_slider = document.getElementById('show'); // Don't display image slider
    image_slider.style.display = 'none';



    //  for catogories name 
    let list_name = document.querySelectorAll('.listname')
    list_name.forEach(movie=>
        movie.style.display='none');  // dont display movie catogories name


        
    // now show the movies in row
    let movies_list =document.getElementById('listofmovies');
    movies_list.style.flexDirection="row";
    movies_list.style.flexWrap="wrap";
    movies_list.style.gap="20px";


    //  for searched movie name 
    const input = document.getElementById('search').value.toLowerCase().trim();
    const movieContainers = document.querySelectorAll('.pictures');
    
    let result = false;
    let displayedMovies = []; // for storing displayed movie names
 
    movieContainers.forEach((container) => {
        const movieName = container.querySelector('.text a').textContent.toLowerCase().trim();

        if (movieName.includes(input)) {
            if (!displayedMovies.includes(movieName)) {  
                // change container style of showing image
                    
                    container.style.display = 'block';
                    displayedMovies.push(movieName);
                    result = true;               
            } 
            else {
                container.style.display = 'none';
            }
        } 
        else {
            container.style.display = 'none';
        }
    });

    const messageElement = document.getElementById('searchMessage'); // message box
    
    if (!result) {
        messageElement.style.display = 'block';
        messageElement.textContent = 'Sorry, Movie not found. Here are some related movies:';
        refreshButton.style.display = 'block';
        // const moviesData = fuse_best_movie;
        // extractMovieData();
        // show_fuse_RelatedMovies(input,moviesData);
        showRelatedMovies(input); // to show related movies
    } 
    else {
        messageElement.style.display = 'none';
        messageElement.textContent = '';
        refreshButton.style.display = 'none';
    }


    
    //  if nothing is search 
    let serach_movie = document.getElementById("search");
    //if nothing is searched
    if(serach_movie.value ===""){
        let list_name = document.querySelectorAll('.listname')
        list_name.forEach(moviename=>
            moviename.style.display='block'); // display catogories name

        if(window.innerWidth > 500){
            image_slider.style.display='block'; // display image slider
            console.log("yes");
        }
        else{
            image_slider.style.display='none';
            console.log("no");
        }

        let movies_list =document.getElementById('listofmovies');
                 movies_list.style.justifyContent="space-between";                      
    }   

}



// function show_fuse_RelatedMovies(searchedMovie, moviesData) {
//     const fuseOptions = {
//         keys: ['title'],
//         threshold: 0.9,
//     };

//     const fuse = new Fuse(moviesData, fuseOptions);
//     const searchResults = fuse.search(searchedMovie);

//     if (searchResults.length > 0) {
//         console.log('Related movies:');
//         const top10Results = searchResults.slice(0, 2).map(result => result.item.title); // Retrieve top 10 results

        
//             console.log(top10Results);
//             console.log("yes");
            
        
//     } else {
//         console.log('No related movies found.');
//         // Handle case when no related movies are found
//     }
// }

const fuse_best_movie=[];
function extractMovieData() {
    const movieElements = document.querySelectorAll('.pictures');
    const movies = [];
   
    movieElements.forEach((element) => {
        const name = element.querySelector('.text a').textContent;
        const link = element.querySelector('.text a').href;
        const image = element.querySelector('.img').src;
        movies.push({ name, link, image });
        fuse_best_movie.push({ "title": name });
    });
    return movies;
}


// show some related movies related to searche movie
function showRelatedMovies(searchQuery) {
    clearRelatedMovies(); // Clear previous related movie list
    const movies = extractMovieData();

    const uniqueMovies = Array.from(new Set(movies.map(movie => movie.name.toLowerCase())))
        .filter(name => !name.includes(searchQuery.toLowerCase()));

    // Sort unique movies based on the most relevant character matches in descending order
    const sortedMovies = uniqueMovies.sort((a, b) => {
        const matchCountA = getMatchCount(a, searchQuery.toLowerCase());
        const matchCountB = getMatchCount(b, searchQuery.toLowerCase());
        return matchCountB - matchCountA;
    });

    let count_movies =0;

    sortedMovies.forEach(movieName => {

        count_movies+=1;
        if(count_movies>15)
            return;

        const movie = movies.find(movie => movie.name.toLowerCase() === movieName);
        const movieDiv = document.createElement('div');
        movieDiv.className = 'pictures';
    
        const img = document.createElement('img');
        img.className = 'img';
        img.src = movie.image;
        img.alt = movie.name;
    
        const playButton = document.createElement('a');
        playButton.className = 'bx bx-play-circle play-btn';
        playButton.href = movie.link; // Set the play button link
    
        const textDiv = document.createElement('aside');
        textDiv.className = 'text';
    
        const link = document.createElement('a');
        link.href = movie.link;
        link.textContent = movie.name;
        link.style.color = 'white'; // Set text color to white
    
        textDiv.appendChild(link);
        textDiv.appendChild(playButton);
        // textDiv.style.position='relative';
    
        movieDiv.appendChild(img);
        movieDiv.appendChild(textDiv);
    
        const mainContainer = document.querySelector('.show_related_movies');  //check
        // mainContainer.insertBefore(movieDiv, mainContainer.lastElementChild);
        mainContainer.appendChild(movieDiv);


        img.addEventListener('mouseenter', () => {
            link.style.color = 'red'; // Change text color to red on hover
        });

        img.addEventListener('mouseleave', () => {
            link.style.color = 'white'; // Change text color back to white when not hovered
        });
    
        // Position the play button after the image loads
        img.addEventListener('load', () => {
            const imgHeight = img.clientHeight;
            // const imgWidth = img.
    
            // Calculate play button position
            playButton.style.position ='absolute';
            playButton.style.top='40%';
            playButton.style.left='50%';

            playButton.style.transform = 'translate(-50%, -50%)';
            playButton.style.marginTop = `-${imgHeight / 2}px`; 
            // playButton.style.marginLeft = `-${imgWidth / 2}px`;
        });
    });
    
}    

// to clear displayed related movie
function clearRelatedMovies() {
    const relatedMoviesContainer = document.getElementById('relatedMovies');
    relatedMoviesContainer.innerHTML = '';
    console.log("deleted");
}

// Function to get the count of character matches between two strings
function getMatchCount(movieName, searchQuery) {
    let matchCount = 0;
    for (let i = 0; i < searchQuery.length; i++) {
        if (movieName.includes(searchQuery[i])) {
            matchCount++;
        }
    }
    return matchCount;
}

