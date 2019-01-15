import { elements } from './base';

export const readValue = () => elements.searchFeild.value;

export const clearSearchBar = () => {
    elements.searchFeild.value = '';
};

export const clearPreviousResult = () => {
    elements.resultList.innerHTML = '';
    elements.resultsPage.innerHTML = '';
}

const limitTitleLength = (title) => {
    if(title.length > 17) {
        const reducedTitle = [];
        title.split(' ').reduce((counter, current) => {
            if(counter + current.length < 17) {
                reducedTitle.push(current);
            }
            return counter += current.length;
            }, 0);
            return `${reducedTitle.join(' ')}...`;
        }
    return title;
}

const dispalyRecepieDetails = recipe => {
    const recepieUiEntry = `
            <li>
            <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitTitleLength(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>  
    `;
    elements.resultList.insertAdjacentHTML('beforeend', recepieUiEntry);
}

const buttonHTML = (page, type) => 
    `
        <button class="btn-inline results__btn--${type}" data-goto = ${ type === 'prev' ? page  - 1 : page + 1 }>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${ type === 'prev' ? 'left' : 'right' }"></use>
            </svg>
            <span>Page ${ type === 'prev' ? page  - 1 : page + 1 }</span>
        </button>
    `;

const navigationButtons = (page, resultsPerPage, totalResults) => {
    const pagesRequired = Math.ceil(totalResults/resultsPerPage);
    let button;
    if(page === 1 && pagesRequired > 1) {
        button = buttonHTML(page, 'next');
    } else if(page < pagesRequired) {
        button = `${buttonHTML(page, 'prev')}
        ${buttonHTML(page, 'next')}
        `;
    } else if(page === pagesRequired && pagesRequired > 1) {
        button = buttonHTML(page, 'prev');
    }
    elements.resultsPage.insertAdjacentHTML('afterbegin', button); 
}

export const displayResults = (recipes, page = 1, resultsPerPage = 10) => {
    const startIndex = (page - 1) * resultsPerPage;
    const lastIndex = (page * resultsPerPage) - 1; 
    recipes.slice(startIndex, lastIndex).forEach(dispalyRecepieDetails);
    navigationButtons(page, resultsPerPage, recipes.length);
};