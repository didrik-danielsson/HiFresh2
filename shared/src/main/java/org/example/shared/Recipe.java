package org.example.shared;

import jakarta.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ElementCollection
    @CollectionTable(name = "recipe_ingredients", joinColumns = @JoinColumn(name = "recipe_id"))
    @MapKeyColumn(name = "ingredient_name")
    Map<Ingredient, IngredientAmount> ingredients = new HashMap<>();

    public Recipe() {}

    public Recipe(String name) {
        this.name = name;
    }

    public Recipe(String name, String description) {
        this.name = name;
        this.description = description;
    }

    @Embeddable
    public record IngredientAmount(double amount, @Enumerated(EnumType.STRING) Unit unit) {
        public IngredientAmount() { this(0, null); } // Krävs för deserialisering
    }

    public void addIngredient(Ingredient ingredientName, double amount, Unit unit) {
        ingredients.put(ingredientName, new IngredientAmount(amount, unit));
    }

    public void removeIngredient(Ingredient ingredient, double amount, Unit unit) {
        ingredients.remove(ingredient);
    }

    /*public String toString() {
        return name + "\nGör så här: " + description + "\nIngredienser: " + ingredientsToString();
    }*/

    /*public String ingredientsToString() {

        StringBuilder sb = new StringBuilder();

        for(String s : ingredients.keySet() ) {
            sb.append(s).append("\n");
        }
        return sb.toString();
    }*/

    public String getName(){
        return name;
    }

    public Long getId(){return id;}

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Map<Ingredient, IngredientAmount> getIngredients() {
        return ingredients;
    }

    // Uppdatera din setter så den matchar namnet på fältet
    public void setIngredients(Map<Ingredient, IngredientAmount> ingredients) {
        this.ingredients = ingredients;
    }

}