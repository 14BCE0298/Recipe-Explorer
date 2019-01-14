import { elements } from './base';

export const readValue = () => elements.searchFeild.value;

export const clearSearchBar = () => {
    elements.searchFeild.value = '';
};

export const clearPreviousResult = () => {
    elements.resultList.innerHTML = '';
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

export const displayResults = recipes => {
recipes.forEach(dispalyRecepieDetails);
};