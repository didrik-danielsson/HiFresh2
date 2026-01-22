package org.example.client;

import org.example.shared.*;
import tools.jackson.databind.ObjectMapper;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ApiService {

    private final String DELETE_RECIPE_URI = "http://localhost:8080/api/recipes/delete";
    private  final String RECIPE_URI = "http://localhost:8080/api/recipes";
    private  final String INGREDIENT_URI = "http://localhost:8080/api/ingredients";
    private  final HttpClient httpClient = HttpClient.newHttpClient();
    private  final ObjectMapper objectMapper = new ObjectMapper(); // Jackson

    public void sendRemoveRequestToServer(String recipeName) throws Exception{
//Måste kanske först hämta recept med namn för att sedan skicka en request med recept-json
        String jsonPayLoad = objectMapper.writeValueAsString(recipeName);
        HttpRequest removeRequest = HttpRequest.newBuilder().uri(URI.create(DELETE_RECIPE_URI))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayLoad)).build();


        HttpResponse<String> response = httpClient.send(removeRequest, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() == 200) {
            System.out.println("Receptet sparat på servern!");
        }


    }

    public void sendRecipeToServer(Recipe recipe) throws Exception {
        // 1. Gör om objektet till JSON-text
        String jsonPayload = objectMapper.writeValueAsString(recipe);

        // 2. Förbered anropet till servern
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(RECIPE_URI))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                .build();

        // 3. Skicka!
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() == 200) {
            System.out.println("Receptet sparat på servern!");
        }
    }

    public void sendIngredientToServer(Ingredient ingredient) throws Exception {
        String jsonPayload = objectMapper.writeValueAsString(ingredient);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(INGREDIENT_URI))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                .build();

        // 3. Skicka!
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() == 200) {
            System.out.println("Ingrediensen sparat på servern!");
        }

    }
}