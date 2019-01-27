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
            this.calcTime();
            this.standardizeIngredients();
        } catch(error) {
            alert(error);
        } 
    }

    calcTime() {
        this.timeMins = Math.ceil((this.ingredients.length) / 3) * 15;
        this.serves = this.timeMins > 30 ? 3 : 4;
    }

    standardizeIngredients() {
        const existingUnits = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const standardUnits = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(current => {
            let ingredient = current.toLowerCase();
            existingUnits.forEach((item, index) => {
                ingredient = ingredient.replace(item, standardUnits[index]);
            });
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

            const arrIngredients = ingredient.split(" ");
            const indexUnit = arrIngredients.findIndex(curr => standardUnits.includes(curr));

            let objIngredient;
            if(indexUnit > -1) {
                const arrayCount = arrIngredients.slice(0, indexUnit);
                let count;
                if(arrayCount.length === 1) {
                    count = eval(arrayCount[0].replace('-','+'));
                } else {
                    count = eval(arrayCount.join('+'));
                }
                objIngredient = {
                    count,
                    unit: arrIngredients[indexUnit],
                    ingredient: arrIngredients.slice(indexUnit+1).join(" ")
                };

            } else if (parseInt(arrIngredients[0], 10)) {
                objIngredient = {
                    count: parseInt(arrIngredients[0], 10),
                    unit: '',
                    ingredient: arrIngredients.slice(1).join(" ")
                };   
            } else if(indexUnit === -1) {
                objIngredient = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }
            return objIngredient;
        });
        this.ingredients = newIngredients;
    }
}