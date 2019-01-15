// Global app controller
import search from './models/Search';
import * as viewTools from './views/searchView';
import { elements, loaderIcon, clearLoader } from './views/base';
/**Global state of the app
 * - Search object conatining query and result
 * - current recipe object
 * - shopping list object
 * - Liked receipes
 */
const state = {};

const userDishSearch = async () => {
    const userInput = viewTools.readValue();
    if(userInput) {
        state.dishReceipes = new search(userInput);
        viewTools.clearSearchBar();
        viewTools.clearPreviousResult();
        loaderIcon(elements.searchResult);
        await state.dishReceipes.getRecepies();
        clearLoader();
        console.log(state.dishReceipes.data);
        viewTools.displayResults(state.dishReceipes.data);
    }
}

elements.searchStart.addEventListener('submit', e => {
    e.preventDefault();
    userDishSearch();
});