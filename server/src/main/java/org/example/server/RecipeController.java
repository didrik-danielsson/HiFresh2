package org.example.server;


import org.example.shared.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    public String testServer() {
        return "Servern är uppe och svarar!";
    }

    @Autowired
    private final RecipeService recipeService = new RecipeService();

    @PostMapping
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        return recipeService.saveRecipeWithIngredients(recipe);
    }
    @PostMapping("/delete")
    public void removeRecipe(@RequestBody String recipeName) {
        recipeService.removeRecipeByName(recipeName);
    }
    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.findAllRecipes();
    }

    public Recipe getRecipeByName(String recipeName) {
        return recipeService.getRecipeByName(recipeName);
    }

    public Recipe getRecipeById(Recipe recipe) {
        return recipeService.getRecipeById(recipe.getId());
    }
}


