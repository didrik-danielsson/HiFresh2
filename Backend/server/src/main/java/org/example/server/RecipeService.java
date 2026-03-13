package org.example.server;

import org.example.shared.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepo;
    @Autowired
    private IngredientRepository ingredientRepo;
    @Autowired
    private IngredientService ingredientService;

    public Recipe saveRecipeWithIngredients(Recipe recipeToSave) {

        if(recipeRepo.existsByNameIgnoreCase(recipeToSave.getName().trim())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Det finns redan ett recept med det namnet");
        }

        Map<Ingredient, Recipe.IngredientAmount> syncedMap = new HashMap<>();

        recipeToSave.getIngredients().forEach((ing, amount) -> {

            Ingredient realIng = ingredientRepo.findByNameIgnoreCase(ing.getName().trim())
                    .orElseGet(() -> ingredientService.getOrCreateIngredient(ing.getName()));
            syncedMap.put(realIng, amount);
        });
        recipeToSave.getIngredients().clear();
        recipeToSave.setIngredients(syncedMap);
        return recipeRepo.save(recipeToSave);
    }

    public List<Recipe> findAllRecipes() {
        return recipeRepo.findAll();
    }

    public Recipe getRecipeById(Long id) {
        return recipeRepo.findById(id).orElse(null);
    }

    public Recipe getRecipeByName(String recipeName) {
        return recipeRepo.findByName(recipeName);
    }

    public void removeRecipeByName(String recipeName) {
        recipeRepo.delete(getRecipeByName(recipeName));

    }

    public void removeRecipeById(Long id) {
        recipeRepo.deleteById(id);
    }
}