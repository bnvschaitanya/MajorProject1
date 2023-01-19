let searchInputEl = document
                    .getElementById("searchInput");
let searchResultsEl = document
                    .getElementById("searchResults");
let spinnerEl = document
                    .getElementById("spinner");

function displayResults(eachArray) {
    let {
        title,
        link,
        description
    } = eachArray;
    
    let resultItemEl = document
                        .createElement("div");
    resultItemEl
        .classList
        .add("result-item");

    let titleEl = document
                    .createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItemEl);
}

function resultArray(search_results) {
    for (let eachArray of search_results) {
        displayResults(eachArray);
    }
}

function searchResults(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.remove("d-none");
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                spinnerEl.classList.add("d-none");
                resultArray(search_results);
            });
    }
}


searchInputEl.addEventListener("keydown", searchResults);