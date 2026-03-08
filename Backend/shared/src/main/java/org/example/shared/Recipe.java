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

    private int portions;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> description = new ArrayList<>();

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

    public Recipe(String name, List<String> description) {
        this.name = name;
        this.description = description;
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
        return name + "\nGör så här: " + descriptionToString() + "\nIngredienser: " + ingredientsToString();
    }

    public String ingredientsToString() {
        StringBuilder sb = new StringBuilder();

        for(Ingredient i : ingredients.keySet() ) {
            sb.append(ingredients.get(i)).append(" ").append(i.getName()).append("\n");
        }
        return sb.toString();
    }

    private String descriptionToString() {
        StringBuilder descriptionString = new StringBuilder();

        for(String s : description) {
            descriptionString.append(s + "\n");
        }
        return descriptionString.toString();
    }

    public String getName(){
        return name;
    }

    public String getId(){return id;}

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getDescription() {
        return description;
    }

    public void setDescription(List<String> description) {
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