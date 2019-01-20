import axios from 'axios'
import { apiKey, proxy } from '../../config'

export default class Search {
    constructor(dishName) {
        this.dishName = dishName;
    }

        async getRecepies() {
            try{
            const recipe = await axios(`${proxy}https://www.food2fork.com/api/search?key=${apiKey}&q=${this.dishName}`);
            this.data = recipe.data.recipes;
            } catch(error) {
                alert(error);
            }  
        }
}