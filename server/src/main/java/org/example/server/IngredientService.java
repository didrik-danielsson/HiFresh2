package org.example.server;

import org.example.shared.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    // Hämtar alla ingredienser till din lista i GUI:t
    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    // Smart metod som kollar efter dubbletter innan den sparar
    public Optional<Ingredient> getIngredient(String name) {
        String nameToGet = name.trim();

        Optional<Ingredient> found = ingredientRepository.findByNameIgnoreCase(nameToGet);
        return found;
    }

    public Ingredient addIngredient(String ingredientName){

        if(!ingredientRepository.existsByNameIgnoreCase(ingredientName)){
            ingredientRepository.save(new Ingredient(ingredientName));
        }
        return ingredientRepository.findByNameIgnoreCase(ingredientName).orElse(null);
    }

    public Ingredient getOrCreateIngredient(String name) {
        String cleanName = name.trim();
        return ingredientRepository.findByNameIgnoreCase(cleanName)
                .orElseGet(() -> {
                    Ingredient newIng = new Ingredient(cleanName);
                    return ingredientRepository.save(newIng); // Returnerar sparad entitet med ID
                });
    }
    public void deleteIngredient(Long id) {
        ingredientRepository.deleteById(id);
    }
}