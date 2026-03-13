package org.example.server;


import org.example.shared.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    //Post-metod
    @PostMapping
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        return recipeService.saveRecipeWithIngredients(recipe);
    }

    //Delete-metoder
    @DeleteMapping("/delete")
    public void removeRecipe(@RequestBody String recipeName) {
        recipeService.removeRecipeByName(recipeName);
    }

    @DeleteMapping
    public void removeRecipe(@RequestBody long id) {
        recipeService.removeRecipeById(id);
    }

    //Get-metoder för recept
    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.findAllRecipes();
    }

    @GetMapping("/name/{name}")
    public Recipe getRecipeByName(@PathVariable String recipeName) {
        return recipeService.getRecipeByName(recipeName);
    }

    @GetMapping ("/{id}")
    public Recipe getRecipeById(@PathVariable long id) {
        return recipeService.getRecipeById(id);
    }
}


