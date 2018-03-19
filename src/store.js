import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      recipes: [],
  },
  getters: {
      recipes: state => state.recipes,
  },
  mutations: {
      setRecipes (state, recipes) {
          state.recipes = recipes;
      }
  },
  actions: {
    getRecipes(context) {
        console.log("getting recipes");
        axios.get("/api/recipes").then(response => {
      context.commit('setRecipes', response.data);
      return true;
        }).catch(err => {
        });
      },
      addRecipe(context, recipe) {
        axios.post("/api/recipes", recipe).then(response => {
      return context.dispatch('getRecipes');
        }).catch(err => {
        });
      },
      updateRecipe(context, recipe) {
        axios.put("/api/recipes/" + recipe.id, recipe).then(response => {
      return true;
        }).catch(err => {
        });
      },
      deleteRecipe(context, recipe) {
        axios.delete("/api/recipes/" + recipe.id).then(response => {
      return context.dispatch('getRecipes');
        }).catch(err => {
        });
      }
  }
});