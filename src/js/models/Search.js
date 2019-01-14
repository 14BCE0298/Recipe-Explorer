import axios from 'axios'

export default class Search {
    constructor(dishName) {
        this.dishName = dishName;
    }

        async getRecepies() {
            const apiKey = 'd635297304a6f2579cef9ac92ead470e';
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            try{
            const recipe = await axios(`${proxy}https://www.food2fork.com/api/search?key=${apiKey}&q=${this.dishName}`);
            this.data = recipe.data.recipes;
            } catch(error) {
                alert(error);
            }  
        }
}