// Global app controller
import search from './models/Search';
import * as viewTools from './views/searchView';
import { elements, loaderIcon, clearLoader } from './views/base';
import recipeController from './models/Recipe';
import * as recipeViewer from './views/recipeView';

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
        try {
        await state.dishReceipes.getRecepies();
        clearLoader();
        viewTools.displayResults(state.dishReceipes.data);
        } catch(error) {
            alert(`${error} getting recipes from searched name of dish`);
        }
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
const getRecipeDetails = async() => {
    const id = window.location.hash.replace('#', '');
    if(id) {
        recipeViewer.clearRecipe();
        loaderIcon(elements.recipeDisplay);
        viewTools.selectedOption(id);
        state.dishFromId = new recipeController(id);
        try {
        await state.dishFromId.getRecipe();
        console.log(state.dishFromId);
        clearLoader();
        recipeViewer.displayRecipe(state.dishFromId);
        } catch (error) {
            alert(`${error} getting recipe from Id`);
        }
    }
}

['hashchange', 'load'].forEach(event => {
    window.addEventListener(event, getRecipeDetails);
});

elements.recipeDisplay.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if(state.dishFromId.serves > 1) {
        state.dishFromId.updateDetails('minus');
        recipeViewer.updateDishData(state.dishFromId);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.dishFromId.updateDetails('add');
        recipeViewer.updateDishData(state.dishFromId);
    }
    console.log(state.dishFromId);
});
 
