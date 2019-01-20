import axios from 'axios'
import { apiKey, proxy } from '../../config'

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const recipe = await axios(`${proxy}https://www.food2fork.com/api/get?key=${apiKey}&rId=${this.id}`);
            this.publisher = recipe.data.recipe.publisher;
            this.title = recipe.data.recipe.title;
            this.imgUrl = recipe.data.recipe.image_url;
            this.sourceUrl = recipe.data.recipe.source_url;
            this.ingredients = recipe.data.recipe.ingredients;
        } catch(error) {
            alert(error);
        } 
    }
}