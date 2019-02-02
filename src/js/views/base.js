export const elements = {
searchStart: document.querySelector('.search'),
searchFeild: document.querySelector('.search__field'),
resultList: document.querySelector('.results__list'),
searchResult: document.querySelector('.results'),
resultsPage: document.querySelector('.results__pages'),
recipeDisplay: document.querySelector('.recipe'),
listEntries: document.querySelector('.shopping__list')
};

const loaderElement = {
    loader: 'loader'
}

export const loaderIcon = parent => {
    const loaderHtml = `
        <div class = '${loaderElement.loader}'>
            <svg>
                <use href='img/icons.svg#icon-cw'></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loaderHtml);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${loaderElement.loader}`);
    if(loader) {
        loader.parentElement.removeChild(loader);
    }
};