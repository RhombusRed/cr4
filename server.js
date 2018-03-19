const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist'))


let recipes = [];
let id = 0;

app.get('/api/recipes', (req, res) => {
  res.send(recipes);
});

app.put('/api/recipes/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let recipesMap = recipes.map(recipe => { return recipe.id; });
  let index = recipesMap.indexOf(id);
  let recipe = recipes[index];
  recipe.text = req.body.text;
  // handle drag and drop re-ordering
  if (req.body.orderChange) {
    let indexTarget = recipesMap.indexOf(req.body.orderTarget);
    recipes.splice(index,1);
    recipes.splice(indexTarget,0,recipe);
  }
  res.send(recipe);
});

app.post('/api/recipes', (req, res) => {
  id = id + 1;
  console.log(id);
  let recipe = {id:id, text:req.body.text, ingredients:req.body.ingredients, directions:req.body.directions};
  recipes.push(recipe);
  res.send(recipe);
});

app.delete('/api/recipes/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = recipes.map(recipe => { return recipe.id; }).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that recipe doesn't exist");
    return;
  }
  recipes.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000!'))