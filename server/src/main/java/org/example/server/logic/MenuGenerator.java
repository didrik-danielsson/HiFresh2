package org.example.server.logic;

import jakarta.annotation.PostConstruct;
import org.example.server.HistoryRepository;
import org.example.server.RecipeRepository;
import org.example.shared.HistoryEntry;
import org.example.shared.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class MenuGenerator {

    private final RecipeRepository recipeRepository;
    private final HistoryRepository historyRepository; // Nytt beroende
    private final Queue<String> recipeHistory = new LinkedList<>();
    private static final int MAX_HISTORY_SIZE = 20; // 4 menyer * 5 recept

    @Autowired
    public MenuGenerator(RecipeRepository recipeRepository, HistoryRepository historyRepository) {
        this.recipeRepository = recipeRepository;
        this.historyRepository = historyRepository;
    }

    @PostConstruct
    public void init() {
        loadHistory();
    }

    public List<Recipe> generateUniqueMenu(int numberOfRecipes) {
        List<Recipe> availableRecipes;

        if (recipeHistory.isEmpty()) {
            // Om historiken är tom, hämta alla recept
            availableRecipes = recipeRepository.findAll();
        } else {
            // Låt databasen sköta filtreringen av recept vi nyss ätit
            availableRecipes = recipeRepository.findByNameNotIn(recipeHistory);
        }

        // Slumpa ordningen
        Collections.shuffle(availableRecipes);

        // Välj ut recepten och uppdatera historiken
        return availableRecipes.stream()
                .limit(numberOfRecipes)
                .peek(r -> updateHistory(r.getName())) // Sparar i DB + Kö
                .toList();
    }

    private void updateHistory(String recipeName) {
        // Spara i databasen direkt
        historyRepository.save(new HistoryEntry(recipeName));

        // Uppdatera den lokala kön för snabb åtkomst
        recipeHistory.add(recipeName);
        if (recipeHistory.size() > MAX_HISTORY_SIZE) {
            recipeHistory.poll();
            // Valfritt: Här kan du även rensa gamla rader i DB om du vill hålla den liten
        }
    }

    public void loadHistory() {
        // Hämta historik från databasen istället för fil
        List<String> recentNames = historyRepository.findRecentRecipeNames();

        recipeHistory.clear();
        // Lägg till de senaste namnen (begränsa till din MAX_HISTORY_SIZE)
        recentNames.stream()
                .limit(MAX_HISTORY_SIZE)
                .forEach(recipeHistory::add);

        System.out.println("Historik laddad från databasen: " + recipeHistory.size() + " recept.");
    }
}