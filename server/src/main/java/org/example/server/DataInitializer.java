/*package org.example.server;


import jakarta.transaction.Transactional;
import org.example.shared.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RecipeService recipeService;
    private final IngredientService ingredientService;
    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;
    private final ObjectMapper objectMapper;

    public DataInitializer(RecipeService recipeService,
                           IngredientService ingredientService,
                           RecipeRepository recipeRepository,
                           IngredientRepository ingredientRepository) {
        this.recipeService = recipeService;
        this.ingredientService = ingredientService;
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
        this.objectMapper = new ObjectMapper();
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        recipeRepository.deleteAll();
        ingredientRepository.deleteAll();

        InputStream recStream = getClass().getResourceAsStream("/recipes.json");
        if (recStream == null) {
            System.err.println("Kunde inte hitta recipes.json");
            return;
        }

        List<Recipe> recipes = objectMapper.readValue(recStream, new TypeReference<>() {});

        for (Recipe recipe : recipes) {
            recipeService.saveRecipeWithIngredients(recipe);
        }

        System.out.println("✅ Recept och ingredienser inlästa via RecipeService!");
    }
}*/