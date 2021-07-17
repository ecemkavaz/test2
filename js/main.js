
// adds previous data to the page if it has been visited
const getPageData = function(){
    let getPage =  localStorage.getItem(thisPage);
    let pageData = JSON.parse(getPage);
    for(let[key, value] of Object.entries(pageData))
    {let node = document.querySelector(`[name ~= ${key}]`);
    node.value = value;
    }
}

const changePage = function (direction) {
    // set the currentPage as having been visited
    let getVisited = localStorage.getItem('visited');
    let isVisited = [];
    if (getVisited !== null) isVisited = JSON.parse(getVisited)
    isVisited.push(thisPage);
    localStorage.setItem('visited', JSON.stringify(isVisited));

    // create page data object
    let pageData = {};

    // get all inputs and set page data object to input values
    let inputs = document.querySelectorAll('input');
    for(let i of inputs){pageData[i.name] = i.value}

    // put pageData into local storage
    localStorage.setItem(thisPage, JSON.stringify(pageData));

    // check to see what our position/ route is
    let position = localStorage.getItem('pos');
    let getPages = localStorage.getItem('pageArray');
    let formPages = JSON.parse(getPages);

    // navigate to next page and change our position
    direction === 'forward' ? localStorage.setItem('pos', (parseInt(position) +1)) : localStorage.setItem('pos', (parseInt(position) -1));
    let pos = localStorage.getItem('pos');
     window.location.href = `file:///Users/Ecem/Documents/EvaluationWebsite/index.html`;

  // window.location.href = `http://127.0.0.1:5500/${formPages[pos]}`;

}

const submitForm = function(){
    // create page data object
    let pageData = {};

    // get all inputs and set page data object to input values
    let inputs = document.querySelectorAll('input');
    for(let i of inputs){pageData[i.name] = i.value}

    // put pageData into local storage
    localStorage.setItem(thisPage, JSON.stringify(pageData));


    // create a form data obj
    var formData = new FormData();

    // get the pages in order
    let getPages = localStorage.getItem('pageArray');
    let formPages = JSON.parse(getPages);

    // loop through every page and get page objects
    for(let i of formPages){
        var getPage = localStorage.getItem(i);
        var p = JSON.parse(getPage);

        // loop through every key value and insert into myForms
        for(let[key, value] of Object.entries(p))
        { formData.set(key, value)}


    }


for (var pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); }

    // clear the local storage
    localStorage.clear();

    // post the form data
    let form = document.querySelector('form');
    fetch(form.action, {method:'post', body: formData});

    // navigate away from the form
    window.location.href = '';
}


const forwardButton = () => {changePage('forward')}
const backButton = () => {changePage('back')}

//document.addEventListener('DOMContentLoaded', firstPageLoad);
