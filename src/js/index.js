// Global app controller
import search from './models/Search';
import * as viewTools from './views/searchView';
import { elements, loaderIcon, clearLoader } from './views/base';
import recipeController from './models/Recipe';

/**Global state of the app
 * - Search object conatining query and result
 * - current recipe object
 * - shopping list object
 * - Liked receipes
 */
const state = {};
/**
 * Search Controller
 */
const userDishSearch = async () => {
    const userInput = viewTools.readValue();
    if(userInput) {
        state.dishReceipes = new search(userInput);
        viewTools.clearSearchBar();
        viewTools.clearPreviousResult();
        loaderIcon(elements.searchResult);
        await state.dishReceipes.getRecepies();
        clearLoader();
        viewTools.displayResults(state.dishReceipes.data);
    }
}

elements.searchStart.addEventListener('submit', e => {
    e.preventDefault();
    userDishSearch();
});

elements.resultsPage.addEventListener('click' , e => {
    const button = e.target.closest('.btn-inline');
    if(button) {
        const pageTraverse = parseInt(button.dataset.goto, 10);
        viewTools.clearPreviousResult();
        viewTools.displayResults(state.dishReceipes.data, pageTraverse);
    }
});
/**
 * Recipe Controller
 */
const recipeDetails = new recipeController(47746);
recipeDetails.getRecipe();
console.log(recipeDetails); 
