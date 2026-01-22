package org.example.server;

import org.example.shared.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    // Hämtar alla ingredienser till din lista i GUI:t
    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    // Smart metod som kollar efter dubbletter innan den sparar
    public Ingredient getIngredient(String name) {
        String nameToGet = name.trim();

        Ingredient found = ingredientRepository.findByName(nameToGet);
        return found;
    }

    public void addIngredient(String ingredientName){

        if(!ingredientRepository.existsByName(ingredientName)){
            Ingredient newIngredient = new Ingredient(ingredientName);
            ingredientRepository.save(newIngredient);
        }
    }

    public void deleteIngredient(Long id) {
        ingredientRepository.deleteById(id);
    }
}