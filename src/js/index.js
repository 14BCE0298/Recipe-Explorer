// Global app controller
import axios from 'axios';

async function getRecipeInfo(searchItem) {
    const apiKey = 'd635297304a6f2579cef9ac92ead470e';
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    try{
    const recipe = await axios(`${proxy}https://www.food2fork.com/api/search?key=${apiKey}&q=${searchItem}`);
    const data = recipe.data.recipes;
    console.log(data);
    } catch(error) {
        alert(error);
    } 
}

getRecipeInfo('pizza');