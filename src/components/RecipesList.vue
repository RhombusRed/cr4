<template>
  <div class="recipesList">
    <h1>A list of Recipes!</h1>
    <ul>
        <!-- <li v-for="recipe in recipes"> {{ recipe.name }} </li> -->
    </ul>
  </div>
</template>

<script>
  export default {
      name: 'RecipesList',
      data ()  {
          return {
              text: '',
              ingredients: [],
              directions: [],
          }
      },
      computed: {
          recipes: function (){
            return this.$store.getters.recipes;
          }
      },
      methods: {
          getRecipes: function() {
              this.$store.dispatch('getRecipes');
          },
          addRecipe: function() {
              this.$store.dispatch('addRecipe', {
                  text: this.text,
                  ingredients: [],
                  directions: []
              });
          },
          changeRecipe: function() {
              this.$store.dispatch('changeRecipe', {
                  text: this.text,
                  ingredients: this.ingredients,
                  directions: this.directions
              });
          },
          deleteRecipe: function(recipe) {
              this.$store.dispatch('deleteRecipe', {
                  id: recipe.id
              });
          }
      }
  }
</script>

<style>

</style>