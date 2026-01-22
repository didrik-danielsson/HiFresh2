package org.example.server;

import org.example.shared.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepo;
    @Autowired
    private IngredientRepository ingredientRepo;

    public Recipe saveRecipeWithIngredients(Recipe recipeToSave) {
        // Kontrollera varje ingrediens i receptet
        recipeToSave.getIngredients().forEach((ingredientName, amount) -> {
            // Om ingrediensen inte finns i databasen, spara den först
            if (!ingredientRepo.existsByName(ingredientName.getName())) {
                ingredientRepo.save(new Ingredient(ingredientName.getName()));
            }
        });

        // Spara sedan hela receptet
        return recipeRepo.save(recipeToSave);
    }

    public List<Recipe> findAllRecipes() {
        return recipeRepo.findAll();
    }

    public Recipe getRecipeById(Long id) {
        return recipeRepo.findById(id).orElse(null);
    }

    public Recipe getRecipeByName(String recipeName) {
        return recipeRepo.existsByName(recipeName);
    }

    public void removeRecipeByName(String recipeName) {
        recipeRepo.delete(getRecipeByName(recipeName));

    }
}