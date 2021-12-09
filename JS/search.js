// SEARCH SECTION

let input = document.getElementById('search-input');
let inputButton = document.getElementById('input-lupa');

function getSearch (query) {
    let container = document.getElementById('search-results');
    document.getElementById('search-tittle').innerHTML = query;
    container.innerHTML = ''
    request(urlSearch+'&q='+query).then((response) => {
        console.log(response)
        response.data.forEach((element, index) => {
            if (index < 12) {
                createCard(element, container, 'search-result');
            }
        })
    })
}
        // SEARCH BUTTON EVENTS 
input.addEventListener('keyup', (event) => {
     if (event.keyCode===13) {
         getSearch(input.value)
         inputButton.src = "/ICONS/close.svg";
         inputButton.classList.remove('lupa')
         suggestingBox.innerHTML = '';
     } else if  (event.keyCode===27) {
         inputButton.src = "/ICONS/icon-search.svg";
         let container = document.getElementById('search-results');
         container.innerHTML = '';
         document.getElementById('search-tittle').innerHTML = '';
     }
})
inputButton.addEventListener('click', (event) => {
     if (inputButton.classList.contains('lupa')){
         getSearch(input.value)
         inputButton.src = "/ICONS/close.svg";
         inputButton.classList.remove('lupa');
         suggestingBox.style.display = 'none';
     } else {
         inputButton.src = '/ICONS/icon-search.svg';
         input.value = '';
         inputButton.classList.add('lupa');
         document.getElementById('search-results').innerHTML = '';
         document.getElementById('search-tittle').innerHTML = '';
         suggestingBox.style.display = 'none';
     }
})

    // SEARCH SUGGESTIONS

const baseUrl = 'https://api.giphy.com/v1/tags/related/';
let suggestingBox = document.getElementById('search-suggestions');

/**
 * @description will get from the api a search recommendation that will be shown in the dom through a list item
 */
function getSuggestedSearch () {
    input.addEventListener('keyup', (event) =>{
        if((event.keyCode > 63 && event.keyCode < 91) || event.keyCode === 8){
            inputButton.src = '/ICONS/icon-search.svg';
    
            let query = event.target.value;
            let endpoint = `${baseUrl}${query}?api_key=${apiKey}`;

            if(query.length > 0) {
                try {
                    suggestingBox.innerHTML = '';
                    fetch(endpoint)
                    .then((response) => response.json())
                    .then((data) =>{
                        const dataArray = data.data;

                        createList(dataArray);
                        cleanList();
                    })
                } catch (error){
                    console.log(error);
                }
            } else {
                cleanList();
                return;
            }
        }
    })
}
getSuggestedSearch();

/**
 * 
 * @param {object} array array containing search suggestions
 * @description create a list item for each search recommendation
 */
function createList(array){
    array.forEach((gif, index) => {
        if (index < 3) {
            const listItem = document.createElement('li');
            listItem.innerHTML = gif.name;
            suggestingBox.style.display = 'block';
            suggestingBox.appendChild(listItem);
        }
    })
}

/**
 * 
 * @returns removes content from containers related to search suggestions
 */
function cleanList() {
    if (input.value.length === 0) {
        suggestingBox.innerHTML = '';
        suggestingBox.style.display = 'none';
        return;
    }
}