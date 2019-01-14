// Global app controller
import search from './models/Search'
/**Global state of the app
 * - Search object conatining query and result
 * - current recipe object
 * - shopping list object
 * - Liked receipes
 */
const state = {};

const userDishSearch = async () => {
    const userInput = 'pizza';
    if(userInput) {
        state.dishReceipes = new search(userInput);
        await state.dishReceipes.getRecepies();
        console.log(state.dishReceipes.data);
    }
}

document.addEventListener('submit', e => {
    e.preventDefault();
    userDishSearch();
});