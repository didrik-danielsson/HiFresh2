package org.example.server;

import org.example.shared.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/ingredients") // Grundadressen för alla anrop till ingredienser
public class IngredientController {

    private final IngredientService ingredientService;

    @Autowired
    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    // Hämtar alla ingredienser (bra för söklistor i JavaFX)
    @GetMapping
    public List<Ingredient> getAllIngredients() {
        return ingredientService.getAllIngredients();
    }

    // Skapar eller hämtar en ingrediens baserat på namn
    @PostMapping
    public ResponseEntity<Ingredient> getOrCreateIngredient(@RequestBody Ingredient ingredient) {
        return new ResponseEntity<>(ingredient, HttpStatus.CREATED);
    }

    // Tar bort en ingrediens via ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIngredient(@PathVariable Long id) {
        ingredientService.deleteIngredient(id);
        return ResponseEntity.noContent().build();
    }
}