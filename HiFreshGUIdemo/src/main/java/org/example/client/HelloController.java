package org.example.client;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import org.example.shared.Ingredient;
import org.example.shared.Recipe;
import org.example.shared.Unit;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Scanner;

public class HelloController {
    @FXML
    private Label welcomeText;

    @FXML
    protected void onHelloButtonClick() {
        welcomeText.setText("Welcome to JavaFX Application!");
    }



    private static final int EXITCOMMAND = 0;
    private static final int GENERATE_MENU = 1;
    private static final int ADDRECIPE = 2;
    private static final int SAVERECIPE = 3;
    private static final int CHANGERECIPE = 4;
    private static final int SHOWRECIPENAMES = 5;
    private static final int REMOVERECIPE = 6;

    private final Scanner input = new Scanner(System.in);
    private final ApiService apiService = new ApiService();
    private static boolean running = true;
    private boolean isSaved = false;

    public void createRecipe() {
        System.out.print("Ange receptets namn: ");
        Scanner nameInput = new Scanner(System.in);
        String name = nameInput.nextLine();

        System.out.print("Ange beskrivning: ");
        Scanner descriptionInput = new Scanner(System.in);
        String description = descriptionInput.nextLine();

        Recipe newRecipe;

        if(description.isEmpty()){
            newRecipe = new Recipe(name);
        }else {
            newRecipe = new Recipe(name, description);
        }

        boolean läggTillFler = true;
        while (läggTillFler) {
            System.out.print("Ingrediensnamn (eller 'klar'): ");
            String ingNamn = nameInput.nextLine().trim();
            if (ingNamn.equalsIgnoreCase("klar")){
                break;}

            System.out.print("Mängd: ");
            Scanner amountInput = new Scanner(System.in);
            double amount = Double.parseDouble(amountInput.nextLine());

            System.out.print("Enhet: ");
            Unit unitOfMeasure = Unit.valueOf(descriptionInput.nextLine().toUpperCase());

            newRecipe.addIngredient(new Ingredient(ingNamn), amount, unitOfMeasure);
        }

        try {
            apiService.sendRecipeToServer(newRecipe);
            System.out.println("Receptet har skickats till servern!");

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public void removeRecipe() throws Exception {

        Scanner input = new Scanner(System.in);
        System.out.print("Vilket recept vill du radera?: ");

        String recipeName = input.nextLine();
        try{
            apiService.sendRemoveRequestToServer(recipeName);
            System.out.println("Receptet " + recipeName + " är borttaget!");
        } catch (Exception e){
            System.err.println("Kunde inte ta bort receptet: " + recipeName);
        }
    }

    private void printRecipeNames(ArrayList<String> recipeNames) {
        StringBuilder recipeNamesBuilder = new StringBuilder();
        for (String recipeName : recipeNames) {
            recipeNamesBuilder.append(recipeName);
            recipeNamesBuilder.append("\n");
        }
        System.out.println(recipeNamesBuilder);
        recipeNames.clear();
    }

    private  void initialize() throws IOException {

        printMenu();
    }

    private void runProgram() throws Exception {
        initialize();
        runCommandLoop();
        shutdown();

    }

    private  void printMenu(){
        System.out.println("Välkommen till HiFresh!\n");

        System.out.println("1: Generera en meny");
        System.out.println("2: Lägg till ett recept");
        System.out.println("3: Spara recept");
        System.out.println("4: Ändra recept");
        System.out.println("5: Visa alla recept");
        System.out.println("6: Ta bort ett recept");
        System.out.println("0: Avsluta programmet ");
        System.out.print("Vad vill du göra?: ");
    }

    private void runCommandLoop() throws Exception {
        int command;

        while (running) {
            command = input.nextInt();
            input.nextLine();
            handleCommand(command);
        }
    }

    private void handleCommand(int command) throws Exception {
        switch (command) {
            case GENERATE_MENU:
                break;
            case ADDRECIPE:
                createRecipe();
                printMenu();
                break;
            case SAVERECIPE:
                isSaved = true;
                break;
            case SHOWRECIPENAMES:
                break;
            case  CHANGERECIPE:
                break;
            case REMOVERECIPE:
                removeRecipe();
                break;
            case EXITCOMMAND:
                running = false;
                break;

            default:
                System.out.println("Error: Wrong command!");
                break;
        }
    }

    /*private void changeRecipe() throws IOException {
        printChangeMenu();
    }*/

    /*private void printChangeMenu() throws IOException {
        Recipe recipeToChange;

        Scanner changeInput = new Scanner(System.in);
        System.out.print("Vilket recept vill du ändra?");
        recipeToChange = recipeBook.getRecipe(changeInput.nextLine());

        String changeCommand;
        System.out.println("Vad vill du ändra i " + recipeToChange + "?");
        System.out.println("namn, beskrivning, ingredienser");
        changeCommand = changeInput.nextLine();
        switch (changeCommand) {
            case "namn":
                changeRecipeName(recipeToChange);
                break;
            case  "beskrivning":
                changeRecipedescription(recipeToChange);
                break;
            case "ingredienser":
                changeRecipeIngredients(recipeToChange);
                break;
            default:
                System.out.println("Error: Not a valid command!");
        }
        printMenu();
    }*/

    private void changeRecipedescription(Recipe recipeToChange) {
        String newDescription;
        Scanner changeInput = new Scanner(System.in);


        System.out.print("Ange den nya beskrivningen:  ");
        newDescription = changeInput.nextLine();

        if(!newDescription.equals(recipeToChange.getDescription())){
            recipeToChange.setDescription(newDescription);
        }
    }

    private void changeRecipeName(Recipe recipeToChange) {
        String newName;
        Scanner changeInput = new Scanner(System.in);


        System.out.print("Vad ska receptet heta?: ");
        newName = changeInput.nextLine();

        if(!newName.equals(recipeToChange.getName())){
            recipeToChange.setName(newName);
            System.out.println("Namnet har nu ändrats!");
        }
    }

    /*private void changeRecipeIngredients(Recipe recipeToChange){
        String newIngredients;
        Scanner changeInput = new Scanner(System.in);

        System.out.print("Ange den nya ingrediensen:  ");
        addIngredientList(recipeToChange);
        System.out.println("Ändringen är klar!");

    } */

    private void shutdown() throws Exception {
        if(isSaved) {
            System.out.println("\nRecepten är sparade och programmet stängs");
            System.exit(0);
        } else {
            confirmCloseWithoutSave();
        }
    }

    private void confirmCloseWithoutSave() throws Exception {
        final Scanner exitInput = new Scanner(System.in);
        System.out.print("\nProject not saved do you wish to exit anyway? y/n: ");
        String exit = exitInput.nextLine();

        if(exit.equals("n")) {
            running = true;
            runProgram();

        }else if(exit.equals("y")) {
            System.out.println("Stänger ner utan att spara");
            System.exit(0);
        }
    }

    private void testConnection() throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8080/api/recipes"))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("Svar från server: " + response.body());
    }
}
