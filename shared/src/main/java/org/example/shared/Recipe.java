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

    @Column(columnDefinition = "TEXT[]")
    private String[] description;

    @ElementCollection
    @CollectionTable(
            name = "recipe_ingredients",
            joinColumns = @JoinColumn(name = "recipe_id")
    )
    @MapKeyJoinColumn(name = "ingredient_id")
    @AttributeOverrides({
            @AttributeOverride(name = "amount", column = @Column(name = "amount")),
            @AttributeOverride(name = "unit", column = @Column(name = "unit"))
    })
    Map<Ingredient, IngredientAmount> ingredients = new HashMap<>();

    public Recipe() {}

    public Recipe(String name) {
        this.name = name;
        this.description = new String[0];
    }

    public Recipe(String name, String[] description) {
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

    public Long getId(){return id;}

    public void setName(String name) {
        this.name = name;
    }

    public String[] getDescription() {
        return description;
    }

    public void setDescription(String[] description) {
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