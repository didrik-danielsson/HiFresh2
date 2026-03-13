package org.example.shared;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    private String category;

    private String time;

    private Integer portions;

    private String description;

    @ElementCollection
    @CollectionTable(
            name = "recipe_ingredients",
            joinColumns = @JoinColumn(name = "recipe_id")
    )
    @MapKeyJoinColumn(name = "ingredient_id")
    private Map<Ingredient, IngredientAmount> ingredients = new HashMap<>();


    public Recipe() {}

    public Recipe(String name) {
        this.name = name;
    }

    public Recipe(String name,String description, String category, String time, Integer portions) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.time = time;
        this.portions = portions;
    }


    @Embeddable
    public static class IngredientAmount {
        private double amount;

        @Enumerated(EnumType.STRING)
        private Unit unit;

        public IngredientAmount() {}

        public IngredientAmount(double amount, Unit unit) {
            this.amount = amount;
            this.unit = unit;
        }


        public double getAmount() { return amount; }
        public void setAmount(double amount) { this.amount = amount; }
        public Unit getUnit() { return unit; }
        public void setUnit(Unit unit) { this.unit = unit; }
    }

    public void removeIngredient(Ingredient ingredient, double amount, Unit unit) {
        ingredients.remove(ingredient);
    }

    public String toString() {
        return name + "\nGör så här: " + getDescription() + "\nIngredienser: " + ingredientsToString();
    }

    public String ingredientsToString() {
        StringBuilder sb = new StringBuilder();

        for(Ingredient i : ingredients.keySet() ) {
            sb.append(ingredients.get(i)).append(" ").append(i.getName()).append("\n");
        }
        return sb.toString();
    }


    public String getName(){
        return name;
    }

    public String getId(){return id;}

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
        this.ingredients.clear();
            if (ingredients != null) {
                this.ingredients.putAll(ingredients);
            }
    }

}